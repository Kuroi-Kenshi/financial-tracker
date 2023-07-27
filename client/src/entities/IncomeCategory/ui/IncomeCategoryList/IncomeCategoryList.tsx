import { FC } from 'react';
import { Button, ColorInput, ColorSwatch, Container, Table, TextInput } from '@mantine/core';
import { useSelector } from 'react-redux';
import { isNotEmpty, useForm } from '@mantine/form';
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

  const incomeCategoryForm = useForm({
    initialValues: {
      incomeCategoryName: '',
      incomeCategoryColor: '',
    },
    validate: {
      incomeCategoryName: isNotEmpty('Название не должно быть пустым'),
      incomeCategoryColor: isNotEmpty('Выберите цвет категории'),
    },
  });

  const onCreateCategory = () => {
    const { incomeCategoryColor, incomeCategoryName } = incomeCategoryForm.values;

    dispatch(createIncomeCategory({ color: incomeCategoryColor, name: incomeCategoryName }));
  };

  const onDelete = (categoryId: number) => {
    dispatch(deleteIncomeCategory(categoryId));
  };

  const rows = incomeCategoryList.map((category) => (
    <tr key={category.id} data-testid="IncomeCategoryListItem">
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
      <form onSubmit={incomeCategoryForm.onSubmit(onCreateCategory)}>
        <TextInput
          label="Название категории"
          {...incomeCategoryForm.getInputProps('incomeCategoryName')}
        />
        <ColorInput
          mt="sm"
          placeholder="Выберите цвет"
          label="Цвет категории"
          {...incomeCategoryForm.getInputProps('incomeCategoryColor')}
        />
        <Button mt="md" color="indigo" type="submit" data-testid="submitButton">
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
      </form>
    </Container>
  );
};
