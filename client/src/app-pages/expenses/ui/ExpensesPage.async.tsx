import { lazy } from 'react';

export const ExpensesPageAsync = lazy(async () => await import('./ExpensesPage'));
