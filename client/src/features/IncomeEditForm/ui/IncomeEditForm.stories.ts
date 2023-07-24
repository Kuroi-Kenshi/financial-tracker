import type { Meta, StoryObj } from '@storybook/react';

import IncomeEditForm from './IncomeEditForm';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

const meta = {
  title: 'features/IncomeEditForm',
  component: IncomeEditForm,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    StoreDecorator({
      incomes: {
        modalInfo: {
          modalIsOpened: true,
        },
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
} satisfies Meta<typeof IncomeEditForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IncomeEditFormStory: Story = {};
