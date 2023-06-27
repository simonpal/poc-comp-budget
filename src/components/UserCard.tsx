import styled from "styled-components";
import { User } from "../types";
// import { UserImage } from './UserImage';
import { Divider } from "./Divider";
import { Grid } from "./Grid";
import { Column } from "./Column";
import { ValueHeader } from "./ValueHeader";
import { Button } from "./Button";
import {
  AdminContextActionTypes,
  useAdminContext,
} from "./AdminComponents/AdminContext";
import { useGetBudgets } from "../api";

const StyledCard = styled.div`
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.silver};
  h4 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${({ theme }) => theme.colors.text};
  }
`;
type UserCardProps = {
  user: User;
};

export const UserCard: React.FunctionComponent<UserCardProps> = ({ user }) => {
  const { dispatch } = useAdminContext();
  const { budget } = useGetBudgets(user.userId);
  return (
    <StyledCard>
      <h3>Current user</h3>
      <Divider spacing="2xs" color="transparent" />
      <h4>
        <span>
          {user.name} ({user.userId})
        </span>
        {/* <UserImage size={50} url={user.image} alt={user.name} /> */}
      </h4>
      <Divider spacing="xs" />
      <Grid spacing="m" mobileDirection="row">
        <Column lg="6" md="6" sm="6" xs="6">
          <div>
            <ValueHeader>Time balance</ValueHeader>
            <strong>{budget?.currentTimeBalance}</strong>
          </div>
        </Column>
        <Column lg="6" md="6" sm="6" xs="6">
          <div>
            <ValueHeader>Total money balance</ValueHeader>
            <strong>{budget?.currentMoneyBalance}</strong>
          </div>
        </Column>
      </Grid>
      <Divider spacing="xs" />
      <Grid spacing="m" mobileDirection="row">
        <Column lg="6" md="6" sm="6" xs="6">
          <div>
            <ValueHeader>Hardware balance</ValueHeader>
            <strong>{budget?.currentHardwareBalance}</strong>
          </div>
        </Column>
        <Column lg="6" md="6" sm="6" xs="6">
          <Button
            priority="outline"
            onClick={() =>
              dispatch({
                type: AdminContextActionTypes.ToggleUserModal,
                payload: true,
              })
            }>
            Show all
          </Button>
          {/* <div>
            <ValueHeader>Money balance</ValueHeader>
            <strong>{user.currentTimeBalance}</strong>
          </div> */}
        </Column>
      </Grid>
    </StyledCard>
  );
};
