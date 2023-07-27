import { memo, type FC } from 'react';
import { Flex, Text } from '@mantine/core';
import { UnstyledButton } from '@/shared/ui/UnstyledButton';
import { type Credit } from '../../model/types/creditSchema';
import { creditActions } from '../../model/slice/creditSlice';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';

interface CreditListItemProps extends Credit {
  icon: React.ReactNode;
}

// eslint-disable-next-line react/display-name, react/prop-types
export const CreditListItem: FC<CreditListItemProps> = memo(({ icon, ...creditRest }) => {
  const dispatch = useAppDispatch();

  const formattedStartDate = new Intl.DateTimeFormat('ru-RU', {}).format(
    new Date(creditRest.startDate)
  );
  const formattedDueDate = new Intl.DateTimeFormat('ru-RU', {}).format(
    new Date(creditRest.dueDate)
  );

  const openModal = () => {
    dispatch(creditActions.openEditModal(creditRest));
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
              <Text size="sm">{creditRest.name}</Text>
              <Text size="sm">
                {formattedStartDate} - {formattedDueDate}
              </Text>
            </div>
            <Text size="sm" color="#9c423b">
              -{creditRest.amount}
            </Text>
          </Flex>
        </Flex>
      </UnstyledButton>
    </>
  );
});
