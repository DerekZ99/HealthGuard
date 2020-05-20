export default (imgPaths) => {
  return new Promise((resolve, reject) => {
    let newImgArr = []

    function loop(index) {
      if (index < imgPaths.length) {
        wx.cloud.uploadFile({
          cloudPath: `healthPosterImg/${new Date().getTime()}-${Math.floor(
              Math.random() * 1000
            )}`,
          filePath: imgPaths[index],
          success(res) {
            // 上传头像成功后拿到图片的fileID推进新数组里面
            newImgArr.push(res.fileID);
            index++;
            loop(index);
          },
          fail(err) {
            reject(err)
          },
        });
      } else {
        // 递归上传图片完成
        resolve(newImgArr)
      }
    }
    loop(0);
  })
}