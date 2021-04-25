<template>
  <view class="MainPage">
    <slot></slot>
    <view class="PhoneAuthPopup" v-show="ShowPhoneAuthPopup">
      <view class="centerLabel">
        <text>授权手机号</text>
        <text>申请使用您的手机号</text>
        <view class="flex-h">
          <text @tap="ShowPhoneAuthPopup = false; $emit('UserInfoChange')">拒绝</text>
          <view class="flex-item"></view>
          <text>允许</text>
          <button open-type="getUserInfo" @getuserinfo="GetUserPhone">获取授权</button>
        </view>
      </view>
    </view>
    <view class="UserIconAuthPopup" v-show="ShowUserIconAuthPopup">
      <view class="centerLabel">
        <text>授权头像</text>
        <text>申请使用您的头像</text>
        <view class="flex-h">
          <text @tap="ShowUserIconAuthPopup = false; $emit('UserInfoChange')">拒绝</text>
          <view class="flex-item"></view>
          <text>允许</text>
          <button open-type="getUserInfo" @getuserinfo="GetUserIcon">获取授权</button>
        </view>
      </view>
    </view>
    <view class="StudentIdPopup" v-show="ShowStudentIdPopup">
      <view class="centerLabel">
        <text>完善信息</text>
        <text>去完善您的个人信息</text>
        <view>
          <navigator url="/pages/Mine/MyInfo/index">去完善</navigator>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions, mapMutations: mapUserMutations } = createNamespacedHelpers('user')
export default {
  name: 'MainPage',
  props: {
    Data: {
      default: null,
      type: Object
    }
  },
  data () {
    return {
      ShowPhoneAuthPopup: false,
      ShowUserIconAuthPopup: false,
      ShowStudentIdPopup: false,
      WxInfoData: {
        encryptedData: null,
        iv: null,
        rawData: null,
        signature: null
      }
    }
  },
  computed: {
    ...mapUserState({
      UserInfo: x => x.UserInfo // 用户信息
    })
  },
  components: {
  },
  created () {
    this.Init()
  },
  methods: {
    ...mapUserActions([
      'WxGetPhoneAuth',
      'WxLogin',
      'PutUserInfo'
    ]),
    ...mapUserMutations([
      'EditUserInfo'
    ]),
    Init () {
      const _that = this
      let CurrentPageRoute = Taro.getCurrentPages()[Taro.getCurrentPages().length - 1].route
      if (this.UserInfo === null) {
        wx.login({
          success (res) {
            _that.WxLogin({ queryData: { code: res.code } }).then((res) => {
              wx.setStorageSync('token', res.data.data.token)
              wx.setStorageSync('tokentime', Date.now())
              if (CurrentPageRoute !== 'pages/Index/index') { // 非首页
                // if (CurrentPageRoute !== '') { // 非首页
                if (!_that.UserInfo.avatar) { // 未授权头像
                  _that.ShowUserIconAuthPopup = true
                } else if (!_that.UserInfo.phone) { // 未授权手机号
                  _that.ShowPhoneAuthPopup = true
                } else {
                  _that.$emit('UserInfoChange')
                }
              } else {
                _that.$emit('UserInfoChange')
              }
            })
          }
        })
      } else {
        if (CurrentPageRoute !== 'pages/Index/index') { // 非首页
          // if (CurrentPageRoute !== '') { // 非首页
          if (!_that.UserInfo.avatar) { // 未授权头像
            _that.ShowUserIconAuthPopup = true
          } else if (!_that.UserInfo.phone) { // 未授权手机号
            _that.ShowPhoneAuthPopup = true
          } else {
            _that.$emit('UserInfoChange')
          }
        } else {
          _that.$emit('UserInfoChange')
        }
      }
    },
    GetUserIcon (e) {
      if (e.detail.userInfo.avatarUrl) {
        this.PutUserInfo({ data: { data: { avatar: e.detail.userInfo.avatarUrl, personId: this.UserInfo.personId } } }).then(() => {
          this.EditUserInfo({ name: 'avatar', value: e.detail.userInfo.avatarUrl })
          this.ShowUserIconAuthPopup = false
          if (!this.UserInfo.phone) {
            this.ShowPhoneAuthPopup = true
          }
        })
      } else {
        if (!this.UserInfo.phone) {
          this.ShowPhoneAuthPopup = true
        }
      }
    },
    GetUserPhone (e) {
      for (let key in this.WxInfoData) {
        this.WxInfoData[key] = e.detail[key]
      }
      this.WxGetPhoneAuth({ data: { data: { ...this.WxInfoData, sessionKey: this.UserInfo.sessionKey } } }).then((res) => {
        if (res.data.data.phone) {
          this.PutUserInfo({ data: { data: { phone: res.data.data.phone, personId: this.UserInfo.personId } } }).then(() => {
            this.EditUserInfo({ name: 'phone', value: res.data.data.phone })
            this.ShowPhoneAuthPopup = false
            this.$emit('UserInfoChange')
          })
        } else {
          wx.showToast({
            title: '获取手机号失败',
            icon: 'none',
            duration: 2000
          })
          this.ShowPhoneAuthPopup = false
          this.$emit('UserInfoChange')
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import "page.scss";
</style>
