import type { Meta, StoryObj } from '@storybook/react';

import CreditAndDebtEditForm from './CreditAndDebtEditForm';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

const meta = {
  title: 'features/CreditAndDebtEditForm',
  component: CreditAndDebtEditForm,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    StoreDecorator({
      credits: {
        modalInfo: {
          modalIsOpened: true,
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
} satisfies Meta<typeof CreditAndDebtEditForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CreditAndDebtEditFormStory: Story = {};
