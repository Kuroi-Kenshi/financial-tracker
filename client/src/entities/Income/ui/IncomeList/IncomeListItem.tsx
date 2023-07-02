import { Suspense, type FC, useState } from 'react';
import cls from './IncomeListItem.module.scss';
import { Flex, Group, ThemeIcon, Text, Loader } from '@mantine/core';
import { UnstyledButton } from '@/shared/ui/UnstyledButton';
import { IncomeEditForm } from '@/features/IncomeEditForm';
import { Income } from '../../model/types/incomeSchema';

interface IncomeListItemProps extends Income {
  icon: React.ReactNode;
  color: string;
}

export const IncomeListItem: FC<IncomeListItemProps> = ({ icon, color, ...incomeRest }) => {
  const [editModalOpened, setEditModalOpened] = useState(false);
  const formattedDate = new Intl.DateTimeFormat('ru-RU', {}).format(new Date(incomeRest.date));

  return (
    <>
      <UnstyledButton onClick={() => setEditModalOpened(true)}>
        <Group>
          <div
            style={{
              width: '10px',
              height: '43px',
              backgroundColor: incomeRest.categoryIncome.color,
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
              <Text size="sm">{incomeRest.name}</Text>
              <Text size="sm">{formattedDate}</Text>
            </div>
            <Text size="sm" color="#2a9d2f" fw="600">
              +{incomeRest.amount}
            </Text>
          </Flex>
        </Group>
      </UnstyledButton>
      <Suspense fallback={<Loader />}>
        <IncomeEditForm
          opened={editModalOpened}
          setOpened={() => setEditModalOpened(true)}
          onClose={() => setEditModalOpened(false)}
          data={incomeRest}
        />
      </Suspense>
    </>
  );
};
