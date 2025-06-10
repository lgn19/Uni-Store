const deletGood = async (
  API: string,
  sessionToken: string,
  goodIds: number[]
) => {
  try {
    console.log("开始删除商品", API, sessionToken, typeof goodIds);
    // 使用Promise包装uni.request
    const { data, statusCode } = await new Promise<{
      data: any;
      statusCode: number;
    }>((resolve, reject) => {
      uni.request({
        url: `${API}/good`,
        data: {
          sessionToken: sessionToken,
          goodIds: Object.values(goodIds),
        },
        method: "DELETE",
        success: (res) => {
          //   console.log(res);
          resolve(res as { data: any; statusCode: number });
        },
        fail: (err) => {
          console.log(err);
          reject(err);
        },
      });
    });

    // console.log("请求结果:", data, statusCode);
    // 处理不同状态码
    if (statusCode >= 400 && statusCode < 500) {
      uni.showToast({
        title: `${data.msg}`,
        duration: 2000,
        icon: "error",
      });
      throw new Error(`请求失败: ${data}`);
    } else if (statusCode >= 500 && statusCode < 600) {
      uni.showToast({
        title: `服务器错误${data.msg}`,
        duration: 2000,
        icon: "error",
      });
      throw new Error(`服务器错误: ${data.msg}`);
    } else if (statusCode >= 200 && statusCode < 300) {
      uni.showToast({
        title: "删除成功",
        duration: 2000,
        icon: "success",
      });
      return data.id;
    }
  } catch (error) {
    console.error("删除商品失败:", error);
    throw error;
  }
};

export default deletGood;
