const getUser = async (API: string, sessionToken: string) => {
  try {
    // 使用Promise包装uni.request
    const { data, statusCode } = await new Promise<{
      data: any;
      statusCode: number;
    }>((resolve, reject) => {
      uni.request({
        url: `${API}/user`,
        method: "GET",
        data: { sessionToken: sessionToken },
        success: (res) => {
          // console.log(res);
          resolve(res as { data: any; statusCode: number });
        },
        fail: (err) => {
          reject(err);
        },
      });
    });

    // 处理不同状态码
    if (statusCode >= 400 && statusCode < 500) {
      // uni.showToast({
      //   title: `${data}`,
      //   duration: 2000,
      //   icon: "error",
      // });
      throw new Error(`请求失败: ${data}`);
    } else if (statusCode >= 500 && statusCode < 600) {
      // uni.showToast({
      //   title: `服务器内部错误${data.msg}`,
      //   duration: 2000,
      //   icon: "error",
      // });
      throw new Error(`服务器错误: ${data.msg}`);
    } else if (statusCode >= 200 && statusCode < 300) {
      return data;
    }
  } catch (error) {
    // console.error("获取用户信息失败:", error);
    throw error; // 将错误继续抛出，让调用者处理
  }
};

export default getUser;
