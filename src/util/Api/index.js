
const prefix = process.env.NODE_ENV === 'production' ? '/api' : '/api'

const Api = {
  WxGetPhoneAuth: { // 微信获取手机号
    method: 'put',
    url: `${prefix}/ma/auth-phone`
  },
  WxGetUserIconAuth: { // 微信获取用户头像
    method: 'post',
    url: `${prefix}/ma/auth-user`
  },
  WxLogin: { // 微信登录
    method: 'post',
    url: `${prefix}/ma/login`
  },
  UpdateUserInfo: { // 更新用户信息
    method: 'put',
    url: `${prefix}/ma/person`
  },
  GetIndexBanner: { // 获取首页banner
    method: 'get',
    url: `${prefix}/ma/index/banner`
  },
  GetIndexHotList: { // 获取首页热门列表
    method: 'get',
    url: `${prefix}/ma/index/topic`
  },
  GetIndexNewestArticle: { // 获取最新文章
    method: 'get',
    url: `${prefix}/ma/index/post`
  },
  GetSearchArticleList: { // 获取搜索文章列表
    method: 'get',
    url: `${prefix}/ma/post`
  },
  GetCurrentPersonInfo: { // 获取当前人员信息
    method: 'get',
    url: `${prefix}/ma/currentPerson`
  },
  GetArticleDetail: { // 获取文章详情
    method: 'get',
    url: `${prefix}/ma/post/:id`
  },
  SaveArticle: { // 收藏文章
    method: 'post',
    url: `${prefix}/ma/post-save`
  },
  DeleteSaveArticle: { // 取消收藏文章
    method: 'delete',
    url: `${prefix}/ma/post-save`
  },
  GetMySavedArticleList: { // 获取我的收藏文章列表
    method: 'get',
    url: `${prefix}/ma/post-save`
  },
  GetMyReadRecords: { // 获取我的阅读记录
    method: 'get',
    url: `${prefix}/ma/read-log`
  },
  GetMyMedicalRecords: { // 获取我的就诊记录
    method: 'get',
    url: `${prefix}/ma/medical-log`
  }
}

export default Api
