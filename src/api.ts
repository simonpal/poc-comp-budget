import toast from 'react-hot-toast';
import { categories, myExpenses, users } from './mockData';
import {
  Category,
  CreateUpdateDeleteType,
  Expense,
  NewExpense,
  User,
} from './types';
import { getErrorMessage } from './utils/helpers';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useAdminContext } from './components/AdminComponents/AdminContext';
import { getCookie } from './utils/customHooks';
import { TOKEN_COOKIE } from './utils/constants';

// const authenticateUrl = import.meta.env.VITE_GOOGLE_AUTH_URL;
const baseUrl = import.meta.env.VITE_API_URL;
// const urlSuffix = './auth/login/google'
const userUrl = `${baseUrl}/users`;
const categoryUrl = `${baseUrl}/categories`;
const expensesUrl = `${baseUrl}/expenses`;
// console.log(baseUrl);

const getStoredToken = () => {
  try {
    const value = getCookie(TOKEN_COOKIE, '');
    if (value) {
      return value;
    } else {
      return undefined;
    }
  } catch (err) {
    return undefined;
  }
};

export const apiFetch = async <T>(
  url: string,
  options: any = { headers: {} }
): Promise<T> => {
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
// export const getApiAllUsers = (id: string) => {
//   return apiFetch(`${baseUrl}/allUsers`);
// };
export const useGetUsers = (id?: string) => {
  const {
    data: users,
    isFetching,
    isLoading,
    isError,
  } = useQuery(
    ['users', id],
    () => apiFetch<User | User[]>(`${userUrl}${id ? `?id=${id}` : ''}`),
    {
      staleTime: Infinity,
      onError(error) {
        toast.error(`Could not get user. ${(error as Error)?.message}`);
      },
    }
  );

  return { users, isLoading, isFetching, isError };
};
// export const getApiUser = (id: string) => {
//   return apiFetch(`${userUrl}?id=${id}`);
// };
export const updateApiUser = (user: User) => {
  return apiFetch(`${userUrl}`, {
    method: 'PUT',
    body: JSON.stringify(user),
  });
};

export const getApiIsAdmin = (id: string) => {
  return apiFetch(`${userUrl}?id=${id}`);
};

/*
  Categories
*/
// export const getApiCategories = (): Category[] => {
//   return apiFetch(`${categoryUrl}`);
// };
// export const addApiCategory = (name: string) => {
//   return apiFetch(`${categoryUrl}`, {
//     method: 'POST',
//     body: JSON.stringify(name),
//   });
// };

export const useGetCategories = () => {
  const {
    data: categories,
    isFetching,
    isLoading,
    isError,
  } = useQuery(['categories'], () => apiFetch<Category[]>(`${categoryUrl}`), {
    staleTime: Infinity,
    onError(error) {
      toast.error(`Could not get categories. ${(error as Error)?.message}`);
    },
  });

  return { categories, isLoading, isFetching, isError };
};

export const useCreateCategory = (mutationOptions?: any) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (categoryName: string) =>
      apiFetch<Category>(`${categoryUrl}`, {
        method: 'POST',
        body: JSON.stringify({ name: categoryName }),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['categories']);
        toast.success('Category successfully created!');
      },
      onError(error) {
        toast.error(`Could not create category. ${(error as Error)?.message}`);
      },
      ...mutationOptions,
    }
  );
  return mutation;
};

/*
  Expenses
*/
export const useGetExpenses = (userId: string, queryOptions?: any) => {
  const {
    data: expenses,
    isFetching,
    isLoading,
    isError,
  } = useQuery(
    ['expenses', userId],
    () => apiFetch<Expense[]>(`${expensesUrl}?userId=${userId}`),
    {
      staleTime: Infinity,
      onError(error) {
        toast.error(`Could not get expenses. ${(error as Error)?.message}`);
      },
      ...queryOptions,
    }
  );

  return { expenses, isLoading, isFetching, isError };
};

const mapCreateOrUpdate = (type: CreateUpdateDeleteType) => {
  switch (type) {
    case 'create':
      return 'POST';
    case 'update':
      return 'PUT';
    case 'delete':
      return 'DELETE';
  }
};

export const useCreateExpense = (
  reqType: CreateUpdateDeleteType,
  mutationOptions?: any
) => {
  const queryClient = useQueryClient();
  const {
    state: { user },
  } = useAdminContext();
  const mutation = useMutation(
    (expense: NewExpense) =>
      apiFetch<NewExpense>(`${expensesUrl}`, {
        method: mapCreateOrUpdate(reqType),
        body: JSON.stringify(expense),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['expenses', user?.id]);
        toast.success(`${reqType} ran successfully!`);
      },
      onError(error) {
        toast.error(
          `Could not ${reqType} expense. ${(error as Error)?.message}`
        );
      },
      ...mutationOptions,
    }
  );
  return mutation;
};
// export const getApiExpenses = () => {
//   return apiFetch(`${expensesUrl}`);
// };
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

export const deleteApiExpense = (id: string | number) => {
  return apiFetch(`${expensesUrl}?id=${id}`, {
    method: 'DELETE',
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
  new Promise((resolve, reject) => {
    // const expenses = myExpenses.filter((u) => u.userId === id);

    if (!token) {
      return setTimeout(() => reject(new Error('User not found')), 250);
    }

    setTimeout(() => resolve(true), 500);
  });

export const getGoogleProfile = (token: string) =>
  fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

// export const authenticateGoogleAzure = (token: string) => {
//   return fetch(authenticateUrl, {
//     method: 'POST',
//     body: JSON.stringify({ id_token: token }),
//   });
// };
