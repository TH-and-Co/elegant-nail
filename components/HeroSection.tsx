"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";

interface HeroSectionProps {
  onOpenBooking: () => void;
}

const TOTAL_FRAMES = 100;

// Helper to format frame path to optimized 18KB WebP sequence (1.86MB total vs 300MB originally)
const getFramePath = (index: number) => {
  const padded = String(index).padStart(3, "0");
  return `/frames-webp/frame-${padded}.webp`;
};

export default function HeroSection({ onOpenBooking }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // References for frames & persistent RAF animation
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const loadedFramesRef = useRef<Set<number>>(new Set());
  
  // Target frame driven directly by scroll (1 to 100)
  const targetFrameRef = useRef<number>(1);
  // Current frame smoothed via lerp
  const currentFrameRef = useRef<number>(1);
  const lastDrawnFrameRef = useRef<number>(-1);
  const animFrameId = useRef<number | null>(null);

  // UI state for bottom HUD indicator and text fade
  const [displayFrame, setDisplayFrame] = useState<number>(1);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Preloader state: tracks network loading smoothly before letting the user scroll
  const [isPreloading, setIsPreloading] = useState<boolean>(true);
  const [preloaderFading, setPreloaderFading] = useState<boolean>(false);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [loadedCount, setLoadedCount] = useState<number>(0);

  // Lock scrolling on both documentElement and body while preloader is active
  useEffect(() => {
    if (isPreloading) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isPreloading]);

  // Draw a specific frame to the canvas with DPR support & aspect-ratio cover
  const drawFrame = useCallback((frameNumber: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Find requested frame or the closest loaded frame to avoid any blank flash
    let imgToDraw: HTMLImageElement | undefined = imagesRef.current.get(frameNumber);
    if (!imgToDraw || !loadedFramesRef.current.has(frameNumber)) {
      // Find nearest loaded frame
      let minDiff = Infinity;
      let closestFrame = 1;
      for (const f of loadedFramesRef.current) {
        const diff = Math.abs(f - frameNumber);
        if (diff < minDiff) {
          minDiff = diff;
          closestFrame = f;
        }
      }
      imgToDraw = imagesRef.current.get(closestFrame);
    }

    if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) {
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    // Resize canvas if needed
    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    }

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Cover calculation for seamless full-bleed without letterbox edges
    const imgWidth = imgToDraw.naturalWidth;
    const imgHeight = imgToDraw.naturalHeight;
    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let renderWidth: number;
    let renderHeight: number;
    let offsetX: number;
    let offsetY: number;

    if (canvasRatio > imgRatio) {
      renderWidth = canvasWidth;
      renderHeight = renderWidth / imgRatio;
      offsetX = 0;
      offsetY = (canvasHeight - renderHeight) / 2;
    } else {
      renderHeight = canvasHeight;
      renderWidth = renderHeight * imgRatio;
      offsetX = (canvasWidth - renderWidth) / 2;
      offsetY = 0;
    }

    // High quality rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Dark luxury background fill
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw the frame
    ctx.drawImage(imgToDraw, offsetX, offsetY, renderWidth, renderHeight);
    lastDrawnFrameRef.current = frameNumber;
  }, []);

  // Progressive image preloader: loads all 100 lightweight WebP frames smoothly
  useEffect(() => {
    let isCancelled = false;
    const startTime = Date.now();
    const MIN_PRELOADER_TIME = 1200; // Minimum 1.2s luxury presentation time

    const updateProgress = () => {
      if (isCancelled) return;
      const count = loadedFramesRef.current.size;
      setLoadedCount(count);
      setLoadProgress(Math.round((count / TOTAL_FRAMES) * 100));
    };

    const preloadFrame = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        if (loadedFramesRef.current.has(index) && imagesRef.current.has(index)) {
          updateProgress();
          resolve();
          return;
        }

        const img = new Image();
        img.src = getFramePath(index);

        const onFinish = async () => {
          if (!isCancelled) {
            try {
              if ("decode" in img) {
                await img.decode();
              }
            } catch {
              // Ignore decode error on non-supporting browsers
            }
            imagesRef.current.set(index, img);
            loadedFramesRef.current.add(index);
            updateProgress();

            if (index === 1) {
              drawFrame(1);
            }
          }
          resolve();
        };

        img.onload = onFinish;
        img.onerror = () => {
          // Mark as handled to avoid hanging
          loadedFramesRef.current.add(index);
          updateProgress();
          resolve();
        };
      });
    };

    const runPreloadSequence = async () => {
      // 1. Initial critical frame 1
      await preloadFrame(1);
      drawFrame(1);

      // 2. Parallel batched preload of remaining 99 frames (in pools of 10)
      const BATCH_SIZE = 10;
      for (let i = 1; i <= TOTAL_FRAMES; i += BATCH_SIZE) {
        if (isCancelled) return;
        const batch: Promise<void>[] = [];
        for (let j = i; j < i + BATCH_SIZE && j <= TOTAL_FRAMES; j++) {
          if (j !== 1) {
            batch.push(preloadFrame(j));
          }
        }
        await Promise.all(batch);
      }

      if (!isCancelled) {
        // Draw frame 1 onto canvas while still behind the preloader
        drawFrame(1);
        setLoadedCount(TOTAL_FRAMES);
        setLoadProgress(100);

        // Ensure minimum visual duration so preloader never flickers or vanishes abruptly
        const elapsed = Date.now() - startTime;
        const remainingDelay = Math.max(300, MIN_PRELOADER_TIME - elapsed);

        setTimeout(() => {
          if (!isCancelled) {
            setPreloaderFading(true);
            setTimeout(() => {
              if (!isCancelled) {
                setIsPreloading(false);
              }
            }, 700);
          }
        }, remainingDelay);
      }
    };

    runPreloadSequence();

    // Fallback safety timeout (5.0s) to guarantee scrolling unlocks under all network conditions
    const safetyTimer = setTimeout(() => {
      if (!isCancelled && isPreloading) {
        drawFrame(1);
        setLoadProgress(100);
        setPreloaderFading(true);
        setTimeout(() => {
          setIsPreloading(false);
        }, 700);
      }
    }, 5000);

    return () => {
      isCancelled = true;
      clearTimeout(safetyTimer);
    };
  }, [drawFrame, isPreloading]);

  // Recalculate frame on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScroll = rect.height - window.innerHeight;
      
      if (totalScroll <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.min(1, Math.max(0, currentScroll / totalScroll));
      setScrollProgress(progress);

      // Map: 0% scroll -> frame 1, 100% scroll -> frame 100
      const target = 1 + progress * (TOTAL_FRAMES - 1);
      targetFrameRef.current = target;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Persistent animation loop using requestAnimationFrame with smooth lerping
  useEffect(() => {
    let animId: number;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderLoop = () => {
      if (isReducedMotion) {
        currentFrameRef.current = targetFrameRef.current;
      } else {
        // Apple-level silky smooth interpolation
        const diff = targetFrameRef.current - currentFrameRef.current;
        currentFrameRef.current += diff * 0.12;
      }

      const frameNumber = Math.min(
        TOTAL_FRAMES,
        Math.max(1, Math.round(currentFrameRef.current))
      );

      // Redraw frame if changed
      if (frameNumber !== lastDrawnFrameRef.current || loadedFramesRef.current.size > 0) {
        drawFrame(frameNumber);
        setDisplayFrame(frameNumber);
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [drawFrame]);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      if (currentFrameRef.current) {
        drawFrame(Math.round(currentFrameRef.current));
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  const scrollToServices = () => {
    const servicesElement = document.getElementById("services");
    if (servicesElement) {
      servicesElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Text overlay opacity: full at top, smoothly dissolves as user explores the cinematic sequence
  const textOpacity = Math.max(0, Math.min(1, 1 - scrollProgress * 3.2));
  const textTranslateY = scrollProgress * -40;

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[450vh] bg-[#050505] select-none"
    >
      {/* Sticky Fullscreen Pinned Viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#050505]">
        
        {/* Fullscreen Sticky HTML5 Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
          style={{ backgroundColor: "#050505" }}
        />

        {/* Seamless dark luxury edge scrims to ensure zero visible edges */}
        <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-[#050505]/90 via-[#050505]/40 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent pointer-events-none z-10" />

        {/* Centered Luxury Hero Typography Overlay */}
        <div
          className="relative z-20 max-w-6xl mx-auto px-6 sm:px-10 text-center flex flex-col items-center justify-center pt-20 sm:pt-24 transition-opacity duration-300 pointer-events-none"
          style={{
            opacity: textOpacity,
            transform: `translateY(${textTranslateY}px)`,
            pointerEvents: textOpacity > 0.1 ? "auto" : "none",
          }}
        >
          {/* Eyebrow Label */}
          <p className="text-xs sm:text-[13px] md:text-sm font-semibold tracking-[0.38em] uppercase text-neutral-300/90 mb-5 sm:mb-7 font-sans drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            BOUTIQUE NAIL ARTISTRY
          </p>

          {/* Main Headline: Commanding, Heavy-weight Editorial Bodoni Serif */}
          <h1 className="font-serif-luxury text-5xl sm:text-7xl md:text-8xl lg:text-[7.2rem] xl:text-[8.5rem] font-bold tracking-[0.12em] uppercase text-white leading-[1.04] mb-6 sm:mb-8 drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
            PURE PRECISION.
          </h1>

          {/* Subtitle / Body Description */}
          <p className="text-base sm:text-lg md:text-xl text-neutral-300 font-normal tracking-wide max-w-md sm:max-w-xl leading-relaxed mb-14 sm:mb-16 font-sans drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)]">
            Meticulously crafted manicures tailored to your signature style.
          </p>

          {/* Downward Arrow Indicator & Scroll Cue */}
          <div className="flex flex-col items-center">
            <button
              onClick={scrollToServices}
              className="group flex flex-col items-center cursor-pointer focus:outline-none transition-transform duration-300 hover:scale-110 active:scale-95"
              aria-label="Scroll to explore boutique offerings"
            >
              <div className="animate-delicate-bounce text-white/90 group-hover:text-white transition-colors duration-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                <svg
                  width="22"
                  height="34"
                  viewBox="0 0 22 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 sm:w-6 h-7 sm:h-8"
                >
                  <line
                    x1="11"
                    y1="0"
                    x2="11"
                    y2="30"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <polyline
                    points="4,22 11,31 18,22"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              
              <span className="mt-2 text-[10px] uppercase tracking-[0.26em] text-neutral-400 group-hover:text-white transition-colors duration-300 font-semibold font-sans drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                Scroll to Explore
              </span>
            </button>
          </div>
        </div>

        {/* Left Bottom Corner: Small Footer-Level Detail (ROUTE ATELIER / Coordinates) */}
        <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-10 z-20 hidden sm:flex flex-col text-[10px] tracking-[0.24em] text-neutral-400 font-sans pointer-events-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          <span className="uppercase font-semibold text-neutral-300">ROUTE ATELIER</span>
          <span className="text-neutral-500 font-normal">40.7128° N, 74.0060° W</span>
        </div>

        {/* Right Bottom Corner: Minimalist HUD / Frame Controls in Subtle Dark Grey */}
        <aside
          aria-label="Interactive frame controls"
          className="absolute bottom-6 right-6 sm:bottom-8 sm:right-10 z-20 hidden sm:flex items-center gap-4 bg-black/60 backdrop-blur-md px-4 py-2 border border-white/10 text-[10px] tracking-[0.2em] text-neutral-300 font-sans drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="uppercase font-semibold text-neutral-200">SCROLL SEQUENCE</span>
          </div>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-1.5">
            <span className="text-neutral-400 font-medium">FRAME</span>
            <span className="text-white font-mono font-bold">
              {String(displayFrame).padStart(3, "0")} // 100
            </span>
          </div>
          {/* Visual scrub progress track */}
          <div className="w-16 h-1 bg-white/20 overflow-hidden relative">
            <div
              className="h-full bg-white transition-all duration-75"
              style={{ width: `${((displayFrame - 1) / 99) * 100}%` }}
            />
          </div>
          <span className="text-neutral-400 font-mono text-[9px]">
            {Math.round(scrollProgress * 100)}%
          </span>
        </aside>

      </div>

      {/* Luxury Fullscreen Initial Preloader (Locks scroll until network loading is 100% complete) */}
      {isPreloading && (
        <div
          className={`fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center select-none transition-all duration-700 ease-out px-6 ${
            preloaderFading
              ? "opacity-0 pointer-events-none scale-105"
              : "opacity-100 pointer-events-auto"
          }`}
        >
          {/* Subtle ambient luxury vignette */}
          <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/90 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
            {/* Brand Title */}
            <span className="text-[10px] uppercase tracking-[0.38em] text-neutral-400 font-semibold mb-3 font-sans">
              HAUTE ATELIER
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold tracking-[0.26em] uppercase text-white mb-8">
              ELEGANT NAIL
            </h2>

            {/* Glowing Minimalist Hairline Progress Bar */}
            <div className="w-56 sm:w-64 h-[2px] bg-white/10 overflow-hidden relative mb-5">
              <div
                className="h-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)] transition-all duration-150 ease-out"
                style={{ width: `${loadProgress}%` }}
              />
            </div>

            {/* Sequence Status & Frame Counter */}
            <div className="flex items-center justify-between w-56 sm:w-64 text-[10px] tracking-[0.2em] font-mono text-neutral-400">
              <span className="text-neutral-500 uppercase">
                {loadProgress >= 100 ? "READY" : "LOADING"}
              </span>
              <span className="text-white font-bold">
                {loadProgress}%
              </span>
            </div>

            <p className="text-[9px] uppercase tracking-[0.28em] text-neutral-500 font-sans mt-4">
              {loadProgress >= 100
                ? "EXPERIENCE INITIALIZED"
                : `CACHING FRAME ${String(loadedCount).padStart(3, "0")} // 100`}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
