<template>
  <!-- <view class="blank"></view> -->
  <view class="person-center">
    <!-- 顶部用户信息 -->
    <view v-if="ifLogin" class="header">
      <view class="user-info">
        <image class="avatar" :src="avatar" />
        <view class="user-details">
          <text class="username">{{ nickname }}</text>
          <text class="membership">普通会员</text>
        </view>
      </view>
      <u-icon
        name="setting"
        size="30"
        color="#fff"
        class="settings-icon"
        @click="showEditPersonInfo = true"
      />
    </view>
    <view v-else class="header">
      <view class="user-info">
        <image
          class="avatar"
          src="https://img1.baidu.com/it/u=2021884115,1925118048&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
        />
        <view class="login-details" @click="showLogin = true">
          <view class="login">登陆</view>
        </view>
      </view>
    </view>

    <!-- 我的订单 -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">我的订单</text>
        <text class="view-all" @click="viewAllOrders">查看全部</text>
      </view>
      <view class="order-status">
        <view
          v-for="(item, index) in orderStatus"
          :key="index"
          class="status-item"
          @click="handleOrderClick(item)"
        >
          <u-icon :name="item.icon" size="40" color="#4496ce" />
          <text class="status-text">{{ item.text }}</text>
          <view v-if="item.badge" class="badge">{{ item.badge }}</view>
        </view>
      </view>
    </view>

    <!-- 我的服务 -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">我的服务</text>
      </view>
      <view class="service-list">
        <view
          v-for="(item, index) in services"
          :key="index"
          class="service-item"
          @click="handleServiceClick(item)"
        >
          <u-icon :name="item.icon" size="40" color="#4496ce" />
          <text class="service-text">{{ item.text }}</text>
        </view>
        <view v-if="ifLogin" class="exit-item" @click="handleLogout">
          <text class="service-text">退出登陆</text>
        </view>
      </view>
    </view>
  </view>

  <BottomPop
    @click="showLogin = false"
    :visible="showLogin"
    @close="showLogin = false"
    ><Login @seccess="handleSeccessLogin"></Login
  ></BottomPop>

  <BottomPop :visible="showEditPersonInfo" @close="showEditPersonInfo = false"
    ><EditPersonInfo></EditPersonInfo
  ></BottomPop>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import BottomPop from "@/component/bottomPop.vue";
import Login from "@/component/login.vue";
import EditPersonInfo from "@/component/editPersonInfo.vue";
import { useStore } from "vuex";
import { onShow } from "@dcloudio/uni-app";

const API = "http://127.0.0.1:8080/api";

const store = useStore();

const showLogin = ref(false);

const sessionToken = ref(store.state.setsessionTokenV);
const nickname = ref("");
const avatar = ref("");
const pay = ref([]);
const ifLogin = ref(false);

const showEditPersonInfo = ref(false);

watch(sessionToken, (newValue, oldValue) => {
  store.commit("setsessionTokenV", newValue);
});

// 从本地加载token并发送请求
onShow(() => {
  console.log();
  sessionToken.value = store.state.sessionTokenV;
  ifLogin.value = store.state.sessionTokenV == "" ? false : true;
  uni.request({
    url: `${API}/user`, // 请求地址
    method: "GET", // 请求方法
    data: { sessionToken: store.state.sessionTokenV },
    success: (res: any) => {
      if (res.statusCode >= 401 && res.statusCode < 500) {
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
        nickname.value = res.data.nickname;
        avatar.value = res.data.avatar;
      }
    },
    fail: (err) => {
      console.error("搜索请求失败：", err);
    },
  });
});

// 成功登陆
function handleSeccessLogin(e: any) {
  console.log("成功登陆", e);
  showLogin.value = false;
  ifLogin.value = true;

  sessionToken.value = e.session;
  nickname.value = e.nickname;
  avatar.value = e.avatar;
  pay.value = e.pay;
}

// 我的订单状态
const orderStatus = ref([
  { icon: "clock", text: "待付款", badge: 1 },
  { icon: "car", text: "待发货", badge: 1 },
  { icon: "map", text: "待收货", badge: 2 },
  { icon: "checkmark-circle", text: "待评价", badge: 1 },
  { icon: "server-man", text: "退款/售后", badge: 1 },
]);

// 我的服务
const services = ref([
  { icon: "home", text: "我的地址", page: "adress" },
  { icon: "coupon", text: "我的优惠券", page: "coupon" },
  // { icon: "gift", text: "积分商城", page: "love" },
  { icon: "heart", text: "我的收藏", page: "setting" },
]);

// 查看全部订单
const viewAllOrders = () => {
  uni.showToast({ title: "功能开发中。。。", icon: "none" });
};

// 点击订单状态
const handleOrderClick = (item: any) => {
  uni.showToast({
    title: `点击了${item.text}，功能开发中。。。`,
    icon: "none",
  });
};

// 点击服务
const handleServiceClick = (item: any) => {
  if (ifLogin.value) {
    uni.navigateTo({
      url: `/pages/personCenter/${item.page}`,
    });
  } else {
    uni.showToast({
      title: "请先登陆",
      icon: "none",
      duration: 1000,
    });
  }
};

//退出
function handleLogout() {
  uni.showModal({
    content: "是否退出登陆？",
    success: (res) => {
      if (res.confirm) {
        ifLogin.value = false;
        sessionToken.value = "";
        nickname.value = "";
        avatar.value = "";
        pay.value = [];
      }
    },
  });
}
</script>

<style scoped>
.person-center {
  background: #f5f6fa;
  min-height: 100vh;
}

/* 顶部用户信息 */
.header {
  background: linear-gradient(135deg, #068ff0, #0c69e4);
  padding: 40rpx 24rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding-top: 150rpx;
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.username {
  font-size: 32rpx;
  font-weight: bold;
}

.membership {
  font-size: 24rpx;
  color: #ffe7e7;
}

.settings-icon {
  cursor: pointer;
}

/* 我的订单 */
.section {
  margin-top: 20rpx;
  background: #fff;
  padding: 24rpx;
  border-radius: 16rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
}

.view-all {
  font-size: 28rpx;
  color: #4496ce;
  cursor: pointer;
}

.order-status {
  display: flex;
  justify-content: space-between;
}

.status-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.status-text {
  margin-top: 8rpx;
  font-size: 24rpx;
  color: #666;
}

.badge {
  position: absolute;
  top: -10rpx;
  right: -10rpx;
  background: #1462ff;
  color: #fff;
  font-size: 20rpx;
  border-radius: 50%;
  padding: 4rpx 14rpx;
}

/* 我的服务 */
.service-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.exit-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 30rpx;
  padding-bottom: 30rpx;
  border-radius: 12rpx;
  background: #f38f8d;
  margin-bottom: 20rpx;
  font-weight: 600;
}

.service-item {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 16rpx;
  border-radius: 12rpx;
  background: #f5f6fa;
  margin-bottom: 20rpx;
}

.service-text {
  margin-left: 16rpx;
  font-size: 28rpx;
  color: #333;
}

.service-item .badge {
  margin-left: auto;
  background: #317bac;
  color: #fff;
  font-size: 20rpx;
  border-radius: 50%;
  padding: 4rpx 8rpx;
}
.blank {
  height: 150rpx;
  position: sticky;
  top: 0;
  z-index: 99;
  background: #fff;
}
.login-details {
  padding: 20rpx;
  background-color: rgb(0, 173, 173);
  border-radius: 15%;
}
</style>
