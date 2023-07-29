import type { Meta, StoryObj } from '@storybook/react';

import { NotFoundPage } from './NotFoundPage';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

const meta = {
  title: 'pages/NotFoundPage',
  component: NotFoundPage,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [StoreDecorator({})],
} satisfies Meta<typeof NotFoundPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotFoundPageStory: Story = {};
