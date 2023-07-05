import { useState, type FC } from 'react';
import s from './LoginForm.module.scss';
import { hasLength, useForm, isEmail } from '@mantine/form';
import { Button, Group, PasswordInput, Tabs, TextInput, Text } from '@mantine/core';
import { loginByEmail } from '../model/services/loginByEmail/loginByEmail';
import { useSelector } from 'react-redux';
import { getAuthIsLoading } from '../model/selectors/getAuthIsLoading/getAuthIsLoading';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch';
import { registration } from '../model/services/registration/registration';
import { getLoginError } from '../model/selectors/getLoginError/getIsAuth';

interface LoginFormProps {
  styles?: React.CSSProperties;
}

export const LoginForm: FC<LoginFormProps> = ({ styles }) => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getAuthIsLoading);
  const loginError = useSelector(getLoginError);
  const [registrationError, setRegistrationError] = useState('');
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
    },
  });

  const onLogin = async () => {
    const response = await dispatch(loginByEmail(form.values));
  };

  const onRegistration = async () => {
    const response = await dispatch(registration(form.values));
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
            {loginError && <Text color="red">{loginError}</Text>}
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
            {/* {error && <Text color="red">{error}</Text>} */}
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
