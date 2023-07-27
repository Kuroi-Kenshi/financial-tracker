import { IncomeList, getIncomes } from '@/entities/Income';
import { IncomeCategoryList } from '@/entities/IncomeCategory';
import { BarChart, DoughnutChart } from '@/shared/ui/Charts';
import { ChartType, getBarChartDataSet, getCategoryDataSet } from '@/shared/ui/Charts/utils';
import { Page } from '@/widgets/Page';
import { Button, Drawer, Flex, Group } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { type BarChartDataSet } from '@/shared/ui/Charts/BarChart/BarChart';
import { type DoughnutDataSet } from '@/shared/ui/Charts/DoughnutChart/DoughnutChart';

const IncomesPage = () => {
  const incomes = useSelector(getIncomes);
  const [incomeDataset, setIncomeDataset] = useState<BarChartDataSet>({
    datasets: [],
    labels: [],
  });
  const [incomeCategoryDataset, setIncomeCategoryDataset] = useState<DoughnutDataSet>({
    datasets: [],
    labels: [],
  });
  const [categoryListOpened, setCategoryListOpened] = useState(false);

  useEffect(() => {
    const dataSet = getBarChartDataSet(incomes, 'Расходы', ChartType.MONTH);
    const categoryDataSet = getCategoryDataSet(incomes, 'Расходы по категориям');

    setIncomeDataset(dataSet);
    setIncomeCategoryDataset(categoryDataSet);
  }, [incomes]);

  return (
    <Page>
      <Flex direction="column" gap="5px">
        <Flex direction="row" mah="300px" gap="50px">
          <BarChart dataset={incomeDataset} />
          <DoughnutChart dataset={incomeCategoryDataset} />
        </Flex>
        <Group mt="20px">
          <Button
            color="cyan"
            onClick={() => {
              setCategoryListOpened(true);
            }}
          >
            Категории
          </Button>
        </Group>
        <IncomeList />
      </Flex>
      <Drawer
        opened={categoryListOpened}
        onClose={() => {
          setCategoryListOpened(false);
        }}
        title="Список категорий"
      >
        <IncomeCategoryList />
      </Drawer>
    </Page>
  );
};

export default IncomesPage;
