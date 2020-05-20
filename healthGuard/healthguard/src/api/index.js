export function showModal(content) {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: "提示",
      content,
      success(res) {
        if (res.confirm) {
          // 用户点击了确定
          resolve(res, confirm)
        } else if (res.cancel) {
          // 用户点击了取消
          reject()
          return;
        }
      },
    });
  })
}

export function getStorage(key) {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key,
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}