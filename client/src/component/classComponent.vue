<template class="bodys">
  <!-- <view class="blank">分类</view> -->
  <view class="category-page">
    <!-- 左侧大类 -->
    <view class="category-list">
      <view
        v-for="(item, idx) in categories"
        :key="item.id"
        :class="['category-item', idx === activeIndex ? 'active' : '']"
        @click="activeIndex = idx"
      >
        {{ item.name }}
      </view>
    </view>

    <!-- 右侧小类和商品 -->
    <view class="subcategory-panel">
      <view class="subcategory-title">{{ activeCategory.name }}</view>
      <view class="subcategory-list">
        <view
          v-for="sub in activeCategory.children"
          :key="sub.id"
          class="subcategory-item"
          @click="goToDetail(sub)"
        >
          <u-image
            :src="sub.thumb"
            width="60"
            height="60"
            shape="circle"
            mode="aspectFill"
            class="thumb"
          />
          <view class="sub-name">{{ sub.name }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { _myCategories } from "@/test/test";
import type Category from "@/dataForm/Category";

const emit = defineEmits<{
  (evet: "clickCard", data: string[]): void;
}>();

const props = defineProps<{
  mode: "default" | "select";
  categories: any[];
}>();

// 示例数据结构
// const categories = ref(_myCategories);
const activeIndex = ref(0);
const activeCategory = computed(() => props.categories[activeIndex.value]);

function goToDetail(sub: any) {
  if (props.mode == "select") {
    emit("clickCard", [activeCategory.value.name, sub]);
  } else {
    // console.log(sub);
    uni.navigateTo({
      url: `/pages/search/index?subClasses=${sub.name}`,
    });
  }
}
</script>

<style scoped>
.bodys {
  height: 100%;
  overflow-y: hidden;
}
.category-page {
  display: flex;
  height: 100%;
  background: #fafbfc;
  overflow-y: hidden;
}
.category-list {
  width: 20vw;
  overflow-y: auto;
  height: 100%;
  background: #f5f6fa;
  padding-top: 20rpx;
  border-right: 1px solid #eee;
  box-sizing: border-box;
}
.category-item {
  padding: 28rpx 0;
  text-align: center;
  color: #666;
  font-size: 28rpx;
  cursor: pointer;
  background: #f5f6fa;
  transition:
    background 0.2s,
    color 0.2s;
}
.category-item.active {
  color: #2979ff;
  background: #fff;
  font-weight: bold;
  border-left: 4rpx solid #2979ff;
}
.subcategory-panel {
  /* flex: 1; */
  width: 70vw;
  padding: 32rpx 24rpx;
  background: #fff;
  overflow-y: auto;
  height: 100%;
}
.subcategory-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 24rpx;
}
.subcategory-list {
  display: flex;
  flex-wrap: wrap;
  gap: 32rpx 40rpx;
}
.subcategory-item {
  width: 140rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24rpx;
  cursor: pointer;
}
.thumb {
  margin-bottom: 12rpx;
  border-radius: 50%;
  background: #f5f6fa;
}
.sub-name {
  font-size: 26rpx;
  color: #333;
  margin-top: 8rpx;
  text-align: center;
}
.blank {
  position: sticky;
  top: 0;
  z-index: 99;
  background: #fff;
  text-align: center;
  padding-top: 120rpx;
  font-size: 36rpx;
  font-weight: bold; /* 字体加粗 */
}
</style>
