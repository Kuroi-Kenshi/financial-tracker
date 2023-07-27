import { screen } from '@testing-library/react';
import { IncomeCategoryList } from './IncomeCategoryList';
import { componentRender } from '@/shared/libs/tests/componentRender';
import userEvent from '@testing-library/user-event';

describe('IncomeCategoryList tests', () => {
  test('render list', () => {
    componentRender(<IncomeCategoryList />, {
      initialState: {
        incomeCategories: {
          data: [
            {
              id: 1,
              name: 'Подарки',
            },
          ],
        },
      },
    });
    const items = screen.getAllByTestId('IncomeCategoryListItem');
    expect(items.length).toBe(1);
  });

  test('render deletion popup', async () => {
    componentRender(<IncomeCategoryList />, {
      initialState: {
        incomeCategories: {
          data: [
            {
              id: 1,
              name: 'Подарки',
            },
          ],
        },
      },
    });

    await userEvent.click(screen.getByTestId('DeletionPopover'));

    expect(
      screen.getByText('Вы действительно хотите удалить категорию "Подарки"?')
    ).toBeInTheDocument();
  });

  test('IncomeCategoryList form validatio', async () => {
    componentRender(<IncomeCategoryList />);

    await userEvent.click(screen.getByTestId('submitButton'));
    const nameValidationError = await screen.findByText('Название не должно быть пустым');
    const colorValidationError = await screen.findByText('Выберите цвет категории');

    expect(nameValidationError).toBeInTheDocument();
    expect(colorValidationError).toBeInTheDocument();
  });
});
