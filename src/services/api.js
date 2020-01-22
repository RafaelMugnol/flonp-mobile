import axios from 'axios';
import { AsyncStorage } from 'react-native';

const api = axios.create({
  baseURL: 'https://projemerc.azurewebsites.net/api',
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('accessToken');
  if (token && token !== '')
    config.headers.Authorization = `Bearer ${token}`;

  return config;
});

api.interceptors.response.use((response) => response, async (error) => {
  const originalRequest = error.config;

  if (error.response.status === 401 && originalRequest.url ===
    'http://13.232.130.60:8081/v1/auth/token') {
    // redireciona para o login
    return Promise.reject(error);
  }

  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const refreshTokenOld = await AsyncStorage.getItem('refreshToken');
    const email = await AsyncStorage.getItem('email');

    return axios.post('https://projemerc.azurewebsites.net/api/AccountCliente/Login',
      {
        grantType: "refresh_token",
        refreshToken: refreshTokenOld,
        email,
      })
      .then(async res => {
        if (res.status === 200) {
          const { accessToken, refreshToken } = res.data;

          await AsyncStorage.setItem('accessToken', accessToken);
          await AsyncStorage.setItem('refreshToken', refreshToken);

          axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
          originalRequest.headers['Authorization'] = 'Bearer ' + accessToken;
          return axios(originalRequest);
        }
      })
  }

  return Promise.reject(error.response);
});

export default api;