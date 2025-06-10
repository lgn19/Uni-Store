import prisma from "../prisma/index.js";
import { parseProducts, parseProduct } from "../util/productParser.js";
export const getProductsModel = async (
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
) => {
  try {
    const [field, direction] = sortType.split(":");
    return parseProducts(
      await prisma.product.findMany({
        where: {
          title: {
            contains: title,
          },
          place: {
            contains: place,
          },
          classes: {
            contains: classes,
          },
          subClasses: {
            contains: subClasses,
          },
          price: {
            gte: priceMin, // 大于等于 priceMin
            lte: priceMax, // 小于等于 priceMax
          },
          store: {
            gte: store,
          },
          star: {
            gte: star,
          },
        },
        select: {
          id: true,
          title: true,
          price: true,
          originalPrice: true,
          star: true,
          tags: true,
          images: true,
          configs: true, // 返回整个 configs 对象
          priceMap: true,
          originalPriceMap: true,
          enableDiscountMap: true,
          storeMap: true,
          comments: true, // 返回整个 comments 数组
          classes: true,
          subClasses: true,
          store: true,
          buyNum: true,
          place: true,
          label: true,
          detail: true,
        },
        // Offset, equivalent to page number
        skip,
        take: pagesize,
        orderBy: {
          [field]: direction || "desc",
        },
      })
    );
  } catch (err) {
    throw err;
  }
};
export const getProductByIDModel = async (id) => {
  try {
    return parseProduct(
      await prisma.product.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          title: true,
          price: true,
          originalPrice: true,
          star: true,
          tags: true,
          images: true,
          configs: true, // 返回整个 configs 对象
          priceMap: true,
          originalPriceMap: true,
          enableDiscountMap: true,
          storeMap: true,
          comments: true, // 返回整个 comments 数组
          classes: true,
          subClasses: true,
          store: true,
          buyNum: true,
          place: true,
          label: true,
          detail: true,
        },
      })
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
};
