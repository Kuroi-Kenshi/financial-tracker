import { Suspense, type FC, useState } from 'react';
import cls from './ExpenseListItem.module.scss';
import { Flex, Group, ThemeIcon, Text, Loader } from '@mantine/core';
import { UnstyledButton } from '@/shared/ui/UnstyledButton';
import { ExpenseEditForm } from '@/features/ExpenseEditForm';
import { Expense } from '../../model/types/expenseSchema';

interface ExpenseListItemProps extends Expense {
  icon: React.ReactNode;
  color: string;
}

export const ExpenseListItem: FC<ExpenseListItemProps> = ({ icon, color, ...expenseRest }) => {
  const [editModalOpened, setEditModalOpened] = useState(false);
  const formattedDate = new Intl.DateTimeFormat('ru-RU', {}).format(new Date(expenseRest.date));

  return (
    <>
      <UnstyledButton onClick={() => setEditModalOpened(true)}>
        <Group>
          <div
            style={{
              width: '10px',
              height: '43px',
              backgroundColor: expenseRest.categoryExpense.color,
            }}
          ></div>
          {/* <ThemeIcon color={color} variant="light">
            {icon}
          </ThemeIcon> */}
          <Flex
            // gap="xs"
            justify="space-between"
            direction="row"
            align="center"
            maw="500px"
            miw="500px"
          >
            <div>
              <Text size="sm">{expenseRest.name}</Text>
              <Text size="sm">{formattedDate}</Text>
            </div>
            <Text size="sm" color="#9c423b">
              -{expenseRest.amount}
            </Text>
          </Flex>
        </Group>
      </UnstyledButton>
      <Suspense fallback={<Loader />}>
        <ExpenseEditForm
          opened={editModalOpened}
          setOpened={() => setEditModalOpened(true)}
          onClose={() => setEditModalOpened(false)}
          data={expenseRest}
        />
      </Suspense>
    </>
  );
};
