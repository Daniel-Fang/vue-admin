import Vue from "vue";
import Vuex from "vuex";
import { _login, _getUserInfo } from '@/api/login.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: '',
    token: '',
    role: [],
    routes: []
  },
  getters: {

  },
  mutations: {
    token(state, token) {
      state.token = token;
      window.localStorage.setItem('token', token);
    },
    username(state, username) {
      state.username = username;
      window.localStorage.setItem('username', username);
    },
    role(state, role) {
      state.role = role;
      window.localStorage.setItem('role', role);
    },
    set_all_routes(state, routes) {
      state.routes = routes;
    }
  },
  actions: {
    login({ commit}, userInfo) {
      return new Promise((resolve, reject) => {
        _login(userInfo).then(res => {
          commit('token', res.token);
          resolve();
        }).catch(error => {
          reject(error)
        })
      })
    },
    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        _getUserInfo().then(res => {
          commit('username', res.username);
          commit('role', res.role);
          resolve(res);
        }).catch(error => {
          reject(error)
        })
      })
    }
  },
  modules: {

  }
});
