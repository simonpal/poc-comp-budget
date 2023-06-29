import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import jwt_decode from "jwt-decode";
import { CookieSettings, GoogleUser } from "../types";
import { useCookie } from "./customHooks";
import {
  SETTINGS_COOKIE,
  SETTINGS_COOKIE_OPTIONS,
  TOKEN_COOKIE,
} from "./constants";
// import { Expense, User } from '../../types';

export enum UserContextActionTypes {
  // SetLoggedInUser = "SET_LOGGED_IN_USER",
  // SetLoggedInProfile = 'SET_LOGGED_IN_PROFILE',
  // SetIsAdmin = "SET_IS_ADMIN",
  ResetUser = "RESET_USER",
  SetGoogleUser = "SET_GOOGLE_USER",
  SetStoredSettings = "SET_STORED_SETTINGS",
  // SetTheme = 'SET_THEME',
}

type UserContextPayload = {
  // [UserContextActionTypes.SetLoggedInUser]: { user: any };
  // [UserContextActionTypes.SetLoggedInProfile]:
  //   | { profile: GoogleProfile }
  //   | undefined;
  // [UserContextActionTypes.SetIsAdmin]: boolean;
  [UserContextActionTypes.ResetUser]: boolean;
  [UserContextActionTypes.SetGoogleUser]: GoogleUser;
  [UserContextActionTypes.SetStoredSettings]: CookieSettings;
  // [UserContextActionTypes.SetTheme]: undefined;
  // [Types.Delete]: {
  //   id: number;
  // }
};
type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type UserContextActions =
  ActionMap<UserContextPayload>[keyof ActionMap<UserContextPayload>];

const reducer = (state: UserContext, action: UserContextActions) => {
  switch (action.type) {
    // case UserContextActionTypes.SetLoggedInUser:
    //   return { ...state, loggedInUser: action.payload };
    // case UserContextActionTypes.SetLoggedInProfile:
    //   return { ...state, loggedInProfile: action.payload };
    // case UserContextActionTypes.SetIsAdmin:
    //   return { ...state, isAdmin: action.payload };
    case UserContextActionTypes.SetGoogleUser:
      return { ...state, googleUser: action.payload };
    case UserContextActionTypes.SetStoredSettings:
      return { ...state, storedSettings: action.payload };
    case UserContextActionTypes.ResetUser:
      return {
        ...state,
        isAdmin: false,
        loggedInUser: undefined,
        googleUser: undefined,
      };
    default:
      return state;
  }
};

interface UserContext {
  // loggedInUser: any;
  // loggedInProfile: any;
  // isAdmin: boolean;
  googleUser: GoogleUser | undefined;
  storedSettings: CookieSettings | undefined;
}

const UserContext = createContext<{
  state: UserContext;
  dispatch: React.Dispatch<any>;
}>({
  state: {
    // loggedInUser: undefined,
    // loggedInProfile: undefined,
    // isAdmin: false,
    googleUser: undefined,
    storedSettings: undefined,
  },
  dispatch: () => null,
});

interface Props {
  children: React.ReactNode;
}
export const UserContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    // loggedInUser: undefined,
    // loggedInProfile: undefined,
    // isAdmin: false,
    googleUser: undefined,
    storedSettings: undefined,
  });

  const [cookieSettings, setCookieSettings] = useCookie(SETTINGS_COOKIE, "");
  const [token, _] = useCookie(TOKEN_COOKIE, "");

  const parsedSettings: CookieSettings = useMemo(() => {
    if (cookieSettings && cookieSettings.length) {
      try {
        const data = JSON.parse(cookieSettings);
        return data;
      } catch (e) {
        console.error(e);
        return undefined;
      }
    }
    return undefined;
  }, [cookieSettings]);

  // const isUserAdmin = useCallback(async () => {
  //   if (token) {
  //     checkIsAdmin().then((res: boolean) => {
  //       dispatch({
  //         type: UserContextActionTypes.SetIsAdmin,
  //         payload: res,
  //       });
  //     });
  //   } else {
  //     return false;
  //   }
  // }, [token]);

  useEffect(() => {
    // isUserAdmin();
    if (typeof token !== undefined && token.length > 0 && !state.googleUser) {
      const user: any = jwt_decode(token);
      const { name, picture, exp, email, sub } = user;
      dispatch({
        type: UserContextActionTypes.SetGoogleUser,
        payload: { name, picture, exp, email, sub },
      });
    }
  }, [token, state.googleUser]);

  useEffect(() => {
    if (!parsedSettings || typeof parsedSettings?.darkTheme === "undefined") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setCookieSettings(
        JSON.stringify({ ...parsedSettings, darkTheme: prefersDark }),
        SETTINGS_COOKIE_OPTIONS
      );
    } else if (!state.storedSettings && parsedSettings) {
      dispatch({
        type: UserContextActionTypes.SetStoredSettings,
        payload: parsedSettings,
      });
    }
  }, [parsedSettings, setCookieSettings, state.storedSettings]);

  useEffect(() => {
    if (state.storedSettings) {
      if (JSON.stringify(state.storedSettings) !== cookieSettings) {
        setCookieSettings(
          JSON.stringify(state.storedSettings),
          SETTINGS_COOKIE_OPTIONS
        );
      }
    }
  }, [state.storedSettings, setCookieSettings, cookieSettings]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): {
  state: UserContext;
  dispatch: React.Dispatch<{ type: UserContextActionTypes; payload: unknown }>;
} => useContext(UserContext);
