<template>
  <view class="page flex-v">
    <view class="UserInfo">
      <view class="flex-h">
        <view class="flex-h flex-item">
          <text>姓名：</text>
          <text class="flex-item">xxx</text>
        </view>
        <view class="flex-h flex-item">
          <text>学号：</text>
          <text class="flex-item">xxx</text>
        </view>
        <view class="flex-h flex-item">
          <text>性别：</text>
          <text class="flex-item">xxx</text>
        </view>
        <view class="flex-h flex-item">
          <text>学校：</text>
          <text class="flex-item">xxx</text>
        </view>
        <view class="flex-h flex-item">
          <text>专业：</text>
          <text class="flex-item">xxx</text>
        </view>
        <view class="flex-h flex-item">
          <text>创建时间：</text>
          <text class="flex-item">xxx</text>
        </view>
      </view>
    </view>
    <view class="flex-item">
      <view>
        <scroll-view scroll-y="true" style="height: 100%;" :refresher-enabled="true" @refresherrefresh="OnRefresh" :refresher-triggered="IsPull" refresher-background="none" refresher-default-style="black">
          <view class="Content">
            <view class="ListItem" v-for="(item, index) in PageList" :key="index">
              <BodyCheckItem></BodyCheckItem>
            </view>
          </view>
          <PageBottom></PageBottom>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script>
import BodyCheckItem from '../../../components/BodyCheckItem'
import PageBottom from '../../../components/PageBottom'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions, mapMutations: mapUserMutations } = createNamespacedHelpers('user')
export default {
  name: 'MyBodyCheck',
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
    BodyCheckItem,
    PageBottom
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
