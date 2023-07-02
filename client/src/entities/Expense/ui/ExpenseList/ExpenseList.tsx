import { memo, type FC, useState, Suspense, useEffect } from 'react';
import s from './ExpenseList.module.scss';
import { useSelector } from 'react-redux';
import { getExpenses } from '../../model/selectors/getExpenses';
import { ExpenseListItem } from './ExpenseListItem';
import { IconCashBanknoteOff } from '@tabler/icons-react';
import { Container, Loader } from '@mantine/core';
import { ExpenseEditForm } from '@/features/ExpenseEditForm';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch';
import { getExpense } from '../../model/services/getExpense/getExpense';

interface ExpenseListProps {
  className?: string;
}

export const ExpenseList: FC<ExpenseListProps> = memo(() => {
  const dispatch = useAppDispatch();
  const expenses = useSelector(getExpenses);

  useEffect(() => {
    dispatch(getExpense());
  }, []);

  const list = expenses.map((expense) => {
    return (
      <>
        <ExpenseListItem
          key={expense.id}
          color="grape"
          icon={<IconCashBanknoteOff />}
          {...expense}
        />
      </>
    );
  });

  return (
    <Container mt="20px" ml="0" pl="0">
      {list}
    </Container>
  );
});
