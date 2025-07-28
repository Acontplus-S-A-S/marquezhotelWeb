import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'María González',
      location: 'Madrid, España',
      rating: 5,
      comment: 'Una experiencia inolvidable. El servicio es excepcional y las instalaciones de primera clase. Definitivamente volveremos.',
      avatar: 'MG',
    },
    {
      id: 2,
      name: 'Jean Pierre',
      location: 'París, Francia',
      rating: 5,
      comment: "L'hôtel parfait pour des vacances de luxe. La gastronomie est remarquable et l'emplacement idéal.",
      avatar: 'JP',
    },
    {
      id: 3,
      name: 'Alessandro Rossi',
      location: 'Roma, Italia',
      rating: 5,
      comment: 'Servizio impeccabile e camere magnifiche. La spa è un vero paradiso. Altamente raccomandato!',
      avatar: 'AR',
    },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);

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
            Lo que dicen nuestros <span className="text-gradient">Huéspedes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Las experiencias reales de nuestros huéspedes son nuestro mejor testimonio
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="carousel-container">
            <div className="carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="testimonial-card">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg text-gray-800">{testimonial.name}</h4>
                        <p className="text-gray-600">{testimonial.location}</p>
                      </div>
                      <div className="ml-auto flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="text-yellow-500 fill-current" size={20} />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed italic">{testimonial.comment}</p>
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
            {testimonials.map((_, index) => (
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

export default TestimonialsSection;