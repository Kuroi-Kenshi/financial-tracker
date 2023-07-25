import { memo, type FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Stack } from '@mantine/core';
import { IconCashBanknoteOff } from '@tabler/icons-react';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { ExpenseCategoryBudgetListItem } from './ExpenseCategoryBudgetListItem';
import { getExpenseCategory } from '../../model/services/getExpenseCategories/getExpenseCategory';
import { getExpenseCategoryWithLimits } from '../../model/selectors/getExpenseCategoryWithLImits';

interface ExpenseCategoryBudgetListProps {
  className?: string;
  styles?: React.CSSProperties;
}

export const ExpenseCategoryBudgetList: FC<ExpenseCategoryBudgetListProps> = memo(() => {
  const dispatch = useAppDispatch();
  const expenseCategoryList = useSelector(getExpenseCategoryWithLimits);

  useEffect(() => {
    dispatch(getExpenseCategory());
  }, []);

  const list = expenseCategoryList.map((expenseCategory) => {
    return (
      <ExpenseCategoryBudgetListItem
        key={expenseCategory.id}
        icon={<IconCashBanknoteOff />}
        {...expenseCategory}
      />
    );
  });

  return (
    <Stack miw="200px" maw="400px">
      {list}
    </Stack>
  );
});
