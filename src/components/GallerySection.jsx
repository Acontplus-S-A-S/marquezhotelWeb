import React from 'react';
import { motion } from 'framer-motion';

const GallerySection = ({ images, onImageClick }) => {
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
            Galería de <span className="text-gradient">Experiencias</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre los espacios y momentos que hacen de tu estancia una experiencia memorable
          </p>
        </motion.div>

        <div className="gallery-grid">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
              viewport={{ once: true }}
              className="gallery-item"
              onClick={() => onImageClick(image)}
            >
              <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
              <div className="gallery-overlay">
                <span>{image.title}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;