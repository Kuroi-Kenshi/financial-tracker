import { ExpenseList, getExpenses } from '@/entities/Expense';
import { ExpenseCategoryList } from '@/entities/ExpenseCategory';
import { ExpenseEditForm } from '@/features/ExpenseEditForm';
import { BarChart, DoughnutChart } from '@/shared/ui/Charts';
import { Page } from '@/widgets/Page';
import { Button, Drawer, Flex, Group, Loader } from '@mantine/core';
import { Suspense, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// interface Expense {
//   id: string;
//   name: string;
//   amount: number;
//   date: string;
//   categoryExpense: {
//     id: number;
//     color: string;
//     name: string;
//   };
//   currency: {
//     id: number;
//     code: string;
//     name: string;
//     symbol: string;
//   };
// }

interface ExpenseDataSet {
  month: string;
  total: number;
}

interface ExpenseCategoryDataSet {
  category: string;
  total: number;
}

const ExpensesPage = () => {
  const expenses = useSelector(getExpenses);
  const [expenseDataset, setExpenseDataset] = useState<ExpenseDataSet[]>([]);
  const [expenseCategoryDataset, setExpenseCategoryDataset] = useState<ExpenseCategoryDataSet[]>(
    []
  );
  const [addModalOpened, setAddModalOpened] = useState(false);
  const [categoryListOpened, setCategoryListOpened] = useState(false);

  useEffect(() => {
    //@ts-ignore
    const expenseDataSetTemp = expenses.reduce((acc, obj: Expense) => {
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
    const expenseCategoryDataSetTemp = expenses.reduce((acc, obj: Expense) => {
      //@ts-ignore
      if (obj.categoryExpense?.name && acc[obj.categoryExpense?.name]) {
        //@ts-ignore
        acc[obj.categoryExpense.name].push(obj);
      } else if (obj.categoryExpense?.name) {
        //@ts-ignore
        acc[obj.categoryExpense.name] = [obj];
      }
      return acc;
    }, {});

    const expenseCategoryDataSet = Object.entries(expenseCategoryDataSetTemp).map(
      ([key, value]) => {
        //@ts-ignore
        const totalExpenseOfCategory = value.reduce((total: number, expense: Expense) => {
          return (total += expense.amount);
        }, 0);

        return {
          category: key,
          total: totalExpenseOfCategory,
        };
      }
    );

    setExpenseDataset(expenseDataSet);
    setExpenseCategoryDataset(expenseCategoryDataSet);
  }, [expenses]);

  return (
    <Page>
      <Flex direction="column" mah="300px" gap="5px">
        <Flex direction="row" mah="300px" gap="50px">
          <BarChart dataset={expenseDataset} label="Траты за месяц" />
          <DoughnutChart dataset={expenseCategoryDataset} />
        </Flex>
        <Group mt="20px">
          <Button color="indigo" onClick={() => setAddModalOpened(true)}>
            Добавить
          </Button>
          <Button color="cyan" onClick={() => setCategoryListOpened(true)}>
            Категории
          </Button>
        </Group>
        <ExpenseList />
      </Flex>
      <Suspense fallback={<Loader />}>
        <ExpenseEditForm
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
        <ExpenseCategoryList />
      </Drawer>
    </Page>
  );
};

export default ExpensesPage;
