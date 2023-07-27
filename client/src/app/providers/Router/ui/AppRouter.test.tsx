import { screen } from '@testing-library/react';
import AppRouter from './AppRouter';
import { componentRender } from '@/shared/libs/tests/componentRender';
import { getRouteMain } from '@/shared/const/router';

describe('app/router/AppRouter', () => {
  //   test('should render dashboard page', async () => {
  //     componentRender(<AppRouter />, {
  //       route: getRouteMain(),
  //     });

  //     const page = await screen.findByTestId('DashboardPage');
  //     expect(page).toBeInTheDocument();
  //   });

  test('page not found', async () => {
    componentRender(<AppRouter />, {
      route: '/asfasfasfasf',
    });

    const page = await screen.findByTestId('NotFoundPage');
    expect(page).toBeInTheDocument();
  });
});
