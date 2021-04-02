<template>
  <view class="ActivityListItem">
    <view class="Img">
      <image mode="aspectFill" :src="TestImg" class="centerLabel"></image>
    </view>
    <view class="Info flex-h">
      <view class="flex-item">
        <text>核销拼团</text>
        <text>参与截止时间：2019年10月20日 10:00:00</text>
      </view>
      <text class="active">未开始</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'ActivityListItem',
  props: {
    Data: {
      default: null,
      type: Object
    }
  },
  data () {
    return {
      TestImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606120989360&di=8610f1678b51e26de6d4c6af39d1cf63&imgtype=0&src=http%3A%2F%2Fattachments.gfan.com%2Fforum%2F201503%2F19%2F211608ztcq7higicydxhsy.jpg'
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
