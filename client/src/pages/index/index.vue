<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
  </view>
  <!-- <button @click="()=>{handelClick}">{{ user }}</button> -->
  <!-- <button >{{ user }}</button> -->
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
console.log(store, 111);
const title = ref("Hello1111");
// const user = computed(() => store.getters.getNAme);
// const handelClick= computed(()=>store.commit("increment"))
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
