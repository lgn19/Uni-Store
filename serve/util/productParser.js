/**
 * 解析从数据库获取的产品数据，将JSON序列化的字段还原为原始数据类型
 * @param data 从数据库获取的原始数据
 * @returns 解析后的产品对象
 */
export function parseProduct(data) {
  // 创建一个新对象来存储解析后的数据
  const parsedProduct = { ...data };

  // 解析数组类型字段
  if (typeof data.tags === "string") {
    parsedProduct.tags = JSON.parse(data.tags);
  }

  if (typeof data.label === "string") {
    parsedProduct.label = JSON.parse(data.label);
  }

  if (typeof data.images === "string") {
    parsedProduct.images = JSON.parse(data.images);
  }

  // 解析嵌套数组类型字段
  if (typeof data.configs === "string") {
    parsedProduct.configs = JSON.parse(data.configs);
  }

  // 解析对象映射类型字段
  if (typeof data.priceMap === "string") {
    parsedProduct.priceMap = JSON.parse(data.priceMap);
  }

  if (typeof data.originalPriceMap === "string" && data.originalPriceMap) {
    parsedProduct.originalPriceMap = JSON.parse(data.originalPriceMap);
  }

  if (typeof data.enableDiscountMap === "string") {
    parsedProduct.enableDiscountMap = JSON.parse(data.enableDiscountMap);
  }

  if (typeof data.storeMap === "string") {
    parsedProduct.storeMap = JSON.parse(data.storeMap);
  }

  // 解析评论数组
  if (typeof data.comments === "string") {
    parsedProduct.comments = JSON.parse(data.comments);
  }

  return parsedProduct;
}

/**
 * 批量解析产品数组
 * @param products 从数据库获取的产品数组
 * @returns 解析后的产品数组
 */
export function parseProducts(products) {
  return products.map(parseProduct);
}
