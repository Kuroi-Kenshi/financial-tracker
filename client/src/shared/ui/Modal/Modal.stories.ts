import type { Meta, StoryObj } from '@storybook/react';

import { Modal } from './Modal';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

const meta = {
  title: 'ui/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [StoreDecorator({})],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ModalStory: Story = {
  args: {
    children: 'Children',
    opened: true,
    title: 'Modal',
  },
};
