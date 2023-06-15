import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useUserContext } from './UserContext';
import { Theme, darkTheme, theme as lightTheme } from '../theme';

export const useIsLoggedInUser = () => {
  const {
    state: { loggedInProfile },
  } = useUserContext();

  const [token] = useSessionStorage('cb-token', undefined);
  console.log(token, loggedInProfile);
  return typeof token !== 'undefined' && !!loggedInProfile?.profile;
};

export const useSessionStorage = (keyName: string, defaultValue: unknown) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.sessionStorage.getItem(keyName);

      if (value) {
        return JSON.parse(value);
      } else {
        window.sessionStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue: any) => {
    try {
      window.sessionStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
      console.error(err);
    }
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};

export const useRoveFocus = (
  size: number,
  enabled: boolean
): [number, Dispatch<SetStateAction<number>>] => {
  const [currentFocus, setCurrentFocus] = useState<number>(0);

  const handleKeyDown = useCallback(
    (e: any) => {
      if (!enabled) return;
      if (e.keyCode === 40) {
        // Down arrow
        e.preventDefault();
        setCurrentFocus(currentFocus === size - 1 ? 0 : currentFocus + 1);
      } else if (e.keyCode === 38) {
        // Up arrow
        e.preventDefault();
        setCurrentFocus(currentFocus === 0 ? size - 1 : currentFocus - 1);
      }
    },
    [size, currentFocus, setCurrentFocus, enabled]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, false);
    return () => {
      document.removeEventListener('keydown', handleKeyDown, false);
    };
  }, [handleKeyDown]);

  return [currentFocus, setCurrentFocus];
};

export const usePreferedTheme = () => {
  const keyName = 'darktheme';
  const defaultValue = false;
  const [preferedTheme, setPreferedTheme] = useState<Theme>(lightTheme);
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const value = window.localStorage.getItem(keyName);

      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const getSavedValue = () => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        return undefined;
      }
    } catch (err) {
      return undefined;
    }
  };

  const switchTheme = () => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(!isDark));
    } catch (err) {
      console.error(err);
    }
    setPreferedTheme(isDark ? lightTheme : darkTheme);
    setIsDark(!isDark);
  };

  useEffect(() => {
    const savedDark = getSavedValue();
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    if (typeof savedDark !== 'undefined') {
      setPreferedTheme(savedDark ? darkTheme : lightTheme);
    } else if (prefersDark) {
      setPreferedTheme(darkTheme);
    }
  }, []);

  // useEffect(() => {
  //   console.log(preferedTheme);
  // }, [preferedTheme]);

  return { preferedTheme, switchTheme, isDark };
};
