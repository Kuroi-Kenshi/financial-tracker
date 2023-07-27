import { screen } from '@testing-library/react';
import { ExpenseEditForm } from './ExpenseEditForm';
import { componentRender } from '@/shared/libs/tests/componentRender';
import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from '@/shared/types/StateSchema';
import userEvent from '@testing-library/user-event';
import { Expense } from '@/entities/Expense';

window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

describe('ExpenseEditForm', () => {
  it('should render ExpenseEditForm', () => {
    const initialState: DeepPartial<StateSchema> = {
      expenses: {
        modalInfo: {
          modalIsOpened: true,
          modalData: null,
        },
      },
      currencies: {
        data: [],
      },
      expenseCategories: {
        data: [],
      },
    };

    componentRender(<ExpenseEditForm />, { initialState });

    expect(screen.getByText('Добавление расхода')).toBeInTheDocument();
  });

  test('fills form with expense data', () => {
    const expenseData: Expense = {
      id: 1,
      name: 'Обед',
      description: 'Expense description',
      amount: 100,
      date: '2023-07-26T19:00:00.731Z',
      currency: { id: 2, code: 'EUR', name: 'Euro', symbol: '€' },
      categoryExpense: {
        id: 1,
        name: 'Еда',
        limitPerMonth: 20000,
        color: '#FF5733',
        totalExpense: 360,
      },
    };

    const initialState: DeepPartial<StateSchema> = {
      expenses: {
        modalInfo: {
          modalIsOpened: true,
          modalData: expenseData,
        },
      },
      currencies: {
        data: [],
      },
      expenseCategories: {
        data: [],
      },
    };

    componentRender(<ExpenseEditForm />, { initialState });

    expect(screen.getByTestId('ExpenseName')).toHaveAttribute('value', 'Обед');
    expect(screen.getByText('Expense description')).toBeInTheDocument();
    expect(screen.getByTestId('ExpenseAmount')).toHaveAttribute('value', '100');
    expect(screen.getByText('26/07/2023 22:00')).toBeInTheDocument();
    expect(screen.getByTestId('ExpenseCurrency')).toHaveAttribute('value', 'EUR');
    expect(screen.getByTestId('ExpenseCategory')).toHaveAttribute('value', 'Еда');
  });

  test('fills form with expense data and change category', async () => {
    const expenseData: Expense = {
      id: 1,
      name: 'Обед',
      description: 'Expense description',
      amount: 100,
      date: '2023-07-26T19:00:00.731Z',
      currency: { id: 2, code: 'EUR', name: 'Euro', symbol: '€' },
      categoryExpense: {
        id: 1,
        name: 'Еда',
        limitPerMonth: 20000,
        color: '#FF5733',
        totalExpense: 360,
      },
    };

    const initialState: DeepPartial<StateSchema> = {
      expenses: {
        modalInfo: {
          modalIsOpened: true,
          modalData: expenseData,
        },
      },
      currencies: {
        data: [
          {
            id: 2,
            code: 'EUR',
            name: 'Euro',
            symbol: '€',
          },
          {
            id: 5,
            code: 'GBP',
            name: 'British Pound',
            symbol: '£',
          },
        ],
      },
      expenseCategories: {
        data: [
          {
            id: 1,
            name: 'Еда',
            limitPerMonth: 20000,
            color: '#FF5733',
            totalExpense: 360,
          },
          {
            id: 2,
            name: 'Транспорт',
            limitPerMonth: 2000,
            color: '#FFC300',
            totalExpense: 666,
          },
        ],
      },
    };

    componentRender(<ExpenseEditForm />, { initialState });
    const categoryInput = screen.getByPlaceholderText('Выберите категорию');
    await userEvent.clear(categoryInput);
    await userEvent.click(categoryInput);

    expect(screen.getByText('Транспорт')).toBeInTheDocument();
  }, 15000);
});
