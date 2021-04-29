<template>
  <view class="page">
    <MainPage ref="MainPage" @UserInfoChange="Init">
      <view class="page flex-v">

        <!-- 搜索 -->
        <view class="Search">
          <view class="flex-h">
            <text class="iconfont iconsousuo"></text>
            <view class="flex-item">
              <navigator url="/pages/Index/Search/index" hover-class="none">搜索你感兴趣的内容</navigator>
            </view>
          </view>
        </view>

        <!-- 分类 -->
        <view class="ArticleClass">
          <scroll-view class="ScrollContainer" scroll-x="true" style="width: 100%">
            <view class="ListContainer">
              <view v-for="(item, index) in MenuList" :key="index" class="MenuItem" :class="{'active': item.typeId === CurrentMenuId}" @tap="CutMenu(item)">{{item.name}}</view>
            </view>
          </scroll-view>
        </view>

        <!-- 内容 -->
        <view class="flex-item">
          <view>
            <scroll-view scroll-y="true" style="height: 100%;" :refresher-enabled="true" @refresherrefresh="OnRefresh" :refresher-triggered="IsPull" refresher-background="none" refresher-default-style="black">
              <view class="Content">

                <view class="ArticleList">
                  <view v-for="(item, index) in PageList" :key="index">
                    <BookItem :Data="item"></BookItem>
                  </view>
                </view>

                <PageBottom></PageBottom>

              </view>
            </scroll-view>
          </view>
        </view>
      </view>
    </MainPage>
  </view>
</template>

<script>
import MainPage from '../../components/MainPage'
import BookItem from '../../components/BookItem'
import PageBottom from '../../components/PageBottom'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions, mapMutations: mapUserMutations } = createNamespacedHelpers('user')
const { mapActions: mapIndexActions } = createNamespacedHelpers('index')
export default {
  name: 'Study',
  data () {
    return {
      IsPull: false,
      IsInfinite: false,
      DataLock: false,
      CurrentMenuId: null,
      MenuList: [],
      PageData: {
        pageNum: 1,
        pageSize: 10
      },
      PageList: [],
      HasNextPage: true
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
    ...mapIndexActions([
      'GetSearchArticleList'
    ]),
    ...mapUserActions([
      'GetArticleTypeList'
    ]),
    ...mapUserMutations([
    ]),
    Init () {
      if (this.UserInfo !== null) {
        this.MenuList = []
        this.GetArticleTypeList({ pageNum: 1, pageSize: 1000, status: 1 }).then((res) => {
          this.MenuList = res.data.data.records || []
          if (this.MenuList.length) {
            this.CurrentMenuId = this.MenuList[0].typeId
            this.PageList = []
            this.PageData.pageNum = 1
            this.HasNextPage = true
            this.ToGetPageList()
          }
        })
      }
    },
    ToGetPageList () {
      if (!this.DataLock && this.HasNextPage) {
        this.DataLock = true
        this.GetSearchArticleList({ queryData: { ...this.PageData, status: 1, typeId: this.CurrentMenuId } }).then((res) => {
          this.PageList = this.PageList.concat(res.data.data.records || [])
          this.HasNextPage = res.data.data.current - 0 < res.data.data.pages - 0
          this.DataLock = false
          this.IsPull = false
          this.IsInfinite = false
          this.$refs.MainPage.HideLoading()
        }).then((res) => {
          this.DataLock = false
          this.IsPull = false
          this.IsInfinite = false
        })
      }
    },
    OnRefresh () {
      this.IsPull = true
      this.PageList = []
      this.PageData.pageNum = 1
      this.HasNextPage = true
      this.ToGetPageList()
    },
    CutMenu (item) {
      if (!this.DataLock) {
        this.PageData.pageNum = 1
        this.HasNextPage = true
        this.PageList = []
        this.CurrentMenuId = item.typeId
        this.ToGetPageList()
      }
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
