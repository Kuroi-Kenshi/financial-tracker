export type IncomeFilterQuery = {
  dateFrom: Date;
  dateTo: Date;
  categoryIds: string;
  skip: string;
  take: string;
  orderBy: string;
};

export type IncomeFilter = {
  dateFrom: Date;
  dateTo: Date;
  skip: number | undefined;
  take: number | undefined;
  orderBy: string | undefined;
  categoryIds: number[] | undefined;
};
