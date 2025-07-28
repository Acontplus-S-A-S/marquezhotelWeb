import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  ZoomIn, 
  Download, 
  Share2, 
  Heart,
  Play,
  Camera,
  MapPin,
  Clock
} from 'lucide-react';

const GallerySection = ({ onImageClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [likedImages, setLikedImages] = useState(new Set());

  const categories = [
    { id: 'todos', name: 'Todas las Experiencias', icon: '🎨' },
    { id: 'habitaciones', name: 'Habitaciones', icon: '🛏️' },
    { id: 'restaurante', name: 'Gastronomía', icon: '🍽️' },
    { id: 'spa', name: 'Spa & Wellness', icon: '🧘‍♀️' },
    { id: 'instalaciones', name: 'Instalaciones', icon: '🏨' },
    { id: 'eventos', name: 'Eventos', icon: '🎉' }
  ];

  const galleryImages = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1531982535417-a39d136cca87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      alt: 'Piscina infinita con vista panorámica al atardecer',
      title: 'Piscina Infinita',
      description: 'Disfruta de vistas espectaculares mientras te relajas en nuestra piscina infinita de última generación.',
      category: 'instalaciones',
      location: 'Terraza Principal',
      time: 'Todo el día',
      type: 'image',
      photographer: 'Hotel Marquez del Coca',
      tags: ['piscina', 'relajación', 'vista', 'atardecer']
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1572803089768-1b990231961a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      alt: 'Restaurante gourmet con ambiente elegante y cuisine de autor',
      title: 'Restaurante Gourmet',
      description: 'Experiencia gastronómica excepcional con platos de autor preparados por nuestro chef ejecutivo.',
      category: 'restaurante',
      location: 'Planta Baja',
      time: '19:00 - 23:00',
      type: 'image',
      photographer: 'Chef Martinez',
      tags: ['gastronomía', 'elegancia', 'cena', 'chef']
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1651065213855-e6094f99ee65?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      alt: 'Spa de lujo con tratamientos relajantes y ambiente zen',
      title: 'Spa & Wellness',
      description: 'Santuario de bienestar con tratamientos holísticos y terapias de relajación profunda.',
      category: 'spa',
      location: 'Planta 2',
      time: '08:00 - 22:00',
      type: 'image',
      photographer: 'Wellness Team',
      tags: ['spa', 'relajación', 'bienestar', 'masajes']
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1527354312291-96b897435a47?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      alt: 'Huéspedes disfrutando de experiencias únicas durante su estancia',
      title: 'Experiencias Inolvidables',
      description: 'Momentos mágicos capturados durante la estancia de nuestros huéspedes más especiales.',
      category: 'eventos',
      location: 'Diversos espacios',
      time: 'Durante tu estancia',
      type: 'image',
      photographer: 'Guest Relations',
      tags: ['huéspedes', 'momentos', 'experiencias', 'memorias']
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1695093360120-490f21ca62a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      alt: 'Lobby elegante con diseño interior de lujo y arte contemporáneo',
      title: 'Lobby de Entrada',
      description: 'Recepción elegante que da la bienvenida con arte contemporáneo y diseño sofisticado.',
      category: 'instalaciones',
      location: 'Planta Baja',
      time: '24/7',
      type: 'image',
      photographer: 'Design Studio',
      tags: ['lobby', 'elegancia', 'arte', 'recepción']
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1540111970170-b1c4d4fbadaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      alt: 'Centro fitness moderno con equipamiento de última generación',
      title: 'Centro Fitness',
      description: 'Gimnasio completamente equipado con la última tecnología en equipamiento deportivo.',
      category: 'instalaciones',
      location: 'Planta 3',
      time: '05:00 - 24:00',
      type: 'image',
      photographer: 'Fitness Team',
      tags: ['fitness', 'ejercicio', 'salud', 'tecnología']
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      alt: 'Suite presidencial con vistas panorámicas y decoración de lujo',
      title: 'Suite Presidencial',
      description: 'La cúspide del lujo hotelero con vistas panorámicas y amenidades exclusivas.',
      category: 'habitaciones',
      location: 'Piso 15',
      time: 'Estancia completa',
      type: 'image',
      photographer: 'Interior Design',
      tags: ['suite', 'lujo', 'vista', 'presidencial']
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      alt: 'Habitación deluxe con balcón privado y decoración contemporánea',
      title: 'Habitación Deluxe',
      description: 'Elegancia contemporánea con balcón privado y vistas espectaculares de la ciudad.',
      category: 'habitaciones',
      location: 'Pisos 8-12',
      time: 'Estancia completa',
      type: 'image',
      photographer: 'Room Service',
      tags: ['deluxe', 'balcón', 'contemporáneo', 'vista']
    },
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      alt: 'Bar de cócteles con mixología artesanal y ambiente nocturno',
      title: 'Bar de Cócteles',
      description: 'Mixología artesanal en un ambiente sofisticado perfecto para veladas especiales.',
      category: 'restaurante',
      location: 'Planta 14',
      time: '18:00 - 02:00',
      type: 'image',
      photographer: 'Mixology Team',
      tags: ['bar', 'cócteles', 'noche', 'mixología']
    },
    {
      id: 10,
      src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      alt: 'Salón de eventos para bodas y celebraciones especiales',
      title: 'Salón de Eventos',
      description: 'Espacio elegante para bodas, celebraciones corporativas y eventos memorables.',
      category: 'eventos',
      location: 'Planta 5',
      time: 'Bajo reserva',
      type: 'image',
      photographer: 'Events Team',
      tags: ['eventos', 'bodas', 'celebraciones', 'corporativo']
    },
    {
      id: 11,
      src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      alt: 'Desayuno buffet gourmet con productos locales frescos',
      title: 'Desayuno Gourmet',
      description: 'Buffet internacional con productos locales frescos y opciones saludables.',
      category: 'restaurante',
      location: 'Restaurante Principal',
      time: '06:30 - 10:30',
      type: 'image',
      photographer: 'Culinary Team',
      tags: ['desayuno', 'buffet', 'gourmet', 'fresco']
    },
    {
      id: 12,
      src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      alt: 'Terraza al aire libre con vista nocturna de la ciudad',
      title: 'Terraza Nocturna',
      description: 'Terraza al aire libre perfecta para disfrutar de las vistas nocturnas de la ciudad.',
      category: 'instalaciones',
      location: 'Azotea',
      time: '18:00 - 24:00',
      type: 'image',
      photographer: 'Night Photography',
      tags: ['terraza', 'noche', 'vista', 'ciudad']
    }
  ];

  const filteredImages = selectedCategory === 'todos' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const imagesPerSlide = 4;
  const totalSlides = Math.ceil(filteredImages.length / imagesPerSlide);

  // Auto-play del carrusel
  useEffect(() => {
    if (!isAutoPlay || totalSlides <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlay, totalSlides]);

  const nextSlide = () => {
    setIsAutoPlay(false);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setIsAutoPlay(false);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const openLightbox = (image, index) => {
    setLightboxImage(image);
    setLightboxIndex(index);
    if (onImageClick) onImageClick(image);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const nextLightboxImage = () => {
    const nextIndex = (lightboxIndex + 1) % filteredImages.length;
    setLightboxIndex(nextIndex);
    setLightboxImage(filteredImages[nextIndex]);
  };

  const prevLightboxImage = () => {
    const prevIndex = (lightboxIndex - 1 + filteredImages.length) % filteredImages.length;
    setLightboxIndex(prevIndex);
    setLightboxImage(filteredImages[prevIndex]);
  };

  const toggleLike = (imageId, e) => {
    e.stopPropagation();
    setLikedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(imageId)) {
        newSet.delete(imageId);
      } else {
        newSet.add(imageId);
      }
      return newSet;
    });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentSlide(0);
    setIsAutoPlay(true);
  };

  return (
    <>
      <section className="section-padding bg-gradient-to-br from-gray-50 via-white to-gray-100">
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
              Galería de <span className="text-gradient">Experiencias</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Descubre los espacios únicos y momentos mágicos que hacen de tu estancia una experiencia verdaderamente memorable
            </p>
            
            {/* Stats */}
            <div className="flex justify-center gap-8 text-sm text-gray-600 mb-8">
              <div className="flex items-center gap-2">
                <Camera size={16} />
                <span>{galleryImages.length} fotos profesionales</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart size={16} />
                <span>98% de satisfacción visual</span>
              </div>
              <div className="flex items-center gap-2">
                <ZoomIn size={16} />
                <span>Vista en alta resolución</span>
              </div>
            </div>
          </motion.div>

          {/* Category Filter */}
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
                onClick={() => handleCategoryChange(category.id)}
                className={`group relative px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg transform scale-105'
                    : 'bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 shadow-md hover:shadow-lg border border-gray-200'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg">{category.icon}</span>
                  {category.name}
                </span>
                {selectedCategory === category.id && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full -z-10"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </motion.div>

          {/* Gallery Carousel */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <motion.div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
                      {filteredImages
                        .slice(slideIndex * imagesPerSlide, (slideIndex + 1) * imagesPerSlide)
                        .map((image, index) => (
                          <motion.div
                            key={image.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
                            onClick={() => openLightbox(image, slideIndex * imagesPerSlide + index)}
                          >
                            <div className="aspect-[4/3] overflow-hidden">
                              <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                              />
                              
                              {/* Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                                    <ZoomIn className="text-white" size={24} />
                                  </div>
                                </div>
                              </div>

                              {/* Like Button */}
                              <button
                                onClick={(e) => toggleLike(image.id, e)}
                                className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-2 transition-all duration-300 transform hover:scale-110"
                              >
                                <Heart
                                  size={16}
                                  className={`transition-colors duration-200 ${
                                    likedImages.has(image.id)
                                      ? 'text-red-500 fill-current'
                                      : 'text-white'
                                  }`}
                                />
                              </button>

                              {/* Category Badge */}
                              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                                <span className="text-xs font-semibold text-gray-800">
                                  {categories.find(cat => cat.id === image.category)?.icon} {image.category}
                                </span>
                              </div>
                            </div>

                            {/* Image Info */}
                            <div className="p-4">
                              <h3 className="font-bold text-gray-800 mb-2 group-hover:text-yellow-600 transition-colors">
                                {image.title}
                              </h3>
                              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                {image.description}
                              </p>
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                  <MapPin size={12} />
                                  {image.location}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock size={12} />
                                  {image.time}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation Arrows */}
            {totalSlides > 1 && (
              <>
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
              </>
            )}
          </div>

          {/* Slide Indicators */}
          {totalSlides > 1 && (
            <div className="flex justify-center mt-8 gap-3">
              {Array.from({ length: totalSlides }).map((_, index) => (
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

          {/* Gallery Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 bg-white rounded-2xl p-8 shadow-lg"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {filteredImages.length}
                </div>
                <div className="text-sm text-gray-600">Experiencias Capturadas</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800 mb-2">4K</div>
                <div className="text-sm text-gray-600">Resolución Premium</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800 mb-2">360°</div>
                <div className="text-sm text-gray-600">Vistas Panorámicas</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800 mb-2">24/7</div>
                <div className="text-sm text-gray-600">Nuevas Experiencias</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Advanced Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Main Image */}
              <div className="relative max-w-full max-h-full">
                <img
                  src={lightboxImage.src}
                  alt={lightboxImage.alt}
                  className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                />
              </div>

              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-3 transition-all duration-300 text-white hover:scale-110"
              >
                <X size={24} />
              </button>

              {/* Navigation Arrows */}
              {filteredImages.length > 1 && (
                <>
                  <button
                    onClick={prevLightboxImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-3 transition-all duration-300 text-white hover:scale-110"
                  >
                    <ChevronLeft size={28} />
                  </button>
                  
                  <button
                    onClick={nextLightboxImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-3 transition-all duration-300 text-white hover:scale-110"
                  >
                    <ChevronRight size={28} />
                  </button>
                </>
              )}

              {/* Image Info Panel */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-md rounded-2xl p-6 text-white">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                        {categories.find(cat => cat.id === lightboxImage.category)?.icon} {lightboxImage.category}
                      </span>
                      <span className="text-sm opacity-75">
                        {lightboxIndex + 1} de {filteredImages.length}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{lightboxImage.title}</h3>
                    <p className="text-gray-200 mb-3">{lightboxImage.description}</p>
                    <div className="flex items-center gap-6 text-sm text-gray-300">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        {lightboxImage.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {lightboxImage.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <Camera size={14} />
                        {lightboxImage.photographer}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => toggleLike(lightboxImage.id, e)}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110"
                    >
                      <Heart
                        size={20}
                        className={`transition-colors duration-200 ${
                          likedImages.has(lightboxImage.id)
                            ? 'text-red-500 fill-current'
                            : 'text-white'
                        }`}
                      />
                    </button>
                    
                    <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110">
                      <Share2 size={20} />
                    </button>
                    
                    <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110">
                      <Download size={20} />
                    </button>
                  </div>
                </div>

                {/* Tags */}
                {lightboxImage.tags && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {lightboxImage.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-gray-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Thumbnail Navigation */}
              {filteredImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-full mt-4">
                  <div className="flex gap-2 max-w-md overflow-x-auto scrollbar-hide">
                    {filteredImages.map((img, index) => (
                      <button
                        key={img.id}
                        onClick={() => {
                          setLightboxIndex(index);
                          setLightboxImage(img);
                        }}
                        className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                          index === lightboxIndex
                            ? 'border-yellow-500 opacity-100'
                            : 'border-white/30 opacity-60 hover:opacity-80'
                        }`}
                      >
                        <img
                          src={img.src}
                          alt={img.title}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GallerySection;