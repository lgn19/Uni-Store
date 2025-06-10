<template>
  <NaviHeader>
    <NaviBack></NaviBack>
    <view class="header">
      <Header
        :if-show-region="false"
        @click="showCar = true"
        :num="cartList.length"
        @search="handleSearch"
      ></Header></view
  ></NaviHeader>

  <view class="seletor">
    <view style="display: flex">
      <view class="sort-btn" @click="showSort = true">
        <text>排序</text>
        <!-- <image src="/static/icon/sort-down.png" class="sort-icon" /> -->
      </view>
      <view class="filter-btn" @click="showFilter = true">
        <text>筛选</text>
        <!-- <image src="/static/icon/filter.png" class="filter-icon" /> -->
      </view>
    </view>

    <view style="display: flex">
      <view class="filter-btn">
        <u-icon
          name="list"
          id="list"
          :color="display === 'list' ? '#2979ff' : '#999'"
          @click="handelClickDisaplay('list')"
          size="30"
        />
      </view>
      <view class="filter-btn">
        <u-icon
          name="grid"
          id="grid"
          :color="display === 'grid' ? '#2979ff' : '#999'"
          @click="handelClickDisaplay('grid')"
          size="30"
        />
      </view>
    </view>
  </view>

  <!-- <template> -->
  <view class="blank">
    <view class="product-list">
      <ProductCardSqua
        v-if="display == 'grid'"
        v-for="item in productsUpper"
        :items="item"
        :key="item.id"
        @add="handleAdd"
      ></ProductCardSqua>
      <ProdunctCardLong
        v-if="display == 'list'"
        v-for="item in productsLower"
        :items="item"
        :key="item.id"
        @add="handleAdd"
      ></ProdunctCardLong>
      <text class="target"></text>
    </view>
    <BackToTop
      :style="{ display: scrollTopCurrent > 400 ? 'block' : 'none' }"
    ></BackToTop>
  </view>
  <!-- </template> -->

  <!-- 显示购物车 -->
  <BottomPop :visible="showCar" @close="showCar = false">
    <view class="cart-page">
      <view
        v-for="(item, idx) in cartList"
        :key="item.id"
        class="cart-item-wrap"
      >
        <view class="cart-item">
          <image :src="item.product.images[0]" class="item-img" />
          <view class="item-info">
            <view class="item-title">{{ item.product.title }}</view>
            <view class="item-desc">{{ key[idx] }}</view>
            <view class="item-rate">
              <up-rate
                count="5"
                v-model="item.product.star"
                size="18"
                :readonly="true"
                :allow-half="true"
                activeColor="#4a68ee"
              ></up-rate>
              <text class="star-num">{{ item.product.star.toFixed(1) }}</text>
            </view>
            <view class="item-price">¥{{ item.product.price }}</view>
          </view>
        </view>
      </view>
    </view>
  </BottomPop>

  <!-- 显示筛选 -->
  <BottomPop :visible="showFilter" @close="showFilter = false">
    <Filter @confirm="handelConfirmFilter"></Filter>
  </BottomPop>

  <!-- 显示排序 -->
  <BottomPop :visible="showSort" @close="showSort = false">
    <view class="sort-pop">
      <view class="sort-header">
        <text class="sort-title">排序方式</text>
        <text class="sort-cancel" @click="showSort = false">取消</text>
      </view>
      <view class="sort-options">
        <view
          class="sort-option"
          :class="{ active: sortType === 3 }"
          @click="handleSort(3)"
        >
          <text>综合排序</text>
        </view>

        <view
          class="sort-option"
          :class="{ active: sortType === 4 }"
          @click="handleSort(4)"
        >
          <text>销量优先</text>
          <!-- <image
            v-if="sortType === 'sales'"
            src="/static/icon/check.png"
            class="sort-check"
          /> -->
        </view>

        <view
          class="sort-option"
          :class="{ active: sortType === 6 }"
          @click="handleSort(6)"
        >
          <text>好评优先</text>
        </view>

        <view
          class="sort-option"
          :class="{ active: sortType === 1 }"
          @click="handleSort(1)"
        >
          <text>价格升序</text>
        </view>

        <view
          class="sort-option"
          :class="{ active: sortType === 2 }"
          @click="handleSort(2)"
        >
          <text>价格降序</text>
        </view>
      </view>
    </view>
  </BottomPop>

  <BackToTop
    :style="{ display: scrollTopCurrent > 400 ? 'block' : 'none' }"
  ></BackToTop>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, onMounted } from "vue";
