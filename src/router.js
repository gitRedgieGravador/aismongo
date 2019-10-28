import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Create from './views/Create.vue'
import Login from './views/Login.vue'
import store from './store'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            beforeEnter: (to, from, next) => {
                if (store.state.authenticated == false) {
                    next('/');
                } else {
                    next();
                }
            }
        },
        {
            path: '/create',
            name: 'create',
            component: Create,
            beforeEnter: (to, from, next) => {
                if (store.state.authenticated == false) {
                    next('/');
                } else {
                    next();
                }
            }
        },
        {
            path: '/update/:id',
            name: 'update',
            component: Create,
            props: true,
            beforeEnter: (to, from, next) => {
                if (store.state.authenticated == false) {
                    next('/');
                } else {
                    next();
                }
            }
        },
        {
            path: '/delete/:id',
            name: 'delete',
            component: Home,
            props: true,
            beforeEnter: (to, from, next) => {
                if (store.state.authenticated == false) {
                    next('/');
                } else {
                    next();
                }
            }
        }
    ]
})