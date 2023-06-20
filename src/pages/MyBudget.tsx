import { useEffect, useState } from 'react';
import { Expense, User } from '../types';
import { getExpenses, getUser } from '../api';
import { Box } from '../components/Box';
import { Spinner } from '../components/Spinner';
import { Grid } from '../components/Grid';
import { Column } from '../components/Column';
import { useTheme } from 'styled-components';
import { Theme } from '../theme';
import { Divider } from '../components/Divider';
import { Timeline } from '../components/Timeline';
import { ValueHeader } from '../components/ValueHeader';
import { ValueContent } from '../components/ValueContent';
import { InfoBox } from '../components/InfoBox';

const MyBudget = () => {
  const [currentUser, setCurrentUser] = useState<User | undefined>();
  const [myExpenses, setMyExpenses] = useState<Expense[] | undefined>();

  const theme = useTheme() as Theme;
  useEffect(() => {
    if (!currentUser) {
      getUser('1234')
        .then((data) => setCurrentUser(data))
        .catch(console.error);
    }
    if (!myExpenses) {
      getExpenses('1234')
        .then((data) => setMyExpenses(data))
        .catch(console.error);
    }
  }, [currentUser, myExpenses]);

  if (!currentUser || !myExpenses) {
    return (
      <Box spacing="l" alignItems="center" justifyContent="center">
        <Spinner size="md" />
      </Box>
    );
  }
  return (
    <div>
      <h2 style={{ lineHeight: 1 }}>My budget</h2>
      <Divider spacing="xl" />
      <InfoBox>
        Expenses added within the last two months may not be visible in your
        list or deducted from your balance due to manual handling.
      </InfoBox>
      <Grid spacing="l">
        <Column lg="4" md="4" sm="4" xs="12">
          <Box backgroundColor={theme.colors.silver} spacing="m">
            <ValueHeader>Time balance</ValueHeader>
            <ValueContent>{currentUser.currentTimeBalance}h</ValueContent>
          </Box>
        </Column>
        <Column lg="4" md="4" sm="4" xs="12">
          <Box backgroundColor={theme.colors.silver} spacing="m">
            <ValueHeader>Money balance</ValueHeader>
            <ValueContent>{currentUser.currentMoneyBalance}kr</ValueContent>
          </Box>
        </Column>
        <Column lg="4" md="4" sm="4" xs="12">
          <Box backgroundColor={theme.colors.silver} spacing="m">
            <ValueHeader>Hardware balance</ValueHeader>
            <ValueContent>{currentUser.currentHardwareBalance}kr</ValueContent>
          </Box>
        </Column>
      </Grid>
      <Divider spacing="2xl" />
      <h3>My expenses</h3>
      <Divider spacing="m" />
      {myExpenses && <Timeline expenses={myExpenses} />}
    </div>
  );
};

export default MyBudget;
