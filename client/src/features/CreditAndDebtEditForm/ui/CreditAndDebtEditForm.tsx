import { getCounterpartList, getCounterpart } from '@/entities/Counterpart';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Modal } from '@/shared/ui/Modal';
import { Autocomplete, Button, Group, NumberInput, TextInput, Textarea } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { FC, useEffect, useMemo } from 'react';
import { getCurrency, getCurrencyList } from '@/entities/Currency';
import { useSelector } from 'react-redux';
import {
  Debt,
  createDebt,
  debtActions,
  deleteDebt,
  getDebtModalInfo,
  updateDebt,
} from '@/entities/Debt';
import {
  Credit,
  createCredit,
  creditActions,
  deleteCredit,
  getCreditModalInfo,
  updateCredit,
} from '@/entities/Credit';
import { CreditAndDebtStatus } from '@/shared/types/CreditAndDebt';

interface CreditAndDebtEditFormProps {}

interface InitValues {
  name: string;
  description: string;
  amount: number;
  startDate: Date;
  dueDate: Date;
  counterpartName: string;
  currencyName: string;
  status: CreditAndDebtStatus;
  totalPayments: number;
}

const isCredit = (data: Debt | Credit): data is Credit => {
  return 'creditor' in data;
};

const isDebt = (data: Debt | Credit): data is Debt => {
  return 'debtor' in data;
};

