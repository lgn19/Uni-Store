// 1. 生成配置的 Map Key
function getSelectedCombination(product, select) {
  return product.configs.map((config) => select[config.id]).join("-");
}
// 2. 计算动态价格
function getDynamicPrice(product, selectedCombination) {
  return product.priceMap[selectedCombination] || "价格未知";
}
// 3. 计算动态原始价格
function getDynamicOriginalPrice(product, selectedCombination) {
  return product.originalRriceMap?.[selectedCombination] || "价格未知";
}
// 4. 动态计算可用的优惠券数组
function getAvailableCoupons(myCoupon, product, selectedCombination) {
  if (!myCoupon || myCoupon.length === 0) return [];

  return myCoupon.filter((coupon) => {
    return (
      (coupon.classes === product.classes ||
        coupon.subClasses === product.subClasses ||
        coupon.enableId.includes(product.id)) &&
      product.enableDiscountMap?.[selectedCombination]
    );
  });
}
// . 计算是否符合优惠条件
function hasDiscount(availableCoupons) {
  return availableCoupons.length > 0;
}

// 6. 计算券后最多可优惠的价格
function getDiscountedPrice(dynamicPrice, availableCoupons) {
  if (!availableCoupons || availableCoupons.length === 0) return null;

  const maxDiscount = Math.max(
    ...availableCoupons.map((coupon) => coupon.count || 0)
  );
  return dynamicPrice - maxDiscount;
}
export {
  getSelectedCombination,
  getDynamicPrice,
  getDynamicOriginalPrice,
  getAvailableCoupons,
  hasDiscount,
  getDiscountedPrice,
};

// 例子
// const selectedCombination = computed(() => {
//   return getSelectedCombination(product.value, select.value);
// });

// const dynamicPrice = computed(() => {
//   return getDynamicPrice(product.value, selectedCombination.value);
// });

// const dynamicOriginalPrice = computed(() => {
//   return getDynamicOriginalPrice(product.value, selectedCombination.value);
// });

// const availableCoupons = computed(() => {
//   return getAvailableCoupons(myCoupon.value, product.value, selectedCombination.value);
// });

// const hasDiscountValue = computed(() => {
//   return hasDiscount(availableCoupons.value);
// });

// const discountedPrice = computed(() => {
//   return getDiscountedPrice(Number(dynamicPrice.value), availableCoupons.value);
// });
