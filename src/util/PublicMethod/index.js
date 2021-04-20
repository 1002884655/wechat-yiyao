import qs from 'qs'
const ToolClass = {
  DateFormat (timestamp) { // 格式化时间
    if (timestamp) {
      let YY = new Date(timestamp).getFullYear()
      let MM = new Date(timestamp).getMonth() + 1
      let DD = new Date(timestamp).getDate()
      let hh = new Date(timestamp).getHours()
      let mm = new Date(timestamp).getMinutes()
      return `${YY}-${MM > 9 ? MM : '0' + MM}-${DD > 9 ? DD : '0' + DD} ${hh > 9 ? hh : '0' + hh}:${mm > 9 ? mm : '0' + mm}`
    }
  },
  ReplaceURLParams (url, params) {
    const args = { ...(params || {}), org: 'MQ' }
    return Object.keys(args).reduce((acc, k) => { // 此方法对每个元素进行处理
      const re = new RegExp(`:${k}(?!w)`, 'i')
      return acc.replace(re, args[k])
    }, url)
  },
  WxRequest (config) {
    this.ToolRequest({
      url: config.url,
      method: config.method,
      ...(config.data || {}),
      success (res) {
        config.success(res)
      },
      error (res) {
        config.error(res)
      }
    })
  },
  ToolRequest (config) { // 网络请求
    let _that = this
    let urlData = qs.stringify(config.urlData)
    let queryData = qs.stringify(config.queryData)
    if (config.url.indexOf(':') > -1) {
      if (typeof config.urlData === 'object') {
        config.url = this.ReplaceURLParams(config.url, config.urlData)
      } else {
        config.url = config.url.slice(0, config.url.indexOf(':')) + urlData
      }
    }
    if (queryData) {
      config.url += '?' + queryData
    }
    let Header = {}
    if (wx.getStorageSync('token') !== '' && wx.getStorageSync('tokentime') !== '' && wx.getStorageSync('tokentime') - 0 + 24 * 60 * 60 * 1000 >= Date.now()) { // 本地获取token
      Header['X-Authorization-JWT'] = wx.getStorageSync('token')
    }
    wx.request({
      url: `${SERVER_API}${config.url}`,
      method: config.method,
      ...(config.data || {}),
      header: { ...Header },
      success: (res) => {
        const token = res.header['X-Authorization-JWT'] || res.header['X-Authorization-Jwt']
        if (token) { // 更新本地存储token
          wx.setStorageSync('token', token)
          wx.setStorageSync('tokentime', Date.now())
        }
        if (res.data.code - 0 === 1001) { // token失效
          // wx.login({ // 微信获取code
          //   success (subRes) {
          //     wx.request({ // 登录获取token
          //       url: `${SERVER_API}/login?code=${subRes.code}`,
          //       method: `post`,
          //       success: (cRes) => {
          //         const token = cRes.header['X-Authorization-JWT'] || cRes.header['X-Authorization-JWT']
          //         if (token) { // 更新本地存储token
          //           wx.setStorageSync('token', token)
          //           _that.WxRequest(config) // 获得token之后重新请求接口
          //         }
          //       }
          //     })
          //   }
          // })
        }
        if (config.success !== undefined && res.data.code - 0 === 1000) {
          config.success(res)
        }
        if (config.error !== undefined && res.data.code - 0 !== 1000) {
          config.error(res)
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: (res) => {
        if (res.header['X-Authorization-JWT'] !== undefined) { // 更新本地存储token
          wx.setStorageSync('token', res.header['X-Authorization-JWT'])
        }
        if (res.data.code - 0 === 1001) { // token失效
          // wx.navigateTo({ url: '../../pages/SignIn/index' })
          config.error('登录失效')
        }
        if (config.error !== undefined) {
          config.error(res)
        }
      }
    })
  }
}

export default ToolClass
