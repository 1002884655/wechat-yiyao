<template>
  <view class="page">
    <MainPage ref="MainPage" @UserInfoChange="Init">
      <view class="page">
        <scroll-view :scroll-y="true" :enhanced="true" :show-scrollbar="false" style="height: 100%;">
          <view class="QuestionList" v-if="ArticleInfo.postTestList && ArticleInfo.postTestList !== null && ArticleInfo.postTestList.length">
            <view class="QuestionItem" v-for="(item, index) in ArticleInfo.postTestList" :key="index">
              <view class="Title">
                <text>{{getQuestionTitle(item, index)}}</text>
              </view>

              <checkbox-group @change="CheckboxChange(item, index, $event)" v-if="item.answerType === 'checkbox'" style="padding-top: 10px;">
                <label>
                  <checkbox value="A" :checked="false" />{{item.optionA}}
                </label>
                <label>
                  <checkbox value="B" :checked="false" />{{item.optionB}}
                </label>
                <label>
                  <checkbox value="C" :checked="false" />{{item.optionC}}
                </label>
                <label>
                  <checkbox value="D" :checked="false" />{{item.optionD}}
                </label>
              </checkbox-group>

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

              <radio-group @change="RadioChange(item, index, $event)" v-if="item.answerType === 'switch'">
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
              </radio-group>

            </view>
          </view>
          <view class="Submit">
            <text @tap="Submit">提交</text>
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
const { mapActions: mapIndexActions } = createNamespacedHelpers('index')
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
  methods: {
    ...mapUserActions([
      'GetArticleDetail'
    ]),
    ...mapUserMutations([
    ]),
    ...mapIndexActions([
      'PostArticleAnswer'
    ]),
    Submit () {
      let Bool = true
      this.ArticleInfo.postTestList.map((item) => {
        if (item.correctAnswers === null || item.correctAnswers === '') {
          Bool = false
        }
      })
      if (Bool && !this.DataLock) {
        this.DataLock = true
        this.PostArticleAnswer({ data: { data: this.ArticleInfo.postTestList } }).then(() => {
          wx.showToast({
            title: '提交成功',
            icon: 'none',
            duration: 2000
          })
          this.DataLock = false
          wx.navigateBack({ changed: true })
        }).catch(() => {
          this.DataLock = false
        })
      }
    },
    RadioChange (item, index, e) { // 单选
      item.correctAnswers = e.detail.value
    },
    CheckboxChange (item, index, e) { // 多选
      let Arr = []
      if (item.correctAnswers !== null && item.correctAnswers !== '') {
        Arr = item.correctAnswers.split(',')
      }
      Arr.push(e.detail.value)
      Arr = [...new Set(Arr)]
      item.correctAnswers = Arr[Arr.length - 1].join(',')
    },
    Init () {
      if (this.UserInfo !== null) {
        this.GetArticleDetail({ urlData: { id: Taro.getCurrentInstance().router.params.id } }).then((res) => {
          this.ArticleInfo = res.data.data || {}
          this.$refs.MainPage.HideLoading()
        })
        if (this.UserInfo.studentId === null || this.UserInfo.studentId === '') {
          if (this.$refs.MainPage) {
            this.$refs.MainPage.ShowStudentIdPopup = true
          }
        }
      }
    },
    getQuestionTitle (item, index) {
      let qType = '判断';
      if (item.answerType === 'radio') {
        qType = '单选';
      } else if (item.answerType === 'checkbox') {
        qType = '多选';
      }

      const qIndex = index + 1

      return `${qIndex}、[${qType}] ${item.title}`
    }
  }
}
</script>

<style lang="scss">
@import "page.scss";
</style>
