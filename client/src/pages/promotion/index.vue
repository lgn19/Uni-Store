<template>
  <NaviHeader><NaviBack></NaviBack>限时特惠</NaviHeader>
  <view class="blank">
    <view class="header">
      <view class="footer">
        <u-icon
          name="list"
          id="list"
          :color="display === 'list' ? '#2979ff' : '#999'"
          @click="handelClickDisaplay('list')"
          size="30"
        />
        <u-icon
          name="grid"
          id="grid"
          :color="display === 'grid' ? '#2979ff' : '#999'"
          @click="handelClickDisaplay('grid')"
          size="30"
        /> </view
    ></view>

    <view class="product-list">
      <ProductCardSqua
        v-if="display == 'grid'"
        v-for="item in products"
        :items="item"
        :key="item.id"
      ></ProductCardSqua>
      <ProdunctCardLong
        v-if="display == 'list'"
        v-for="item in products"
        :items="item"
        :key="item.id"
      ></ProdunctCardLong>
    </view>
    <BackToTop
      :style="{ display: scrollTopCurrent > 400 ? 'block' : 'none' }"
    ></BackToTop>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import ProductCardSqua from "@/component/productCardSqua.vue";
import ProdunctCardLong from "@/component/produnctCardLong.vue";
import { onPageScroll } from "@dcloudio/uni-app";
import BackToTop from "@/component/backToTop.vue";
import debounce from "@/utill/debounce";
import NaviHeader from "@/component/naviHeader.vue";
import NaviBack from "@/component/naviBack.vue";
import { _product } from "@/test/test";

// 创建响应式数据 scrollTop
const display = ref("list");
const products = ref([_product]);
const scrollTopCurrent = ref(0);

const handelClickDisaplay = (id: string) => {
  display.value = id;
};
// 滚动事件处理函数
const handleScroll = debounce((e: { scrollTop: number }) => {
  scrollTopCurrent.value = e.scrollTop;
}, 200); // 设置防抖延迟为 100ms

// 监听页面滚动
onPageScroll((e) => {
  handleScroll(e);
});
</script>
<style scoped lang="scss">
.container {
  padding: 10px;
}

.title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10rpx 0;
}

.title {
  font-size: 20px;
  font-weight: bold;
  width: 50%;
}

.view-all {
  //   color: red;
  color: rgb(38, 74, 234);
  cursor: pointer;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.price-container {
  width: 50%;
  display: flex;
  justify-content: start;
  align-items: center; /* 垂直方向居中对齐 */
  padding: 20rpx 0;
}
.header {
  padding: 0 25rpx;
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.footer {
  display: flex;
  width: 100%;
  justify-content: start;
  padding: 25rpx;
}

.blank {
  padding-left: 20rpx;
  padding-right: 20rpx;
}
.wrap {
  height: 200vh;
}
</style>