import Header from "../../component/header.vue";
import { onPageScroll, onLoad } from "@dcloudio/uni-app";

import BackToTop from "@/component/backToTop.vue";
import debounce from "@/utill/debounce";
import BottomPop from "@/component/bottomPop.vue";
import type Goods from "@/dataForm/Goods";
import { _myGoods } from "../../test/test";
import { getSelectedCombination } from "../../utill/couponUtils";
import NaviHeader from "@/component/naviHeader.vue";
import NaviBack from "@/component/naviBack.vue";
import Filter from "@/component/filter.vue";
import ProductCardSqua from "@/component/productCardSqua.vue";
import ProdunctCardLong from "@/component/produnctCardLong.vue";
import type Product from "@/dataForm/Product";
import getProducts from "@/utill/getProducts";
import getUser from "@/utill/getUser";
import { useStore } from "vuex";

const productsUpper = ref<Product[]>([]);
const productsLower = ref<Product[]>([]);

const stores = useStore();
// 后端接口
const API = "http://127.0.0.1:8080/api";

const showCar = ref(false);
const showSort = ref(false);
const showFilter = ref(false);
const cartList = ref<Goods[]>([]);
const scrollTopCurrent = ref(0);
const product = ref<Product[]>([]);

// 查询参数
const inputValue = ref<string>("");
const sortType = ref(3);
const pagesize = ref(10);
const pagenum = ref(1);
const place = ref<string>("");
const priceMin = ref(0);
const priceMax = ref(99999);
const store = ref(0);
const star = ref(0);
const classes = ref<string>("");
const subClasses = ref<string>("");

onLoad((option: any) => {
  const sub = option.subClasses;
  // console.log(sub, option, option.subClasses, typeof option.subClasses); // 正确访问属性
  uni.request({
    url: `${API}/product`, // 请求地址
    method: "GET", // 请求方法
    data: {
      title: option.title ? String(option.title) : "",
      subClasses: option.subClasses ? String(option.subClasses) : "",
    },
    success: (res) => {
      if (Array.isArray(res.data)) {
        product.value = res.data;
        productsUpper.value = res.data.slice(0, num.value);
        productsLower.value = res.data.slice(0, num.value);
        product.value = res.data;
        console.log("搜索结果：", res.data[0]);

        const instance = getCurrentInstance(); // 获取组件实例
        if (instance) {
          uni
            .createIntersectionObserver(instance.proxy)
            .relativeToViewport({ bottom: 10 })
            .observe(".target", (res) => {
              productsLower.value = product.value.slice(0, num.value + 4);
              productsUpper.value = product.value.slice(0, num.value + 4);
              num.value += 4;
            });
        } else {
          console.error("无法获取组件实例");
        }
      } else {
      }
    },
    fail: (err) => {
      console.error("搜索请求失败：", err);
    },
  });
  if (stores.state.sessionTokenV != "") {
    getUser(API, stores.state.sessionTokenV)
      .then((user) => {
        if (user.Goods) {
          // console.log("获取购物车数据成功:", user.Goods);
          cartList.value = user.Goods;
        } else {
          uni.showToast({
            title: "购物车为空",
            icon: "none",
          });
          cartList.value = [];
        }
      })
      .catch((err) => {
        uni.showToast({
          title: "获取购物车数据失败",
          icon: "none",
        });
        console.error("获取购物车数据失败:", err);
      });
  }
});

// onMounted(() => {
//   const instance = getCurrentInstance(); // 获取组件实例
//   if (instance) {
//     uni
//       .createIntersectionObserver(instance.proxy)
//       .relativeToViewport({ bottom: 10 })
//       .observe(".target", (res) => {
//         productsLower.value = product.value.slice(0, num.value + 4);
//         productsUpper.value = product.value.slice(0, num.value + 4);
//         num.value += 4;
//       });
//   } else {
//     console.error("无法获取组件实例");
//   }
// });

function handleAdd() {
  // 获取用户购物车数据
  getUser(API, stores.state.sessionTokenV)
    .then((user) => {
      if (user.Goods) {
        // console.log("获取购物车数据成功:", user.Goods);
        cartList.value = user.Goods;
      } else {
        uni.showToast({
          title: "购物车为空",
          icon: "none",
        });
        cartList.value = [];
      }
    })
    .catch((err) => {
      uni.showToast({
        title: "获取购物车数据失败",
        icon: "none",
      });
      console.error("获取购物车数据失败:", err);
    });
}
const num = ref(4);

