const _product = {
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
  originalRriceMap: {
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

const _myCoupon = [
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

const _myGoods = [
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
    name: "女装",
    children: [
      {
        id: 101,
        name: "A字裙",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper1.png",
      },
      {
        id: 102,
        name: "T恤",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper2.png",
      },
      {
        id: 103,
        name: "半身裙",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper3.png",
      },
      {
        id: 104,
        name: "衬衫",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper1.png",
      },
      {
        id: 105,
        name: "短裙",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper2.png",
      },
      {
        id: 106,
        name: "阔腿裤",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper3.png",
      },
      {
        id: 107,
        name: "连衣裙",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper1.png",
      },
      {
        id: 108,
        name: "妈妈装",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper2.png",
      },
      {
        id: 109,
        name: "牛仔裤",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper3.png",
      },
      {
        id: 110,
        name: "情侣装",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper1.png",
      },
      {
        id: 111,
        name: "休闲裤",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper2.png",
      },
      {
        id: 112,
        name: "雪纺衫",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper3.png",
      },
      {
        id: 113,
        name: "防晒衣",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper1.png",
      },
      {
        id: 114,
        name: "礼服/婚纱",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper2.png",
      },
    ],
  },
  {
    id: 2,
    name: "美食",
    children: [
      {
        id: 201,
        name: "零食",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper1.png",
      },
      {
        id: 202,
        name: "饮料",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper2.png",
      },
    ],
  },
  {
    id: 3,
    name: "美食",
    children: [
      {
        id: 201,
        name: "零食",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper1.png",
      },
      {
        id: 202,
        name: "饮料",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper2.png",
      },
    ],
  },
  {
    id: 4,
    name: "美食",
    children: [
      {
        id: 201,
        name: "零食",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper1.png",
      },
      {
        id: 202,
        name: "饮料",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper2.png",
      },
    ],
  },
  {
    id: 5,
    name: "美食",
    children: [
      {
        id: 201,
        name: "零食",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper1.png",
      },
      {
        id: 202,
        name: "饮料",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper2.png",
      },
    ],
  },
  {
    id: 6,
    name: "美食",
    children: [
      {
        id: 201,
        name: "零食",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper1.png",
      },
      {
        id: 202,
        name: "饮料",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper2.png",
      },
    ],
  },
  {
    id: 7,
    name: "美食",
    children: [
      {
        id: 201,
        name: "零食",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper1.png",
      },
      {
        id: 202,
        name: "饮料",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper2.png",
      },
    ],
  },
  {
    id: 8,
    name: "美食",
    children: [
      {
        id: 201,
        name: "零食",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper1.png",
      },
      {
        id: 202,
        name: "饮料",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper2.png",
      },
    ],
  },
  {
    id: 9,
    name: "美食",
    children: [
      {
        id: 201,
        name: "零食",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper1.png",
      },
      {
        id: 202,
        name: "饮料",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper2.png",
      },
    ],
  },
  {
    id: 10,
    name: "美食",
    children: [
      {
        id: 201,
        name: "零食",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper1.png",
      },
      {
        id: 202,
        name: "饮料",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper2.png",
      },
    ],
  },
  {
    id: 11,
    name: "美食",
    children: [
      {
        id: 201,
        name: "零食",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper1.png",
      },
      {
        id: 202,
        name: "饮料",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper2.png",
      },
    ],
  },
  {
    id: 12,
    name: "美食",
    children: [
      {
        id: 201,
        name: "零食",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper1.png",
      },
      {
        id: 202,
        name: "饮料",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper2.png",
      },
    ],
  },
  {
    id: 13,
    name: "美食",
    children: [
      {
        id: 201,
        name: "零食",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper1.png",
      },
      {
        id: 202,
        name: "饮料",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper2.png",
      },
    ],
  },
  {
    id: 14,
    name: "美食",
    children: [
      {
        id: 201,
        name: "零食",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper1.png",
      },
      {
        id: 202,
        name: "饮料",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper2.png",
      },
    ],
  },
  {
    id: 15,
    name: "美食",
    children: [
      {
        id: 201,
        name: "零食",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper1.png",
      },
      {
        id: 202,
        name: "饮料",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper2.png",
      },
    ],
  },
  {
    id: 16,
    name: "美食",
    children: [
      {
        id: 201,
        name: "零食",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper1.png",
      },
      {
        id: 202,
        name: "饮料",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper2.png",
      },
    ],
  },
  {
    id: 17,
    name: "美食",
    children: [
      {
        id: 201,
        name: "零食",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper1.png",
      },
      {
        id: 202,
        name: "饮料",
        thumb: "https://cdn.uviewui.com/uview/swiper/swiper2.png",
      },
    ],
  },
];
export { _product, _myCoupon, _currentPAy, _myAdress, _myGoods, _myCategories };
