import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = ({ onBookNow, onSeeRooms }) => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          alt="Luxury hotel exterior with elegant architecture and beautiful landscaping"
          src="https://images.unsplash.com/photo-1582024921682-961afe4621cf"
        />
        <div className="hero-overlay absolute inset-0"></div>
      </div>

      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-display text-5xl md:text-7xl font-bold mb-6"
        >
          Experiencia de <span className="text-gradient">Lujo</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl mb-8 font-light"
        >
          Donde el confort superior se encuentra con la elegancia atemporal
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button onClick={onBookNow} className="btn-primary text-lg px-8 py-4">
            Reservar Ahora
          </button>
          <button onClick={onSeeRooms} className="btn-secondary text-lg px-8 py-4">
            Ver Habitaciones
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;