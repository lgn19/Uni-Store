<template class="-body">
  <NaviHeader>购物车</NaviHeader>
  <view class="cart-page">
    <!-- 商品列表 -->

    <up-checkbox-group v-model="checkList" placement="column">
      <view
        v-for="(item, idx) in cartList"
        :key="item.id"
        class="cart-item-wrap"
      >
        <view class="cart-item">
          <u-checkbox
            :name="item.id"
            :checked="checkList.includes(item.id)"
          ></u-checkbox>

          <image :src="item.product.images[0]" class="item-img" />
          <view class="item-info">
            <view class="item-title">{{ item.product.title }}</view>
            <view class="item-desc">{{ key[idx] }}</view>
            <view class="item-rate">
              <up-rate
                count="5"
                v-model="item.product.star"
                size="18"
                :readonly="true"
                :allow-half="true"
                activeColor="#4a68ee"
              ></up-rate>
              <text class="star-num">{{ item.product.star.toFixed(1) }}</text>
            </view>
            <view class="item-price">¥{{ priceMap[idx] }}</view>
          </view>

          <!-- 选择数量 -->
          <view class="item-count">
            <u-number-box
              :name="item.id"
              v-model="item.num"
              :min="1"
              size="small"
            ></u-number-box>
          </view>
        </view>
      </view>
    </up-checkbox-group>

    <!-- 底部操作栏 -->
  </view>
  <view class="cart-footer">
    <!-- 全选复选框 -->
    <u-checkbox
      :checked="isAllSelected"
      @change="toggleSelectAll"
      usedAlone
      class="check-all"
    >
      全选
    </u-checkbox>

    <view class="footer-summary">
      合计：<text class="footer-total">¥{{ totalPrice }}</text>
    </view>

    <u-button
      type="error"
      class="footer-btn"
      @click="checkout"
      :disable="disablePay"
    >
      结算 ({{ checkList.length }})
    </u-button>
    <u-button
      type="warning"
      class="footer-btn"
      @click="handelDelet"
      :disable="disablePay"
    >
      删除 ({{ checkList.length }})
    </u-button>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type Goods from "@/dataForm/Goods";
import {
  getSelectedCombination,
  getDynamicPrice,
} from "../../utill/couponUtils";
import getUser from "@/utill/getUser";
import { onShow } from "@dcloudio/uni-app";
import { useStore } from "vuex";
import API from "@/static/API";
import deletGood from "../../utill/deletGood";
import createPay from "@/utill/createPay";
import type Adress from "@/dataForm/Adress";
import NaviHeader from "@/component/naviHeader.vue";

const store = useStore();

const checkList = ref<number[]>([]);
const disablePay = computed(() => {
  return checkList.value.length > 0;
});
const cartList = ref<Goods[]>([]);
const adress = ref<Adress[]>([]);

onShow(() => {
  //取用户购物车数据
  if (store.state.sessionTokenV != "") {
    getUser(API, store.state.sessionTokenV)
      .then((user) => {
        if (user.Goods) {
          // console.log("获取购物车数据成功:", user.Goods);
          cartList.value = user.Goods;
          adress.value = user.adress;
        } else {
          uni.showToast({
            title: "购物车为空",
            icon: "none",
          });
          cartList.value = [];
        }
      })
      .catch((err) => {
        uni.showToast({
          title: "获取购物车数据失败",
          icon: "none",
        });
        console.error("获取购物车数据失败:", err);
      });
  }
});

// 全选状态
const isAllSelected = computed(
  () => checkList.value.length === cartList.value.length
);

// 生成配置的key
const key = computed(() => {
  return cartList.value.map((item) => {
    return getSelectedCombination(item.product, item.config);
  });
});

const priceMap = computed(() => {
  return cartList.value.map((item, index) => {
    return getDynamicPrice(item.product, key.value[index]);
  });
});

// 有效总价
const totalPrice = computed(() => {
  let allprices = 0;
  cartList.value.forEach((item, index) => {
    if (checkList.value.includes(item.id)) {
      allprices += item.product.priceMap[key.value[index]] * item.num;
    }
  });
  return allprices;
});

// 根据id查找index
const findIndex = (id: number) => {
  let result = 0;
  cartList.value.map((item, index) => {
    if (item.id == id) {
      result = index;
    }
  });
  return result;
};

