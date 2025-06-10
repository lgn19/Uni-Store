<template class="bodys">
  <NaviHeader>分类</NaviHeader>
  <view class="container">
    <ClassComponent :categories="categories" mode="default"></ClassComponent>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import NaviHeader from "@/component/naviHeader.vue";
import { _myCategories } from "@/test/test";
import ClassComponent from "@/component/classComponent.vue";
import type Category from "@/dataForm/Category";

// 示例数据结构
const categories = ref<Category[]>(_myCategories);

// const activeIndex = ref(0);
// const activeCategory = computed(() => categories.value[activeIndex.value]);

// function goToDetail(sub: any) {
//   // 跳转到商品详情页，带上 sub
//   console.log(sub);
//   uni.navigateTo({
//     url: `/pages/search/index`,
//   });
// }
</script>

<style scoped>
.container {
  height: 90vh;
  overflow-y: hidden;
}
.bodys {
  height: 100vh;
  overflow-y: hidden;
}
</style>
