import { lazy } from 'react';

export const AuthPageAsync = lazy(async () => await import('./AuthPage'));
