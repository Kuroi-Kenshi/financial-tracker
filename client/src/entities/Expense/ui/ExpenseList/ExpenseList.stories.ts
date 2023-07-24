import type { Meta, StoryObj } from '@storybook/react';

import { ExpenseList } from './ExpenseList';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ExpenseReqType } from '../../model/types/expenseSchema';

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
  title: 'entities/ExpenseList',
  component: ExpenseList,
  parameters: {
    // layout: 'fullscreen',
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
    }),
  ],
} satisfies Meta<typeof ExpenseList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExpenseListStory: Story = {
  args: {
    mode: ExpenseReqType.NORMAL,
    withAddButton: true,
  },
};

export const LastExpenseListStory: Story = {
  args: {
    mode: ExpenseReqType.LAST_EXPENSES,
    styles: { minWidth: '250px', maxWidth: '300px' },
  },
};
