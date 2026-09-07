"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import BoutiqueSection from "@/components/BoutiqueSection";
import ContactSection from "@/components/ContactSection";
import BookingModal from "@/components/BookingModal";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(
    undefined
  );

  const handleOpenBooking = (serviceName?: string) => {
    setSelectedService(serviceName);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setSelectedService(undefined);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black">
      {/* Sticky semi-transparent glass navbar */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Hero section with cinematic video background */}
      <HeroSection onOpenBooking={() => handleOpenBooking()} />

      {/* Luxury Black Marble Texture Wrapper for all subsequent sections */}
      <div className="relative w-full bg-[#050505] bg-[url('/black-marble.jpg')] bg-repeat bg-[length:100%_auto] text-white">
        {/* Low-opacity dark obsidian scrim to ensure subtle, low-opacity white veining */}
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />
        
        <div className="relative z-10">
          {/* Curated offerings / Services section */}
          <ServicesSection onSelectService={(service) => handleOpenBooking(service)} />

          {/* The Boutique sanctuary architecture & philosophy */}
          <BoutiqueSection />

          {/* Contact & Private Concierge */}
          <ContactSection />
        </div>
      </div>

      {/* Interactive Reservation Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        defaultService={selectedService}
      />
    </main>
  );
}
