import toast from "react-hot-toast";
import {
  Budget,
  BudgetRequestBody,
  Category,
  CreateUpdateDeleteType,
  Expense,
  NewExpense,
  User,
} from "./types";
import { getErrorMessage } from "./utils/helpers";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAdminContext } from "./components/AdminComponents/AdminContext";
import { getCookie } from "./utils/customHooks";
import { TOKEN_COOKIE } from "./utils/constants";
// import { useUserContext } from "./utils/UserContext";

// const authenticateUrl = import.meta.env.VITE_GOOGLE_AUTH_URL;
export const leetImgUrl = "https://i.1337co.de/wallofleet";
const baseUrl = import.meta.env.VITE_API_URL;
const adminUrl = `${baseUrl}/adm`;
// const userUrl = `${baseUrl}/users`;
const categoryUrl = `${baseUrl}/categories`;
const expensesUrl = `${baseUrl}/expenses`;
// console.log(baseUrl);

const getStoredToken = () => {
  try {
    const value = getCookie(TOKEN_COOKIE, "");
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
      "Content-Type": "application/json",
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

export const useGetAllUsers = () => {
  const {
    data: users,
    isFetching,
    isLoading,
    isError,
  } = useQuery(
    ["allUsers"],
    () => apiFetch<User | User[]>(`${adminUrl}/users`),
    {
      staleTime: Infinity,
      onError(error) {
        toast.error(`Could not get user. ${(error as Error)?.message}`);
      },
    }
  );

  return { users, isLoading, isFetching, isError };
};
export const useGetUser = (id: string) => {
  // const {
  //   state: { isAdmin },
  // } = useUserContext();
  const {
    data: users,
    isFetching,
    isLoading,
    isError,
  } = useQuery(
    ["users", id],
    () => apiFetch<User | User[]>(`${baseUrl}/users?userId=${id}`),
    {
      staleTime: Infinity,
      onError(error) {
        toast.error(`Could not get user. ${(error as Error)?.message}`);
      },
    }
  );

  return { users, isLoading, isFetching, isError };
};

// export const updateApiUser = (user: User) => {
//   return apiFetch(`${userUrl}`, {
//     method: "PUT",
//     body: JSON.stringify(user),
//   });
// };

/*
  Budgets
*/

export const useGetBudgets = (
  id: string,
  isAdmin: boolean,
  queryOptions?: any
) => {
  const {
    data: budget,
    isFetching,
    isLoading,
    isError,
  } = useQuery(
    ["budget", id],
    () =>
      apiFetch<Budget>(`${isAdmin ? adminUrl : baseUrl}/budgets?userId=${id}`),
    {
      staleTime: Infinity,
      onError(error) {
        toast.error(`Could not get user. ${(error as Error)?.message}`);
      },
      ...queryOptions,
    }
  );
  return { budget, isLoading, isFetching, isError };
};

export const useUpdateBudget = (mutationOptions?: any) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (budget: BudgetRequestBody) =>
      apiFetch<Budget>(`${adminUrl}/budgets`, {
        method: "PUT",
        body: JSON.stringify(budget),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["budget"]);
        toast.success("Budget successfully updated!");
      },
      onError(error) {
        toast.error(`Could not update budget. ${(error as Error)?.message}`);
      },
      ...mutationOptions,
    }
  );
  return mutation;
};

/*
  Categories
*/

export const useGetCategories = () => {
  const {
    data: categories,
    isFetching,
    isLoading,
    isError,
  } = useQuery(["categories"], () => apiFetch<Category[]>(`${categoryUrl}`), {
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
    (category: Category) =>
      apiFetch<Category>(`${adminUrl}/categories`, {
        method: "POST",
        body: JSON.stringify(category),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["categories"]);
        toast.success("Category successfully created!");
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
    ["expenses", userId],
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

export const useGetAllExpenses = (queryOptions?: any) => {
  const {
    data: allExpenses,
    isFetching,
    isLoading,
    isError,
  } = useQuery(
    ["allExpenses"],
    () => apiFetch<Expense[]>(`${adminUrl}/expenses`),
    {
      staleTime: Infinity,
      onError(error) {
        toast.error(`Could not get expenses. ${(error as Error)?.message}`);
      },
      ...queryOptions,
    }
  );

  return { allExpenses, isLoading, isFetching, isError };
};

const mapCreateOrUpdate = (type: CreateUpdateDeleteType) => {
  switch (type) {
    case "create":
      return "POST";
    case "update":
      return "PUT";
    case "delete":
      return "DELETE";
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
      apiFetch<NewExpense>(`${adminUrl}/expenses`, {
        method: mapCreateOrUpdate(reqType),
        body: JSON.stringify(expense),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["expenses", user?.userId]);
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

export const useDeleteExpense = (mutationOptions?: any) => {
  const queryClient = useQueryClient();
  const {
    state: { user },
  } = useAdminContext();
  const mutation = useMutation(
    (id: string) =>
      apiFetch<NewExpense>(`${adminUrl}/expenses?id=${id}`, {
        method: "DELETE",
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["expenses", user?.userId]);
        toast.success(`Deleted successfully!`);
      },
      onError(error) {
        toast.error(`Could not delete expense. ${(error as Error)?.message}`);
      },
      ...mutationOptions,
    }
  );
  return mutation;
};

export const useIsAdmin = () => {
  const {
    data: isAdmin,
    isFetching,
    isLoading,
    isError,
  } = useQuery(
    ["isadmin"],
    () => apiFetch<User | User[]>(`${adminUrl}/isAdmin`),
    {
      staleTime: Infinity,
      onError(error) {
        toast.error(
          `Could not fetch if user is admin. ${(error as Error)?.message}`
        );
      },
    }
  );

  return { isAdmin, isLoading, isFetching, isError };
};

export const checkIsAdmin = (): Promise<boolean> =>
  apiFetch(`${adminUrl}/isAdmin`);

export const getGoogleProfile = (token: string) =>
  fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
