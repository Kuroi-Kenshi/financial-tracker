import { lazy } from 'react';

export const DashboardPageAsync = lazy(async () => await import('./DashboardPage'));
