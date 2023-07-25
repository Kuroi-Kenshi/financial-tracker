import type { Meta, StoryObj } from '@storybook/react';

import { ExpenseCategoryList } from './ExpenseCategoryList';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

const meta = {
  title: 'entities/ExpenseCategoryList',
  component: ExpenseCategoryList,
  parameters: {
    // layout: 'fullscreen',
  },
  decorators: [
    StoreDecorator({
      expenseCategories: {
        data: [
          {
            id: 1,
            name: 'Еда',
            limitPerMonth: 20000,
            color: '#FF5733',
            totalExpense: 360,
          },
          {
            id: 2,
            name: 'Транспорт',
            limitPerMonth: 2000,
            color: '#FFC300',
            totalExpense: 1666,
          },
          {
            id: 3,
            name: 'Одежда',
            limitPerMonth: 10000,
            color: '#FF1493',
            totalExpense: 3900,
          },
          {
            id: 8,
            name: 'Кафе/Ретораны',
            limitPerMonth: 15000,
            color: '#ffef00',
            totalExpense: 0,
          },
        ],
      },
    }),
  ],
} satisfies Meta<typeof ExpenseCategoryList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExpenseCategoryListStory: Story = {};
