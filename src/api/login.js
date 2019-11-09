import axios from '@/utils/axios.js';

export function _login(userInfo) {
    const url = '/api/login';
    return axios({
        url: url,
        method: 'post',
        data: userInfo
    })
}

export function _getUserInfo() {
    const url = '/api/getUserInfo';
    return axios({
        url: url,
        method: 'get'
    })
}