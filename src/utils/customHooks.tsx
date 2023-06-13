import { useState } from 'react';
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
