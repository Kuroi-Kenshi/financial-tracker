import type { Meta, StoryObj } from '@storybook/react';

import { UnstyledButton } from './UnstyledButton';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

const meta = {
  title: 'ui/UnstyledButton',
  component: UnstyledButton,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [StoreDecorator({})],
} satisfies Meta<typeof UnstyledButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UnstyledButtonStory: Story = {
  args: {
    children: 'UnstyledButton',
  },
};