//排列方式
const display = ref("list");
const handelClickDisaplay = (id: string) => {
  display.value = id;
};

//处理搜索框
function handleSearch(e: string) {
  inputValue.value = e;
  getProducts(
    API,
    e ? e.trim() : "",
    sortType.value,
    pagesize.value,
    pagenum.value,
    place ? place.value.trim() : "",
    priceMin.value,
    priceMax.value,
    store.value,
    star.value,
    classes ? classes.value.trim() : "",
    subClasses ? subClasses.value.trim() : ""
  )
    .then((prodects) => {
      product.value = prodects;
    })
    .catch((err) => {
      uni.showToast({ title: "获取商品列表失败", icon: "none" });
    });
  // uni.request({
  //   url: `${API}/product`, // 请求地址
  //   method: "GET", // 请求方法
  //   data: {
  //     title: e ? e.trim() : "",
  //     sortType: sortType.value,
  //     pagesize: pagesize.value,
  //     pagenum: pagenum.value,
  //     place: place ? place.value.trim() : "",
  //     priceMin: priceMin.value,
  //     priceMax: priceMax.value,
  //     store: store.value,
  //     star: star.value,
  //     classes: classes ? classes.value.trim() : "",
  //     subClasses: subClasses ? subClasses.value.trim() : "",
  //   },
  //   success: (res) => {
  //     // product.value=res.data
  //     if (Array.isArray(res.data)) {
  //       product.value = res.data;
  //       console.log("搜索结果：", res.data[0]);
  //     } else {
  //       console.log("搜索结果不是数组：", typeof res.data);
  //     }
  //   },
  //   fail: (err) => {
  //     console.error("搜索请求失败：", err);
  //   },
  // });
}

// 处理排序
function handleSort(type: number) {
  sortType.value = type;
  showSort.value = false;
  getProducts(
    API,
    inputValue ? inputValue.value.trim() : "",
    type,
    pagesize.value,
    pagenum.value,
    place ? place.value.trim() : "",
    priceMin.value,
    priceMax.value,
    store.value,
    star.value,
    classes ? classes.value.trim() : "",
    subClasses ? subClasses.value.trim() : ""
  )
    .then((prodects) => {
      product.value = prodects;
    })
    .catch((err) => {
      uni.showToast({ title: "获取商品列表失败", icon: "none" });
    });
  // uni.request({
  //   url: `${API}/product`, // 请求地址
  //   method: "GET", // 请求方法
  //   data: {
  //     title: inputValue ? inputValue.value.trim() : "",
  //     sortType: type,
  //     pagesize: pagesize.value,
  //     pagenum: pagenum.value,
  //     place: place ? place.value.trim() : "",
  //     priceMin: priceMin.value,
  //     priceMax: priceMax.value,
  //     store: store.value,
  //     star: star.value,
  //     classes: classes ? classes.value.trim() : "",
  //     subClasses: subClasses ? subClasses.value.trim() : "",
  //   },
  //   success: (res) => {
  //     // product.value=res.data
  //     if (Array.isArray(res.data)) {
  //       product.value = res.data;
  //       console.log("搜索结果：", res.data[0]);
  //     } else {
  //       console.log("搜索结果不是数组：", typeof res.data);
  //     }
  //   },
  //   fail: (err) => {
  //     console.error("搜索请求失败：", err);
  //   },
  // });
}
// 处理筛选
function handelConfirmFilter(e: any) {
  const { _place, _priceMin, _priceMax, _store, _star, _classes, _subClasses } =
    e.value;
  console.log(_place);
  place.value = _place;
  priceMin.value = _priceMin;
  priceMax.value = _priceMax;
  store.value = _store;
  star.value = _star;
  classes.value = _classes;
  subClasses.value = _subClasses;

  showFilter.value = false;

  getProducts(
    API,
    inputValue ? inputValue.value.trim() : "",
    sortType.value,
    pagesize.value,
    pagenum.value,
    _place == undefined ? "" : _place.trim(),
    _priceMin,
    _priceMax,
    _store,
    _star,
    _classes ? _classes.trim() : "",
    _subClasses ? _subClasses.trim() : ""
  )
    .then((prodects) => {
      product.value = prodects;
    })
    .catch((err) => {
      uni.showToast({ title: "获取商品列表失败", icon: "none" });
    });

  // uni.request({
  //   url: `${API}/product`, // 请求地址
  //   method: "GET", // 请求方法
  //   data: {
  //     title: inputValue ? inputValue.value.trim() : "",
  //     sortType: sortType.value,
  //     pagesize: pagesize.value,
  //     pagenum: pagenum.value,
  //     place: _place == undefined ? "" : _place.trim(),
  //     priceMin: _priceMin,
  //     priceMax: _priceMax,
  //     store: _store,
  //     star: _star,
  //     classes: _classes ? _classes.trim() : "",
  //     subClasses: _subClasses ? _subClasses.trim() : "",
  //   },
  //   success: (res) => {
  //     // product.value=res.data
  //     if (Array.isArray(res.data)) {
  //       product.value = res.data;
  //       console.log("搜索结果：", res.data[0]);
  //     } else {
  //       console.log("搜索结果不是数组：", typeof res.data);
  //     }
  //   },
  //   fail: (err) => {
  //     console.error("搜索请求失败：", err);
  //   },
  // });
}

