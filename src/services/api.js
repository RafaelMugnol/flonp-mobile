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

export default api;