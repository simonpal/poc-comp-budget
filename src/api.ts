import { categories, myExpenses, users } from './mockData';
import { Category, Expense, User } from './types';

export const getUser = (id: string): Promise<User> =>
  new Promise((resolve, reject) => {
    const user = users.find((u) => u.id === id);

    if (!user) {
      return setTimeout(() => reject(new Error('User not found')), 250);
    }

    setTimeout(() => resolve(user), 500);
  });

export const getAllUsers = (): Promise<User[]> =>
  new Promise((resolve, reject) => {
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
  new Promise((resolve, reject) => {
    // const expenses = myExpenses.filter((u) => u.userId === id);

    // if (!expenses) {
    //   return setTimeout(() => reject(new Error('User not found')), 250);
    // }

    setTimeout(() => resolve(myExpenses), 500);
  });

export const getCategories = (): Promise<Category[]> =>
  new Promise((resolve, reject) => {
    // const expenses = myExpenses.filter((u) => u.userId === id);

    // if (!expenses) {
    //   return setTimeout(() => reject(new Error('User not found')), 250);
    // }

    setTimeout(() => resolve(categories), 500);
  });

export const checkIsAdmin = (token: string): Promise<boolean> =>
  new Promise((resolve, reject) => {
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
