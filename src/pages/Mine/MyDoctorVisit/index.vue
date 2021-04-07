<template>
  <view class="page">
    <scroll-view scroll-y="true" style="height: 100%;" :refresher-enabled="true" @refresherrefresh="OnRefresh" :refresher-triggered="IsPull" refresher-background="none" refresher-default-style="black">
      <view class="Content">
        <view class="ListItem" v-for="(item, index) in PageList" :key="index">
          <BodyCheckItem></BodyCheckItem>
        </view>
      </view>
      <PageBottom></PageBottom>
    </scroll-view>
  </view>
</template>

<script>
import BodyCheckItem from '../../../components/BodyCheckItem'
import PageBottom from '../../../components/PageBottom'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions, mapMutations: mapUserMutations } = createNamespacedHelpers('user')
export default {
  name: 'MyDoctorVisit',
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
