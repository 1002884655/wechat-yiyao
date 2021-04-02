
// import Api from '../../util/Api/index'
// import ToolClass from '../../util/PublicMethod/index'

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
    }
  },
  actions: {
    // UpdateUserInfo (context, payload) { // 更新用户信息
    //   return new Promise((resolve, reject) => {
    //     ToolClass.WxRequest({
    //       url: Api.UpdateUserInfo.url,
    //       method: Api.UpdateUserInfo.method,
    //       ...payload,
    //       success (res) {
    //         resolve(res)
    //       },
    //       error (res) {
    //         reject(res)
    //       }
    //     })
    //   })
    // }
  }
}
