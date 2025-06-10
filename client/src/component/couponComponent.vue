<template>
  <view style="height: 100%">
    <view v-if="mode == 'select'" class="header">
      <view class="text">可选{{ max }}/已选{{ selectList.length }}</view>
      <view class="buton">
        <up-button text="确认" type="warning" @click="handleComfirm"></up-button
      ></view>
    </view>
    <view class="card-container">
      <CouponCard
        v-for="(item, index) in combined"
        :coupon="item"
        :if-select="ifSelect[index]"
        @clickCard="handleClickCard"
      ></CouponCard>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import CouponCard from "./couponCard .vue";
import type Coupon from "@/dataForm/Coupon";
import { _myCoupon } from "@/test/test";

const props = defineProps<{
  mode: "default" | "select";
  myCoupon: Coupon[];
  max: number;
  selected: Coupon[];
  index: number;
}>();

const emit = defineEmits<{
  (event: "select", data: number[]): void;
}>();

const selectList = ref<number[]>(
  // props.selected ? props.selected.map((item) => item.id) : []
  []
);

watch(
  () => props.selected,
  (newVal) => {
    console.log("watch selected", newVal);
    console.log(props.index);
    selectList.value = newVal ? newVal.map((item) => item.id) : [];
  },
  { immediate: false }
);

// const ifSelect = computed(() => {
//   return [...props.myCoupon, ...props.selected].map((item) =>
//     item ? selectList.value.includes(item.id) : false
//   );
// });

// 合并两个优惠卷
const combined = computed(() => {
  // 只在两个数组都非空时合并
  return props.selected && props.selected.length > 0
    ? [...props.selected, ...props.myCoupon]
    : props.myCoupon;
});

const ifSelect = computed(() => {
  return combined.value.map((item) =>
    item ? selectList.value.includes(item.id) : false
  );
});

function handleClickCard(id: number) {
  if (props.mode == "select") {
    if (selectList.value.includes(id)) {
      selectList.value = selectList.value.filter((item) => item !== id);
    } else if (selectList.value?.length < props.max) {
      selectList.value.push(id);
    }
  }
}

function handleComfirm() {
  emit("select", selectList.value);
}
</script>
<style scoped>
.card-container {
  height: 80%;
  overflow-y: auto; /* 垂直方向滚动 */
  padding: 20rpx; /* 添加内边距 */
  display: flex;
  flex-direction: column; /* 子元素垂直排列 */
}
.header {
  display: flex;
  padding: 30rpx;
}
.buton {
  overflow: hidden;
  width: 20vw;
  border-radius: 15rpx;
  box-shadow: 0 10rpx 20rpx rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
}
.text {
  padding-left: 10rpx;
  flex: 1;
  text-align: center;
  justify-content: start;
  align-items: center;
  display: flex;
}
</style>
