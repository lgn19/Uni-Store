import { randomBytes } from "crypto";
import prisma from "../prisma/index.js";

/**
 * 创建用户会话
 * @param {number} userId - 用户ID
 * @param {object} [options] - 可选参数
 * @param {string} [options.device] - 设备信息
 * @param {string} [options.ip] - IP地址
 * @param {number} [options.expiresInDays=7] - 会话过期天数
 * @returns {Promise<Session>} 创建的会话对象
 */
export const createSession = async (userId, options = {}) => {
  try {
    // 使用crypto模块生成唯一会话令牌
    const token = randomBytes(32).toString("hex");

    // 计算过期时间
    const expiresInDays = options.expiresInDays || 99;
    const expiresAt = new Date(
      Date.now() + expiresInDays * 24 * 60 * 60 * 1000
    );

    // 创建新会话
    const userData = await prisma.session.create({
      data: {
        userId,
        token,
        device: options.device || null,
        ip: options.ip || null,
        expiresAt,
      },
      select: {
        token: true,
        user: {
          select: {
            // 只选择 user 中需要的字段
            id: true,
            nickname: true,
            avatar: true,
            Love: true,
            Goods: true,
            coupon: true,
            pay: true,
            adress: true,
            // ...其他需要的字段
          },
        },
      },
    });

    return userData;
  } catch (error) {
    console.error("创建会话失败:", error);
    // throw new Error("服务器错误，创建会话失败");
  }
};

/**
 * 验证并刷新会话
 * @param {string} token - 会话令牌
 * @param {number} [expiresInDays=7] - 延长的过期天数
 * @returns {Promise<Session | null>} 刷新后的会话对象，如果令牌无效则返回null
 */
export const refreshSession = async (token, expiresInDays = 7) => {
  try {
    // 查找现有会话
    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true },
    });

    // 如果会话不存在或已过期，返回null
    if (!session || session.expiresAt < new Date()) {
      return null;
    }

    // 刷新会话过期时间
    const updatedSession = await prisma.session.update({
      where: { token },
      data: {
        expiresAt: new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000),
      },
      include: { user: true },
    });

    return updatedSession;
  } catch (error) {
    console.error("刷新会话失败:", error);
    throw new Error("无法刷新用户会话");
  }
};

/**
 * 销毁会话（登出）
 * @param {string} token - 会话令牌
 * @returns {Promise<boolean>} 是否成功销毁会话
 */
export const destroySession = async (token) => {
  try {
    await prisma.session.delete({
      where: { token },
    });
    return true;
  } catch (error) {
    console.error("销毁会话失败:", error);
    return false;
  }
};
