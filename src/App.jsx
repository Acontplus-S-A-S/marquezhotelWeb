// App.jsx - Versión sin Galería de Experiencias
import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ReservationBar from '@/components/ReservationBar';
import ValueProposition from '@/components/ValueProposition';
import RoomsSection from '@/components/RoomsSection';
// ❌ ELIMINADO: import GallerySection from '@/components/GallerySection';
import TestimonialsSection from '@/components/TestimonialsSection';
import MapSection from '@/components/MapSection';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ReservationModal from '@/components/ReservationModal';
import Lightbox from '@/components/Lightbox';
import RoomDetailModal from '@/components/RoomDetailModal';

function App() {
  const [isReservationModalOpen, setReservationModalOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const heroRef = useRef(null);
  const roomsRef = useRef(null);
  const servicesRef = useRef(null);
  const contactRef = useRef(null);

  const sectionRefs = {
    inicio: heroRef,
    habitaciones: roomsRef,
    servicios: servicesRef,
    contacto: contactRef,
  };

  // ❌ ELIMINADO: Todas las imágenes de la galería
  // const galleryImages = [...];

  const hotelName = "Marquez del Coca";

  const handleNavClick = (sectionId) => {
    sectionRefs[sectionId].current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>{hotelName} - Experiencia de Lujo Accesible</title>
        <meta name="description" content={`Descubre el equilibrio perfecto entre lujo y confort en ${hotelName}. Habitaciones elegantes, gastronomía exquisita y ubicación estratégica para una experiencia inolvidable.`} />
      </Helmet>

      <div className="min-h-screen">
        <Header hotelName={hotelName} onBookNow={() => setReservationModalOpen(true)} onNavClick={handleNavClick} />
        <main>
          <div ref={heroRef}>
            <HeroSection onBookNow={() => setReservationModalOpen(true)} onSeeRooms={() => handleNavClick('habitaciones')} />
          </div>
          <ReservationBar onCheckAvailability={() => setReservationModalOpen(true)} />
          <div ref={servicesRef}>
            <ValueProposition hotelName={hotelName} />
          </div>
          <div ref={roomsRef}>
            <RoomsSection onRoomSelect={setSelectedRoom} />
          </div>
          {/* ❌ ELIMINADO: <GallerySection images={galleryImages} onImageClick={setLightboxImage} /> */}
          <TestimonialsSection />
          <div ref={contactRef}>
            <MapSection />
          </div>
        </main>
        <Footer hotelName={hotelName} onNavClick={handleNavClick} />
        <FloatingWhatsApp />
        <Toaster />
        <ReservationModal isOpen={isReservationModalOpen} onClose={() => setReservationModalOpen(false)} />
        <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
        <RoomDetailModal room={selectedRoom} onClose={() => setSelectedRoom(null)} onBookNow={() => { setSelectedRoom(null); setReservationModalOpen(true); }} />
      </div>
    </>
  );
}

export default App;