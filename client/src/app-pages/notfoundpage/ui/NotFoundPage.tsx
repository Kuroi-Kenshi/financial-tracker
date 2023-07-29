import { Page } from '@/widgets/Page';
import { Flex } from '@mantine/core';

export const NotFoundPage = () => {
  return (
    <Page>
      <Flex justify="center" align="center" data-testid="NotFoundPage">
        Страница не найдена
      </Flex>
    </Page>
  );
};
