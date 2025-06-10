import { getProductsModel, getProductByIDModel } from "../model/index.js";

// place: ifPlace.value ? region.value : "",
// priceMin: ifPrice.value ? priceMin.value : 0,
// priceMax: ifPrice.value ? priceMax.value : 999999,
// store: ifStore.value ? (list.value[current.value] == "有库存" ? 1 : 0) : 0,
// star: ifStar.value ? star.value : 0,
// classes: ifClass.value ? classes.value[0] : "",
// subClasses: ifClass.value ? classes.value[1] : "",

const sortTypeMap = {
  1: "price:asc", // 数字 1 表示按价格升序
  2: "price:desc", // 数字 2 表示按价格降序
  3: "store:desc", // 数字 3 综合排序
  4: "buyNum:desc", // 数字 4 表示按销量优先
  6: "star:desc", // 数字 6 表示按好评优先
};
export const getProducts = async (ctx) => {
  try {
    const query = ctx.query;
    // console.log(query);
    const title = query.title || "";
    const place = query.place || "";
    const classes = query.classes || "";
    const subClasses = query.subClasses || "";
    const priceMin = Math.abs(Number(query.priceMin)) || 0;
    const priceMax = Math.abs(Number(query.priceMax)) || 9999;
    const store = Math.abs(Number(query.store)) || 0;
    const star = Math.abs(Number(query.star)) || 0;
    const pagenum = Math.abs(Number(query.pagenum)) || 1;
    const pagesize = Math.abs(Number(query.pagesize)) || 10;
    const skip = (pagenum - 1) * pagesize;
    const sortType = sortTypeMap[Number(query.sortType)] || "price:asc";
    try {
      ctx.body = await getProductsModel(
        title,
        place,
        classes,
        subClasses,
        priceMin,
        priceMax,
        store,
        star,
        sortType,
        skip,
        pagesize
      );
    } catch (err) {
      throw err;
    }
  } catch (err) {
    throw err;
  }
};

export const getProductById = async (ctx) => {
  try {
    const query = ctx.query;
    // console.log(query);
    const id = Number(query.id) || 1;
    try {
      ctx.body = await getProductByIDModel(id);
    } catch (err) {
      throw err;
    }
  } catch (err) {
    throw err;
  }
};
