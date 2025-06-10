<template>
  <NaviHeader><NaviBack></NaviBack>我的地址</NaviHeader>
  <AdressComponent :parent-adress="myAdress" mode="defalut"></AdressComponent>
</template>
<script lang="ts" setup>
import { ref, computed } from "vue";
import NaviHeader from "@/component/naviHeader.vue";
import NaviBack from "@/component/naviBack.vue";
import { _myAdress } from "@/test/test";
import AdressComponent from "@/component/adressComponent.vue";
import { useStore } from "vuex";
import { onShow } from "@dcloudio/uni-app";

const API = "http://127.0.0.1:8080/api";
const store = useStore();
const sessionToken = ref(store.state.sessionTokenV);
const myAdress = ref([]);
// 从本地加载token并发送请求
onShow(() => {
  // console.log(store.state.sessionTokenV, "这是本地内容");
  sessionToken.value = store.state.sessionTokenV;
  uni.request({
    url: `${API}/user`, // 请求地址
    method: "GET", // 请求方法
    data: { sessionToken: store.state.sessionTokenV },
    success: (res: any) => {
      if (res.statusCode >= 500 && res.statusCode < 600) {
        uni.showToast({
          title: `服务器错误:${res.data.msg}`,
          duration: 2000,
          icon: "error",
        });
      }

      if (res.statusCode >= 400 && res.statusCode < 500) {
        uni.showToast({
          title: `会话过期`,
          duration: 2000,
          icon: "error",
        });
      }
      if (res.statusCode >= 200 && res.statusCode < 300) {
        myAdress.value = res.data.adress;
      }
    },
    fail: (err) => {
      console.error("搜索请求失败：", err);
    },
  });
});

// const mode = ref<"defalut" | "select">("defalut");
</script>
