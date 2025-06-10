<template>
  <view class="config-section" v-for="item in product.configs" :key="item.id">
    <view class="config-item">
      <text class="config-title">{{ item.name }}</text>
      <view class="config-options">
        <u-tag
          v-for="option in item.config"
          :key="option"
          :bgColor="select[item.id] === option ? '2979ff' : '#9aacff'"
          @click="select[item.id] = option"
        >
          {{ option }}
        </u-tag>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import type Product from "@/dataForm/Product";
const { product, select } = defineProps<{
  product: Product;
  select: { [key: number]: string };
}>();
</script>
<style scoped>
.config-section {
  padding: 20rpx;
  background-color: #fff;
  margin-top: 10rpx;
  overflow: auto;
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
</style>
