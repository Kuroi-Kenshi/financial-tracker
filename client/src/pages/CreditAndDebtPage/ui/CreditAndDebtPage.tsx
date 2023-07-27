import { CounterpartList } from '@/entities/Counterpart';
import { CreditList } from '@/entities/Credit';
import { DebtList } from '@/entities/Debt';
import { Page } from '@/widgets/Page';
import { Button, Divider, Drawer, Flex, Group } from '@mantine/core';
import { useState } from 'react';

const CreditAndDebtPage = () => {
  const [categoryListOpened, setCategoryListOpened] = useState(false);

  return (
    <Page>
      <Flex direction="column" gap="5px">
        <Group mt="20px">
          {/* <Button color="indigo" onClick={() => setAddModalOpened(true)}>
            Добавить долг
          </Button> */}
          <Button
            color="cyan"
            onClick={() => {
              setCategoryListOpened(true);
            }}
          >
            Контрагенты
          </Button>
        </Group>
        <Flex gap={50} mt={35}>
          <DebtList />
          <Divider orientation="vertical" />
          <CreditList />
        </Flex>
      </Flex>
      <Drawer
        opened={categoryListOpened}
        onClose={() => {
          setCategoryListOpened(false);
        }}
        title="Список контрагентов"
      >
        <CounterpartList />
      </Drawer>
    </Page>
  );
};

export default CreditAndDebtPage;
