<template>
  <NaviHeader>
    <Header
      @click="showCar = true"
      :num="cartList.length"
      :if-show-region="true"
      @search="handleSearch"
    ></Header
  ></NaviHeader>
  <!-- <view class="header-sticky">
    <Header @click="showCar = true" :num="cartList.length"></Header>
  </view> -->

  <view :class="{ 'bottom-pop': showCar }" class="main-page">
    <Carousesel />
    <Recommend @add="handleAdd" />
  </view>

  <BackToTop
    :style="{ display: scrollTopCurrent > 400 ? 'block' : 'none' }"
  ></BackToTop>
  <BottomPop :visible="showCar" @close="showCar = false">
    <view class="cart-page">
      <view
        v-for="(item, idx) in cartList"
        :key="item.id"
        class="cart-item-wrap"
      >
        <view class="cart-item">
          <image :src="item.product.images[0]" class="item-img" />
          <view class="item-info">
            <view class="item-title">{{ item.product.title }}</view>
            <view class="item-desc">{{ key[idx] }}</view>
            <view class="item-rate">
              <up-rate
                count="5"
                v-model="item.product.star"
                size="18"
                :readonly="true"
                :allow-half="true"
                activeColor="#4a68ee"
              ></up-rate>
              <text class="star-num">{{ item.product.star.toFixed(1) }}</text>
            </view>
            <view class="item-price">¥{{ item.product.price }}</view>
          </view>
        </view>
      </view>
    </view>
  </BottomPop>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { onShow } from "@dcloudio/uni-app";
import getUser from "../../utill/getUser";
import Header from "../../component/header.vue";
import Carousesel from "../../component/carousel.vue";
import Recommend from "@/component/recommend.vue";
import { onPageScroll } from "@dcloudio/uni-app";
import BackToTop from "@/component/backToTop.vue";
import debounce from "@/utill/debounce";
import BottomPop from "@/component/bottomPop.vue";
import type Goods from "@/dataForm/Goods";
import { _myGoods } from "../../test/test";
import { getSelectedCombination } from "../../utill/couponUtils";
import NaviHeader from "@/component/naviHeader.vue";
import API from "@/static/API";
import { useStore } from "vuex";

const store = useStore();
const showCar = ref(false);
const cartList = ref<Goods[]>([]);

const scrollTopCurrent = ref(0);

onShow(() => {
  // 获取用户购物车数据
  if (store.state.sessionTokenV != "") {
    getUser(API, store.state.sessionTokenV)
      .then((user) => {
        if (user.Goods) {
          // console.log("获取购物车数据成功:", user.Goods);
          cartList.value = user.Goods;
        } else {
          uni.showToast({
            title: "购物车为空",
            icon: "none",
          });
          cartList.value = [];
        }
      })
      .catch((err) => {
        uni.showToast({
          title: "获取购物车数据失败",
          icon: "none",
        });
        console.error("获取购物车数据失败:", err);
      });
  }
});

function handleAdd() {
  // 获取用户购物车数据
  getUser(API, store.state.sessionTokenV)
    .then((user) => {
      if (user.Goods) {
        // console.log("获取购物车数据成功:", user.Goods);
        cartList.value = user.Goods;
      } else {
        uni.showToast({
          title: "购物车为空",
          icon: "none",
        });
        cartList.value = [];
      }
    })
    .catch((err) => {
      uni.showToast({
        title: "获取购物车数据失败",
        icon: "none",
      });
      console.error("获取购物车数据失败:", err);
    });
}

// 滚动事件处理函数
const handleScroll = debounce((e: { scrollTop: number }) => {
  scrollTopCurrent.value = e.scrollTop;
}, 200); // 设置防抖延迟为 100ms
// 监听页面滚动
onPageScroll((e) => {
  handleScroll(e);
});

// 生成配置的key
const key = cartList.value.map((item) => {
  return getSelectedCombination(item.product, item.config);
});

//
function handleSearch(e: string) {
  uni.navigateTo({
    url: `/pages/search/index?title=${e}`,
  });
}
</script>

<style scoped>
.header-sticky {
  position: sticky;
  top: 0;
  z-index: 99;
  background: #fff;
}

.cart-page {
  background: #fff;
  height: 60vh;
  padding-bottom: 120rpx;
  overflow-y: auto;
}
.cart-item-wrap {
  margin-bottom: 24rpx;
}
.cart-item {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 18rpx;
  margin-left: 24rpx;
  margin-right: 24rpx;
  margin-top: 50rpx;
  padding-left: 10rpx;
  box-shadow: 5rpx 5rpx 10rpx rgba(167, 167, 172, 0.8); /* 添加阴影效果 */
}
.item-img {
  width: 120rpx;
  height: 120rpx;
  border-radius: 12rpx;
  margin-right: 24rpx;
  object-fit: cover;
}
.item-info {
  flex: 1;
  min-width: 0;
}
.item-title {
  font-size: 28rpx;
  font-weight: 500;
  margin-bottom: 8rpx;
}
.item-desc {
  font-size: 24rpx;
  color: #888;
  margin-bottom: 8rpx;
}
.item-rate {
  display: flex;
  align-items: center;
  font-size: 22rpx;
  color: #faad14;
  margin-bottom: 8rpx;
}
.star-num {
  color: #999;
  margin-left: 8rpx;
  font-size: 22rpx;
}
.item-price {
  color: #fa3534;
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 8rpx;
}
.bottom-pop {
  overflow-y: hidden;
}
.main-page {
  height: 80vh;
  overflow-y: auto;
}
</style>
