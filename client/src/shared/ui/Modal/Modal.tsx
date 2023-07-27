import { Modal as MantineModal, Portal } from '@mantine/core';
import { type FC } from 'react';

interface ModalProps {
  opened: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: FC<ModalProps> = ({ opened, onClose, title, children }) => {
  return (
    <Portal>
      <MantineModal
        opened={opened}
        onClose={onClose}
        title={title}
        closeOnEscape
        closeOnClickOutside
      >
        {children}
      </MantineModal>
    </Portal>
  );
};
