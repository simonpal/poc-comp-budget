import { categories, myExpenses, users } from './mockData';
import { Category, Expense, User } from './types';

const baseUrl = import.meta.env.VITE_API_URL;
const userUrl = `${baseUrl}/user`;
const categoryUrl = `${baseUrl}/categories`;
console.log(baseUrl);

/*
  Real api
*/
export const getApiUser = (id: string) => {
  return fetch(`${userUrl}?id=${id}`).then((res) => res.json());
};
export const updateApiUser = (user: User) => {
  return fetch(`${userUrl}`, {
    method: 'PUT',
    body: JSON.stringify(user),
  });
};
export const getApiCategories = () => {
  return fetch(`${categoryUrl}`).then((res) => res.json());
};
export const addApiCategory = (name: string) => {
  return fetch(`${categoryUrl}`, {
    method: 'POST',
    body: JSON.stringify(name),
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
