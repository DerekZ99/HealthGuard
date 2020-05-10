<template>
  <view class="jobWanted">
    <view class="form-title">{{formTitle}}</view>

    <form @submit="formSubmit" class="job-form">
      <view class="form-item">
        <view class="item-title">姓名：</view>
        <input type="text" placeholder="请输入您的姓名" name="posterName" />
      </view>

      <view class="form-item">
        <view class="item-title">联系方式：</view>
        <input type="text" placeholder="请输入您的手机号码" name="phone" />
      </view>

      <view class="form-item">
        <view class="item-title">工作经历：</view>
        <textarea minlength="-1" type="text" placeholder="请输入您的工作经历" name="experience" />
      </view>

      <view class="form-item">
        <view class="item-title">可提供的服务：</view>
        <textarea minlength="-1" type="text" placeholder="请输入您可提供的服务" name="service" />
      </view>

      <view class="img">
        <view class="item-title">
          个人照片：
          <span class="imgInfo">请上传真实的个人照片</span>
          <view class="imgBox">
            <view class="imgShow">
              <img mode="widthFix" :src="imgFilePath" alt />
            </view>
            <button @click="handleChooseImg" class="chooseImg">选择图片</button>
          </view>
        </view>
      </view>

      <view class="btns">
        <!-- 提交按钮 -->
        <button type="primary" class="sumbitBtn" form-type="submit">提交</button>
      </view>
    </form>
  </view>
</template>

<script>
export default {
  data() {
    return {
      formTitle: "",
      imgFilePath:
        "cloud://tryout-edov9.7472-tryout-edov9-1302058975/imgHolder.jpg"
    };
  },
  onLoad(options) {
    this.formTitle =
      options.id === "long" ? "发布长期求职信息" : "发布短期求职信息";
  },
  methods: {
    formSubmit(e) {
      let that = this;
      // console.log(e);
      wx.cloud.uploadFile({
        cloudPath: "posterImg/text",
        filePath: that.imgFilePath,
        success(res) {
          console.log("图片被上传到了云存储中");
        },
        fail(err) {
          console.log(err + "上传失败");
        }
      });
    },
    handleChooseImg() {
      let that = this;
      wx.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success(res) {
          that.imgFilePath = res.tempFilePaths[0];
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.form-title {
  color: #000;
  font-weight: 600;
  font-size: 40rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30rpx 0;
}
.job-form {
  .form-item {
    padding: 20rpx;
    border-top: 3rpx solid #ccc;
    display: flex;
    font-size: 30rpx;

    .item-title {
      font-weight: 500;
    }
    textarea {
      height: 140rpx;
    }
  }
  .img {
    padding: 20rpx;
    border-top: 3rpx solid #ccc;
    font-size: 30rpx;

    .imgBox {
      .imgShow {
        margin: 20rpx auto;
        height: 240rpx;
        width: 240rpx;
        overflow: hidden;
        border: 3rpx solid #cccccc;

        img {
          width: 100%;
        }
      }

      .chooseImg {
        width: 60vw;
        margin: 0 auto;
      }
    }
  }

  .btns {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    padding: 40rpx 0;
    .sumbitBtn {
      width: 60vw;
      margin: 0 auto;
    }
  }
}
</style>