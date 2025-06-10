export const useCouponModel = async (couponIds, payId) => {
  try {
    // 创建更新操作数组
    const updateOperations = couponIds.map((id) => {
      return prisma.Coupon.update({
        where: { id },
        data: { payid: payId },
      });
    });

    // 在单个事务中执行所有更新操作
    const results = await prisma.$transaction(updateOperations);
    console.log(`使用了 ${results.length} 消费卷`);
    return results;
  } catch (error) {
    console.error("使用消费卷出错:", error);
    throw error;
  }
};
