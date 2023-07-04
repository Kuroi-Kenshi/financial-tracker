import { getExpense, getExpenses } from '@/entities/Expense';
import { getIncome, getIncomes } from '@/entities/Income';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch';
import { BarChart } from '@/shared/ui/Charts';
import { Page } from '@/widgets/Page';
import { Button, Card, Flex, Group, SegmentedControl, Tabs } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconMessageCircle, IconPhoto, IconSettings } from '@tabler/icons-react';
import dayjs from 'dayjs';
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
  const currentDate = dayjs();
  const firstDayOfPreviousMonth = currentDate.subtract(1, 'month').startOf('month');
  const lastDayOfPreviousMonth = currentDate.subtract(1, 'month').endOf('month');
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    firstDayOfPreviousMonth.toDate(),
    lastDayOfPreviousMonth.toDate(),
  ]);

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
  console.log('datasets', datasets);

  const data = {
    labels: expenseDataset.map((data) => data.month),
    datasets,
  };
  console.log('data', data);
  useEffect(() => {
    //@ts-ignore
    const expenseDataSetTemp = expenseList.reduce((acc, obj: Expense) => {
      const monthName = new Intl.DateTimeFormat('ru-RU', { month: 'long' }).format(
        new Date(obj.date)
      );

      //@ts-ignore
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
    console.log('expenseDataSet', expenseDataSet);
    //@ts-ignore
    const incomeDataSetTemp = incomeList.reduce((acc, obj: Income) => {
      const monthName = new Intl.DateTimeFormat('ru-RU', { month: 'long' }).format(
        new Date(obj.date)
      );

      //@ts-ignore
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

  const getData = () => {
    const queryObj = {
      dateFrom: dateRange[0]!.toISOString(),
      dateTo: dateRange[1]!.toISOString(),
    };

    dispatch(getExpense(queryObj));
    dispatch(getIncome(queryObj));
  };
  useEffect(() => {
    getData();
  }, []);

  console.log('dateRange', dateRange);

  return (
    <Page>
      <Group position="left">
        <DatePickerInput
          type="range"
          label="Выберите диапазон дат"
          placeholder="Выберите диапазон дат"
          value={dateRange}
          onChange={setDateRange}
          mx="auto"
          maw={350}
        />
        <Button variant="default" onClick={() => getData()}>
          Получить данные
        </Button>
      </Group>

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
