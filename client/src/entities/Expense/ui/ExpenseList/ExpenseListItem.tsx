import { Suspense, type FC, useState } from 'react';
import cls from './ExpenseListItem.module.scss';
import { Flex, Group, ThemeIcon, Text, Loader } from '@mantine/core';
import { UnstyledButton } from '@/shared/ui/UnstyledButton';
import { ExpenseEditForm } from '@/features/ExpenseEditForm';
import { Expense } from '../../model/types/expenseSchema';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { expenseActions } from '../../model/slice/expenseSlice';

interface ExpenseListItemProps extends Expense {
  icon: React.ReactNode;
}

export const ExpenseListItem: FC<ExpenseListItemProps> = ({ icon, ...expenseRest }) => {
  const dispatch = useAppDispatch();
  const formattedDate = new Intl.DateTimeFormat('ru-RU', {}).format(new Date(expenseRest.date));

  const openModal = () => {
    dispatch(expenseActions.openEditModal(expenseRest));
  };

  return (
    <UnstyledButton onClick={openModal}>
      <Flex gap="xs" justify="space-between" direction="row" align="center">
        <Flex gap="sm">
          <div
            style={{
              width: '10px',
              height: '43px',
              backgroundColor: expenseRest.categoryExpense?.color,
            }}
          />
          <Flex direction="column">
            <Text size="sm">{expenseRest.name}</Text>
            <Text size="sm">{formattedDate}</Text>
          </Flex>
        </Flex>
        <Text size="sm" color="#9c423b">
          -{expenseRest.amount}
        </Text>
      </Flex>
    </UnstyledButton>
  );
};
