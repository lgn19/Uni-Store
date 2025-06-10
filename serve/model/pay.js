import { useCouponModel } from "./index.js";
import prisma from "../prisma/index.js";
import { parseProducts, parseProduct } from "../util/productParser.js";

export const addPayModel = async (
  userId,
  productId,
  num,
  config,
  totalAmount,
  actualAmount,
  discountAmount,
  adressId
) => {
  try {
    // 创建订单
    // console.log(userId, productId, adressId);
    const Pay = await prisma.pay.create({
      data: {
        userId: userId,
        productId: productId,
        num: num,
        config: config,
        totalAmount: totalAmount,
        actualAmount: actualAmount,
        discountAmount: discountAmount,
        paymentMethod: "待定",
        adressId: adressId,
        orderStatus: "待付款",
      },
      select: {
        id: true,
      },
    });
    //消费优惠券
    // useCouponModel(couponIds, Pay.id);
    return Pay; // 返回新插入记录的ID
  } catch (error) {
    // console.error("Error adding good:", error);
    throw error; // 抛出错误以便上层处理
  }
};

export const getPayModel = async (payIds) => {
  try {
    // 创建订单
    // console.log(payIds);
    const Pays = await prisma.pay.findMany({
      where: {
        id: {
          in: payIds,
        },
      },
      select: {
        id: true,
        config: true,
        num: true,
        config: true,
        product: true,
        createdTime: true,
      },
    });

    Pays.forEach((item, index) => {
      Pays[index].product = parseProduct(item.product);
      Pays[index].config = JSON.parse(item.config);
    });
    return Pays;
  } catch (error) {
    // console.error("Error adding good:", error);
    throw error; // 抛出错误以便上层处理
  }
};
