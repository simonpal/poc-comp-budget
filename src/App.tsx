import { ThemeProvider } from 'styled-components';
// import './App.css';
// import { theme } from './theme';
import { GlobalStyles } from './globalStyles';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';
import MyBudget from './pages/MyBudget';
import Admin from './pages/Admin';
import { Layout } from './components/Layout';
import { AdminContextProvider } from './components/AdminComponents/AdminContext';
import AdminStats from './pages/AdminStats';
import { usePreferedTheme } from './utils/customHooks';
import { useEffect } from 'react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'mybudget',
    element: (
      <Layout>
        <MyBudget />
      </Layout>
    ),
  },
  {
    path: 'admin',
    element: (
      <AdminContextProvider>
        <Layout>
          <Admin />
        </Layout>
      </AdminContextProvider>
    ),
  },
  {
    path: 'admin/stats',
    element: (
      <AdminContextProvider>
        <Layout>
          <AdminStats />
        </Layout>
      </AdminContextProvider>
    ),
  },
]);

function App() {
  const { preferedTheme, isDark } = usePreferedTheme();
  console.log(preferedTheme);
  useEffect(() => {
    console.log(isDark);
  }, [isDark]);
  return (
    <ThemeProvider theme={preferedTheme}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
