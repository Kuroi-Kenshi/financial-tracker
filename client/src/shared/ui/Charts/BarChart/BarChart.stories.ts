import type { Meta, StoryObj } from '@storybook/react';

import { BarChart } from './BarChart';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

const meta = {
  title: 'ui/BarChart',
  component: BarChart,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [StoreDecorator({})],
} satisfies Meta<typeof BarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BarChartStory: Story = {
  args: {
    dataset: {
      labels: ['June', 'July', 'August', 'September'],
      datasets: [
        {
          label: 'Расходы',
          data: [1, 2, 3, 4],
          backgroundColor: '#faf',
        },
      ],
    },
  },
};
