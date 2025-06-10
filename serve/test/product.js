import Mock from "mockjs";
import { PrismaClient } from "../generated/prisma/index.js";

// 根据configs生成所有Map
function generatePriceMap(configs) {
  console.log(configs);
  const priceMap = {};
  const originalRriceMap = {};
  const storeMap = {};
  const enableDiscountMap = {};

  // 提取所有配置选项（扁平化）
  const options = configs.flatMap((c) => c.config);
  // 生成所有可能的组合（笛卡尔积）
  function generateCombinations(current = [], index = 0) {
    if (index === configs.length) {
      // 生成组合键（如 "128GB-黑色"）
      const key = current.join("-");
      // 价格默认为固定值
      priceMap[key] = Mock.Random.integer(300, 50000);
      originalRriceMap[key] = Mock.Random.integer(300, 50000);
      storeMap[key] = Mock.Random.integer(300, 50000);
      enableDiscountMap[key] = true;
      console.log(enableDiscountMap[key]);
      return;
    }
    // 递归生成组合
    configs[index].config.forEach((option) => {
      generateCombinations([...current, option], index + 1);
    });
  }
  // 开始生成
  generateCombinations();

  return { priceMap, originalRriceMap, storeMap, enableDiscountMap };
}

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

const products = [];
for (let i = 0; i < 100; i++) {
  // 生成大类
  const classes = _classes[Mock.Random.integer(0, 7)];
  const subClass = Mock.Random.pick(_subClassMap[classes]);

  // 生成配置
  const configLength = Mock.Random.integer(1, 4);
  const configs = [];
  for (let j = 0; j < configLength; j++) {
    configs.push({
      id: j + 1,
      name: Mock.Random.pick(["颜色", "内存", "材质", "款式"]),
      config: Mock.Random.pick(
        ["配置1", "配置2", "配置3", "配置4", "配置5", "配置6"],
        Mock.Random.integer(2, 4)
      ),
    });
  }
  //   生成map
  const { priceMap, originalRriceMap, storeMap, enableDiscountMap } =
    generatePriceMap(configs);

  const price = Mock.Random.float(100, 5000, 2, 2);
  const product = {
    title: Mock.Random.csentence(3, 8),
    price: price,
    originalPrice: Mock.Random.float(price + 50, price + 200, 2, 2),
    star: Mock.Random.float(0, 5, 1, 1),
    label: JSON.stringify(Mock.Random.pick(["热销", "新品", "折扣"])),
    place: Mock.Random.province() + Mock.Random.city() + Mock.Random.region(),
    store: Mock.Random.integer(100, 100000),
    tags: JSON.stringify(
      Mock.Random.pick(
        ["无理由退货", "超1w人购买", "促销", "人人都说好", "618", "绿色环保"],
        3
      ),
      null
    ),
    images: JSON.stringify(Mock.Random.pick(images, 3)),
    priceMap: JSON.stringify(priceMap),
    originalPriceMap: JSON.stringify(originalRriceMap),
    storeMap: JSON.stringify(storeMap),
    enableDiscountMap: JSON.stringify(enableDiscountMap),
    configs: JSON.stringify(configs),
    comments: JSON.stringify(
      Mock.mock({
        "list|8": [
          {
            "user|1": ["张三", "李四"],
            "content|1": ["非常好用，值得购买！", "性价比很高，推荐！"],
            "star|1-5": 1, // 评分在1-5之间随机生成
          },
        ],
      }).list
    ),
    otherComment: JSON.stringify(Mock.Random.pick([1, 2, 34, 5, 6, 7, 8], 3)),
    buyNum: Mock.Random.integer(3, 999),
    detail: Mock.Random.csentence(20, 40),
    classes: classes,
    subClasses: subClass,
  };

  products.push(product);
}

// console.log(products[0]);
const prisma = new PrismaClient();

async function init() {
  try {
    // 清空 product 表
    await prisma.product.deleteMany();
    console.log("已清空 product 表");

    // 插入新数据
    await prisma.product.createMany({
      data: products,
    });
    console.log(`成功插入 ${products.length} 条产品数据`);
  } catch (e) {
    console.error("初始化数据失败:", e);
  } finally {
    // 确保关闭数据库连接
    await prisma.$disconnect();
  }
}

init();
