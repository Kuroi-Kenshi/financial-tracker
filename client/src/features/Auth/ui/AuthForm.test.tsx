import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthForm } from './AuthForm';
import { componentRender } from '@/shared/libs/tests/componentRender';

describe('AuthForm tests', () => {
  test('AuthForm render', () => {
    componentRender(<AuthForm />);
    expect(screen.getByTestId('authForm')).toBeInTheDocument();
  });

  test('AuthForm switch mode', async () => {
    componentRender(<AuthForm />);
    await userEvent.click(screen.getByTestId('registrationTab'));
    expect(screen.getByTestId('registrationBtn')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('loginTab'));
    expect(screen.getByTestId('loginBtn')).toBeInTheDocument();
  });
});
