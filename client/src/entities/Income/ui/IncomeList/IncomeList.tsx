import { type FC, Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getIncomes } from '../../model/selectors/getIncomes';
import { IncomeListItem } from './IncomeListItem';
import { IconCashBanknoteOff } from '@tabler/icons-react';
import { Button, Flex, Group, Loader } from '@mantine/core';
import { IncomeEditForm } from '@/features/IncomeEditForm';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { getIncome } from '../../model/services/getIncome/getIncome';
import { incomeActions } from '../../model/slice/incomeSlice';
import { type Income } from '../../model/types/incomeSchema';

interface IncomeListProps {
  styles?: React.CSSProperties;
}

export const IncomeList: FC<IncomeListProps> = ({ styles }) => {
  const dispatch = useAppDispatch();
  const incomes = useSelector(getIncomes);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(getIncome());
  }, []);

  const openModal = (data: Income | undefined) => {
    console.log('KEKE');

    dispatch(incomeActions.openEditModal(data ?? null));
  };

  const list = incomes.map((income) => {
    return (
      <IncomeListItem key={income.id} color="grape" icon={<IconCashBanknoteOff />} {...income} />
    );
  });

  return (
    <Flex
      direction="column"
      mt="20px"
      ml="0"
      pl="0"
      maw="400px"
      style={styles}
      data-testid="IncomeList"
    >
      <Group mt="20px">
        <Button
          color="indigo"
          onClick={() => {
            openModal(undefined);
          }}
          data-testid="openModalBtn"
        >
          Добавить
        </Button>
      </Group>
      <div style={{ marginTop: '30px' }}>{list}</div>
      <Suspense fallback={<Loader />}>
        <IncomeEditForm />
      </Suspense>
    </Flex>
  );
};
