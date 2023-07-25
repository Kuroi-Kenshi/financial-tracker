export interface Currency {
  id: number;
  code: string;
  name: string;
  symbol: string;
}

export interface CurrencySchema {
  data: Currency[];
  isLoading: boolean;
  error?: string;
}
