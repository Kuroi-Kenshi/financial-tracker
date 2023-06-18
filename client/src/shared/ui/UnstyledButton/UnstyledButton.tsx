import React, { memo } from 'react';
import {
  IconLayoutDashboard,
  IconCashBanknoteOff,
  IconBusinessplan,
  IconCash,
  IconBuildingBank,
  IconCoins,
} from '@tabler/icons-react';
import { ThemeIcon, UnstyledButton as MUnstyledButton, Group, Text } from '@mantine/core';
import { NavLink } from 'react-router-dom';

interface UnstyledButtonProps {
  children: React.ReactNode;
}

export const UnstyledButton = ({ children }: UnstyledButtonProps) => {
  return (
    <MUnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        paddingBottom: '10px',
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </MUnstyledButton>
  );
};
