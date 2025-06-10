<template>
  <view class="modal" v-if="visible">
    <view class="modal-content">
      <!-- 标题 -->
      <view class="modal-header">
        <text class="modal-title">选择优惠券</text>
        <u-icon name="close" size="30" @click="cancelSelection" />
      </view>

      <!-- 优惠券列表 -->
      <view class="modal-body">
        <up-checkbox-group v-model="selectedCoupon" placement="column">
          <view
            v-for="coupon in props.coupons"
            :key="coupon.id"
            class="coupon-item"
          >
            <u-checkbox
              :name="coupon.id"
              :check="selectedCoupon.includes(coupon.id)"
              class="coupon-checkbox"
            >
            </u-checkbox>
            <view class="coupon-info">
              <text class="coupon-title">{{ coupon.title }}</text>
              <text class="coupon-detail">{{ coupon.detail }}</text>
              <text class="coupon-count">优惠金额：¥{{ coupon.count }}</text>
            </view>
          </view>
        </up-checkbox-group>
      </view>

      <!-- 底部操作按钮 -->
      <view class="modal-footer">
        <u-button type="default" @click="useAllCoupons">使用全部</u-button>
        <u-button
          type="primary"
          @click="confirmSelection"
          :disabled="selectedCoupon.length > 0 ? false : true"
          >确定</u-button
        >
        <u-button type="default" @click="cancelSelection">取消</u-button>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type Coupon from "../dataForm/Coupon";

// 定义组件的 props
interface Props {
  visible: boolean; // 是否显示弹出框
  coupons: Coupon[]; // 可用的优惠券列表
}

const props = defineProps<Props>();
const emit = defineEmits(["close", "confirm"]); // 定义事件：关闭和确认
console.log(props.coupons[0].title);

// 选中的优惠券ID
const selectedCoupon = ref<number[]>([]);
console.log(selectedCoupon);

// 使用全部优惠券
const useAllCoupons = () => {
  emit("confirm", props.coupons);
};

// 确认选择
const confirmSelection = () => {
  const selectedCoupons = props.coupons.filter((coupon) =>
    selectedCoupon.value.includes(coupon.id)
  );
  emit("confirm", selectedCoupons);
};

// 取消选择
const cancelSelection = () => {
  emit("close", []);
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* 加深遮罩背景 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  width: 90%;
  max-width: 600rpx;
  background-color: #ffffff;
  border-radius: 16rpx; /* 增加圆角 */
  padding: 20rpx;
  box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
  animation: fadeIn 0.3s ease; /* 添加弹出动画 */
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
  border-bottom: 1rpx solid #f0f0f0; /* 添加分割线 */
  padding-bottom: 10rpx;
}

.modal-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333333;
}

.modal-body {
  max-height: 400rpx;
  overflow-y: auto;
  padding-right: 10rpx;
}

.coupon-item {
  display: flex;
  align-items: center;
  margin-bottom: 15rpx;
  padding: 15rpx;
  border: 1rpx solid #e5e5e5;
  border-radius: 12rpx; /* 增加圆角 */
  background-color: #f9f9f9;
  transition: all 0.3s ease; /* 添加过渡效果 */
}

.coupon-item:hover {
  background-color: #f0f8ff; /* 鼠标悬停时背景色 */
  border-color: #2979ff; /* 鼠标悬停时边框颜色 */
}

.coupon-info {
  display: flex;
  flex-direction: column;
  margin-left: 10rpx;
}

.coupon-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #333333;
}

.coupon-detail {
  font-size: 24rpx;
  color: #666666;
  margin-top: 5rpx;
}

.coupon-count {
  font-size: 26rpx;
  color: #fa3534;
  margin-top: 5rpx;
  font-weight: bold;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 20rpx;
}

.u-button {
  flex: 1;
  margin: 0 5rpx;
  padding: 10rpx 0;
  font-size: 28rpx;
  text-align: center;
  border-radius: 8rpx;
}

.u-button:first-child {
  margin-left: 0;
}

.u-button:last-child {
  margin-right: 0;
}

.u-button[type="default"] {
  background-color: #f5f5f5;
  color: #333333;
}

.u-button[type="primary"] {
  background-color: #2979ff;
  color: #ffffff;
}

.u-button[type="primary"]:disabled {
  background-color: #cccccc;
  color: #ffffff;
}

.close-icon {
  color: #999999;
  cursor: pointer;
  transition: color 0.3s ease;
}

.close-icon:hover {
  color: #333333;
}

/* 弹出动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
