import { type FC } from 'react';
import { Flex, Group, Text, Progress } from '@mantine/core';
import { UnstyledButton } from '@/shared/ui/UnstyledButton';
import { type FinancialGoal } from '../model/types/financialGoalSchema';

interface FinancialGoalListItemProps extends FinancialGoal {
  icon: React.ReactNode;
  openEditModal: (data: FinancialGoal) => void;
}

export const FinancialGoalListItem: FC<FinancialGoalListItemProps> = ({
  icon,
  openEditModal,
  ...financialGoalRest
}) => {
  const totalAmountPercent = (financialGoalRest.totalAmount / financialGoalRest.amount) * 100;
  return (
    <>
      <UnstyledButton
        onClick={() => {
          openEditModal(financialGoalRest);
        }}
      >
        <Flex gap="xs" justify="space-between" direction="row" align="center">
          <Group>
            <Text>{financialGoalRest.name}</Text>
            <Text size="sm" color="#2a9d2f" fw="600">
              {financialGoalRest.amount} {financialGoalRest.currency.code}
            </Text>
            <Progress
              value={totalAmountPercent}
              size="xl"
              label={`${Math.floor(totalAmountPercent)}%`}
              radius="md"
              color="pink"
              w="100%"
              h="35px"
            />
            <Text size="sm" color="#2a9d2f" fw="600">
              Накоплено: {financialGoalRest.totalAmount} {financialGoalRest.currency.code}
            </Text>
          </Group>
        </Flex>
      </UnstyledButton>
    </>
  );
};
