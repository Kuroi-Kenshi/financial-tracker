import {
  type CreateIncome,
  type UpdateIncome,
  createIncome,
  deleteIncome,
  getIncomeModalInfo,
  incomeActions,
  updateIncome,
} from '@/entities/Income';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Modal } from '@/shared/ui/Modal';
import { Autocomplete, Button, Group, NumberInput, TextInput, Textarea } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { type FC, useEffect } from 'react';
import { getCurrency, getCurrencyList } from '@/entities/Currency';
import { getIncomeCategory, getIncomeCategoryList } from '@/entities/IncomeCategory';
import { useSelector } from 'react-redux';

interface InitValues {
  name: string;
  description: string;
  amount: number;
  date: Date;
  categoryName: string;
  currencyCode: string;
  receipt: File[] | undefined;
}

export const IncomeEditForm: FC = () => {
  const dispatch = useAppDispatch();
  const { modalData, modalIsOpened } = useSelector(getIncomeModalInfo);
  const initialValues: InitValues = {
    name: '',
    description: '',
    amount: 0,
    date: new Date(),
    categoryName: '',
    currencyCode: '',
    receipt: undefined,
  };
  const incomeForm = useForm({
    initialValues,
    validate: {},
  });

  const currencyList = useSelector(getCurrencyList);
  const incomeCategoryList = useSelector(getIncomeCategoryList);

  const autocompleteCurrencyOptions = currencyList.map((currency) => ({
    value: currency.code,
    label: currency.code,
  }));

  const autocompleteIncomeCategoryOptions = incomeCategoryList.map((category) => ({
    value: category.name,
    label: category.name,
  }));

  const getSelectedCurrency = (currencyCode: string) => {
    return currencyList.find((currency) => currency.code === currencyCode);
  };

  const getSelectedCategory = (categoryName: string) => {
    return incomeCategoryList.find((category) => category.name === categoryName);
  };

  const onUpdate = () => {
    const { currencyCode, categoryName, date, ...rest } = incomeForm.values;

    const selectedCurrency = getSelectedCurrency(currencyCode);
    const selectedCategory = getSelectedCategory(categoryName);
    const expenseData: UpdateIncome = {
      ...rest,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
      id: modalData?.id!,
      date: date.toISOString(),
      currencyId: Number(selectedCurrency?.id),
      categoryId: Number(selectedCategory?.id),
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(updateIncome(expenseData));
    onClose();
  };

  const onCreate = () => {
    const { currencyCode, categoryName, date, ...rest } = incomeForm.values;

    const selectedCurrency = getSelectedCurrency(currencyCode);
    const selectedCategory = getSelectedCategory(categoryName);
    const expenseData: CreateIncome = {
      ...rest,
      date: date.toISOString(),
      currencyId: Number(selectedCurrency?.id),
      categoryId: Number(selectedCategory?.id),
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(createIncome(expenseData));
  };

  const onDelete = () => {
    if (modalData?.id) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      dispatch(deleteIncome(modalData.id));
    }
  };

  const onClose = () => {
    dispatch(incomeActions.closeEditModal());
    incomeForm.reset();
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(getCurrency());
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(getIncomeCategory());
  }, []);

  useEffect(() => {
    if (modalData) {
      const values: InitValues = {
        name: modalData?.name || '',
        description: modalData?.description || '',
        amount: modalData?.amount || 0,
        date: modalData?.date ? new Date(modalData.date) : new Date(),
        categoryName: modalData?.categoryIncome.name || '',
        currencyCode: modalData?.currency.code || '',
        receipt: undefined,
      };
      incomeForm.setValues(values);
    }
  }, [modalData]);

  return (
    <Modal title="Добавление дохода" opened={modalIsOpened} onClose={onClose}>
      <form
        onSubmit={incomeForm.onSubmit(modalData ? onUpdate : onCreate)}
        data-testid="IncomeEditModal"
      >
        <TextInput
          mt="md"
          placeholder="Название"
          label="Название"
          withAsterisk
          data-testid="IncomeName"
          {...incomeForm.getInputProps('name')}
        />

        <Textarea
          placeholder="Описание"
          label="Описание"
          data-testid="IncomeDescription"
          {...incomeForm.getInputProps('description')}
        />

        <NumberInput
          mt="md"
          placeholder="Сумма"
          label="Сумма"
          withAsterisk
          data-testid="IncomeAmount"
          {...incomeForm.getInputProps('amount')}
        />

        <DateTimePicker
          label="Выберите дату"
          placeholder="Выберите дату"
          mx="auto"
          maw={400}
          data-testid="IncomeDate"
          {...incomeForm.getInputProps('date')}
        />

        <Autocomplete
          label="Валюта"
          placeholder="Выберите валюту"
          data={autocompleteCurrencyOptions}
          data-testid="IncomeCurrency"
          {...incomeForm.getInputProps('currencyCode')}
        />

        <Autocomplete
          label="Категория"
          placeholder="Выберите категорию"
          data={autocompleteIncomeCategoryOptions}
          data-testid="IncomeCategory"
          {...incomeForm.getInputProps('categoryName')}
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
