<template>
  <view class="page">
    <MainPage @UserInfoChange="Init">
      <scroll-view scroll-y="true" style="height: 100%;" :refresher-enabled="true" @refresherrefresh="OnRefresh" :refresher-triggered="IsPull" refresher-background="none" refresher-default-style="black">
        <view class="Content" v-if="UserInfo !== null">
          <view class="flex-h">
            <view>头像</view>
            <view class="flex-item">
              <view class="UserIcon">
                <image mode="aspectFill" :src="UserInfo.avatar" class="centerLabel"></image>
              </view>
            </view>
          </view>
          <view class="flex-h">
            <view>昵称</view>
            <view class="flex-item">
              <text>{{UserInfo.nickName}}</text>
              <!-- <input placeholder="请输入昵称" /> -->
            </view>
          </view>
          <view class="flex-h">
            <view>姓名</view>
            <view class="flex-item">
              <input placeholder="请输入姓名" v-model="Form.name" />
              <!-- <input placeholder="请输入姓名" /> -->
            </view>
          </view>
          <view class="flex-h">
            <view>性别</view>
            <view class="flex-item">
              <!-- <text>{{Form.sex - 0 === 1 ? '男' : '女'}}</text> -->
              <picker @change="SexChange" :value="SexIndex" :range="SexList" range-key="name">
                <view class="picker" style="font-size: 14px">{{SexList[SexIndex].name}}</view>
              </picker>
            </view>
          </view>
          <view class="flex-h">
            <view><text class="Point">*</text>手机号</view>
            <view class="flex-item">
              <input placeholder="请输入手机号" v-model="Form.phone" />
            </view>
          </view>
          <view class="flex-h">
            <view>邮箱</view>
            <view class="flex-item">
              <input placeholder="请输入邮箱" v-model="Form.email" />
            </view>
          </view>
          <view class="flex-h">
            <view><text class="Point">*</text>学校</view>
            <view class="flex-item">
              <Picker v-model="Form.schoolId" :range="schoolList" @change="handleSchoolChange" label-key="name" value-key="schoolId">
                <text>{{ Form.schoolName || '请选择学校' }}</text>
              </Picker>
            </view>
          </view>
          <view class="flex-h">
            <view><text class="Point">*</text>专业</view>
            <view class="flex-item">
              <Picker v-model="Form.specialtyId" :range="specialtyList" @change="handleSpecialtyChange" label-key="name" value-key="specialtyId">
                <text>{{ Form.specialtyName || '请选择专业' }}</text>
              </Picker>
            </view>
          </view>
          <view class="flex-h">
            <view>学届</view>
            <view class="flex-item">
              <input placeholder="请输入学届" v-model="Form.schoolBatch" />
            </view>
          </view>
          <view class="flex-h">
            <view><text class="Point">*</text>学号</view>
            <view class="flex-item">
              <input placeholder="请输入学号" v-model="Form.studentId" />
            </view>
          </view>
          <view class="Save">
            <view @tap="Save">保存</view>
          </view>
        </view>
      </scroll-view>
    </MainPage>
  </view>
</template>

<script>
import MainPage from '@/components/MainPage'
import Picker from '@/components/Picker'
import { createNamespacedHelpers } from 'vuex'
import ToolClass from '@/util/PublicMethod'
import Api from '@/util/Api'

const { mapState: mapUserState, mapActions: mapUserActions, mapMutations: mapUserMutations } = createNamespacedHelpers('user')

export default {
  name: 'MyInfo',
  data () {
    return {
      SexIndex: 0,
      SexList: [
        { id: 1, name: '男' },
        { id: 2, name: '女' }
      ],
      IsPull: false,
      DataLock: false,
      Form: {
        name: null,
        personId: null,
        sex: null,
        phone: null,
        email: null,
        schoolId: null,
        schoolName: null,
        schoolBatch: null,
        specialtyId: null,
        specialtyName: null,
        studentId: null
      },
      schoolList: [],
      specialtyList: [],
    }
  },
  computed: {
    ...mapUserState({
      UserInfo: x => x.UserInfo, // 用户信息
      Student: x => x.UserInfo.student || {}, // 学生信息
    })
  },
  components: {
    MainPage,
    Picker,
  },
  created () {
    this.getSchoolList()
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  methods: {
    ...mapUserActions([
      'PutUserInfo'
    ]),
    ...mapUserMutations([
      'UpdateUserInfo',
      'UpdateStudentInfo',
    ]),
    Init () {
      if (this.UserInfo !== null) {
        for (let key in this.Form) {
          this.Form[key] = this.UserInfo[key]
        }
      }
      if (this.Student !== null) {
        for (let key in this.Form) {
          this.Form[key] = this.Student[key]
        }
      }
    },
    SexChange (e) {
      this.SexIndex = e.detail.value - 0
      this.Form.sex = this.SexList[e.detail.value - 0].id
    },
    Save () {
      if (!this.DataLock) {
        this.DataLock = true
        let Data = {}
        for (let key in this.Form) {
          if (this.Form[key] !== null && this.Form[key] !== '') {
            Data[key] = this.Form[key]
          }
        }
        this.PutUserInfo({ data: { data: { ...Data } } }).then((res) => {
          console.log(res.data.data)
          // this.UpdateUserInfo({ ...res.data.data })
          wx.showToast({
            title: '保存成功',
            icon: 'none',
            duration: 2000
          })
          this.DataLock = false
          Taro.navigateBack({ delta: 1 })
        }).catch(() => {
          this.DataLock = false
        })
      }
    },
    OnRefresh (e) {
      this.IsPull = true
      window.setTimeout(() => {
        this.IsPull = false
      }, 1000)
    },
    getSchoolList () {
      ToolClass.ToolRequest({
        ...Api.GetSchoolList,
        success: (res) => {
          this.schoolList = res.data.data
        }
      })
    },
    getSpecialtyList (schoolId) {
      ToolClass.ToolRequest({
        ...Api.GetSpecialtyList,
        queryData: { schoolId },
        success: (res) => {
          this.specialtyList = res.data.data
        }
      })
    },
    handleSchoolChange (school) {
      this.Form.schoolName = school.name
      this.Form.specialtyId = null
      this.Form.specialtyName = null
      this.getSpecialtyList(school.schoolId)
    },
    handleSpecialtyChange (specialty) {
      this.Form.specialtyName = specialty.name
    }
  }
}
</script>

<style lang="scss">
@import "page.scss";
</style>
