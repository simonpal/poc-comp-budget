import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { Divider } from '../components/Divider';
import { Category, Expense } from '../types';
import { getAllExpenses, getCategories, useGetUsers } from '../api';
// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
import { barColors } from '../utils/helpers';
import { Grid } from '../components/Grid';
import { Column } from '../components/Column';
import { Box } from '../components/Box';
import styled, { useTheme } from 'styled-components';
import { Theme } from '../theme';
import { ValueHeader } from '../components/ValueHeader';
import { ValueContent } from '../components/ValueContent';
import { Button } from '../components/Button';
import { ArrowLeftIcon } from '../components/Icons/ArrowLeftIcon';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../utils/UserContext';
import React from 'react';

const BarChart = React.lazy(() => import('../components/BarChart'));

const StatsTitle = styled.h2`
  align-items: center;
  display: flex;
  button {
    margin-right: 1rem;
    /* font-size: 1.5rem; */
  }
`;

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const AdminStats = () => {
  const [categories, setCategories] = useState<Category[] | undefined>();
  const [allExpenses, setAllExpenses] = useState<Expense[] | undefined>();
  // const [allUsers, setAllUsers] = useState<User[] | undefined>();

  const { users: allUsers } = useGetUsers();

  const theme = useTheme() as Theme;

  const {
    state: { isAdmin },
  } = useUserContext();
  const navigate = useNavigate();

  const timeExpenses = useMemo(() => {
    return allExpenses?.filter((exp) => exp.type === 'time') || [];
  }, [allExpenses]);

  const moneyExpenses = useMemo(() => {
    return allExpenses?.filter((exp) => exp.type === 'money') || [];
  }, [allExpenses]);

  const getAverageValue = useCallback(
    (expenseArr: Expense[]) => {
      const noUsers = Array.isArray(allUsers) ? allUsers?.length : 0;
      const totalValue = expenseArr?.reduce((acc, curr) => {
        return (acc += curr.sum);
      }, 0);

      return Math.round(totalValue / noUsers);
    },
    [allUsers]
  );

  const averageTimePerUser = useMemo(() => {
    return getAverageValue(timeExpenses);
  }, [getAverageValue, timeExpenses]);

  const averageMoneyPerUser = useMemo(() => {
    return getAverageValue(moneyExpenses);
  }, [getAverageValue, moneyExpenses]);
  const averageHardwarePerUser = useMemo(() => {
    return getAverageValue(moneyExpenses.filter((exp) => exp.isHardware));
  }, [getAverageValue, moneyExpenses]);

  const getCategoryByExpenseType = useCallback(
    (expenseArr: Expense[]) => {
      const numOfInstances = categories?.map(
        (c) => expenseArr?.filter((exp) => exp.category === c.name).length
      );
      return numOfInstances;
    },
    [categories]
  );

  const barTimeData = useMemo(() => {
    return {
      labels: categories?.map((c) => c.name) || [],
      datasets: [
        {
          label: 'Time expenses by category',
          data: getCategoryByExpenseType(timeExpenses) || [],
          backgroundColor: barColors,
          borderWidth: 1,
        },
      ],
    };
  }, [categories, getCategoryByExpenseType, timeExpenses]);
  const barMoneyData = useMemo(() => {
    return {
      labels: categories?.map((c) => c.name) || [],
      datasets: [
        {
          label: 'Money expenses by category',
          data: getCategoryByExpenseType(moneyExpenses) || [],
          backgroundColor: barColors,
          borderWidth: 1,
        },
      ],
    };
  }, [categories, getCategoryByExpenseType, moneyExpenses]);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/mybudget');
    }
  }, [isAdmin, navigate]);

  useEffect(() => {
    if (!categories) {
      getCategories().then(setCategories).catch(console.error);
    }
  }, [categories]);
  useEffect(() => {
    if (!allExpenses) {
      getAllExpenses().then(setAllExpenses).catch(console.error);
    }
  }, [allExpenses]);

  // useEffect(() => {
  //   if (!allUsers) {
  //     getAllUsers().then(setAllUsers).catch(console.error);
  //   }
  // }, [allUsers]);
  return (
    <div>
      <StatsTitle>
        <Button priority="secondary" iconOnly onClick={() => navigate(-1)}>
          <ArrowLeftIcon />
        </Button>
        Statistics
      </StatsTitle>
      <Divider spacing="l" />
      <h3>Average usage of budget</h3>
      <Divider spacing="s" color="transparent" />
      <Grid spacing="l">
        <Column lg="4" md="4" sm="4" xs="12">
          <Box backgroundColor={theme.colors.silver} spacing="m">
            <ValueHeader>Time used per employee</ValueHeader>
            <ValueContent>{averageTimePerUser}h</ValueContent>
          </Box>
        </Column>
        <Column lg="4" md="4" sm="4" xs="12">
          <Box backgroundColor={theme.colors.silver} spacing="m">
            <ValueHeader>Money used per employee</ValueHeader>
            <ValueContent>{averageMoneyPerUser} kr</ValueContent>
          </Box>
        </Column>
        <Column lg="4" md="4" sm="4" xs="12">
          <Box backgroundColor={theme.colors.silver} spacing="m">
            <ValueHeader>Hardware spent per employee</ValueHeader>
            <ValueContent>{averageHardwarePerUser} kr</ValueContent>
          </Box>
        </Column>
      </Grid>
      <Divider spacing="l" />
      <h3>Categories</h3>
      <Divider spacing="s" color="transparent" />
      <h4>Type: time</h4>
      <Divider spacing="s" color="transparent" />
      <Suspense fallback={<p>Loading chart...</p>}>
        <BarChart
          options={{
            ...options,
            plugins: {
              ...options.plugins,
              title: { display: false, text: 'Categories used by type Time' },
            },
          }}
          barData={barTimeData}
          id="catByExp"
        />
      </Suspense>
      <Divider spacing="l" />
      <h4>Type: money</h4>
      <Divider spacing="s" color="transparent" />
      <Suspense fallback={<p>Loading chart...</p>}>
        <BarChart
          options={{
            ...options,
            plugins: {
              ...options.plugins,
              title: { display: false, text: 'Categories used by type Money' },
            },
          }}
          barData={barMoneyData}
          id="catByExpMoney"
        />
      </Suspense>
    </div>
  );
};

export default AdminStats;
