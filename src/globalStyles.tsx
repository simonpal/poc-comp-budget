import { createGlobalStyle } from 'styled-components';
import { Theme } from './theme';

type GlobalStyleProps = {
  theme: Theme;
};

export const GlobalStyles = createGlobalStyle<GlobalStyleProps>`
      :root {
        --spacing-none: 0;
        --spacing-3xs: 0.15rem;
        --spacing-2xs: 0.25rem;
        --spacing-xs: 0.5rem;
        --spacing-s: 0.75rem;
        --spacing-m: 1rem;
        --spacing-l: 1.5rem;
        --spacing-xl: 2rem;
        --spacing-2xl: 2.5rem;
        --spacing-3xl: 3rem;
        --spacing-4xl: 3.5rem;
        --spacing-5xl: 4rem;
        --spacing-6xl: 4.5rem;
        --spacing-7xl: 5rem;
    }
  *, *::before, *::after {
    box-sizing: border-box;
  }
  * {
    margin: 0;
  }
  html, body {
    height: 100%;
  }
  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    background-color: ${({ theme }) => theme.colors.pageBg};
    color: ${({ theme }) => theme.colors.text};
    font-family: 'Sora', sans-serif;
  }
  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }
  input, button, textarea, select {
    font: inherit;
    color: inherit;
  }
  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }
  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.colors.primary};
  }
  a {
      color: ${({ theme }) => theme.colors.text};
  }
  #root, #__next {
    isolation: isolate;
  }
  .overflow-hidden {
    overflow: hidden;
  }
  
  `;
