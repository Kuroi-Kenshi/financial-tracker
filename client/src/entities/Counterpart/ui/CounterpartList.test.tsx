import { screen } from '@testing-library/react';
import { CounterpartList } from './CounterpartList';
import { componentRender } from '@/shared/libs/tests/componentRender';

describe('CounterpartList tests', () => {
  test('default button', () => {
    componentRender(<CounterpartList />, {
      initialState: {
        counterpart: {
          data: [
            {
              id: 1,
              name: 'Банк',
              description: 'Counterpart test',
            },
          ],
        },
      },
    });
    const items = screen.getAllByTestId('CounterpartListItem');
    expect(items.length).toBe(1);
  });
});
