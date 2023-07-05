import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

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

export const BarChart = ({
  dataset,
  datasets,
  label,
  dataTest,
}: {
  dataset: Array<{ month: string; total: number }>;
  label: string;
  datasets?: any[];
  dataTest?: any;
}) => {
  const data = {
    labels: dataset.map((data) => data.month),
    datasets: datasets || [
      {
        label,
        data: dataset.map((data) => data.total),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  //@ts-ignore
  return <Bar options={options} data={dataTest || data} />;
};
