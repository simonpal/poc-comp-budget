import { useTheme } from "styled-components";
import { Theme } from "../theme";
import { Budget, Expense, User } from "../types";
import { Box } from "./Box";
import { Column } from "./Column";
import { Grid } from "./Grid";
import { ValueHeader } from "./ValueHeader";
import { Divider } from "./Divider";
import { Timeline } from "./Timeline";
// import { UserImage } from './UserImage';
import { ValueContent } from "./ValueContent";
import { Counter } from "./Counter";

type UserProfileProps = {
  user?: User;
  budget: Budget;
  expenses: Expense[];
};
export const UserProfile: React.FunctionComponent<UserProfileProps> = ({
  user,
  budget,
  expenses,
}) => {
  const theme = useTheme() as Theme;
  if (!user) return null;
  return (
    <div>
      <Box spacing="l" alignItems="center">
        {/* <UserImage size={100} url={user.image} alt={user.name} /> */}
        <Divider spacing="xs" color="transparent" />
        <h3>{user.name}</h3>
      </Box>
      <Divider spacing="l" />
      <Grid spacing="l">
        <Column lg="4" md="4" sm="4" xs="12">
          <Box backgroundColor={theme.colors.silver} spacing="m">
            <ValueHeader>Time balance</ValueHeader>
            <ValueContent>
              <Counter from={0} to={budget.currentTimeBalance} />
            </ValueContent>
          </Box>
        </Column>
        <Column lg="4" md="4" sm="4" xs="12">
          <Box backgroundColor={theme.colors.silver} spacing="m">
            <ValueHeader>Money balance</ValueHeader>
            <ValueContent>
              <Counter from={0} to={budget.currentMoneyBalance} />
            </ValueContent>
          </Box>
        </Column>
        <Column lg="4" md="4" sm="4" xs="12">
          <Box backgroundColor={theme.colors.silver} spacing="m">
            <ValueHeader>Hardware balance</ValueHeader>
            <ValueContent>
              <Counter from={0} to={budget.currentHardwareBalance} />
            </ValueContent>
          </Box>
        </Column>
      </Grid>
      <Divider spacing="2xl" />
      <h3>Expenses</h3>
      <Divider spacing="m" />
      {expenses && <Timeline expenses={expenses} />}
    </div>
  );
};
