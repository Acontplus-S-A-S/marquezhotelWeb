import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Search } from 'lucide-react';

const ReservationBar = ({ onCheckAvailability }) => {
  const checkInRef = useRef(null);
  const checkOutRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCheckAvailability();
  };

  const handleIconClick = (ref) => {
    ref.current?.showPicker();
  };

  return (
    <section className="container mx-auto px-4 -mt-20 relative z-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="reservation-form max-w-4xl mx-auto"
      >
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          <div>
            <label htmlFor="checkin-date" className="block text-sm font-semibold text-gray-700 mb-2">Check-in</label>
            <div className="relative">
              <input id="checkin-date" ref={checkInRef} type="date" className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
              <Calendar onClick={() => handleIconClick(checkInRef)} className="absolute right-3 top-4 text-gray-400 cursor-pointer" size={20} />
            </div>
          </div>

          <div>
            <label htmlFor="checkout-date" className="block text-sm font-semibold text-gray-700 mb-2">Check-out</label>
            <div className="relative">
              <input id="checkout-date" ref={checkOutRef} type="date" className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
              <Calendar onClick={() => handleIconClick(checkOutRef)} className="absolute right-3 top-4 text-gray-400 cursor-pointer" size={20} />
            </div>
          </div>

          <div>
            <label htmlFor="guests-select" className="block text-sm font-semibold text-gray-700 mb-2">Huéspedes</label>
            <div className="relative">
              <select id="guests-select" className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent appearance-none">
                <option>1 Huésped</option>
                <option>2 Huéspedes</option>
                <option>3 Huéspedes</option>
                <option>4 Huéspedes</option>
              </select>
              <Users className="absolute right-3 top-4 text-gray-400" size={20} />
            </div>
          </div>

          <button type="submit" className="btn-primary h-14">
            <Search size={20} />
            Solicitar disponibilidad
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default ReservationBar;