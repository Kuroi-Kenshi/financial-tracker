import { Paper, Text } from '@mantine/core';
import { memo, ReactNode } from 'react';

interface PageProps {
  className?: string;
  children: ReactNode;
}

export const Page = memo(({ children }: PageProps) => {
  return (
    <Paper shadow="lg" p="md">
      {children}
    </Paper>
  );
});
