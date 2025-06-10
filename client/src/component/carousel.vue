<template>
  <up-swiper
    :list="list"
    indicator
    indicatorMode="line"
    keyName="image"
    circular
    @click="handelClick"
  ></up-swiper>
</template>
<script setup lang="ts">
import { ref } from "vue";

const list = ref([
  {
    image:
      "https://img0.baidu.com/it/u=4153211599,384460798&fm=253&fmt=auto&app=138&f=JPEG?w=1067&h=500",
    title: "昨夜星辰昨夜风，画楼西畔桂堂东",
  },
  {
    image:
      "https://img0.baidu.com/it/u=3564320575,929141954&fm=253&fmt=auto&app=138&f=JPEG?w=1600&h=500",
    title: "身无彩凤双飞翼，心有灵犀一点通",
  },
  {
    image:
      "https://img0.baidu.com/it/u=1928967828,461422675&fm=253&fmt=auto&app=138&f=JPEG?w=1212&h=420",
    title: "谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳",
  },
]);

// const classList = ref([{icon:,name:}, {}, {}]);
const handelClick = (index: number) => {
  console.log("点击了第", index, "张");
};
</script>
<style></style>
