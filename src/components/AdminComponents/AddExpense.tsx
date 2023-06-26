import { Column } from '../Column';
import { FormControl } from '../FormControl/FormControl';
import { Label } from '../FormControl/Label';
import { Grid } from '../Grid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import { Select } from '../Select';
import { useState } from 'react';
import { Divider } from '../Divider';
import { TextField } from '../Textfield';
import { ToggleSwitch } from '../ToggleSwitch';
import { Box } from '../Box';
import { Button } from '../Button';
import { DatepickerWrapper } from '../DatepickerWrapper';
import { useAdminContext } from './AdminContext';
import {
  useCreateCategory,
  // useCreateExpense,
  useGetCategories,
} from '../../api';
import { Spinner } from '../Spinner';
import { Modal } from '../Modal';
import { ComboBox } from '../ComboBox';
import { Textarea } from '../Textarea';
import { NewExpense } from '../../types';
// import toast from 'react-hot-toast';

const expenseTypes = ['time', 'money'];

export const AddExpense = () => {
  const {
    state: { user },
  } = useAdminContext();
  const [expenseDate, setExpenseDate] = useState(new Date());
  const [isHardware, setIsHardware] = useState(false);
  const [expenseType, setExpenseType] = useState<string | undefined>();
  // const [categories, setCategories] = useState<Category[]>();
  const [showAddCategory, setShowAddCategory] = useState(false);

  const { categories } = useGetCategories();
  const { mutate: addCategory } = useCreateCategory();
  const onHardwarechange = (val: boolean) => setIsHardware(val);

  // const { mutate: createExpense } = useCreateExpense('create');

  interface formDataType {
    [key: string]: FormDataEntryValue;
  }
  let responseBody: NewExpense;

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.forEach((value, property: string) => {
      let _value = value;
      if (typeof value !== 'undefined') {
        if (value === 'on') {
          _value = 'true';
        } else if (value === 'off') {
          _value = 'false';
        }
        responseBody[property as keyof NewExpense] = _value as never;
      }
    });

    console.log(responseBody);
    // createExpense(responseBody);
  };

  const onSubmitCategoryHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const postBody: formDataType = {};
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    formData.forEach((value, property: string) => {
      postBody[property] = value;
    });
    console.log(postBody);
    addCategory(postBody.categoryName as string);
    setShowAddCategory(false);
  };

  return (
    <div>
      <h2>Add expense</h2>
      <Divider spacing="m" color="transparent" />
      <form onSubmit={onSubmitHandler}>
        <input type="hidden" name="userId" value={user?.id} />
        {/* <input
          type="hidden"
          name="expenseDate"
          value={`${format(expenseDate, 'yyyy-MM-dd')}`}
        /> */}
        <Grid spacing="l">
          <Column lg="6" md="6" sm="6" xs="12">
            <FormControl fullWidth>
              <Label>Date of expense</Label>
              <DatepickerWrapper>
                <DatePicker
                  required
                  disabled={!user}
                  selected={expenseDate}
                  name="date"
                  dateFormat="yyyy-MM-dd"
                  onChange={(date: Date) => setExpenseDate(date)}
                />
              </DatepickerWrapper>
            </FormControl>
          </Column>
          <Column lg="6" md="6" sm="6" xs="12">
            <Select
              required
              id="expense-type"
              name="type"
              label="Expsense type"
              disabled={!user}
              onChange={(e) => setExpenseType(e.currentTarget.value)}
            >
              <option value="-1">- Select expense type -</option>
              {expenseTypes.map((t) => (
                <option value={t} key={t}>
                  {t}
                </option>
              ))}
            </Select>
          </Column>
        </Grid>
        <Divider spacing="m" />
        <Grid spacing="l">
          <Column lg="6" md="6" sm="6" xs="12">
            <TextField
              required
              label="Amount"
              name="sum"
              type="number"
              disabled={!user}
            />
          </Column>
          <Column lg="6" md="6" sm="6" xs="12">
            <TextField label="Name" name="name" type="text" disabled={!user} />
          </Column>
        </Grid>
        <Divider spacing="m" />
        <Grid spacing="l">
          <Column lg="6" md="6" sm="6" xs="12" justifyContent="center">
            {expenseType !== 'time' && (
              <div>
                <ToggleSwitch
                  id="is-hardware"
                  name="isHardware"
                  checked={isHardware}
                  onChange={onHardwarechange}
                  disabled={!user}
                />
                <Label htmlFor="is-hardware">Is hardware</Label>
              </div>
            )}
          </Column>
          <Column lg="6" md="6" sm="6" xs="12">
            {categories ? (
              <Grid spacing="s">
                <Column lg="9" md="9" sm="9" xs="12">
                  <ComboBox
                    fullWidth
                    label="Select category"
                    disabled={!user}
                    name="category"
                    data={categories.map((cat) => ({
                      id: cat.id,
                      title: cat.name,
                    }))}
                    handleChange={(val) => console.log(val?.id || '')}
                  />
                  {/* <Select label="Category" required disabled={!user}>
                    <option>- Select category -</option>
                    {categories.map((c) => (
                      <option value={c.title} key={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </Select> */}
                </Column>
                <Column lg="3" md="3" sm="3" xs="12">
                  <Box topSpacing="m" alignItems="stretch">
                    <Button
                      priority="tertiary"
                      onClick={() => setShowAddCategory(true)}
                    >
                      Add new
                    </Button>
                  </Box>
                </Column>
              </Grid>
            ) : (
              <Spinner size="sm" />
            )}
          </Column>
        </Grid>
        <Divider spacing="m" />
        <FormControl fullWidth>
          <Label>Comment</Label>
          <Textarea name="comment" disabled={!user}></Textarea>
        </FormControl>
        <Box topSpacing="l" alignItems="flex-end">
          <Button type="submit" disabled={!user}>
            Save expense
          </Button>
        </Box>
      </form>
      <Modal
        visible={showAddCategory}
        onClose={() => setShowAddCategory(false)}
      >
        <h2>Add a new category</h2>
        <Divider spacing="l" />
        <form onSubmit={onSubmitCategoryHandler}>
          <TextField label="Category name" name="categoryName" fullWidth />
          <Divider spacing="l" />
          <Box alignItems="flex-end">
            <Button type="submit">Add category</Button>
          </Box>
        </form>
      </Modal>
    </div>
  );
};
