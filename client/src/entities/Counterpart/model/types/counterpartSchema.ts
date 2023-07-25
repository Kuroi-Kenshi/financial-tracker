export interface Counterpart {
  id: number;
  name: string;
  description: string | null;
}

export interface CounterpartSchema {
  data: Counterpart[];
  isLoading: boolean;
  error?: string;
}
