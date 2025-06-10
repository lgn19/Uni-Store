<template>
  <NaviHeader>
    <NaviBack></NaviBack>
    <template v-if="adressId != -1">编辑地址</template>
    <template v-if="adressId == -1">添加地址</template>
  </NaviHeader>

  <view class="container">
    <view class="item">
      <view @click="showRegionPick = true" class="item1">
        所在地区<up-icon name="arrow-down" size="15"></up-icon> </view
      ><view class="tittle">{{ adress.adressTittle }}</view>
      <view class="error-message" v-if="errors.adressTittle">{{
        errors.adressTittle
      }}</view>
    </view>
    <text class="item1">详细地址/门牌号</text>
    <up-input
      prefixIconStyle="详细地址/门牌号"
      border="bottom"
      v-model="adress.adressDetail"
      clearable
    ></up-input>
    <view class="error-message" v-if="errors.adressDetail">{{
      errors.adressDetail
    }}</view>

    <text class="item1">收货人名字</text>
    <up-input
      prefixIconStyle="收货人名字"
      border="bottom"
      v-model="adress.name"
      clearable
    ></up-input>
    <view class="error-message" v-if="errors.name">{{ errors.name }}</view>

    <text class="item1">手机号码</text>
    <up-input
      prefixIconStyle="手机号码"
      type="number"
      border="bottom"
      v-model="adress.phone"
      clearable
    ></up-input>
    <view class="error-message" v-if="errors.phone">{{ errors.phone }}</view>

    <view style="display: flex" class="last-item">
      <text class="item1 last-item">是否设为默认地址</text>
      <view class="button">
        <up-switch v-model="adress.default"></up-switch
      ></view>
    </view>
  </view>

  <view class="footer">
    <up-button text="取消" type="primary" @click="doNOtEdit"></up-button>
    <up-button text="确认" type="warning" @click="comfirmEdit"></up-button>
  </view>
  <up-picker
    :show="showRegionPick"
    :columns="columns"
    @confirm="confirm"
    @change="changeHandler"
    @cancel="
      () => {
        showRegionPick = false;
      }
    "
  ></up-picker>
</template>
<script lang="ts" setup>
import NaviHeader from "@/component/naviHeader.vue";
import NaviBack from "@/component/naviBack.vue";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import type Adress from "@/dataForm/Adress";
import { _myAdress } from "@/test/test";
import { provinces, cityMap, regionMap } from "../../static/placeMap";

const adressId = ref(0);
const adress = ref<Adress>({
  adressDetail: "",
  adressTittle: "",
  id: -1,
  name: "",
  phone: null,
  default: false,
});

// 添加错误状态管理
const errors = ref({
  adressTittle: "",
  adressDetail: "",
  name: "",
  phone: "",
});

const showRegionPick = ref(false);
const columns = ref([
  provinces,
  cityMap[provinces[0]],
  regionMap[cityMap[provinces[0]][0]],
]);

const changeHandler = (e: {
  columnIndex: number;
  value: any;
  values: any;
  index: number;
}) => {
  const { columnIndex, index } = e;
  if (columnIndex === 0) {
    columns.value[1] = cityMap[provinces[index]] || [];
  } else if (columnIndex === 1) {
    columns.value[2] = regionMap[columns.value[1][index]] || [];
  }
};

const confirm = (e: any) => {
  console.log(e);
  const result = e.value.join(" ");
  adress.value.adressTittle = result;
  showRegionPick.value = false;
};

// 表单验证函数
const validateForm = () => {
  // 清空之前的错误信息
  errors.value = {
    adressTittle: "",
    adressDetail: "",
    name: "",
    phone: "",
  };

  let isValid = true;

  // 验证所在地区
  if (!adress.value.adressTittle) {
    errors.value.adressTittle = "请选择所在地区";
    isValid = false;
  }

  // 验证详细地址
  if (!adress.value.adressDetail) {
    errors.value.adressDetail = "请输入详细地址";
    isValid = false;
  }

  // 验证收货人姓名
  if (!adress.value.name) {
    errors.value.name = "请输入收货人姓名";
    isValid = false;
  }

  // 验证手机号码
  if (!adress.value.phone) {
    errors.value.phone = "请输入手机号码";
    isValid = false;
  } else if (!/^1[3-9]\d{9}$/.test(adress.value.phone.toString())) {
    errors.value.phone = "请输入有效的手机号码";
    isValid = false;
  }

  return isValid;
};

onLoad((option: any) => {
  console.log(option);
  adressId.value = option.id;
  if (option.id != -1) {
    if (_myAdress[0]) {
      adress.value = _myAdress[0];
    }
  }
});

function comfirmEdit() {
  // 先验证表单
  if (!validateForm()) {
    // 表单验证失败，不继续提交
    uni.showToast({
      title: "请填写完整信息",
      icon: "none",
    });
    return;
  }

  uni.showModal({
    title: "提示",
    content: "是否确认修改",
    confirmText: "确认",
    cancelText: "取消",
    confirmColor: "#007AFF",
    cancelColor: "#000000",
    success: function (res) {
      if (res.confirm) {
        // 表单验证通过且用户确认后发送请求
        console.log("表单数据:", adress.value);

        // 这里应该添加实际的请求代码
        // sendAddressRequest(adress.value);

        uni.navigateBack({
          delta: 1,
        });
      }
    },
    fail: function (err) {
      console.log("调用失败", err);
    },
  });
}

function doNOtEdit() {
  uni.navigateBack({
    delta: 1,
  });
}
</script>
<style>
.container {
  padding: 30rpx;
}
.tittle {
  margin-top: 20rpx;
}
.item1 {
  display: flex;
  margin-right: 30rpx;
  margin-top: 30rpx;
  font-size: 35rpx;
  font-weight: 400;
}
.footer {
  width: 100vw;
  display: flex;
  position: fixed;
  bottom: 0rpx;
  padding-bottom: 10rpx;
}
.button {
  right: 20rpx;
  position: absolute;
  align-items: end;
  padding-top: 20rpx;
}

/* 添加错误信息样式 */
.error-message {
  color: red;
  font-size: 24rpx;
  margin-top: 5rpx;
  padding-left: 5rpx;
}
</style>
