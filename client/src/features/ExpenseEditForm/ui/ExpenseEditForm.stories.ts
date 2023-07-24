import type { Meta, StoryObj } from '@storybook/react';

import ExpenseEditForm from './ExpenseEditForm';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

const meta = {
  title: 'features/ExpenseEditForm',
  component: ExpenseEditForm,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    StoreDecorator({
      expenses: {
        modalInfo: {
          modalIsOpened: true,
        },
      },
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
      currencies: {
        data: [
          {
            id: 2,
            code: 'EUR',
            name: 'Euro',
            symbol: '€',
          },
          {
            id: 5,
            code: 'GBP',
            name: 'British Pound',
            symbol: '£',
          },
          {
            id: 3,
            code: 'JPY',
            name: 'Japanese Yen',
            symbol: '¥',
          },
          {
            id: 4,
            code: 'RUB',
            name: 'Russian Ruble',
            symbol: '₽',
          },
          {
            id: 1,
            code: 'USD',
            name: 'US Dollar',
            symbol: '$',
          },
        ],
      },
    }),
  ],
} satisfies Meta<typeof ExpenseEditForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExpenseEditFormStory: Story = {};
