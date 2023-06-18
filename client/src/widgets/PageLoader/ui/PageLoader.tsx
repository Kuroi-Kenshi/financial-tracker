import { Loader } from '@mantine/core';
import cls from './PageLoader.module.scss';

interface PageLoaderProps {
  className?: string;
}

export const PageLoader = ({ className }: PageLoaderProps) => (
  <div>
    <Loader color="indigo" size="xl" variant="bars" />
  </div>
);
