import { Button, Title, useMantineTheme } from '@mantine/core';

export const ErrorPage = () => {
  const theme = useMantineTheme();

  const reloadPage = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  return (
    <div
      style={{
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Title order={3}>Произошла непредвиденная ошибка</Title>
      <Button onClick={reloadPage}>Перезагрузить страницу</Button>
    </div>
  );
};
