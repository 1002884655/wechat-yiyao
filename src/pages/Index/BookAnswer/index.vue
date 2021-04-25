<template>
  <view class="page">
    <MainPage ref="MainPage" @UserInfoChange="Init">
      <view class="page">
        <scroll-view :scroll-y="true" :enhanced="true" :show-scrollbar="false" style="height: 100%;">
          <view class="QuestionList" v-if="ArticleInfo.postTestList && ArticleInfo.postTestList !== null && ArticleInfo.postTestList.length">
            <view v-for="(item, index) in ArticleInfo.postTestList" :key="index">
              <view class="Title">
                <text>{{item.title}}</text>
              </view>
              <!-- <label class="checkbox" v-if="item.answerType === 'checkbox'">
                <checkbox value="cb" checked="false" />{{item.optionA}}
              </label>
              <label class="checkbox" v-if="item.answerType === 'checkbox'">
                <checkbox value="cb" checked="false" />{{item.optionB}}
              </label>
              <label class="checkbox" v-if="item.answerType === 'checkbox'">
                <checkbox value="cb" checked="false" />{{item.optionC}}
              </label>
              <label class="checkbox" v-if="item.answerType === 'checkbox'">
                <checkbox value="cb" checked="false" />{{item.optionD}}
              </label> -->
              <radio-group @change="RadioChange(item, index, $event)" v-if="item.answerType === 'radio'">
                <label>
                  <view>
                    <radio value="A" :checked="false" />
                  </view>
                  <view>{{item.optionA}}</view>
                </label>
                <label>
                  <view>
                    <radio value="B" :checked="false" />
                  </view>
                  <view>{{item.optionB}}</view>
                </label>
                <label>
                  <view>
                    <radio value="C" :checked="false" />
                  </view>
                  <view>{{item.optionC}}</view>
                </label>
                <label>
                  <view>
                    <radio value="D" :checked="false" />
                  </view>
                  <view>{{item.optionD}}</view>
                </label>
              </radio-group>
            </view>
          </view>
        </scroll-view>
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
    RadioChange (item, index, e) {
      console.log(item, index, e.detail.value)
    },
    Init () {
      if (this.UserInfo !== null) {
        this.GetArticleDetail({ urlData: { id: Taro.getCurrentInstance().router.params.id } }).then((res) => {
          this.ArticleInfo = res.data.data || {}
        })
        if (this.UserInfo.studentId === null || this.UserInfo.studentId === '') {
          if (this.$refs.MainPage) {
            this.$refs.MainPage.ShowStudentIdPopup = true
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import "page.scss";
</style>
