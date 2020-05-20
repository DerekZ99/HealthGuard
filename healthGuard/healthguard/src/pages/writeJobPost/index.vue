<template>
  <view class="jobWanted">
    <view class="form-title">{{formTitle}}</view>

    <form @submit="formSubmit" class="job-form">
      <view class="form-item">
        <view class="item-title">姓名：</view>
        <view class="input-wrap">
          <input
            type="text"
            placeholder="请输入您的姓名"
            name="posterName"
            v-model="textValue1"
            @blur="checkVal(textValue1,'posterName')"
            :class="{warning:!isNameOk}"
          />
          <!-- 警告信息 -->
          <view class="warning-text" v-show="!isNameOk">请不要包含数字，空格或符号</view>
          <!-- 警告信息 -->
        </view>
      </view>

      <view class="form-item">
        <view class="item-title">联系方式：</view>
        <view class="input-wrap">
          <input
            type="number"
            placeholder="请输入您的手机号码"
            name="phone"
            v-model="textValue2"
            @blur="checkVal(textValue2,'phone')"
            :class="{warning:!isPhoneOk}"
          />
          <!-- 警告信息 -->
          <view class="warning-text" v-show="!isPhoneOk">请输入正确的手机号码</view>
          <!-- 警告信息 -->
        </view>
      </view>

      <view class="form-item">
        <view class="item-title">工作经历：</view>
        <textarea minlength="-1" type="text" placeholder="请输入您的工作经历" name="experience" />
      </view>

      <view class="form-item">
        <view class="item-title">可提供的服务：</view>
        <textarea minlength="-1" type="text" placeholder="请输入您可提供的服务" name="service" />
      </view>

      <view class="form-item">
        <view class="item-title">个人照片：</view>
      </view>
      <view class="imgBox">
        <span class="imgInfo">请上传真实的个人照片</span>
        <view class="imgShow">
          <img mode="widthFix" :src="imgFilePath" alt />
        </view>
        <view class="btnOptions">
          <button @click="handleChooseImg" class="chooseImg">选择图片</button>
          <button class="clearImg" @click="handleClearImg">清除图片</button>
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
const db = wx.cloud.database();

export default {
  data() {
    return {
      formTitle: "",
      // 图片占位符
      imgFilePath:
        "cloud://tryout-edov9.7472-tryout-edov9-1302058975/imgHolder.jpg",
      isNameOk: true,
      isPhoneOk: true,
      // 用户是否上传了他自己的头像
      isUpLoadImg: false
    };
  },
  onLoad(options) {
    this.formTitle =
      options.id === "long" ? "发布长期求职信息" : "发布短期求职信息";
  },
  methods: {
    formSubmit(e) {
      let that = this;
      uni.showLoading({
        title: "表单上传中"
      });
      // 检查表单里是否有空值
      if (Object.values(e.detail.value).includes("")) {
        uni.showToast({
          title: "请填写完整的表单",
          icon: "none"
        });
        return;
      }
      //表单项全部都填了，检查是否有非法值
      if (!(this.isPhoneOk && this.isNameOk)) {
        // 有非法值，阻止提交
        uni.showToast({
          title: "表单格式不正确，请输入正确的格式",
          icon: "none"
        });
        return;
      }
      // 判断用户是否有上传头像
      if (this.isUpLoadImg) {
        // 用户有上传头像，先把头像上传到数据库，然后拿到他的fileID并上传数据库
        wx.cloud.uploadFile({
          cloudPath: `posterImg/${new Date().getTime()}-${Math.floor(
            Math.random() * 1000
          )}`,
          filePath: that.imgFilePath,
          success(res) {
            // 上传头像成功后回调上传数据的函数
            that.upLoadData(res.fileID, e.detail.value);
          },
          fail(err) {
            console.log(err + "上传失败");
          }
        });
      } else {
        // 用户没有上传头像，直接调用上传数据的函数
        this.upLoadData("", e.detail.value);
      }
    },
    handleChooseImg() {
      uni.showLoading({
        title: "加载中"
      });
      this.chooseImg(1)
        .then(res => {
          this.isUpLoadImg = true;
          this.imgFilePath = res.tempFilePaths[0];
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 上传数据到数据库
    upLoadData(img, form) {
      let userImg = img;
      function uploadForm(collection) {
        db.collection(collection).add({
          data: {
            post: form,
            userImg,
            pTime: new Date().getTime()
          },
          success(res) {
            uni.showToast({
              title: "提交成功",
              icon: "success"
            });
            // 表单提交成功后退出页面，返回上级
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              });
            }, 2000);
          },
          fail(err) {
            console.log(err);
            uni.showToast({
              title: "提交失败，请检查网络"
            });
          }
        });
      }
      this.formTitle === "发布短期求职信息"
        ? uploadForm("shortTermPost")
        : uploadForm("longTermPost");
    },
    // 清除图片
    handleClearImg() {
      this.isUpLoadImg = false;
      this.imgFilePath =
        "cloud://tryout-edov9.7472-tryout-edov9-1302058975/imgHolder.jpg";
      uni.showToast({
        title: "已清除",
        icon: "success"
      });
    },
    // 正则验证
    checkVal(val, name) {
      let regPhone = /^1((((3[4-9])|(5[0-27-9])|(8[2-478])|(78)|(47))|((3[0-2])|([58][56])|(76)|(45))|(([35]3)|(8[019])|(77))|((170)))\d{8})|(1349[0-9]{7})$/;

      let regName = /^[\u4E00-\u9FA5A-Za-z]+$/;

      if (name === "posterName") {
        this.isNameOk = regName.test(val);
      } else {
        this.isPhoneOk = regPhone.test(val);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.form-title {
  color: #000;
  font-weight: bold;
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
      font-weight: bold;
      flex: 0.3;
      display: flex;
      justify-content: flex-end;
    }

    textarea {
      flex: 0.7;
      height: 140rpx;
    }
  }

  .imgBox {
    .imgInfo {
      display: flex;
      justify-content: center;
    }
    .imgShow {
      margin: 20rpx auto;
      height: 200rpx;
      width: 200rpx;
      overflow: hidden;
      border: 3rpx solid #cccccc;

      img {
        width: 100%;
      }
    }
    .btnOptions {
      display: flex;
      margin: 0 auto;
      justify-content: space-between;
      width: 80vw;
      .chooseImg {
        width: 38vw;
      }
      .clearImg {
        width: 38vw;
      }
    }
  }

  .btns {
    padding: 20rpx 0;
    .sumbitBtn {
      width: 80vw;
      margin: 0 auto;
    }
  }
}
.input-wrap {
  flex: 0.7;
  display: flex;
  flex-direction: column;
}
.warning-text {
  margin: 10rpx;
  color: red;
  font-size: 30rpx;
  justify-self: start;
}
.warning {
  border: 3rpx solid red;
}
</style>