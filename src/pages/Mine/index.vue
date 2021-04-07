<template>
  <view class="page">
    <scroll-view scroll-y="true" style="height: 100%;" :refresher-enabled="true" @refresherrefresh="OnRefresh" :refresher-triggered="IsPull" refresher-background="#f4c819" refresher-default-style="white">
      <view class="Content">

        <!-- 头部 -->
        <view class="TopContainer">
          <view class="UserIcon">
            <image mode="aspectFill" :src="null" class="centerLabel"></image>
          </view>
          <view class="UserName">用户名</view>
          <view class="UserNo">学号：123456789</view>
        </view>

        <!-- 信息卡 -->
        <view class="UserInfoCard">
          <view>
            <view class="School flex-h">
              <text>学校：</text>
              <text class="flex-item">xxx大学</text>
              <navigator url="/pages/Mine/MyInfo/index" hover-class="none">
                <text>完善信息</text>
                <text class="iconfont iconjiantouright"></text>
              </navigator>
            </view>
            <view class="OtherInfo flex-h">
              <view>
                <view class="flex-h">
                  <text>专业：</text>
                  <text class="flex-item">计算机科学与技术</text>
                </view>
                <view class="flex-h">
                  <text>手机号：</text>
                  <text class="flex-item">18267901393</text>
                </view>
                <view class="flex-h">
                  <text>学届：</text>
                  <text class="flex-item">2011</text>
                </view>
              </view>
              <view class="flex-item">
                <text>积分</text>
                <text>0</text>
              </view>
            </view>
          </view>
        </view>

        <!-- 用户选项 -->
        <view class="UserOption">
          <navigator v-for="(item, index) in UserOption" :key="index" class="flex-h" :url="item.url" hover-class="none">
            <view class="flex-h">
              <text class="iconfont" :class="item.icon"></text>
              <text class="flex-item">{{item.name}}</text>
              <text class="iconfont iconjiantouright"></text>
            </view>
          </navigator>
        </view>

      </view>
    </scroll-view>
  </view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions, mapMutations: mapUserMutations } = createNamespacedHelpers('user')
export default {
  name: 'Mine',
  data () {
    return {
      IsPull: false,
      UserOption: [
        { name: '我的收藏', icon: 'iconshoucang', url: '/pages/Mine/MyCollected/index' },
        { name: '我的阅读', icon: 'iconyuedu', url: '/pages/Mine/MyReaded/index' },
        { name: '我的就诊', icon: 'iconjiuzhen', url: '/pages/Mine/MyDoctorVisit/index' },
        { name: '我的体检', icon: 'icontijian', url: '/pages/Mine/MyBodyCheck/index' },
        { name: '基础信息', icon: 'iconjichuxinxi', url: '/pages/Mine/MyInfo/index' }
      ]
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
