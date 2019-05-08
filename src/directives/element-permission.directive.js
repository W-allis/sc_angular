import store from '@/store'

export const elpmis = {
  inserted(el, binding) {
    if (store.state.mock.indexOf(binding.value) < 0) {
      el.parentNode.removeChild(el)
    }
  }
}

const install = function(Vue) {
  Vue.directive('elpmis', elpmis)
}

if (window.Vue) {
  console.log(Vue) // eslint-disable-line
  Vue.use({ install }) // eslint-disable-line
}

export default { install }