// 滚动事件处理函数
const handleScroll = debounce((e: { scrollTop: number }) => {
  scrollTopCurrent.value = e.scrollTop;
}, 200); // 设置防抖延迟为 100ms
// 监听页面滚动
onPageScroll((e) => {
  handleScroll(e);
});
// 生成配置的key
const key = cartList.value.map((item) => {
  return getSelectedCombination(item.product, item.config);
});
</script>

<style scoped>
.seletor {
  display: flex;
  padding: 20rpx;
  justify-content: space-between;
  border-bottom: 1rpx solid #eee;
  background-color: #fff;
}

.sort-btn,
.filter-btn {
  display: flex;
  align-items: center;
  padding: 10rpx 20rpx;
  border-radius: 10rpx;
  color: #333;
  font-size: 28rpx;
  background-color: #f5f5f5;
}

.sort-icon,
.filter-icon {
  width: 24rpx;
  height: 24rpx;
  margin-left: 10rpx;
}

.sort-pop {
  background-color: #fff;
  border-top-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
  padding: 20rpx 0;
  margin-top: 50rpx;
  height: 80%;
  overflow-y: auto;
}

.sort-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30rpx 20rpx;
  border-bottom: 1rpx solid #eee;
}

.sort-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
}

.sort-cancel {
  font-size: 28rpx;
  color: #999;
}

.sort-options {
  padding: 20rpx 0;
}

.sort-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25rpx 30rpx;
  font-size: 30rpx;
  color: #333;
}

.sort-option.active {
  color: #3175ec;
  background-color: #d1e4ed;
}

.price-option {
  position: relative;
}

.price-arrows {
  display: flex;
  flex-direction: column;
  margin-left: 10rpx;
}

.arrow-icon {
  width: 20rpx;
  height: 20rpx;
  opacity: 0.5;
}

.arrow-icon.active {
  opacity: 1;
  filter: invert(42%) sepia(93%) saturate(1352%) hue-rotate(320deg)
    brightness(100%) contrast(100%);
}

.sort-check {
  width: 28rpx;
  height: 28rpx;
}

.header-sticky {
  position: fixed;
  top: 50rpx;
  z-index: 99;
  background: rgba(1, 1, 1, 0);
}

.cart-page {
  background: #fff;
  height: 60vh;
  padding-bottom: 120rpx;
  overflow-y: auto;
}

.cart-item-wrap {
  margin-bottom: 24rpx;
}

.cart-item {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 18rpx;
  margin-left: 24rpx;
  margin-right: 24rpx;
  margin-top: 50rpx;
  padding-left: 10rpx;
  box-shadow: 5rpx 5rpx 10rpx rgba(167, 167, 172, 0.8);
}

.item-img {
  width: 120rpx;
  height: 120rpx;
  border-radius: 12rpx;
  margin-right: 24rpx;
  object-fit: cover;
}

.item-info {
  flex: 1;
  min-width: 0;
}

.item-title {
  font-size: 28rpx;
  font-weight: 500;
  margin-bottom: 8rpx;
}

.item-desc {
  font-size: 24rpx;
  color: #888;
  margin-bottom: 8rpx;
}

.item-rate {
  display: flex;
  align-items: center;
  font-size: 22rpx;
  color: #faad14;
  margin-bottom: 8rpx;
}

.star-num {
  color: #999;
  margin-left: 8rpx;
  font-size: 22rpx;
}

.item-price {
  color: #fa3534;
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 8rpx;
}

.header {
  width: 85vw;
}

.header-card {
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

.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
