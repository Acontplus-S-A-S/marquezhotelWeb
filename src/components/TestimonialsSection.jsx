// TestimonialsSection.jsx - Versión Mejorada
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Quote,
  MapPin,
  Calendar,
  Camera,
  Heart,
  Play,
  Pause,
  Users,
  Award,
  TrendingUp
} from 'lucide-react';

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('todos');

  // Testimonios expandidos con más datos
  const testimonials = [
    {
      id: 1,
      name: 'María González',
      location: 'Madrid, España',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b29c?w=100&h=100&fit=crop&crop=face',
      avatarFallback: 'MG',
      rating: 5,
      date: '15 de Enero, 2024',
      stayDuration: '5 noches',
      roomType: 'Suite Presidencial',
      verifiedGuest: true,
      category: 'familia',
      comment: 'Una experiencia inolvidable para toda la familia. El servicio es excepcional y las instalaciones de primera clase. El spa fue increíble y los niños disfrutaron mucho de la piscina. Definitivamente volveremos.',
      highlights: ['Servicio excepcional', 'Instalaciones premium', 'Ideal para familias'],
      photos: 3,
      helpful: 24
    },
    {
      id: 2,
      name: 'Jean Pierre Dubois',
      location: 'París, Francia',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      avatarFallback: 'JP',
      rating: 5,
      date: '8 de Febrero, 2024',
      stayDuration: '3 noches',
      roomType: 'Habitación Deluxe',
      verifiedGuest: true,
      category: 'romantico',
      comment: "L'hôtel parfait pour des vacances romantiques de luxe. La gastronomie est remarquable et l'emplacement idéal. Le service au restaurant était impeccable et la vue depuis notre chambre magnifique.",
      highlights: ['Gastronomía excepcional', 'Ubicación perfecta', 'Vista espectacular'],
      photos: 5,
      helpful: 18
    },
    {
      id: 3,
      name: 'Alessandro Rossi',
      location: 'Roma, Italia',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      avatarFallback: 'AR',
      rating: 5,
      date: '22 de Marzo, 2024',
      stayDuration: '4 noches',
      roomType: 'Suite Junior',
      verifiedGuest: true,
      category: 'negocios',
      comment: 'Servizio impeccabile e camere magnifiche. La spa è un vero paradiso e il centro business perfetto per i miei meeting. Il WiFi è velocissimo e le sale conferenze moderne. Altamente raccomandato!',
      highlights: ['Spa paradisíaco', 'Centro de negocios', 'WiFi de alta velocidad'],
      photos: 2,
      helpful: 31
    },
    {
      id: 4,
      name: 'Sophie Martin',
      location: 'Lyon, Francia',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      avatarFallback: 'SM',
      rating: 5,
      date: '5 de Abril, 2024',
      stayDuration: '2 noches',
      roomType: 'Habitación Superior',
      verifiedGuest: true,
      category: 'romantico',
      comment: 'Mon compagnon et moi avons passé un week-end magique. Le petit-déjeuner était délicieux et le personnel très attentionné. La terrasse avec vue sur la ville est à couper le souffle, parfait pour un dîner romantique.',
      highlights: ['Desayuno delicioso', 'Personal atento', 'Terraza romántica'],
      photos: 4,
      helpful: 15
    },
    {
      id: 5,
      name: 'Carlos Mendoza',
      location: 'Buenos Aires, Argentina',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      avatarFallback: 'CM',
      rating: 5,
      date: '18 de Abril, 2024',
      stayDuration: '6 noches',
      roomType: 'Suite Familiar',
      verifiedGuest: true,
      category: 'familia',
      comment: 'Excelente estadía en familia. Los niños no querían irse de la piscina y el área de juegos. El servicio de habitaciones fue perfecto y las actividades para niños muy bien organizadas. Una experiencia completa.',
      highlights: ['Perfecto para niños', 'Servicio de habitaciones', 'Actividades familiares'],
      photos: 6,
      helpful: 22
    },
    {
      id: 6,
      name: 'Emma Thompson',
      location: 'Londres, Reino Unido',
      avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=face',
      avatarFallback: 'ET',
      rating: 5,
      date: '3 de Mayo, 2024',
      stayDuration: '4 noches',
      roomType: 'Suite Presidencial',
      verifiedGuest: true,
      category: 'lujo',
      comment: 'Absolutely stunning hotel with impeccable attention to detail. The concierge service went above and beyond to make our anniversary special. The spa treatments were world-class and the fine dining restaurant exceeded all expectations.',
      highlights: ['Atención al detalle', 'Servicio de concierge', 'Spa de clase mundial'],
      photos: 8,
      helpful: 29
    }
  ];

  // Categorías de filtro
  const categories = [
    { id: 'todos', name: 'Todos', icon: '⭐', count: testimonials.length },
    { id: 'familia', name: 'Familias', icon: '👨‍👩‍👧‍👦', count: testimonials.filter(t => t.category === 'familia').length },
    { id: 'romantico', name: 'Romántico', icon: '💕', count: testimonials.filter(t => t.category === 'romantico').length },
    { id: 'negocios', name: 'Negocios', icon: '💼', count: testimonials.filter(t => t.category === 'negocios').length },
    { id: 'lujo', name: 'Lujo', icon: '👑', count: testimonials.filter(t => t.category === 'lujo').length }
  ];

  // Filtrar testimonios
  const filteredTestimonials = selectedCategory === 'todos' 
    ? testimonials 
    : testimonials.filter(t => t.category === selectedCategory);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % filteredTestimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlay, filteredTestimonials.length]);

  const nextSlide = () => {
    setIsAutoPlay(false);
    setCurrentSlide((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const prevSlide = () => {
    setIsAutoPlay(false);
    setCurrentSlide((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto px-4">
        {/* Header mejorado */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Award size={16} />
            <span>Calificación promedio: 4.9/5</span>
          </div>
          
          <h2 className="font-display text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Lo que dicen nuestros <span className="text-gradient">Huéspedes</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Las experiencias reales de nuestros huéspedes son nuestro mejor testimonio. 
            Cada reseña cuenta una historia única de momentos especiales vividos en nuestro hotel.
          </p>

          {/* Estadísticas */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600 mb-8">
            <div className="flex items-center gap-2">
              <Users size={16} />
              <span>{testimonials.length}+ reseñas verificadas</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp size={16} />
              <span>98% satisfacción general</span>
            </div>
            <div className="flex items-center gap-2">
              <Camera size={16} />
              <span>{testimonials.reduce((acc, t) => acc + t.photos, 0)} fotos compartidas</span>
            </div>
          </div>
        </motion.div>

        {/* Filtros de categoría */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setCurrentSlide(0);
                setIsAutoPlay(true);
              }}
              className={`group relative px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 hover:scale-105 shadow-md hover:shadow-lg'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
              <span className="ml-2 text-xs opacity-75">({category.count})</span>
              
              {selectedCategory === category.id && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full -z-10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Carrusel principal */}
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedCategory}-${currentSlide}`}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
              >
                {filteredTestimonials.length > 0 && (
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Lado izquierdo - Información del huésped */}
                    <div className="space-y-6">
                      {/* Avatar y datos básicos */}
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img
                            src={filteredTestimonials[currentSlide].avatar}
                            alt={filteredTestimonials[currentSlide].name}
                            className="w-20 h-20 rounded-full object-cover ring-4 ring-yellow-100"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div 
                            className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full items-center justify-center text-white font-bold text-xl hidden ring-4 ring-yellow-100"
                          >
                            {filteredTestimonials[currentSlide].avatarFallback}
                          </div>
                          
                          {filteredTestimonials[currentSlide].verifiedGuest && (
                            <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1">
                              <Award size={12} />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="font-bold text-xl text-gray-800">{filteredTestimonials[currentSlide].name}</h4>
                          <div className="flex items-center gap-2 text-gray-600 mb-2">
                            <MapPin size={14} />
                            <span>{filteredTestimonials[currentSlide].location}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar size={12} />
                              <span>{filteredTestimonials[currentSlide].date}</span>
                            </div>
                            <div>•</div>
                            <span>{filteredTestimonials[currentSlide].stayDuration}</span>
                          </div>
                        </div>
                      </div>

                      {/* Rating y detalles */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-5 h-5 ${
                                  i < filteredTestimonials[currentSlide].rating 
                                    ? 'text-yellow-500 fill-current' 
                                    : 'text-gray-300'
                                }`} 
                              />
                            ))}
                          </div>
                          <span className="font-semibold text-gray-800">
                            {filteredTestimonials[currentSlide].rating}.0
                          </span>
                          <span className="text-sm text-gray-500">• Huésped verificado</span>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="text-sm text-gray-600 mb-2">Se hospedó en:</div>
                          <div className="font-semibold text-gray-800">{filteredTestimonials[currentSlide].roomType}</div>
                        </div>

                        {/* Aspectos destacados */}
                        <div>
                          <div className="text-sm text-gray-600 mb-2">Aspectos destacados:</div>
                          <div className="flex flex-wrap gap-2">
                            {filteredTestimonials[currentSlide].highlights.map((highlight, index) => (
                              <span 
                                key={index}
                                className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Lado derecho - Testimonio */}
                    <div className="space-y-6">
                      <div className="relative">
                        <Quote className="absolute -top-2 -left-2 w-8 h-8 text-yellow-500 opacity-50" />
                        <blockquote className="text-lg leading-relaxed text-gray-700 italic pl-6">
                          "{filteredTestimonials[currentSlide].comment}"
                        </blockquote>
                      </div>

                      {/* Métricas de engagement */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Camera size={14} />
                            <span>{filteredTestimonials[currentSlide].photos} fotos</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart size={14} />
                            <span>{filteredTestimonials[currentSlide].helpful} útiles</span>
                          </div>
                        </div>
                        
                        <button className="text-sm text-yellow-600 hover:text-yellow-700 font-medium">
                          Leer reseña completa →
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controles de navegación */}
          {filteredTestimonials.length > 1 && (
            <>
              <button 
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-10"
              >
                <ChevronLeft size={24} className="text-gray-700" />
              </button>
              
              <button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-10"
              >
                <ChevronRight size={24} className="text-gray-700" />
              </button>

              {/* Control de autoplay */}
              <button
                onClick={toggleAutoPlay}
                className="absolute top-4 right-4 bg-black/20 hover:bg-black/30 backdrop-blur-sm rounded-full p-2 transition-all duration-300 text-white"
              >
                {isAutoPlay ? <Pause size={16} /> : <Play size={16} />}
              </button>
            </>
          )}

          {/* Indicadores de slide */}
          {filteredTestimonials.length > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {filteredTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentSlide(index);
                    setIsAutoPlay(false);
                  }}
                  className={`transition-all duration-300 ${
                    index === currentSlide
                      ? 'w-8 h-3 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full'
                      : 'w-3 h-3 bg-gray-300 hover:bg-gray-400 rounded-full'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Estadísticas adicionales */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-2xl p-8 shadow-lg"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-800 mb-2">4.9/5</div>
              <div className="text-sm text-gray-600">Calificación promedio</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-800 mb-2">98%</div>
              <div className="text-sm text-gray-600">Recomendarían el hotel</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-800 mb-2">95%</div>
              <div className="text-sm text-gray-600">Volverían a hospedarse</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-800 mb-2">24h</div>
              <div className="text-sm text-gray-600">Tiempo de respuesta</div>
            </div>
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-lg text-gray-600 mb-6">
            ¿Listo para crear tu propia experiencia memorable?
          </p>
          <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            Reservar Ahora
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;