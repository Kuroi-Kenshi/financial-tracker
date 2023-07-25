import { FC, useState } from 'react';
import { TextInput, Table, Button, Textarea, Container } from '@mantine/core';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { getCounterpartList } from '../model/selectors/getCounterpartList';
import { createCounterpart } from '../model/services/createCounterpart/createCounterpart';
import { DeletionPopover } from '@/shared/ui/Popover/Popover';
import { deleteCounterpart } from '../model/services/deleteCounterpart/deleteCounterpart';

interface CounterpartListProps {}

export const CounterpartList: FC<CounterpartListProps> = () => {
  const dispatch = useAppDispatch();
  const counterpartList = useSelector(getCounterpartList);
  const [counterpartName, setCounterpartName] = useState('');
  const [counterpartDescription, setCounterpartColor] = useState('');

  const onDelete = (categoryId: number) => {
    dispatch(deleteCounterpart(categoryId));
  };

  const rows = counterpartList.map((counterpart) => (
    <tr key={counterpart.id} data-testid="CounterpartListItem">
      <td>{counterpart.name}</td>
      <td>{counterpart.description}</td>
      <td>
        <DeletionPopover
          text={`Вы действительно хотите удалить контрагента "${counterpart.name}"?`}
          callbackApprove={() => onDelete(counterpart.id)}
        />
      </td>
    </tr>
  ));

  const onCreateCounterpart = () => {
    dispatch(createCounterpart({ description: counterpartDescription, name: counterpartName }));
  };

  return (
    <Container maw="500px">
      <TextInput
        label="Название категории"
        value={counterpartName}
        onChange={(e) => setCounterpartName(e.target.value)}
      />
      <Textarea
        mt="sm"
        placeholder="Описание контрагента"
        label="Описание контрагента"
        value={counterpartDescription}
        onChange={(e) => setCounterpartColor(e.target?.value)}
      />
      <Button mt="md" color="indigo" onClick={onCreateCounterpart}>
        Создать
      </Button>
      <Table mt="lg">
        <thead>
          <tr>
            <th>Название</th>
            <th>Описание</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Container>
  );
};
