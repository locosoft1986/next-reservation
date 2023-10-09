import { create } from 'zustand';
import {SafeReservation} from "@/app/types";

interface TableModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useTableModal = create<TableModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useTableModal;
