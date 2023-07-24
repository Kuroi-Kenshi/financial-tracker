import { Expense, ExpenseList, ExpenseReqType, getFilteredExpenses } from '@/entities/Expense';
import { ExpenseCategoryList } from '@/entities/ExpenseCategory';
import { getDayNumber } from '@/shared/libs/utils/date/date';
import { BarChart, DoughnutChart, SvgLineChart } from '@/shared/ui/Charts';
import { BarChartDataSet } from '@/shared/ui/Charts/BarChart/BarChart';
import { DoughnutDataSet } from '@/shared/ui/Charts/DoughnutChart/DoughnutChart';
import { ChartType, getBarChartDataSet, getCategoryDataSet } from '@/shared/ui/Charts/utils';
import { Page } from '@/widgets/Page';
import { Button, Drawer, Flex, Group } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ExpensesPage = () => {
  const expenses = useSelector(getFilteredExpenses);
  const [expenseDataset, setExpenseDataset] = useState<BarChartDataSet>({
    datasets: [],
    labels: [],
  });
  const [expenseCategoryDataset, setExpenseCategoryDataset] = useState<DoughnutDataSet>({
    datasets: [],
    labels: [],
  });
  const [categoryListOpened, setCategoryListOpened] = useState(false);

  useEffect(() => {
    const dataSet = getBarChartDataSet(expenses, 'Расходы', ChartType.MONTH);
    const categoryDataSet = getCategoryDataSet(expenses, 'Расходы по категориям');

    setExpenseDataset(dataSet);
    setExpenseCategoryDataset(categoryDataSet);
  }, [expenses]);

  const prepareDataForChart = (expenses: Expense[]) => {
    [
      {
        label: 0,
        x: 0,
        y: 334,
      },
      {
        label: 1,
        x: 1,
        y: 235,
      },
    ];

    const preparedExpenses = expenses.reduce((allEntity: {}, expense: Expense) => {
      const dayNumber = getDayNumber(new Date(expense.date));
      //@ts-ignore
      if (allEntity[dayNumber]) allEntity[dayNumber] = allEntity[dayNumber] + expense.amount;
      //@ts-ignore
      allEntity[dayNumber] = expense.amount;

      return allEntity;
    }, {});

    const preparedDataForLineChart = Object.entries(preparedExpenses).map(([day, value]) => {
      return {
        label: day,
        x: day,
        y: value,
      };
    });
    preparedDataForLineChart.unshift({
      label: '0',
      x: '0',
      y: 0,
    });

    return preparedDataForLineChart;
  };

  return (
    <Page>
      <Flex direction="column" gap="5px">
        {/* <SvgLineChart data={prepareDataForChart(expenses)} /> */}
        <Flex direction="row" mah="300px" gap="50px">
          <BarChart dataset={expenseDataset} />
          <DoughnutChart dataset={expenseCategoryDataset} />
        </Flex>
        <Group mt="20px">
          <Button color="cyan" onClick={() => setCategoryListOpened(true)}>
            Категории
          </Button>
        </Group>
        <ExpenseList mode={ExpenseReqType.NORMAL} withAddButton />
      </Flex>
      <Drawer
        opened={categoryListOpened}
        onClose={() => setCategoryListOpened(false)}
        title="Список категорий"
      >
        <ExpenseCategoryList />
      </Drawer>
    </Page>
  );
};

export default ExpensesPage;
