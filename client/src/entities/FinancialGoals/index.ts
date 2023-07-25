import { deleteFinancialGoal } from './model/services/deleteFinancialGoal/deleteFinancialGoal';
import { financialGoalActions } from './model/slice/financialGoalSlice';
import { getFinancialGoalModalInfo } from './model/selectors/getFinancialGoalModalInfo';
import { createFinancialGoal } from './model/services/createFinancialGoal/createFinancialGoal';
import { updateFinancialGoal } from './model/services/updateFinancialGoal/updateFinancialGoal';
import { FinancialGoalList } from './ui/FinancialGoalList';
import { FinancialGoal, FinancialGoalSchema } from './model/types/financialGoalSchema';
import { financialGoalReducer } from './model/slice/financialGoalSlice';

export {
  createFinancialGoal,
  updateFinancialGoal,
  deleteFinancialGoal,
  financialGoalActions,
  getFinancialGoalModalInfo,
  FinancialGoalList,
  financialGoalReducer,
};

export { type FinancialGoal, type FinancialGoalSchema };
