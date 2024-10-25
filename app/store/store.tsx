import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";

interface StoreState {
  isPlant: boolean;
  isFood: boolean;
  isLiving: boolean;
  setIsPlant: (value: boolean) => void;
  setIsFood: (value: boolean) => void;
  setIsLiving: (value: boolean) => void;
}

// Define a custom storage type for localStorage
const localStorageWrapper: PersistStorage<StoreState> = {
  getItem: (name) => {
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
  removeItem: (name) => localStorage.removeItem(name),
};

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      isPlant: false,
      isFood: false,
      isLiving: false,
      setIsPlant: (value) => set({ isPlant: value }),
      setIsFood: (value) => set({ isFood: value }),
      setIsLiving: (value) => set({ isLiving: value }),
    }),
    {
      name: "my-zustand-store", // Unique name for localStorage
      storage: localStorageWrapper, // Use the custom storage
    }
  )
);

export default useStore;
