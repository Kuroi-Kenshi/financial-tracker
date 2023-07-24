import type { Meta, StoryObj } from '@storybook/react';

import FinancialGoalEditForm from './FinancialGoalEditForm';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

const meta = {
  title: 'features/FinancialGoalEditForm',
  component: FinancialGoalEditForm,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    StoreDecorator({
      financialGoal: {
        modalInfo: {
          modalIsOpened: true,
        },
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
} satisfies Meta<typeof FinancialGoalEditForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FinancialGoalEditFormStory: Story = {};