// 全选/取消全选
const toggleSelectAll = (checked: boolean) => {
  if (checked) {
    checkList.value = cartList.value.map((item) => item.id);
  } else {
    checkList.value = [];
  }
};
// 结算
const checkout = () => {
  if (checkList.value.length === 0) {
    uni.showToast({
      title: "请选择要结算的商品",
      icon: "none",
    });
    return;
  }

  const payIds: number[] = [];
  const lengrh = checkList.value.length;

  checkList.value.forEach((id, index) => {
    const currentIndex = findIndex(id);
    const total =
      cartList.value[currentIndex].num * Number(priceMap.value[currentIndex]);
    // console.log(cartList.value[currentIndex].num);
    createPay(
      API,
      store.state.sessionTokenV,
      cartList.value[currentIndex].product.id,
      cartList.value[currentIndex].config,
      cartList.value[currentIndex].num,
      total,
      total,
      0,
      adress.value ? adress.value[0].id : 2
    )
      .then((payId) => {
        payIds.push(payId);
        if (index == lengrh - 1) {
          uni.navigateTo({
            url: `/pages/pay/index?payIds=${JSON.stringify(payIds)}`,
          });
        }
      })
      .catch((err) => {
        uni.showToast({
          icon: "error",
          title: `创建订单失败${err}`,
        });
      });
  });
};

//删除
const handelDelet = () => {
  if (checkList.value.length === 0) {
    uni.showToast({
      title: "请选择要结算的商品",
      icon: "none",
    });
    return;
  }
  // 确认删除
  uni.showModal({
    title: "提示",
    content: "确定要删除选中的商品吗？",
    success: (res) => {
      if (res.confirm) {
        deletGood(API, store.state.sessionTokenV, checkList.value)
          .then(() => {
            uni.showToast({
              title: "删除成功",
              icon: "success",
            });

            // 删除选中的商品
            cartList.value = cartList.value.filter(
              (item) => !checkList.value.includes(item.id)
            );
            // 清空选中的商品列表
            checkList.value = [];
            uni.showToast({
              title: "删除成功",
              icon: "success",
            });
          })
          .catch((err) => {
            uni.showToast({
              title: "删除失败",
              icon: "none",
            });
            console.error("删除商品失败:", err);
          });
      }
    },
  });
};
</script>

<style scoped>
.cart-page {
  position: relative;
  background: #fdfcfc;
  height: 80vh;
  overflow-y: auto;
  /* margin-bottom: 120rpx; */
}
.cart-item-wrap {
  margin-bottom: 24rpx;
}
.cart-item {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 18rpx;
  box-shadow: 2rpx 2rpx 1rpx rgba(192, 192, 194, 0.8); /* 添加阴影效果 */
  padding: 24rpx;
  margin: 50 24rpx;
  margin-top: 30rpx;
}
.item-img {
  width: 120rpx;
  height: 120rpx;
  border-radius: 12rpx;
  margin-right: 24rpx;
  object-fit: cover;
}
.item-info {
  flex: 1;
  min-width: 0;
}
.item-title {
  font-size: 28rpx;
  font-weight: 500;
  margin-bottom: 8rpx;
}
.item-desc {
  font-size: 24rpx;
  color: #888;
  margin-bottom: 8rpx;
}
.item-rate {
  display: flex;
  align-items: center;
  font-size: 22rpx;
  color: #faad14;
  margin-bottom: 8rpx;
}
.star-num {
  color: #999;
  margin-left: 8rpx;
  font-size: 22rpx;
}
.item-price {
  color: #fa3534;
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 8rpx;
}
.item-count {
  margin-left: 24rpx;
}
.cart-footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100vw;
  background: #fff;
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
  padding: 24rpx;
  z-index: 99;
  width: 100%;
  height: 10%;
}
.check-all {
  width: 20%;
}
.footer-summary {
  margin-left: 32rpx;
  font-size: 28rpx;
  color: #333;
  width: 30vw;
  width: 60%;
  display: flex;
  flex-direction: column;
}
.footer-total {
  color: #fa3534;
  font-size: 32rpx;
  font-weight: bold;
  margin-left: 8rpx;
}
.footer-tip {
  display: block;
  font-size: 22rpx;
  color: #bbb;
  margin-top: 4rpx;
}
.footer-btn {
  width: 200rpx;
  margin-left: 24rpx;
  font-size: 30rpx;
}
.footer-count {
  color: #bbb;
  font-size: 24rpx;
  margin-left: 8rpx;
}
.-body {
  height: 100vh;
  position: relative;
}
</style>
