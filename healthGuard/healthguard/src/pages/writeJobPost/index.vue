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
          <view class="warning-text" v-show="!isNameOk">请不要输入空格或符号</view>
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
        <button @click="handleChooseImg" class="chooseImg">选择图片</button>
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
        "cloud://tryout-edov9.7472-tryout-edov9-1302058975/imgHolder.jpg",
      isNameOk: true,
      isPhoneOk: true
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
        cloudPath: `posterImg/${new Date().getTime()}-${Math.floor(
          Math.random() * 1000
        )}`,
        filePath: that.imgFilePath,
        success(res) {
          res.fileID;
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
    },
    // 正则验证
    checkVal(val, name) {
      let regPhone = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;

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
    .chooseImg {
      width: 60vw;
      margin: 0 auto;
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