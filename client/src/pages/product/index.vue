<template class="-body">
  <NaviHeader> <NaviBack></NaviBack>商品详情 </NaviHeader>

  <view
    class="product-page"
    :class="{ 'bottom-pop': showModal }"
    v-if="product"
  >
    <!-- 轮播图 -->
    <swiper class="swiper" indicator-dots autoplay interval="3000">
      <swiper-item v-for="(image, index) in product.images" :key="index">
        <image :src="image" class="swiper-image" mode="aspectFill" />
      </swiper-item>
    </swiper>

    <!-- 商品信息 -->
    <view class="product-info">
      <text class="product-title">{{ product.title }}</text>
      <view class="price-container">
        <view>
          <text class="price">¥{{ dynamicPrice }}</text>
          <text class="original-price" v-if="product.originalPriceMap">
            ¥{{ dynamicOriginalPrice }}
          </text>
        </view>
        <view
          v-if="hasDiscount && availableCoupons.length == 1"
          class="discounted-price"
        >
          优惠后：¥{{ discountedPrice }}
        </view>
        <view
          v-if="hasDiscount && availableCoupons.length > 1"
          class="discounted-price"
        >
          优惠后最低：¥{{ discountedPrice }}
        </view>
      </view>
      <view class="rating">
        <up-rate
          v-model="product.star"
          count="5"
          v-if="product.star"
          :readonly="true"
          :allow-half="true"
          activeColor="#4a68ee"
        />
        <text class="rating-text">{{ product.star }} 分</text>
        <text class="buy-num" m>{{ product.buyNum }} 人购买</text>
      </view>
      <view class="tags">
        <text v-for="tag in product.tags" :key="tag" class="tag">{{
          tag
        }}</text>
        <text class="tag-count" v-if="hasDiscount"
          >优惠券 x{{ availableCoupons.length }}</text
        >
      </view>
      <view class="place"
        ><up-icon name="map" size="20"></up-icon>发货地：{{ product.place }}
      </view>
    </view>
    <!-- //选择配置 -->
    <SelectConfig :select="select" :product="product"></SelectConfig>

    <!-- 商品详情 -->
    <view class="product-detail">
      <text class="section-title">商品详情</text>
      <view class="detail-content">
        <text>这里是商品详情内容...</text>
      </view>
    </view>

    <!-- 商品评论 -->
    <view class="product-comments">
      <view class="product-comments-header">
        <view class="section-title">商品评论</view>
        <view class="view-all-comments" @click="viewAllComments"
          >查看全部评论</view
        >
      </view>
      <view
        class="comment-item"
        v-for="(comment, index) in product.comments"
        :key="index"
      >
        <text class="comment-user">{{ comment.user }}</text>
        <text class="comment-content">{{ comment.content }}</text>
        <up-rate
          v-model="comment.star"
          count="5"
          v-if="comment.star"
          :readonly="true"
          :allow-half="true"
          activeColor="#4a68ee"
          size="10"
        />
      </view>
    </view>

    <!-- 底部操作栏 -->
    <view class="bottom-bar">
      <u-icon
        name="heart"
        size="30"
        labelPos="bottom"
        label="收藏"
        color="#fa3534"
        @click="handleFavorite"
      />
      <u-icon
        labelPos="bottom"
        label="分享"
        name="share-square"
        size="30"
        color="#64ba6d"
        @click="handleShare"
      />
      <u-button type="warning" class="cart-btn" @click="addToCart"
        >加入购物车</u-button
      >
      <u-button type="primary" class="buy-btn" @click="buyNow"
        >立即购买</u-button
      >
    </view>
  </view>
  <BackToTop
    :style="{ display: scrollTopCurrent > 400 ? 'block' : 'none' }"
  ></BackToTop>

  <!-- 底部弹出框组件 -->
  <bottom-pop :visible="showModal" @close="showModal = false">
    <Comfirm
      v-if="showModal && product"
      :dynamic-store="dynamicStore ? dynamicStore : 0"
      :visible="showModal"
      :selectedCombination="selectedCombination"
      :dynamicPrice="dynamicPrice"
      :discountedPrice="discountedPrice"
      :hasDiscount="hasDiscount"
      @close="closeModal"
      @confirm="handleConfirm"
      :type="actionType"
      :coupon="availableCoupons"
      :product="product"
      :select="select"
    />
  </bottom-pop>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { onPageScroll } from "@dcloudio/uni-app";
import BackToTop from "@/component/backToTop.vue";
import Comfirm from "@/component/comfirm.vue";
import type Coupon from "../../dataForm/Coupon";
import type Product from "../../dataForm//Product";
import { _product, _myCoupon } from "../../test/test";
import SelectConfig from "@/component/selectConfig.vue";
import BottomPop from "@/component/bottomPop.vue";
import { useStore } from "vuex";
import { onLoad } from "@dcloudio/uni-app";
import getUser from "@/utill/getUser";
import getProductById from "@/utill/getProductById";
import NaviHeader from "@/component/naviHeader.vue";
import NaviBack from "@/component/naviBack.vue";
import addGoodCar from "@/utill/addGoodCar";
import createPay from "@/utill/createPay";
import type Adress from "../../dataForm/Adress";

