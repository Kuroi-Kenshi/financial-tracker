import { lazy } from 'react';

export const InvestmentsDetailsPageAsync = lazy(
  async () => await import('./InvestmentsDetailsPage')
);
