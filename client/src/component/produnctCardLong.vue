<template>
  <view class="card" @click="handleClickCard">
    <image :src="props.items.images[0]" class="image" lazy-load> </image>
    <view class="right">
      <text
        class="label"
        v-if="props.items.label"
        :style="{ background: getLabelColor(props.items.label) }"
      >
        {{ props.items.label }}
      </text>

      <view class="title">{{ props.items.title }}</view>
      <view v-if="props.items.detail" class="detail">{{
        props.items.detail
      }}</view>

      <view class="buy-rate">
        <up-rate
          v-model="props.items.star"
          count="5"
          v-if="props.items.star"
          :readonly="true"
          :allow-half="true"
          activeColor="#4a68ee"
        ></up-rate>
        <view class="buy-num">已有{{ props.items.buyNum }}人购买</view>
      </view>

      <view class="footer" @click.stop="">
        <view class="price-container">
          <text class="price">¥{{ props.items.price }}</text>
          <text class="“origin-price" v-if="props.items.originalPrice"
            >¥{{ props.items.originalPrice }}</text
          >
        </view>
        <u-icon
          name="plus-circle"
          color="#ee644b"
          size="18"
          @click="handelClickAdd"
        ></u-icon>
        <u-icon
          color="#b88847"
          :name="isLoved ? 'heart-fill' : 'heart'"
          size="18"
          @click="handelClickLove"
        ></u-icon
        ><u-icon
          name="share-square"
          size="18"
          color="#64ba6d"
          @click="handelClickShare"
        ></u-icon
      ></view>
    </view>
  </view>
  <BottomPop :visible="showSelectConfig" @close="showSelectConfig = false">
    <view class="config-container">
      <SelectConfig :product="items" :select="config"></SelectConfig>

      <view class="store-num">
        <text class="store">库存{{ dynamicStore ?? 0 }}</text>
        <u-number-box
          :min="0"
          size="small"
          :max="dynamicStore ?? 0"
          inputWidth="25"
          buttonWidth="25"
          v-model="num"
        ></u-number-box
      ></view>

      <view class="btn">
        <button class="cancel" @click="showSelectConfig = false">取消</button>
        <button class="confirm" @click="handleConfirmAdd">确认</button></view
      ></view
    >
  </BottomPop>
</template>

<script lang="ts" setup>
import type Product from "@/dataForm/Product";
import SelectConfig from "./selectConfig.vue";
import { ref, onMounted, computed } from "vue";
import BottomPop from "./bottomPop.vue";
import API from "@/static/API";
import { getSelectedCombination } from "../utill/couponUtils";
import { useStore } from "vuex";
import addGoodCar from "@/utill/addGoodCar";

const store = useStore();
const isLoved = ref(false); // 初始状态为未收藏

const emit = defineEmits<{
  (event: "add"): void;
}>();

const showSelectConfig = ref(false);
const config = ref<{ [key: number]: string }>({});
const num = ref(1);

const props = defineProps<{
  items: Product;
}>();

onMounted(() => {
  // 初始化配置
  num.value = 0; // 重置数量
  if (props.items) {
    props.items.configs.forEach((item) => {
      config.value[item.id] = item.config[0]; // 默认选择第一个选项
    });
  }
});

// 生成配置的map key
const selectedCombination = computed(() => {
  if (!props.items) return "";
  return getSelectedCombination(props.items, config.value);
});

// 动态计算库存
const dynamicStore = computed(() => {
  return props.items?.storeMap[selectedCombination.value];
});

function getLabelColor(label: string): string {
  switch (label) {
    case "新品":
      return "#2979ff"; // 蓝色
    case "热销":
      return "#fa3534"; // 红色
    case "折扣":
      return "#ff9900"; // 橙色
    default:
      return "#999"; // 默认灰色
  }
}

function handelClickLove(event: Event) {
  if (store.state.sessionTokenV != "") {
    isLoved.value = !isLoved.value; // 切换收藏状态
    console.log("收藏");
  } else {
    uni.showToast({
      title: "请先登录",
      icon: "none",
      duration: 2000,
    });
  }
}

