export type ExpenseFilterQuery = {
  dateFrom: Date;
  dateTo: Date;
  categoryIds: string;
  skip: string;
  take: string;
  orderBy: string;
};

export type ExpenseFilter = {
  dateFrom: Date;
  dateTo: Date;
  skip: number | undefined;
  take: number | undefined;
  orderBy: string | undefined;
  categoryIds: number[] | undefined;
};
