<template>
  <view
    @click="handleClick"
    class="adress-card"
    :class="{ selected: props.ifSelect }"
  >
    <view class="adress">
      <view class="adress-title">{{ props.adress.adressTittle }}</view>
      <view class="adress-detail">{{ props.adress.adressDetail }}</view>
      <view class="person-info">
        <text class="person-name">{{ props.adress.name }}</text>
        <text class="person-phone">{{ props.adress.phone }}</text>
      </view>
    </view>
    <view class="edit"
      ><up-icon size="25" name="edit-pen" @click="handleClickEdit"></up-icon>
      <up-tag
        text="默认"
        plain
        size="mini"
        type="error"
        v-if="props.adress.default"
      ></up-tag
    ></view>
  </view>
</template>
<script setup lang="ts">
import type Adress from "@/dataForm/Adress";
const emit = defineEmits<{
  (event: "clickCard", data: number): void;
  (event: "clickEdit", data: Adress): void;
}>();
const props = defineProps<{
  adress: Adress;
  ifDelet: boolean;
  ifSelect: boolean;
}>();

function handleClick() {
  // if (props.ifDelet) {
  emit("clickCard", props.adress.id);
  // console.log(props.ifDelet, "ifDelet");
  // console.log(props.ifSelect, "ifSelect");

  // }
}
function handleClickEdit() {
  uni.navigateTo({
    url: `/pages/personCenter/editAdress?id=${props.adress.id}`,
  });
}
</script>
<style scoped>
.adress {
  max-width: 70vw;
}
.adress-title {
  font-size: 25rpx;
  color: rgba(140, 140, 140, 0.69);
}
.adress-detail {
  font-size: 35rpx;
  color: black;
  font-weight: 400;
}
.person-name {
  font-size: 28rpx;
  color: rgb(66, 66, 66);
  font-weight: 250;
  margin-right: 10rpx;
}
.person-phone {
  font-size: 28rpx;
  color: rgb(67, 67, 67);
  font-weight: 250;
}
.adress-card {
  border-radius: 10rpx;
  margin: 30rpx;
  padding: 25rpx;
  justify-content: space-between;
  display: flex;
  border: 1rpx solid #ccc;
}
.adress-card.selected {
  box-shadow: 2rpx 2rpx 2rpx rgba(146, 205, 237, 0.8); /* 添加阴影效果 */
  background-color: rgba(146, 205, 237, 0.3);
}
</style>
