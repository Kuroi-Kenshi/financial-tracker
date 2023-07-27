import { ExpenseList, ExpenseReqType, getExpense, getFilteredExpenses } from '@/entities/Expense';
import { FinancialGoalList } from '@/entities/FinancialGoals';
import { getIncome, getIncomes } from '@/entities/Income';
import { BudgetPlansCard } from '@/features/BudgetPlansCard';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { BarChart } from '@/shared/ui/Charts';
import { type BarChartDataSet } from '@/shared/ui/Charts/BarChart/BarChart';
import { ChartType, getBarChartDataSet } from '@/shared/ui/Charts/utils';
import { Page } from '@/widgets/Page';
import { Card, Flex, Title } from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const currentDate = dayjs().startOf('month').toDate();

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const expenseList = useSelector(getFilteredExpenses);
  const incomeList = useSelector(getIncomes);
  const [expenseDataset, setExpenseDataset] = useState<BarChartDataSet>({
    datasets: [],
    labels: [],
  });
  const [date, setDate] = useState<Date | null>(currentDate);

  useEffect(() => {
    const dataSet = getBarChartDataSet(expenseList, 'Расходы', ChartType.DAY);
    setExpenseDataset(dataSet);
  }, [expenseList, incomeList]);

  const onChangeDate = (newDate: Date) => {
    setDate(newDate);
    getData(newDate);
  };

  const getData = (newDate: Date) => {
    const lastDayOfMonth = dayjs(newDate).endOf('month');
    const queryObj = {
      dateFrom: newDate.toISOString(),
      dateTo: lastDayOfMonth.toISOString(),
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(getExpense({ mode: ExpenseReqType.NORMAL, query: queryObj }));
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(getIncome(queryObj));
  };
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    getData(date!);
  }, []);

  return (
    <Page>
      <Flex data-testid="DashboardPage">
        <div>
          <Flex>
            <div style={{ flexBasis: '100%' }}>
              <Flex justify="left" align="flex-end" gap="12px" mah={'400px'}>
                <MonthPickerInput
                  icon={<IconCalendar size="1.1rem" stroke={1.5} />}
                  label="Select a month"
                  placeholder="Select a month"
                  value={date}
                  onChange={onChangeDate}
                  maw={320}
                />

                {/* <SegmentedControl
                  value={rangeType}
                  onChange={setRangeType}
                  data={[
                    { label: RangeType.MONTH, value: RangeType.MONTH },
                    { label: RangeType.WEEK, value: RangeType.WEEK },
                  ]}
                /> */}
              </Flex>
              <BarChart dataset={expenseDataset} />
            </div>
          </Flex>
          <Flex mt="32px">
            <Card>
              <Title align="center" order={5}>
                Последние траты
              </Title>
              <ExpenseList
                mode={ExpenseReqType.LAST_EXPENSES}
                styles={{ minWidth: '250px', maxWidth: '300px' }}
              />
            </Card>
            <Card ml="lg">
              <Title align="center" order={5}>
                Финансовые цели
              </Title>
              <FinancialGoalList styles={{ maxWidth: '250px' }} />
            </Card>
          </Flex>
        </div>
        <BudgetPlansCard styles={{ marginLeft: '32px' }} />
      </Flex>
    </Page>
  );
};

export default DashboardPage;
