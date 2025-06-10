<template>
  <NaviHeader> <NaviBack></NaviBack>支付 </NaviHeader>

  <view class="address" @click="showModal2 = true">
    <view style="display: flex" @click="showModal2 = true"
      ><up-icon name="map" size="15"></up-icon>{{ addressInfo }}</view
    ><up-icon name="arrow-right" size="10"></up-icon
  ></view>

  <!-- 列出每个订单 -->
  <view v-for="(item, index) in currentPay" :key="item.id" class="pay-item">
    <view class="product-info">
      <image :src="item.product.images[0]" class="image"></image>
      <view class="right-info">
        <view class="right-sub">
          <text class="title">{{ item.product.title }}</text>
          <text class="price"> ¥{{ dynamicPrice[index] }}</text>
        </view>
        <view class="right-sub">
          <text class="config">{{ selectedCombination[index] }}</text>
          <text class="num"> x{{ item.num }}</text></view
        >
        <view @click="handelUseCoupon(index)" class="use-coupon"
          >使用优惠券<up-icon name="arrow-right" size="10"></up-icon
        ></view>
      </view>
    </view>
    <view class="price-all"
      >共 <text class="price-text">¥{{ priceOfEachPay[index] }}</text></view
    >
    <view class="price-dcrease"
      >优惠券
      <text class="dcrease-text">-¥{{ priceDecrese[index] }}</text></view
    >
    <view class="pay-id">订单编号 {{ item.id }}</view>
    <view class="pay-time">{{ item.createdTime }}</view>
  </view>

  <!-- 支付方式 -->
  <view class="pay-way">
    <view class="pay-way-text">支付方式</view>
    <up-radio-group
      v-model="radiovalue1"
      placement="column"
      @change="groupChange"
    >
      <up-radio
        :customStyle="{ marginBottom: '2px' }"
        v-for="(item, index) in radiolist1"
        :key="index"
        :label="item.name"
        :name="item.name"
      >
      </up-radio>
    </up-radio-group>
  </view>

  <!-- 底部支付按钮 -->
  <view class="footer"
    ><view class="footer-left"
      ><up-icon
        name="kefu-ermai"
        labelPos="bottom"
        label="客服"
        color="#2979ff"
        size="28"
      ></up-icon>
    </view>
    <view class="footer-center"
      ><view class="price-all-text"
        >合计 <text class="price-all-num"> ¥{{ priceAll }}</text></view
      ><view class="price-dcrease-text"
        >共减
        <text class="price-dcrease-num"> ¥{{ priceDecreseAll }}</text></view
      ></view
    >
    <view
      ><up-button :text="'总共¥' + priceAll" type="primary"></up-button
    ></view>
  </view>

  <BackToTop
    :style="{ display: scrollTopCurrent > 400 ? 'block' : 'none' }"
  ></BackToTop>
  <!-- 底部弹出框组件 -->

  <BottomPop :visible="showModal2" @close="showModal2 = false">
    <view class="selecAdress"> 选择你的地址（点击即可）</view>
    <AdressComponent
      :parent-adress="adress.filter((item) => item !== undefined)"
      mode="select"
      @select="handleSelectAdress"
    ></AdressComponent
  ></BottomPop>

  <BottomPop :visible="showModal" @close="showModal = false">
    <view class="selecAdress"> 选择你的优惠卷</view
    ><CouponComponent
      :my-coupon="availableCoupons[payindex]"
      :selected="currentPaySelectedCoupon"
      mode="select"
      :max="maxCoupon"
      @select="handleSelectCoupon"
      :index="payindex"
    ></CouponComponent
  ></BottomPop>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { onPageScroll } from "@dcloudio/uni-app";
import BackToTop from "@/component/backToTop.vue";
import type Coupon from "../../dataForm/Coupon";
import type Product from "../../dataForm//Product";
import type Adress from "@/dataForm/Adress";
import type CurrentPay from "@/dataForm/CurrentPay";
import BottomPop from "@/component/bottomPop.vue";
import { useScroll } from "@/utill/handelScroll";
import calculateAvailableCoupons from "@/utill/calculateAvailableCoupons";
import {
  getSelectedCombination,
  getDynamicPrice,
  getDynamicOriginalPrice,
  getAvailableCoupons,
  getDiscountedPrice,
} from "../../utill/couponUtils";
import NaviHeader from "@/component/naviHeader.vue";
import NaviBack from "@/component/naviBack.vue";
import AdressComponent from "@/component/adressComponent.vue";
import CouponComponent from "@/component/couponComponent.vue";
import { onLoad } from "@dcloudio/uni-app";
import getPay from "../../utill/getPay";
import { useStore } from "vuex";
import API from "../../static/API";
import getUser from "@/utill/getUser";

