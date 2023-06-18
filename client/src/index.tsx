import { createRoot } from 'react-dom/client';
import App from '@/app/App';
import { MantineProvider } from './app/providers/MantineProvider';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from './app/providers/ErrorBoundary';

const container = document.getElementById('root');
if (container == null) {
  throw new Error('Контейнер root не найден. Не удалось вмонтировать react приложение.');
}

const root = createRoot(container);

root.render(
  <ErrorBoundary>
    <BrowserRouter>
      <MantineProvider>
        <App />
      </MantineProvider>
    </BrowserRouter>
  </ErrorBoundary>
);
