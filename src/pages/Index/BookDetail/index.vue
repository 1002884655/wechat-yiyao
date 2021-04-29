<template>
  <view class="page">
    <MainPage ref="MainPage" @UserInfoChange="Init">
      <view class="page flex-v">
        <!-- 内容 -->
        <view class="flex-item">
          <view>

            <!-- 封面内容 -->
            <view class="FrontInfo">
              <view class="Img">
                <view>
                  <image mode="aspectFit" :src="ArticleInfo.poster" class="centerLabel"></image>
                </view>
              </view>
              <view class="SubInfo">
                <view class="Tag">
                  <text class="iconfont iconbiaoqian"></text>
                  <text>分类：</text>
                  <text v-for="(item, index) in (ArticleInfo.tags || [])" :key="index">{{item}}</text>
                </view>
                <view class="flex-h">
                  <view class="flex-item flex-h">
                    <text>名称：</text>
                    <text class="flex-item">{{ArticleInfo.name}}</text>
                  </view>
                  <view class="flex-item flex-h">
                    <text>阅读量：</text>
                    <text class="flex-item">{{ArticleInfo.answerNum}}</text>
                  </view>
                </view>
                <view class="flex-h">
                  <view class="flex-item flex-h">
                    <text>作者：</text>
                    <text class="flex-item">{{ArticleInfo.author}}</text>
                  </view>
                  <view class="flex-item flex-h">
                    <text>发布时间：</text>
                    <text class="flex-item">{{ToolClass.DateFormat(ArticleInfo.publishDate, 'YY:MM:DD')}}</text>
                  </view>
                </view>
                <view class="Desc">
                  <text>简介：{{ArticleInfo.summary}}</text>
                </view>
              </view>

              <!-- 正文 -->
              <view class="Article">
                <rich-text :nodes="ArticleInfo.content"></rich-text>
              </view>

              <!-- 去答题 -->
              <view class="ToAnswer">
                <navigator :url="`/pages/Index/BookAnswer/index?id=${ArticleInfo.postId}`" hover-class="none">去答题</navigator>
              </view>

            </view>

            <PageBottom></PageBottom>
          </view>
        </view>

        <!-- 底部 -->
        <view class="flex-h Bottom">
          <view class="Share" @tap="ShareArticle">
            <text class="iconfont iconfenxiang"></text>
            <text>分享</text>
          </view>
          <view class="Like" @tap="TriggerSave">
            <text class="iconfont iconshoucang1" :class="{'active': ArticleInfo.isSaved}"></text>
            <text>收藏</text>
          </view>
          <view class="flex-item"></view>
          <view class="Answer">
            <navigator :url="`/pages/Index/BookAnswer/index?id=${ArticleInfo.postId}`" hover-class="none">去答题</navigator>
          </view>
          <!-- <view class="ReadInfo">
            <text>阅读时长：1小时22分钟22秒</text>
            <view class="Progress flex-h">
              <view class="flex-item">
                <view :style="{width: '50%'}"></view>
              </view>
              <text>完成进度</text>
            </view>
          </view> -->
        </view>
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
      Timer: null,
      ArticleInfo: {},
      DataLock: false
    }
  },
  computed: {
    ...mapUserState({
      UserInfo: x => x.UserInfo, // 用户信息
      Student: x => x.UserInfo.student, // 用户信息
    })
  },
  components: {
    MainPage,
    PageBottom
  },
  onShareAppMessage () {
    return {
      title: this.ArticleInfo.shareSetting === null ? this.ArticleInfo.name : this.ArticleInfo.shareSetting.title,
      imageUrl: this.ArticleInfo.shareSetting === null ? this.ArticleInfo.poster : this.ArticleInfo.shareSetting.imageUrl,
      path: `/pages/Index/BookDetail/index?id=${Taro.getCurrentInstance().router.params.id}`
    }
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
    ...mapUserActions([
      'GetArticleDetail',
      'SaveArticle',
      'DeleteSaveArticle'
    ]),
    ...mapUserMutations([
    ]),
    Init () {
      if (this.UserInfo !== null) {
        this.GetArticleDetail({ urlData: { id: Taro.getCurrentInstance().router.params.id } }).then((res) => {
          this.ArticleInfo = res.data.data || {}
          this.$refs.MainPage.HideLoading()
        })

        if (!this.Student?.studentId) {
          if (this.$refs.MainPage) {
            this.$refs.MainPage.ShowStudentIdPopup = true
          }
        }
      }
    },
    ShareArticle () { // 分享

    },
    TriggerSave () {
      if (!this.DataLock && this.ArticleInfo.postId) {
        this.DataLock = true
        if (this.ArticleInfo.isSaved) { // 取消收藏
          this.DeleteSaveArticle({ queryData: { postId: this.ArticleInfo.postId } }).then(() => {
            wx.showToast({
              title: '取消收藏成功',
              icon: 'none',
              duration: 2000
            })
            this.ArticleInfo.isSaved = false
            this.DataLock = false
          }).catch(() => {
            this.DataLock = false
          })
        } else { // 收藏
          this.SaveArticle({ queryData: { postId: this.ArticleInfo.postId } }).then(() => {
            wx.showToast({
              title: '收藏成功',
              icon: 'none',
              duration: 2000
            })
            this.ArticleInfo.isSaved = true
            this.DataLock = false
          }).catch(() => {
            this.DataLock = false
          })
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import "page.scss";
</style>
