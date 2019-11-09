import axios from 'axios';
import store from '../store';

const instance = axios.create({
    timeout: 10000
})

instance.interceptors.request.use(config => {
    const token = window.localStorage.getItem('token') || store.state.token;
    if(token) {
        config.headers.token = token;
    }
    return config;
}, error => {
    return Promise.reject(error);
})

instance.interceptors.response.use(response => {
    return response.data;
}, error => {
    return Promise.reject(error);
})

export default instance;
