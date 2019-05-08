import Vue from 'vue'
import VueRouter from 'vue-router'
// BASE_ENV=production
console.log(process.env.enviroment)
const enviroment = process.env.enviroment === 'production' ? 'production' : 'development'
const _import = require(`./import_${enviroment}`)

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: _import('login/index')
  },
  {
    path: '/message',
    component: _import('shortmessage/index')
  },
  {
    path: '/budget',
    component: _import('budget/index')
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
