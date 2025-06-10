<template>
  <view class="back" @click="handleBack">
    <up-icon name="arrow-up" color="#2979ff" size="40" />
  </view>
</template>

<script setup lang="ts">
// 阈值
const T = 300;

// 回到顶部
function handleBack() {
  uni.pageScrollTo({ scrollTop: 0, duration: 300 });
}
</script>

<style scoped>
.back {
  position: fixed;
  bottom: 80rpx; /* 距离屏幕底部 */
  right: 30rpx; /* 距离屏幕右侧 */
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
}
</style>
