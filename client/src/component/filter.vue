<template>
  <view class="header"
    ><view lass="header-text">关闭开关即不选择</view
    ><button class="confirm" @click="handleClick">确定</button></view
  >
  <view class="filter-container">
    <view class="filter-section">
      <view class="filter-header">
        <up-switch v-model="ifPlace" class="switch-toggle"></up-switch>
        <view class="filter-title">发货地</view>
      </view>
      <view
        v-if="ifPlace"
        class="filter-content"
        @click="showRegionPick = true"
      >
        <view v-if="region == ''" class="placeholder-text">请选择</view>
        <view v-else class="selected-value">{{ region }}</view>
      </view>
    </view>

    <view class="filter-section">
      <view class="filter-header">
        <up-switch v-model="ifPrice" class="switch-toggle"></up-switch>
        <view class="filter-title">价格</view>
      </view>
      <view v-if="ifPrice" class="filter-content">
        <view class="price-range">
          <text class="label-text">最低价</text>
          <slider
            :min="priceMinMin"
            :max="priceMinMax"
            @change="handlePriceChangeMin"
            class="custom-slider"
          ></slider>
          <view class="price-value">
            <text>¥</text>
            <text>{{ priceMin }}</text>
          </view>
          <up-number-box
            v-model="priceMin"
            :min="priceMinMin"
            :max="priceMinMax"
            class="number-input"
          ></up-number-box>
        </view>

        <view class="price-range">
          <text class="label-text">最高价</text>
          <slider
            :min="priceMaxMin"
            :max="priceMaxMax"
            @change="handlePriceChangeMax"
            class="custom-slider"
          ></slider>
          <view class="price-value">
            <text>¥</text>
            <text>{{ priceMax }}</text>
          </view>
          <up-number-box
            v-model="priceMax"
            :min="priceMaxMin"
            :max="priceMaxMax"
            class="number-input"
          ></up-number-box>
        </view>
      </view>
    </view>

    <view class="filter-section">
      <view class="filter-header">
        <up-switch v-model="ifStore" class="switch-toggle"></up-switch>
        <view class="filter-title">库存</view>
      </view>
      <view v-if="ifStore" class="filter-content">
        <up-subsection
          :list="list"
          :current="current"
          class="subsection-tabs"
          @change="
            (e: number) => {
              current = e;
            }
          "
        ></up-subsection>
      </view>
    </view>

    <view class="filter-section">
      <view class="filter-header">
        <up-switch v-model="ifStar" class="switch-toggle"></up-switch>
        <view class="filter-title">评分</view>
      </view>
      <view v-if="ifStar" class="filter-content">
        <slider
          :min="0"
          :max="5"
          @change="handleStarChange"
          show-value
          class="custom-slider star-slider"
        ></slider>
        <view class="star-rating">
          <view class="star-value">
            <text>{{ star.toFixed(1) }}</text>
            <text class="star-text">分及以上</text>
          </view>
          <view class="star-icons">
            <text
              v-for="i in 5"
              :key="i"
              class="star-icon"
              :class="{ active: i <= star }"
              >★</text
            >
          </view>
        </view>
      </view>
    </view>

    <view class="filter-section">
      <view class="filter-header">
        <up-switch v-model="ifClass" class="switch-toggle"></up-switch>
        <view class="filter-title">分类</view>
      </view>
      <view v-if="ifClass" class="filter-content" @click="showClassPick = true">
        <view v-if="classes[0] == null" class="placeholder-text">请选择</view>
        <view v-else class="selected-value"
          >大类：{{ classes[0] }} {{}}{{}}{{}}小类：{{ classes[1] }}</view
        >
      </view>
    </view>
  </view>

  <!-- 发货地 -->
  <up-picker
    :show="showRegionPick"
    :columns="columns"
    @confirm="confirmRegion"
    @change="regionChangeHandler"
    @cancel="showRegionPick = false"
    class="custom-picker"
  ></up-picker>

  <!-- 分类 -->
  <up-picker
    :show="showClassPick"
    :columns="columnsClass"
    @confirm="confirmClass"
    @change="classChangeHandler"
    @cancel="showClassPick = false"
    class="custom-picker"
  ></up-picker>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { provinces, cityMap, regionMap } from "../static/placeMap";
import { _classes, _subClassMap } from "../static/classMap";

const ifPlace = ref(false);
const ifClass = ref(false);
const ifStar = ref(false);
const ifPrice = ref(false);
const ifStore = ref(false);

const emit = defineEmits<{ (event: "confirm", data: any): void }>();

function handleClick() {
  emit("confirm", searchInfo);
}

const searchInfo = computed(() => {
  return {
    _place: ifPlace.value ? region.value : "",
    _priceMin: ifPrice.value ? priceMin.value : 0,
    _priceMax: ifPrice.value ? priceMax.value : 999999,
    _store: ifStore.value ? (list.value[current.value] == "有库存" ? 1 : 0) : 0,
    _star: ifStar.value ? star.value : 0,
    _classes: ifClass.value ? classes.value[0] : "",
    _subClasses: ifClass.value ? classes.value[1] : "",
  };
});

