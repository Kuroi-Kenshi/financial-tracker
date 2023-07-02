import { useState, type FC } from 'react';
import s from './LoginForm.module.scss';
import { hasLength, useForm, isEmail } from '@mantine/form';
import { Button, Group, PasswordInput, Tabs, TextInput, Text } from '@mantine/core';
import { loginByEmail } from '../model/services/loginByEmail/loginByEmail';
import { useSelector } from 'react-redux';
import { getAuthIsLoading } from '../model/selectors/getAuthIsLoading/getAuthIsLoading';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch';
import { registration } from '../model/services/registration/registration';

interface LoginFormProps {
  styles?: React.CSSProperties;
}

export const LoginForm: FC<LoginFormProps> = ({ styles }) => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getAuthIsLoading);
  const [error, setError] = useState(null);
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      name: '',
      avatarPath: '',
    },

    validate: {
      email: isEmail('Введите корректный email'),
      password: hasLength({ min: 2 }, 'Пароль должен быть длиннее чем 1 символ'),
      name: hasLength({ min: 1 }, 'Введите имя'),
    },
  });

  const onLogin = async () => {
    const { email, password } = form.values;
    const authResult = await dispatch(loginByEmail(form.values));
    // const response = await store.login(username, password);

    // if (response.status !== 200) {
    //   setError(response?.data?.message)
    // }
  };

  const onRegistration = async () => {
    console.log('register');

    const { email, password } = form.values;
    dispatch(registration(form.values));

    // const response = await store.registration(username, password)

    // if (response.status !== 200) {
    //   setError(response?.data?.message)
    // }
  };

  return (
    <div style={styles}>
      <Tabs defaultValue="login" variant="outline" style={{ width: '350px' }}>
        <Tabs.List>
          <Tabs.Tab value="login">Вход</Tabs.Tab>
          <Tabs.Tab value="signIn">Регистрация</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="login" pt="md">
          <form onSubmit={form.onSubmit(onLogin)}>
            <TextInput
              label="Email"
              placeholder="Email"
              withAsterisk
              {...form.getInputProps('email')}
            />
            <PasswordInput
              placeholder="Password"
              label="Password"
              mt="md"
              withAsterisk
              {...form.getInputProps('password')}
            />
            {error && <Text color="red">{error}</Text>}
            <Group position="right" mt="md">
              <Button type="submit" disabled={isLoading}>
                Войти
              </Button>
            </Group>
          </form>
        </Tabs.Panel>

        <Tabs.Panel value="signIn" pt="md">
          <form onSubmit={form.onSubmit(onRegistration)}>
            <TextInput
              label="Email"
              placeholder="Email"
              withAsterisk
              {...form.getInputProps('email')}
            />
            <TextInput
              label="Name"
              placeholder="Name"
              withAsterisk
              {...form.getInputProps('name')}
            />
            <PasswordInput
              placeholder="Password"
              label="Password"
              mt="md"
              withAsterisk
              {...form.getInputProps('password')}
            />
            {error && <Text color="red">{error}</Text>}
            <Group position="right" mt="md">
              <Button type="submit" disabled={isLoading}>
                Зарегистрироваться
              </Button>
            </Group>
          </form>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};
