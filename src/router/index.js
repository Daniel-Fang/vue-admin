import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import _ from 'lodash';
import {checkAuthority} from '@/utils/auth.js';
import store from '../store';
import { Message } from 'element-ui';
import Layout from '@/components/Layout.vue';

Vue.use(VueRouter);

const baseRoutes = [
	{
		path: '/',
		name: 'home',
		component: () => import('@/views/Home.vue'),
		meta: {
      authority: ['user', 'admin'],
      asidebar: true      
		}
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/Login.vue'),
		meta: {
      authority: ['user', 'admin'],
		}
	},
	{
		path: '/503',
		name: '503',
		component: () => import('@/views/503.vue'),
		meta: {
      authority: ['user', 'admin'],
		}
	},
	{
		path: '*',
		name: '404',
		component: () => import('@/views/404.vue'),
		meta: {
      authority: ['user', 'admin'],
		}
	}
];

export const dynamicRoutes = [
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/User.vue'),
    meta: {
      authority: ['user', 'admin'],
      asidebar: true     
    }
  },
  {
    path: '/permission',
    name: 'permission',
    component: Layout,
    redirect: '/permission/permission-list',
    meta: {
      authority: ['admin'],
      asidebar: true     
    },
    children: [
      {
        path: '/permission/permission-list',
        name: 'permission-list',
        component: () => import('@/views/PermissionList.vue')
      }
    ]
  }
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: baseRoutes
});

const whiteList = ['/503', '/404', '/login'];
router.beforeEach(async (to, from, next) => {
	if (to.path !== from.path) {
		NProgress.start();
	}
  const token = store.state.token || window.localStorage.getItem('token');
	if (token) {
    const role = store.state.role || window.localStorage.getItem('role');
		if (role.length === 0) {
      try {
        const { role } = await store.dispatch('getUserInfo');
        const generate = dynamicRoutes.filter(route => checkAuthority(route.meta.authority));
        const routes = router.options.routes.concat(generate);
        store.commit('set_all_routes', routes);
        router.addRoutes(generate);
      } catch (error) {
        Message.error(error || 'Has Error')
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
		}

    const record = _.findLast(to.matched, record => record.meta.authority);
		if (record && !checkAuthority(record.meta.authority)) {
			next({
        path: '/503'
      });
			NProgress.done();
		}else {
      next();
      NProgress.done();
    }
	} else {
    // no token
    if(whiteList.indexOf(to.path) !== -1) {
      next();
    }else {
      next({path: '/login'})
      NProgress.done();
    }
	}
});

router.afterEach(() => {
	NProgress.done();
});

export default router;
