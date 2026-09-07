"use client";

import React from "react";

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

const SERVICES = [
  {
    number: "01",
    name: "BESPOKE GEOMETRIC ARTISTRY",
    subtitle: "High-contrast monochrome precision with razor-sharp geometric alignment and negative space.",
    duration: "90 MIN",
    price: "$180",
    features: [
      "Custom hand-painted geometric patterns",
      "Medical-grade cuticle refinement",
      "Diamond gloss or matte obsidian finish",
      "Signature conditioning hand ritual",
    ],
  },
  {
    number: "02",
    name: "OBSIDIAN HIGH-GLOSS GEL",
    subtitle: "Flawless mirror-sheen black and optic white gel polish applied with micro-caliper accuracy.",
    duration: "75 MIN",
    price: "$150",
    features: [
      "Ultra-pigmented Japanese vegan gel",
      "Micro-apex structural reinforcement",
      "High-durability scratch-resistant shield",
      "Ultrasonic keratin cuticle bath",
    ],
  },
  {
    number: "03",
    name: "MINIMALIST APEX SCULPTING",
    subtitle: "Architectural length and contour restoration with seamless natural balance.",
    duration: "105 MIN",
    price: "$220",
    features: [
      "Bespoke soft gel extension architecture",
      "Individually customized almond or square silhouette",
      "Weightless natural feather feel",
      "3-week retention guarantee",
    ],
  },
  {
    number: "04",
    name: "THE PRIVATE ATELIER SUITE",
    subtitle: "An intimate, silent one-on-one session with our master nail architect.",
    duration: "120 MIN",
    price: "$290",
    features: [
      "Full bespoke design consultation",
      "Rare artisanal topcoat formulations",
      "Complimentary single-origin matcha or espresso",
      "Complete nail rehabilitation therapy",
    ],
  },
];

export default function ServicesSection({ onSelectService }: ServicesSectionProps) {
  return (
    <section id="services" className="relative py-28 sm:py-36 bg-transparent text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-24 pb-8 border-b border-white/15 gap-6">
          <div>
            <span className="text-[11px] uppercase tracking-luxury-ultra text-neutral-300 font-semibold block mb-3 font-sans">
              MENU D'ART // SERVICES
            </span>
            <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-bold tracking-[0.1em] uppercase text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              CURATED OFFERINGS
            </h2>
          </div>
          <p className="text-sm text-neutral-300 font-light max-w-md leading-relaxed tracking-wide font-sans drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Each bespoke treatment is executed with millimeter precision using medical-grade sterilization, cruelty-free formulas, and timeless aesthetic restraint.
          </p>
        </div>

        {/* Services Grid - Deeper Opaque Obsidian Cards with Luminous White Neon Glow */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {SERVICES.map((service) => (
            <div
              key={service.number}
              className="group relative p-8 sm:p-10 card-luminous-glow flex flex-col justify-between"
            >
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs text-neutral-400 tracking-[0.2em] group-hover:text-white transition-colors duration-300 font-semibold">
                    {service.number}
                  </span>
                  <div className="flex items-center gap-3 text-xs tracking-wider text-neutral-300 font-medium font-sans">
                    <span>{service.duration}</span>
                    <span className="text-white/30">|</span>
                    <span className="text-white font-bold">{service.price}</span>
                  </div>
                </div>

                {/* Service Name */}
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold tracking-[0.08em] text-white uppercase mb-4 group-hover:translate-x-1 transition-transform duration-300">
                  {service.name}
                </h3>

                {/* Subtitle */}
                <p className="text-sm text-neutral-300 font-light leading-relaxed mb-6 font-sans">
                  {service.subtitle}
                </p>

                {/* Features List */}
                <ul className="space-y-2.5 mb-8 border-t border-white/10 pt-6">
                  {service.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-xs text-neutral-200 font-light font-sans">
                      <span className="w-1.5 h-1.5 bg-white/70 rounded-full" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              <button
                onClick={() => onSelectService(service.name)}
                className="w-full py-3.5 border border-white/40 text-white hover:bg-white hover:text-black transition-all duration-300 text-[11px] uppercase tracking-[0.22em] font-semibold cursor-pointer backdrop-blur-sm"
              >
                RESERVE SUITE
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