const store = useStore();

const myCoupon = ref<Coupon[]>();
const MYCOUPON: Coupon[] = [];
const currentPay = ref<CurrentPay[]>();
const adress = ref<Adress[]>([]);

// 点击使用优惠券的订单index
const payindex = ref(0);
const selectCouponOFEachPay = ref<Coupon[][]>([]);

const currentPaySelectedCoupon = computed(() => {
  return selectCouponOFEachPay.value[payindex.value];
});

// 计算每个订单使用优惠后减少的价格,应该发请求
const priceDecrese = computed(() => {
  return selectCouponOFEachPay.value.map((coupons) => {
    return coupons.length == 0
      ? 0
      : coupons.reduce((acc, coupon) => {
          return acc + (coupon.count ?? 0);
        }, 0);
  });
});
// 总共减少价格,应该发请求
const priceDecreseAll = computed(() => {
  return priceDecrese.value.reduce((acc, cur) => acc + cur, 0);
});

//选择的地址id
const addressInfo = ref("");

onLoad((option) => {
  // console.log(JSON.parse(option?.payIds), "路由");
  getPay(API, store.state.sessionTokenV, option?.payIds).then((pays) => {
    console.log(pays);
    currentPay.value = pays;
    // priceDecrese.value = Array.from({ length: pays.length }, () => 0);
    selectCouponOFEachPay.value = Array.from({ length: pays.length }, () => []);
  });
  getUser(API, store.state.sessionTokenV).then((user) => {
    adress.value = user.adress;
    myCoupon.value = user.coupon;
    MYCOUPON.push(...user.coupon);
    addressInfo.value = `${user.adress[0].name}        ${user.adress[0].adressDetail}`;
  });
});

// 控制弹出框显示
const showModal = ref(false);
const showModal2 = ref(false);

// 支付方式列表
const radiolist1 = ref([
  {
    name: "微信",
    disabled: false,
  },
  {
    name: "云闪付",
    disabled: false,
  },
]);

// 当前点开的优惠卷最多可以使用的优惠券数量，取商品数和可用优惠券数的最小值
const maxCoupon = computed(() => {
  return availableCoupons.value
    ? Math.min(
        availableCoupons.value[payindex.value]?.length,
        currentPay.value?.[payindex.value]?.num ?? 0
      )
    : 0;
});

// up-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
const radiovalue1 = ref("微信");
const groupChange = (n: string) => {
  console.log("groupChange", n);
};

// 生成配置的map key
const selectedCombination = computed(() => {
  return (currentPay.value ?? []).map((payItem) => {
    return getSelectedCombination(payItem.product, payItem.config);
  });
});

// 计算动态价格
const dynamicPrice = computed(() => {
  return (currentPay.value ?? []).map((payItem, index) => {
    return getDynamicPrice(payItem.product, selectedCombination.value[index]);
  });
});

// 计算动态原始价格
const dynamicOriginalPrice = computed(() => {
  return (
    currentPay.value ??
    [].map((payItem: CurrentPay, index) => {
      return getDynamicOriginalPrice(
        payItem.product,
        selectedCombination.value[index]
      );
    })
  );
});

// 动态计算每个订单可用的优惠券数组
const availableCoupons = computed(() => {
  return (currentPay.value ?? []).map((payItem, index) => {
    return getAvailableCoupons(
      myCoupon.value ?? [],
      payItem.product,
      selectedCombination.value[index]
    );
  });
});

// 计算每个订单优惠券是否为0
const hasDiscount = computed(() => {
  return availableCoupons.value.map((coupon) => {
    return coupon.length > 0 ? true : false;
  });
});

// 计算券后最多可优惠的价格
const discountedPrice = computed(() => {
  return (currentPay.value ?? []).map((payItem, index) => {
    return getDiscountedPrice(
      Number(dynamicPrice.value[index]),
      availableCoupons.value[index]
    );
  });
});

// 计算每个订单价格
const priceOfEachPay = computed(() => {
  return dynamicPrice.value.map((price, index) => {
    return (
      Number(price) * (currentPay.value?.[index]?.num ?? 0) -
      priceDecrese.value[index]
    );
  });
});

// 计算总价
const priceAll = computed(() => {
  let total = 0;
  priceOfEachPay.value.forEach((item, index) => {
    total += item;
    // total -= priceDecrese[index];
  });
  return total;
});

// 监听屏幕位置的状态和修改方法
const { scrollTopCurrent, setScrollTopCurrent } = useScroll(200);
onPageScroll((e) => {
  setScrollTopCurrent(e);
});

// 点击使用地址
function handleSelectAdress(id: number) {
  adress.value.forEach((item) => {
    if (item.id == id) {
      addressInfo.value = `${item.name}        ${item.adressDetail}`;
    }
  });

  showModal2.value = false;
}

