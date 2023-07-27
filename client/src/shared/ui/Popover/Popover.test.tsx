import { screen } from '@testing-library/react';
import { DeletionPopover } from './Popover';
import userEvent from '@testing-library/user-event';
import { componentRender } from '@/shared/libs/tests/componentRender';

describe('Popover tests', () => {
  const text = "Вы действительно хотите удалить категорию 'Еда'?";
  test('renders the text prop', () => {
    componentRender(<DeletionPopover text={text} />);
    expect(screen.getByTestId('DeletionPopover')).toBeInTheDocument();
  });

  test('open popover when the button is clicked', async () => {
    componentRender(<DeletionPopover text={text} />);
    const deleteButton = screen.getByTestId('DeletionPopover');
    await userEvent.click(deleteButton);

    expect(screen.getByTestId('DeletionPopover')).toHaveAttribute('aria-expanded', 'true');
  });

  test('popover closed when the cancel button is clicked', async () => {
    componentRender(<DeletionPopover text={text} />);

    const deleteButton = screen.getByTestId('DeletionPopover');
    await userEvent.click(deleteButton);

    const cancelButton = screen.getByText('Отмена');
    await userEvent.click(cancelButton);

    expect(screen.getByTestId('DeletionPopover')).toHaveAttribute('aria-expanded', 'false');
  });

  test('calls callbackApprove function when yes button is clicked', async () => {
    const mockCallback = jest.fn();
    componentRender(<DeletionPopover text={text} callbackApprove={mockCallback} />);

    const deleteButton = screen.getByTestId('DeletionPopover');
    await userEvent.click(deleteButton);

    const yesButton = screen.getByText('Да');
    await userEvent.click(yesButton);
    expect(mockCallback).toHaveBeenCalled();
  });
});
