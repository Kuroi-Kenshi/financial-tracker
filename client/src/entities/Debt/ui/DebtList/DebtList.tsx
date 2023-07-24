import { memo, type FC, Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getDebts } from '../../model/selectors/getDebt';
import { DebtListItem } from './DebtListItem';
import { IconCashBanknoteOff } from '@tabler/icons-react';
import { Button, Flex, Group, Loader, Title } from '@mantine/core';
import { CreditAndDebtEditForm } from '@/features/CreditAndDebtEditForm';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { getDebt } from '../../model/services/getDebt/getDebt';
import { debtActions } from '../../model/slice/debtSlice';
import { Debt } from '../../model/types/debtSchema';

export const DebtList: FC = memo(() => {
  const dispatch = useAppDispatch();
  const debts = useSelector(getDebts);

  useEffect(() => {
    dispatch(getDebt());
  }, []);

  const list = debts.map((debt) => {
    return <DebtListItem key={debt.id} color="grape" icon={<IconCashBanknoteOff />} {...debt} />;
  });

  const openModal = (data: Debt | undefined) => {
    dispatch(debtActions.openEditModal(data || null));
  };

  return (
    <div>
      <Title order={2}>Debts</Title>
      <Group mt="20px">
        <Button color="indigo" onClick={() => openModal(undefined)}>
          Дать в долг
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
