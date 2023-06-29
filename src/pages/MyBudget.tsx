import { leetImgUrl, useGetBudgets, useGetExpenses } from "../api";
import { Box } from "../components/Box";
import { Spinner } from "../components/Spinner";
import { Grid } from "../components/Grid";
import { Column } from "../components/Column";
import { useTheme } from "styled-components";
import { Theme } from "../theme";
import { Divider } from "../components/Divider";
import { Timeline } from "../components/Timeline";
import { ValueHeader } from "../components/ValueHeader";
import { ValueContent } from "../components/ValueContent";
import { InfoBox } from "../components/InfoBox";
import { useUserContext } from "../utils/UserContext";
import { useEffect } from "react";

const MyBudget = () => {
  const {
    state: { googleUser },
  } = useUserContext();

  const { budget } = useGetBudgets(googleUser?.sub ?? "", false, {
    enabled: typeof googleUser?.sub !== "undefined",
  });
  const { expenses } = useGetExpenses(googleUser?.sub ?? "", {
    enabled: typeof googleUser?.sub !== "undefined",
  });
  console.log({ budget });
  console.log({ expenses });

  const theme = useTheme() as Theme;

  useEffect(() => {
    if (googleUser) {
      document.body.classList.add("has-bg");
      document.body.style.backgroundImage = `url(${leetImgUrl}/${googleUser.name
        .toLocaleLowerCase()
        .replace(" ", "-")})`;
    }
    return () => {
      document.body.style.backgroundImage = "";
      document.body.classList.remove("has-bg");
    };
  }, [googleUser]);

  if (!budget || !expenses) {
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
        list, or deducted from your balance, due to manual handling.
      </InfoBox>
      <Grid spacing="l">
        <Column lg="4" md="4" sm="4" xs="12">
          <Box backgroundColor={theme.colors.silver} spacing="m">
            <ValueHeader>Time balance</ValueHeader>
            <ValueContent>{budget?.currentTimeBalance}h</ValueContent>
          </Box>
        </Column>
        <Column lg="4" md="4" sm="4" xs="12">
          <Box backgroundColor={theme.colors.silver} spacing="m">
            <ValueHeader>Money balance</ValueHeader>
            <ValueContent>{budget.currentMoneyBalance}kr</ValueContent>
          </Box>
        </Column>
        <Column lg="4" md="4" sm="4" xs="12">
          <Box backgroundColor={theme.colors.silver} spacing="m">
            <ValueHeader>Hardware balance</ValueHeader>
            <ValueContent>{budget.currentHardwareBalance}kr</ValueContent>
          </Box>
        </Column>
      </Grid>
      <Divider spacing="2xl" />
      <h3>My expenses</h3>
      <Divider spacing="m" />
      {expenses && <Timeline expenses={expenses} />}
    </div>
  );
};

export default MyBudget;
