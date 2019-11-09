import store from '@/store';

export function getUserAuthority() {
    return store.state.role;
} // 用户的权限

export function checkAuthority(authority) {
    const user = getUserAuthority();
    return user.some(item => authority.includes(item));
}