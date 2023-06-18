import { Dispatch, SetStateAction, memo } from 'react';
import {
  Burger,
  MediaQuery,
  Text,
  Header as MHeader,
  Group,
  ActionIcon,
  useMantineColorScheme,
} from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';

interface HeaderProps {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}

export const Header = memo(({ opened, setOpened }: HeaderProps) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  console.log('colorScheme', colorScheme);

  return (
    <MHeader height={{ base: 50, md: 70 }} p="md">
      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            // color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>
        <Group sx={{ height: '100%' }} px={20} position="apart">
          {/* <Logo colorScheme={theme.colorScheme} /> */}
          <ActionIcon
            variant="default"
            color={dark ? 'dark' : 'light'}
            onClick={() => toggleColorScheme()}
            size={30}
          >
            {colorScheme === 'dark' ? (
              <IconSun size="1rem" />
            ) : (
              <IconMoonStars size="1rem" />
            )}
          </ActionIcon>
        </Group>
        <Text>Application header</Text>
      </div>
    </MHeader>
  );
});
