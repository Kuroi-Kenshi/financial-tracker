import { Navbar as MNavbar } from '@mantine/core';
import { memo } from 'react';
import { NavbarLinks } from './NavbarLinks';

interface NavbarProps {
  opened: boolean;
}

export const Navbar = memo(({ opened }: NavbarProps) => {
  return (
    <MNavbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <MNavbar.Section mt="xs">{/* <Brand /> */}</MNavbar.Section>
      <MNavbar.Section grow mt="md">
        <NavbarLinks />
      </MNavbar.Section>
      <MNavbar.Section>{/* <User /> */}</MNavbar.Section>
    </MNavbar>
  );
});
