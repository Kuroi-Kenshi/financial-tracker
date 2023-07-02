import { Modal as MantineModal, Portal } from '@mantine/core';
import { FC } from 'react';

interface ModalProps {
  opened: boolean;
  setOpened: (flag: boolean) => void;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: FC<ModalProps> = ({ opened, setOpened, onClose, title, children }) => {
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
