import { type Expense } from '@/entities/Expense';
import { type Income } from '@/entities/Income';
import { type DoughnutDataSet } from './DoughnutChart/DoughnutChart';
import { type BarChartDataSet } from './BarChart/BarChart';
import { getDayNumber, getMonthName } from '@/shared/libs/utils/date/date';

interface DataSet {
  months: string[];
  expenses: number[];
}

export enum ChartType {
  DAY = 'DAY',
  MONTH = 'MONTH',
}

const generateDataSet = (data: Record<string, number>) => {
  return Object.entries(data).reduce(
    (data: DataSet, [month, totalAmount]) => {
      data.months.push(month);
      data.expenses.push(totalAmount);

      return data;
    },
    { months: [], expenses: [] }
  );
};

export function getBarChartDataSet(
  entities: Array<Income | Expense>,
  label: string,
  chartType: ChartType
): BarChartDataSet {
  const monthsAmount = entities.reduce(
    (monthsAmount: Record<string, number>, entity: Income | Expense) => {
      let selector = '';
      if (chartType === ChartType.DAY) {
        selector = getDayNumber(new Date(entity.date));
      }
      if (chartType === ChartType.MONTH) {
        selector = getMonthName(new Date(entity.date));
      }

      monthsAmount[selector] = (monthsAmount[selector] || 0) + entity.amount;
      return monthsAmount;
    },
    {}
  );

  const dataSet = generateDataSet(monthsAmount);

  return {
    labels: dataSet.months,
    datasets: [
      {
        label,
        data: dataSet.expenses,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
}

const isExpense = (entity: any): entity is Expense => {
  return 'categoryExpense' in entity;
};

const getCategoryName = (entity: Expense | Income): string => {
  if (isExpense(entity)) {
    return entity.categoryExpense?.name;
  }
  return entity.categoryIncome?.name;
};

export const getCategoryDataSet = (
  entities: Array<Income | Expense>,
  label: string
): DoughnutDataSet => {
  const categoryExpenses = entities.reduce(
    (acc: Record<string, number>, entity: Income | Expense) => {
      const categoryName = getCategoryName(entity);
      if (categoryName && acc[categoryName]) {
        acc[categoryName] = entity.amount + acc[categoryName] || 0;
      } else if (categoryName) {
        acc[categoryName] = entity.amount;
      }
      return acc;
    },
    {}
  );

  const categoryDataSet = generateDataSet(categoryExpenses);

  return {
    labels: categoryDataSet.months,
    datasets: [
      {
        label,
        data: categoryDataSet.expenses,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
};
