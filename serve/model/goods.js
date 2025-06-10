import prisma from "../prisma/index.js";

export const addGoodModel = async (userId, productId, num, config) => {
  try {
    // console.log(userId, productId, num, config);
    const result = await prisma.goods.create({
      data: {
        userId: userId,
        productId: productId,
        num: num,
        config: config,
      },
      select: {
        id: true, // 只选择需要的字段
      },
    });
    return result; // 返回新插入记录的ID
  } catch (error) {
    // console.error("Error adding good:", error);
    throw error; // 抛出错误以便上层处理
  }
};

export const deleteGoodModel = async (userId, goodIds) => {
  try {
    const result = await prisma.goods.deleteMany({
      where: {
        userId: userId,
        id: {
          in: goodIds, // ✅ 使用 in 操作符匹配多个值
        },
      },
      select: {
        count: true, // 返回删除的记录数
      },
    });
    return result; // 返回删除的记录数
  } catch (error) {
    throw error; // 抛出错误以便上层处理
  }
};
