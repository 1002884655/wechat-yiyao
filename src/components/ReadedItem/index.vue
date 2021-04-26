<template>
  <navigator class="ReadedItem flex-h" :url="`/pages/Index/BookDetail/index?id=${Data.postId}`" hover-class="none">
    <view class="Img">
      <image mode="aspectFill" :src="Data.poster" class="centerLabel"></image>
    </view>
    <view class="flex-item">
      <view class="Title">
        <text>名称：{{Data.name}}</text>
      </view>
      <view class="Desc">
        <text>作者：{{Data.author}}</text>
      </view>
      <view class="Desc">
        <text>类型：{{Data.tags && Data.tags.length ? Data.tags[0] : '-'}}</text>
      </view>
    </view>
    <!-- <view class="ProgressContainer">
      <view class="centerLabel">
        <view class="Progress">
          <view class="Sector"></view>
          <view class="SubSector"></view>
          <view class="Layer"></view>
        </view>
        <text class="ProgressTips">完成进度</text>
        <text class="ProgressNum">50%</text>
        <text class="Length">总时长</text>
        <text class="Length">1小时25分钟36秒</text>
      </view>
    </view> -->
  </navigator>
</template>

<script>
export default {
  name: 'ReadedItem',
  props: {
    Data: {
      default: () => {
        return {}
      },
      type: Object
    }
  },
  data () {
    return {
    }
  },
  computed: {
  },
  components: {
  },
  created () {
  },
  methods: {
    Init () {
    }
  }
}
</script>

<style lang="scss">
@import "page.scss";
</style>
