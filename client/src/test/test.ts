import type Product from "../dataForm/Product";
const _product: Product = {
  label: "热销",
  detail: "这是细节这是细节这是细节这是细节",
  id: 1,
  title: "高端智能手机",
  price: 5999,
  originalPrice: 6999,
  star: 4.5,
  tags: ["优惠", "可退换", "热销"],
  images: [
    "https://fastly.picsum.photos/id/384/375/150.jpg?hmac=lIKuGGAI5r2IRXNx6qobUYxoUSW3HR4-W4fXdI07LM4",
    "https://fastly.picsum.photos/id/384/375/150.jpg?hmac=lIKuGGAI5r2IRXNx6qobUYxoUSW3HR4-W4fXdI07LM4",
    "https://fastly.picsum.photos/id/384/375/150.jpg?hmac=lIKuGGAI5r2IRXNx6qobUYxoUSW3HR4-W4fXdI07LM4",
  ],
  configs: [
    {
      id: 1,
      name: "内存",
      config: ["128GB", "256GB", "512GB"],
    },
    {
      id: 2,
      name: "颜色",
      config: ["黑色", "白色", "蓝色"],
    },
  ],
  priceMap: {
    "128GB-黑色": 5999,
    "128GB-白色": 6099,
    "128GB-蓝色": 6199,
    "256GB-黑色": 6499,
    "256GB-白色": 6599,
    "256GB-蓝色": 6699,
    "512GB-黑色": 6999,
    "512GB-白色": 7099,
    "512GB-蓝色": 7199,
  },
  originalPriceMap: {
    "128GB-黑色": 15999,
    "128GB-白色": 16099,
    "128GB-蓝色": 16199,
    "256GB-黑色": 16499,
    "256GB-白色": 16599,
    "256GB-蓝色": 16699,
    "512GB-黑色": 16999,
    "512GB-白色": 17099,
    "512GB-蓝色": 17199,
  },
  enableDiscountMap: {
    "128GB-黑色": true,
    "128GB-白色": true,
    "128GB-蓝色": true,
    "256GB-黑色": true,
    "256GB-白色": true,
    "256GB-蓝色": false,
    "512GB-黑色": false,
    "512GB-白色": false,
    "512GB-蓝色": false,
  },
  // ifStoreMap: {
  //   "128GB-黑色": true,
  //   "128GB-白色": true,
  //   "128GB-蓝色": false,
  //   "256GB-黑色": true,
  //   "256GB-白色": false,
  //   "256GB-蓝色": false,
  //   "512GB-黑色": false,
  //   "512GB-白色": true,
  //   "512GB-蓝色": false,
  // },
  storeMap: {
    "128GB-黑色": 0,
    "128GB-白色": 0,
    "128GB-蓝色": 0,
    "256GB-黑色": 0,
    "256GB-白色": 0,
    "256GB-蓝色": 123,
    "512GB-黑色": 0,
    "512GB-白色": 534635,
    "512GB-蓝色": 6456,
  },
  comments: [
    { user: "张三", content: "非常好用，值得购买！", star: 4 },
    { user: "李四", content: "性价比很高，推荐！", star: 4 },
    { user: "张三", content: "非常好用，值得购买！", star: 4 },
    { user: "李四", content: "性价比很高，推荐！", star: 4 },
    { user: "张三", content: "非常好用，值得购买！", star: 4 },
    { user: "李四", content: "性价比很高，推荐！", star: 4 },
    { user: "张三", content: "非常好用，值得购买！", star: 4 },
    { user: "李四", content: "性价比很高，推荐！", star: 4 },
  ],
  classes: "电子产品",
  subClasses: "手机",
  place: "南宁",
  buyNum: 10000,
  store: 99999,
};

