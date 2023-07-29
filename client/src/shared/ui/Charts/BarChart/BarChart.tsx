'use client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { type FC } from 'react';
import { Bar } from 'react-chartjs-2';

interface BarChartOptions {
  label: string;
  data: number[];
  backgroundColor: string;
}

export interface BarChartDataSet {
  labels: string[];
  datasets: BarChartOptions[];
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Options',
    },
  },
};

interface BarChartProps {
  dataset: BarChartDataSet;
}

export const BarChart: FC<BarChartProps> = ({ dataset }) => {
  return <Bar options={options} data={dataset} />;
};
