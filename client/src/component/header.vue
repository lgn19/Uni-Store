<template>
  <view class="top-bar">
    <view class="city" @click="showRegionPick = true" v-if="ifShowRegion">
      <u-icon name="map" color="#879cff" size="28"></u-icon>
      <text class="city-name">{{ region }}</text>
      <u-icon name="arrow-down" color="#999" size="18"></u-icon>
    </view>

    <view class="input">
      <up-search
        placeholder="日照香炉生紫烟"
        v-model="inputValue"
        clearabled
        :show-action="showDelet"
        search-icon="scan"
        @change="handleChange"
        @search="handleSearch"
        @custom="handleSearch"
      ></up-search>
    </view>

    <view class="car">
      <up-icon
        @click="$emit('click')"
        name="shopping-cart-fill"
        color="#879cff"
        size="28"
        :label="num"
        labelPos="right"
        labelColor="#879cff"
      ></up-icon>
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
  </view>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { provinces, cityMap, regionMap } from "../static/placeMap";

const store = useStore();

defineProps<{ num: number; ifShowRegion: boolean }>();
const emit = defineEmits<{
  (event: "click"): void;
  (event: "search", data: string): void;
}>();

const inputValue = ref("");
const region = ref("请选择");

const showRegionPick = ref(false);
const showDelet = computed(() => {
  return !!inputValue.value;
});

const columns = ref([
  provinces,
  cityMap[provinces[0]],
  regionMap[cityMap[provinces[0]][0]],
]);

// 处理定位
const changeHandler = (e: {
  // 发生变化的列的索引
  columnIndex: number;
  //   当前变动列选中的值
  value: any;
  //   当前所有列选中的值组成的数组。例如 ["中国", "深圳"]。
  values: any;
  //   当前变动列选中的索引。例如你选了省列表的第 1 个，index 就是 0。
  index: number;
}) => {
  const { columnIndex, index } = e;
  if (columnIndex === 0) {
    // 选择省，更新市
    columns.value[1] = cityMap[provinces[index]] || [];
  } else if (columnIndex === 1) {
    // 选择市，更新区
    columns.value[2] = regionMap[columns.value[1][index]] || [];
  }
};

const confirm = (e: any) => {
  // console.log("confirm", e);
  region.value = e.value[2];
  showRegionPick.value = false;
};

// 处理输入
function handleChange(value: string) {
  store.commit("setSearchInput", value);
  // console.log(store.state.searchInput);
}
function handleSearch(value: string) {
  // console.log(store.state.searchInput);
  emit("search", value);
}
</script>

<style scoped>
.top-bar {
  margin-top: 70rpx;
  justify-content: space-between;
  display: flex;
  align-items: center;
  background: rgba(133, 126, 126, 0);
  width: 100vw;
  padding-right: 20rpx;
}

.city {
  display: flex;
  align-items: center;
  margin-right: 18rpx;
  cursor: pointer;
}
.city-name {
  margin: 0 6rpx;
  font-size: 24rpx;
  color: #222;
}
.input {
  /* max-width: 50vw; */
  flex: 1;
}
.car {
  color: white;
  float: right;
  width: 25vw;
}
</style>
