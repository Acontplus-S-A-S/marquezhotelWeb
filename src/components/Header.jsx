import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header = ({ hotelName, onBookNow, onNavClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuClick = (sectionId) => {
    onNavClick(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={`sticky-header ${isScrolled ? 'header-scrolled' : ''}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="font-display text-2xl font-bold text-gradient">{hotelName}</div>

            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={() => handleMenuClick('inicio')} className="text-gray-700 hover:text-yellow-600 transition-colors">
                Inicio
              </button>
              <button onClick={() => handleMenuClick('habitaciones')} className="text-gray-700 hover:text-yellow-600 transition-colors">
                Habitaciones
              </button>
              <button onClick={() => handleMenuClick('servicios')} className="text-gray-700 hover:text-yellow-600 transition-colors">
                Servicios
              </button>
              <button onClick={() => handleMenuClick('contacto')} className="text-gray-700 hover:text-yellow-600 transition-colors">
                Contacto
              </button>
              <button onClick={onBookNow} className="btn-primary">
                Reservar Ahora
              </button>
            </nav>

            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="mobile-menu"
          >
            <button onClick={() => handleMenuClick('inicio')} className="text-2xl font-semibold text-gray-700">
              Inicio
            </button>
            <button onClick={() => handleMenuClick('habitaciones')} className="text-2xl font-semibold text-gray-700">
              Habitaciones
            </button>
            <button onClick={() => handleMenuClick('servicios')} className="text-2xl font-semibold text-gray-700">
              Servicios
            </button>
            <button onClick={() => handleMenuClick('contacto')} className="text-2xl font-semibold text-gray-700">
              Contacto
            </button>
            <button onClick={() => { setIsMenuOpen(false); onBookNow(); }} className="btn-primary text-xl">
              Reservar Ahora
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;