function handelClickShare(event: Event) {
  uni.showToast({
    title: "分享功能暂未实现",
    icon: "none",
    duration: 2000,
  });
  console.log("分享");
}

function handelClickAdd(event: Event) {
  if (store.state.sessionTokenV != "") {
    showSelectConfig.value = true;
  } else {
    uni.showToast({
      title: "请先登录",
      icon: "none",
      duration: 2000,
    });
  }
}

function handleConfirmAdd() {
  showSelectConfig.value = false;
  addGoodCar(
    API,
    store.state.sessionTokenV,
    props.items.id,
    config.value,
    num.value
  )
    .then(() => {
      uni.showToast({ title: "已加入购物车", icon: "success" });
      emit("add");
    })
    .catch((error) => {
      uni.showToast({
        title: "添加购物车失败",
        icon: "none",
        duration: 2000,
      });
    });
  // console.log("加入购物车成功");
}

function handleClickCard(event: Event) {
  console.log("跳转到商品详情页");
  uni.navigateTo({
    url: `/pages/product/index?id=${props.items.id}`,
  });
}
</script>
<style scoped>
.card {
  padding-top: 5rpx;
  display: flex;
  background: #fff;
  border-radius: 16rpx;
  box-shadow: 2rpx 2rpx 10rpx rgba(233, 233, 234, 0.8); /* 添加阴影效果 */
  box-shadow: 2rpx 2rpx 10rpx rgba(148, 148, 150, 0.8); /* 添加阴影效果 */
  padding: 1vw;
  margin: 1vw;
  height: 32vw;
  justify-content: space-between;
  align-items: center;
}

.image {
  width: 25vw;
  height: 25vw;
  border-radius: 12rpx;
  object-fit: cover;
  display: inline-block;
  margin: 0 15rpx;
}

.right {
  width: 65vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.label {
  background: #2979ff;
  padding: 0 6rpx;
  border-radius: 10%;
  font-size: 24rpx;
  color: #fff;
  width: 10%;
  text-align: center;
}

.title {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  text-align: start;
  margin-bottom: 8rpx;
  line-height: 1.4;
  width: 100%;
}
.detail {
  font-size: 20rpx;
  font-weight: bold;
  color: #948c8c;
  text-align: start;
  margin-bottom: 8rpx;
  line-height: 1.4;
  width: 100%;
}

.price-container {
  width: 50%;
  display: flex;
  justify-content: start;
  align-items: center; /* 垂直方向居中对齐 */
}
.price {
  font-size: 26rpx;
  color: #fa3534;
  font-weight: bold;
  margin-bottom: 8rpx;
  display: inline-block;
  margin-right: 10%;
}

.origin-price {
  font-size: 22rpx;
  color: #999;
  text-decoration: line-through;
  display: inline-block;
}

.footer {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.buy-num {
  margin-left: 90rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 20rpx;
  color: chocolate;
  font-weight: 300;
}
.buy-rate {
  display: flex;
}

/* 配置容器 */
.config-container {
  padding: 16px;
}

/* 按钮区域 */
.btn {
  position: absolute;
  bottom: 10rpx;
  display: flex;
  justify-content: space-between;
  gap: 12rpx;
  /* padding: 16rpx; */
  border-top: 1rpx solid #eee;
  width: 100vw;
}

/* 确认按钮 */
.confirm {
  width: 20vw;
  height: 10vw;

  flex: 1;
  background: #1677ff;
  color: #fff;
  border: none;
  border-radius: 8rpx;
  padding: 12rpx;
  font-size: 26rpx;
  font-weight: 500;
}

/* 取消按钮 */
.cancel {
  width: 20vw;
  height: 10vw;
  flex: 1;
  background: #f5f5f5;
  color: #333;
  border: none;
  border-radius: 8rpx;
  padding: 12rpx;
  font-size: 26rpx;
}

.store-num {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16rpx;
}
</style>
