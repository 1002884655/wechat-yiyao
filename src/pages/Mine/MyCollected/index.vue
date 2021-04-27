<template>
  <view class="page">
    <MainPage ref="MainPage" @UserInfoChange="Init">
      <scroll-view scroll-y="true" style="height: 100%;" :refresher-enabled="true" @refresherrefresh="OnRefresh" @scrolltolower="Infinite" :refresher-triggered="IsPull" refresher-background="none" refresher-default-style="black">
        <view class="Content">
          <view class="ListItem" v-for="(item, index) in PageList" :key="index">
            <BookItem :Data="item"></BookItem>
          </view>
        </view>
        <PageBottom></PageBottom>
      </scroll-view>
    </MainPage>
  </view>
</template>

<script>
import MainPage from '../../../components/MainPage'
import BookItem from '../../../components/BookItem'
import PageBottom from '../../../components/PageBottom'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions, mapMutations: mapUserMutations } = createNamespacedHelpers('user')
export default {
  name: 'MyCollected',
  data () {
    return {
      IsInfinite: false,
      IsPull: false,
      PageList: [],
      PageData: {
        pageSize: 10,
        pageNum: 1
      },
      HasNextPage: true,
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
    BookItem,
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
      'GetMySavedArticleList'
    ]),
    ...mapUserMutations([
    ]),
    Init () {
      if (this.UserInfo !== null && !this.DataLock) {
        this.PageList = []
        this.PageData.pageNum = 1
        this.HasNextPage = true
        this.ToGetPageList(() => {
          this.$refs.MainPage.ShowPage()
        })
      }
    },
    ToGetPageList (callback = () => { }) {
      if (!this.DataLock && this.HasNextPage) {
        this.DataLock = true
        this.GetMySavedArticleList({ queryData: { ...this.PageData } }).then((res) => {
          this.PageList = this.PageList.concat(res.data.data.records || [])
          this.HasNextPage = res.data.data.current - 0 < res.data.data.pages - 0
          this.DataLock = false
          this.IsPull = false
          this.IsInfinite = false
          callback()
        }).catch(() => {
          this.DataLock = false
          this.IsPull = false
          this.IsInfinite = false
          callback()
        })
      }
    },
    OnRefresh () {
      this.IsPull = true
      this.Init()
    },
    Infinite () {
      if (this.HasNextPage && !this.IsInfinite && !this.DataLock) {
        this.IsInfinite = true
        this.PageData.pageNum += 1
        this.ToGetPageList()
      } else {
        this.IsInfinite = false
      }
    }
  }
}
</script>

<style lang="scss">
@import "page.scss";
</style>
