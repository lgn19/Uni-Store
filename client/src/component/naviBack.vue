<template>
  <view class="back-icon">
    <u-icon name="arrow-left" size="30" @click="handelClickBack"
  /></view>
</template>
<script lang="js" setup>
const handelClickBack = () => {
  // console.log(1);
  uni.navigateBack({
    delta: 1,
  });
};
</script>
<style scoped>
.back-icon {
  position: absolute; /* 让返回按钮脱离文档流 */
  bottom: 5rpx;
  left: 10rpx;
}
</style>
