import { create } from 'zustand';
import { lightTheme, darkTheme } from '../utils/theme';

const useThemeStore = create((set) => ({
  isDarkMode: false, // Setting light mode as the default starting point
  theme: lightTheme, 
  
  toggleTheme: () => set((state) => {
    const newIsDark = !state.isDarkMode;
    return {
      isDarkMode: newIsDark,
      theme: newIsDark ? darkTheme : lightTheme,
    };
  }),
}));

export default useThemeStore;