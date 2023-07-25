import type { Meta, StoryObj } from '@storybook/react';

import { IncomeCategoryList } from './IncomeCategoryList';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

const meta = {
  title: 'entities/IncomeCategoryList',
  component: IncomeCategoryList,
  parameters: {
    // layout: 'fullscreen',
  },
  decorators: [
    StoreDecorator({
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
} satisfies Meta<typeof IncomeCategoryList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IncomeCategoryListStory: Story = {};
