import Vue from 'vue'
import App from './app'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from '@/router'

import directives from '@/directives'

Vue.use(ElementUI)

for (const key in directives) {
  Vue.use(directives[key])
}

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
