'use client';

import { ReactNode, useEffect, createContext, useMemo } from 'react';
import { useTheme } from '@/store/uiStore';

interface ProvidersProps {
  children: ReactNode;
}

// React 19: Create context with proper typing from the useTheme hook
export const ThemeContext = createContext<ReturnType<typeof useTheme>>({
  theme: 'system',
  setTheme: () => {},
  toggleTheme: () => {},
});

export function Providers({ children }: ProvidersProps) {
  // Use the existing hook that provides stable function references
  const themeState = useTheme();
  
  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => themeState, [themeState.theme]);
  
  // Apply theme class to html element
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('light', 'dark');
    
    // Apply theme
    if (themeState.theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches 
        ? 'dark' 
        : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(themeState.theme);
    }
  }, [themeState.theme]);
  
  // Listen for system theme changes if using system preference
  useEffect(() => {
    if (themeState.theme !== 'system') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(mediaQuery.matches ? 'dark' : 'light');
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themeState.theme]);
  
  // React 19: Use direct Context component syntax with memoized value
  return (
    <ThemeContext value={contextValue}>
      {children}
    </ThemeContext>
  );
}
