import { Button, Navbar as MNavbar } from '@mantine/core';
import { memo } from 'react';
import { NavbarLinks } from './NavbarLinks';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { logout } from '@/features/Auth';

interface NavbarProps {
  opened: boolean;
}

export const Navbar = memo(({ opened }: NavbarProps) => {
  const dispatch = useAppDispatch();

  return (
    <MNavbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
      <MNavbar.Section grow mt="md">
        <NavbarLinks />
      </MNavbar.Section>
      <MNavbar.Section>
        <Button variant="gradient" onClick={async () => await dispatch(logout())}>
          Выйти
        </Button>
      </MNavbar.Section>
    </MNavbar>
  );
});
