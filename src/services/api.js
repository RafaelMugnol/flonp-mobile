/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import NavigationService from './navigationService';

const baseURLApi = 'https://projemerc.azurewebsites.net/api';
let obtendoToken = false;

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

  if (error.response.status === 401 && !originalRequest._retry) {
    if (obtendoToken)
      return api(originalRequest);


    originalRequest._retry = true;
    obtendoToken = true;

    const refreshTokenOld = await AsyncStorage.getItem('refreshToken');
    const email = await AsyncStorage.getItem('email');

    return axios.post(`${baseURLApi}/AccountCliente/Login`,
      {
        grantType: 'refresh_token',
        refreshToken: refreshTokenOld,
        email,
      })
      .then(async (res) => {
        if (res.status === 200 && res.data.authenticated) {
          const { accessToken, refreshToken } = res.data;

          await AsyncStorage.setItem('accessToken', accessToken);
          await AsyncStorage.setItem('refreshToken', refreshToken);

          return api(originalRequest);
        }

        // Caso deu erro ao recarregar o token ir para página de login
        await AsyncStorage.setItem('accessToken', '');
        NavigationService.navigate('Login');
        return null;
      })
      .catch(async () => {
        await AsyncStorage.setItem('accessToken', '');
        NavigationService.navigate('Login');
        return null;
      })
      .finally(() => {
        obtendoToken = false;
      });
  }

  return Promise.reject(error.response);
});

export default api;
