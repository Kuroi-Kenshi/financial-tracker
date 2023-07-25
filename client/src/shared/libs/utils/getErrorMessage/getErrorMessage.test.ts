import { AxiosError } from 'axios';
import { getErrorMessage } from './getErrorMessage';

describe('getErrorMessage tests', () => {
  test('axios instance error', () => {
    const errorMessage = 'Контрагент с таким именем уже существует';
    const error = new AxiosError();
    //@ts-ignore
    error.response = {
      data: {
        message: errorMessage,
      },
    };

    const errorMsg = getErrorMessage(error);
    expect(errorMsg).toEqual(errorMessage);
  });

  test('Error instance error', () => {
    const errorMessage = 'Обычная ошибка';
    const error = new Error(errorMessage);

    const errorMsg = getErrorMessage(error);
    expect(errorMsg).toEqual(errorMessage);
  });

  test('Unexpected error', () => {
    const errorMsg = getErrorMessage('Неопознанная ошибка');
    expect(errorMsg).toEqual('Неопознанная ошибка');
  });
});
