<template>
  <view class="hire">
    <!-- 表单部分开始 -->
    <form @submit="formSubmit" class="hire-form">
      <view class="form-title">{{formTitle}}</view>

      <!-- =============职位名称 开始============= -->
      <view class="form-item">
        <view class="item-title">职位名称：</view>
        <input
          :class="{warning:!isTextOk}"
          type="text"
          v-model.trim="textValue1"
          name="jobTitle"
          placeholder="请输入职位名称"
          @blur="checkContent(textValue1,'jobTitle')"
        />
        <!-- 警告信息 -->
        <view class="warning-text" v-show="!isTextOk">请不要输入空格或标点符号</view>
        <!-- 警告信息 -->
      </view>
      <!-- =============职位名称 结束============= -->

      <!-- =============职位描述 开始============= -->
      <view class="form-item">
        <view class="item-title">职位描述：</view>
        <textarea auto-height maxlength="-1" type="text" name="jobDesc" placeholder="请输入职位描述" />
      </view>
      <!-- =============职位描述 结束============= -->

      <!-- =============职位要求 开始============= -->
      <view class="form-item">
        <view class="item-title">职位要求：</view>
        <textarea auto-height maxlength="-1" type="text" name="jobReq" placeholder="请输入任职要求" />
      </view>
      <!-- =============职位要求 结束============= -->

      <!-- ==============薪资报酬 开始============== -->
      <view class="form-item">
        <view class="item-title">薪资报酬：</view>
        <picker
          name="salary"
          @change="bindPickerChange"
          mode="selector"
          :range="array"
          :value="array[index]"
        >
          <view class="picker">当前选择：{{array[index]}}</view>
        </picker>
      </view>
      <!-- ==============薪资报酬 结束============== -->

      <!-- ==============工作地址 开始============== -->
      <view class="form-item">
        <view class="item-title">工作地址：</view>
        <input
          type="text"
          name="workplace"
          placeholder="请输入工作地点"
          v-model="textValue2"
          @blur="checkContent(textValue2,'workplace')"
          :class="{warning:!isWorkPlaceOk}"
        />
        <!-- 警告信息 -->
        <view class="warning-text" v-show="!isWorkPlaceOk">请不要输入空格或标点符号</view>
        <!-- 警告信息 -->
      </view>
      <!-- ==============工作地址 结束============== -->

      <!-- =============工作时间 开始============= -->
      <view class="form-item">
        <view class="item-title">工作时间：</view>
        <view>
          <picker
            mode="multiSelector"
            name="workTime"
            :value="[timeList[0][timesIndex[0]],timeList[1][timesIndex[1]]]"
            :range="timeList"
            @change="bindTimeChange"
          >
            <view
              class="picker"
            >从 {{timeList[0][timesIndex[0]]}}:00 至 {{timeList[1][timesIndex[1]]}}:00</view>
          </picker>
        </view>
      </view>
      <!-- =============工作时间 结束============= -->

      <!-- ==============联系方式 开始============== -->
      <view class="form-item">
        <view class="item-title">联系方式：</view>
        <input
          type="number"
          name="phone"
          placeholder="请输入电话号码"
          v-model="textValue3"
          @blur="checkPhone(textValue3)"
          :class="{warning:!isPhoneOk}"
        />
        <!-- 警告信息 -->
        <view class="warning-text" v-show="!isPhoneOk">请输入正确的手机号码</view>
        <!-- 警告信息 -->
      </view>
      <!-- ==============联系方式 结束============== -->

      <!-- ============发布人名称 开始============ -->
      <view class="form-item">
        <view class="item-title">发布人名称</view>
        <input
          type="text"
          name="posterName"
          placeholder="请输入名称，如陈先生，李女士"
          v-model="textValue4"
          @blur="checkContent(textValue4,'posterName')"
          :class="{warning:!isNameOk}"
        />
        <!-- 警告信息 -->
        <view class="warning-text" v-show="!isNameOk">请不要输入空格或标点符号</view>
        <!-- 警告信息 -->
      </view>
      <!-- ============发布人名称 结束============ -->

      <!-- ===========按钮部分 开始=========== -->
      <view class="btns">
        <!-- 提交按钮 -->
        <button type="primary" class="sumbitBtn" form-type="submit">提交</button>
      </view>
      <!-- ===========按钮部分 结束=========== -->
    </form>
    <!-- 表单部分结束 -->
  </view>
