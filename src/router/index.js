import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import _ from 'lodash';
import {checkAuthority} from '@/utils/auth.js';
import store from '../store';
import {Message} from 'element-ui';
import Home from '@/views/home/index.vue';
import Readme from '@/views/home/Readme.vue';

Vue.use(VueRouter);

const baseRoutes = [
	{
		path: '/401',
		component: () => import('@/views/error/401.vue'),
		name: '401',
		meta: {
			authority: ['user', 'admin'],
			hidden: true //代表隐藏 不在侧边栏显示
		}
	},
	{
		path: '/404',
		component: () => import('@/views/error/404.vue'),
		name: '404',
		meta: {
			authority: ['user', 'admin'],
			hidden: true //代表隐藏 不在侧边栏显示
		}
	},
	{
		path: '/500',
		component: () => import('@/views/error/500.vue'),
		name: '500',
		meta: {
			authority: ['user', 'admin'],
			hidden: true //代表隐藏 不在侧边栏显示
		}
	},
	{
		path: '/login',
		name: '登录',
		component: () => import('@/views/login/index.vue'),
		meta: {
			authority: ['user', 'admin'],
			hidden: true //代表隐藏 不在侧边栏显示
		}
	},
	{
		path: '/',
		name: 'README',
		component: Home,
		redirect: '/readme',
		meta: {
			authority: ['user', 'admin'],
			hidden: false,
			icon: 'el-icon-eleme'
		},
		children: [
			{
				path: 'readme',
				component: Readme,
				name: 'readme',
				meta: {
					authority: ['user', 'admin'],
					hidden: true //代表隐藏 不在侧边栏显示
				}
			}
		]
	},
	{
		path: '*',
		component: () => import('@/views/error/404.vue'),
		meta: {
			authority: ['user', 'admin'],
			hidden: true //代表隐藏 不在侧边栏显示
		}
	}
];

export const dynamicRoutes = [
	{
		path: '/user',
		name: '用户管理',
		component: Home,
		redirect: '/user/user-list',
		meta: {
			authority: ['user', 'admin'],
			hidden: false,
			icon: 'el-icon-user'
		},
		children: [
			{
				name: 'user-list',
				path: 'user-list',
				component: () => import('@/views/User.vue')
			}
		]
	},
	{
		path: '/permission',
		name: '权限管理',
		component: Home,
		redirect: '/permission/permission-list',
		meta: {
			authority: ['admin'],
			hidden: false,
			icon: 'el-icon-cpu'
		},
		children: [
			{
				path: 'permission-list',
				name: 'permission-list',
				component: () => import('@/views/PermissionList.vue')
			},
			{
				path: 'permission-add',
				name: 'permission-add',
				component: () => import('@/views/PermissionAdd.vue')
			}
		]
	}
];

const router = new VueRouter({
	mode: 'hash',
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
				const {role} = await store.dispatch('getUserInfo');
				const generate = dynamicRoutes.filter(
					route =>
						checkAuthority(route.meta.authority) &&
						!route.meta.hidden
				);
				const routes = router.options.routes
					.concat(generate)
					.filter(route => !route.meta.hidden);
				store.commit('set_all_routes', routes);
				router.addRoutes(generate);
			} catch (error) {
				next(`/login?redirect=${to.path}`);
				NProgress.done();
			}
		}

		const record = _.findLast(to.matched, record => record.meta.authority);
		if (record && !checkAuthority(record.meta.authority)) {
			next({
				path: '/503'
			});
			NProgress.done();
		} else {
			next();
			NProgress.done();
		}
	} else {
		// no token
		if (whiteList.indexOf(to.path) !== -1) {
			next();
		} else {
			next({path: '/login'});
			NProgress.done();
		}
	}
});

router.afterEach(() => {
	NProgress.done();
});

export default router;
