<template>
  <view class="modal" v-if="visible">
    <view class="address">
      <view style="display: flex"
        ><up-icon name="map" size="15"></up-icon
        >这是地址信息这是地址信息这是地址信息</view
      ></view
    >

    <view class="modal-content">
      <!-- 标题 -->
      <view class="modal-header">
        <text class="modal-title" v-if="type === 'buy'">确认购买信息</text>
        <text class="modal-title" v-if="type === 'cart'"
          >确认加入购物车信息</text
        >
      </view>
      <view class="product-card">
        <image :src="product.images[0]" class="product-img"></image>
        <view class="right-card">
          <view class="price-sigle">单价：¥{{ dynamicPrice }}</view>
          <view class="price-discount" v-if="hasDiscount"
            >优惠后：¥{{ discountedPrice }}起</view
          >
          <!-- <view class="price-all">总价：¥{{ priceAll }}</view> -->
        </view>
        <u-number-box
          :min="0"
          size="small"
          :max="dynamicStore"
          inputWidth="25"
          buttonWidth="25"
          v-model="quantity"
        ></u-number-box>
        <text class="store">库存{{ dynamicStore }}</text>
      </view>

      <!-- 当前配置 -->
      <view class="modal-body">
        <view class="config-info">
          <text class="config-current">当前配置：</text>
          <text class="config-value">{{ selectedCombination }}</text>
          <SelectConfig :select="select" :product="product"></SelectConfig>
        </view>
      </view>

      <!-- 底部操作按钮 -->
      <view class="modal-footer">
        <button class="cancel-btn" @click="closeModal">取消</button>
        <button
          class="confirm-btn"
          @click="confirmAction"
          :disabled="quantity == 0"
        >
          确认
        </button>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import type Coupon from "../dataForm/Coupon";
import {
  calculatePriceWithAutoCoupons,
  calculatePriceWithSelectedCoupons,
} from "../utill/computePrice";
import type Product from "@/dataForm/Product";
import SelectConfig from "./selectConfig.vue";
import CouponComponent from "./couponComponent.vue";

// 定义组件的 props
interface Props {
  dynamicStore: number;
  visible: boolean; // 是否显示弹出框
  selectedCombination: string; // 当前选择的配置组合
  dynamicPrice: number | string; // 当前价格
  discountedPrice: number | null; // 优惠后的价格
  hasDiscount: boolean; // 是否有优惠
  type: "cart" | "buy";
  coupon: Coupon[];
  product: Product;
  select: { [key: number]: string };
}

const props = defineProps<Props>();
const emit = defineEmits(["close", "confirm"]); // 定义事件：关闭和确认

//是否使用优惠券

// 数量选择
const quantity = ref(0);

// 关闭弹出框
const closeModal = () => {
  emit("close");
};

// 确认操作
const confirmAction = () => {
  emit("confirm", quantity.value);
};
</script>

<style scoped>
.modal {
  background-color: gray;
  width: 100vw;
  height: 100%;
  background-color: white;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  /* border-radius: 10rpx 10rpx 0 0; */
  overflow-y: auto;
}

.modal-content {
  width: 100%;
  background-color: #fff;
  border-radius: 10rpx;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.modal-title {
  font-size: 38rpx;
  font-weight: bold;
}

.close-icon {
  font-size: 30rpx;
  cursor: pointer;
}

.modal-body {
  margin-bottom: 20rpx;
}

.config-info {
  max-height: 800rpx;
  overflow-y: auto;
  margin-bottom: 10rpx;
  margin-top: 20rpx;
}
.config-current {
  margin-top: 20rpx;
  font-size: 30rpx;
  font-weight: bold;
}
.config-value {
  margin-top: 20rpx;
  font-size: 30rpx;
}

.modal-footer {
  display: flex;
  width: 100%;
  position: absolute;
  bottom: 0rpx;
  justify-content: space-between;
}

.cancel-btn,
.confirm-btn {
  flex: 1;
  margin: 0 5rpx;
  padding: 10rpx 0;
  font-size: 24rpx;
  text-align: center;
  border: none;
  border-radius: 5rpx;
  cursor: pointer;
}

.cancel-btn {
  background-color: #f5f5f5;
  color: #333;
}

.confirm-btn {
  background-color: #2979ff;
  color: #fff;
}
.address {
  justify-content: space-between;
  display: flex;
  padding-top: 70rpx;
  margin-bottom: 10rpx;
  padding-right: 30rpx;
}
.product-card {
  width: 100vw;
  display: flex;
}
.product-img {
  width: 20vw;
  height: 20vw;
  border-radius: 10rpx;
}
.right-card {
  padding: 15rpx;
  width: 30vw;
}
.price-sigle {
  color: #fa3534;
  font-size: 28rpx;
  /* font-weight: bold; */
}
.price-discount {
  color: #e88a79;
  font-size: 28rpx;

  /* font-weight: bold; */
}
.price-all {
  color: #4060f5;
  font-weight: bold;
}
.store {
  font-size: 25rpx;
  color: gray;
  text-align: center;
  line-height: 1.5; /* 设置行高 */
  display: flex; /* 使用 Flex 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  padding-left: 20rpx;
}
.use-coupon {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  padding: 0 10rpx;
}
.selec-coupon {
  margin: 0 10rpx;
  width: 25vw;
}
</style>
