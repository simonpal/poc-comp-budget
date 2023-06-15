import toast from 'react-hot-toast';
import { categories, myExpenses, users } from './mockData';
import { Category, Expense, User } from './types';
import { getErrorMessage } from './utils/helpers';

const baseUrl = import.meta.env.VITE_API_URL;
const userUrl = `${baseUrl}/user`;
const categoryUrl = `${baseUrl}/categories`;
const expensesUrl = `${baseUrl}/categories`;
console.log(baseUrl);

const getStoredToken = () => {
  try {
    const value = window.localStorage.getItem('cb-token');
    if (value) {
      return JSON.parse(value);
    } else {
      return undefined;
    }
  } catch (err) {
    return undefined;
  }
};

export const apiFetch = async (
  url: string,
  options: any = { headers: {} }
): Promise<any> => {
  // if (process.env.IS_TEST) {
  //   return fetch(url, options).then(d => d.json());
  // }

  const token = getStoredToken();

  const _options = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  };
  return fetch(url, _options)
    .then(async (response) => {
      if (response.status !== 200) {
        const text = await response.text();
        toast.error(getErrorMessage(response.status, text), { duration: 6000 });
        throw new Error(getErrorMessage(response.status, text));
      }
      return response;
    })
    .then((d) => d.json());
};

/*
  Real api
*/

/*
  Users
*/
export const getApiUser = (id: string) => {
  return apiFetch(`${userUrl}?id=${id}`);
};
export const updateApiUser = (user: User) => {
  return apiFetch(`${userUrl}`, {
    method: 'PUT',
    body: JSON.stringify(user),
  });
};

/*
  Categories
*/
export const getApiCategories = () => {
  return apiFetch(`${categoryUrl}`);
};
export const addApiCategory = (name: string) => {
  return apiFetch(`${categoryUrl}`, {
    method: 'POST',
    body: JSON.stringify(name),
  });
};

/*
  Expenses
*/

export const getApiExpenses = () => {
  return apiFetch(`${expensesUrl}`);
};
export const addApiExpense = (exp: Expense) => {
  return apiFetch(`${expensesUrl}`, {
    method: 'POST',
    body: JSON.stringify(exp),
  });
};
export const updateApiExpense = (exp: Expense) => {
  return apiFetch(`${expensesUrl}`, {
    method: 'PUT',
    body: JSON.stringify(exp),
  });
};

/*
  End - Real api
*/

export const getUser = (id: string): Promise<User> =>
  new Promise((resolve, reject) => {
    const user = users.find((u) => u.id === id);

    if (!user) {
      return setTimeout(() => reject(new Error('User not found')), 250);
    }

    setTimeout(() => resolve(user), 500);
  });

export const getAllUsers = (): Promise<User[]> =>
  new Promise((resolve, _) => {
    setTimeout(() => resolve(users), 500);
  });

export const getExpenses = (id: string): Promise<Expense[]> =>
  new Promise((resolve, reject) => {
    const expenses = myExpenses.filter((u) => u.userId === id);

    if (!expenses) {
      return setTimeout(() => reject(new Error('User not found')), 250);
    }

    setTimeout(() => resolve(expenses), 500);
  });

export const getAllExpenses = (): Promise<Expense[]> =>
  new Promise((resolve, _) => {
    // const expenses = myExpenses.filter((u) => u.userId === id);

    // if (!expenses) {
    //   return setTimeout(() => reject(new Error('User not found')), 250);
    // }

    setTimeout(() => resolve(myExpenses), 500);
  });

export const getCategories = (): Promise<Category[]> =>
  new Promise((resolve, _) => {
    // const expenses = myExpenses.filter((u) => u.userId === id);

    // if (!expenses) {
    //   return setTimeout(() => reject(new Error('User not found')), 250);
    // }

    setTimeout(() => resolve(categories), 500);
  });

export const checkIsAdmin = (token: string): Promise<boolean> =>
  new Promise((resolve, _) => {
    console.log(token);
    // const expenses = myExpenses.filter((u) => u.userId === id);

    // if (!expenses) {
    //   return setTimeout(() => reject(new Error('User not found')), 250);
    // }

    setTimeout(() => resolve(true), 500);
  });

export const getGoogleProfile = (token: string) =>
  fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
