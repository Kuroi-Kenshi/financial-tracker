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
      text: 'Expenses',
    },
  },
};

export const BarChart = ({
  dataset,
}: {
  dataset: Array<{ month: string; totalExpense: number }>;
}) => {
  const data = {
    labels: dataset.map((data) => data.month),
    datasets: [
      {
        label: 'Траты за месяц',
        data: dataset.map((data) => data.totalExpense),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return <Bar options={options} data={data} />;
};
