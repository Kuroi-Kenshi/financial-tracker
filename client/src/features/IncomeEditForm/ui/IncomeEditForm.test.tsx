import { screen } from '@testing-library/react';
import { IncomeEditForm } from './IncomeEditForm';
import { componentRender } from '@/shared/libs/tests/componentRender';
import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from '@/shared/types/StateSchema';
import userEvent from '@testing-library/user-event';
import { Income } from '@/entities/Income';

window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

describe('IncomeEditForm', () => {
  it('should render IncomeEditForm', () => {
    const initialState: DeepPartial<StateSchema> = {
      incomes: {
        modalInfo: {
          modalIsOpened: true,
          modalData: null,
        },
      },
      currencies: {
        data: [],
      },
      incomeCategories: {
        data: [],
      },
    };

    componentRender(<IncomeEditForm />, { initialState });

    expect(screen.getByText('Добавление дохода')).toBeInTheDocument();
  });
  test('fills form with income data', () => {
    const incomeData: Income = {
      id: 2,
      name: 'Подарок',
      description: 'Income description',
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
    };

    const initialState: DeepPartial<StateSchema> = {
      incomes: {
        modalInfo: {
          modalIsOpened: true,
          modalData: incomeData,
        },
      },
      currencies: {
        data: [],
      },
      incomeCategories: {
        data: [],
      },
    };

    componentRender(<IncomeEditForm />, { initialState });

    expect(screen.getByTestId('IncomeName')).toHaveAttribute('value', 'Подарок');
    expect(screen.getByText('Income description')).toBeInTheDocument();
    expect(screen.getByTestId('IncomeAmount')).toHaveAttribute('value', '10000');
    expect(screen.getByText('12/06/2023 22:00')).toBeInTheDocument();
    expect(screen.getByTestId('IncomeCurrency')).toHaveAttribute('value', 'RUB');
    expect(screen.getByTestId('IncomeCategory')).toHaveAttribute('value', 'Подарки');
  });

  test('fills form with income data and change category', async () => {
    const incomeData: Income = {
      id: 2,
      name: 'Подарок',
      description: 'Income description',
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
    };

    const initialState: DeepPartial<StateSchema> = {
      incomes: {
        modalInfo: {
          modalIsOpened: true,
          modalData: incomeData,
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
            id: 4,
            code: 'RUB',
            name: 'Russian Ruble',
            symbol: '₽',
          },
          {
            id: 5,
            code: 'GBP',
            name: 'British Pound',
            symbol: '£',
          },
        ],
      },
      incomeCategories: {
        data: [
          {
            id: 1,
            name: 'Зарплата',
            color: '#FF5733',
          },
          {
            id: 2,
            name: 'Подарки',
            color: '#FFC300',
          },
        ],
      },
    };

    componentRender(<IncomeEditForm />, { initialState });
    const categoryInput = screen.getByPlaceholderText('Выберите категорию');
    await userEvent.clear(categoryInput);
    await userEvent.click(categoryInput);

    expect(screen.getByText('Зарплата')).toBeInTheDocument();
  }, 15000);
});