import {
  getSelectedCombination,
  getDynamicPrice,
  getDynamicOriginalPrice,
  getAvailableCoupons,
  getDiscountedPrice,
} from "../../utill/couponUtils";

const API = "http://127.0.0.1:8080/api";

const myCoupon = ref<Coupon[]>([]);
const product = ref<Product>();
const adress = ref<Adress[]>([]); // 假设地址是一个数组，实际使用时根据需要调整类型

const store = useStore();

const ifLogin = ref(false);

// 用户选择的配置
const select = ref<{ [key: number]: string }>({});

// 初始化
onLoad((option: any) => {
  // 初始化个人优惠卷
  getUser(API, store.state.sessionTokenV)
    .then((user) => {
      ifLogin.value = true;
      myCoupon.value = user.coupon;
      adress.value = user.adress || []; // 确保地址是一个数组
    })
    .catch((err) => {
      // console.error("获取用户失败:", err);
    });

  getProductById(API, option.id)
    .then((_product) => {
      // 初始化produnct
      product.value = _product;
      // // 初始化默认选择配置
      _product.configs.forEach((config: any) => {
        select.value[config.id] = config.config[0]; // 默认选择每个配置的第一个选项
      });
    })
    .catch((err) => {
      console.error("获取产品失败:", err);
    });
});

// 生成配置的map key
const selectedCombination = computed(() => {
  if (!product.value) return "";
  return getSelectedCombination(product.value, select.value);
  // const selectedCombination = product.value.configs
  //   .map((config) => select.value[config.id])
  //   .join("-");
  // return selectedCombination;
  // 根据组合从 priceMap 中获取价格
});

// 动态计算库存
const dynamicStore = computed(() => {
  return product.value?.storeMap[selectedCombination.value];
});

// 计算动态价格
const dynamicPrice = computed(() => {
  return product.value
    ? Number(getDynamicPrice(product.value, selectedCombination.value))
    : 0;
  // 根据组合从 priceMap 中获取价格
  // return product.value.priceMap[selectedCombination.value] || "价格未知";
});

// 计算动态原始价格
const dynamicOriginalPrice = computed(() => {
  return product.value
    ? getDynamicOriginalPrice(product.value, selectedCombination.value)
    : "";
  // return (
  //   product.value.originalRriceMap?.[selectedCombination.value] || "价格未知"
  // );
});

// 动态计算可用的优惠券数组
const availableCoupons = computed(() => {
  return getAvailableCoupons(
    myCoupon.value || [],
    product.value!,
    selectedCombination.value
  );
  // if (!myCoupon.value || myCoupon.value.length === 0) return [];

  // // 根据当前选择的配置组合，筛选符合条件的优惠券
  // return myCoupon.value.filter((coupon) => {
  //   return (
  //     (coupon.classes === product.value.classes ||
  //       coupon.subClasses === product.value.subClasses ||
  //       coupon.enableId.includes(product.value.id)) &&
  //     product.value.enableDiscountMap?.[selectedCombination.value]
  //   );
  // });
});

// 计算是否符合优惠条件
const hasDiscount = computed(() => {
  return availableCoupons.value.length > 0 ? true : false;
});

// 计算券后最多可优惠的价格
const discountedPrice = computed(() => {
  return getDiscountedPrice(Number(dynamicPrice.value), availableCoupons.value);
  // if (!hasDiscount.value || availableCoupons.value.length === 0) return null;

  // // 找到最大优惠金额
  // const maxDiscount = Math.max(
  //   ...availableCoupons.value.map((coupon) => coupon.count || 0)
  // );

  // // 计算券后价格
  // return Number(dynamicPrice.value) - maxDiscount;
});

// 监听当前屏幕位置，并且使用防抖
import { useScroll } from "@/utill/handelScroll";
const { scrollTopCurrent, setScrollTopCurrent } = useScroll(200);
onPageScroll((e) => {
  setScrollTopCurrent(e);
});

// 控制弹出框显示
const showModal = ref(false);
const actionType = ref<"cart" | "buy">("cart");

