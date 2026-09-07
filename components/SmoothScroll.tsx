"use client";

import React, { useEffect, useRef } from "react";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const targetY = useRef<number>(0);
  const currentY = useRef<number>(0);
  const isRunning = useRef<boolean>(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    targetY.current = window.scrollY;
    currentY.current = window.scrollY;

    const onScroll = () => {
      // Synchronize with manual scrollbar dragging
      if (!isRunning.current) {
        targetY.current = window.scrollY;
        currentY.current = window.scrollY;
      }
    };

    const updateScroll = () => {
      const diff = targetY.current - currentY.current;

      if (Math.abs(diff) > 0.4) {
        // High-precision smooth inertia dampening
        currentY.current += diff * 0.085;
        isRunning.current = true;
        window.scrollTo(0, currentY.current);
        rafId.current = requestAnimationFrame(updateScroll);
      } else {
        currentY.current = targetY.current;
        window.scrollTo(0, currentY.current);
        isRunning.current = false;
        rafId.current = null;
      }
    };

    const onWheel = (e: WheelEvent) => {
      // Ignore zoom and modifier keys
      if (e.ctrlKey || e.metaKey) return;

      // Check if body/html is locked (e.g. preloader or booking modal active)
      if (
        document.body.style.overflow === "hidden" ||
        document.documentElement.style.overflow === "hidden"
      ) {
        return;
      }

      // Allow native scrolling inside nested scrollable elements (e.g. modals, textareas)
      let el = e.target as HTMLElement | null;
      while (el && el !== document.body && el !== document.documentElement) {
        if (el.scrollHeight > el.clientHeight) {
          const overflowY = window.getComputedStyle(el).overflowY;
          if (overflowY === "auto" || overflowY === "scroll") {
            return;
          }
        }
        el = el.parentElement;
      }

      // Prevent abrupt discrete native wheel ticks
      e.preventDefault();

      const maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );

      // Normalize delta across browsers & input devices
      let delta = e.deltaY;
      if (e.deltaMode === 1) {
        delta *= 30; // Lines to pixels
      } else if (e.deltaMode === 2) {
        delta *= window.innerHeight; // Pages to pixels
      }

      // Smoothly accumulate target scroll position
      targetY.current = Math.min(
        maxScroll,
        Math.max(0, targetY.current + delta * 0.9)
      );

      if (!rafId.current) {
        isRunning.current = true;
        rafId.current = requestAnimationFrame(updateScroll);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return <>{children}</>;
}
