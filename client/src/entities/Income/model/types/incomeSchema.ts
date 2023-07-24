import { Currency } from '@/entities/Currency';
import { IncomeCategory } from '@/entities/IncomeCategory';

export interface Income {
  id: number;
  name: string;
  amount: number;
  date: string;
  description: string;
  categoryIncome: IncomeCategory;
  currency: Currency;
}

interface ModalInfo {
  modalData: Income | null;
  modalIsOpened: boolean;
}
export interface IncomeSchema {
  data: Income[];
  isLoading: boolean;
  error?: string;
  modalInfo: ModalInfo;
}
