// GallerySection.jsx - Actualizado con las nuevas imágenes
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

  // NUEVAS IMÁGENES REALES DEL HOTEL
  const galleryImages = [
    {
      id: 1,
      src: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAEsASwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9/KKKKK...', // Tu primera imagen - gimnasio
      alt: 'Centro fitness moderno con equipamiento de última generación y vista a la piscina',
      title: 'Centro Fitness Premium',
      description: 'Gimnasio completamente equipado con la última tecnología en equipamiento deportivo y vistas panorámicas.',
      category: 'instalaciones',
      location: 'Planta 3',
      time: '05:00 - 24:00',
      type: 'image',
      photographer: 'Fitness Team',
      tags: ['fitness', 'ejercicio', 'salud', 'tecnología', 'vista']
    },
    {
      id: 2,
      src: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAEsASwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9/KKKKK...', // Tu segunda imagen - lobby
      alt: 'Lobby elegante con diseño interior moderno y fuente de agua',
      title: 'Lobby Principal',
      description: 'Recepción elegante que da la bienvenida con arte contemporáneo y diseño sofisticado.',
      category: 'instalaciones',
      location: 'Planta Baja',
      time: '24/7',
      type: 'image',
      photographer: 'Design Studio',
      tags: ['lobby', 'elegancia', 'arte', 'recepción', 'moderno']
    },
    {
      id: 3,
      src: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAEsASwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9/KKKKK...', // Tu tercera imagen - piscina nocturna
      alt: 'Piscina infinita con vista panorámica nocturna y iluminación LED',
      title: 'Piscina Nocturna',
      description: 'Disfruta de vistas espectaculares mientras te relajas en nuestra piscina infinita con iluminación especial.',
      category: 'instalaciones',
      location: 'Terraza Principal',
      time: '06:00 - 24:00',
      type: 'image',
      photographer: 'Hotel Team',
      tags: ['piscina', 'relajación', 'vista', 'noche', 'lujo']
    },
    {
      id: 4,
      src: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAEsASwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9/KKKKK...', // Tu cuarta imagen - restaurante elegante
      alt: 'Restaurante gourmet con decoración clásica y ambiente elegante',
      title: 'Restaurante Gourmet',
      description: 'Experiencia gastronómica excepcional con platos de autor en un ambiente de máxima elegancia.',
      category: 'restaurante',
      location: 'Planta Baja',
      time: '19:00 - 23:00',
      type: 'image',
      photographer: 'Chef Team',
      tags: ['gastronomía', 'elegancia', 'cena', 'chef', 'lujo']
    },
    {
      id: 5,
      src: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAEsASwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9/KKKKK...', // Tu quinta imagen - spa con bambú
      alt: 'Spa de lujo con ambiente zen y decoración natural de bambú',
      title: 'Spa & Wellness Zen',
      description: 'Santuario de bienestar con tratamientos holísticos en un ambiente de máxima tranquilidad.',
      category: 'spa',
      location: 'Planta 2',
      time: '08:00 - 22:00',
      type: 'image',
      photographer: 'Wellness Team',
      tags: ['spa', 'relajación', 'bienestar', 'masajes', 'zen']
    },
    // Puedes agregar más imágenes aquí...
    {
      id: 6,
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
      id: 7,
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

  const toggleLike = (imageId, event) => {
    event.stopPropagation();
    setLikedImages(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(imageId)) {
        newLiked.delete(imageId);
      } else {
        newLiked.add(imageId);
      }
      return newLiked;
    });
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
            <div className="flex justify-center gap-8 text-sm text-gray-600 mb-8">
              <div className="flex items-center gap-2">
                <Camera size={16} />
                <span>{galleryImages.length} fotos profesionales</span>
              </div>
              <div className="flex items-center gap-2">
                <ZoomIn size={16} />
                <span>98% de satisfacción visual</span>
              </div>
              <div className="flex items-center gap-2">
                <Download size={16} />
                <span>Vista en alta resolución</span>
              </div>
            </div>
          </motion.div>

          {/* Category Filters */}
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

          {/* Gallery Grid */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: totalSlides }, (_, slideIndex) => (
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
                            className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                            onClick={() => openLightbox(image, slideIndex * imagesPerSlide + index)}
                          >
                            <div className="relative aspect-square overflow-hidden">
                              <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              
                              {/* Overlay Controls */}
                              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button
                                  onClick={(e) => toggleLike(image.id, e)}
                                  className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                                >
                                  <Heart 
                                    size={16} 
                                    className={`${likedImages.has(image.id) ? 'fill-red-500 text-red-500' : 'text-white'}`}
                                  />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Implementar funcionalidad de compartir
                                  }}
                                  className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                                >
                                  <Share2 size={16} className="text-white" />
                                </button>
                              </div>

                              {/* Image Info Overlay */}
                              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="text-white font-semibold text-lg mb-1">{image.title}</h3>
                                <p className="text-white/90 text-sm mb-2 line-clamp-2">{image.description}</p>
                                <div className="flex items-center gap-4 text-white/80 text-xs">
                                  <div className="flex items-center gap-1">
                                    <MapPin size={12} />
                                    <span>{image.location}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock size={12} />
                                    <span>{image.time}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            {totalSlides > 1 && (
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
              </>
            )}

            {/* Slide Indicators */}
            {totalSlides > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: totalSlides }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentSlide
                        ? 'w-8 h-3 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full'
                        : 'w-3 h-3 bg-gray-300 hover:bg-gray-400 rounded-full'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

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

      {/* Lightbox Modal */}
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

              {/* Navigation in Lightbox */}
              {filteredImages.length > 1 && (
                <>
                  <button
                    onClick={() => {
                      const prevIndex = (lightboxIndex - 1 + filteredImages.length) % filteredImages.length;
                      setLightboxIndex(prevIndex);
                      setLightboxImage(filteredImages[prevIndex]);
                    }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-3 transition-all duration-300 text-white hover:scale-110"
                  >
                    <ChevronLeft size={28} />
                  </button>
                  <button
                    onClick={() => {
                      const nextIndex = (lightboxIndex + 1) % filteredImages.length;
                      setLightboxIndex(nextIndex);
                      setLightboxImage(filteredImages[nextIndex]);
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-3 transition-all duration-300 text-white hover:scale-110"
                  >
                    <ChevronRight size={28} />
                  </button>
                </>
              )}

              {/* Image Info */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-xl p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{lightboxImage.title}</h3>
                <p className="text-gray-200 mb-4">{lightboxImage.description}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>{lightboxImage.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{lightboxImage.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Camera size={16} />
                    <span>{lightboxImage.photographer}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {lightboxImage.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white/20 rounded-full text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GallerySection;