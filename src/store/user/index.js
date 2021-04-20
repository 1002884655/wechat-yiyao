
import Api from '../../util/Api/index'
import ToolClass from '../../util/PublicMethod/index'

export default {
  namespaced: true,
  state: {
    UserInfo: null // 用户信息
  },
  mutations: {
    EditUserInfo (state, data) { // 编辑用户信息
      state.UserInfo = {
        ...state.UserInfo || {},
        [data.name]: data.value
      }
    },
    UpdateUserInfo (state, data) {
      state.UserInfo = { ...state.UserInfo, ...data }
    }
  },
  actions: {
    WxGetPhoneAuth (context, payload) { // 微信获取手机号
      return new Promise((resolve, reject) => {
        ToolClass.ToolRequest({ url: Api.WxGetPhoneAuth.url, method: Api.WxGetPhoneAuth.method, ...payload, success (res) { resolve(res) }, error (res) { reject(res) } })
      })
    },
    WxLogin (context, payload) { // 微信登录
      return new Promise((resolve, reject) => {
        ToolClass.ToolRequest({ url: Api.WxLogin.url, method: Api.WxLogin.method, ...payload, success (res) { context.commit('UpdateUserInfo', { ...res.data.data.person, sessionKey: res.data.data.sessionKey }); resolve(res) }, error (res) { reject(res) } })
      })
    },
    UpdateUserInfo (context, payload) { // 更新用户信息
      return new Promise((resolve, reject) => {
        ToolClass.ToolRequest({ url: Api.UpdateUserInfo.url, method: Api.UpdateUserInfo.method, ...payload, success (res) { context.commit('UpdateUserInfo', res.data.data.person); resolve(res) }, error (res) { reject(res) } })
      })
    }
  }
}
