import { Currency } from '@/entities/Currency';
import { ExpenseCategory } from '@/entities/ExpenseCategory';

interface Receipt {
  fileName: string;
  filePath: string;
}

export interface Expense {
  id: number;
  name: string;
  amount: number;
  date: string;
  description: string;
  categoryExpense: ExpenseCategory;
  currency: Currency;
  receipt?: Receipt[];
}

interface ModalInfo {
  modalIsOpened: boolean;
  modalData: Expense | null;
}
export interface ExpenseSchema {
  data: {
    filtered: Expense[];
    last: Expense[];
  };
  isLoading: boolean;
  error?: string;
  modalInfo: ModalInfo;
}

export enum ExpenseReqType {
  NORMAL = 'NORMAL',
  LAST_EXPENSES = 'LAST_EXPENSES',
}

export interface ExpenseReqParams {
  query?: Record<string, string>;
  mode: ExpenseReqType;
}
