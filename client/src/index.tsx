import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/app/App';
import { MantineProvider } from './app/providers/MantineProvider';
import { ErrorBoundary } from './app/providers/ErrorBoundary';
import { StoreProvider } from './app/providers/StoreProvider';

const container = document.getElementById('root');
if (container == null) {
  throw new Error('Контейнер root не найден. Не удалось вмонтировать react приложение.');
}

const root = createRoot(container);

root.render(
  <BrowserRouter>
    <MantineProvider>
      <ErrorBoundary>
        <StoreProvider>
          <App />
        </StoreProvider>
      </ErrorBoundary>
    </MantineProvider>
  </BrowserRouter>
);
