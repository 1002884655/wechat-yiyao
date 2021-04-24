
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
    },
    GetCurrentPersonInfo (context, payload) { // 获取当前人员信息
      return new Promise((resolve, reject) => {
        ToolClass.ToolRequest({ url: Api.GetCurrentPersonInfo.url, method: Api.GetCurrentPersonInfo.method, ...payload, success (res) { context.commit('UpdateUserInfo', res.data.data); resolve(res) }, error (res) { reject(res) } })
      })
    },
    GetArticleDetail (context, payload) { // 获取文章详情
      return new Promise((resolve, reject) => {
        ToolClass.ToolRequest({ url: Api.GetArticleDetail.url, method: Api.GetArticleDetail.method, ...payload, success (res) { resolve(res) }, error (res) { reject(res) } })
      })
    },
    SaveArticle (context, payload) { // 收藏文章
      return new Promise((resolve, reject) => {
        ToolClass.ToolRequest({ url: Api.SaveArticle.url, method: Api.SaveArticle.method, ...payload, success (res) { resolve(res) }, error (res) { reject(res) } })
      })
    },
    DeleteSaveArticle (context, payload) { // 取消收藏文章
      return new Promise((resolve, reject) => {
        ToolClass.ToolRequest({ url: Api.DeleteSaveArticle.url, method: Api.DeleteSaveArticle.method, ...payload, success (res) { resolve(res) }, error (res) { reject(res) } })
      })
    },
    GetMySavedArticleList (context, payload) { // 获取我的收藏文章列表
      return new Promise((resolve, reject) => {
        ToolClass.ToolRequest({ url: Api.GetMySavedArticleList.url, method: Api.GetMySavedArticleList.method, ...payload, success (res) { resolve(res) }, error (res) { reject(res) } })
      })
    },
    GetMyReadRecords (context, payload) { // 获取我的阅读记录
      return new Promise((resolve, reject) => {
        ToolClass.ToolRequest({ url: Api.GetMyReadRecords.url, method: Api.GetMyReadRecords.method, ...payload, success (res) { resolve(res) }, error (res) { reject(res) } })
      })
    },
    GetMyMedicalRecords (context, payload) { // 获取我的就诊记录
      return new Promise((resolve, reject) => {
        ToolClass.ToolRequest({ url: Api.GetMyMedicalRecords.url, method: Api.GetMyMedicalRecords.method, ...payload, success (res) { resolve(res) }, error (res) { reject(res) } })
      })
    },
    GetArticleTypeList (context, payload) { // 获取文章分类
      return new Promise((resolve, reject) => {
        ToolClass.ToolRequest({ url: Api.GetArticleTypeList.url, method: Api.GetArticleTypeList.method, ...payload, success (res) { resolve(res) }, error (res) { reject(res) } })
      })
    }
  }
}
