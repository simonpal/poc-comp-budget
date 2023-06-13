import React, { createContext, useContext, useReducer } from 'react';
import { Expense, User } from '../../types';

export enum AdminContextActionTypes {
  SetUser = 'SET_USER',
  SetUserExpenses = 'SET_USER_EXPENSES',
  ToggleUserModal = 'TOGGLE_USER_MODAL',
}

type AdminContextPayload = {
  [AdminContextActionTypes.ToggleUserModal]: boolean;
  [AdminContextActionTypes.SetUser]: User;
  [AdminContextActionTypes.SetUserExpenses]: Expense[];
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

export type AdminContextActions =
  ActionMap<AdminContextPayload>[keyof ActionMap<AdminContextPayload>];

const reducer = (state: AdminContext, action: AdminContextActions) => {
  switch (action.type) {
    case AdminContextActionTypes.SetUser:
      return { ...state, user: action.payload };
    case AdminContextActionTypes.ToggleUserModal:
      return { ...state, showUserModal: action.payload };
    case AdminContextActionTypes.SetUserExpenses:
      return { ...state, userExpenses: action.payload };
    default:
      return state;
  }
};

interface AdminContext {
  user: User | undefined;
  showUserModal: boolean;
  userExpenses: Expense[] | undefined;
}

const AdminContext = createContext<{
  state: AdminContext;
  dispatch: React.Dispatch<any>;
}>({
  state: {
    user: undefined,
    userExpenses: undefined,
    showUserModal: false,
  },
  dispatch: () => null,
});

interface Props {
  children: React.ReactNode;
}
export const AdminContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: undefined,
    userExpenses: undefined,
    showUserModal: false,
  });

  return (
    <AdminContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = (): {
  state: AdminContext;
  dispatch: React.Dispatch<any>;
} => useContext(AdminContext);
