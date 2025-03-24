'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define types for UI state
interface UIState {
  theme: 'light' | 'dark' | 'system';
  activeModal: string | null;
  currentFeatureIndex: number;
  isContactFormOpen: boolean;
  
  // Actions
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  openModal: (id: string) => void;
  closeModal: () => void;
  nextFeature: () => void;
  setFeatureIndex: (index: number) => void;
  toggleContactForm: (isOpen?: boolean) => void;
}

// Create the store
export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      // Initial state
      theme: 'system',
      activeModal: null,
      currentFeatureIndex: 0,
      isContactFormOpen: false,
      
      // Actions
      setTheme: (theme) => set({ theme }),
      
      openModal: (id) => set({ activeModal: id }),
      
      closeModal: () => set({ activeModal: null }),
      
      nextFeature: () => {
        const { currentFeatureIndex } = get();
        // Assuming we have 9 features (from config.ts)
        const nextIndex = (currentFeatureIndex + 1) % 9;
        set({ currentFeatureIndex: nextIndex });
      },
      
      setFeatureIndex: (index) => set({ currentFeatureIndex: index }),
      
      toggleContactForm: (isOpen) => set((state) => ({ 
        isContactFormOpen: isOpen !== undefined ? isOpen : !state.isContactFormOpen 
      })),
    }),
    {
      name: 'foh-pro-ui-store',
      partialize: (state) => ({ 
        theme: state.theme,
        // Only persist theme preferences, not transient UI state
      }),
    }
  )
);

// Hook for theme handling
export const useTheme = () => {
  const { theme, setTheme } = useUIStore();
  
  // Toggle between light and dark
  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('light');
    else {
      // If system, get current preference and switch to opposite
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(isDark ? 'light' : 'dark');
    }
  };
  
  return { theme, setTheme, toggleTheme };
};
