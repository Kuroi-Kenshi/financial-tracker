import type { Meta, StoryObj } from '@storybook/react';

import { CounterpartList } from './CounterpartList';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

const meta = {
  title: 'entities/CounterpartList',
  component: CounterpartList,
  parameters: {
    // layout: 'fullscreen',
  },
  decorators: [
    StoreDecorator({
      counterpart: {
        data: [
          {
            id: 1,
            name: 'Альфа-банк',
            description: 'Кредит',
          },
          {
            id: 2,
            name: 'Джон Смит',
            description: 'В долг на 1 месяц',
          },
        ],
      },
    }),
  ],
} satisfies Meta<typeof CounterpartList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CounterpartListStory: Story = {};
