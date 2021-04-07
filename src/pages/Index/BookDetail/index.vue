<template>
  <view class="page flex-v">

    <!-- 内容 -->
    <view class="flex-item">
      <view>

        <!-- 封面内容 -->
        <view class="FrontInfo">
          <view class="Img">
            <view>
              <image mode="aspectFit" :src="null" class="centerLabel"></image>
            </view>
          </view>
          <view class="SubInfo">
            <view class="Tag">
              <text class="iconfont iconbiaoqian"></text>
              <text>分类：</text>
              <text>前沿科学</text>
            </view>
            <view class="flex-h">
              <view class="flex-item flex-h">
                <text>名称：</text>
                <text class="flex-item">xxx</text>
              </view>
              <view class="flex-item flex-h">
                <text>阅读量：</text>
                <text class="flex-item">123456</text>
              </view>
            </view>
            <view class="flex-h">
              <view class="flex-item flex-h">
                <text>作者：</text>
                <text class="flex-item">xxx</text>
              </view>
              <view class="flex-item flex-h">
                <text>发布时间：</text>
                <text class="flex-item">2020-12-08</text>
              </view>
            </view>
            <view class="Desc">
              <text>简介：xxxxxxxxxxx</text>
            </view>
          </view>

          <!-- 正文 -->
          <view class="Article">

          </view>

        </view>

        <PageBottom></PageBottom>
      </view>
    </view>

    <!-- 底部 -->
    <view class="flex-h Bottom">
      <view class="Share">
        <text class="iconfont iconfenxiang"></text>
        <text>分享</text>
      </view>
      <view class="Like">
        <text class="iconfont iconshoucang1"></text>
        <text>收藏</text>
      </view>
      <view class="flex-item"></view>
      <view class="ReadInfo">
        <text>阅读时长：1小时22分钟22秒</text>
        <view class="Progress flex-h">
          <view class="flex-item">
            <view :style="{width: '50%'}"></view>
          </view>
          <text>完成进度</text>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
import PageBottom from '../../../components/PageBottom'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions, mapMutations: mapUserMutations } = createNamespacedHelpers('user')
export default {
  name: 'BookDetail',
  data () {
    return {
      Timer: null
    }
  },
  computed: {
    ...mapUserState({
      UserInfo: x => x.UserInfo // 用户信息
    })
  },
  components: {
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
    }
  }
}
</script>

<style lang="scss">
@import "page.scss";
</style>
