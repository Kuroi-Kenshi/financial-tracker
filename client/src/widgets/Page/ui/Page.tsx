import { Container, Paper, Text } from '@mantine/core';
import { memo, type ReactNode } from 'react';

interface PageProps {
  className?: string;
  children: ReactNode;
}

export const Page = memo(({ children }: PageProps) => {
  return <Container p="md">{children}</Container>;
});
