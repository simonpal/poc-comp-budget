import { useEffect } from 'react';
import { TabItem, Tabs } from '../components/Tabs';
import { AddExpense } from '../components/AdminComponents/AddExpense';
import { UpdateUser } from '../components/AdminComponents/UpdateUser';
import {
  AdminContextActionTypes,
  useAdminContext,
} from '../components/AdminComponents/AdminContext';
import { Divider } from '../components/Divider';
import { Column } from '../components/Column';
import { Grid } from '../components/Grid';
import { Select } from '../components/Select';
import { users } from '../mockData';
import { UserCard } from '../components/UserCard';
import { Modal } from '../components/Modal';
import { getExpenses } from '../api';
import { UserProfile } from '../components/UserProfile';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../utils/UserContext';

const Admin = () => {
  const {
    state: { user, showUserModal, userExpenses },
    dispatch,
  } = useAdminContext();

  const {
    state: { isAdmin },
  } = useUserContext();

  // const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  // console.log(user);

  const switchUser = (id: string) => {
    const selectedUser = users.find((u) => u.id === id);
    if (selectedUser) {
      dispatch({
        type: AdminContextActionTypes.SetUser,
        payload: selectedUser,
      });
      getExpenses(id)
        .then((data) => {
          dispatch({
            type: AdminContextActionTypes.SetUserExpenses,
            payload: data,
          });
        })
        .catch(console.error);
    }
  };

  useEffect(() => {
    if (!isAdmin) {
      navigate('/mybudget');
    }
  }, [isAdmin, navigate]);
  return (
    <div>
      <Grid spacing="l">
        <Column lg="6" md="6" sm="6" xs="12">
          <Select
            label="Select user"
            onChange={(e) => switchUser(e.currentTarget.value)}
          >
            <option value="-1">- Select user -</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </Select>
          <Divider spacing="l" />
          <Button
            priority="outline"
            fullWidth
            onClick={() => navigate('stats')}
          >
            Show statistics
          </Button>
        </Column>
        <Column lg="6" md="6" sm="6" xs="12">
          {user && <UserCard user={user} />}
        </Column>
      </Grid>
      <Divider spacing="2xl" />
      <Tabs spaceEvenly>
        <TabItem eventKey="expense" title="Add expense">
          <AddExpense />
        </TabItem>
        <TabItem eventKey="updateuser" title="Update user">
          <UpdateUser />
        </TabItem>
        {/* <TabItem eventKey="adduser" title="Add user">
          <UpdateUser />
        </TabItem> */}
      </Tabs>
      <Modal
        onClose={() =>
          dispatch({
            type: AdminContextActionTypes.ToggleUserModal,
            payload: false,
          })
        }
        visible={showUserModal}
      >
        <UserProfile user={user} expenses={userExpenses || []} />
      </Modal>
    </div>
  );
};

export default Admin;
