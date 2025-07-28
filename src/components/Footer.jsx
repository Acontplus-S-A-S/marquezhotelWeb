import React from 'react';
import { useToast } from '@/components/ui/use-toast';
import { MapPin, Phone, Mail, Wifi, Car, Coffee, Waves, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = ({ hotelName }) => {
  const { toast } = useToast();

  const handleNavClick = (section) => {
    toast({
      title: '🚧 Esta funcionalidad aún no está implementada',
      description: '¡Pero no te preocupes! Puedes solicitarla en tu próximo prompt! 🚀',
      duration: 5000,
    });
  };

  return (
    <footer className="bg-gray-900 text-white section-padding">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="font-display text-3xl font-bold text-gradient mb-6">{hotelName}</div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Donde cada detalle está diseñado para crear momentos inolvidables. Experimenta el equilibrio perfecto entre lujo accesible y confort excepcional.
            </p>
            <div className="flex space-x-4">
              <button onClick={() => handleNavClick('facebook')} className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors">
                <Facebook size={20} />
              </button>
              <button onClick={() => handleNavClick('instagram')} className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors">
                <Instagram size={20} />
              </button>
              <button onClick={() => handleNavClick('twitter')} className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors">
                <Twitter size={20} />
              </button>
            </div>
          </div>

          <div>
            <span className="text-xl font-semibold mb-6 block">Contacto</span>
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="text-yellow-500 mr-3" size={20} />
                <span className="text-gray-300">Av. Principal 123, Ciudad</span>
              </div>
              <div className="flex items-center">
                <Phone className="text-yellow-500 mr-3" size={20} />
                <span className="text-gray-300">+34 123 456 789</span>
              </div>
              <div className="flex items-center">
                <Mail className="text-yellow-500 mr-3" size={20} />
                <span className="text-gray-300">info@marquezdelcoca.com</span>
              </div>
            </div>
          </div>

          <div>
            <span className="text-xl font-semibold mb-6 block">Servicios</span>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Wifi className="text-yellow-500 mr-3" size={16} />
                <span>WiFi Gratuito</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Car className="text-yellow-500 mr-3" size={16} />
                <span>Aparcamiento</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Coffee className="text-yellow-500 mr-3" size={16} />
                <span>Desayuno</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Waves className="text-yellow-500 mr-3" size={16} />
                <span>Spa & Piscina</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">© 2024 {hotelName}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;