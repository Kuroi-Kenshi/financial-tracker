import {
  AppShell,
  ColorScheme,
  ColorSchemeProvider,
  Header,
  MantineProvider as Mantine,
  Navbar,
} from '@mantine/core';
import { useState } from 'react';

interface MantineProviderProps {
  children: JSX.Element;
}

export const MantineProvider = ({ children }: MantineProviderProps) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <Mantine
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: colorScheme,
          colors: {
            // Add your color
            deepBlue: ['#E9EDFC', '#C1CCF6', '#99ABF0' /* ... */],
            // or replace default theme color
            blue: ['#E9EDFC', '#C1CCF6', '#99ABF0' /* ... */],
          },

          shadows: {
            md: '1px 1px 3px rgba(0, 0, 0, .25)',
            xl: '5px 5px 3px rgba(0, 0, 0, .25)',
          },

          headings: {
            fontFamily: 'Roboto, sans-serif',
            sizes: {
              h1: { fontSize: '2rem' },
            },
          },
        }}
      >
        {children}
      </Mantine>
    </ColorSchemeProvider>
  );
};
