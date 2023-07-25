import type { Meta, StoryObj } from '@storybook/react';

import { AuthForm } from './AuthForm';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

const meta = {
  title: 'features/AuthForm',
  component: AuthForm,
  parameters: {
    // layout: 'fullscreen',
  },
  decorators: [StoreDecorator({})],
} satisfies Meta<typeof AuthForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AuthFormStory: Story = {};
