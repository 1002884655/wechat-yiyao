<template>
  <view class="page">
    <MainPage @UserInfoChange="Init">
      <scroll-view scroll-y="true" style="height: 100%;" :refresher-enabled="true" @refresherrefresh="OnRefresh" :refresher-triggered="IsPull" refresher-background="none" refresher-default-style="black">
        <view class="Content" v-if="UserInfo !== null">
          <view class="flex-h">
            <view>头像</view>
            <view class="flex-item">
              <view class="UserIcon">
                <image mode="aspectFill" :src="UserInfo.avatar" class="centerLabel"></image>
              </view>
            </view>
          </view>
          <view class="flex-h">
            <view>昵称</view>
            <view class="flex-item">
              <text>{{UserInfo.nickName}}</text>
              <!-- <input placeholder="请输入昵称" /> -->
            </view>
          </view>
          <view class="flex-h">
            <view>姓名</view>
            <view class="flex-item">
              <text>{{UserInfo.name}}</text>
              <!-- <input placeholder="请输入姓名" /> -->
            </view>
          </view>
          <view class="flex-h">
            <view>性别</view>
            <view class="flex-item">
              <!-- <text>{{Form.sex - 0 === 1 ? '男' : '女'}}</text> -->
              <picker @change="SexChange" :value="SexIndex" :range="SexList" range-key="name">
                <view class="picker" style="font-size: 14px">{{SexList[SexIndex].name}}</view>
              </picker>
            </view>
          </view>
          <view class="flex-h">
            <view><text class="Point">*</text>手机号</view>
            <view class="flex-item">
              <input placeholder="请输入手机号" v-model="Form.phone" />
            </view>
          </view>
          <view class="flex-h">
            <view>邮箱</view>
            <view class="flex-item">
              <input placeholder="请输入邮箱" v-model="Form.email" />
            </view>
          </view>
          <view class="flex-h">
            <view><text class="Point">*</text>学校</view>
            <view class="flex-item">
              <input placeholder="请输入学校" v-model="Form.schoolName" />
            </view>
          </view>
          <view class="flex-h">
            <view>学届</view>
            <view class="flex-item">
              <input placeholder="请输入学届" v-model="Form.schoolBatch" />
            </view>
          </view>
          <view class="flex-h">
            <view><text class="Point">*</text>学号</view>
            <view class="flex-item">
              <input placeholder="请输入学号" v-model="Form.studentId" />
            </view>
          </view>
          <view class="Save">
            <view @tap="Save">保存</view>
          </view>
        </view>
      </scroll-view>
    </MainPage>
  </view>
</template>

<script>
import MainPage from '../../../components/MainPage'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions, mapMutations: mapUserMutations } = createNamespacedHelpers('user')
export default {
  name: 'MyInfo',
  data () {
    return {
      SexIndex: 0,
      SexList: [
        { id: 1, name: '男' },
        { id: 2, name: '女' }
      ],
      IsPull: false,
      DataLock: false,
      Form: {
        sex: null,
        phone: null,
        email: null,
        schoolName: null,
        schoolBatch: null,
        studentId: null
      }
    }
  },
  computed: {
    ...mapUserState({
      UserInfo: x => x.UserInfo // 用户信息
    })
  },
  components: {
    MainPage
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
    ...mapUserActions([
      'UpdateUserInfo'
    ]),
    ...mapUserMutations([
    ]),
    Init () {
      if (this.UserInfo !== null) {
        for (let key in this.Form) {
          this.Form[key] = this.UserInfo[key]
        }
      }
    },
    SexChange (e) {
      this.SexIndex = e.detail.value - 0
      this.Form.sex = this.SexList[e.detail.value - 0].id
    },
    Save () {
      if (!this.DataLock) {
        this.DataLock = true
        let Data = {}
        for (let key in this.Form) {
          if (this.Form[key] !== null && this.Form[key] !== '') {
            Data[key] = this.Form[key]
          }
        }
        this.UpdateUserInfo({ data: { data: { ...Data } } }).then(() => {
          this.DataLock = false
        }).catch(() => {
          this.DataLock = false
        })
      }
    },
    OnRefresh (e) {
      this.IsPull = true
      window.setTimeout(() => {
        this.IsPull = false
      }, 1000)
    }
  }
}
</script>

<style lang="scss">
@import "page.scss";
</style>
