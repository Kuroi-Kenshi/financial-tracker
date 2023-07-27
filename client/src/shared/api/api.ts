import axios from 'axios';
import { setUserData } from './setUserData';

export const $api = axios.create({
  withCredentials: true,
  baseURL: __API__,
});

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    // eslint-disable-next-line eqeqeq
    if (error.response?.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get(`${__API__}auth/refresh`, { withCredentials: true });

        setUserData(response.data);
        setupInterceptor(response.data.accessToken);
        return await $api.request(originalRequest);
      } catch (error) {
        console.error('Пользователь не авторизован');
      }
    }

    throw error;
  }
);

export const setupInterceptor = (accessToken: string | undefined) => {
  $api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${accessToken ?? ''}`;
    return config;
  });
};
