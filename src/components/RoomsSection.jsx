import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Wifi, 
  Car, 
  Coffee, 
  Tv, 
  Bath, 
  Bed,
  Users,
  Square,
  Star,
  MapPin,
  Calendar,
  Eye
} from 'lucide-react';

const RoomsSection = ({ onRoomSelect }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const rooms = [
    {
      id: 1,
      name: 'Suite Presidencial',
      category: 'Suite de Lujo',
      description: 'La experiencia definitiva en hospitalidad de lujo. Una suite de 120m² que combina elegancia clásica con tecnología de vanguardia, ofreciendo vistas panorámicas espectaculares y servicios exclusivos.',
      detailedDescription: 'Disfrute de la máxima privacidad y lujo en nuestra Suite Presidencial. Con una sala de estar independiente, dormitorio principal con cama king-size de alta gama, baño de mármol con jacuzzi, terraza privada con vista al mar y servicio de mayordomo personalizado las 24 horas.',
      features: [
        { icon: <Square size={16} />, text: '120m²' },
        { icon: <Users size={16} />, text: '2-4 huéspedes' },
        { icon: <MapPin size={16} />, text: 'Vista panorámica al mar' },
        { icon: <Bath size={16} />, text: 'Jacuzzi privado' },
        { icon: <Bed size={16} />, text: 'Cama King Size premium' },
        { icon: <Wifi size={16} />, text: 'WiFi de alta velocidad' },
        { icon: <Tv size={16} />, text: 'Smart TV 75" 4K' },
        { icon: <Coffee size={16} />, text: 'Minibar premium' }
      ],
      amenities: [
        'Servicio de mayordomo 24h',
        'Terraza privada 40m²',
        'Sala de estar independiente',
        'Baño de mármol Carrara',
        'Ducha de efecto lluvia',
        'Bañera de hidromasaje',
        'Caja fuerte digital',
        'Servicio de lavandería express',
        'Welcome amenities de lujo',
        'Acceso prioritario al spa'
      ],
      price: 450,
      originalPrice: 580,
      currency: '€',
      rating: 4.9,
      reviews: 127,
      images: [
        'https://images.unsplash.com/photo-1660562229022-ddf20f275066?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1582024921682-961afe4621cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
      ],
      popularityBadge: 'Más Popular',
      discount: 22
    },
    {
      id: 2,
      name: 'Suite Junior',
      category: 'Suite Elegante',
      description: 'Un refugio de sofisticación y confort que combina espacios amplios con detalles de diseño excepcionales. Perfecta para huéspedes que buscan lujo accesible sin comprometer la calidad.',
      detailedDescription: 'Nuestra Suite Junior ofrece 80m² de elegancia refinada con un dormitorio principal, área de estar cómoda, baño de mármol con ducha de lluvia, balcón privado y todas las comodidades modernas para una estancia memorable.',
      features: [
        { icon: <Square size={16} />, text: '80m²' },
        { icon: <Users size={16} />, text: '2-3 huéspedes' },
        { icon: <MapPin size={16} />, text: 'Vista a la ciudad' },
        { icon: <Bath size={16} />, text: 'Baño de mármol' },
        { icon: <Bed size={16} />, text: 'Cama King Size' },
        { icon: <Wifi size={16} />, text: 'WiFi gratuito' },
        { icon: <Tv size={16} />, text: 'Smart TV 65"' },
        { icon: <Coffee size={16} />, text: 'Estación de café' }
      ],
      amenities: [
        'Área de estar separada',
        'Balcón privado con mobiliario',
        'Baño de mármol premium',
        'Ducha de efecto lluvia',
        'Escritorio ejecutivo',
        'Minibar completo',
        'Caja fuerte',
        'Servicio de habitaciones 24h',
        'Amenities de bienvenida',
        'Acceso al business center'
      ],
      price: 280,
      originalPrice: 350,
      currency: '€',
      rating: 4.8,
      reviews: 203,
      images: [
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
      ],
      discount: 20
    },
    {
      id: 3,
      name: 'Habitación Deluxe',
      category: 'Habitación Premium',
      description: 'Elegancia contemporánea y confort excepcional en cada detalle. Una habitación de 45m² diseñada para ofrecer la perfecta combinación de funcionalidad moderna y lujo accesible.',
      detailedDescription: 'La Habitación Deluxe está pensada para el viajero moderno que aprecia los detalles refinados. Con un diseño contemporáneo, balcón privado, baño completo de mármol y todas las comodidades necesarias para una estancia perfecta.',
      features: [
        { icon: <Square size={16} />, text: '45m²' },
        { icon: <Users size={16} />, text: '2 huéspedes' },
        { icon: <MapPin size={16} />, text: 'Vista al jardín' },
        { icon: <Bath size={16} />, text: 'Baño completo' },
        { icon: <Bed size={16} />, text: 'Cama Queen Size' },
        { icon: <Wifi size={16} />, text: 'WiFi gratuito' },
        { icon: <Tv size={16} />, text: 'Smart TV 55"' },
        { icon: <Coffee size={16} />, text: 'Cafetera Nespresso' }
      ],
      amenities: [
        'Balcón privado amueblado',
        'Baño de mármol',
        'Ducha de lluvia',
        'Escritorio de trabajo',
        'Minibar básico',
        'Caja fuerte',
        'Plancha y tabla',
        'Secador de pelo premium',
        'Kit de amenities',
        'Servicio de limpieza diario'
      ],
      price: 180,
      originalPrice: 220,
      currency: '€',
      rating: 4.7,
      reviews: 156,
      images: [
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1540518614846-7eded47ee476?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
      ],
      discount: 18
    },
    {
      id: 4,
      name: 'Habitación Superior',
      category: 'Habitación Confort',
      description: 'Comodidad moderna con un excelente valor. Una habitación de 35m² perfectamente equipada que ofrece todas las amenidades esenciales con el toque de calidad que nos caracteriza.',
      detailedDescription: 'Ideal para estancias de negocios o placer, la Habitación Superior combina funcionalidad y estilo. Con vista al jardín, un espacio de trabajo cómodo y un baño moderno completamente equipado.',
      features: [
        { icon: <Square size={16} />, text: '35m²' },
        { icon: <Users size={16} />, text: '2 huéspedes' },
        { icon: <MapPin size={16} />, text: 'Vista al jardín' },
        { icon: <Bath size={16} />, text: 'Baño moderno' },
        { icon: <Bed size={16} />, text: 'Cama Queen Size' },
        { icon: <Wifi size={16} />, text: 'WiFi gratuito' },
        { icon: <Tv size={16} />, text: 'Smart TV 50"' },
        { icon: <Coffee size={16} />, text: 'Set de té/café' }
      ],
      amenities: [
        'Ventana panorámica',
        'Baño moderno completo',
        'Ducha estándar',
        'Área de trabajo',
        'Refrigerador pequeño',
        'Caja fuerte',
        'Aire acondicionado',
        'Calefacción',
        'Kit básico de amenities',
        'Limpieza diaria'
      ],
      price: 120,
      originalPrice: 150,
      currency: '€',
      rating: 4.5,
      reviews: 89,
      images: [
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1540518614846-7eded47ee476?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
      ],
      discount: 20
    },
    {
      id: 5,
      name: 'Habitación Familiar',
      category: 'Habitación Espaciosa',
      description: 'Diseñada especialmente para familias, esta habitación de 55m² ofrece espacio y comodidad para hasta 4 personas, con áreas separadas y amenidades pensadas para todas las edades.',
      detailedDescription: 'La solución perfecta para familias que viajan juntas. Con dos áreas de descanso, baño familiar amplio, zona de juegos para niños y todas las comodidades necesarias para hacer sentir a todos como en casa.',
      features: [
        { icon: <Square size={16} />, text: '55m²' },
        { icon: <Users size={16} />, text: '2-4 huéspedes' },
        { icon: <MapPin size={16} />, text: 'Vista al parque' },
        { icon: <Bath size={16} />, text: 'Baño familiar' },
        { icon: <Bed size={16} />, text: '2 camas dobles' },
        { icon: <Wifi size={16} />, text: 'WiFi gratuito' },
        { icon: <Tv size={16} />, text: 'Smart TV 55"' },
        { icon: <Coffee size={16} />, text: 'Cocina básica' }
      ],
      amenities: [
        'Dos áreas de descanso',
        'Baño familiar amplio',
        'Zona de juegos',
        'Cocina básica equipada',
        'Refrigerador grande',
        'Microondas',
        'Mesa de comedor',
        'Sofá cama adicional',
        'Kit familiar de amenities',
        'Cunas disponibles'
      ],
      price: 200,
      originalPrice: 260,
      currency: '€',
      rating: 4.6,
      reviews: 74,
      images: [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1582024921682-961afe4621cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
      ],
      popularityBadge: 'Ideal Familias',
      discount: 23
    }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-play del carrusel
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % rooms.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [isAutoPlay, rooms.length]);

  const nextSlide = () => {
    setIsAutoPlay(false);
    setCurrentSlide((prev) => (prev + 1) % rooms.length);
    setCurrentImageIndex(0);
  };

  const prevSlide = () => {
    setIsAutoPlay(false);
    setCurrentSlide((prev) => (prev - 1 + rooms.length) % rooms.length);
    setCurrentImageIndex(0);
  };

  const goToSlide = (index) => {
    setIsAutoPlay(false);
    setCurrentSlide(index);
    setCurrentImageIndex(0);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    const currentRoom = rooms[currentSlide];
    setCurrentImageIndex((prev) => (prev + 1) % currentRoom.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    const currentRoom = rooms[currentSlide];
    setCurrentImageIndex((prev) => (prev - 1 + currentRoom.images.length) % currentRoom.images.length);
  };

  const currentRoom = rooms[currentSlide];

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Nuestras <span className="text-gradient">Habitaciones</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Cada habitación es un santuario de elegancia y confort, meticulosamente diseñada para superar tus expectativas y crear recuerdos inolvidables
          </p>
          <div className="mt-8 flex justify-center">
            <div className="bg-white rounded-full px-6 py-2 shadow-md">
              <span className="text-sm text-gray-600">🏨 {rooms.length} tipos de habitaciones disponibles</span>
            </div>
          </div>
        </motion.div>

        {/* Carrusel Principal */}
        <div className="relative max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]"
              >
                {/* Galería de Imágenes */}
                <div className="relative overflow-hidden">
                  <div className="relative h-full min-h-[400px] lg:min-h-[600px]">
                    <img
                      src={currentRoom.images[currentImageIndex]}
                      alt={`${currentRoom.name} - Vista ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                      {currentRoom.popularityBadge && (
                        <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                          ⭐ {currentRoom.popularityBadge}
                        </span>
                      )}
                      {currentRoom.discount > 0 && (
                        <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                          -{currentRoom.discount}% OFF
                        </span>
                      )}
                    </div>

                    {/* Precio */}
                    <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 line-through text-sm">{currentRoom.currency}{currentRoom.originalPrice}</span>
                          <span className="text-2xl font-bold text-gray-800">{currentRoom.currency}{currentRoom.price}</span>
                        </div>
                        <span className="text-sm text-gray-600">por noche</span>
                      </div>
                    </div>

                    {/* Navegación de Imágenes */}
                    {currentRoom.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-300"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-300"
                        >
                          <ChevronRight size={20} />
                        </button>
                        
                        {/* Indicadores de imagen */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                          {currentRoom.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentImageIndex(index);
                              }}
                              className={`w-2 h-2 rounded-full transition-all ${
                                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}

                    {/* Rating */}
                    <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={i < Math.floor(currentRoom.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-semibold text-gray-800">{currentRoom.rating}</span>
                        <span className="text-sm text-gray-600">({currentRoom.reviews} reseñas)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Información de la Habitación */}
                <div className="p-8 lg:p-12 flex flex-col justify-between">
                  <div>
                    <div className="mb-6">
                      <span className="text-sm font-semibold text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
                        {currentRoom.category}
                      </span>
                      <h3 className="font-display text-3xl lg:text-4xl font-bold text-gray-800 mt-4 mb-4">
                        {currentRoom.name}
                      </h3>
                      <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        {currentRoom.description}
                      </p>
                    </div>

                    {/* Características principales */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                      {currentRoom.features.slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-700">
                          <div className="text-yellow-500">{feature.icon}</div>
                          <span className="text-sm font-medium">{feature.text}</span>
                        </div>
                      ))}
                    </div>

                    {/* Amenidades destacadas */}
                    <div className="mb-8">
                      <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Star className="text-yellow-500" size={18} />
                        Amenidades Destacadas
                      </h4>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                        {currentRoom.amenities.slice(0, 6).map((amenity, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                            {amenity}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => onRoomSelect(currentRoom)}
                      className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      <Eye size={18} />
                      Ver Detalles Completos
                    </button>
                    <button
                      onClick={() => {
                        // Aquí iría la lógica de reserva directa
                        onRoomSelect(currentRoom);
                      }}
                      className="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Calendar size={18} />
                      Reservar Ahora
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controles de navegación */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 bg-white hover:bg-gray-50 rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 group border border-gray-200"
          >
            <ChevronLeft size={24} className="text-gray-600 group-hover:text-gray-800" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 bg-white hover:bg-gray-50 rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 group border border-gray-200"
          >
            <ChevronRight size={24} className="text-gray-600 group-hover:text-gray-800" />
          </button>
        </div>

        {/* Indicadores de habitación */}
        <div className="flex justify-center mt-12 gap-4 flex-wrap">
          {rooms.map((room, index) => (
            <button
              key={room.id}
              onClick={() => goToSlide(index)}
              className={`group relative p-4 rounded-2xl transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg'
                  : 'bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-800 shadow-md hover:shadow-lg'
              }`}
            >
              <div className="flex flex-col items-center gap-2 min-w-[120px]">
                <span className="font-semibold text-sm">{room.name}</span>
                <span className="text-xs opacity-80">{room.currency}{room.price}/noche</span>
                {room.popularityBadge && index === currentSlide && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                    ⭐
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Información adicional */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-2xl p-8 shadow-lg"
        >
          <div className="text-center">
            <h3 className="font-display text-2xl font-bold text-gray-800 mb-4">
              ¿Necesitas ayuda para elegir?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Nuestro equipo de expertos está disponible 24/7 para ayudarte a encontrar la habitación perfecta para tu estancia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                📞 Llamar al Concierge
              </button>
              <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                💬 Chat en Vivo
              </button>
              <button className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-800 font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                📋 Comparar Habitaciones
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-800">98%</div>
            <div className="text-sm text-gray-600">Satisfacción de huéspedes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-800">24/7</div>
            <div className="text-sm text-gray-600">Servicio al cliente</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-800">5★</div>
            <div className="text-sm text-gray-600">Rating promedio</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-800">50+</div>
            <div className="text-sm text-gray-600">Amenidades incluidas</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RoomsSection;