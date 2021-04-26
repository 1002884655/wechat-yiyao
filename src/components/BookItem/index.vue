<template>
  <navigator class="BookItem flex-h" :url="`/pages/Index/BookDetail/index?id=${Data.postId}`" hover-class="none">
    <view class="Img">
      <image mode="aspectFill" :src="Data.poster" class="centerLabel"></image>
    </view>
    <view class="flex-item">
      <view class="Title">
        <text>{{Data.name}}</text>
      </view>
      <view class="Desc">
        <text>{{Data.summary}}</text>
      </view>
    </view>
  </navigator>
</template>

<script>
export default {
  name: 'BookItem',
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