import type Coupon from "../dataForm/Coupon";
import type Goods from "../dataForm/Goods";
const _myCoupon: Coupon[] = [
  {
    id: 2131,
    classes: "电子产品",
    subClasses: "手机",
    enableId: [0, 9],
    count: 99,
    title: "这是标题1",
    detail: "这是内容1",
    time: "2025",
    logo: "https://photokit.com/img/logo.svg",
  },
  {
    id: 2132,
    classes: "电子产品",
    subClasses: "手机",
    enableId: [0, 9],
    count: 29,
    title: "这是标题2",
    detail: "这是内容2",
    time: "2025",
    logo: "https://photokit.com/img/logo.svg",
  },
  {
    id: 2133,
    classes: "电子产品",
    subClasses: "手机",
    enableId: [0, 9],
    count: 29,
    title: "这是标题2",
    detail: "这是内容2",
    time: "2025",
    logo: "https://photokit.com/img/logo.svg",
  },
  {
    id: 2134,
    classes: "电子产品",
    subClasses: "手机",
    enableId: [0, 9],
    count: 29,
    title: "这是标题2",
    detail: "这是内容2",
    time: "2025",
    logo: "https://photokit.com/img/logo.svg",
  },
  {
    id: 2135,
    classes: "电子产品",
    subClasses: "手机",
    enableId: [0, 9],
    count: 29,
    title: "这是标题2",
    detail: "这是内容2",
    time: "2025",
    logo: "https://photokit.com/img/logo.svg",
  },
  {
    id: 1111,
    classes: "电子产品",
    subClasses: "手机",
    enableId: [0, 9],
    count: 39,
    title: "这是标题2",
    detail: "这是内容2",
    time: "2025",
    logo: "https://photokit.com/img/logo.svg",
  },
  {
    id: 22,
    classes: "电子产品",
    subClasses: "手机",
    enableId: [0, 9],
    count: 39,
    title: "这是标题2",
    detail: "这是内容2",
    time: "2025",
    logo: "https://photokit.com/img/logo.svg",
  },
];
const _currentPAy = [
  {
    id: 1,
    product: _product,
    config: {
      1: "128GB",
      2: "黑色",
    },
    num: 2,
    coupon: [],
  },
  {
    id: 2,
    product: _product,
    config: {
      1: "128GB",
      2: "蓝色",
    },
    num: 6,
    coupon: [],
  },
  {
    id: 4,
    product: _product,
    config: {
      1: "128GB",
      2: "蓝色",
    },
    num: 6,
    coupon: [],
  },
  {
    id: 5,
    product: _product,
    config: {
      1: "128GB",
      2: "蓝色",
    },
    num: 6,
    coupon: [],
  },
];

const _myAdress = [
  {
    id: 1,
    name: "li",
    phone: 1231241414,
    adressTittle: "nnnnnnnnnnnn",
    adressDetail: "llllllllllll",
    default: false,
  },
  {
    id: 2,
    name: "ni",
    phone: 1231241414,
    adressTittle: "nnnnnnnnnnnn",
    adressDetail: "llllllllllll",
    default: false,
  },
  ,
  {
    id: 3,
    name: "ni",
    phone: 1231241414,
    adressTittle: "nnnnnnnnnnnn",
    adressDetail: "llllllllllll",
    default: true,
  },
  {
    id: 4,
    name: "ni",
    phone: 1231241414,
    adressTittle: "nnnnnnnnnnnn",
    adressDetail: "llllllllllll",
    default: false,
  },
  {
    id: 6,
    name: "li",
    phone: 1231241414,
    adressTittle: "nnnnnnnnnnnn",
    adressDetail: "llllllllllll",
    default: false,
  },
  {
    id: 7,
    name: "li",
    phone: 1231241414,
    adressTittle: "nnnnnnnnnnnn",
    adressDetail: "llllllllllll",
    default: false,
  },
  {
    id: 8,
    name: "li",
    phone: 1231241414,
    adressTittle: "nnnnnnnnnnnn",
    adressDetail: "llllllllllll",
    default: false,
  },
];

const _myGoods: Goods[] = [
  {
    id: 1,
    product: _product,
    config: {
      1: "128GB",
      2: "黑色",
    },
    num: 2,
  },
  {
    id: 2,
    product: _product,
    config: {
      1: "128GB",
      2: "蓝色",
    },
    num: 6,
  },
  {
    id: 4,
    product: _product,
    config: {
      1: "128GB",
      2: "蓝色",
    },
    num: 6,
  },
  {
    id: 5,
    product: _product,
    config: {
      1: "128GB",
      2: "蓝色",
    },
    num: 6,
  },
];

