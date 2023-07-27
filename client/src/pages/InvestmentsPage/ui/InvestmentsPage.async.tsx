import { lazy } from 'react';

export const InvestmentsPageAsync = lazy(async () => await import('./InvestmentsPage'));
