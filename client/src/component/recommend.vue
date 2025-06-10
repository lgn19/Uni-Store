<template>
  <view class="container">
    <view>
      <view class="title-container">
        <text class="title">限时特惠</text>
        <text class="view-all" @click="viewAll">查看全部</text>
      </view>
      <view class="product-list">
        <ProductCardSqua
          v-for="item in productsLower.slice(0, 2)"
          :items="item"
          :key="item.id"
          @add="$emit('add')"
        ></ProductCardSqua>
      </view>
    </view>

    <view>
      <view class="footer">
        <view class="price-container">
          <text class="title">为你推荐</text>
        </view>

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
        />
      </view>

      <view class="product-list">
        <ProductCardSqua
          v-if="display == 'grid'"
          v-for="item in productsLower"
          :items="item"
          :key="item.id"
          @add="$emit('add')"
        ></ProductCardSqua>

        <ProdunctCardLong
          v-if="display == 'list'"
          v-for="item in productsLower"
          :items="item"
          :key="item.id"
          @add="$emit('add')"
        ></ProdunctCardLong>
        <text class="target">到底啦</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from "vue";
import ProductCardSqua from "./productCardSqua.vue";
import ProdunctCardLong from "./produnctCardLong.vue";
import type Product from "../dataForm/Product";
import { _product } from "@/test/test";
import getProducts from "@/utill/getProducts";

const API = "http://127.0.0.1:8080/api";

const display = ref("list");

const productsUpper = ref<Product[]>([]);
const productsLower = ref<Product[]>([]);

const allProducts = ref<Product[]>([]);

const num = ref(4);

onMounted(() => {
  getProducts(API, "", 0, 100, 1, "", 1, 9999, 10, 4, "", "")
    .then((prodects) => {
      productsUpper.value = prodects.slice(0, num.value);
      productsLower.value = prodects.slice(0, num.value);
      allProducts.value = prodects;
    })
    .catch((err) => {
      uni.showToast({ title: "获取商品列表失败", icon: "none" });
    });
});

onMounted(() => {
  const instance = getCurrentInstance(); // 获取组件实例
  if (instance) {
    uni
      .createIntersectionObserver(instance.proxy)
      .relativeToViewport({ bottom: 100 })
      .observe(".target", (res) => {
        console.log("1");
        productsLower.value = allProducts.value.slice(0, num.value + 4);
        productsUpper.value = allProducts.value.slice(0, num.value + 4);
        num.value += 4;
      });
  } else {
    console.error("无法获取组件实例");
  }
});

const viewAll = () => {
  // uni.navigateTo({
  //   url: "/pages/promotion/index",
  // });
  uni.showToast({
    title: "页面设计中，可以先试用搜索功能，或者点开商品查看",
    icon: "none",
  });
  // console.log("查看全部商品");
};

const handelClickDisaplay = (id: string) => {
  display.value = id;
};
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

.footer {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
</style>
