import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
// import { useUserContext } from './UserContext';
import { Theme, darkTheme, theme as lightTheme } from "../theme";
import { TOKEN_COOKIE } from "./constants";
import { CookieOptions } from "../types";
import { useLocation, useParams } from "react-router-dom";

export const useIsLoggedInUser = () => {
  const [item] = useCookie(TOKEN_COOKIE, "");
  return typeof item !== "undefined" && item.length > 0;
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

  const setValue = (newValue: unknown) => {
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
    (e: KeyboardEvent) => {
      if (!enabled) return;
      if (e.code === "ArrowDown") {
        // Down arrow
        e.preventDefault();
        setCurrentFocus(currentFocus === size - 1 ? 0 : currentFocus + 1);
      } else if (e.code === "ArrowUp") {
        // Up arrow
        e.preventDefault();
        setCurrentFocus(currentFocus === 0 ? size - 1 : currentFocus - 1);
      }
    },
    [size, currentFocus, setCurrentFocus, enabled]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
    };
  }, [handleKeyDown]);

  return [currentFocus, setCurrentFocus];
};

export const usePreferedTheme = () => {
  const keyName = "darktheme";
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
      "(prefers-color-scheme: dark)"
    ).matches;
    if (typeof savedDark !== "undefined") {
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

/* useCookie */

const isBrowser = typeof window !== "undefined";

export const setCookie = (
  name: string,
  value: string | number | boolean,
  options: CookieOptions
) => {
  if (!isBrowser) return;

  const optionsWithDefaults = {
    days: 7,
    path: "/",
    ...options,
  };

  const expires = options?.expires
    ? new Date(options.expires).toUTCString()
    : new Date(Date.now() + optionsWithDefaults.days * 864e5).toUTCString();
  // console.log(expires);

  // console.log(
  //   'Set cookie',
  //   `${name}=${encodeURIComponent(value)}${
  //     options?.secure ? ';secure' : ''
  //   }; expires=${expires}; path=${optionsWithDefaults.path}`
  // );

  document.cookie = `${name}=${encodeURIComponent(value)}${
    options?.secure ? ";secure" : ""
  }; expires=${expires}; path=${optionsWithDefaults.path}`;
};

export const getCookie = (name: string, initialValue = "") => {
  return (
    (isBrowser &&
      document.cookie.split("; ").reduce((r, v) => {
        const parts = v.split("=");
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
      }, "")) ||
    initialValue
  );
};

export const useCookie = (
  key: string,
  initialValue: string
): [string, (value: string, options: CookieOptions) => void] => {
  const [item, setItem] = useState(() => {
    return getCookie(key, initialValue);
  });

  const updateItem = (value: string, options: CookieOptions) => {
    setItem(value);
    setCookie(key, value, options);
  };

  return [item, updateItem];
};

export const useCurrentPath = () => {
  const location = useLocation();
  const params = useParams();
  const { pathname } = location;

  if (!Object.keys(params).length) {
    return pathname; // we don't need to replace anything
  }

  let path = pathname;
  Object.entries(params).forEach(([paramName, paramValue]) => {
    if (paramValue) {
      path = path.replace(paramValue, `:${paramName}`);
    }
  });
  return path;
};
