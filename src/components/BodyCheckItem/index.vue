<template>
  <view class="BodyCheckItem flex-h">
    <view class="flex-item">
      <text>用户名</text>
      <text>2020-08-08 22:22:22</text>
    </view>
    <navigator url="" hover-class="none">查看报告</navigator>
  </view>
</template>

<script>
export default {
  name: 'BodyCheckItem',
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
