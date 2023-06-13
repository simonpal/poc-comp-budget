import { useEffect, useState } from 'react';
import { Divider } from '../Divider';
import { Grid } from '../Grid';
import { Column } from '../Column';
import { FormControl } from '../FormControl/FormControl';
import { Label } from '../FormControl/Label';
import { DatepickerWrapper } from '../DatepickerWrapper';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import { TextField } from '../Textfield';
import { Box } from '../Box';
import { Button } from '../Button';
import styled from 'styled-components';
import { useAdminContext } from './AdminContext';

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

  const [startDate, setStartDate] = useState(
    user?.start ? new Date(user.start) : new Date()
  );

  useEffect(() => {
    setStartDate(user?.start ? new Date(user.start) : new Date());
  }, [user]);

  return (
    <UpdateUserWrapper>
      <h2>Update user</h2>
      <Divider spacing="m" color="transparent" />

      <>
        <form>
          <Grid spacing="l">
            <Column lg="6" md="6" sm="6" xs="12">
              <FormControl fullWidth>
                <Label>Start date</Label>
                <DatepickerWrapper>
                  <DatePicker
                    required
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
                name="hardwareBudget"
                type="number"
                disabled={!user}
                defaultValue={user?.hardwareBudget || 0}
              />
            </Column>
          </Grid>
          <Divider spacing="s" />
          <Grid spacing="l">
            <Column lg="6" md="6" sm="6" xs="12">
              <TextField
                required
                label="Opening balance money"
                name="openingBalanceMoney"
                type="number"
                disabled={!user}
                defaultValue={user?.openingBalanceMoney || 0}
              />
            </Column>
            <Column lg="6" md="6" sm="6" xs="12">
              <TextField
                required
                label="Opening balance time"
                name="openingBalanceTime"
                type="number"
                disabled={!user}
                defaultValue={user?.openingBalanceTime || 0}
              />
            </Column>
          </Grid>
          <Divider spacing="m" />
          <TextField
            label="Yearly refill"
            name="yearlyRefill"
            type="number"
            disabled={!user}
            defaultValue={user?.yearlyRefill || 0}
            fullWidth
          />
          <Divider spacing="m" />
          <Divider spacing="m" />
          <FormControl fullWidth>
            <Label>Comment</Label>
            <textarea
              name="comment"
              defaultValue={user?.comment}
              disabled={!user}
            ></textarea>
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
