import { FC } from 'react';
import { ColorSwatch, Table } from '@mantine/core';
import { useSelector } from 'react-redux';
import { getIncomeCategoryList } from '../../model/selectors/getIncomeCategoryList';

interface IncomeCategoryListProps {}

export const IncomeCategoryList: FC<IncomeCategoryListProps> = () => {
  const incomeCategoryList = useSelector(getIncomeCategoryList);

  const rows = incomeCategoryList.map((category) => (
    <tr key={category.id}>
      <td>{category.name}</td>
      <td>
        <ColorSwatch color={category.color} />
      </td>
    </tr>
  ));

  return (
    <>
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
