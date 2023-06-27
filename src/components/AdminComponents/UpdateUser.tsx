import { useEffect, useState } from "react";
import { Divider } from "../Divider";
import { Grid } from "../Grid";
import { Column } from "../Column";
import { FormControl } from "../FormControl/FormControl";
import { Label } from "../FormControl/Label";
import { DatepickerWrapper } from "../DatepickerWrapper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.min.css";
import { TextField } from "../Textfield";
import { Box } from "../Box";
import { Button } from "../Button";
import styled from "styled-components";
import { useAdminContext } from "./AdminContext";
import { Textarea } from "../Textarea";
import { useGetBudgets, useUpdateBudget } from "../../api";
import { BudgetRequestBody } from "../../types";
import { Spinner } from "../Spinner";
import { getFormValue } from "../../utils/helpers";

const UpdateUserWrapper = styled.div`
  h4 {
    display: flex;
    align-items: center;
    img {
      margin-right: 0.5rem;
    }
  }
`;

export const UpdateUser = () => {
  //   const [currentUser, setCurrentUser] = useState<User | undefined>();
  const {
    state: { user },
  } = useAdminContext();

  const { budget, isLoading: isLoadingBudget } = useGetBudgets(
    user?.userId ?? "",
    {
      enabled: typeof user !== "undefined",
    }
  );

  const [startDate, setStartDate] = useState(
    budget?.start ? new Date(budget.start) : new Date()
  );

  const { mutate: updateBudget } = useUpdateBudget();

  const responseBody = {} as BudgetRequestBody;

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.forEach((value, property: string) => {
      if (typeof value !== "undefined") {
        const newVal = getFormValue(value);
        responseBody[property as keyof BudgetRequestBody] = newVal as never;
      }
    });

    console.log(responseBody);
    updateBudget(responseBody);
  };

  useEffect(() => {
    setStartDate(budget?.start ? new Date(budget.start) : new Date());
  }, [budget]);

  if (isLoadingBudget) {
    return <Spinner size="md" />;
  }

  return (
    <UpdateUserWrapper>
      <h2>Update user</h2>
      <Divider spacing="m" color="transparent" />

      <>
        <form onSubmit={onSubmitHandler}>
          <input type="hidden" name="userId" value={user?.userId} />
          <input type="hidden" name="id" value={budget?.id} />
          <Grid spacing="l">
            <Column lg="6" md="6" sm="6" xs="12">
              <FormControl fullWidth>
                <Label htmlFor="start">Start date</Label>
                <DatepickerWrapper>
                  <DatePicker
                    required
                    name="start"
                    id="start"
                    selected={startDate}
                    disabled={!user}
                    dateFormat="yyyy-MM-dd"
                    onChange={(date: Date) => setStartDate(date)}
                  />
                </DatepickerWrapper>
              </FormControl>
            </Column>
            <Column lg="6" md="6" sm="6" xs="12">
              <TextField
                required
                label="Hardware budget"
                id="hardwareBudget"
                name="hardwareBudget"
                type="number"
                disabled={!user}
                defaultValue={budget?.hardwareBudget || 0}
              />
            </Column>
          </Grid>
          <Divider spacing="s" />
          <Grid spacing="l">
            <Column lg="6" md="6" sm="6" xs="12">
              <TextField
                required
                label="Opening balance money"
                id="openingBalanceMoney"
                name="openingBalanceMoney"
                type="number"
                disabled={!user}
                defaultValue={budget?.openingBalanceMoney || 0}
              />
            </Column>
            <Column lg="6" md="6" sm="6" xs="12">
              <TextField
                required
                label="Opening balance time"
                id="openingBalanceTime"
                name="openingBalanceTime"
                type="number"
                disabled={!user}
                defaultValue={budget?.openingBalanceTime || 0}
              />
            </Column>
          </Grid>
          <Divider spacing="m" />
          <TextField
            label="Yearly refill"
            id="yearlyRefill"
            name="yearlyRefill"
            type="number"
            disabled={!user}
            defaultValue={budget?.yearlyRefill || 0}
            fullWidth
          />
          <Divider spacing="m" />
          <FormControl fullWidth>
            <Label htmlFor="comment">Comment</Label>
            <Textarea
              id="comment"
              name="comment"
              defaultValue={budget?.comment}
              disabled={!user}></Textarea>
          </FormControl>
          <Box topSpacing="l" alignItems="flex-end">
            <Button type="submit" disabled={!user}>
              Update user
            </Button>
          </Box>
        </form>
      </>
    </UpdateUserWrapper>
  );
};
