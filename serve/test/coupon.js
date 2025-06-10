import Mock from "mockjs";
import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

const coupons = [];

// 分类
const _classes = [
  "电器",
  "家具",
  "美食",
  "服饰",
  "化妆品",
  "书籍",
  "运动",
  "玩具",
];

const _subClassMap = {
  电器: ["手机", "电脑", "音响", "电视", "冰箱"],
  家具: ["沙发", "床", "桌子", "椅子", "柜子"],
  美食: ["零食", "饮料", "水果", "速食", "调料"],
  服饰: ["男装", "女装", "童装", "鞋子", "配饰"],
  化妆品: ["护肤品", "彩妆", "香水", "洗护用品"],
  书籍: ["小说", "教材", "漫画", "杂志", "工具书"],
  运动: ["健身器材", "运动服", "球类", "户外装备", "瑜伽用品"],
  玩具: ["积木", "模型", "毛绒玩具", "拼图", "电动玩具"],
};
// 图片
const images = [
  "https://img1.baidu.com/it/u=1880839298,1842718586&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=667",
  "https://img1.baidu.com/it/u=174626055,3043910988&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
  "https://img0.baidu.com/it/u=1419027618,2426079086&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
  "https://img1.baidu.com/it/u=54984982,2949808479&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
  "https://img1.baidu.com/it/u=2505883963,2786226110&fm=253&fmt=auto?w=690&h=863",
  "https://img0.baidu.com/it/u=1296627677,2566155924&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500",
  "https://img0.baidu.com/it/u=215930622,1034427858&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=1670",
  "https://img1.baidu.com/it/u=3596756820,977009777&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500",
  "https://img0.baidu.com/it/u=3949595533,2429244559&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500",
  "https://img0.baidu.com/it/u=1157646589,3671446555&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500",
  "https://img1.baidu.com/it/u=2384539767,3836044701&fm=253&fmt=auto&app=138&f=JPEG?w=520&h=433",
  "https://img1.baidu.com/it/u=987118660,1417652156&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
  "https://t15.baidu.com/it/u=1452785255,2174379208&fm=224&app=112&f=JPEG?w=500&h=500",
  "https://img0.baidu.com/it/u=2016227182,2015794324&fm=253&fmt=auto&app=138&f=JPEG?w=520&h=457",
];

for (let i = 1; i < 20; i++) {
  const classes = _classes[Mock.Random.integer(0, 7)];
  const subClass = Mock.Random.pick(_subClassMap[classes]);
  const coupon = {
    classes: classes,
    subClasses: subClass,
    count: Mock.Random.integer(30, 99),
    title: Mock.Random.csentence(4, 10),
    detail: Mock.Random.csentence(10, 5),
    time: new Date(),
    logo: Mock.Random.pick(images),
    userId: "123456789",
  };
  coupons.push(coupon);
}

async function init() {
  try {
    // 清空 product 表
    await prisma.coupon.deleteMany();
    console.log("已清空 coupon 表");

    // 插入新数据
    await prisma.coupon.createMany({
      data: coupons,
    });
    console.log(`成功插入 ${coupons.length} 条产品数据`);
  } catch (e) {
    console.error("初始化数据失败:", e);
  } finally {
    // 确保关闭数据库连接
    await prisma.$disconnect();
  }
}

init();
