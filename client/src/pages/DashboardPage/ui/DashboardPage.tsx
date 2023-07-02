import { getExpense, getExpenses } from '@/entities/Expense';
import { getIncome, getIncomes } from '@/entities/Income';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch';
import { BarChart } from '@/shared/ui/Charts';
import { Page } from '@/widgets/Page';
import { Card, Flex } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface DataSet {
  month: string;
  total: number;
}

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const expenseList = useSelector(getExpenses);
  const incomeList = useSelector(getIncomes);
  const [expenseDataset, setExpenseDataset] = useState<DataSet[]>([]);
  const [incomeDataset, setIncomeDataset] = useState<DataSet[]>([]);
  // const incomeDataset = [{ month: 'September', total: 10000 }];
  // const expenseDataset = [{ month: 'September', total: 1000 }];

  const datasets = [
    {
      label: 'Доходы',
      data: incomeDataset.map((data) => data.total),
      backgroundColor: '#00ff00',
    },
    {
      label: 'Расходы',
      data: expenseDataset.map((data) => data.total),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ];

  const data = {
    labels: incomeDataset.map((data) => data.month),
    datasets,
  };

  useEffect(() => {
    //@ts-ignore
    const expenseDataSetTemp = expenseList.reduce((acc, obj: Expense) => {
      const monthName = new Intl.DateTimeFormat('ru-RU', { month: 'long' }).format(
        new Date(obj.date)
      ); //@ts-ignore
      if (acc[monthName]) {
        //@ts-ignore
        acc[monthName].push(obj);
      } else {
        //@ts-ignore
        acc[monthName] = [obj];
      }
      return acc;
    }, {});

    const expenseDataSet = Object.entries(expenseDataSetTemp).map(([key, value]) => {
      //@ts-ignore
      const totalExpenseOfMonth = value.reduce((total: number, expense: Expense) => {
        return (total += expense.amount);
      }, 0);

      return {
        month: key,
        total: totalExpenseOfMonth,
      };
    });

    //@ts-ignore
    const incomeDataSetTemp = incomeList.reduce((acc, obj: Income) => {
      const monthName = new Intl.DateTimeFormat('ru-RU', { month: 'long' }).format(
        new Date(obj.date)
      ); //@ts-ignore
      if (acc[monthName]) {
        //@ts-ignore
        acc[monthName].push(obj);
      } else {
        //@ts-ignore
        acc[monthName] = [obj];
      }
      return acc;
    }, {});

    const incomeDataSet = Object.entries(incomeDataSetTemp).map(([key, value]) => {
      //@ts-ignore
      const totalIncomeOfMonth = value.reduce((total: number, income: Income) => {
        return (total += income.amount);
      }, 0);

      return {
        month: key,
        total: totalIncomeOfMonth,
      };
    });

    setIncomeDataset(incomeDataSet);
    setExpenseDataset(expenseDataSet);
  }, [expenseList, incomeList]);

  useEffect(() => {
    dispatch(getExpense());
    dispatch(getIncome());
  }, []);

  return (
    <Page>
      <BarChart dataset={[]} dataTest={data} label="Доходы и расходы" />
      <Flex>
        <Card>Last Expenses</Card>
        <Card>Last Incomes</Card>
        <Card>Highest Expenses</Card>
      </Flex>
    </Page>
  );
};

export default DashboardPage;
