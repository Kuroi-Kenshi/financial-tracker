import { AuthPage } from '@/pages/AuthPage';
import { BudgetPlanDetailsPage } from '@/pages/BudgetPlanDetailsPage';
import { BudgetPlansPage } from '@/pages/BudgetPlansPage';
import { CreditAndDebtPage } from '@/pages/CreditAndDebtPage';
import { CreditDetailsPage } from '@/pages/CreditDetailsPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { DebtDetailsPage } from '@/pages/DebtDetailsPage';
import { ExpensesPage } from '@/pages/ExpensePage';
import { FinancialGoalDetailsPage } from '@/pages/FinancialGoalDetailsPage';
import { FinancialGoalsPage } from '@/pages/FinancialGoalsPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { IncomesPage } from '@/pages/IncomesPage';
import { InvestmentsDetailsPage } from '@/pages/InvestmentsDetailsPage';
import { InvestmentsPage } from '@/pages/InvestmentsPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import {
  getRouteAuth,
  getRouteBudgetPlanDetails,
  getRouteBudgetPlans,
  getRouteCreditAndDebt,
  getRouteCreditDetails,
  getRouteDashboard,
  getRouteDebtDetails,
  getRouteExpenseDetails,
  getRouteExpenses,
  getRouteFinancialGoalDetails,
  getRouteFinancialGoals,
  getRouteForbidden,
  getRouteIncomes,
  getRouteIncomesDetails,
  getRouteInvestmentDetails,
  getRouteInvestments,
  getRouteMain,
} from '@/shared/const/router';
import { AppRoutes } from '@/shared/types/router';
import { RouteProps } from 'react-router';

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.AUTH]: {
    path: getRouteAuth(),
    element: <AuthPage />,
  },
  [AppRoutes.DASHBOARD]: {
    path: getRouteDashboard(),
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
  [AppRoutes.BUDGET_PLANS]: {
    path: getRouteBudgetPlans(),
    element: <BudgetPlansPage />,
  },
  [AppRoutes.INVESTMENTS]: {
    path: getRouteInvestments(),
    element: <InvestmentsPage />,
  },
  [AppRoutes.INVESTMENT_DETAILS]: {
    path: getRouteInvestmentDetails(':id'),
    element: <InvestmentsDetailsPage />,
  },
  [AppRoutes.BUDGET_PLAN_DETAILS]: {
    path: getRouteBudgetPlanDetails(':id'),
    element: <BudgetPlanDetailsPage />,
  },
  [AppRoutes.FINANCIAL_GOAL_DETAILS]: {
    path: getRouteFinancialGoalDetails(':id'),
    element: <FinancialGoalDetailsPage />,
  },
  [AppRoutes.CREDIT_DETAILS]: {
    path: getRouteCreditDetails(':id'),
    element: <CreditDetailsPage />,
  },
  [AppRoutes.DEBT_DETAILS]: {
    path: getRouteDebtDetails(':id'),
    element: <DebtDetailsPage />,
  },
  [AppRoutes.FORBIDDEN]: {
    path: getRouteForbidden(),
    element: <ForbiddenPage />,
  },
  // last
  [AppRoutes.NOT_FOUND]: {
    path: '*',
    element: <NotFoundPage />,
  },
};
