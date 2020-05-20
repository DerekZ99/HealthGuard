export default (count) => {

  uni.showLoading({
    title: "加载中"
  })

  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        resolve(res)
      },
      fail(err) {
        uni.showToast({
          title: "图片选择失败，请检查网络"
        })
        reject(err)
      },
      complete() {
        uni.showToast({
          title: "图片选择成功！",
          icon: "success"
        })
      }
    })
  })
}