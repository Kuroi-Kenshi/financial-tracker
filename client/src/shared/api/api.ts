import axios from 'axios';

const API = __API__ + '/api/';

export const $api = axios.create({
  withCredentials: true,
  baseURL: API,
});

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    console.log('error.response', error);

    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get(`${API}refresh`, { withCredentials: true });
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