// 地区选择
const showRegionPick = ref(false);
const region = ref("");
const columns = ref([["全部", ...provinces], ["全部"], ["全部"]]);
// 处理列变化
const regionChangeHandler = (e: { columnIndex: number; index: number }) => {
  const { columnIndex, index } = e;

  if (columnIndex === 0) {
    // 更新市列表
    const selectedProvince = provinces[index - 1]; // -1 是因为"全部"占据了第一个位置
    columns.value[1] = [
      "全部",
      ...(selectedProvince ? cityMap[selectedProvince] : []),
    ];
    columns.value[2] = ["全部"]; // 重置区列表
  } else if (columnIndex === 1) {
    // 更新区列表
    const selectedCity = columns.value[1][index];
    columns.value[2] = [
      "全部",
      ...(regionMap[selectedCity] ? regionMap[selectedCity] : []),
    ];
  }
};
const confirmRegion = (e: any) => {
  const result = e.value.filter((item: string) => item !== "全部").join("");
  region.value = result;
  showRegionPick.value = false;
};

// 价格区间
const priceMin = ref(0); // 最低价格
const priceMax = ref(200); // 最高价格

const priceMinMin = computed(() => {
  return priceMin.value - 100 < 0 ? 0 : priceMin.value - 100;
});
const priceMinMax = computed(() => {
  return priceMin.value + 100 > priceMax.value
    ? priceMax.value
    : priceMin.value + 100;
});

const priceMaxMin = computed(() => {
  return priceMax.value - 100 < priceMin.value
    ? priceMin.value
    : priceMax.value - 100;
});
const priceMaxMax = computed(() => {
  return priceMax.value + 100 > 9999 ? 9999 : priceMax.value + 100;
});

function handlePriceChangeMin(e: any) {
  priceMin.value = e.detail.value;
}
function handlePriceChangeMax(e: any) {
  priceMax.value = e.detail.value;
}

// 库存
const list = ref(["全部", "有库存", "无库存"]);
const current = ref(1);

// 评分
const star = ref(0);
function handleStarChange(e: any) {
  star.value = e.detail.value;
}

// 分类选择
const showClassPick = ref(false);
const classes = ref<string[]>([]);
const columnsClass = ref([["全部", ..._classes], ["全部"]]);
// 处理列变化
const classChangeHandler = (e: { columnIndex: number; index: number }) => {
  const { columnIndex, index } = e;

  if (columnIndex === 0) {
    // 更新市列表
    const selectedProvince = _classes[index - 1]; // -1 是因为"全部"占据了第一个位置
    columnsClass.value[1] = [
      "全部",
      ...(selectedProvince ? _subClassMap[selectedProvince] : []),
    ];
  }
};
const confirmClass = (e: any) => {
  classes.value[0] = e.value[0] == "全部" ? null : e.value[0];
  classes.value[1] = e.value[1] == "全部" ? null : e.value[1];

  showClassPick.value = false;
};
</script>

<style lang="css" scoped>
/* 全局样式 */
.filter-container {
  padding: 15px;
  background-color: #f5f5f5;
  overflow-y: auto;
  height: 75%;
}

/* 筛选项通用样式 */
.filter-section {
  margin-bottom: 15px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.filter-header {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;
  background-color: #f8f8f8;
}

.filter-title {
  flex: 1;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-left: 10px;
}

.filter-content {
  padding: 15px;
}

/* 开关样式 */
.switch-toggle {
  transform: scale(0.9);
}

/* 价格范围样式 */
.price-range {
  margin-bottom: 15px;
}

.price-range:last-child {
  margin-bottom: 0;
}

.label-text {
  color: #666;
  font-size: 14px;
  margin-bottom: 5px;
  display: inline-block;
}

.price-value {
  display: flex;
  align-items: center;
  margin-top: 5px;
}

.price-value text:first-child {
  color: #f40;
  margin-right: 2px;
}

.price-value text:last-child {
  font-weight: 500;
}

.number-input {
  width: 80px;
  height: 30px;
  margin-left: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

/* 滑块样式 */
.custom-slider {
  height: 40px;
}

.star-slider {
  margin-bottom: 10px;
}

/* 评分样式 */
.star-rating {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.star-value {
  display: flex;
  align-items: center;
}

.star-value text:first-child {
  font-size: 18px;
  font-weight: bold;
  color: #f40;
  margin-right: 5px;
}

.star-value text:last-child {
  color: #666;
}

.star-icons {
  display: flex;
}

.star-icon {
  font-size: 20px;
  color: #ddd;
  margin-right: 2px;
  transition: color 0.2s;
}

.star-icon.active {
  color: #ffc300;
}

/* 库存选择器样式 */
.subsection-tabs {
  padding: 5px 0;
}

/* 选择内容样式 */
.placeholder-text {
  color: #999;
  font-size: 14px;
}

.selected-value {
  color: #333;
  font-size: 14px;
}

/* 选择器样式 */
.custom-picker {
  --up-picker-toolbar-background: #f8f8f8;
  --up-picker-confirm-color: #f40;
  --up-picker-cancel-color: #666;
}

/* 顶部 header 样式 */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 80rpx 15rpx;
  background-color: #f8f8f8;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

/* 确定按钮样式 */
.confirm {
  /* padding: 15rpx 8rpx; */
  background-color: #2979ff;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  position: absolute;
  right: 20rpx;
}

/* 关闭开关提示文本样式 */
.header-text {
  font-size: 14px;
  color: #666;
  margin-left: 10px;
}
</style>
