"use client";

import React, { useRef } from "react";

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export default function HeroSection({ onOpenBooking }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const scrollToServices = () => {
    const servicesElement = document.getElementById("services");
    if (servicesElement) {
      servicesElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#050505] select-none">
      {/* Background Cinematic Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      >
        <source src="/Hero.mp4" type="video/mp4" />
      </video>

      {/* Luxury Dark Scrim & Gradient Overlays for High Legibility */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none z-10" />
      <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-[#050505]/90 via-[#050505]/40 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent pointer-events-none z-10" />

      {/* Centered Luxury Hero Typography Overlay */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 sm:px-10 text-center flex flex-col items-center justify-center pt-20 sm:pt-24">
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

      {/* Left Bottom Corner: Atelier Coordinates */}
      <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-10 z-20 hidden sm:flex flex-col text-[10px] tracking-[0.24em] text-neutral-400 font-sans pointer-events-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
        <span className="uppercase font-semibold text-neutral-300">ROUTE ATELIER</span>
        <span className="text-neutral-500 font-normal">40.7128° N, 74.0060° W</span>
      </div>

      {/* Right Bottom Corner: Minimalist HUD Experience Badge */}
      <aside
        aria-label="Cinematic experience info"
        className="absolute bottom-6 right-6 sm:bottom-8 sm:right-10 z-20 hidden sm:flex items-center gap-4 bg-black/60 backdrop-blur-md px-4 py-2 border border-white/10 text-[10px] tracking-[0.2em] text-neutral-300 font-sans drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span className="uppercase font-semibold text-neutral-200">CINEMATIC ATELIER</span>
        </div>
        <span className="text-white/20">|</span>
        <span className="text-neutral-400 font-mono text-[9px] uppercase tracking-[0.2em]">
          HAUTE PRECISION
        </span>
      </aside>
    </section>
  );
}
