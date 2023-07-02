import { memo, type FC, useState, Suspense, useEffect } from 'react';
import s from './IncomeList.module.scss';
import { useSelector } from 'react-redux';
import { getIncomes } from '../../model/selectors/getIncomes';
import { IncomeListItem } from './IncomeListItem';
import { IconCashBanknoteOff } from '@tabler/icons-react';
import { Container, Loader } from '@mantine/core';
import { IncomeEditForm } from '@/features/IncomeEditForm';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch';
import { getIncome } from '../../model/services/getIncome/getIncome';

interface IncomeListProps {
  className?: string;
}

export const IncomeList: FC<IncomeListProps> = memo(() => {
  const dispatch = useAppDispatch();
  const expenses = useSelector(getIncomes);

  useEffect(() => {
    dispatch(getIncome());
  }, []);

  const list = expenses.map((expense) => {
    return (
      <>
        <IncomeListItem
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
