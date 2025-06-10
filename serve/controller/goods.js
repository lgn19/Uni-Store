import {
  addGoodModel,
  verifySessionExistModel,
  verifySessionExpireModel,
  getUserModel,
  deleteGoodModel,
} from "../model/index.js";

export const addGood = async (ctx) => {
  try {
    const query = ctx.request.body;
    const sessionToken = query.sessionToken;
    const config = query.config;
    const num = query.num;
    const productId = query.productId;
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
              const addResult = await addGoodModel(
                user.id,
                productId,
                num,
                config
              );
              ctx.body = {
                message: "添加成功",
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

export const deleteGood = async (ctx) => {
  try {
    const query = ctx.request.body;
    const sessionToken = query.sessionToken;
    const goodIds = query.goodIds;
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
            if (user) {
              // 删除商品
              deleteGoodModel(user.id, goodIds);
              ctx.status = 200;
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
