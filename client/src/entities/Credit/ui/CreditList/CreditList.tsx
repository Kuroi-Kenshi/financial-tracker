import { memo, type FC, Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getCredits } from '../../model/selectors/getCredits';
import { CreditListItem } from './CreditListItem';
import { IconCashBanknoteOff } from '@tabler/icons-react';
import { Button, Flex, Group, Loader, Title } from '@mantine/core';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { getCredit } from '../../model/services/getCredit/getCredit';
import { CreditAndDebtEditForm } from '@/features/CreditAndDebtEditForm';
import { creditActions } from '../../model/slice/creditSlice';
import { Credit } from '../../model/types/creditSchema';

export const CreditList: FC = memo(() => {
  const dispatch = useAppDispatch();
  const credits = useSelector(getCredits);

  useEffect(() => {
    dispatch(getCredit());
  }, []);

  const list = credits.map((credit) => {
    return (
      <>
        <CreditListItem key={credit.id} icon={<IconCashBanknoteOff />} {...credit} />
      </>
    );
  });

  const openModal = (data: Credit | undefined) => {
    dispatch(creditActions.openEditModal(data || null));
  };

  return (
    <div>
      <Title order={2}>Credits</Title>
      <Group mt="20px">
        <Button color="indigo" onClick={() => openModal(undefined)}>
          Взять в долг
        </Button>
      </Group>
      <Flex direction="column" mt="20px" ml="0" pl="0">
        {list}
        <Suspense fallback={<Loader />}>
          <CreditAndDebtEditForm />
        </Suspense>
      </Flex>
    </div>
  );
});
