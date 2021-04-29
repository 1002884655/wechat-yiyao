<template>
  <view class="page">
    <MainPage @UserInfoChange="Init">
      <scroll-view scroll-y="true" style="height: 100%;" :refresher-enabled="true" @refresherrefresh="OnRefresh" :refresher-triggered="IsPull" refresher-background="#f4c819" refresher-default-style="white">
        <view class="Content">

          <!-- 头部 -->
          <view class="TopContainer">
            <view class="UserIcon">
              <image mode="aspectFill" :src="UserInfo.avatar" class="centerLabel"></image>
            </view>
            <view class="UserName">{{UserInfo.nickName || '-'}}</view>
            <view class="UserNo">学号：{{Student.studentNo || '-'}}</view>
          </view>

          <!-- 信息卡 -->
          <view class="UserInfoCard">
            <view>
              <view class="School flex-h">
                <text>学校：</text>
                <text class="flex-item">{{Student.schoolName || '-'}}</text>
                <navigator url="/pages/Mine/MyInfo/index" hover-class="none">
                  <text>完善信息</text>
                  <text class="iconfont iconjiantouright"></text>
                </navigator>
              </view>
              <view class="OtherInfo flex-h">
                <view>
                  <view class="flex-h">
                    <text>专业：</text>
                    <text class="flex-item">{{Student.specialtyName || '-'}}</text>
                  </view>
                  <view class="flex-h">
                    <text>手机号：</text>
                    <text class="flex-item">{{UserInfo.phone || '-'}}</text>
                  </view>
                  <view class="flex-h">
                    <text>学届：</text>
                    <text class="flex-item">{{Student.schoolBatch}}</text>
                  </view>
                </view>
                <view class="flex-item">
                  <text>积分</text>
                  <text>{{UserInfo.personData ? UserInfo.personData.pointNum : '-'}}</text>
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
    </MainPage>
  </view>
</template>

<script>
import MainPage from '../../components/MainPage'
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
      UserInfo: x => x.UserInfo, // 用户信息
      Student: x => x.UserInfo.student || {} // 学生信息
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
      'GetCurrentPersonInfo'
    ]),
    ...mapUserMutations([
    ]),
    Init () {
      console.log(111)
      if (this.UserInfo !== null) {
        console.log(222)
        this.GetCurrentPersonInfo()
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
