import { create } from 'zustand';

// Contains only the sidebar open/close state structure as per architecture requirements
export const useSidebarStore = create((set) => ({
  isOpen: true,
  
  // Placeholders for future state updates
  setIsOpen: (isOpen) => set({ isOpen }),
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
}));
