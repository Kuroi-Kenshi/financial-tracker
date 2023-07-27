import { debtReducer, debtActions } from '@/entities/Debt/model/slice/debtSlice';
import { getDebt } from './model/services/getDebt/getDebt';
import { getDebts } from './model/selectors/getDebts';
import { type Debt, type DebtSchema } from './model/types/debtSchema';
import { type CreateDebt, createDebt } from './model/services/createDebt/createDebt';
import { type UpdateDebt, updateDebt } from './model/services/updateDebt/updateDebt';
import { DebtList } from './ui/DebtList/DebtList';
import { getDebtModalInfo } from './model/selectors/getDebtModalInfo';
import { deleteDebt } from './model/services/deleteDebt/deleteDebt';

export {
  DebtList,
  getDebts,
  getDebt,
  debtReducer,
  debtActions,
  createDebt,
  updateDebt,
  getDebtModalInfo,
  deleteDebt,
};

export { type Debt, type DebtSchema, type CreateDebt, type UpdateDebt };
