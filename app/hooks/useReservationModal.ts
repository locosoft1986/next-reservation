import { create } from 'zustand';
import {SafeReservation} from "@/app/types";

interface ReservationModalStore {
  isOpen: boolean;
  reservation?: SafeReservation;
  onOpen: (reservation?: SafeReservation) => void;
  onClose: () => void;
}

const useReservationModal = create<ReservationModalStore>((set) => ({
  isOpen: false,
  reservation: undefined,
  onOpen: (reservation?: SafeReservation) => set({ isOpen: true, reservation }),
  onClose: () => set({ isOpen: false, reservation: undefined })
}));


export default useReservationModal;
