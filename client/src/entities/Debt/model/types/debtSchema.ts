import { type Currency } from '@/entities/Currency';
import { type Counterpart } from '@/entities/Counterpart';
import { type CreditAndDebtStatus } from '@/shared/types/CreditAndDebt';

export interface Debt {
  id: number;
  name: string;
  description: string;
  amount: number;
  startDate: string;
  dueDate: string;
  status: CreditAndDebtStatus;
  totalPayments: number;
  debtor: Counterpart;
  currency: Currency;
}

interface ModalInfo {
  modalIsOpened: boolean;
  modalData: Debt | null;
}

export interface DebtSchema {
  data: Debt[];
  isLoading: boolean;
  error?: string;
  modalInfo: ModalInfo;
}
