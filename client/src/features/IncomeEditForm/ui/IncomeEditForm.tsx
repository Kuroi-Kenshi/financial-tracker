import {
  CreateIncome,
  UpdateIncome,
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
import { FC, useEffect, useMemo } from 'react';
import { getCurrency, getCurrencyList } from '@/entities/Currency';
import { getIncomeCategory, getIncomeCategoryList } from '@/entities/IncomeCategory';
import { useSelector } from 'react-redux';

interface IncomeEditFormProps {}

interface InitValues {
  name: string;
  description: string;
  amount: number;
  date: Date;
  categoryName: string;
  currencyName: string;
  receipt: File[] | undefined;
}

export const IncomeEditForm: FC<IncomeEditFormProps> = () => {
  const dispatch = useAppDispatch();
  const { modalData, modalIsOpened } = useSelector(getIncomeModalInfo);
  const initialValues: InitValues = {
    name: '',
    description: '',
    amount: 0,
    date: new Date(),
    categoryName: '',
    currencyName: '',
    receipt: undefined,
  };
  const incomeForm = useForm({
    initialValues,
    validate: {},
  });

  const currencyList = useSelector(getCurrencyList);
  const incomeCategoryList = useSelector(getIncomeCategoryList);

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
      incomeCategoryList.map((category) => ({
        value: category.name,
        label: category.name,
      })),
    [incomeCategoryList]
  );

  const getSelectedCurrency = (currencyName: string) => {
    return currencyList.find((currency) => currency.name === currencyName);
  };

  const getSelectedCategory = (categoryName: string) => {
    return incomeCategoryList.find((category) => category.name === categoryName);
  };

  const onUpdate = () => {
    const { currencyName, categoryName, date, ...rest } = incomeForm.values;

    const selectedCurrency = getSelectedCurrency(currencyName);
    const selectedCategory = getSelectedCategory(categoryName);
    const expenseData: UpdateIncome = {
      ...rest,
      id: modalData?.id!,
      date: date.toISOString(),
      currencyId: Number(selectedCurrency?.id),
      categoryId: Number(selectedCategory?.id),
    };
    dispatch(updateIncome(expenseData));
    onClose();
  };

  const onCreate = () => {
    const { currencyName, categoryName, date, ...rest } = incomeForm.values;

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

  const onDelete = () => {
    if (modalData?.id) {
      dispatch(deleteIncome(modalData.id));
    }
  };

  const onClose = () => {
    dispatch(incomeActions.closeEditModal());
    incomeForm.reset();
  };

  useEffect(() => {
    dispatch(getCurrency());
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
        currencyName: modalData?.currency.name || '',
        receipt: undefined,
      };
      incomeForm.setValues(values);
    }
  }, [modalData]);

  return (
    <Modal title="Добавление дохода" opened={modalIsOpened} onClose={onClose}>
      <form onSubmit={incomeForm.onSubmit(modalData ? onUpdate : onCreate)}>
        <TextInput
          mt="md"
          placeholder="Название"
          label="Название"
          withAsterisk
          {...incomeForm.getInputProps('name')}
        />

        <Textarea
          placeholder="Описание"
          label="Описание"
          {...incomeForm.getInputProps('description')}
        />

        <NumberInput
          mt="md"
          placeholder="Сумма"
          label="Сумма"
          withAsterisk
          {...incomeForm.getInputProps('amount')}
        />

        <DateTimePicker
          label="Выберите дату"
          placeholder="Выберите дату"
          mx="auto"
          maw={400}
          {...incomeForm.getInputProps('date')}
        />

        <Autocomplete
          label="Валюта"
          placeholder="Выберите валюту"
          data={autocompleteCurrencyOptions}
          {...incomeForm.getInputProps('currencyName')}
        />

        <Autocomplete
          label="Категория"
          placeholder="Выберите категорию"
          data={autocompleteIncomeCategoryOptions}
          {...incomeForm.getInputProps('categoryName')}
        />

        <Group position={modalData ? 'apart' : 'right'} mt="md" align="">
          {modalData && (
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
