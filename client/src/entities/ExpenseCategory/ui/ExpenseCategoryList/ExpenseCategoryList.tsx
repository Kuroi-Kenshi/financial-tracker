import { FC, useEffect } from 'react';
import {
  ColorSwatch,
  ColorInput,
  TextInput,
  Table,
  Button,
  NumberInput,
  Container,
} from '@mantine/core';
import { useSelector } from 'react-redux';
import { getExpenseCategoryList } from '../../model/selectors/getExpenseCategoryList';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { createExpenseCategory } from '../../model/services/createExpenseCategory/createExpenseCategory';
import { getExpenseCategory } from '../../model/services/getExpenseCategories/getExpenseCategory';
import { DeletionPopover } from '@/shared/ui/Popover/Popover';
import { deleteExpenseCategory } from '../../model/services/deleteExpenseCategory/deleteExpenseCategory';
import { isNotEmpty, useForm } from '@mantine/form';

interface ExpenseCategoryListProps {}

export const ExpenseCategoryList: FC<ExpenseCategoryListProps> = () => {
  const dispatch = useAppDispatch();
  const expenseCategoryList = useSelector(getExpenseCategoryList);

  const expenseCategoryForm = useForm({
    initialValues: {
      expenseCategoryName: '',
      expenseCategoryLimit: 0,
      expenseCategoryColor: '',
    },
    validate: {
      expenseCategoryName: isNotEmpty('Название не должно быть пустым'),
      expenseCategoryLimit: (value) =>
        !value || Number.isNaN(value) ? 'Введите числовое значение больше нуля' : null,
      expenseCategoryColor: isNotEmpty('Выберите цвет категории'),
    },
  });

  const onDelete = (categoryId: number) => {
    dispatch(deleteExpenseCategory(categoryId));
  };

  const rows = expenseCategoryList.map((category) => (
    <tr key={category.id} data-testid="ExpenseCategoryListItem">
      <td>{category.name}</td>
      <td>
        <ColorSwatch color={category.color} />
      </td>
      <td>
        <DeletionPopover
          text={`Вы действительно хотите удалить категорию "${category.name}"?`}
          callbackApprove={() => onDelete(category.id)}
        />
      </td>
    </tr>
  ));

  const onCreateCategory = () => {
    const { expenseCategoryColor, expenseCategoryLimit, expenseCategoryName } =
      expenseCategoryForm.values;

    dispatch(
      createExpenseCategory({
        color: expenseCategoryColor,
        name: expenseCategoryName,
        limitPerMonth: expenseCategoryLimit || null,
      })
    );
  };

  useEffect(() => {
    dispatch(getExpenseCategory());
  }, []);

  return (
    <Container maw="500px">
      <form onSubmit={expenseCategoryForm.onSubmit(onCreateCategory)}>
        <TextInput
          label="Название категории"
          {...expenseCategoryForm.getInputProps('expenseCategoryName')}
        />
        <NumberInput
          label="Лимит на месяц"
          {...expenseCategoryForm.getInputProps('expenseCategoryLimit')}
        />
        <ColorInput
          mt="sm"
          placeholder="Выберите цвет"
          label="Цвет категории"
          {...expenseCategoryForm.getInputProps('expenseCategoryColor')}
        />
        <Button mt="md" color="indigo" type="submit" data-testid="submitButton">
          Создать
        </Button>
      </form>
      <Table mt="lg">
        <thead>
          <tr>
            <th>Название</th>
            <th>Цвет</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Container>
  );
};
