import { ThemeProvider } from "styled-components";
// import './App.css';
// import { theme } from './theme';
import { GlobalStyles } from "./globalStyles";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import ErrorPage from './pages/ErrorPage';
import Login from "./pages/Login";
// import MyBudget from "./pages/MyBudget";
// import Admin from "./pages/Admin";
import { Layout } from "./components/Layout";
import { AdminContextProvider } from "./components/AdminComponents/AdminContext";
// import AdminStats from "./pages/AdminStats";
import { Toaster } from "react-hot-toast";
import { darkTheme, theme } from "./theme";
import { useUserContext } from "./utils/UserContext";
// import EditExpense from "./pages/EditExpense";
import React, { Suspense } from "react";
import { Spinner } from "./components/Spinner";

const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));
const MyBudget = React.lazy(() => import("./pages/MyBudget"));
const Admin = React.lazy(() => import("./pages/Admin"));
const AdminStats = React.lazy(() => import("./pages/AdminStats"));
const EditExpense = React.lazy(() => import("./pages/EditExpense"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: (
      <Suspense
        fallback={
          <div>
            <Spinner size="md" />
          </div>
        }>
        <ErrorPage />
      </Suspense>
    ),
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "mybudget",
    element: (
      <Layout>
        <Suspense
          fallback={
            <div>
              <Spinner size="md" />
            </div>
          }>
          <MyBudget />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "admin",
    element: (
      <AdminContextProvider>
        <Layout>
          <Suspense
            fallback={
              <div>
                <Spinner size="md" />
              </div>
            }>
            <Admin />
          </Suspense>
        </Layout>
      </AdminContextProvider>
    ),
  },
  {
    path: "admin/editexpense",
    element: (
      <AdminContextProvider>
        <Layout>
          <Suspense
            fallback={
              <div>
                <Spinner size="md" />
              </div>
            }>
            <EditExpense />
          </Suspense>
        </Layout>
      </AdminContextProvider>
    ),
  },
  {
    path: "admin/stats",
    element: (
      <AdminContextProvider>
        <Layout>
          <Suspense
            fallback={
              <div>
                <Spinner size="md" />
              </div>
            }>
            <AdminStats />
          </Suspense>
        </Layout>
      </AdminContextProvider>
    ),
  },
]);

function App() {
  const {
    state: { storedSettings },
  } = useUserContext();

  return (
    <ThemeProvider theme={storedSettings?.darkTheme ? darkTheme : theme}>
      <GlobalStyles />
      <RouterProvider router={router} />
      <Toaster position="top-center" reverseOrder={false} />
    </ThemeProvider>
  );
}

export default App;
