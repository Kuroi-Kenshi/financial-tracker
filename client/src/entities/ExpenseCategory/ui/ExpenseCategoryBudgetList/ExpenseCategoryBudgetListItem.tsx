import { memo, type FC } from 'react';
import { Group, Text, Progress } from '@mantine/core';
import { ExpenseCategory } from '../../model/types/expenseCategoriesSchema';

interface ExpenseCategoryBudgetListItemProps extends ExpenseCategory {
  icon?: React.ReactNode;
}

export const getExpensePercentOfCategory = (category: ExpenseCategory) => {
  if (!category.limitPerMonth) return 0;
  return Math.floor((category.totalExpense / category.limitPerMonth) * 100);
};

export const ExpenseCategoryBudgetListItem: FC<ExpenseCategoryBudgetListItemProps> = memo(
  ({ icon, ...expenseCategory }) => {
    const expensePercent = getExpensePercentOfCategory(expenseCategory);

    return (
      <Group maw="400px" data-testid="ExpenseCategoryBudgetListItem">
        <Text>{expenseCategory.name}</Text>
        <Progress
          value={expensePercent}
          size="xl"
          label={`${expensePercent}%`}
          radius="md"
          color="pink"
          w="100%"
          h="35px"
        />
      </Group>
    );
  }
);
