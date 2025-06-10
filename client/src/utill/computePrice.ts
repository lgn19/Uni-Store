import type Coupon from "../dataForm/Coupon";

/**
 * 自定义使用目标优惠券
 * @param dynamicPrice 当前商品的原始价格
 * @param quantity 购买数量
 * @param selectedCoupons 用户选择的优惠券数组
 * @returns 最终总价和使用的优惠券ID数组
 */
function calculatePriceWithSelectedCoupons(
  dynamicPrice: number,
  quantity: number,
  selectedCoupons: Coupon[]
): { totalPrice: number; usedCouponIds: number[] } {
  if (!dynamicPrice || quantity <= 0)
    return { totalPrice: 0, usedCouponIds: [] };

  // 计算总优惠金额
  const totalDiscount = selectedCoupons.reduce((sum, coupon) => {
    return sum + (coupon.count || 0);
  }, 0);

  // 计算总价
  const totalPrice = Math.max(dynamicPrice * quantity - totalDiscount, 0);

  // 返回总价和使用的优惠券ID
  return {
    totalPrice,
    usedCouponIds: selectedCoupons.map((coupon) => coupon.id),
  };
}

/**
 * 默认自动选择优惠券
 * @param dynamicPrice 当前商品的原始价格
 * @param quantity 购买数量
 * @param availableCoupons 可用的优惠券数组
 * @returns 最终总价和使用的优惠券ID数组
 */
function calculatePriceWithAutoCoupons(
  dynamicPrice: number,
  quantity: number,
  availableCoupons: Coupon[]
): { totalPrice: number; usedCouponIds: number[] } {
  if (!dynamicPrice || quantity <= 0)
    return { totalPrice: 0, usedCouponIds: [] };

  // 按优惠金额从大到小排序优惠券
  const sortedCoupons = [...availableCoupons].sort((a, b) => b.count - a.count);

  // 选择最多与商品数量相等的优惠券
  const selectedCoupons = sortedCoupons.slice(0, quantity);

  // 计算总优惠金额
  const totalDiscount = selectedCoupons.reduce((sum, coupon) => {
    return sum + (coupon.count || 0);
  }, 0);

  // 计算总价
  const totalPrice = Math.max(dynamicPrice * quantity - totalDiscount, 0);

  // 返回总价和使用的优惠券ID
  return {
    totalPrice,
    usedCouponIds: selectedCoupons.map((coupon) => coupon.id),
  };
}
export { calculatePriceWithAutoCoupons, calculatePriceWithSelectedCoupons };
