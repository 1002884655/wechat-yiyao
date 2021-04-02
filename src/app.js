import Taro from '@tarojs/taro'
import Vue from 'vue'
import { vueAuthPlugin } from '@/util/auth-plugin'
import store from './store/index'

import './app.scss'
import './assets/css/iconfont.css'

// Vue.config.productionTip = false

// 引入项目通用（顶层）方法对象
import ToolClass from './util/PublicMethod/index'
Vue.prototype.ToolClass = ToolClass

Vue.use(vueAuthPlugin)

const App = new Vue({
  store,
  onLaunch (options) {
    this.login(options)
  },
  render (h) {
    // this.$slots.default 是将要会渲染的页面
    return h('block', this.$slots.default)
  },
  methods: {
    login (options) {
      Taro.login({
        success (res) {
          if (res.code) {
            console.log(`登录成功，登录信息${res}`)
          } else {
            Taro.showToast({
              title: '初始化失败, 请退出重试',
              icon: 'none',
              duration: 3000
            })
          }
        }
      })
    }
  }
})

export default App
