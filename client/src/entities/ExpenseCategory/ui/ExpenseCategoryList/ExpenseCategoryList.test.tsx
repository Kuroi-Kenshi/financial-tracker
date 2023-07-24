import { screen } from '@testing-library/react';
import { ExpenseCategoryList } from './ExpenseCategoryList';
import { componentRender } from '@/shared/libs/tests/componentRender';
import userEvent from '@testing-library/user-event';

describe('ExpenseCategoryList tests', () => {
  test('render list', () => {
    componentRender(<ExpenseCategoryList />, {
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
    const items = screen.getAllByTestId('ExpenseCategoryListItem');
    expect(items.length).toBe(1);
  });
});

describe('ExpenseCategoryList form validation', () => {
  test('render list', async () => {
    componentRender(<ExpenseCategoryList />);

    await userEvent.click(screen.getByTestId('submitButton'));
    const nameValidationError = await screen.findByText('Название не должно быть пустым');
    const limitValidationError = await screen.findByText('Введите числовое значение больше нуля');
    const colorValidationError = await screen.findByText('Выберите цвет категории');

    expect(nameValidationError).toBeInTheDocument();
    expect(limitValidationError).toBeInTheDocument();
    expect(colorValidationError).toBeInTheDocument();
  });
});
