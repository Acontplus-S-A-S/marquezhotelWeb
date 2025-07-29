// App.jsx - Versión Final Sin Galería de Experiencias
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
  // ❌ ELIMINADO: const [lightboxImage, setLightboxImage] = useState(null);
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

  // ❌ ELIMINADO: Array completo de galleryImages
  /*
  const galleryImages = [
    { src: 'https://images.unsplash.com/photo-1531982535417-a39d136cca87', alt: 'Luxury hotel swimming pool with crystal clear water and elegant design', title: 'Piscina de Lujo' },
    { src: 'https://images.unsplash.com/photo-1572803089768-1b990231961a', alt: 'Elegant hotel restaurant with fine dining atmosphere and exquisite cuisine', title: 'Restaurante Gourmet' },
    { src: 'https://images.unsplash.com/photo-1651065213855-e6094f99ee65', alt: 'Luxurious spa treatment room with relaxing ambiance and premium amenities', title: 'Spa & Wellness' },
    { src: 'https://images.unsplash.com/photo-1527354312291-96b897435a47', alt: 'Happy hotel guests enjoying their luxury vacation experience', title: 'Huéspedes Felices' },
    { src: 'https://images.unsplash.com/photo-1695093360120-490f21ca62a7', alt: 'Hotel lobby with elegant interior design and luxury furnishings', title: 'Lobby Elegante' },
    { src: 'https://images.unsplash.com/photo-1540111970170-b1c4d4fbadaa', alt: 'Hotel fitness center with modern equipment and panoramic views', title: 'Centro Fitness' },
  ];
  */

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
        {/* ❌ ELIMINADO: <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} /> */}
        <RoomDetailModal room={selectedRoom} onClose={() => setSelectedRoom(null)} onBookNow={() => { setSelectedRoom(null); setReservationModalOpen(true); }} />
      </div>
    </>
  );
}

export default App;