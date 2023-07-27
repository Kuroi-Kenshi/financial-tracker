import { type ColorScheme, ColorSchemeProvider, MantineProvider as Mantine } from '@mantine/core';
import { type ReactNode, useState } from 'react';

interface MantineProviderProps {
  children: ReactNode;
}

export const MantineProvider = ({ children }: MantineProviderProps) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value ?? (colorScheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <Mantine
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme,
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
