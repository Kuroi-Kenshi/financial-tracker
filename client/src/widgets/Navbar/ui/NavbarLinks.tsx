import React, { memo } from 'react';
import {
  IconLayoutDashboard,
  IconCashBanknoteOff,
  IconBusinessplan,
  IconCash,
  IconBuildingBank,
  IconCoins,
} from '@tabler/icons-react';
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import { AppRoutes } from '@/shared/types/router';

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
    path: AppRoutes.DASHBOARD,
  },
  {
    icon: <IconCashBanknoteOff size="1rem" />,
    color: 'teal',
    label: 'Expenses',
    path: AppRoutes.EXPENSES,
  },
  {
    icon: <IconCash size="1rem" />,
    color: 'violet',
    label: 'Incomes',
    path: AppRoutes.INCOMES,
  },
  {
    icon: <IconBuildingBank size="1rem" />,
    color: 'grape',
    label: 'Credit and Debt',
    path: AppRoutes.CREDIT_AND_DEBT,
  },
  {
    icon: <IconBusinessplan size="1rem" />,
    color: 'grape',
    label: 'Financial Goals',
    path: AppRoutes.FINANCIAL_GOALS,
  },
  {
    icon: <IconCoins size="1rem" />,
    color: 'grape',
    label: 'Budget Plan',
    path: AppRoutes.BUDGET_PLANS,
  },
  {
    icon: <IconCoins size="1rem" />,
    color: 'grape',
    label: 'Investments',
    path: AppRoutes.INVESTMENTS,
  },
];

export const NavbarLinks = memo(() => {
  const links = data.map((link) => (
    <NavLink key={link.path} to={link.path} style={{ textDecoration: 'none' }}>
      <NavbarLink {...link} key={link.label} />
    </NavLink>
  ));
  return <div>{links}</div>;
});
