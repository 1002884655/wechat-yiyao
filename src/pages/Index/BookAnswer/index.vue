<template>
  <view class="page">
    <MainPage ref="MainPage" @UserInfoChange="Init">
      <view class="page">
        <PageBottom></PageBottom>
      </view>
    </MainPage>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import MainPage from '../../../components/MainPage'
import PageBottom from '../../../components/PageBottom'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions, mapMutations: mapUserMutations } = createNamespacedHelpers('user')
export default {
  name: 'BookDetail',
  data () {
    return {
      ArticleInfo: {},
      DataLock: false
    }
  },
  computed: {
    ...mapUserState({
      UserInfo: x => x.UserInfo // 用户信息
    })
  },
  components: {
    MainPage,
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
      'GetArticleDetail'
    ]),
    ...mapUserMutations([
    ]),
    Init () {
      if (this.UserInfo !== null) {
        this.GetArticleDetail({ urlData: { id: Taro.getCurrentInstance().router.params.id } }).then((res) => {
          this.ArticleInfo = res.data.data || {}
        })
        if (this.UserInfo.studentId === null || this.UserInfo.studentId === '') {
          this.$refs.MainPage.ShowStudentIdPopup = true
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import "page.scss";
</style>
