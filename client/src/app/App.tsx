import { Header } from '@/widgets/Header';
import { Navbar } from '@/widgets/Navbar';
import { AppShell, useMantineTheme } from '@mantine/core';
import { Dispatch, SetStateAction, Suspense, memo, useEffect, useState } from 'react';
import { AppRouter } from './providers/Router';
import { AuthPage } from '@/pages/AuthPage';
import axios from 'axios';

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
  const [isAuth, setIsAuth] = useState(true);

  const mantineStyles = {
    main: {
      background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
    },
  };

  // const checkAuth = async (token: string) => {
  //   const authData = await axios.get('http://localhost:3333/api/auth/login', {
  //     method: 'POST',
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });

  //   if (authData.status === 200) {
  //     //@ts-ignore
  //     localStorage.setItem('token', authData.accessToken);

  //     setIsAuth(true);
  //   }
  // };

  // useEffect(() => {
  //   const token = localStorage.getItem('token');

  //   if (token) {
  //     checkAuth();
  //   }
  // }, []);

  const Wrapper = ({ isAuth }: { isAuth: boolean }) => {
    if (isAuth) {
      return <AppLayout mantineStyles={mantineStyles} opened={opened} setOpened={setOpened} />;
    }

    return <AuthPage />;
  };

  return <Wrapper isAuth={isAuth} />;
};

export default memo(App);
