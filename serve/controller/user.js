import {
  getUserOpenidModel,
  userLoginModel,
  getUserModel,
  verifySessionExistModel,
  verifySessionExpireModel,
} from "../model/index.js";

export const getUserOpenid = async (ctx) => {
  try {
    const query = ctx.query;
    const code = query.code || "";
    try {
      ctx.body = await getUserOpenidModel(code);
    } catch (err) {
      throw err;
    }
  } catch (err) {
    throw err;
  }
};

export const userLogin = async (ctx) => {
  try {
    const query = ctx.query;
    const openid = query.openid || "";
    try {
      ctx.body = await userLoginModel(openid);
    } catch (err) {
      throw err;
    }
  } catch (err) {
    throw err;
  }
};

export const getUser = async (ctx) => {
  // console.log(ctx.query);
  try {
    const query = ctx.query;
    const sessionToken = query.sessionToken || "";
    try {
      if (sessionToken == "") {
        ctx.status = 400;
        ctx.body = "请先登陆";
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
              ctx.body = user;
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
