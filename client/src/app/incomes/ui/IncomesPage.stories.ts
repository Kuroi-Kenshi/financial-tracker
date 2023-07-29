import type { Meta, StoryObj } from '@storybook/react';

import IncomesPage from './IncomesPage';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

const meta = {
  title: 'pages/IncomesPage',
  component: IncomesPage,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    StoreDecorator({
      incomes: {
        data: [
          {
            id: 1,
            name: 'Зарплата',
            description: '',
            amount: 10000,
            date: '2023-07-12T19:00:09.728Z',
            categoryIncome: {
              id: 1,
              name: 'Зарплата',
              color: '#4CAF50',
            },
            currency: {
              id: 4,
              code: 'RUB',
              name: 'Russian Ruble',
              symbol: '₽',
            },
          },
          {
            id: 2,
            name: 'Подарок',
            description: '',
            amount: 10000,
            date: '2023-06-12T19:00:09.728Z',
            categoryIncome: {
              id: 2,
              name: 'Подарки',
              color: '#9C27B0',
            },
            currency: {
              id: 4,
              code: 'RUB',
              name: 'Russian Ruble',
              symbol: '₽',
            },
          },
        ],
        modalInfo: {},
      },
      incomeCategories: {
        data: [
          {
            id: 10,
            name: 'test',
            color: '#fff',
          },
          {
            id: 1,
            name: 'Зарплата',
            color: '#4CAF50',
          },
          {
            id: 2,
            name: 'Подарки',
            color: '#9C27B0',
          },
        ],
      },
    }),
  ],
} satisfies Meta<typeof IncomesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IncomesPageStory: Story = {};
