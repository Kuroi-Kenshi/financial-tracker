import { FC, useState } from 'react';
import { Button, ColorInput, ColorSwatch, Container, Table, TextInput } from '@mantine/core';
import { useSelector } from 'react-redux';
import { getIncomeCategoryList } from '../../model/selectors/getIncomeCategoryList';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { deleteIncomeCategory } from '../../model/services/deleteIncomeCategory/deleteIncomeCategory';
import { DeletionPopover } from '@/shared/ui/Popover/Popover';
import { createIncomeCategory } from '../../model/services/createIncomeCategory/createIncomeCategory';
import { getIncomeCategoryError } from '../../model/selectors/getIncomeCategoryError';

interface IncomeCategoryListProps {}

export const IncomeCategoryList: FC<IncomeCategoryListProps> = () => {
  const dispatch = useAppDispatch();
  const incomeCategoryList = useSelector(getIncomeCategoryList);
  const incomeCategoryError = useSelector(getIncomeCategoryError);
  const [incomeCategoryName, setIncomeCategoryName] = useState('');
  const [incomeCategoryColor, setIncomeCategoryColor] = useState('#fff');

  const onCreateCategory = () => {
    dispatch(createIncomeCategory({ color: incomeCategoryColor, name: incomeCategoryName }));
  };

  const onDelete = (categoryId: number) => {
    dispatch(deleteIncomeCategory(categoryId));
  };

  const rows = incomeCategoryList.map((category) => (
    <tr key={category.id}>
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

  return (
    <Container>
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
        onChange={setIncomeCategoryColor}
      />
      <Button mt="md" color="indigo" onClick={onCreateCategory}>
        Создать
      </Button>
      {incomeCategoryError}
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
