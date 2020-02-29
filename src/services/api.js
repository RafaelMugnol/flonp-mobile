/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import NavigationService from './navigationService';

const baseURLApi = 'https://projemerc.azurewebsites.net/api';

const api = axios.create({
  baseURL: baseURLApi,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('accessToken');

  if (token && token !== '')
    config.headers.Authorization = `Bearer ${token}`;

  return config;
});

api.interceptors.response.use((response) => response, async (error) => {
  const originalRequest = error.config;

  if (error.response.status === 401 && originalRequest.url
    === `${baseURLApi}/AccountCliente/Login`) {
    await AsyncStorage.setItem('accessToken', '');
    NavigationService.navigate('Login');

    return Promise.reject(error);
  }

  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const refreshTokenOld = await AsyncStorage.getItem('refreshToken');
    const email = await AsyncStorage.getItem('email');

    return axios.post(`${baseURLApi}/AccountCliente/Login`,
      {
        grantType: 'refresh_token',
        refreshToken: refreshTokenOld,
        email,
      })
      .then(async (res) => {
        if (res.status === 200) {
          const { accessToken, refreshToken } = res.data;

          await AsyncStorage.setItem('accessToken', accessToken);
          await AsyncStorage.setItem('refreshToken', refreshToken);

          axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axios(originalRequest);
        }

        return null;
      });
  }

  return Promise.reject(error.response);
});

export default api;
