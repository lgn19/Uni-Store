const getProductById = async (API: string, id: number): Promise<any> => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${API}/product/id`, // 请求地址
      method: "GET", // 请求方法
      data: {
        id: id,
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

export default getProductById;
