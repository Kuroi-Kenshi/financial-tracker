import axios from 'axios';

export const $api = axios.create({
  withCredentials: true,
  baseURL: __API__,
});

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    console.log('error.response', error);

    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get(`${__API__}auth/refresh`, { withCredentials: true });
        // тут надо записать accessToken в store
        setupInterceptor(response.data.accessToken);
        return $api.request(originalRequest);
      } catch (error) {
        console.error('Пользователь не авторизован');
      }
    }
  }
);

export const setupInterceptor = (accessToken: string | undefined) => {
  $api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${accessToken || ''}`;
    return config;
  });
};
