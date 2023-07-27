import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Modal } from '@/shared/ui/Modal';
import { Autocomplete, Button, Group, NumberInput, TextInput, Textarea } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { type FC, useEffect, useMemo } from 'react';
import { getCurrency, getCurrencyList } from '@/entities/Currency';
import { useSelector } from 'react-redux';
import {
  createFinancialGoal,
  deleteFinancialGoal,
  financialGoalActions,
  getFinancialGoalModalInfo,
  updateFinancialGoal,
} from '@/entities/FinancialGoals';

interface InitValues {
  name: string;
  description: string;
  amount: number;
  deadline: Date;
  currencyName: string;
  totalAmount: number;
}

export const FinancialGoalEditForm: FC = () => {
  const dispatch = useAppDispatch();
  const { modalData, modalIsOpened } = useSelector(getFinancialGoalModalInfo);
  const initialValues: InitValues = {
    name: '',
    description: '',
    amount: 0,
    deadline: new Date(),
    currencyName: '',
    totalAmount: 0,
  };
  const financialGoalForm = useForm({
    initialValues,
    validate: {},
  });

  const currencyList = useSelector(getCurrencyList);

  const autocompleteCurrencyOptions = useMemo(
    () =>
      currencyList.map((currency) => ({
        value: currency.name,
        label: currency.name,
      })),
    [currencyList]
  );

  const getSelectedCurrency = (currencyName: string) => {
    return currencyList.find((currency) => currency.name === currencyName);
  };

  const onUpdate = () => {
    const { currencyName, deadline, ...rest } = financialGoalForm.values;

    const selectedCurrency = getSelectedCurrency(currencyName);

    const entityData = {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
      id: modalData?.id!,
      deadline: deadline.toISOString(),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
      currencyId: selectedCurrency?.id!,
      ...rest,
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(updateFinancialGoal(entityData));
  };

  const onCreate = () => {
    const { currencyName, deadline, ...rest } = financialGoalForm.values;

    const selectedCurrency = getSelectedCurrency(currencyName);

    const entityData = {
      deadline: deadline.toISOString(),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
      currencyId: selectedCurrency?.id!,
      ...rest,
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(createFinancialGoal(entityData));
  };

  const onDelete = () => {
    if (modalData?.id) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      dispatch(deleteFinancialGoal(modalData.id));
    }
  };

  const onClose = () => {
    dispatch(financialGoalActions.closeEditModal());
    financialGoalForm.reset();
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(getCurrency());
  }, []);

  useEffect(() => {
    if (modalData) {
      const values: InitValues = {
        name: modalData?.name || '',
        description: modalData?.description || '',
        amount: modalData?.amount || 0,
        deadline: modalData?.deadline ? new Date(modalData.deadline) : new Date(),
        currencyName: modalData?.currency?.name || '',
        totalAmount: modalData?.totalAmount || 0,
      };
      financialGoalForm.setValues(values);
    }
  }, [modalData]);

  return (
    <Modal
      title={modalData ? 'Редактирование цели' : 'Добавление цели'}
      opened={modalIsOpened}
      onClose={onClose}
    >
      <form onSubmit={financialGoalForm.onSubmit(modalData ? onUpdate : onCreate)}>
        <TextInput
          mt="md"
          placeholder="Название"
          label="Название"
          withAsterisk
          {...financialGoalForm.getInputProps('name')}
        />

        <Textarea
          placeholder="Описание"
          label="Описание"
          {...financialGoalForm.getInputProps('description')}
        />

        <NumberInput
          mt="md"
          placeholder="Сумма"
          label="Сумма"
          withAsterisk
          {...financialGoalForm.getInputProps('amount')}
        />

        <NumberInput
          mt="md"
          placeholder="Сколько накоплено"
          label="Сколько накоплено"
          withAsterisk
          {...financialGoalForm.getInputProps('totalAmount')}
        />

        <DateTimePicker
          label="Дедлайн"
          placeholder="Выберите дату"
          mx="auto"
          maw={400}
          {...financialGoalForm.getInputProps('deadline')}
        />

        <Autocomplete
          label="Валюта"
          placeholder="Выберите валюту"
          data={autocompleteCurrencyOptions}
          {...financialGoalForm.getInputProps('currencyName')}
        />

        <Group position={modalData ? 'apart' : 'right'} mt="md" align="">
          {modalData && (
            <Button
              color="red"
              onClick={() => {
                onDelete();
              }}
            >
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
