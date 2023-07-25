import type { Meta, StoryObj } from '@storybook/react';

import FinancialGoalsPage from './FinancialGoalsPage';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

const meta = {
  title: 'pages/FinancialGoalsPage',
  component: FinancialGoalsPage,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    StoreDecorator({
      financialGoal: {
        data: [
          {
            id: 1,
            name: 'Покупка машины',
            description: 'Коплю денег на покупку Audi RS7',
            deadline: '2023-07-12T19:00:09.714Z',
            amount: 12000000,
            totalAmount: 6000000,
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
    }),
  ],
} satisfies Meta<typeof FinancialGoalsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FinancialGoalsPageStory: Story = {};