export const CreditAndDebtEditForm: FC<CreditAndDebtEditFormProps> = () => {
  const dispatch = useAppDispatch();
  const { modalData: creditModalData, modalIsOpened: creditModalIsOpened } =
    useSelector(getCreditModalInfo);
  const { modalData: debtModalData, modalIsOpened: debtModalIsOpened } =
    useSelector(getDebtModalInfo);
  const data = creditModalData || debtModalData;
  const isCreditForm = data && isCredit(data);

  const isDebtForm = data && isDebt(data);
  const counterpartName = isCreditForm ? data?.creditor?.name : data?.debtor?.name;
  const initialValues: InitValues = {
    name: '',
    description: '',
    amount: 0,
    startDate: new Date(),
    dueDate: new Date(),
    counterpartName: '',
    currencyName: '',
    totalPayments: 0,
    status: CreditAndDebtStatus.ACTIVE,
  };
  const creditAndDebtForm = useForm({
    initialValues,
    validate: {},
  });

  const currencyList = useSelector(getCurrencyList);
  const counterpartList = useSelector(getCounterpartList);

  const autocompleteCurrencyOptions = useMemo(
    () =>
      currencyList.map((currency) => ({
        value: currency.name,
        label: currency.name,
      })),
    [currencyList]
  );

  const autocompleteCounterpartOptions = useMemo(
    () =>
      counterpartList.map((counterpart) => ({
        value: counterpart.name,
        label: counterpart.name,
      })),
    [counterpartList]
  );

  const getSelectedCurrency = (currencyName: string) => {
    return currencyList.find((currency) => currency.name === currencyName);
  };

  const getSelectedCounterpart = (counterpartName: string) => {
    return counterpartList.find((counterpart) => counterpart.name === counterpartName);
  };

  const onUpdate = () => {
    const { counterpartName, currencyName, dueDate, startDate, ...rest } = creditAndDebtForm.values;

    const selectedCurrency = getSelectedCurrency(currencyName);
    const selectedCounterpart = getSelectedCounterpart(counterpartName);

    const entityData = {
      id: data?.id!,
      dueDate: dueDate.toISOString(),
      startDate: startDate.toISOString(),
      currencyId: selectedCurrency?.id!,
      ...rest,
    };

    if (creditModalIsOpened) {
      dispatch(
        updateCredit({
          ...entityData,
          creditorId: selectedCounterpart?.id!,
        })
      );
    } else {
      dispatch(
        updateDebt({
          ...entityData,
          debtorId: selectedCounterpart?.id!,
        })
      );
    }
  };

  const onCreate = () => {
    const { counterpartName, currencyName, dueDate, startDate, ...rest } = creditAndDebtForm.values;

    const selectedCurrency = getSelectedCurrency(currencyName);
    const selectedCounterpart = getSelectedCounterpart(counterpartName);

    const entityData = {
      dueDate: dueDate.toISOString(),
      startDate: startDate.toISOString(),
      currencyId: selectedCurrency?.id!,
      ...rest,
    };

    if (creditModalIsOpened) {
      dispatch(
        createCredit({
          ...entityData,
          creditorId: selectedCounterpart?.id!,
        })
      );
    } else {
      dispatch(
        createDebt({
          ...entityData,
          debtorId: selectedCounterpart?.id!,
        })
      );
    }
  };

  const onDelete = () => {
    if (creditModalIsOpened && data) {
      dispatch(deleteCredit(data.id));
    }

    if (debtModalIsOpened && data) {
      dispatch(deleteDebt(data.id));
    }
  };

  const onClose = () => {
    if (creditModalIsOpened) {
      dispatch(creditActions.closeEditModal());
      creditAndDebtForm.reset();
    } else {
      dispatch(debtActions.closeEditModal());
      creditAndDebtForm.reset();
    }
  };

  useEffect(() => {
    dispatch(getCurrency());
    dispatch(getCounterpart());
  }, []);

  useEffect(() => {
    if (data) {
      const values: InitValues = {
        name: data?.name || '',
        description: data?.description || '',
        amount: data?.amount || 0,
        startDate: data?.startDate ? new Date(data.startDate) : new Date(),
        dueDate: data?.dueDate ? new Date(data.dueDate) : new Date(),
        counterpartName: counterpartName || '',
        currencyName: data?.currency?.name || '',
        totalPayments: 0,
        status: CreditAndDebtStatus.ACTIVE,
      };
      creditAndDebtForm.setValues(values);
    }
  }, [data]);

  return (
    <Modal
      title={isCreditForm ? 'Взять в долг' : 'Дать в долг'}
      opened={creditModalIsOpened || debtModalIsOpened}
      onClose={onClose}
    >
      <form onSubmit={creditAndDebtForm.onSubmit(data ? onUpdate : onCreate)}>
        <TextInput
          mt="md"
          placeholder="Название"
          label="Название"
          withAsterisk
          {...creditAndDebtForm.getInputProps('name')}
        />

        <Textarea
          placeholder="Описание"
          label="Описание"
          {...creditAndDebtForm.getInputProps('description')}
        />

        <NumberInput
          mt="md"
          placeholder="Сумма"
          label="Сумма"
          withAsterisk
          {...creditAndDebtForm.getInputProps('amount')}
        />

        <DateTimePicker
          label="Начало"
          placeholder="Выберите дату"
          mx="auto"
          maw={400}
          {...creditAndDebtForm.getInputProps('startDate')}
        />
        <DateTimePicker
          label="Дата возврата"
          placeholder="Выберите дату"
          mx="auto"
          maw={400}
          {...creditAndDebtForm.getInputProps('dueDate')}
        />

        <Autocomplete
          label="Валюта"
          placeholder="Выберите валюту"
          data={autocompleteCurrencyOptions}
          {...creditAndDebtForm.getInputProps('currencyName')}
        />

        <Autocomplete
          label="Контрагент"
          placeholder="Выберите Контрагента"
          data={autocompleteCounterpartOptions}
          {...creditAndDebtForm.getInputProps('counterpartName')}
        />

        <Group position={data ? 'apart' : 'right'} mt="md" align="">
          {data && (
            <Button color="red" onClick={() => onDelete()}>
              Удалить
            </Button>
          )}
          <Button type="submit" color="indigo">
            Сохранить
          </Button>
        </Group>
      </form>
    </Modal>
  );
};