</template>

<script>
const db = wx.cloud.database();
export default {
  data() {
    return {
      // 临时改的，完事之后要改成空的字符串（both）
      postType: "",
      formTitle: "",
      array: ["面议"],
      index: 0,
      timeList: [[], []],
      timesIndex: [0, 0],
      // 正则
      isTextOk: true,
      isWorkPlaceOk: true,
      isNameOk: true,
      isPhoneOk: true
    };
  },
  onLoad(options) {
    this.postType = options.id;
    this.formTitle =
      options.id === "long" ? "发布长期招聘信息" : "发布短期招聘信息";
    // 遍历薪资
    for (let i = 1; i <= 100; i++) {
      i * 100;
      let j = i * 100;
      this.array.push(j);
    }
    // 遍历工作时间
    for (let i = 0; i <= 24; i++) {
      this.timeList[0].push(i);
      this.timeList[1].push(i);
    }
  },
  methods: {
    formSubmit(e) {
      // 检查表单中是否有空值，如果有 阻止提交
      if (Object.values(e.detail.value).includes("")) {
        uni.showToast({
          title: "提交失败，请填写完整的表单",
          icon: "none"
        });
        return;
      }
      // 检查表单中是否有非法制，如有有 阻止提交
      if (
        !(
          this.isTextOk &&
          this.isWorkPlaceOk &&
          this.isNameOk &&
          this.isPhoneOk
        )
      ) {
        // 表单内有为非法值，阻止提交
        uni.showToast({
          title: "表单格式不正确，请输入正确的格式",
          icon: "none"
        });
        return;
      }
      // 表单内容合法，可以提交
      uni.showLoading({
        title: "加载中"
      });
      const formContent = e.detail.value;
      // 判断是长期招聘还是短期
      function uploadForm(collection) {
        db.collection(collection).add({
          data: {
            post: formContent,
            pTime:new Date().getTime()
          },
          success(res) {
            uni.hideLoading();
            // post添加到数据库成功
            uni.showToast({
              title: "发布成功",
              icon: "success"
            });
            // 发布成功后返回上一级页面
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              });
            }, 2000);
          },
          fail(err) {
            uni.showToast({
              title: "发布失败，请检查网络",
              icon: "none"
            });
          }
        });
      }
      this.postType === "long"
        ? uploadForm("longTermJob")
        : uploadForm("shortTermJob");
    },
    bindPickerChange(e) {
      this.index = e.target.value;
    },
    bindTimeChange(e) {
      this.timesIndex = e.target.value;
    },
    // 表单验证部分
    checkContent(msg, name) {
      let reg = /^[\u4E00-\u9FA5A-Za-z0-9]+$/;
      if (name === "jobTitle") {
        this.isTextOk = reg.test(msg);
      } else if (name === "workplace") {
        this.isWorkPlaceOk = reg.test(msg);
      } else if (name === "posterName") {
        this.isNameOk = reg.test(msg);
      }
    },
    checkPhone(msg) {
      let reg = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
      this.isPhoneOk = reg.test(msg);
    }
  }
};
</script>

<style lang="scss" scoped>
.hire-form {
  .form-title {
    color: #000;
    font-weight: bold;
    font-size: 40rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30rpx 0;
  }
  .form-item {
    .item-title {
      width: 100%;
      color: #000;
      background-color: #e3e3e3;
      font-size: 34rpx;
      padding: 20rpx 10rpx 10rpx;
      font-weight: bold;
      border: 3rpx solid #666;
    }
    picker {
      font-size: 30rpx;
      margin: 20rpx 10rpx;
      color: #000;
    }
    input {
      font-size: 30rpx;
      margin: 20rpx 10rpx;
      color: #000;
    }

    textarea {
      width: 100%;
      font-size: 30rpx;
      padding: 20rpx 10rpx;
      color: #000;
    }
  }

  .btns {
    border-top: 3rpx solid #000;
    padding: 40rpx 0;
    .sumbitBtn {
      width: 60vw;
      margin: 0 auto;
    }
  }
}
.warning-text {
  margin: 10rpx;
  color: red;
  font-size: 30rpx;
}
.warning {
  border: 3rpx solid red;
}
</style>