/**
 * 根据优惠券、商品和配置计算可用优惠券列表
 * @param myCoupon 用户拥有的优惠券列表
 * @param product 当前商品信息
 * @param config 当前选择的商品配置
 * @returns 可用优惠券列表
 */
import type Coupon from "@/dataForm/Coupon";
import type Product from "@/dataForm/Product";
export default function calculateAvailableCoupons(
  myCoupon: Coupon[],
  product: Product,
  config: { [key: number]: string }
): Coupon[] {
  if (!myCoupon || myCoupon.length === 0) return [];

  // 根据当前选择的配置组合生成 key
  const selectedCombination = product.configs
    .map((configItem) => config[configItem.id])
    .join("-");

  // 筛选符合条件的优惠券
  return myCoupon.filter((coupon) => {
    const isApplicable =
      coupon.classes === product.classes || // 优惠券适用商品分类
      coupon.subClasses === product.subClasses || // 优惠券适用商品子分类
      coupon.enableId.includes(product.id); // 优惠券适用商品 ID

    const isCombinationEligible =
      product.enableDiscountMap?.[selectedCombination]; // 当前配置组合是否符合优惠条件

    return isApplicable && isCombinationEligible;
  });
}
