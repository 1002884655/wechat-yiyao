
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
  }
}

export default Api
