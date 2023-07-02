import { LoginForm } from '@/features/Auth/ui/LoginForm';
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
      <LoginForm />
    </Flex>
  );
};

export default AuthPage;
