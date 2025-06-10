<template class="body">
  <view class="header"
    ><up-icon
      name="plus-circle"
      color="#1022ed"
      size="22"
      @click="handleAddAdress"
    ></up-icon>

    <view :style="{ display: 'flex' }">
      <view v-if="ifDelte" :style="{ display: 'flex' }">
        <text
          class="select-all"
          v-if="deletList.length === 0"
          @click="handelClickSelectAll"
          >全选</text
        >
        <text
          class="select-all"
          v-if="deletList.length > 0"
          @click="handelClickSelectNone"
          >取消选择</text
        >

        <up-icon
          :style="{ marginRight: '15rpx' }"
          name="trash"
          :color="deletList.length > 0 ? '#eb5252' : '#686868'"
          size="22"
          @click="handelDelet"
        ></up-icon>
      </view>

      <up-icon
        name="more-circle"
        :color="ifDelte ? '#1022ed' : '#686868'"
        size="22"
        @click="handleClickSetting"
      ></up-icon>
    </view>
  </view>
  <view class="card-container">
    <view v-for="(item, index) in myAdress" :key="item?.id">
      <AdressCard
        v-if="item"
        :adress="item"
        :ifDelet="ifDelte"
        :ifSelect="ifSelect[index]"
        @clickCard="handleSelectCard"
      ></AdressCard>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import AdressCard from "@/component/adressCard.vue";
import type Adress from "@/dataForm/Adress";

const props = defineProps<{
  parentAdress: Adress[];
  mode: "defalut" | "select";
}>();

const emit = defineEmits<{
  (event: "select", data: number): void;
}>();

watch(
  () => props.parentAdress,
  (newVal) => {
    if (newVal != null && newVal != undefined) myAdress.value = newVal;
  },
  { immediate: false }
);

const myAdress = ref(props.parentAdress);
const ifDelte = ref(false);
const deletList = ref<number[]>([]);

function handleAddAdress() {
  uni.navigateTo({
    url: "/pages/personCenter/editAdress?id=-1",
  });
}
// 当前id是否被选择？
const ifSelect = computed(() => {
  return myAdress.value.map((item) => {
    const label = deletList.value.includes(item.id) ? true : false;
    return label;
  });
});

// 点击编辑
function handleClickSetting() {
  ifDelte.value = !ifDelte.value;
}

// 点击选择所有
function handelClickSelectAll() {
  const newDeletList: number[] = [];
  myAdress.value.forEach((item) => {
    if (item) {
      newDeletList.push(item.id);
    }
  });
  deletList.value = newDeletList;
}

// 点击取消选择
function handelClickSelectNone() {
  deletList.value = [];
}
// 点击卡片
function handleSelectCard(num: number) {
  // console.log(num, deletList.value, ifDelte.value);
  console.log(ifSelect.value);
  if (!ifDelte.value && props.mode == "select") {
    emit("select", num);
  }
  if (ifDelte.value) {
    const isSelected = deletList.value.includes(num);
    if (isSelected) {
      deletList.value = deletList.value.filter((item) => item !== num);
    } else {
      deletList.value.push(num);
    }
  }
}
//删除
function handelDelet() {
  uni.showModal({
    title: "提示",
    content: "确认是否删除地址",
    confirmText: "确认", // 自定义确认按钮文本
    cancelText: "取消", // 自定义取消按钮文本
    confirmColor: "#007AFF", // 确认按钮颜色
    cancelColor: "#000000", // 取消按钮颜色
    success: function (res) {
      if (res.confirm) {
        myAdress.value = myAdress.value.filter(
          (_, index) => !ifSelect.value[index]
        );
        deletList.value = [];
      }
    },
    fail: function (err) {
      console.log("调用失败", err);
    },
  });
}
</script>
<style scoped>
.header {
  padding: 20rpx;
  display: flex;
  justify-content: space-between;
}
.select-all {
  margin-right: 20rpx;
  font-size: 500;
  color: #eb5252;
}
.card-container {
  height: 80%;
  overflow-y: auto; /* 垂直方向滚动 */
  display: flex;
  flex-direction: column; /* 子元素垂直排列 */
}
</style>
