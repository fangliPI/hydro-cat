import Vue from 'vue'
import Router from 'vue-router'
import page_login from '@/components/page_login'
import page_enter from '@/components/page_enter'
import page_evaluate from '@/components/page_evaluate'
import page_result from '@/components/page_result'

Vue.use(Router)

const router =  new Router({
	routes: [{
			path: '/',
			name: 'page_login',
			component: page_login
		},
		{
			path: '/page_enter',
			name: 'page_enter',
			component: page_enter,
			meta: {
				requireAuth: true
			}
		},
		{
			path: '/page_evaluate/:checked_comps',
			name: 'page_evaluate',
			component: page_evaluate,
			meta: {
				requireAuth: true
			}
		},
		{
			path: '/page_result/:time_now',
			name: 'page_result',
			component: page_result,
			meta: {
				requireAuth: true
			}
		}
	]
})

/** 验证用户是否登录 **/
router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requireAuth)) {
		if (localStorage.getItem('jwt') == null) {
			next({
				path: '/'
			});
		} else {
			next();
		}
	} else {
		next();
	}
})

export default router;