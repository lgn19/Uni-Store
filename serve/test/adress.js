import Mock from "mockjs";
import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

const adresses = [];

for (let i = 1; i < 20; i++) {
  const adress = {
    name: Mock.Random.csentence(2 - 3),
    phone: String(Mock.Random.integer(222222, 666666)),
    adressTittle: Mock.Random.csentence(6, 10),
    adressDetail: Mock.Random.csentence(10, 12),
    isDefault: false,
    userId: "123456789",
  };
  adresses.push(adress);
}

async function init() {
  try {
    // 清空 product 表
    // await prisma.adress.deleteMany();
    // console.log("已清空 coupon 表");

    // 插入新数据
    await prisma.adress.createMany({
      data: adresses,
    });
    console.log(`成功插入 ${adresses.length} 条产品数据`);
  } catch (e) {
    console.error("初始化数据失败:", e);
  } finally {
    // 确保关闭数据库连接
    await prisma.$disconnect();
  }
}

init();
