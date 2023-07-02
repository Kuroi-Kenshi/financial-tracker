import { FC, useState } from 'react';
import {
  Flex,
  Group,
  ThemeIcon,
  Text,
  Loader,
  ColorSwatch,
  ColorInput,
  TextInput,
  Table,
  Button,
} from '@mantine/core';
import { useSelector } from 'react-redux';
import { getExpenseCategoryList } from '../../model/selectors/getExpenseCategoryList';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch';
import { createExpenseCategory } from '../../model/services/createExpenseCategory/createExpenseCategory';

interface ExpenseCategoryListProps {}

export const ExpenseCategoryList: FC<ExpenseCategoryListProps> = () => {
  const dispatch = useAppDispatch();
  const expenseCategoryList = useSelector(getExpenseCategoryList);
  const [expenseCategoryName, setExpenseCategoryName] = useState('');
  const [expenseCategoryColor, setExpenseCategoryColor] = useState('');

  const rows = expenseCategoryList.map((category) => (
    <tr key={category.id}>
      <td>{category.name}</td>
      <td>
        <ColorSwatch color={category.color} />
      </td>
    </tr>
  ));

  const onCreateCategory = () => {
    dispatch(createExpenseCategory({ color: expenseCategoryColor, name: expenseCategoryName }));
  };

  return (
    <>
      <TextInput
        label="Название категории"
        value={expenseCategoryName}
        onChange={(e) => setExpenseCategoryName(e.target.value)}
      />
      <ColorInput
        mt="sm"
        placeholder="Выберите цвет"
        label="Выберите цвет категории"
        value={expenseCategoryColor}
        defaultValue="#ffffff"
        onChange={setExpenseCategoryColor}
      />
      <Button mt="md" color="indigo" onClick={onCreateCategory}>
        Создать
      </Button>
      <Table mt="lg">
        <thead>
          <tr>
            <th>Название</th>
            <th>Цвет</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
};
