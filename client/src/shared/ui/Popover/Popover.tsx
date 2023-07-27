import { Button, Group, Popover, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { type FC, useState } from 'react';

interface DeletionPopoverProps {
  text: string;
  callbackApprove?: () => void;
}

export const DeletionPopover: FC<DeletionPopoverProps> = ({ text, callbackApprove }) => {
  const [opened, setOpened] = useState(false);
  return (
    <Popover
      width={300}
      position="bottom"
      withArrow
      shadow="md"
      opened={opened}
      onChange={setOpened}
      data-testid="DeletionPopover"
    >
      <Popover.Target>
        <IconTrash
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setOpened((o) => !o);
          }}
        />
      </Popover.Target>
      <Popover.Dropdown
        sx={(theme) => ({
          background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        })}
      >
        <Text size="sm" mb="xs" weight={500}>
          {text}
        </Text>

        <Group position="apart" mt="lg">
          <Button
            color="red"
            onClick={() => {
              setOpened((o) => !o);
            }}
          >
            Отмена
          </Button>
          <Button onClick={callbackApprove}>Да</Button>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
};
