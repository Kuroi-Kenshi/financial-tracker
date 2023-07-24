import type { Meta, StoryObj } from '@storybook/react';

import ExpensesPage from './ExpensesPage';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

const mockExpenseData = [
  {
    id: 2,
    name: 'Бензин',
    description: '',
    amount: 1000,
    date: '2023-07-12T19:00:09.731Z',
    categoryExpense: {
      id: 2,
      name: 'Транспорт',
      color: '#FFC300',
    },
    receipt: [],
    currency: {
      id: 4,
      code: 'RUB',
      name: 'Russian Ruble',
      symbol: '₽',
    },
  },
  {
    id: 8,
    name: 'Корм для котов',
    description: '',
    amount: 250,
    date: '2023-07-05T15:57:36.317Z',
    categoryExpense: {
      id: 4,
      name: 'Домашние животные',
      color: '#FF00FF',
    },
    receipt: [],
    currency: {
      id: 4,
      code: 'RUB',
      name: 'Russian Ruble',
      symbol: '₽',
    },
  },
  {
    id: 7,
    name: 'Футболка',
    description: '',
    amount: 2350,
    date: '2023-07-03T15:57:36.317Z',
    categoryExpense: {
      id: 3,
      name: 'Одежда',
      color: '#FF1493',
    },
    receipt: [],
    currency: {
      id: 4,
      code: 'RUB',
      name: 'Russian Ruble',
      symbol: '₽',
    },
  },
];

const meta = {
  title: 'pages/ExpensesPage',
  component: ExpensesPage,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    StoreDecorator({
      expenses: {
        data: {
          filtered: mockExpenseData,
          last: mockExpenseData,
        },
        modalInfo: {},
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
    }),
  ],
} satisfies Meta<typeof ExpensesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExpensesPageStory: Story = {};
