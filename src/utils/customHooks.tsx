import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useUserContext } from './UserContext';

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
