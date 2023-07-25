import { render, screen } from '@testing-library/react';
import { UnstyledButton } from './UnstyledButton';

describe('UnstyledButton tests', () => {
  test('default button', () => {
    render(<UnstyledButton>Test</UnstyledButton>);
    expect(screen.getByTestId('UnstyledButton')).toBeInTheDocument();
  });
});
