import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './Modal';
import { componentRender } from '@/shared/libs/tests/componentRender';

describe('Modal', () => {
  test('shows modal when opened is true', () => {
    componentRender(
      <Modal opened onClose={() => {}} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    );
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  test('does not show modal when opened is false', () => {
    componentRender(
      <Modal opened={false} onClose={() => {}} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    );
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  // test('calls onClose when the modal is closed', async () => {
  //   const handleClose = jest.fn();
  //   // const { container } = componentRender(
  //   componentRender(
  //     <Modal opened onClose={handleClose} title="Test Modal">
  //       <p>Modal Content</p>
  //     </Modal>
  //   );
  //   // const overlay = container.getElementsByClassName('mantine-Overlay-root');
  //   // await userEvent.keyboard('ESC')
  //   // await userEvent.click(overlay[0]);
  //   expect(handleClose).toHaveBeenCalled();
  // });
});
