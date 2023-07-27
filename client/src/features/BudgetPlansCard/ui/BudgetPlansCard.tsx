import { ExpenseCategoryBudgetList } from '@/entities/ExpenseCategory';
import { Card, Flex, Title } from '@mantine/core';
import { type FC } from 'react';

interface BudgetPlansCardProps {
  styles?: React.CSSProperties;
}

export const BudgetPlansCard: FC<BudgetPlansCardProps> = ({ styles }) => {
  return (
    <Card style={styles} maw="300px">
      <Flex direction="column" gap="5px">
        <Title align="center" order={3}>
          Бюджет
        </Title>
        <ExpenseCategoryBudgetList />
      </Flex>
    </Card>
  );
};
