import type { Meta, StoryObj } from '@storybook/react';

import { DoughnutChart } from './DoughnutChart';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

const meta = {
  title: 'ui/DoughnutChart',
  component: DoughnutChart,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [StoreDecorator({})],
} satisfies Meta<typeof DoughnutChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DoughnutChartStory: Story = {
  args: {
    dataset: {
      labels: ['June', 'July', 'August', 'September'],
      datasets: [
        {
          label: 'Расходы',
          data: [1, 2, 3, 4],
          backgroundColor: ['#faf', '#faa', '#fae', '#fac'],
        },
      ],
    },
  },
};
