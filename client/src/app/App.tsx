import { Header } from '@/widgets/Header';
import { Navbar } from '@/widgets/Navbar';
import { AppShell, useMantineTheme } from '@mantine/core';
import { Dispatch, SetStateAction, Suspense, memo, useEffect, useState } from 'react';
import { AppRouter } from './providers/Router';
import { AuthPage } from '@/pages/AuthPage';
import axios from 'axios';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch';
import { checkAuth, getIsAuth } from '@/features/Auth';
import { useSelector } from 'react-redux';

interface AppLayoutProps {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  mantineStyles: Object;
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

  const mantineStyles = {
    main: {
      background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
    },
  };

  useEffect(() => {
    if (!isAuth) {
      dispatch(checkAuth());
    }
  }, []);

  const Wrapper = ({ isAuth }: { isAuth: boolean }) => {
    if (isAuth) {
      return <AppLayout mantineStyles={mantineStyles} opened={opened} setOpened={setOpened} />;
    }

    return <AuthPage />;
  };

  return <Wrapper isAuth={isAuth} />;
};

export default memo(App);
