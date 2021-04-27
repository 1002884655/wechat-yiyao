<template>
  <view class="page">
    <MainPage ref="MainPage" @UserInfoChange="UserInfoChange">
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

        <!-- 内容 -->
        <view class="flex-item">
          <view>
            <scroll-view scroll-y="true" style="height: 100%;" :refresher-enabled="true" @refresherrefresh="OnRefresh" :refresher-triggered="IsPull" refresher-background="none" refresher-default-style="black">
              <view class="Content">

                <!-- 轮播图 -->
                <view class="BannerContainer">
                  <view>
                    <swiper :indicator-dots="true" :autoplay="true" :interval="3000">
                      <swiper-item v-for="(item, index) in BannerList" :key="index">
                        <view class="BannerItem">
                          <image mode="aspectFill" :src="item.image" class="centerLabel"></image>
                        </view>
                      </swiper-item>
                    </swiper>
                  </view>
                </view>

                <!-- 热门推荐 -->
                <view class="HotRecommend">
                  <view class="Title">
                    <text>热门推荐</text>
                  </view>
                  <view class="ListContainer">
                    <scroll-view class="ScrollContainer" scroll-x="true" style="width: 100%">
                      <navigator class="RecommendItem" v-for="(item, index) in HotList" :key="index" :url="`/pages/Index/BookDetail/index?id=${item.targetId}`" hover-class="none">
                        <view class="Img">
                          <image mode="aspectFill" :src="item.poster" class="centerLabel"></image>
                        </view>
                        <view class="Title">
                          <text>{{item.targetTitle}}</text>
                        </view>
                      </navigator>
                    </scroll-view>
                  </view>
                </view>

                <!-- 最新文章 -->
                <view class="NewstArticle">
                  <view class="Title">
                    <text>最新文章</text>
                  </view>
                  <view class="ListContainer">
                    <view class="ArticleItem flex-h" v-for="(item, index) in NewestArticleList">
                      <BookItem :Data="item"></BookItem>
                    </view>
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
  name: 'Index',
  data () {
    return {
      IsPull: false,
      BannerList: [],
      HotList: [],
      NewestArticleList: []
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
  complete () {
  },
  methods: {
    ...mapUserActions([
    ]),
    ...mapUserMutations([
    ]),
    ...mapIndexActions([
      'GetIndexBanner',
      'GetIndexHotList',
      'GetIndexNewestArticle'
    ]),
    UserInfoChange () {
      this.GetIndexBanner().then((res) => {
        this.BannerList = [...res.data.data]
        this.GetIndexHotList().then((res) => {
          this.HotList = [...res.data.data]
        })
        this.GetIndexNewestArticle({ urlData: { pageSize: 10, pageNum: 1 } }).then((res) => {
          this.NewestArticleList = [...res.data.data.records]
          this.$refs.MainPage.ShowPage()
        })
      })
    },
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
