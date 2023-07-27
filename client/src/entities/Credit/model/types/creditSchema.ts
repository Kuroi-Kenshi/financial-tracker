import { type Currency } from '@/entities/Currency';
import { type Counterpart } from '@/entities/Counterpart';
import { type CreditAndDebtStatus } from '@/shared/types/CreditAndDebt';

export interface Credit {
  id: number;
  name: string;
  description: string;
  amount: number;
  startDate: string;
  dueDate: string;
  status: CreditAndDebtStatus;
  totalPayments: number;
  creditor: Counterpart;
  currency: Currency;
}

interface ModalInfo {
  modalIsOpened: boolean;
  modalData: Credit | null;
}

export interface CreditSchema {
  data: Credit[];
  isLoading: boolean;
  error?: string;
  modalInfo: ModalInfo;
}
