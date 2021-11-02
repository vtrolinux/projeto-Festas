import { createRouter, createWebHistory, matchedRouteKey } from 'vue-router'
import store from '../store/index'
import Home from '../views/Home.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/register',
    name: 'Registro',
    component: () => import(/* webpackChunkName: "Register" */ '../views/Register.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "Profile" */ '../views/Profile.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "Dashboard" */ '../views/Dashboard.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//middleware do front, verifica a autenticação do usuario por rota (se assim necessario)
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    //Se o usuário nao estiver logado e a rota exigir autenticação, ele é redirecionado para o login
    if(store.getters.authenticated === false){
      next({
        path: 'login',
        params: {nextUrl: to.fullPath} //configuração do vue
      })
    }else {
      // se já estiver autenticado segue
      next()
    }
    console.log('tem auth')
  } else {
    next()
  }
})

export default router
