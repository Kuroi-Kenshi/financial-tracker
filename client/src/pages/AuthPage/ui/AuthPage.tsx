import { AuthForm } from '@/features/Auth/ui/AuthForm';
import { Flex, Title } from '@mantine/core';

const AuthPage = () => {
  return (
    <Flex
      gap="md"
      justify="center"
      align="center"
      direction="column"
      style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}
    >
      <Title order={1}>Financial Tracker</Title>
      <AuthForm />
    </Flex>
  );
};

export default AuthPage;
