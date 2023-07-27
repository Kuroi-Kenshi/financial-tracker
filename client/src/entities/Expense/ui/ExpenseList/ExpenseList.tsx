import { memo, type FC, useEffect, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { getFilteredExpenses } from '../../model/selectors/getFilteredExpenses';
import { ExpenseListItem } from './ExpenseListItem';
import { IconCashBanknoteOff } from '@tabler/icons-react';
import { Button, Flex, Group, Loader } from '@mantine/core';
import { ExpenseEditForm } from '@/features/ExpenseEditForm';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { getExpense } from '../../model/services/getExpense/getExpense';
import { type Expense, ExpenseReqType } from '../../model/types/expenseSchema';
import { getLastExpenses } from '../../model/selectors/getLastExpenses';
import { expenseActions } from '../../model/slice/expenseSlice';

interface ExpenseListProps {
  maxTake?: string;
  styles?: React.CSSProperties;
  mode: ExpenseReqType;
  withAddButton?: boolean;
}

// eslint-disable-next-line react/display-name
export const ExpenseList: FC<ExpenseListProps> = memo(
  // eslint-disable-next-line react/prop-types
  ({ maxTake, styles, mode, withAddButton }) => {
    const dispatch = useAppDispatch();
    const filteredExpenses = useSelector(getFilteredExpenses);
    const lastExpenses = useSelector(getLastExpenses);

    useEffect(() => {
      const query = mode === ExpenseReqType.LAST_EXPENSES ? { take: maxTake ?? '5' } : undefined;
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      dispatch(getExpense({ mode, query }));
    }, []);

    const expenses = mode === ExpenseReqType.LAST_EXPENSES ? lastExpenses : filteredExpenses;

    const openModal = (data: Expense | undefined) => {
      dispatch(expenseActions.openEditModal(data ?? null));
    };

    return (
      <Flex
        direction="column"
        mt="20px"
        ml="0"
        pl="0"
        maw="400px"
        style={styles}
        data-testid="ExpenseList"
      >
        {withAddButton && (
          <Group mt="20px">
            <Button
              color="indigo"
              onClick={() => {
                openModal(undefined);
              }}
              data-testid="expenseAddButton"
            >
              Добавить
            </Button>
          </Group>
        )}

        <div style={{ marginTop: '30px' }}>
          {expenses.map((expense) => {
            return <ExpenseListItem key={expense.id} icon={<IconCashBanknoteOff />} {...expense} />;
          })}
        </div>

        <Suspense fallback={<Loader />}>
          <ExpenseEditForm />
        </Suspense>
      </Flex>
    );
  }
);
