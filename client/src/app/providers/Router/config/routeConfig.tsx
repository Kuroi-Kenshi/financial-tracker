import { AuthPage } from '@/pages/AuthPage';
import { BudgetPlanDetailsPage } from '@/pages/BudgetPlanDetailsPage';
import { BudgetPlansPage } from '@/pages/BudgetPlansPage';
import { CreditAndDebtPage } from '@/pages/CreditAndDebtPage';
import { CreditDetailsPage } from '@/pages/CreditDetailsPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { DebtDetailsPage } from '@/pages/DebtDetailsPage';
import { ExpenseDetailsPage } from '@/pages/ExpenseDetailsPage';
import { ExpensesPage } from '@/pages/ExpensePage';
import { FinancialGoalDetailsPage } from '@/pages/FinancialGoalDetailsPage';
import { FinancialGoalsPage } from '@/pages/FinancialGoalsPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { IncomeDetailsPage } from '@/pages/IncomeDetailsPage';
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
  // [AppRoutes.MAIN]: {
  //   path: getRouteMain(),
  //   element: <AuthPage />,
  // },
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
    // authOnly: true,
  },
  [AppRoutes.FINANCIAL_GOALS]: {
    path: getRouteFinancialGoals(),
    element: <FinancialGoalsPage />,
    // authOnly: true,
  },
  [AppRoutes.BUDGET_PLANS]: {
    path: getRouteBudgetPlans(),
    element: <BudgetPlansPage />,
    // authOnly: true,
  },
  [AppRoutes.INVESTMENTS]: {
    path: getRouteInvestments(),
    element: <InvestmentsPage />,
    // authOnly: true,
  },
  [AppRoutes.EXPENSE_DETAILS]: {
    path: getRouteExpenseDetails(':id'),
    element: <ExpenseDetailsPage />,
    // authOnly: true,
  },
  [AppRoutes.INCOMES_DETAILS]: {
    path: getRouteIncomesDetails(':id'),
    element: <IncomeDetailsPage />,
    // authOnly: true,
    // roles: [UserRole.MANAGER, UserRole.ADMIN],
  },
  [AppRoutes.INVESTMENT_DETAILS]: {
    path: getRouteInvestmentDetails(':id'),
    element: <InvestmentsDetailsPage />,
    // authOnly: true,
  },
  [AppRoutes.BUDGET_PLAN_DETAILS]: {
    path: getRouteBudgetPlanDetails(':id'),
    element: <BudgetPlanDetailsPage />,
    // authOnly: true,
  },
  [AppRoutes.FINANCIAL_GOAL_DETAILS]: {
    path: getRouteFinancialGoalDetails(':id'),
    element: <FinancialGoalDetailsPage />,
    // authOnly: true,
  },
  [AppRoutes.CREDIT_DETAILS]: {
    path: getRouteCreditDetails(':id'),
    element: <CreditDetailsPage />,
    // authOnly: true,
  },
  [AppRoutes.DEBT_DETAILS]: {
    path: getRouteDebtDetails(':id'),
    element: <DebtDetailsPage />,
    // authOnly: true,
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

console.log('routeConfig', routeConfig);
