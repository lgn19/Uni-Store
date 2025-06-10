<template>
  <view class="blank">
    <view class="header">
      <slot></slot>
      <!-- <view class="back-icon">
        <u-icon name="arrow-left" size="30" @click="handelClickBack" /></view
      > -->
      <!-- 支付 -->
    </view>
  </view>
</template>
<style>
.blank {
  position: sticky;
  top: 0;
  z-index: 99;
  background: linear-gradient(135deg, #068ff0, #0c69e4);
  text-align: center;
  padding-top: 100rpx;
  padding-bottom: 20rpx;
  font-size: 36rpx;
  font-weight: bold; /* 字体加粗 */
  width: 100%;
}
.header {
  position: relative; /* 确保子元素可以相对定位 */
  display: flex;
  flex-wrap: wrap;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  padding: 0 25rpx;
  width: 100%;
  text-align: center;
}
</style>
