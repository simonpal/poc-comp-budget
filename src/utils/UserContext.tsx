import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import jwt_decode from 'jwt-decode';
import { GoogleUser } from '../types';
import { useCookie } from './customHooks';
import { checkIsAdmin } from '../api';
import { TOKEN_COOKIE } from './constants';
// import { Expense, User } from '../../types';

export enum UserContextActionTypes {
  SetLoggedInUser = 'SET_LOGGED_IN_USER',
  // SetLoggedInProfile = 'SET_LOGGED_IN_PROFILE',
  SetIsAdmin = 'SET_IS_ADMIN',
  ResetUser = 'RESET_USER',
  SetGoogleUser = 'SET_GOOGLE_USER',
  // SetTheme = 'SET_THEME',
}

type UserContextPayload = {
  [UserContextActionTypes.SetLoggedInUser]: { user: any };
  // [UserContextActionTypes.SetLoggedInProfile]:
  //   | { profile: GoogleProfile }
  //   | undefined;
  [UserContextActionTypes.SetIsAdmin]: boolean;
  [UserContextActionTypes.ResetUser]: boolean;
  [UserContextActionTypes.SetGoogleUser]: GoogleUser;
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
    case UserContextActionTypes.SetLoggedInUser:
      return { ...state, loggedInUser: action.payload };
    // case UserContextActionTypes.SetLoggedInProfile:
    //   return { ...state, loggedInProfile: action.payload };
    case UserContextActionTypes.SetIsAdmin:
      return { ...state, isAdmin: action.payload };
    case UserContextActionTypes.SetGoogleUser:
      return { ...state, googleUser: action.payload };
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
  loggedInUser: any;
  // loggedInProfile: any;
  isAdmin: boolean;
  googleUser: GoogleUser | undefined;
}

const UserContext = createContext<{
  state: UserContext;
  dispatch: React.Dispatch<any>;
}>({
  state: {
    loggedInUser: undefined,
    // loggedInProfile: undefined,
    isAdmin: false,
    googleUser: undefined,
  },
  dispatch: () => null,
});

interface Props {
  children: React.ReactNode;
}
export const UserContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    loggedInUser: undefined,
    // loggedInProfile: undefined,
    isAdmin: false,
    googleUser: undefined,
  });

  const [token, _] = useCookie(TOKEN_COOKIE, '');

  // const getAndSetProfile = useCallback(async () => {
  //   getGoogleProfile(token)
  //     .then(async (res) => {
  //       const data = await res.json();
  //       if (!data?.error) {
  //         dispatch({
  //           type: UserContextActionTypes.SetLoggedInProfile,
  //           payload: { profile: data },
  //         });
  //       } else {
  //         throw new Error(data?.error);
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       setValue(undefined);
  //       // navigate('/login');
  //     });
  // }, [token, setValue]);

  const isUserAdmin = useCallback(async () => {
    checkIsAdmin(token).then((res: boolean) => {
      dispatch({
        type: UserContextActionTypes.SetIsAdmin,
        payload: res,
      });
    });
  }, [token]);

  useEffect(() => {
    isUserAdmin();
    if (typeof token !== undefined && token.length > 0 && !state.googleUser) {
      const user: any = jwt_decode(token);
      const { name, picture, exp, email } = user;
      dispatch({
        type: UserContextActionTypes.SetGoogleUser,
        payload: { name, picture, exp, email },
      });
    }
  }, [token, isUserAdmin, state.googleUser]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): {
  state: UserContext;
  dispatch: React.Dispatch<any>;
} => useContext(UserContext);
