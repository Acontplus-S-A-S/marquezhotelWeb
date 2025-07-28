import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const RoomsSection = ({ onRoomSelect }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const rooms = [
    {
      id: 1,
      name: 'Suite Presidencial',
      description: 'Lujo absoluto con vista panorámica. Un espacio de 120m² que redefine la opulencia, con un jacuzzi privado en la terraza, sala de estar independiente y servicio de mayordomo 24h.',
      features: ['120m²', 'Vista al mar', 'Jacuzzi privado', 'Terraza', 'Sala de estar', 'Mayordomo 24h'],
      price: '€450/noche',
      image: 'https://images.unsplash.com/photo-1660562229022-ddf20f275066',
    },
    {
      id: 2,
      name: 'Habitación Deluxe',
      description: 'Elegancia y confort en cada detalle. Disfruta de 45m² con un balcón privado, un minibar completamente surtido y un lujoso baño de mármol con ducha de efecto lluvia.',
      features: ['45m²', 'Balcón privado', 'Minibar', 'Baño de mármol', 'Ducha efecto lluvia', 'Cama King Size'],
      price: '€180/noche',
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32',
    },
    {
      id: 3,
      name: 'Habitación Superior',
      description: 'Comodidad moderna con estilo clásico. Un refugio de 35m² con vistas al jardín, un espacioso escritorio de trabajo y todas las comodidades para una estancia perfecta.',
      features: ['35m²', 'Vista jardín', 'Escritorio', 'Baño completo', 'Smart TV 55"', 'Cafetera Nespresso'],
      price: '€120/noche',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304',
    },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % rooms.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + rooms.length) % rooms.length);

  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Nuestras <span className="text-gradient">Habitaciones</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cada habitación es un santuario de elegancia y confort, diseñada para superar tus expectativas
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="carousel-container">
            <div className="carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {rooms.map((room) => (
                <div key={room.id} className="w-full flex-shrink-0 px-4">
                  <div className="room-card">
                    <div className="relative h-64 md:h-80">
                      <img className="w-full h-full object-cover" src={room.image} alt={`${room.name} - Elegant hotel room with luxury amenities`} />
                      <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
                        {room.price}
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="font-display text-2xl font-bold text-gray-800 mb-3">{room.name}</h3>
                      <p className="text-gray-600 mb-6 truncate">{room.description}</p>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {room.features.slice(0, 4).map((feature, idx) => (
                          <div key={idx} className="flex items-center text-sm text-gray-600">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                      <button onClick={() => onRoomSelect(room)} className="btn-secondary w-full">
                        Ver Detalles
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={prevSlide} className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all">
            <ChevronLeft size={24} className="text-gray-600" />
          </button>
          <button onClick={nextSlide} className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all">
            <ChevronRight size={24} className="text-gray-600" />
          </button>

          <div className="flex justify-center mt-8 space-x-2">
            {rooms.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-yellow-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomsSection;