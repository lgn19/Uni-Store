import type Product from "@/dataForm/Product";
import type Coupon from "@/dataForm/Coupon";

// 1. 生成配置的 Map Key
function getSelectedCombination(
  product: Product,
  select: { [key: number]: string }
): string {
  return product.configs.map((config) => select[config.id]).join("-");
}
// 2. 计算动态价格
function getDynamicPrice(
  product: Product,
  selectedCombination: string
): string | number {
  return product.priceMap[selectedCombination] || "价格未知";
}
// 3. 计算动态原始价格
function getDynamicOriginalPrice(
  product: Product,
  selectedCombination: string
): string | number {
  return product.originalPriceMap?.[selectedCombination] || "价格未知";
}
// 4. 动态计算可用的优惠券数组
function getAvailableCoupons(
  myCoupon: Coupon[],
  product: Product,
  selectedCombination: string
): Coupon[] {
  if (!myCoupon || myCoupon.length === 0) return [];

  return myCoupon.filter((coupon) => {
    return (
      // 检查优惠券的classes是否与产品匹配
      (coupon.classes === product.classes ||
        // 检查优惠券的subClasses是否与产品匹配
        coupon.subClasses === product.subClasses ||
        // 检查产品ID是否在优惠券的可用ID列表中
        coupon.enableId === undefined ||
        coupon.enableId.includes(product.id)) &&
      // 检查产品是否启用了该组合的折扣
      product.enableDiscountMap[selectedCombination]
    );
  });
}
// . 计算是否符合优惠条件
function hasDiscount(availableCoupons: Coupon[]): boolean {
  return availableCoupons.length > 0;
}

// 6. 计算券后最多可优惠的价格
function getDiscountedPrice(
  dynamicPrice: number,
  availableCoupons: Coupon[]
): number | null {
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
