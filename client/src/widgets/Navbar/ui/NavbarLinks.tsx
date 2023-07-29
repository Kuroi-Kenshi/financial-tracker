import React, { memo } from 'react';
import {
  IconLayoutDashboard,
  IconCashBanknoteOff,
  IconBusinessplan,
  IconCash,
  IconBuildingBank,
} from '@tabler/icons-react';
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';
import {
  getRouteCreditAndDebt,
  getRouteExpenses,
  getRouteFinancialGoals,
  getRouteIncomes,
  getRouteMain,
} from '@/shared/const/router';
import Link from 'next/link';

interface NavbarLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
}

function NavbarLink({ icon, color, label }: NavbarLinkProps) {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

const data = [
  {
    icon: <IconLayoutDashboard size="1rem" />,
    color: 'blue',
    label: 'Dashboard',
    path: getRouteMain(),
  },
  {
    icon: <IconCashBanknoteOff size="1rem" />,
    color: 'teal',
    label: 'Expenses',
    path: getRouteExpenses(),
  },
  {
    icon: <IconCash size="1rem" />,
    color: 'violet',
    label: 'Incomes',
    path: getRouteIncomes(),
  },
  {
    icon: <IconBuildingBank size="1rem" />,
    color: 'grape',
    label: 'Credit and Debt',
    path: getRouteCreditAndDebt(),
  },
  {
    icon: <IconBusinessplan size="1rem" />,
    color: 'grape',
    label: 'Financial Goals',
    path: getRouteFinancialGoals(),
  },
  // {
  //   icon: <IconCoins size="1rem" />,
  //   color: 'grape',
  //   label: 'Investments',
  //   path: AppRoutes.INVESTMENTS,
  // },
];

// eslint-disable-next-line react/display-name
export const NavbarLinks = memo(() => {
  const links = data.map((link) => (
    <Link key={link.path} href={link.path} style={{ textDecoration: 'none' }}>
      <NavbarLink {...link} key={link.label} />
    </Link>
  ));
  return <div>{links}</div>;
});
