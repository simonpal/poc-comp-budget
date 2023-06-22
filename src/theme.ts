type Breakpoints = {
  xs: { min: number; max: number };
  sm: { min: number; max: number };
  md: { min: number; max: number };
  lg: { min: number };
};

export type Theme = {
  isDark: boolean;
  colors: {
    primary: string;
    secondary: string;
    primaryButtonBg: string;
    primaryButtonColor: string;
    pageBg: string;
    text: string;
    silver: string;
    inputBg: string;
  };
  breakpoints: Breakpoints;
};

const BREAKPOINTS: Breakpoints = {
  xs: { min: 0, max: 600 },
  sm: { min: 601, max: 960 },
  md: { min: 961, max: 1280 },
  lg: { min: 1281 },
};

export const theme = {
  isDark: false,
  colors: {
    primary: '#1d2e8c',
    secondary: '#04C866',
    primaryButtonBg: '#04060c',
    primaryButtonColor: '#eff2f6',
    pageBg: '#FFF',
    text: '#04060c',
    silver: '#eff2f6',
    inputBg: '#fff',
  },
  breakpoints: {
    ...BREAKPOINTS,
  },
};

export const darkTheme = {
  ...theme,
  isDark: true,
  colors: {
    ...theme.colors,
    primary: '#04C866',
    secondary: '#1d2e8c',
    pageBg: '#082032',
    text: '#FFF',
    silver: 'rgba(255,255,255,0.1)',
    primaryButtonBg: '#04C866',
    inputBg: '#213747',
  },
};
