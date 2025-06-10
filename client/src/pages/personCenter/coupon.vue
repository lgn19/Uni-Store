<template>
  <NaviHeader><NaviBack></NaviBack>我的优惠卷</NaviHeader>
  <CouponComponent
    :my-coupon="myCoupon"
    mode="default"
    :max="2"
  ></CouponComponent>
</template>
<script setup lang="ts">
import CouponComponent from "@/component/couponComponent.vue";
import { _myCoupon } from "@/test/test";
import { onMounted, ref } from "vue";
import NaviBack from "../../component/naviBack.vue";
import NaviHeader from "../../component/naviHeader.vue";
import { onShow } from "@dcloudio/uni-app";
import { useStore } from "vuex";

const API = "http://127.0.0.1:8080/api";

const store = useStore();
const sessionToken = ref(store.state.sessionTokenV);
const myCoupon = ref([]);

// 从本地加载token并发送请求
onShow(() => {
  uni.request({
    url: `${API}/user`, // 请求地址
    method: "GET", // 请求方法
    data: { sessionToken: store.state.sessionTokenV },
    success: (res: any) => {
      console.log(res);

      if (res.statusCode >= 400 && res.statusCode < 500) {
        uni.showToast({
          title: `${res.data}`,
          duration: 2000,
          icon: "error",
        });
      }

      if (res.statusCode >= 500 && res.statusCode < 600) {
        uni.showToast({
          title: `服务器内部错误${res.data.msg}`,
          duration: 2000,
          icon: "error",
        });
      }

      if (res.statusCode >= 200 && res.statusCode < 300) {
        myCoupon.value = res.data.coupon;
      }
    },
    fail: (err) => {
      console.error("搜索请求失败：", err);
    },
  });
});
</script>
<style lang="css" scoped></style>
