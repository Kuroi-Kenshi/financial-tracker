import { memo, type FC } from 'react';
import { Flex, Text } from '@mantine/core';
import { UnstyledButton } from '@/shared/ui/UnstyledButton';
import { Income } from '../../model/types/incomeSchema';
import { incomeActions } from '../../model/slice/incomeSlice';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';

interface IncomeListItemProps extends Income {
  icon: React.ReactNode;
  color: string;
}

export const IncomeListItem: FC<IncomeListItemProps> = memo(({ icon, color, ...incomeRest }) => {
  const dispatch = useAppDispatch();
  const formattedDate = new Intl.DateTimeFormat('ru-RU', {}).format(new Date(incomeRest.date));

  const openModal = () => {
    dispatch(incomeActions.openEditModal(incomeRest));
  };

  return (
    <UnstyledButton onClick={openModal}>
      <Flex
        gap="xs"
        justify="space-between"
        direction="row"
        align="center"
        data-testid="IncomeListItem"
      >
        <Flex gap="sm">
          <div
            style={{
              width: '10px',
              height: '43px',
              backgroundColor: incomeRest.categoryIncome.color,
            }}
          ></div>
          <Flex direction="column">
            <Text size="sm">{incomeRest.name}</Text>
            <Text size="sm">{formattedDate}</Text>
          </Flex>
        </Flex>
        <Text size="sm" color="#2a9d2f" fw="600">
          +{incomeRest.amount}
        </Text>
      </Flex>
    </UnstyledButton>
  );
});
