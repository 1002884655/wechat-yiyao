import observe from './observe'

const monitor = observe()

// 只执行一次
let done = false

// VUEX 插件
export function storeAuthPlugin(store) {
  store.subscribe((mutation, state) => {
    if (!done && mutation.type === 'user/EditUserInfo') {
      monitor.notify()
      done = true
    }
  })
}

// VUE 插件
export function vueAuthPlugin(Vue, options) {
  // 添加实例 $authed 方法
  Vue.prototype.$authed = function(next) {
    if (done) {
      next()
    } else {
      monitor.subscribe(next)
    }
  }
}
