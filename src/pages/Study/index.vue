<template>
  <view class="page flex-v">

    <!-- 搜索 -->
    <view class="Search">
      <view class="flex-h">
        <text class="iconfont iconsousuo"></text>
        <view class="flex-item">
          <navigator url="/pages/Index/Search/index">搜索你感兴趣的内容</navigator>
        </view>
      </view>
    </view>

    <!-- 内容 -->
    <view class="flex-item">
      <view class="flex-h">

        <!-- 左侧菜单 -->
        <view class="LeftMenu">
          <scroll-view :scroll-y="true" :enhanced="true" :show-scrollbar="false" style="height: 100%;">
            <view v-for="(item, index) in MenuList" :key="index" class="MenuItem" :class="{'active': item.id - 0 === CurrentMenuId - 0}" @tap="CutMenu(item)">{{item.name}}</view>
          </scroll-view>
        </view>

        <!-- 右侧内容 -->
        <view class="RightContent flex-item">

        </view>

      </view>
    </view>

  </view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions, mapMutations: mapUserMutations } = createNamespacedHelpers('user')
export default {
  name: 'Study',
  data () {
    return {
      CurrentMenuId: 1,
      MenuList: [
        { name: '菜单1', id: 1 },
        { name: '菜单2', id: 2 },
        { name: '菜单3', id: 3 },
        { name: '菜单4', id: 4 },
        { name: '菜单5', id: 5 },
        { name: '菜单6', id: 6 },
        { name: '菜单7', id: 7 },
        { name: '菜单8', id: 8 },
        { name: '菜单9', id: 9 },
        { name: '菜单10', id: 10 },
        { name: '菜单11', id: 11 },
        { name: '菜单12', id: 12 },
        { name: '菜单13', id: 13 },
        { name: '菜单14', id: 14 },
        { name: '菜单15', id: 15 },
        { name: '菜单16', id: 16 }
      ]
    }
  },
  computed: {
    ...mapUserState({
      UserInfo: x => x.UserInfo // 用户信息
    })
  },
  components: {
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
    Init () {
    },
    CutMenu (item) {
      this.CurrentMenuId = item.id
    }
  }
}
</script>

<style lang="scss">
@import "page.scss";
</style>
