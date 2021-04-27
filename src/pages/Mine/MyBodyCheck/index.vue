<template>
  <view class="page">
    <MainPage ref="MainPage" @UserInfoChange="Init">
      <view class="page flex-v">
        <view class="UserInfo">
          <view class="flex-h">
            <view class="flex-h flex-item">
              <text>姓名：</text>
              <text class="flex-item">{{UserInfo.name || '-'}}</text>
            </view>
            <view class="flex-h flex-item">
              <text>学号：</text>
              <text class="flex-item">{{UserInfo.studentId || '-'}}</text>
            </view>
            <view class="flex-h flex-item">
              <text>性别：</text>
              <text class="flex-item">{{UserInfo.sex - 0 === 1 ? '男' : '女'}}</text>
            </view>
            <view class="flex-h flex-item">
              <text>学校：</text>
              <text class="flex-item">{{UserInfo.schoolName || '-'}}</text>
            </view>
            <view class="flex-h flex-item">
              <text>专业：</text>
              <text class="flex-item">{{UserInfo.specialtyName || '-'}}</text>
            </view>
            <view class="flex-h flex-item">
              <text>创建时间：</text>
              <text class="flex-item">-</text>
            </view>
          </view>
        </view>
        <view class="flex-item">
          <view>
            <scroll-view scroll-y="true" style="height: 100%;" :refresher-enabled="true" @refresherrefresh="OnRefresh" :refresher-triggered="IsPull" refresher-background="none" refresher-default-style="black">
              <view class="Content">
                <view class="ListItem" v-for="(item, index) in PageList" :key="index">
                  <BodyCheckItem :Data="item"></BodyCheckItem>
                </view>
              </view>
              <PageBottom></PageBottom>
            </scroll-view>
          </view>
        </view>
      </view>
    </MainPage>
  </view>
</template>

<script>
import MainPage from '../../../components/MainPage'
import BodyCheckItem from '../../../components/BodyCheckItem'
import PageBottom from '../../../components/PageBottom'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions, mapMutations: mapUserMutations } = createNamespacedHelpers('user')
export default {
  name: 'MyBodyCheck',
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
      'GetMyBodyCheckList'
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
        this.GetMyBodyCheckList({ queryData: { ...this.PageData } }).then((res) => {
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
