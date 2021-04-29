import Taro from '@tarojs/taro'
import Vue from 'vue'
import { vueAuthPlugin } from '@/util/auth-plugin'
import store from './store/index'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions, mapMutations: mapUserMutations } = createNamespacedHelpers('user')

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
    // console.log(`options is`, options)
    // this.login(options)
  },
  render (h) {
    // this.$slots.default 是将要会渲染的页面
    return h('block', this.$slots.default)
  },
  computed: {
    ...mapUserState({
      UserInfo: x => x.UserInfo // 用户信息
    })
  },
  methods: {
    ...mapUserActions([
      'WxGetPhoneAuth',
      'WxLogin'
    ]),
    login (options) {
      const _that = this
      wx.login({
        success (res) {
          if (res.code) {
            _that.WxLogin({ queryData: { code: res.code } }).then((res) => {
              console.log('------------->', res)
              wx.setStorageSync('token', res.data.data.token)
              wx.setStorageSync('tokentime', Date.now())
            })
          } else {
            wx.showToast({
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
