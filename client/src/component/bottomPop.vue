<template>
  <view class="overlay" :class="{ 'visivle-v': !visible }" @touchmove.prevent>
    <view class="bottom-pop">
      <!-- 右上角关闭按钮 -->
      <view class="close-btn" @click="close">
        <up-icon name="close" size="20" color="#999" />
      </view>
      <!-- 插槽内容 -->
      <slot></slot>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

// 定义组件的 props
interface Props {
  visible: boolean; // 控制弹出框显示与隐藏
}

const props = defineProps<Props>();
const emit = defineEmits(["close"]); // 定义关闭事件

// 关闭弹出框
const close = () => {
  emit("close");
};
</script>

<style scoped>
.visivle-v {
  transform: translateY(-100%); /* 初始位置在屏幕底部 */
}
/* 灰蒙背景 */
.overlay {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(195, 194, 193);
  background-color: rgba(49, 49, 49, 0.5); /* 灰蒙背景 */
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: flex-end; /* 内容从底部弹出 */
  overflow: hidden;
  box-shadow: 30;
}

/* 弹出框 */
.bottom-pop {
  border-top-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
  background-color: rgb(255, 253, 250);
  width: 100%;
  height: 70%;
  overflow: hidden; /* 内容超出时滚动 */
  position: relative;
}

/* 关闭按钮 */
.close-btn {
  position: absolute;
  top: 10rpx;
  right: 10rpx;
  width: 40rpx;
  height: 40rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1000;
}

/* 弹出动画 */
@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>
