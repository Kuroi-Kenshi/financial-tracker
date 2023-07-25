import { CreditAndDebtPage } from '@/pages/CreditAndDebtPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { ExpensesPage } from '@/pages/ExpensePage';
import { FinancialGoalsPage } from '@/pages/FinancialGoalsPage';
import { IncomesPage } from '@/pages/IncomesPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import {
  getRouteCreditAndDebt,
  getRouteExpenses,
  getRouteFinancialGoals,
  getRouteIncomes,
  getRouteMain,
} from '@/shared/const/router';
import { AppRoutes } from '@/shared/types/router';
import { RouteProps } from 'react-router';

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.DASHBOARD]: {
    path: getRouteMain(),
    element: <DashboardPage />,
  },
  [AppRoutes.EXPENSES]: {
    path: getRouteExpenses(),
    element: <ExpensesPage />,
  },
  [AppRoutes.INCOMES]: {
    path: getRouteIncomes(),
    element: <IncomesPage />,
  },
  [AppRoutes.CREDIT_AND_DEBT]: {
    path: getRouteCreditAndDebt(),
    element: <CreditAndDebtPage />,
  },
  [AppRoutes.FINANCIAL_GOALS]: {
    path: getRouteFinancialGoals(),
    element: <FinancialGoalsPage />,
  },
  // [AppRoutes.BUDGET_PLANS]: {
  //   path: getRouteBudgetPlans(),
  //   element: <BudgetPlansPage />,
  // },
  // [AppRoutes.INVESTMENTS]: {
  //   path: getRouteInvestments(),
  //   element: <InvestmentsPage />,
  // },
  [AppRoutes.NOT_FOUND]: {
    path: '*',
    element: <NotFoundPage />,
  },
};
