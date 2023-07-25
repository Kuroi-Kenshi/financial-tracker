import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { FC } from 'react';
import { Doughnut } from 'react-chartjs-2';

interface DoughnutChartOptions {
  label: string;
  data: number[];
  backgroundColor: string[];
  borderColor?: string[];
  borderWidth?: number;
}

export interface DoughnutDataSet {
  labels: string[];
  datasets: DoughnutChartOptions[];
}

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  dataset: DoughnutDataSet;
}

export const DoughnutChart: FC<DoughnutChartProps> = ({ dataset }) => {
  return <Doughnut data={dataset} />;
};
