<template>
  <view
    @click="handleClick"
    class="adress-card"
    :class="{ selected: props.ifSelect }"
  >
    <img :src="coupon.logo" class="image" />
    <view class="adress">
      <view class="adress-title">{{ coupon.title }}</view>
      <view class="adress-detail">{{ coupon.detail }}</view>
      <view style="display: flex">
        <text class="adress-class">{{ props.coupon.classes }} </text>

        <text class="adress-subclass">
          {{ props.coupon.subClasses }}</text
        ></view
      >

      <view class="person-info">
        <text class="person-name">有效期至：{{ props.coupon.time }}</text>
      </view>
    </view>
    <view class="person-phone">¥{{ props.coupon.count }}</view>
  </view>
</template>
<script setup lang="ts">
import type Coupon from "@/dataForm/Coupon";
const emit = defineEmits<{
  (event: "clickCard", data: number): void;
}>();
const props = defineProps<{
  coupon: Coupon;
  ifSelect: boolean;
}>();

function handleClick() {
  emit("clickCard", props.coupon.id);
}
</script>
<style scoped>
.adress {
  max-width: 50vw;
  display: flex;
  flex-direction: column;
  align-content: start;
}
.adress-title {
  font-size: 40rpx;
  color: rgba(221, 214, 214, 0.9);
  font-weight: 400;
}
.adress-detail {
  font-size: 25rpx;
  color: rgba(201, 197, 197, 0.7);
  font-weight: 250;
}
.adress-class {
  font-size: 32rpx;
  color: rgba(234, 231, 231, 0.7);
  font-weight: 600;
}
.adress-subclass {
  font-size: 32rpx;
  color: rgba(237, 233, 233, 0.7);
  font-weight: 550;
  margin-left: 10rpx;
}
.person-name {
  font-size: 22rpx;
  color: rgb(134, 130, 130);
  font-weight: 250;
  margin-right: 10rpx;
}
.person-phone {
  font-size: 58rpx;
  color: rgb(220, 2, 2);
  font-weight: 750;
  align-items: center;
  padding-top: 30rpx;
}
.adress-card {
  border-radius: 10rpx;
  margin: 30rpx;
  padding: 25rpx;
  justify-content: space-between;
  display: flex;
  border: 1rpx solid #ccc;
  background-color: rgb(9, 9, 188);
  border-radius: 10rpx;
}
.adress-card.selected {
  box-shadow: 10rpx 10rpx 10rpx rgba(227, 141, 36, 0.8); /* 添加阴影效果 */
  border: 6rpx solid rgba(227, 141, 36, 0.8);
}
.image {
  border: 1rpx solid white;
  width: 20vw;
  height: 20vw;
  border-radius: 50%;
  margin-right: 20rpx;
  align-items: center;
  display: flex;
  justify-content: center;
}
</style>
