<template>
  <view class="login-btns">
    <button class="weixin" @click="handleUseWeixin">使用微信登陆</button>
    <button class="phone" @click="handleUsePhone">使用手机号登陆</button>
  </view>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";

const API = "http://127.0.0.1:8080/api";
const openID = ref("");
const userData = ref<any>();

const emit = defineEmits<{
  (event: "seccess", data: any): void;
  (event: "phone"): void;
}>();

const handlePrint = () => {
  userData.value;
};

// 获取code
function handleUseWeixin() {
  uni.showModal({
    mask: true,
    title: "温馨提示",
    content: "授权使用微信信息",
    success(res) {
      if (res.confirm) {
        handleLoginUseOpenID("123456789");

        // uni.login({
        //   provider: "weixin",
        //   onlyAuthorize: true, // 微信登录仅请求授权认证
        //   success: function (event) {
        //     const { code } = event;
        //     //客户端成功获取授权临时票据（code）,向业务服务器发起登录请求。
        //     getUserOpenId(code);
        //   },
        //   fail: function (err) {
        //     // 登录授权失败
        //     // err.code是错误码s
        //   },
        // });
      } else if (res.cancel) {
        // 用户点击取消授权的处理，可提示后续若需使用功能需授权等
        uni.showToast({
          icon: "none",
          title: "取消授权",
        });
      }
    },
  });
}

function handleUsePhone() {
  uni.showToast({
    icon: "none",
    title: "开发中......",
  });
}

// 获取openid并且用openid登陆
function getUserOpenId(code: any) {
  uni.request({
    url: `${API}/user/openid`, // 请求地址
    method: "GET", // 请求方法
    data: { code: code },
    success: (res: any) => {
      if (res.statusCode == 500) {
        uni.showToast({
          icon: "none",
          title: `微信服务端错误：${res.data.msg}`,
        });
        return;
      }
      // console.log(res.data);
      openID.value = res.data.openid;
      handleLoginUseOpenID(res.data.openid);
    },
    fail: (err) => {
      console.error("搜索请求失败：", err);
    },
  });
}

// 用openid登陆
function handleLoginUseOpenID(openid: string) {
  uni.request({
    url: `${API}/user/login`, // 请求地址
    method: "GET", // 请求方法
    data: { openid: openid },
    success: (res: any) => {
      if (res.statusCode >= 500 && res.statusCode < 600) {
        console.log("shibai");
        uni.showToast({
          title: `${res.data.msg}`,
          duration: 2000,
        });
      } else {
        // console.log(res);
        userData.value = res.data;
        emit("seccess", {
          session: res.data.userData.token,
          nickname: res.data.userData.user.nickname,
          avatar: res.data.userData.user.avatar,
          pay: res.data.userData.user.pay,
        });
      }
    },
    fail: (err) => {
      console.error("登陆请求失败：", err);
    },
  });
}
</script>
<style scoped>
.login-btns {
  height: 80%;
  justify-content: center;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
}

button {
  height: 50px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.weixin {
  width: 40vw;
  background-color: #07c160;
  color: #ffffff;
}
.phone {
  width: 40vw;
  background-color: #1fc1ea;
  color: #ffffff;
}
</style>
