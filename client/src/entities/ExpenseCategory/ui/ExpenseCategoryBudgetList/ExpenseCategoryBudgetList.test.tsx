import { screen } from '@testing-library/react';
import { ExpenseCategoryBudgetList } from './ExpenseCategoryBudgetList';
import { componentRender } from '@/shared/libs/tests/componentRender';
import userEvent from '@testing-library/user-event';
import { getExpensePercentOfCategory } from './ExpenseCategoryBudgetListItem';

describe('ExpenseCategoryBudgetList tests', () => {
  test('render list', () => {
    componentRender(<ExpenseCategoryBudgetList />, {
      initialState: {
        expenseCategories: {
          data: [
            {
              id: 1,
              limitPerMonth: 10000,
              name: 'Продукты',
            },
          ],
        },
      },
    });
    const items = screen.getAllByTestId('ExpenseCategoryBudgetListItem');
    expect(items.length).toBe(1);
  });

  test('render without items', () => {
    componentRender(<ExpenseCategoryBudgetList />, {
      initialState: {
        expenseCategories: {
          data: [
            {
              id: 1,
              name: 'Продукты',
            },
          ],
        },
      },
    });

    expect(screen.queryByTestId('ExpenseCategoryBudgetListItem')).not.toBeInTheDocument();
  });

  test('test getExpensePercentOfCategory', () => {
    const result = getExpensePercentOfCategory({
      id: 1,
      limitPerMonth: 10000,
      color: '#faf',
      name: 'Продукты',
      totalExpense: 1000,
    });
    expect(result).toBe(10);
  });

  test('test getExpensePercentOfCategory', () => {
    const result = getExpensePercentOfCategory({
      id: 1,
      limitPerMonth: null,
      color: '#faf',
      name: 'Продукты',
      totalExpense: 1000,
    });
    expect(result).toBe(0);
  });
});
