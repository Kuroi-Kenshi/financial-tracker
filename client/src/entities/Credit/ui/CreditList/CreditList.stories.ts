import type { Meta, StoryObj } from '@storybook/react';

import { CreditList } from './CreditList';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { CreditAndDebtStatus } from '@/shared/types/CreditAndDebt';

const meta = {
  title: 'entities/CreditList',
  component: CreditList,
  parameters: {
    // layout: 'fullscreen',
  },
  decorators: [
    StoreDecorator({
      credits: {
        data: [
          {
            id: 1,
            name: 'Долг по кредитной карте',
            description: 'Долг по кредитной карте',
            amount: 5000,
            startDate: '2023-07-12T19:00:09.720Z',
            dueDate: '2023-07-12T19:00:09.720Z',
            status: CreditAndDebtStatus.ACTIVE,
            totalPayments: 0,
            currency: {
              id: 4,
              code: 'RUB',
              name: 'Russian Ruble',
              symbol: '₽',
            },
            creditor: {
              id: 1,
              name: 'Альфа-банк',
              description: 'Кредит',
            },
          },
        ],
        modalInfo: {
          modalData: null,
          modalIsOpened: false,
        },
      },
    }),
  ],
} satisfies Meta<typeof CreditList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CreditListStory: Story = {};
