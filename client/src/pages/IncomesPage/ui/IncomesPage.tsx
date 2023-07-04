import { IncomeList, getIncomes } from '@/entities/Income';
import { IncomeCategoryList, createIncomeCategory } from '@/entities/IncomeCategory';
import { IncomeEditForm } from '@/features/IncomeEditForm';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch';
import { BarChart, DoughnutChart } from '@/shared/ui/Charts';
import { Page } from '@/widgets/Page';
import { Button, ColorInput, Drawer, Flex, Group, Loader, TextInput } from '@mantine/core';
import { Suspense, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface IncomeDataSet {
  month: string;
  total: number;
}

interface IncomeCategoryDataSet {
  category: string;
  total: number;
}

const IncomesPage = () => {
  const dispatch = useAppDispatch();
  const incomes = useSelector(getIncomes);
  const [incomeDataset, setIncomeDataset] = useState<IncomeDataSet[]>([]);
  const [incomeCategoryDataset, setIncomeCategoryDataset] = useState<IncomeCategoryDataSet[]>([]);
  const [addModalOpened, setAddModalOpened] = useState(false);
  const [categoryListOpened, setCategoryListOpened] = useState(false);
  const [incomeCategoryName, setIncomeCategoryName] = useState('');
  const [incomeCategoryColor, setIncomeCategoryColor] = useState('');

  useEffect(() => {
    //@ts-ignore
    const incomeDataSetTemp = incomes.reduce((acc, obj: Income) => {
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

    //@ts-ignore
    const incomeCategoryDataSetTemp = incomes.reduce((acc, obj: Income) => {
      //@ts-ignore
      if (obj.categoryIncome?.name && acc[obj.categoryIncome?.name]) {
        //@ts-ignore
        acc[obj.categoryIncome.name].push(obj);
      } else if (obj.categoryIncome?.name) {
        //@ts-ignore
        acc[obj.categoryIncome.name] = [obj];
      }
      return acc;
    }, {});

    const incomeCategoryDataSet = Object.entries(incomeCategoryDataSetTemp).map(([key, value]) => {
      //@ts-ignore
      const totalIncomeOfCategory = value.reduce((total: number, income: Income) => {
        return (total += income.amount);
      }, 0);

      return {
        category: key,
        total: totalIncomeOfCategory,
      };
    });

    setIncomeDataset(incomeDataSet);
    setIncomeCategoryDataset(incomeCategoryDataSet);
  }, [incomes]);

  const onCreateCategory = () => {
    dispatch(createIncomeCategory({ color: incomeCategoryColor, name: incomeCategoryName }));
  };

  return (
    <Page>
      <Flex direction="column" mah="300px" gap="5px">
        <Flex direction="row" mah="300px" gap="50px">
          <BarChart dataset={incomeDataset} label="Приходы за месяц" />
          <DoughnutChart dataset={incomeCategoryDataset} />
        </Flex>
        <Group mt="20px">
          <Button color="indigo" onClick={() => setAddModalOpened(true)}>
            Добавить
          </Button>
          <Button color="cyan" onClick={() => setCategoryListOpened(true)}>
            Категории
          </Button>
        </Group>
        <IncomeList />
      </Flex>
      <Suspense fallback={<Loader />}>
        <IncomeEditForm
          opened={addModalOpened}
          setOpened={() => setAddModalOpened(true)}
          onClose={() => setAddModalOpened(false)}
        />
      </Suspense>
      <Drawer
        opened={categoryListOpened}
        onClose={() => setCategoryListOpened(false)}
        title="Список категорий"
      >
        <TextInput
          label="Название категории"
          value={incomeCategoryName}
          onChange={(e) => setIncomeCategoryName(e.target.value)}
        />
        <ColorInput
          mt="sm"
          placeholder="Выберите цвет"
          label="Выберите цвет категории"
          value={incomeCategoryColor}
          defaultValue="#ffffff"
          onChange={setIncomeCategoryColor}
        />
        <Button mt="md" color="indigo" onClick={onCreateCategory}>
          Создать
        </Button>
        <IncomeCategoryList />
      </Drawer>
    </Page>
  );
};

export default IncomesPage;
