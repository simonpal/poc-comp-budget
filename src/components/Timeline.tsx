import styled from "styled-components";
import { Expense } from "../types";
import { HardwareIcon } from "./Icons/HardwareIcon";
import { TimeIcon } from "./Icons/TimeIcon";
import { MoneyIcon } from "./Icons/MoneyIcon";
import { Grid } from "./Grid";
import { Column } from "./Column";
import { Divider } from "./Divider";
import { getExpenseType } from "../utils/helpers";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "./Button";
import { InlineStack } from "./InlineStack";
import { PenIcon } from "./Icons/PenIcon";
import { DeleteIcon } from "./Icons/DeleteIcon";
import {
  AdminContextActionTypes,
  useAdminContext,
} from "./AdminComponents/AdminContext";
import { useCurrentPath } from "../utils/customHooks";
import { useNavigate } from "react-router-dom";
import format from "date-fns/format";
import { ConfirmDialog } from "./ConfirmDialog";
import { useDeleteExpense, useIsAdmin } from "../api";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useInView,
} from "framer-motion";

const TimelineWrapper = styled.ul`
  border-left: ${({ theme }) => `1px solid ${theme.colors.silver}`};
  margin-left: 2rem;
  margin-top: 2.5rem;
  padding: 0;
`;

const ExpenseWrapper = styled.div`
  position: relative;
  margin-bottom: 3rem;
  display: flex;
  align-items: flex-start;
`;

const ExpenseIcon = styled.div`
  flex-grow: 0;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  margin-left: -1.5rem;
  margin-right: 1.5rem;
  border-radius: 50%;
  font-size: 2rem;
`;

const ExpenseContent = styled.div`
  display: flex;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.silver};
  padding: 1rem;
  border-radius: 0.5rem;
  position: relative;
  flex-direction: column;
  &:after {
    content: "";
    border-right: ${({ theme }) => `0.5rem solid ${theme.colors.silver}`};
    border-top: 0.5rem solid transparent;
    border-bottom: 0.5rem solid transparent;
    position: absolute;
    top: 1.25rem;
    right: 100%;
  }
`;

const ExpenseButtons = styled.div`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  display: flex;
  gap: 1rem;
  @media screen and (max-width: 600px) {
    position: relative;
    width: 100%;
    justify-content: flex-end;
    right: auto;
    bottom: auto;
  }
`;

const Sum = styled.span`
  font-size: 2rem;
  font-weight: bold;
`;

const getIcon = (type: string) => {
  switch (type) {
    case "hardware":
      return <HardwareIcon />;
    case "time":
      return <TimeIcon />;
    default:
      return <MoneyIcon />;
  }
};

type TimelineProps = {
  expenses: Expense[];
};

const listItem = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 30 },
};

const TimeLineItem = ({
  exp,
  editExpense,
  setShowConfirmDelete,
  setExpenseToDelete,
}: {
  exp: Expense;
  editExpense: (exp: Expense) => void;
  setShowConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setExpenseToDelete: React.Dispatch<React.SetStateAction<Expense | undefined>>;
}) => {
  const { isAdmin } = useIsAdmin();
  const path = useCurrentPath();
  const controls = useAnimation();
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref);
  useEffect(() => {
    if (inView) {
      controls.start("animate");
    }
  }, [controls, inView]);

  return (
    <motion.li
      ref={ref}
      initial="initial"
      animate={controls}
      exit="exit"
      variants={listItem}>
      <ExpenseWrapper>
        <ExpenseIcon>{getIcon(getExpenseType(exp))}</ExpenseIcon>
        <ExpenseContent>
          <Grid spacing="l">
            <Column lg="9" md="9" sm="9" xs="12">
              <div>
                <strong>{format(new Date(exp.date), "yyyy-MM-dd")}</strong>
              </div>
              <Divider spacing="s" color="transparent" />
              <div>
                <strong>Type: </strong> {getExpenseType(exp)}
              </div>
              <div>
                <strong>Category: </strong> {exp.category}
              </div>
              <div>
                <strong>Name: </strong> {exp.name}
              </div>
              <div>
                <strong>Comment: </strong> {exp.comment}
              </div>
            </Column>
            <Column lg="3" md="3" sm="3" xs="12" alignItems="flex-end">
              <Sum>
                {exp.sum} {exp.type === "time" ? "h" : "kr"}
              </Sum>
            </Column>
          </Grid>
          {isAdmin && path.includes("admin") && (
            <ExpenseButtons>
              <Button
                priority="outline"
                iconOnly
                onClick={() => editExpense(exp)}>
                <PenIcon />
              </Button>
              <Button
                priority="outline"
                onClick={() => {
                  setShowConfirmDelete(true);
                  setExpenseToDelete(exp);
                }}
                iconOnly>
                <DeleteIcon />
              </Button>
            </ExpenseButtons>
          )}
        </ExpenseContent>
      </ExpenseWrapper>
    </motion.li>
  );
};

const sortByDate = (a: Expense, b: Expense) => {
  return new Date(b.date).valueOf() - new Date(a.date).valueOf();
};

export const Timeline: React.FunctionComponent<TimelineProps> = ({
  expenses,
}) => {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [expenseToDelete, setExpenseToDelete] = useState<Expense | undefined>();

  const { mutate: deleteExpense } = useDeleteExpense();

  const sortedExpenses = expenses.sort(sortByDate);

  const { dispatch } = useAdminContext();

  const navigate = useNavigate();

  const allYears: number[] = useMemo(() => {
    return sortedExpenses.reduce((acc: number[], curr: Expense) => {
      const year = new Date(curr.date).getFullYear();
      return [...new Set([...acc, year])];
    }, []);
  }, [sortedExpenses]);

  const editExpense = (exp: Expense) => {
    dispatch({
      type: AdminContextActionTypes.SetSelectedExpense,
      payload: exp,
    });
    dispatch({
      type: AdminContextActionTypes.ToggleUserModal,
      payload: false,
    });

    navigate("editexpense");
  };

  const filteredExpenses = useMemo(() => {
    return sortedExpenses.filter(
      (exp) => new Date(exp.date).getFullYear() === selectedYear
    );
  }, [selectedYear, sortedExpenses]);

  return (
    <>
      <h5>By year</h5>
      <Divider spacing="2xs" color="transparent" />
      <InlineStack spacing="s">
        {allYears.map((year) => (
          <Button
            key={`filter-year-${year}`}
            priority={`${year === selectedYear ? "primary" : "secondary"}`}
            onClick={() => setSelectedYear(year)}>
            {year}
          </Button>
        ))}
      </InlineStack>
      <TimelineWrapper>
        <AnimatePresence>
          {filteredExpenses.map((exp) => (
            <TimeLineItem
              key={exp.id}
              editExpense={editExpense}
              setExpenseToDelete={setExpenseToDelete}
              exp={exp}
              setShowConfirmDelete={setShowConfirmDelete}
            />
          ))}
        </AnimatePresence>
      </TimelineWrapper>
      <ConfirmDialog
        id="confirm-delete-dialog"
        visible={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
        onConfirm={() => {
          if (expenseToDelete?.id) {
            deleteExpense(expenseToDelete?.id);
          }
          setShowConfirmDelete(false);
        }}
        width="30rem"
        title="Delete expense"
        description="Are you sure you want to delete this expense?"
      />
    </>
  );
};
