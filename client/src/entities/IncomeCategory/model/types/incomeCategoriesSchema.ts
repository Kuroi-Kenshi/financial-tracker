export interface IncomeCategory {
  id: number;
  name: string;
  color: string;
}

export interface IncomeCategorySchema {
  data: IncomeCategory[];
  isLoading: boolean;
  error?: string;
}
