import { type Currency } from '@/entities/Currency';

export interface FinancialGoal {
  id: number;
  name: string;
  description: string;
  amount: number;
  totalAmount: number;
  deadline: string;
  currency: Currency;
}

interface ModalInfo {
  modalIsOpened: boolean;
  modalData: FinancialGoal | null;
}

export interface FinancialGoalSchema {
  data: FinancialGoal[];
  isLoading: boolean;
  error?: string;
  modalInfo: ModalInfo;
}
