import { screen } from '@testing-library/react';
import { ExpenseList } from './ExpenseList';
import { componentRender } from '@/shared/libs/tests/componentRender';
import userEvent from '@testing-library/user-event';
import { ExpenseReqType } from '../../model/types/expenseSchema';

describe('ExpenseList tests', () => {
  const data = [
    {
      id: 12,
      name: 'test',
      description: '',
      amount: 1,
      date: '2023-07-22T18:38:45.608Z',
      categoryExpense: {
        id: 1,
        name: 'Еда',
        color: '#FFC300',
      },
      receipt: [],
      currency: {
        id: 4,
        code: 'RUB',
        name: 'Russian Ruble',
        symbol: '₽',
      },
    },
    {
      id: 2,
      name: 'Бензин',
      description: '',
      amount: 1000,
      date: '2023-07-12T19:00:09.731Z',
      categoryExpense: {
        id: 2,
        name: 'Транспорт',
        color: '#FFC300',
      },
      receipt: [
        {
          fileName: 'receipt2.jpg',
          filePath: '/static/uploads/receipts/receipt2.jpg',
        },
      ],
      currency: {
        id: 4,
        code: 'RUB',
        name: 'Russian Ruble',
        symbol: '₽',
      },
    },
  ];
  test('render list', () => {
    componentRender(<ExpenseList mode={ExpenseReqType.NORMAL} />, {
      initialState: {
        expenses: {
          data: {
            filtered: data,
          },
          modalInfo: {
            modalData: null,
            modalIsOpened: false,
          },
        },
      },
    });

    expect(screen.queryByTestId('ExpenseList')).toBeInTheDocument();
  });

  test('render list items', () => {
    componentRender(<ExpenseList mode={ExpenseReqType.NORMAL} />, {
      initialState: {
        expenses: {
          data: {
            filtered: data,
          },
          modalInfo: {
            modalData: null,
            modalIsOpened: false,
          },
        },
      },
    });

    const items = screen.getAllByTestId('ExpenseListItem');
    expect(items.length).toBe(2);
  });

  test('render list items with add button', () => {
    componentRender(<ExpenseList mode={ExpenseReqType.NORMAL} withAddButton />);

    expect(screen.getByTestId('expenseAddButton')).toBeInTheDocument();
  });

  test('open edit modal', async () => {
    componentRender(<ExpenseList mode={ExpenseReqType.NORMAL} withAddButton />);

    await userEvent.click(screen.getByTestId('expenseAddButton'));

    expect(screen.getByTestId('expenseEditModal')).toBeInTheDocument();
  });
});