// 选择优惠卷后
function handleSelectCoupon(selectCoupon: number[]) {
  showModal.value = false;

  //计算优惠后价格
  // priceDecrese.value[payindex.value] = selectCoupon.reduce((acc, couponId) => {
  //   const coupon = myCoupon.value?.find((c) => c.id === couponId);
  //   return acc + (coupon?.count ?? 0);
  // }, 0);

  const merge = [];
  selectCouponOFEachPay.value[payindex.value] =
    MYCOUPON?.filter((coupon) => selectCoupon.includes(coupon.id)) ?? [];

  myCoupon.value = MYCOUPON?.filter(
    (coupon) => !selectCoupon.includes(coupon.id)
  );

  // 发请求
}

// 点击使用优惠卷
function handelUseCoupon(index: number) {
  payindex.value = index;
  setTimeout(() => {
    showModal.value = true;
  }, 0);
}
</script>

<style scoped>
.selecAdress {
  margin-top: 30rpx;
  text-align: center;
  font-weight: 400rpx;
  font-size: 35rpx;
}
.footer {
  padding: 20rpx;
  padding-bottom: 30rpx;
  width: 100%;
  display: flex;
  position: fixed;
  bottom: 0rpx;
  background-color: #f3f3f3;
}
.footer-left {
  padding: 10rpx;
  width: 30%;
  justify-content: space-between;
  display: flex;
}
.footer-center {
  padding: 10rpx;
  display: flex;
  flex-direction: column;
  width: 30%;
  justify-content: space-between;
}
.price-all-text {
  font-size: 30rpx;
}
.price-all-num {
  font-size: 30rpx;
  color: rgba(76, 107, 249, 0.9);
}
.price-dcrease-text {
  font-size: 25rpx;
  color: rgba(96, 96, 96, 0.85);
}
.price-dcrease-num {
  font-size: 25rpx;
  color: rgba(244, 146, 14, 0.65);
}

/* rgba(244, 146, 14, 0.85) */

.pay-way {
  padding: 10rpx;
  border-bottom: 20rpx solid #e5e5e5;
}
.pay-way-text {
  font-size: 35rpx;
  font-weight: 200rpx;
}

.pay-item {
  padding: 20rpx;
  border-bottom: 20rpx solid #e5e5e5; /* 添加底部分割线 */
}
.product-info {
  display: flex;
  width: 100vw;
  padding-bottom: 10rpx;
  border-bottom: 1rpx solid #e5e5e5; /* 添加底部分割线 */
}
.image {
  border-radius: 10rpx;
  margin-right: 10rpx;
  display: block;
  height: 20vw;
  width: 20vw;
}
.right-info {
  width: 70vw;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
}
.right-sub {
  display: flex;
  justify-content: space-between;
}
.config {
  font-size: 25rpx;
  color: rgba(82, 82, 82, 0.89);
}
.num {
  font-size: 25rpx;
  color: rgba(82, 82, 82, 0.89);
}
.use-coupon {
  display: flex;
  justify-content: flex-end;
  text-align: end;
  color: rgba(244, 146, 14, 0.85);
}
.price-all {
  font-size: 32rpx;
  margin: 10rpx;
  display: flex;
  justify-content: flex-end;
}
.price-dcrease {
  font-size: 28rpx;
  margin: 10rpx;
  display: flex;
  justify-content: flex-end;
}
.price-text {
  font-weight: bold;
  color: rgba(76, 107, 249, 0.9);
}
.dcrease-text {
  color: rgba(244, 146, 14, 0.65);
}
.pay-id {
  padding-top: 10rpx;
  color: rgba(82, 82, 82, 0.89);
  border-top: 1rpx solid #e5e5e5; /* 添加底部分割线 */
}
.pay-time {
  color: rgba(82, 82, 82, 0.89);
}
.blank {
  position: sticky;
  top: 0;
  z-index: 99;
  background: #4c6bf9;
  text-align: center;
  padding-top: 100rpx;
  padding-bottom: 20rpx;
  font-size: 36rpx;
  font-weight: bold; /* 字体加粗 */
  width: 100%;
}
.header {
  position: relative; /* 确保子元素可以相对定位 */
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  padding: 0 25rpx;
  width: 100%;
  text-align: center;
}

.back-icon {
  position: absolute; /* 让返回按钮脱离文档流 */
  left: 10rpx;
}
.address {
  border-bottom: 20rpx solid #e5e5e5; /* 添加底部分割线 */
  justify-content: space-between;
  display: flex;
  margin-bottom: 10rpx;
  padding-right: 30rpx;
  padding: 20rpx;
}
.body {
  background-color: rgb(196, 199, 202);
}
</style>
