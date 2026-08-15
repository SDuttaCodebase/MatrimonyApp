// src/theme/theme.js (or wherever your theme file is located)

const palette = {
  brandDarkest: '#80001E',
  brandDark: '#80263B', 
  brandPrimary: '#FF003C',
  brandLight: '#FF4D76',
  brandLightest: '#CC002F', 
};

export const lightTheme = {
  mode: 'light',
  colors: {
    primary: palette.brandPrimary,
    background: '#F5F5F5',       
    surface: '#FFFFFF',          
    text: '#121212',             
    subtext: '#666666',          
    border: '#E0E0E0',
    ...palette,
  },
};

export const darkTheme = {
  mode: 'dark',
  colors: {
    primary: palette.brandPrimary,
    background: '#0D0D12',       // Minimalist, technical dark background
    surface: '#1A1A24',          // Elevated dark surface for profile cards
    text: '#EFEFEF',             
    subtext: '#A0A0AA',          
    border: '#2A2A35',
    ...palette,
  },
};