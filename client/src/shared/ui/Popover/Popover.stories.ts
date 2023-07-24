import type { Meta, StoryObj } from '@storybook/react';

import { DeletionPopover } from './Popover';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

const meta = {
  title: 'ui/DeletionPopover',
  component: DeletionPopover,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [StoreDecorator({})],
} satisfies Meta<typeof DeletionPopover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DeletionPopoverStory: Story = {
  args: {
    text: 'Вы точно хотите удалить эту сущность?',
    callbackApprove: () => {},
  },
};
