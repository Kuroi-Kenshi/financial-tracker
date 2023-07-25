import React from 'react';
import {
  IconLayoutDashboard,
  IconCashBanknoteOff,
  IconBusinessplan,
  IconCash,
  IconBuildingBank,
  IconCoins,
} from '@tabler/icons-react';
import { ThemeIcon, UnstyledButton as MUnstyledButton } from '@mantine/core';

interface UnstyledButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  styles?: React.CSSProperties;
}

export const UnstyledButton = ({ children, onClick, styles }: UnstyledButtonProps) => {
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
      style={styles}
      onClick={onClick}
      data-testid="UnstyledButton"
    >
      {children}
    </MUnstyledButton>
  );
};
