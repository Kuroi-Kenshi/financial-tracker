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
import { getIncomeCategoryList } from '../../model/selectors/getIncomeCategoryList';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch';
import { createIncomeCategory } from '../../model/services/createIncomeCategory/createIncomeCategory';

interface IncomeCategoryListProps {}

export const IncomeCategoryList: FC<IncomeCategoryListProps> = () => {
  const dispatch = useAppDispatch();
  const incomeCategoryList = useSelector(getIncomeCategoryList);
  const [incomeCategoryName, setIncomeCategoryName] = useState('');
  const [incomeCategoryColor, setIncomeCategoryColor] = useState('');

  const rows = incomeCategoryList.map((category) => (
    <tr key={category.id}>
      <td>{category.name}</td>
      <td>
        <ColorSwatch color={category.color} />
      </td>
    </tr>
  ));

  const onCreateCategory = () => {
    dispatch(createIncomeCategory({ color: incomeCategoryColor, name: incomeCategoryName }));
  };

  return (
    <>
      <TextInput
        label="Название категории"
        value={incomeCategoryName}
        onChange={(e) => setIncomeCategoryName(e.target.value)}
      />
      <ColorInput
        mt="sm"
        placeholder="Выберите цвет"
        label="Выберите цвет категории"
        value={incomeCategoryColor}
        defaultValue="#ffffff"
        onChange={setIncomeCategoryColor}
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