const _myCategories = [
  {
    id: 1,
    name: "电器",
    children: [
      {
        id: 101,
        name: "手机",
        thumb:
          "https://img2.baidu.com/it/u=1639281782,4094036984&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=636://cdn.uviewui.com/uview/swiper/swiper1.png",
      },
      {
        id: 102,
        name: "电脑",
        thumb:
          "https://img2.baidu.com/it/u=145594982,215740434&fm=253&fmt=auto&app=138&f=PNG?w=500&h=500://cdn.uviewui.com/uview/swiper/swiper2.png",
      },
      {
        id: 103,
        name: "音响",
        thumb:
          "https://img1.baidu.com/it/u=2436505290,3974882275&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=974://cdn.uviewui.com/uview/swiper/swiper3.png",
      },
      {
        id: 104,
        name: "电视",
        thumb:
          "https://img1.baidu.com/it/u=2065162801,1416194370&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800://cdn.uviewui.com/uview/swiper/swiper1.png",
      },
      {
        id: 105,
        name: "冰箱",
        thumb:
          "https://img1.baidu.com/it/u=2351759748,3690877285&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800://cdn.uviewui.com/uview/swiper/swiper2.png",
      },
    ],
  },
  {
    id: 2,
    name: "家具",
    children: [
      {
        id: 201,
        name: "沙发",
        thumb:
          "https://img2.baidu.com/it/u=3476649340,2071985581&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=858://cdn.uviewui.com/uview/swiper/swiper1.png",
      },
      {
        id: 202,
        name: "床",
        thumb:
          "https://img2.baidu.com/it/u=1800027620,1783651252&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1421://cdn.uviewui.com/uview/swiper/swiper2.png",
      },
      {
        id: 203,
        name: "桌子",
        thumb:
          "https://img2.baidu.com/it/u=2641072038,415510750&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500://cdn.uviewui.com/uview/swiper/swiper3.png",
      },
      {
        id: 204,
        name: "椅子",
        thumb:
          "https://img0.baidu.com/it/u=2422871468,519882525&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=1200://cdn.uviewui.com/uview/swiper/swiper1.png",
      },
      {
        id: 205,
        name: "柜子",
        thumb:
          "https://img1.baidu.com/it/u=980236357,1836386914&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=586://cdn.uviewui.com/uview/swiper/swiper2.png",
      },
    ],
  },
  {
    id: 3,
    name: "美食",
    children: [
      {
        id: 301,
        name: "零食",
        thumb:
          "https://img2.baidu.com/it/u=167573374,3050946179&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500://cdn.uviewui.com/uview/swiper/swiper1.png",
      },
      {
        id: 302,
        name: "饮料",
        thumb:
          "https://img1.baidu.com/it/u=17467342,1275000944&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500://cdn.uviewui.com/uview/swiper/swiper2.png",
      },
      {
        id: 303,
        name: "水果",
        thumb:
          "https://img2.baidu.com/it/u=3318505799,610194106&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=1084://cdn.uviewui.com/uview/swiper/swiper3.png",
      },
      {
        id: 304,
        name: "速食",
        thumb:
          "https://img0.baidu.com/it/u=255840998,1927062651&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=622://cdn.uviewui.com/uview/swiper/swiper1.png",
      },
      {
        id: 305,
        name: "调料",
        thumb:
          "https://img1.baidu.com/it/u=1440339484,309908790&fm=253&fmt=auto&app=120&f=JPEG?w=595&h=500://cdn.uviewui.com/uview/swiper/swiper2.png",
      },
    ],
  },
  {
    id: 4,
    name: "服饰",
    children: [
      {
        id: 401,
        name: "男装",
        thumb:
          "https://img1.baidu.com/it/u=2863460275,4029695952&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1199://cdn.uviewui.com/uview/swiper/swiper1.png",
      },
      {
        id: 402,
        name: "女装",
        thumb:
          "https://img1.baidu.com/it/u=1198881593,968109438&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=750://cdn.uviewui.com/uview/swiper/swiper2.png",
      },
      {
        id: 403,
        name: "童装",
        thumb:
          "https://img2.baidu.com/it/u=2081571664,3672791012&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=774://cdn.uviewui.com/uview/swiper/swiper3.png",
      },
      {
        id: 404,
        name: "鞋子",
        thumb:
          "https://img1.baidu.com/it/u=210399728,1004431273&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500://cdn.uviewui.com/uview/swiper/swiper1.png",
      },
      {
        id: 405,
        name: "配饰",
        thumb:
          "https://img0.baidu.com/it/u=3888607292,3084329361&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=667://cdn.uviewui.com/uview/swiper/swiper2.png",
      },
    ],
  },
  {
    id: 5,
    name: "化妆品",
    children: [
      {
        id: 501,
        name: "护肤品",
        thumb:
          "https://img2.baidu.com/it/u=56810097,4247290969&fm=253&fmt=auto&app=120&f=JPEG?w=569&h=500://cdn.uviewui.com/uview/swiper/swiper1.png",
      },
      {
        id: 502,
        name: "彩妆",
        thumb:
          "https://img1.baidu.com/it/u=4205538247,3082254003&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00030-2300.jpg://cdn.uviewui.com/uview/swiper/swiper2.png",
      },
      {
        id: 503,
        name: "香水",
        thumb:
          "https://img0.baidu.com/it/u=1230677276,1297319889&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=667://cdn.uviewui.com/uview/swiper/swiper3.png",
      },
      {
        id: 504,
        name: "洗护用品",
        thumb:
          "https://img0.baidu.com/it/u=2668981194,648363240&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1200://cdn.uviewui.com/uview/swiper/swiper1.png",
      },
    ],
  },
  {
    id: 6,
    name: "书籍",
    children: [
      {
        id: 601,
        name: "小说",
        thumb:
          "https://img2.baidu.com/it/u=3129802749,420499263&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=640://cdn.uviewui.com/uview/swiper/swiper1.png",
      },
      {
        id: 602,
        name: "教材",
        thumb:
          "https://img2.baidu.com/it/u=608331706,1123197370&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=666://cdn.uviewui.com/uview/swiper/swiper2.png",
      },
      {
        id: 603,
        name: "漫画",
        thumb:
          "https://img0.baidu.com/it/u=4129535017,3768730275&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500://cdn.uviewui.com/uview/swiper/swiper3.png",
      },
      {
        id: 604,
        name: "杂志",
        thumb:
          "https://img2.baidu.com/it/u=765219382,1205406191&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=667://cdn.uviewui.com/uview/swiper/swiper1.png",
      },
      {
        id: 605,
        name: "工具书",
        thumb:
          "https://img2.baidu.com/it/u=1966392293,1707043768&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=667://cdn.uviewui.com/uview/swiper/swiper2.png",
      },
    ],
  },
  {
    id: 7,
    name: "运动",
    children: [
      {
        id: 701,
        name: "健身器材",
        thumb:
          "https://img2.baidu.com/it/u=1578483276,618729475&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1067://cdn.uviewui.com/uview/swiper/swiper1.png",
      },
      {
        id: 702,
        name: "运动服",
        thumb:
          "https://img0.baidu.com/it/u=2334439547,4170658894&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750://cdn.uviewui.com/uview/swiper/swiper2.png",
      },
      {
        id: 703,
        name: "球类",
        thumb:
          "https://img1.baidu.com/it/u=1575970689,1547021481&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500://cdn.uviewui.com/uview/swiper/swiper3.png",
      },
      {
        id: 704,
        name: "户外装备",
        thumb:
          "https://img1.baidu.com/it/u=2506741593,2658847287&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=539://cdn.uviewui.com/uview/swiper/swiper1.png",
      },
      {
        id: 705,
        name: "瑜伽用品",
        thumb:
          "https://img2.baidu.com/it/u=296954882,3267604233&fm=253&fmt=auto&app=138&f=JPEG?w=688&h=500://cdn.uviewui.com/uview/swiper/swiper2.png",
      },
    ],
  },
  {
    id: 8,
    name: "玩具",
    children: [
      {
        id: 801,
        name: "积木",
        thumb:
          "https://img2.baidu.com/it/u=2264389966,3825265984&fm=253&fmt=auto&app=138&f=JPEG?w=553&h=500://cdn.uviewui.com/uview/swiper/swiper1.png",
      },
      {
        id: 802,
        name: "模型",
        thumb:
          "https://img0.baidu.com/it/u=1860094465,4249234852&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1186://cdn.uviewui.com/uview/swiper/swiper2.png",
      },
      {
        id: 803,
        name: "毛绒玩具",
        thumb:
          "https://img0.baidu.com/it/u=1184512000,1042652994&fm=253&fmt=auto&app=138&f=JPEG?w=342&h=342://cdn.uviewui.com/uview/swiper/swiper3.png",
      },
      {
        id: 804,
        name: "拼图",
        thumb:
          "https://img0.baidu.com/it/u=1398683959,895633011&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=667://cdn.uviewui.com/uview/swiper/swiper1.png",
      },
      {
        id: 805,
        name: "电动玩具",
        thumb:
          "https://img2.baidu.com/it/u=3496094202,3130902480&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500://cdn.uviewui.com/uview/swiper/swiper2.png",
      },
    ],
  },
];

export { _product, _myCoupon, _currentPAy, _myAdress, _myGoods, _myCategories };
