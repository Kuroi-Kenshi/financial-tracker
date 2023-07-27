import {
  CreateExpense,
  UpdateExpense,
  createExpense,
  deleteExpense,
  expenseActions,
  getExpenseError,
  getExpenseIsLoading,
  getExpenseModalInfo,
  updateExpense,
} from '@/entities/Expense';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { Modal } from '@/shared/ui/Modal';
import {
  Autocomplete,
  Button,
  Group,
  NumberInput,
  TextInput,
  Textarea,
  FileInput,
  Notification,
  LoadingOverlay,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { FC, useEffect } from 'react';
import { getCurrency, getCurrencyList } from '@/entities/Currency';
import { getExpenseCategoryList } from '@/entities/ExpenseCategory';
import { useSelector } from 'react-redux';

interface ExpenseEditFormProps {}

interface InitValues {
  name: string;
  description: string;
  amount: number;
  date: Date;
  categoryName: string;
  currencyCode: string;
  receipt: File[] | undefined;
}

export const ExpenseEditForm: FC<ExpenseEditFormProps> = () => {
  const dispatch = useAppDispatch();
  const { modalData, modalIsOpened } = useSelector(getExpenseModalInfo);
  const error = useSelector(getExpenseError);
  const isLoading = useSelector(getExpenseIsLoading);

  const initialValues: InitValues = {
    name: '',
    description: '',
    amount: 0,
    date: new Date(),
    categoryName: '',
    currencyCode: '',
    receipt: undefined,
  };

  const expenseForm = useForm({
    initialValues,
    validate: {},
  });

  const currencyList = useSelector(getCurrencyList);
  const expenseCategoryList = useSelector(getExpenseCategoryList);

  const autocompleteCurrencyOptions = currencyList.map((currency) => ({
    value: currency.code,
    label: currency.code,
  }));

  const autocompleteExpenseCategoryOptions = expenseCategoryList.map((category) => ({
    value: category.name,
    label: category.name,
  }));

  const getSelectedCurrency = (currencyCode: string) => {
    return currencyList.find((currency) => currency.code === currencyCode);
  };

  const getSelectedCategory = (categoryName: string) => {
    return expenseCategoryList.find((category) => category.name === categoryName);
  };

  const onUpdate = () => {
    const { categoryName, currencyCode, date, ...rest } = expenseForm.values;

    const selectedCurrency = getSelectedCurrency(currencyCode);
    const selectedCategory = getSelectedCategory(categoryName);
    const expenseData: UpdateExpense = {
      ...rest,
      id: modalData?.id!,
      date: date.toISOString(),
      currencyId: Number(selectedCurrency?.id),
      categoryId: Number(selectedCategory?.id),
    };
    dispatch(updateExpense(expenseData));
  };

  const onCreate = () => {
    const { currencyCode, categoryName, date, ...rest } = expenseForm.values;

    const selectedCurrency = getSelectedCurrency(currencyCode);
    const selectedCategory = getSelectedCategory(categoryName);
    const expenseData: CreateExpense = {
      ...rest,
      date: date.toISOString(),
      currencyId: Number(selectedCurrency?.id),
      categoryId: Number(selectedCategory?.id),
    };
    dispatch(createExpense(expenseData));
  };

  const onDelete = () => {
    if (modalData?.id) {
      dispatch(deleteExpense(modalData.id));
    }
  };

  const onUploadFile = (files: File[]) => {};

  const onClose = () => {
    dispatch(expenseActions.closeEditModal());
    expenseForm.reset();
  };

  useEffect(() => {
    dispatch(getCurrency());
  }, []);

  useEffect(() => {
    if (modalData) {
      const values: InitValues = {
        name: modalData?.name,
        description: modalData?.description,
        amount: modalData?.amount,
        date: new Date(modalData.date),
        categoryName: modalData?.categoryExpense?.name,
        currencyCode: modalData?.currency?.code,
        receipt: undefined,
      };
      expenseForm.setValues(values);
    }
  }, [modalData]);

  return (
    <Modal title="Добавление расхода" opened={modalIsOpened} onClose={onClose}>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <form
        onSubmit={expenseForm.onSubmit(modalData ? onUpdate : onCreate)}
        data-testid="expenseEditModal"
      >
        <TextInput
          mt="md"
          placeholder="Название"
          label="Название"
          withAsterisk
          data-testid="ExpenseName"
          {...expenseForm.getInputProps('name')}
        />

        <Textarea
          placeholder="Описание"
          label="Описание"
          data-testid="ExpenseDescription"
          {...expenseForm.getInputProps('description')}
        />

        <NumberInput
          mt="md"
          placeholder="Сумма"
          label="Сумма"
          withAsterisk
          data-testid="ExpenseAmount"
          {...expenseForm.getInputProps('amount')}
        />

        <DateTimePicker
          label="Выберите дату"
          placeholder="Выберите дату"
          mx="auto"
          maw={400}
          data-testid="ExpenseDate"
          {...expenseForm.getInputProps('date')}
        />

        <Autocomplete
          label="Валюта"
          placeholder="Выберите валюту"
          data={autocompleteCurrencyOptions}
          data-testid="ExpenseCurrency"
          {...expenseForm.getInputProps('currencyCode')}
        />

        <Autocomplete
          label="Категория"
          placeholder="Выберите категорию"
          data={autocompleteExpenseCategoryOptions}
          data-testid="ExpenseCategory"
          {...expenseForm.getInputProps('categoryName')}
        />

        <FileInput
          placeholder="Загрузите чек"
          label="Платежная квитанция"
          multiple
          onChange={onUploadFile}
          value={expenseForm.values.receipt}
        />

        {error ? (
          <Notification
            mt="lg"
            color="red"
            title="Ошибка сохранения"
            onClose={() => dispatch(expenseActions.setExpenseError(undefined))}
          >
            {error}
          </Notification>
        ) : (
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
        )}
      </form>
    </Modal>
  );
};
