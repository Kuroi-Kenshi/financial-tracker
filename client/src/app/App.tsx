import { Header } from '@/widgets/Header';
import { Navbar } from '@/widgets/Navbar';
import { AppShell, Flex, Loader, useMantineTheme } from '@mantine/core';
import { type Dispatch, type SetStateAction, Suspense, memo, useEffect, useState } from 'react';
import { AppRouter } from './providers/Router';
import { AuthPage } from '@/pages/AuthPage';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { checkAuth, getAuthIsLoading, getIsAuth } from '@/features/Auth';
import { useSelector } from 'react-redux';

interface AppLayoutProps {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  mantineStyles: Record<string, string | Record<string, string>>;
}

const AppLayout = ({ mantineStyles, opened, setOpened }: AppLayoutProps) => {
  return (
    <AppShell
      styles={mantineStyles}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<Navbar opened={opened} />}
      header={<Header opened={opened} setOpened={setOpened} />}
    >
      <Suspense fallback="">
        <AppRouter />
      </Suspense>
    </AppShell>
  );
};

const App = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const dispatch = useAppDispatch();
  const isAuth = useSelector(getIsAuth);
  const authIsLoading = useSelector(getAuthIsLoading);

  const mantineStyles = {
    main: {
      background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
    },
  };

  useEffect(() => {
    if (!isAuth) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      dispatch(checkAuth());
    }
  }, []);

  if (authIsLoading) {
    return (
      <Flex w="100vw" h="100vh" align="center" justify="center" style={{ overflow: 'hidden' }}>
        <Loader size="lg" color={theme.colorScheme === 'dark' ? 'white' : 'dark'} />
      </Flex>
    );
  }

  const Wrapper = ({ isAuth }: { isAuth: boolean }) => {
    if (isAuth) {
      return <AppLayout mantineStyles={mantineStyles} opened={opened} setOpened={setOpened} />;
    }

    return <AuthPage />;
  };

  return <Wrapper isAuth={isAuth} />;
};

export default memo(App);
