import { memo, type FC, useState, Suspense, useEffect } from 'react';
import s from './FinancialGoalList.module.scss';
import { useSelector } from 'react-redux';
import { getFinancialGoalList } from '../model/selectors/getFinancialGoalList';
import { IconCashBanknoteOff } from '@tabler/icons-react';
import { Button, Flex, Group, Loader } from '@mantine/core';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { getFinancialGoal } from '../model/services/getFinancialGoal/getFinancialGoal';
import { FinancialGoalListItem } from './FinancialGoalListItem';
import { FinancialGoalEditForm } from '@/features/FinancialGoalEditForm';
import { financialGoalActions } from '../model/slice/financialGoalSlice';
import { FinancialGoal } from '../model/types/financialGoalSchema';

interface FinancialGoalListProps {
  className?: string;
  styles?: React.CSSProperties;
  withAddButton?: boolean;
}

export const FinancialGoalList: FC<FinancialGoalListProps> = memo(({ styles, withAddButton }) => {
  const dispatch = useAppDispatch();
  const financialGoals = useSelector(getFinancialGoalList);

  useEffect(() => {
    dispatch(getFinancialGoal());
  }, []);

  const openModal = (data: FinancialGoal | undefined) => {
    dispatch(financialGoalActions.openEditModal(data || null));
  };

  return (
    <Flex direction="column" mt="20px" ml="0" pl="0" maw="400px" style={styles}>
      {withAddButton && (
        <Group mt="20px">
          <Button color="indigo" onClick={() => openModal(undefined)}>
            Добавить цель
          </Button>
        </Group>
      )}
      <div style={{ marginTop: '30px' }}>
        {financialGoals.map((financialGoal) => {
          return (
            <FinancialGoalListItem
              key={financialGoal.id}
              icon={<IconCashBanknoteOff />}
              openEditModal={openModal}
              {...financialGoal}
            />
          );
        })}
      </div>
      <Suspense fallback={<Loader />}>
        <FinancialGoalEditForm />
      </Suspense>
    </Flex>
  );
});
