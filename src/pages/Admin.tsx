import { useCallback, useEffect } from "react";
import { TabItem, Tabs } from "../components/Tabs";
import { AddExpense } from "../components/AdminComponents/AddExpense";
import { UpdateUser } from "../components/AdminComponents/UpdateUser";
import {
  AdminContextActionTypes,
  useAdminContext,
} from "../components/AdminComponents/AdminContext";
import { Divider } from "../components/Divider";
import { Column } from "../components/Column";
import { Grid } from "../components/Grid";
// import { users } from '../mockData';
import { UserCard } from "../components/UserCard";
import { Modal } from "../components/Modal";
import {
  useGetAllUsers,
  useGetBudgets,
  useGetExpenses,
  useIsAdmin,
} from "../api";
import { UserProfile } from "../components/UserProfile";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { ComboBox } from "../components/ComboBox";
import styled from "styled-components";
import { Spinner } from "../components/Spinner";
import { ErrorBox } from "../components/ErrorBox";
import { Box } from "../components/Box";
import { StatsIcon } from "../components/Icons/StatsIcon";

const NoUser = styled.div`
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #888;
  font-weight: bold;
  font-size: 2rem;
`;

const Admin = () => {
  const {
    state: { user, showUserModal, userExpenses },
    dispatch,
  } = useAdminContext();

  const { isAdmin, isLoading: adminLoading } = useIsAdmin();

  const {
    users,
    isLoading: loadingUsers,
    isError: errorFetchingUsers,
  } = useGetAllUsers();

  const { expenses } = useGetExpenses(user?.userId || "", {
    enabled: typeof user !== "undefined",
  });
  const { budget } = useGetBudgets(user?.userId || "", false, {
    enabled: typeof user !== "undefined",
  });

  // const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  // console.log(user);

  const switchUser = useCallback(
    (id: string) => {
      if (users && Array.isArray(users)) {
        const selectedUser = users.find((u) => u.userId === id);
        if (selectedUser) {
          dispatch({
            type: AdminContextActionTypes.SetUser,
            payload: selectedUser,
          });
        }
      }
    },
    [users, dispatch]
  );

  useEffect(() => {
    if (expenses) {
      dispatch({
        type: AdminContextActionTypes.SetUserExpenses,
        payload: expenses,
      });
    }
  }, [expenses, dispatch]);

  useEffect(() => {
    if (!isAdmin && !adminLoading) {
      navigate("/mybudget");
    }
  }, [isAdmin, adminLoading, navigate]);
  return (
    <div>
      <Box alignItems="flex-end">
        <Button priority="outline" fullWidth onClick={() => navigate("stats")}>
          Show statistics <StatsIcon />
        </Button>
      </Box>
      <Divider spacing="l" />
      <Grid spacing="l">
        <Column lg="6" md="6" sm="6" xs="12">
          {loadingUsers && <Spinner size="sm" />}
          {errorFetchingUsers && <ErrorBox>Error getting users.</ErrorBox>}
          {users && Array.isArray(users) && (
            <ComboBox
              fullWidth
              label="Select user"
              data={users.map((user) => ({
                id: user.userId,
                title: user.name,
              }))}
              handleChange={(val) => switchUser(val?.id || "")}
            />
          )}
          {/* <FormControl fullWidth>
            <Label>Select user</Label>
            <Dropdown
              options={users.map((user) => ({
                key: user.id,
                value: user.id,
                text: user.name,
              }))}
              placeholder="Select user"
              handleChange={(val) => switchUser(val?.value || '')}
              search
            />
          </FormControl> */}
          {/* <Select
            label="Select user"
            onChange={(e) => switchUser(e.currentTarget.value)}
          >
            <option value="-1">- Select user -</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </Select> */}
        </Column>
        <Column lg="6" md="6" sm="6" xs="12">
          {user && <UserCard user={user} />}
        </Column>
      </Grid>
      <Divider spacing="2xl" />
      {user ? (
        <Tabs spaceEvenly>
          <TabItem eventKey="expense" title="Add expense">
            <AddExpense reqType="create" />
          </TabItem>
          <TabItem eventKey="updateuser" title="Update user">
            <UpdateUser />
          </TabItem>
          {/* <TabItem eventKey="adduser" title="Add user">
          <UpdateUser />
        </TabItem> */}
        </Tabs>
      ) : (
        <NoUser>Please select a user.</NoUser>
      )}
      <Modal
        id="user-profile-modal"
        blur
        onClose={() =>
          dispatch({
            type: AdminContextActionTypes.ToggleUserModal,
            payload: false,
          })
        }
        visible={showUserModal}>
        {user && budget && (
          <UserProfile
            budget={budget}
            user={user}
            expenses={userExpenses || []}
          />
        )}
      </Modal>
    </div>
  );
};

export default Admin;
