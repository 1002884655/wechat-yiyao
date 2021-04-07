<template>
  <view class="page">
    <scroll-view scroll-y="true" style="height: 100%;" :refresher-enabled="true" @refresherrefresh="OnRefresh" :refresher-triggered="IsPull" refresher-background="none" refresher-default-style="black">
      <view class="Content">
        <view class="flex-h">
          <view>头像</view>
          <view class="flex-item">
            <view class="UserIcon">
              <image mode="aspectFill" :src="null" class="centerLabel"></image>
            </view>
          </view>
        </view>
        <view class="flex-h">
          <view>昵称</view>
          <view class="flex-item">
            <input placeholder="请输入昵称" />
          </view>
        </view>
        <view class="flex-h">
          <view>姓名</view>
          <view class="flex-item">
            <input placeholder="请输入姓名" />
          </view>
        </view>
        <view class="flex-h">
          <view>性别</view>
          <view class="flex-item">
            <text>性别</text>
          </view>
        </view>
        <view class="flex-h">
          <view><text class="Point">*</text>手机号</view>
          <view class="flex-item">
            <input placeholder="请输入手机号" />
          </view>
        </view>
        <view class="flex-h">
          <view>邮箱</view>
          <view class="flex-item">
            <input placeholder="请输入邮箱" />
          </view>
        </view>
        <view class="flex-h">
          <view><text class="Point">*</text>学校</view>
          <view class="flex-item">
            <input placeholder="请输入学校" />
          </view>
        </view>
        <view class="flex-h">
          <view>学届</view>
          <view class="flex-item">
            <input placeholder="请输入学届" />
          </view>
        </view>
        <view class="flex-h">
          <view><text class="Point">*</text>学号</view>
          <view class="flex-item">
            <input placeholder="请输入学号" />
          </view>
        </view>
        <view class="Save">
          <view>保存</view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions, mapMutations: mapUserMutations } = createNamespacedHelpers('user')
export default {
  name: 'MyInfo',
  data () {
    return {
      IsPull: false,
      PageList: ['', '', '', '', '', '', '', '', '', '', '', '']
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
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
    ...mapUserActions([
    ]),
    ...mapUserMutations([
    ]),
    Init () {
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
