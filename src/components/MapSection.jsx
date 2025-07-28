import React from 'react';
import { motion } from 'framer-motion';

const MapSection = () => {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Nuestra <span className="text-gradient">Ubicación</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Encuéntranos en el corazón de la ciudad, perfectamente conectado con todo lo que necesitas.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full h-[500px] rounded-2xl overflow-hidden shadow-luxury"
        >
          <iframe
            title="Google Map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-0.1292%2C51.5061%2C-0.1228%2C51.5092&layer=mapnik&marker=51.5076%2C-0.126"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

export default MapSection;