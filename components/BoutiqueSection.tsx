"use client";

import React from "react";

export default function BoutiqueSection() {
  return (
    <section id="boutique" className="relative py-28 sm:py-36 bg-transparent text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Editorial Top Headline */}
        <div className="max-w-3xl mb-16 sm:mb-24">
          <span className="text-[11px] uppercase tracking-luxury-ultra text-neutral-300 font-semibold block mb-3 font-sans">
            THE SANCTUARY // ARCHITECTURE
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl font-bold tracking-[0.08em] uppercase text-white leading-tight mb-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            A MONOCHROME RETREAT FOR THE DISCERNING.
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed font-sans drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            ELEGANT NAIL was conceived at the intersection of haute couture minimalism and microscopic precision. We have stripped away the bustling salon noise to create a calm, private sanctuary where nail design is treated as pure sculptural art.
          </p>
        </div>

        {/* 3 Pillars of Craftsmanship - Deeper Opaque Obsidian Cards with Luminous White Glow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div className="card-luminous-glow p-8 sm:p-10 space-y-4">
            <span className="font-mono text-xs text-neutral-400 tracking-[0.2em] block font-semibold">
              [ 01 / PHILOSOPHY ]
            </span>
            <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-wide text-white uppercase">
              REFINED MINIMALISM
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed font-sans">
              We focus on architectural balance, precise apex alignment, and stark monochrome contrasts that elevate your hands with understated sophistication.
            </p>
          </div>

          <div className="card-luminous-glow p-8 sm:p-10 space-y-4">
            <span className="font-mono text-xs text-neutral-400 tracking-[0.2em] block font-semibold">
              [ 02 / HYGIENE ]
            </span>
            <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-wide text-white uppercase">
              AUTOCLAVE PURITY
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed font-sans">
              Hospital-grade steam sterilization for every titanium instrument, single-use diamond carbide bits, and clean room standards in every private suite.
            </p>
          </div>

          <div className="card-luminous-glow p-8 sm:p-10 space-y-4">
            <span className="font-mono text-xs text-neutral-400 tracking-[0.2em] block font-semibold">
              [ 03 / FORMULATION ]
            </span>
            <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-wide text-white uppercase">
              10-FREE HAUTE GELS
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed font-sans">
              Exclusive Japanese non-toxic oligomer gels that protect and nourish the natural keratin matrix while maintaining mirror-like obsidian reflection for weeks.
            </p>
          </div>
        </div>

        {/* Atelier Atmosphere Quote Banner Card */}
        <div className="mt-16 sm:mt-24 p-8 sm:p-14 card-luminous-glow flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <p className="font-serif-luxury text-xl sm:text-2xl md:text-3xl font-normal italic text-white mb-3">
              "True luxury is not loud. It is the silent confidence of absolute perfection."
            </p>
            <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-400 font-semibold font-sans">
              — ELENA VANCE, FOUNDER & MASTER ARCHITECT
            </span>
          </div>
          <div className="text-center md:text-right">
            <span className="text-xs tracking-[0.25em] text-neutral-400 block mb-1 font-mono font-semibold">
              PRIVATE SUITE HOURS
            </span>
            <span className="font-serif-luxury text-xl font-bold text-white block">
              TUESDAY — SUNDAY
            </span>
            <span className="text-xs text-neutral-300 tracking-wider font-sans font-medium">
              10:00 AM — 8:00 PM EST
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
