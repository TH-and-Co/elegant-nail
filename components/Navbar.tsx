"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/85 backdrop-blur-xl border-b border-white/10 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            : "bg-black/40 backdrop-blur-md border-b border-white/10 py-5 sm:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 flex items-center justify-between">
          {/* Brand Title: Left */}
          <Link
            href="/"
            className="group flex items-center gap-2 cursor-pointer focus:outline-none"
          >
            <span className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-[0.28em] uppercase text-white transition-opacity duration-300 group-hover:opacity-80 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              ELEGANT NAIL
            </span>
          </Link>

          {/* Minimalist Navigation Links: Center (Desktop) */}
          <nav className="hidden md:flex items-center space-x-10 lg:space-x-14">
            <Link
              href="#services"
              className="text-[11px] uppercase tracking-[0.26em] text-neutral-300 hover:text-white transition-colors duration-300 font-medium relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-white hover:after:w-full after:transition-all after:duration-300 drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]"
            >
              SERVICES
            </Link>
            <Link
              href="#boutique"
              className="text-[11px] uppercase tracking-[0.26em] text-neutral-300 hover:text-white transition-colors duration-300 font-medium relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-white hover:after:w-full after:transition-all after:duration-300 drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]"
            >
              THE BOUTIQUE
            </Link>
            <Link
              href="#contact"
              className="text-[11px] uppercase tracking-[0.26em] text-neutral-300 hover:text-white transition-colors duration-300 font-medium relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-white hover:after:w-full after:transition-all after:duration-300 drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]"
            >
              CONTACT
            </Link>
          </nav>

          {/* Right: Sleek Ghost Button */}
          <div className="hidden sm:flex items-center">
            <button
              onClick={onOpenBooking}
              className="relative px-6 sm:px-7 py-2.5 border border-white/70 text-white hover:bg-white hover:text-black transition-all duration-300 text-[11px] uppercase tracking-[0.22em] font-semibold cursor-pointer shadow-none hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] active:scale-[0.98]"
            >
              BOOK APPOINTMENT
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="sm:hidden px-3.5 py-1.5 border border-white/70 text-white text-[10px] uppercase tracking-[0.18em] font-semibold"
            >
              BOOK
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-neutral-300 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              <div className="w-6 h-4 flex flex-col justify-between items-end">
                <span
                  className={`h-[1.5px] bg-white transition-all duration-300 ${
                    mobileMenuOpen ? "w-6 rotate-45 translate-y-[7px]" : "w-6"
                  }`}
                />
                <span
                  className={`h-[1.5px] bg-white transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-0" : "w-4"
                  }`}
                />
                <span
                  className={`h-[1.5px] bg-white transition-all duration-300 ${
                    mobileMenuOpen ? "w-6 -rotate-45 -translate-y-[8px]" : "w-5"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl transition-all duration-500 flex flex-col justify-center px-10 md:hidden ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="space-y-8 text-center">
          <div>
            <Link
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm uppercase tracking-[0.3em] text-neutral-300 hover:text-white py-2 font-semibold"
            >
              SERVICES
            </Link>
          </div>
          <div>
            <Link
              href="#boutique"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm uppercase tracking-[0.3em] text-neutral-300 hover:text-white py-2 font-semibold"
            >
              THE BOUTIQUE
            </Link>
          </div>
          <div>
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm uppercase tracking-[0.3em] text-neutral-300 hover:text-white py-2 font-semibold"
            >
              CONTACT
            </Link>
          </div>
          <div className="pt-6">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full max-w-xs mx-auto py-3.5 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 text-xs uppercase tracking-[0.24em] font-semibold"
            >
              BOOK APPOINTMENT
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
