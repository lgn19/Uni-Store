<template>
  <productShow :option="options"></productShow>
</template>
<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import productShow from "@/component/productShow.vue";
import { ref } from "vue";

const options = ref();

onLoad((_option: any) => {
  options.value = _option;
});
</script>
