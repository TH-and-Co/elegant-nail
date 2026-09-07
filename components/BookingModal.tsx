"use client";

import React, { useState, useEffect } from "react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

const SERVICES_OPTIONS = [
  "BESPOKE GEOMETRIC ARTISTRY ($180)",
  "OBSIDIAN HIGH-GLOSS GEL ($150)",
  "MINIMALIST APEX SCULPTING ($220)",
  "THE PRIVATE ATELIER SUITE ($290)",
];

const TIME_SLOTS = [
  "10:00 AM",
  "11:30 AM",
  "01:00 PM",
  "02:45 PM",
  "04:30 PM",
  "06:15 PM",
];

export default function BookingModal({
  isOpen,
  onClose,
  defaultService,
}: BookingModalProps) {
  const [selectedService, setSelectedService] = useState(
    SERVICES_OPTIONS[0]
  );
  const [selectedDate, setSelectedDate] = useState("2026-09-12");
  const [selectedTime, setSelectedTime] = useState("01:00 PM");
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    if (defaultService) {
      const match = SERVICES_OPTIONS.find((s) =>
        s.toLowerCase().includes(defaultService.toLowerCase())
      );
      if (match) setSelectedService(match);
    }
  }, [defaultService]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-md animate-fadeIn"
    >
      <div
        className="relative w-full max-w-lg bg-white border border-black/[0.12] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.15)] text-[#0a0a0a]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-[#0a0a0a] transition-colors cursor-pointer text-sm font-mono tracking-widest"
          aria-label="Close booking modal"
        >
          [✕]
        </button>

        {isBooked ? (
          <div className="py-8 text-center space-y-5">
            <div className="w-12 h-12 rounded-full border border-[#0a0a0a] mx-auto flex items-center justify-center text-[#0a0a0a] text-base font-bold">
              ✓
            </div>
            <span className="text-[10px] uppercase tracking-luxury-ultra text-neutral-500 font-semibold block font-sans">
              APPOINTMENT CONFIRMED
            </span>
            <h3 className="font-serif-luxury text-3xl font-bold tracking-[0.08em] uppercase text-[#0a0a0a]">
              WE AWAIT YOUR ARRIVAL.
            </h3>
            <div className="py-4 border-y border-black/[0.08] text-xs text-neutral-600 font-normal space-y-2 font-sans">
              <p>
                <span className="text-neutral-400 uppercase tracking-widest font-semibold">GUEST:</span> {guestName || "Distinguished Client"}
              </p>
              <p>
                <span className="text-neutral-400 uppercase tracking-widest font-semibold">TREATMENT:</span> {selectedService}
              </p>
              <p>
                <span className="text-neutral-400 uppercase tracking-widest font-semibold">SLOT:</span> {selectedDate} at {selectedTime}
              </p>
            </div>
            <p className="text-xs text-neutral-500 font-normal font-sans">
              A bespoke concierge calendar invite and suite preparation instructions have been dispatched.
            </p>
            <button
              onClick={() => {
                setIsBooked(false);
                onClose();
              }}
              className="mt-4 px-8 py-2.5 border border-[#0a0a0a] bg-[#0a0a0a] text-white hover:bg-transparent hover:text-[#0a0a0a] transition-all duration-300 text-xs uppercase tracking-[0.2em] font-semibold"
            >
              CLOSE
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-luxury-ultra text-neutral-500 font-semibold block mb-1 font-sans">
                PRIVATE RESERVATION
              </span>
              <h2 id="booking-modal-title" className="font-serif-luxury text-2xl sm:text-3xl font-bold tracking-[0.08em] uppercase text-[#0a0a0a]">
                RESERVE YOUR SUITE
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Select Service */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold font-sans">
                  SELECT TREATMENT
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full bg-neutral-50 border border-black/[0.15] px-3.5 py-2.5 text-xs text-[#0a0a0a] focus:outline-none focus:border-[#0a0a0a] transition-colors cursor-pointer"
                >
                  {SERVICES_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="bg-white text-[#0a0a0a]">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold font-sans">
                    DESIRED DATE
                  </label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-neutral-50 border border-black/[0.15] px-3 py-2 text-xs text-[#0a0a0a] focus:outline-none focus:border-[#0a0a0a] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold font-sans">
                    TIME SLOT
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full bg-neutral-50 border border-black/[0.15] px-3 py-2 text-xs text-[#0a0a0a] focus:outline-none focus:border-[#0a0a0a] transition-colors cursor-pointer"
                  >
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t} className="bg-white text-[#0a0a0a]">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Client Info */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold font-sans">
                  CLIENT FULL NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="E.g. Vivienne Westwood"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-neutral-50 border border-black/[0.15] px-3.5 py-2.5 text-xs text-[#0a0a0a] placeholder-neutral-400 focus:outline-none focus:border-[#0a0a0a] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-neutral-600 mb-1 font-semibold font-sans">
                  CONTACT TELEPHONE / SMS
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 000-0000"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="w-full bg-neutral-50 border border-black/[0.15] px-3.5 py-2.5 text-xs text-[#0a0a0a] placeholder-neutral-400 focus:outline-none focus:border-[#0a0a0a] transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 border border-[#0a0a0a] bg-[#0a0a0a] text-white hover:bg-transparent hover:text-[#0a0a0a] transition-all duration-300 text-xs uppercase tracking-[0.22em] font-semibold cursor-pointer"
                >
                  CONFIRM RESERVATION
                </button>
              </div>

              <p className="text-[10px] text-neutral-500 text-center uppercase tracking-wider font-medium font-sans">
                NO ADVANCE CHARGE // 24-HOUR COURTESY CANCELLATION
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
