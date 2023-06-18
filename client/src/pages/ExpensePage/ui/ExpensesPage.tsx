import { BarChart, DoughnutChart } from '@/shared/ui/Charts';
import { UnstyledButton } from '@/shared/ui/UnstyledButton';
import { Page } from '@/widgets/Page';
import { Group, ThemeIcon, Text, Flex } from '@mantine/core';
import { IconCashBanknoteOff } from '@tabler/icons-react';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Expense {
  id: string;
  name: string;
  amount: number;
  date: string;
  categoryExpense: {
    id: number;
    color: string;
    name: string;
  };
  currency: {
    id: number;
    code: string;
    name: string;
    symbol: string;
  };
}

interface ExpenseDataSet {
  month: string;
  totalExpense: number;
}

interface ExpenseCategoryDataSet {
  category: string;
  totalExpense: number;
}

interface ExpenseInfoProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  date: string;
  amount: number;
}

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expenseDataset, setExpenseDataset] = useState<ExpenseDataSet[]>([]);
  const [expenseCategoryDataset, setExpenseCategoryDataset] = useState<ExpenseCategoryDataSet[]>(
    []
  );

  const getExpenses = async () => {
    try {
      const expenses = await axios.get('http://localhost:3333/api/expense');

      //@ts-ignore
      const expenseDataSetTemp = expenses.data.reduce((acc, obj: Expense) => {
        const monthName = new Intl.DateTimeFormat('ru-RU', { month: 'long' }).format(
          new Date(obj.date)
        );
        if (acc[monthName]) {
          acc[monthName].push(obj);
        } else {
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
          totalExpense: totalExpenseOfMonth,
        };
      });

      //@ts-ignore
      const expenseCategoryDataSetTemp = expenses.data.reduce((acc, obj: Expense) => {
        if (obj.categoryExpense?.name && acc[obj.categoryExpense?.name]) {
          acc[obj.categoryExpense.name].push(obj);
        } else if (obj.categoryExpense?.name) {
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
            totalExpense: totalExpenseOfCategory,
          };
        }
      );

      setExpenses(expenses.data);
      setExpenseDataset(expenseDataSet);
      setExpenseCategoryDataset(expenseCategoryDataSet);
    } catch (error) {
      console.error('error', error);
    }
  };

  useEffect(() => {
    getExpenses();
  }, []);

  const ExpenseInfo = ({ icon, label, color, date, amount }: ExpenseInfoProps) => {
    const formattedDate = new Intl.DateTimeFormat('ru-RU', {}).format(new Date(date));
    return (
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>
        <Flex
          gap="md"
          justify="space-between"
          direction="row"
          align="center"
          maw="500px"
          miw="500px"
        >
          <div>
            <Text size="sm">{label}</Text>
            <Text size="sm">{formattedDate}</Text>
          </div>
          <Text size="sm" color="grape">
            -{amount}
          </Text>
        </Flex>
      </Group>
    );
  };
  return (
    <Page>
      <Flex direction="row" mah="300px" gap="50px">
        <BarChart dataset={expenseDataset} />
        <DoughnutChart dataset={expenseCategoryDataset} />
      </Flex>

      {expenses.map((expense) => {
        return (
          <UnstyledButton key={expense.id}>
            <ExpenseInfo
              color="grape"
              label={expense.name}
              date={expense.date}
              amount={expense.amount}
              icon={<IconCashBanknoteOff />}
            />
          </UnstyledButton>
        );
      })}
    </Page>
  );
};

export default ExpensesPage;
