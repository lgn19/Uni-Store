const getProducts = async (
  API: string,
  title?: string,
  sortType?: number,
  pagesize?: number,
  pagenum?: number,
  place?: string,
  priceMin?: number,
  priceMax?: number,
  store?: number,
  star?: number,
  classes?: string,
  subClasses?: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${API}/product`, // 请求地址
      method: "GET", // 请求方法
      data: {
        title: title,
        sortType: sortType,
        pagesize: pagesize,
        pagenum: pagenum,
        place: place,
        priceMin: priceMin,
        priceMax: priceMax,
        store: store,
        star: star,
        classes: classes,
        subClasses: subClasses,
      },
      success: (res) => {
        resolve(res.data);
      },
      fail: (err) => {
        console.error("搜索请求失败：", err);
        reject(err);
      },
    });
  });
};
export default getProducts;

// 使用方法
//   getProducts(
//     API,
//     inputValue ? inputValue.value.trim() : "",
//     sortType.value,
//     pagesize.value,
//     pagenum.value,
//     _place == undefined ? "" : _place.trim(),
//     _priceMin,
//     _priceMax,
//     _store,
//     _star,
//     _classes ? _classes.trim() : "",
//     _subClasses ? _subClasses.trim() : ""
//   )
//     .then((prodects) => {
//       product.value = prodects;
//     })
//     .catch((err) => {
//       uni.showToast({ title: "获取商品列表失败", icon: "none" });
//     });
