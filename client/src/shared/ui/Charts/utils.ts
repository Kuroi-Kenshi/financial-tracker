import { Expense } from '@/entities/Expense';
import { Income } from '@/entities/Income';
import { DoughnutDataSet } from './DoughnutChart/DoughnutChart';
import { BarChartDataSet } from './BarChart/BarChart';
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
  entities: (Income | Expense)[],
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

const getObjectProperty = (path: string, object: Record<string, any>) => {
  const properties = path.split('.').reverse();
  let result = object;
  if (!properties.length) return undefined;

  for (const key of properties) {
    if (result[key]) {
      result = object[key];
    }

    return undefined;
  }

  return result;
};

export const getCategoryDataSet = (
  entities: (Income | Expense)[],
  label: string,
  pathToProperty?: string
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
