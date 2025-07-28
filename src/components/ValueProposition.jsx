import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Utensils, MapPin } from 'lucide-react';

const ValueProposition = ({ hotelName }) => {
  const values = [
    {
      icon: <Heart className="text-white" size={32} />,
      title: 'Confort Superior',
      description: 'Habitaciones diseñadas con los más altos estándares de comodidad, equipadas con amenidades de lujo y tecnología de vanguardia.',
    },
    {
      icon: <Utensils className="text-white" size={32} />,
      title: 'Gastronomía Exquisita',
      description: 'Restaurantes galardonados con chefs reconocidos internacionalmente, ofreciendo una fusión perfecta de sabores locales e internacionales.',
    },
    {
      icon: <MapPin className="text-white" size={32} />,
      title: 'Ubicación Estratégica',
      description: 'Situado en el corazón de la ciudad, con fácil acceso a las principales atracciones turísticas, centros comerciales y distritos de negocios.',
    },
  ];

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
            ¿Por qué elegir <span className="text-gradient">{hotelName}</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre los elementos que hacen de tu estancia una experiencia verdaderamente excepcional
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
              viewport={{ once: true }}
              className="text-center p-8 bg-white rounded-2xl shadow-luxury"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                {value.icon}
              </div>
              <h3 className="font-display text-2xl font-bold text-gray-800 mb-4">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;