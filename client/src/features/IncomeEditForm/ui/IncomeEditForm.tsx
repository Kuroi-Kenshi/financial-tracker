import { Income } from '@/entities/Income';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch';
import { Modal } from '@/shared/ui/Modal';
import {
  Autocomplete,
  Button,
  Group,
  NumberInput,
  TextInput,
  Textarea,
  Text,
  FileInput,
} from '@mantine/core';
import { DatePickerInput, DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { FC, useEffect, useMemo } from 'react';
import { UpdateIncome, updateIncome } from '../model/services/updateIncome';
import { CreateIncome, createIncome } from '../model/services/createIncome';
import { getCurrency, getCurrencyList } from '@/entities/Currency';
import { getIncomeCategory, getIncomeCategoryList } from '@/entities/IncomeCategory';
import { useSelector } from 'react-redux';

interface IncomeEditFormProps {
  opened: boolean;
  setOpened: () => void;
  onClose: () => void;
  data?: Income;
}

interface InitValues {
  name: string;
  description: string;
  amount: number;
  date: Date;
  categoryName: string;
  currencyName: string;
  receipt: File[] | undefined;
}

const IncomeEditForm: FC<IncomeEditFormProps> = ({ opened, setOpened, onClose, data }) => {
  const dispatch = useAppDispatch();
  const initialValues: InitValues = {
    name: data?.name || '',
    description: data?.description || '',
    amount: data?.amount || 0,
    date: data?.date ? new Date(data.date) : new Date(),
    categoryName: data?.categoryIncome.name || '',
    currencyName: data?.currency.name || '',
    receipt: undefined,
  };
  const expenseForm = useForm({
    initialValues,
    validate: {},
  });

  const currencyList = useSelector(getCurrencyList);
  const expenseCategoryList = useSelector(getIncomeCategoryList);

  const autocompleteCurrencyOptions = useMemo(
    () =>
      currencyList.map((currency) => ({
        value: currency.name,
        label: currency.name,
      })),
    [currencyList]
  );

  const autocompleteIncomeCategoryOptions = useMemo(
    () =>
      expenseCategoryList.map((category) => ({
        value: category.name,
        label: category.name,
      })),
    [expenseCategoryList]
  );

  const getSelectedCurrency = (currencyName: string) => {
    return currencyList.find((currency) => currency.name === currencyName);
  };

  const getSelectedCategory = (categoryName: string) => {
    return expenseCategoryList.find((category) => category.name === categoryName);
  };

  const onUpdate = () => {
    const { currencyName, categoryName, date, ...rest } = expenseForm.values;

    const selectedCurrency = getSelectedCurrency(currencyName);
    const selectedCategory = getSelectedCategory(categoryName);
    const expenseData: UpdateIncome = {
      ...rest,
      id: data?.id!,
      date: date.toISOString(),
      currencyId: Number(selectedCurrency?.id),
      categoryId: Number(selectedCategory?.id),
    };
    dispatch(updateIncome(expenseData));
  };

  const onCreate = () => {
    const { currencyName, categoryName, date, ...rest } = expenseForm.values;

    const selectedCurrency = getSelectedCurrency(currencyName);
    const selectedCategory = getSelectedCategory(categoryName);
    const expenseData: CreateIncome = {
      ...rest,
      date: date.toISOString(),
      currencyId: Number(selectedCurrency?.id),
      categoryId: Number(selectedCategory?.id),
    };
    dispatch(createIncome(expenseData));
  };

  useEffect(() => {
    dispatch(getCurrency());
    dispatch(getIncomeCategory());
  }, []);
  console.log('expenseForm', expenseForm.values);

  return (
    <Modal title="Добавление прихода" opened={opened} setOpened={setOpened} onClose={onClose}>
      <form onSubmit={expenseForm.onSubmit(data ? onUpdate : onCreate)}>
        <TextInput
          mt="md"
          placeholder="Название"
          label="Название"
          withAsterisk
          {...expenseForm.getInputProps('name')}
        />

        <Textarea
          placeholder="Описание"
          label="Описание"
          {...expenseForm.getInputProps('description')}
        />

        <NumberInput
          mt="md"
          placeholder="Сумма"
          label="Сумма"
          withAsterisk
          {...expenseForm.getInputProps('amount')}
        />

        <DateTimePicker
          label="Pick date"
          placeholder="Pick date"
          mx="auto"
          maw={400}
          {...expenseForm.getInputProps('date')}
        />

        <Autocomplete
          label="Валюта"
          placeholder="Выберите валюту"
          data={autocompleteCurrencyOptions}
          {...expenseForm.getInputProps('currencyName')}
        />

        <Autocomplete
          label="Категория"
          placeholder="Выберите категорию"
          data={autocompleteIncomeCategoryOptions}
          {...expenseForm.getInputProps('categoryName')}
        />

        <Group position="right" mt="md">
          <Button type="submit" color="indigo">
            Готово
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default IncomeEditForm;
