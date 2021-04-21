<template>
  <view class="page">
    <MainPage>
      <view class="page flex-v">
        <!-- 搜索 -->
        <view class="SearchContainer">
          <view class="flex-h">
            <text class="iconfont iconsousuo"></text>
            <view class="flex-item">
              <input :focus="true" confirm-type="search" placeholder="搜索你感兴趣的内容" v-model="SearchKey" @confirm="Search" @focus="ShowHistory = false" @blur="SearchBlur">
            </view>
          </view>
        </view>

        <!-- 内容 -->
        <view class="flex-item">
          <view>
            <view>

              <!-- 热门搜索 -->
              <!-- <view class="HotSearch" v-show="!ShowHistory">
            <view class="Title">
              <text>热门搜索</text>
            </view>
            <view class="List">
              <navigator url="" v-for="(item, index) in 10" :key="index" hover-class="none">关键词</navigator>
            </view>
          </view> -->

              <!-- 最近搜索 -->
              <!-- <view class="SearchHistory" v-show="!ShowHistory">
            <view class="Title">
              <text>最近搜索</text>
            </view>
            <view class="List">
              <navigator url="" v-for="(item, index) in 10" :key="index" hover-class="none">关键词</navigator>
            </view>
          </view> -->

              <!-- 搜索结果 -->
              <view class="ResultContainer" v-show="ShowHistory">
                <view class="flex-h" v-for="(item, index) in SearchResult" :key="index">
                  <BookItem :Data="item"></BookItem>
                </view>
              </view>

              <PageBottom v-show="ShowHistory"></PageBottom>

            </view>
          </view>
        </view>
      </view>
    </MainPage>
  </view>
</template>

<script>
import MainPage from '../../../components/MainPage'
import BookItem from '../../../components/BookItem'
import PageBottom from '../../../components/PageBottom'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions, mapMutations: mapUserMutations } = createNamespacedHelpers('user')
const { mapActions: mapIndexActions } = createNamespacedHelpers('index')
export default {
  name: 'Search',
  data () {
    return {
      ShowHistory: false,
      Timer: null,
      SearchKey: '',
      SearchResult: []
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
    ]),
    ...mapUserMutations([
    ]),
    ...mapIndexActions([
      'GetSearchArticleList'
    ]),
    Init () {
    },
    Search () {
      this.GetSearchArticleList({ queryData: { pageNum: 1, pageSize: 10000, name: this.SearchKey } }).then((res) => {
        this.SearchResult = [...res.data.data.records]
      })
    },
    SearchBlur () {
      clearTimeout(this.Timer)
      this.Timer = setTimeout(() => {
        this.ShowHistory = true
      }, 300)
    }
  }
}
</script>

<style lang="scss">
@import "page.scss";
</style>
