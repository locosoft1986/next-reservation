import { create } from 'zustand';

interface SelectedDateStore {
  date: Date;
  setDate: (value: Date) => void;
}

const useSelectedDate = create<SelectedDateStore>((set) => ({
  date: new Date,
  setDate: date => set({ date }),
}));


export default useSelectedDate;
