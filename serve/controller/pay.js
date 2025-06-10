import {
  addPayModel,
  verifySessionExistModel,
  verifySessionExpireModel,
  getUserModel,
  getPayModel,
} from "../model/index.js";

export const addPay = async (ctx) => {
  try {
    const query = ctx.request.body;
    const sessionToken = query.sessionToken;
    const config = query.config;
    const num = query.num;
    const productId = query.productId;
    const totalAmount = query.totalAmount;
    const actualAmount = query.actualAmount;
    const discountAmount = query.discountAmount;
    const adressId = query.adressId;
    try {
      if (sessionToken == "") {
        ctx.status = 400;
        ctx.body = "请求参数错误";
      } else {
        const ifSessionExist = await verifySessionExistModel(sessionToken);
        if (ifSessionExist) {
          const ifSessionExpire = await verifySessionExpireModel(sessionToken);
          if (ifSessionExpire) {
            ctx.status = 401;
            ctx.body = "会话过期";
          } else {
            const user = await getUserModel(sessionToken);
            // console.log("user", user);
            if (user) {
              const addResult = await addPayModel(
                user.id,
                productId,
                num,
                config,
                totalAmount,
                actualAmount,
                discountAmount,
                adressId
              );
              ctx.body = {
                message: "创建订单成功",
                id: addResult.id,
              };
              ctx.status = 201;
            } else {
              ctx.status = 401;
              ctx.body = "用户不存在";
            }
          }
        } else {
          ctx.status = 401;
          ctx.body = "会话不存在";
        }
      }
    } catch (err) {
      throw err;
    }
  } catch (err) {
    throw err;
  }
};

export const getPay = async (ctx) => {
  try {
    const query = ctx.query;
    // console.log(query);
    const sessionToken = query.sessionToken;
    const payIds = JSON.parse(query.payId);
    // console.log(payIds);

    try {
      if (sessionToken == "") {
        ctx.status = 400;
        ctx.body = "请求参数错误";
      } else {
        const ifSessionExist = await verifySessionExistModel(sessionToken);
        if (ifSessionExist) {
          const ifSessionExpire = await verifySessionExpireModel(sessionToken);
          if (ifSessionExpire) {
            ctx.status = 401;
            ctx.body = "会话过期";
          } else {
            const user = await getUserModel(sessionToken);
            // console.log("user", user);
            if (user) {
              const payResult = await getPayModel(payIds);
              ctx.body = payResult;
              ctx.status = 201;
            } else {
              ctx.status = 401;
              ctx.body = "用户不存在";
            }
          }
        } else {
          ctx.status = 401;
          ctx.body = "会话不存在";
        }
      }
    } catch (err) {
      throw err;
    }
  } catch (err) {
    throw err;
  }
};
