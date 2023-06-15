import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { GoogleProfile } from '../types';
import { useSessionStorage } from './customHooks';
import { checkIsAdmin, getGoogleProfile } from '../api';
// import { Expense, User } from '../../types';

export enum UserContextActionTypes {
  SetLoggedInUser = 'SET_LOGGED_IN_USER',
  SetLoggedInProfile = 'SET_LOGGED_IN_PROFILE',
  SetIsAdmin = 'SET_IS_ADMIN',
  ResetUser = 'RESET_USER',
  // SetTheme = 'SET_THEME',
}

type UserContextPayload = {
  [UserContextActionTypes.SetLoggedInUser]: { user: any };
  [UserContextActionTypes.SetLoggedInProfile]:
    | { profile: GoogleProfile }
    | undefined;
  [UserContextActionTypes.SetIsAdmin]: boolean;
  [UserContextActionTypes.ResetUser]: boolean;
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
    case UserContextActionTypes.SetLoggedInProfile:
      return { ...state, loggedInProfile: action.payload };
    case UserContextActionTypes.SetIsAdmin:
      return { ...state, isAdmin: action.payload };
    case UserContextActionTypes.ResetUser:
      return {
        ...state,
        isAdmin: false,
        loggedInUser: undefined,
        loggedInProfile: undefined,
      };
    default:
      return state;
  }
};

interface UserContext {
  loggedInUser: any;
  loggedInProfile: any;
  isAdmin: boolean;
}

const UserContext = createContext<{
  state: UserContext;
  dispatch: React.Dispatch<any>;
}>({
  state: {
    loggedInUser: undefined,
    loggedInProfile: undefined,
    isAdmin: false,
  },
  dispatch: () => null,
});

interface Props {
  children: React.ReactNode;
}
export const UserContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    loggedInUser: undefined,
    loggedInProfile: undefined,
    isAdmin: false,
  });

  const [token, setValue] = useSessionStorage('cb-token', undefined);

  const getAndSetProfile = useCallback(async () => {
    getGoogleProfile(token)
      .then(async (res) => {
        const data = await res.json();
        if (!data?.error) {
          dispatch({
            type: UserContextActionTypes.SetLoggedInProfile,
            payload: { profile: data },
          });
        } else {
          throw new Error(data?.error);
        }
      })
      .catch((err) => {
        console.error(err);
        setValue(undefined);
        // navigate('/login');
      });
  }, [token, setValue]);

  const isUserAdmin = useCallback(async () => {
    checkIsAdmin(token).then((res: boolean) => {
      dispatch({
        type: UserContextActionTypes.SetIsAdmin,
        payload: res,
      });
    });
  }, [token]);

  useEffect(() => {
    // console.log(state.loggedInUser, token);
    if (state?.loggedInUser?.user && typeof token === 'undefined') {
      setValue(state.loggedInUser.user.access_token);
    } else if (
      typeof token !== 'undefined' &&
      !state.loggedInProfile?.profile
    ) {
      getAndSetProfile();
      isUserAdmin();
    }
  }, [
    state.loggedInUser,
    state.loggedInProfile,
    setValue,
    token,
    getAndSetProfile,
    isUserAdmin,
  ]);

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
