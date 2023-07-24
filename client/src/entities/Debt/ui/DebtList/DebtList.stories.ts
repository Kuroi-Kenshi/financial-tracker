import type { Meta, StoryObj } from '@storybook/react';

import { DebtList } from './DebtList';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { CreditAndDebtStatus } from '@/shared/types/CreditAndDebt';

const meta = {
  title: 'entities/DebtList',
  component: DebtList,
  parameters: {
    // layout: 'fullscreen',
  },
  decorators: [
    StoreDecorator({
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
    }),
  ],
} satisfies Meta<typeof DebtList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DebtListStory: Story = {};
