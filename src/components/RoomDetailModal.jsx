import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';

const RoomDetailModal = ({ room, onClose, onBookNow }) => {
  return (
    <AnimatePresence>
      {room && (
        <Dialog open={true} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-2xl p-0 bg-gray-900/90 backdrop-blur-sm border-yellow-500/20 text-white">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <img src={room.image} alt={room.name} className="w-full h-64 object-cover rounded-t-lg" />
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
                 <div className="absolute top-4 right-4 bg-black/50 px-3 py-1 rounded-full text-sm font-semibold text-white">
                  {room.price}
                </div>
              </div>
              <DialogHeader className="p-6 pt-2">
                <DialogTitle className="font-display text-3xl text-gradient">{room.name}</DialogTitle>
              </DialogHeader>
              <div className="px-6 pb-6">
                <p className="text-gray-300 mb-6">{room.description}</p>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  {room.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="text-yellow-500 mr-3 h-5 w-5" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <DialogFooter className="p-6 bg-black/20 rounded-b-lg">
                <Button onClick={onClose} variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">Cerrar</Button>
                <Button onClick={onBookNow} className="btn-primary">Reservar esta habitación</Button>
              </DialogFooter>
              <DialogClose asChild>
                <button className="absolute right-4 top-4 rounded-full bg-black/50 p-1.5 text-gray-400 opacity-70 transition-opacity hover:opacity-100 focus:outline-none">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </button>
              </DialogClose>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default RoomDetailModal;