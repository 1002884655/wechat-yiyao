
const prefix = process.env.NODE_ENV === 'production' ? '' : ''

const Api = {
  UpdateUserInfo: { // 更新用户信息
    method: 'post',
    url: `${prefix}/person/:id`
  }
}

export default Api
