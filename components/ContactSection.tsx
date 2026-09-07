"use client";

import React, { useState } from "react";

export default function ContactSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 4000);
  };

  return (
    <footer id="contact" className="relative bg-transparent border-t border-white/10 pt-24 pb-16 text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 pb-20 border-b border-white/10">
          
          {/* Brand & Address in Deeper Opaque Obsidian Card with Glow */}
          <div className="lg:col-span-5 card-luminous-glow p-8 sm:p-10 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="font-serif-luxury text-2xl sm:text-3xl font-bold tracking-[0.25em] uppercase text-white block">
                ELEGANT NAIL
              </span>
              <p className="text-xs sm:text-sm text-neutral-300 font-light max-w-sm leading-relaxed tracking-wide font-sans">
                An appointment-only private atelier dedicated to sculptural manicures and bespoke nail artistry.
              </p>
            </div>
            
            <div className="pt-4 border-t border-white/10 space-y-2 text-xs tracking-wider text-neutral-300 font-light font-sans">
              <p className="text-neutral-400 uppercase text-[10px] tracking-[0.2em] font-semibold">FLAGSHIP ATELIER</p>
              <p className="text-white font-medium">740 Madison Avenue, Penthouse 4B</p>
              <p>New York, NY 10065</p>
              <p className="pt-2 text-neutral-300 font-mono">+1 (212) 555-0198</p>
              <p className="text-neutral-300 font-mono">concierge@elegantnail.com</p>
            </div>
          </div>

          {/* Concierge Inquiry Form in Deeper Opaque Obsidian Card with Glow */}
          <div className="lg:col-span-7">
            <div className="card-luminous-glow p-8 sm:p-10">
              <span className="text-[10px] uppercase tracking-luxury-ultra text-neutral-400 font-semibold block mb-2 font-sans">
                PRIVATE CONCIERGE
              </span>
              <h3 className="font-serif-luxury text-2xl font-bold tracking-[0.08em] text-white uppercase mb-6">
                GENERAL & EDITORIAL INQUIRIES
              </h3>

              {formSubmitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-8 h-8 rounded-full border border-white mx-auto flex items-center justify-center text-white text-xs">
                    ✓
                  </div>
                  <p className="font-serif-luxury text-xl font-bold text-white">Inquiry Received</p>
                  <p className="text-xs text-neutral-300 font-light font-sans">
                    Our atelier concierge will respond within 2 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-neutral-300 mb-1.5 font-semibold font-sans">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="E.g. Olivia Laurent"
                        className="w-full bg-black/75 border border-white/20 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-neutral-300 mb-1.5 font-semibold font-sans">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="olivia@domain.com"
                        className="w-full bg-black/75 border border-white/20 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-neutral-300 mb-1.5 font-semibold font-sans">
                      Special Request or Inquiries
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your signature styling desires..."
                      className="w-full bg-black/75 border border-white/20 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 border border-white bg-white text-black hover:bg-black hover:text-white transition-all duration-300 text-[11px] uppercase tracking-[0.22em] font-semibold cursor-pointer"
                  >
                    SEND INQUIRY
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Terms */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] tracking-[0.2em] text-neutral-400 uppercase font-medium font-sans">
          <span>© {new Date().getFullYear()} ELEGANT NAIL BOUTIQUE. ALL RIGHTS RESERVED.</span>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">PRIVACY POLICY</span>
            <span className="text-white/20">|</span>
            <span className="hover:text-white cursor-pointer transition-colors">TERMS OF SUITE</span>
            <span className="text-white/20">|</span>
            <span className="hover:text-white cursor-pointer transition-colors">ACCESSIBILITY</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
