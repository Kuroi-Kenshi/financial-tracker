import { type FC } from 'react';
import { Flex, Text } from '@mantine/core';
import { UnstyledButton } from '@/shared/ui/UnstyledButton';
import { Debt } from '../../model/types/debtSchema';
import { debtActions } from '../../model/slice/debtSlice';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';

interface DebtListItemProps extends Debt {
  icon: React.ReactNode;
  color: string;
}

export const DebtListItem: FC<DebtListItemProps> = ({ icon, color, ...debtRest }) => {
  const dispatch = useAppDispatch();
  const formattedStartDate = new Intl.DateTimeFormat('ru-RU', {}).format(
    new Date(debtRest.startDate)
  );
  const formattedDueDate = new Intl.DateTimeFormat('ru-RU', {}).format(new Date(debtRest.dueDate));

  const openModal = () => {
    dispatch(debtActions.openEditModal(debtRest));
  };

  return (
    <>
      <UnstyledButton onClick={openModal}>
        <Flex gap="12px">
          <div
            style={{
              width: '10px',
              height: '43px',
            }}
          />
          <Flex justify="space-between" direction="row" align="center" maw="300px" miw="250px">
            <div>
              <Text size="sm">{debtRest.name}</Text>
              <Text size="sm">
                {formattedStartDate} - {formattedDueDate}
              </Text>
            </div>
            <Text size="sm" color="#9c423b">
              -{debtRest.amount}
            </Text>
          </Flex>
        </Flex>
      </UnstyledButton>
    </>
  );
};
