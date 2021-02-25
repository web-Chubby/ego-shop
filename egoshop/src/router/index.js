import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'
import Login from '../views/Login/index.vue'
import Content from '../views/Content/index.vue'
import Params from '../views/Params/index.vue'
import Product from '../views/Product/index.vue'

import store from '../store'
Vue.use(VueRouter)

const routes = [
	{
		path:'*',
		component:Layout,
		meta:{
			isLogin:false
		}
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
		meta:{
			isLogin:false
		}
	},
	{
		path: '/',
		component: Layout,
		children: [
			{
				path:'/',
				redirect:'product'
			},
			{
				path: 'content',
				component: Content,
				meta:{
					isLogin:true
				}
			},
			{
				path: 'params',
				component: Params,
				meta:{
					isLogin:true
				}
			},
			{
				path: 'product',
				component: Product,
				meta:{
					isLogin:true
				}
			}
		]
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to,from,next)=>{
	if (!to.meta.isLogin) {
		next()
	} else {
		if (store.state.loginModule.token) {
			next()
		} else {
			next({
				path: '/login'
			})
		}
	}
})

export default router
