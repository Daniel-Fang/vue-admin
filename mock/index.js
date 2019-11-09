import Mock from 'mockjs';
import { login, getUserInfo } from './login.js';

Mock.setup({
    timeout: 500
})

Mock.mock(/\/api\/login/, 'post', login);
Mock.mock(/\/api\/getUserInfo/, 'get', getUserInfo);

export default Mock;