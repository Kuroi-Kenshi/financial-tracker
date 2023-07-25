import type { Meta, StoryObj } from '@storybook/react';

import CreditAndDebtPage from './CreditAndDebtPage';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { CreditAndDebtStatus } from '@/shared/types/CreditAndDebt';

const meta = {
  title: 'pages/CreditAndDebtPage',
  component: CreditAndDebtPage,
  parameters: {
    layout: 'fullscreen',
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
      debts: {
        data: [
          {
            id: 3,
            name: 'test',
            description: 'tset',
            amount: 333,
            startDate: '2023-07-17T18:58:28.212Z',
            dueDate: '2023-07-17T18:58:28.212Z',
            status: CreditAndDebtStatus.ACTIVE,
            totalPayments: 0,
            currency: {
              id: 4,
              code: 'RUB',
              name: 'Russian Ruble',
              symbol: '₽',
            },
            debtor: {
              id: 2,
              name: 'Джон Смит',
              description: 'В долг на 1 месяц',
            },
          },
        ],
        modalInfo: {
          modalData: null,
          modalIsOpened: false,
        },
      },
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
} satisfies Meta<typeof CreditAndDebtPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CreditAndDebtPageStory: Story = {};
