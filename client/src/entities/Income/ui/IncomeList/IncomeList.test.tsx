import { screen } from '@testing-library/react';
import { IncomeList } from './IncomeList';
import { componentRender } from '@/shared/libs/tests/componentRender';
import { incomeActions } from '../../model/slice/incomeSlice';
import userEvent from '@testing-library/user-event';
import { type Dispatch } from '@reduxjs/toolkit';

describe('IncomeList tests', () => {
  const dispatch: Dispatch = jest.fn();
  const data = [
    {
      id: 1,
      name: 'Зарплата',
      description: '',
      amount: 10000,
      date: '2023-07-12T19:00:09.728Z',
      categoryIncome: {
        id: 1,
        name: 'Зарплата',
        color: '#4CAF50',
      },
      currency: {
        id: 4,
        code: 'RUB',
        name: 'Russian Ruble',
        symbol: '₽',
      },
    },
    {
      id: 2,
      name: 'Подарок',
      description: '',
      amount: 10000,
      date: '2023-06-12T19:00:09.728Z',
      categoryIncome: {
        id: 2,
        name: 'Подарки',
        color: '#9C27B0',
      },
      currency: {
        id: 4,
        code: 'RUB',
        name: 'Russian Ruble',
        symbol: '₽',
      },
    },
  ];
  test('render list', () => {
    componentRender(<IncomeList />, {
      initialState: {
        incomes: {
          data,
          modalInfo: {
            modalData: null,
            modalIsOpened: false,
          },
        },
      },
    });

    expect(screen.queryByTestId('IncomeList')).toBeInTheDocument();
  });

  test('render list items', () => {
    componentRender(<IncomeList />, {
      initialState: {
        incomes: {
          data,
          modalInfo: {
            modalData: null,
            modalIsOpened: false,
          },
        },
      },
    });

    const items = screen.getAllByTestId('IncomeListItem');
    expect(items.length).toBe(2);
  });

  test('open edit modal', async () => {
    componentRender(<IncomeList />, {
      initialState: {
        incomes: {
          data,
          modalInfo: {
            modalData: null,
            modalIsOpened: false,
          },
        },
      },
    });

    const openModalBtn = screen.getByTestId('openModalBtn');

    await userEvent.click(openModalBtn);

    expect(screen.getByTestId('IncomeEditModal')).toBeInTheDocument();
    // expect(dispatch).toHaveBeenCalledWith(incomeActions.openEditModal(null));
  });
});