const openCartModal = (type: "cart" | "buy") => {
  actionType.value = type;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const handleConfirm = (quantity: number) => {
  if (actionType.value == "cart") {
    if (ifLogin.value) {
      addGoodCar(
        API,
        store.state.sessionTokenV,
        product.value?.id ?? 1,
        select.value,
        quantity
      )
        .then(() => {
          uni.showToast({ title: "已加入购物车", icon: "success" });
        })
        .catch((err) => {
          console.error("添加到购物车失败:", err);
          uni.showToast({ title: "添加失败", icon: "none" });
        });
    } else {
      uni.showModal({
        title: "提示",
        content: "请先登录",
        showCancel: true,
        success: (res) => {
          if (res.confirm) {
            uni.switchTab({
              url: "/pages/personCenter/index",
            });
          } else {
            closeModal();
          }
        },
      });
    }
  }
  if (actionType.value == "buy") {
    if (ifLogin.value) {
      // 先创建订单

      createPay(
        API,
        store.state.sessionTokenV,
        product.value?.id ?? 111,
        select.value,
        quantity,
        dynamicPrice.value,
        discountedPrice.value ?? 0,
        0,
        adress.value ? adress.value[0].id : 2
      )
        .then((payId) => {
          uni.navigateTo({
            url: `/pages/pay/index?payIds=${JSON.stringify([payId])}`,
          });
        })
        .catch((err) => {
          uni.showToast({
            icon: "error",
            title: `创建订单失败${err}`,
          });
        });
    } else {
      uni.showModal({
        title: "提示",
        content: "请先登录",
        showCancel: true,
        success: (res) => {
          if (res.confirm) {
            uni.switchTab({
              url: "/pages/personCenter/index",
            });
          } else {
            closeModal();
          }
        },
      });
    }
  }
  closeModal();
};

// 添加到购物车
const addToCart = () => {
  openCartModal("cart");
  // uni.showToast({ title: "已加入购物车", icon: "success" });
};

// 立即购买
const buyNow = () => {
  openCartModal("buy");
  // uni.showToast({ title: "立即购买", icon: "success" });
};

const handleFavorite = () => {
  uni.showToast({ title: "已收藏", icon: "success" });
};

const handleShare = () => {
  uni.showToast({ title: "分享成功", icon: "success" });
};

// 查看全部评论
const viewAllComments = () => {
  uni.navigateTo({ url: "/pages/comments/index" });
};
</script>

<style scoped>
.product-page {
  background-color: #f5f5f5;
}
.bottom-pop {
  overflow: hidden;
}

.swiper {
  height: 400rpx;
}

.swiper-image {
  width: 100%;
  height: 100%;
}

.product-info {
  padding: 20rpx;
  background-color: #fff;
}

.product-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.price-container {
  display: flex;
  align-items: baseline;
  margin-bottom: 10rpx;
  justify-content: space-between;
}

.price {
  font-size: 36rpx;
  color: #fa3534;
  font-weight: bold;
}

.original-price {
  font-size: 28rpx;
  color: #999;
  text-decoration: line-through;
  margin-left: 10rpx;
}

.rating {
  display: flex;
  align-items: center;
  margin-bottom: 10rpx;
}

.rating-text {
  margin-left: 10rpx;
  font-size: 24rpx;
  color: #666;
}
.buy-num {
  flex: 1;
  margin-left: 10rpx;
  font-size: 24rpx;
  color: #666;
  text-align: right;
}
.place {
  justify-content: end;
  align-content: center;
  display: flex;
  font-size: 26rpx;
  color: #666;
  text-align: right; /* 确保文本右对齐 */
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
}
.tag-count {
  background-color: #ff4f4f;
  color: white;
  padding: 5rpx 10rpx;
  border-radius: 5rpx;
  font-size: 24rpx;
}

.tag {
  background-color: #f5f5f5;
  color: #333;
  padding: 5rpx 10rpx;
  border-radius: 5rpx;
  font-size: 24rpx;
}

.config-section {
  padding: 20rpx;
  background-color: #fff;
  margin-top: 10rpx;
}

.config-item {
  margin-bottom: 20rpx;
}

.config-title {
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.config-options {
  display: flex;
  gap: 10rpx;
}

.product-detail {
  padding: 20rpx;
  background-color: #fff;
  margin-top: 10rpx;
}

.section-title {
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.detail-content {
  font-size: 24rpx;
  color: #666;
}

.product-comments {
  padding: 20rpx;
  background-color: #fff;
  margin-top: 10rpx;
}
.product-comments-header {
  justify-content: space-between;
  display: flex;
}

.comment-item {
  margin-bottom: 10rpx;
}

.comment-user {
  font-size: 24rpx;
  font-weight: bold;
  margin-bottom: 5rpx;
}

.comment-content {
  font-size: 24rpx;
  color: #666;
}

.view-all-comments {
  font-size: 24rpx;
  color: #2979ff;
  margin-top: 10rpx;
  cursor: pointer;
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 -2rpx 8rpx rgba(0, 0, 0, 0.1);
  padding-left: 20rpx;
  padding-right: 20rpx;
}

.cart-btn {
  flex: 1;
  margin-right: 10rpx;
}

.buy-btn {
  flex: 1;
}

.header {
  position: relative; /* 确保子元素可以相对定位 */
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  padding: 0 25rpx;
  width: 100%;
  text-align: center;
}

.back-icon {
  position: absolute; /* 让返回按钮脱离文档流 */
  left: 10rpx;
}
.discounted-price {
  float: right;
  color: #e88a79;
}
</style>
