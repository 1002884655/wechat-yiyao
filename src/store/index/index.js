
import Api from '../../util/Api/index'
import ToolClass from '../../util/PublicMethod/index'

export default {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
    GetIndexBanner (context, payload) { // 获取首页banner
      return new Promise((resolve, reject) => {
        ToolClass.ToolRequest({ url: Api.GetIndexBanner.url, method: Api.GetIndexBanner.method, ...payload, success (res) { resolve(res) }, error (res) { reject(res) } })
      })
    },
    GetIndexHotList (context, payload) { // 获取首页热门列表
      return new Promise((resolve, reject) => {
        ToolClass.ToolRequest({ url: Api.GetIndexHotList.url, method: Api.GetIndexHotList.method, ...payload, success (res) { resolve(res) }, error (res) { reject(res) } })
      })
    },
    GetIndexNewestArticle (context, payload) { // 获取最新文章
      return new Promise((resolve, reject) => {
        ToolClass.ToolRequest({ url: Api.GetIndexNewestArticle.url, method: Api.GetIndexNewestArticle.method, ...payload, success (res) { resolve(res) }, error (res) { reject(res) } })
      })
    },
    GetSearchArticleList (context, payload) { // 获取搜索文章列表
      return new Promise((resolve, reject) => {
        ToolClass.ToolRequest({ url: Api.GetSearchArticleList.url, method: Api.GetSearchArticleList.method, ...payload, success (res) { resolve(res) }, error (res) { reject(res) } })
      })
    }
  }
}
