import styled from 'styled-components';
import { Expense } from '../types';
import { HardwareIcon } from './Icons/HardwareIcon';
import { TimeIcon } from './Icons/TimeIcon';
import { MoneyIcon } from './Icons/MoneyIcon';
import { Grid } from './Grid';
import { Column } from './Column';
import { Divider } from './Divider';
import { getExpenseType } from '../utils/helpers';
import { useMemo, useState } from 'react';
import { Button } from './Button';
import { InlineStack } from './InlineStack';

const TimelineWrapper = styled.div`
  border-left: ${({ theme }) => `1px solid ${theme.colors.silver}`};
  margin-left: 2rem;
  margin-top: 2.5rem;
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
    content: '';
    border-right: ${({ theme }) => `0.5rem solid ${theme.colors.silver}`};
    border-top: 0.5rem solid transparent;
    border-bottom: 0.5rem solid transparent;
    position: absolute;
    top: 1.25rem;
    right: 100%;
  }
`;

const Sum = styled.span`
  font-size: 2rem;
  font-weight: bold;
`;

const getIcon = (type: string) => {
  switch (type) {
    case 'hardware':
      return <HardwareIcon />;
    case 'time':
      return <TimeIcon />;
    default:
      return <MoneyIcon />;
  }
};

type TimelineProps = {
  expenses: Expense[];
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
  const sortedExpenses = expenses.sort(sortByDate);
  const allYears: number[] = useMemo(() => {
    return sortedExpenses.reduce((acc: number[], curr: Expense) => {
      const year = new Date(curr.date).getFullYear();
      return [...new Set([...acc, year])];
    }, []);
  }, [sortedExpenses]);

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
            priority={`${year === selectedYear ? 'primary' : 'secondary'}`}
            onClick={() => setSelectedYear(year)}
          >
            {year}
          </Button>
        ))}
      </InlineStack>
      <TimelineWrapper>
        {filteredExpenses.map((exp) => (
          <ExpenseWrapper key={exp.id}>
            <ExpenseIcon>{getIcon(getExpenseType(exp))}</ExpenseIcon>
            <ExpenseContent>
              <Grid spacing="l">
                <Column lg="9" md="9" sm="9" xs="12">
                  <div>
                    <strong>{exp.date}</strong>
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
                    {exp.sum} {exp.type === 'time' ? 'h' : 'kr'}
                  </Sum>
                </Column>
              </Grid>
            </ExpenseContent>
          </ExpenseWrapper>
        ))}
      </TimelineWrapper>
    </>
  );
};
