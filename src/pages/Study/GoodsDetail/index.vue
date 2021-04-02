<template>
  <view class="page flex-v">
    <view class="flex-item">
      <view>
        <scroll-view scroll-y="true" style="height: 100%;" :refresher-enabled="true" @refresherrefresh="OnRefresh" :refresher-triggered="IsPull" refresher-background="none" refresher-default-style="black">
          <view class="Content">

            <!-- banner -->
            <view class="BannerSwiper">
              <view>
                <swiper :autoplay="true" :circular="true" :indicator-dots="true" indicator-color="rgba(0,0,0,0.4)" indicator-active-color="rgba(255,255,255,0.8)">
                  <swiper-item class="SwiperItem" v-for="(item, index) in BannerList" :key="index">
                    <view class="BannerItem">
                      <image mode="aspectFill" :src="item.img"></image>
                    </view>
                  </swiper-item>
                </swiper>
              </view>
            </view>

            <!-- title -->
            <view class="Title flex-h">
              <view class="flex-item">商品名称</view>
            </view>

            <!-- 详情 -->
            <view class="Detail">
              <view class="Text">商品详情</view>
              <image mode="widthFix" :src="TestImg"></image>
            </view>

          </view>
        </scroll-view>
      </view>
    </view>
    <view class="Bottom flex-h">
      <view class="flex-item">
        <view>￥3000</view>
      </view>
      <view class="Btn active" @tap="ToBuy">立即购买</view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapUserState, mapActions: mapUserActions, mapMutations: mapUserMutations } = createNamespacedHelpers('user')
export default {
  name: 'GoodsDetail',
  data () {
    return {
      IsPull: false,
      BannerList: [
        { img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606120989360&di=8610f1678b51e26de6d4c6af39d1cf63&imgtype=0&src=http%3A%2F%2Fattachments.gfan.com%2Fforum%2F201503%2F19%2F211608ztcq7higicydxhsy.jpg' },
        { img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606120989359&di=46ae1d0f0d4f1f3740139191398f2a81&imgtype=0&src=http%3A%2F%2Fpic.baike.soso.com%2Fp%2F20131230%2F20131230165604-1960511167.jpg' }
      ],
      TestImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606120989360&di=8610f1678b51e26de6d4c6af39d1cf63&imgtype=0&src=http%3A%2F%2Fattachments.gfan.com%2Fforum%2F201503%2F19%2F211608ztcq7higicydxhsy.jpg'
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
    ToBuy () {
      Taro.navigateTo({ url: `/pages/Index/SubmitOrder/index?order=123` })
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
