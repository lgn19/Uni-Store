const getProductById = async (
  API: string,
  sessionToken: string,
  payId: string
): Promise<any> => {
  console.log(payId);
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${API}/pay`, // 请求地址
      method: "GET", // 请求方法
      data: {
        sessionToken: sessionToken,
        payId: payId,
      },
      success: (res) => {
        resolve(res.data);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};

export default getProductById;
