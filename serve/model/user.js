import axios from "axios"; // 需先安装 axios：npm install axios
import prisma from "../prisma/index.js";
import { createSession } from "./index.js";
import { parseProduct } from "../util/productParser.js";

const APPID = "111111111";
const MP_KEY = "1111111111";

export const getUserOpenidModel = async (code) => {
  // 校验参数有效性
  if (!code) {
    return Promise.reject(new Error("登录凭证 code 不能为空"));
  }

  // 构造请求参数
  const params = {
    appid: APPID,
    secret: MP_KEY,
    js_code: code,
    grant_type: "authorization_code",
  };

  // 发起 HTTPS 请求
  return axios
    .get("https://api.weixin.qq.com/sns/jscode2session", { params })
    .then((response) => {
      const data = response.data;
      // console.log(data);

      // 处理微信接口返回结果
      if (data.errcode) {
        // 错误码处理（参考微信官方错误码）
        const errorMap = {
          40029: "登录凭证（code）无效",
          45011: "API 调用频率过高，请稍后重试",
          40226: "高风险用户登录拦截",
          "-1": "微信服务器系统繁忙",
        };
        return Promise.reject(
          new Error(errorMap[data.errcode] || `未知错误：${data.errmsg}`)
        );
      }

      // 返回用户模型（可根据业务需求扩展字段）
      return {
        openid: data.openid,
        sessionKey: data.session_key,
        unionid: data.unionid || null, // 非必填字段默认值
        requestTime: new Date().toISOString(), // 添加请求时间戳
      };
    })
    .catch((error) => {
      // 统一处理网络请求异常
      console.error("登录接口调用失败:", error.message);
      return Promise.reject(error);
    });
};

export const userLoginModel = async (openid) => {
  try {
    // 尝试查找用户
    const user = await prisma.user.findUnique({
      where: {
        id: openid, // 直接匹配ID，而不是contains（模糊匹配）
      },
      select: {
        id: true,
        // nickname: true,
        // avatar: true,
        // love: true,
        // goods: true,
        // coupon: true,
        // pay: true,
        // adress: true,
        // Session: true,
      },
    });

    // 如果用户存在，创建会话并且返回用户信息和会话
    if (user) {
      const userData = await createSession(openid, {
        expiresInDays: 99, // 可选，设置会话有效期（默认7天）
      });
      return {
        userData: userData,
      };
    }

    // 如果用户不存在，创建新用户和会话，并且返回
    const newUser = await prisma.user.create({
      data: {
        id: openid,
        // 设置默认值或从其他来源获取初始数据
        nickname: `用户${openid.slice(0, 6)}`,
        avatar: "https://valeo.gllue.com/logo.png?4ecbf857a9", // 默认头像
        phoneVerified: false,
        wechatVerified: true,
        isActive: true,
        role: "user",
      },
      select: {
        id: true,
      },
    });
    const userData = await createSession(openid, {
      expiresInDays: 1, // 可选，设置会话有效期（默认7天）
    });
    return {
      userData: userData,
    };
  } catch (err) {
    console.error("用户登录/创建失败:", err);
    throw err;
  }
};

export const getUserModel = async (sessionToken) => {
  // console.log(sessionToken);
  try {
    const userSession = await prisma.session.findUnique({
      where: {
        token: sessionToken,
      },
      select: {
        userId: true,
        expiresAt: true,
      },
    });

    // 获取用户信息
    const user = await prisma.user.findUnique({
      where: {
        id: userSession.userId,
      },
      select: {
        id: true,
        nickname: true,
        avatar: true,
        phone: true,
        phoneVerified: true,
        wechatOpenId: true,
        wechatUnionId: true,
        wechatVerified: true,
        isActive: true,
        role: true,
        Love: true,
        Goods: {
          include: {
            product: true, // 加载关联的 Product 数据
          },
        },
        coupon: true,
        pay: true,
        adress: true,
      },
    });
    // 检查用户是否存在
    if (!user) {
      // console.log(user, "bucunzai");
      return user;
    } else {
      // 解析商品数据
      user.Goods = user.Goods.map((good) => {
        return {
          ...good,
          product: parseProduct(good.product), // 解析商品数据
          config: JSON.parse(good.config || "{}"), // 解析配置数据
        };
      });

      return user;
    }
  } catch (err) {
    // console.log(err);
    // throw new Error("1111");
    throw err;
  }
};

export const verifySessionExistModel = async (sessionToken) => {
  try {
    const userSession = await prisma.session.findUnique({
      where: {
        token: sessionToken,
      },
      select: {
        userId: true,
        expiresAt: true,
      },
    });
    if (userSession) {
      return true;
    } else {
      false;
    }
  } catch (err) {
    throw err;
  }
};

export const verifySessionExpireModel = async (sessionToken) => {
  try {
    const userSession = await prisma.session.findUnique({
      where: {
        token: sessionToken,
      },
      select: {
        userId: true,
        expiresAt: true,
      },
    });
    const currentTime = new Date();
    if (userSession.expiresAt < currentTime) {
      return true;
    } else false;
  } catch (err) {
    throw err;
  }
};
