type Breakpoints = {
  xs: { min: number; max: number };
  sm: { min: number; max: number };
  md: { min: number; max: number };
  lg: { min: number };
};

export type Theme = {
  colors: {
    primary: string;
    secondary: string;
    primaryButtonBg: string;
    primaryButtonColor: string;
    pageBg: string;
    text: string;
    silver: string;
  };
  breakpoints: Breakpoints;
};

export const BREAKPOINTS: Breakpoints = {
  xs: { min: 0, max: 600 },
  sm: { min: 601, max: 960 },
  md: { min: 961, max: 1280 },
  lg: { min: 1281 },
};

export const theme = {
  colors: {
    primary: '#1d2e8c',
    secondary: '#04C866',
    primaryButtonBg: '#04060c',
    primaryButtonColor: '#eff2f6',
    pageBg: '#FFF',
    text: '#04060c',
    silver: '#eff2f6',
  },
  breakpoints: {
    ...BREAKPOINTS,
  },
};
