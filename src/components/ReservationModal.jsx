import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const ReservationModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [reservationDetails, setReservationDetails] = useState({
    checkIn: '',
    checkOut: '',
    guests: '1',
    name: '',
    email: '',
    phone: '',
  });
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setReservationDetails((prev) => ({ ...prev, [id]: value }));
  };

  const handleNextStep = () => {
    if (reservationDetails.checkIn && reservationDetails.checkOut) {
      if (new Date(reservationDetails.checkIn) >= new Date(reservationDetails.checkOut)) {
        toast({
          title: "Error de Fechas",
          description: "La fecha de check-out debe ser posterior a la de check-in.",
          variant: "destructive",
        });
        return;
      }
      setStep(2);
    } else {
      toast({
        title: "Campos Incompletos",
        description: "Por favor, seleccione las fechas de check-in y check-out.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reservationDetails.name && reservationDetails.email) {
      console.log('Reservation Submitted:', reservationDetails);
      toast({
        title: "¡Reserva Solicitada!",
        description: `Gracias, ${reservationDetails.name}. Hemos recibido tu solicitud y te contactaremos pronto.`,
        className: 'bg-green-100 border-green-400 text-green-700',
      });
      onClose();
      setStep(1);
    } else {
      toast({
        title: "Campos Incompletos",
        description: "Por favor, complete su nombre y email.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] md:sm:max-w-md p-0 bg-gray-900/90 backdrop-blur-sm border-yellow-500/20 text-white">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="font-display text-3xl text-gradient">Realizar una Reserva</DialogTitle>
          <DialogDescription className="text-gray-400">
            {step === 1 ? "Selecciona tus fechas y número de huéspedes." : "Completa tus datos personales para finalizar."}
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-hidden relative h-80">
          <AnimatePresence initial={false}>
            <motion.div
              key={step}
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="p-6 pt-0 absolute w-full"
            >
              {step === 1 && (
                <div className="grid gap-6 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="checkIn" className="text-right text-gray-300">Check-in</Label>
                    <Input id="checkIn" type="date" value={reservationDetails.checkIn} onChange={handleInputChange} className="col-span-3 modal-input" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="checkOut" className="text-right text-gray-300">Check-out</Label>
                    <Input id="checkOut" type="date" value={reservationDetails.checkOut} onChange={handleInputChange} className="col-span-3 modal-input" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="guests" className="text-right text-gray-300">Huéspedes</Label>
                    <select id="guests" value={reservationDetails.guests} onChange={handleInputChange} className="col-span-3 h-10 w-full rounded-md border border-yellow-500/30 bg-gray-800/50 px-3 py-2 text-sm text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent appearance-none">
                      <option value="1">1 Huésped</option>
                      <option value="2">2 Huéspedes</option>
                      <option value="3">3 Huéspedes</option>
                      <option value="4">4 Huéspedes</option>
                    </select>
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="grid gap-6 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right text-gray-300">Nombre</Label>
                    <Input id="name" value={reservationDetails.name} onChange={handleInputChange} placeholder="Nombre Completo" className="col-span-3 modal-input" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right text-gray-300">Email</Label>
                    <Input id="email" type="email" value={reservationDetails.email} onChange={handleInputChange} placeholder="tu@email.com" className="col-span-3 modal-input" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right text-gray-300">Teléfono</Label>
                    <Input id="phone" type="tel" value={reservationDetails.phone} onChange={handleInputChange} placeholder="(Opcional)" className="col-span-3 modal-input" />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <DialogFooter className="p-6 pt-2">
          {step === 1 && <Button onClick={handleNextStep} className="btn-primary w-full text-lg">Siguiente</Button>}
          {step === 2 && (
            <div className="flex w-full gap-2">
              <Button variant="outline" onClick={() => setStep(1)} className="w-1/3 border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-400">Atrás</Button>
              <Button onClick={handleSubmit} className="btn-primary w-2/3 text-lg">Confirmar Reserva</Button>
            </div>
          )}
        </DialogFooter>
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4 text-gray-400 hover:text-white" />
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationModal;