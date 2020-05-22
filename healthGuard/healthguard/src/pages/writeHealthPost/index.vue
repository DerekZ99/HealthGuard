<template>
  <view class="health-post">
    <form @submit="handleSubmit">
      <view class="post-item">
        <view class="item-title">标题：</view>
        <input
          type="text"
          v-model="valTitle"
          @blur="checkValue(valTitle, 'title')"
          name="title"
          placeholder="请输入标题"
          :class="{ warning: !isTitleOk }"
        />
        <!-- 警告信息 -->
        <view class="warning-text" v-show="!isTitleOk">标题内容的长度需为2~15个字之间</view>
        <!-- 警告信息 -->
      </view>

      <view class="post-item">
        <view class="item-title special">详情：</view>
        <textarea
          maxlength="-1"
          type="text"
          name="detail"
          v-model="valDetail"
          @blur="checkValue(valDetail, 'detail')"
          placeholder="详细描述发病时间，主要症状，病情变化，治疗经过以及想要获得的帮助，描述越详细，医生回复质量越高（20字以上）"
          :class="{ warning: !isDetailOk }"
        />
        <!-- 警告信息 -->
        <view class="warning-text" v-show="!isDetailOk">详情内容的需为20个字以上</view>
        <!-- 警告信息 -->
      </view>

      <view class="post-item">
        <view class="item-title" @click="handleImg">
          <img
            mode="widthFix"
            src="cloud://tryout-edov9.7472-tryout-edov9-1302058975/globalIcon/healthUpload.png"
            alt
          />
        </view>
        <view class="img-right">
          {{
          tempFilePaths.length === 0
          ? "添加病情照片、患处、检查报告或其他资料"
          : ""
          }}
          <img
            class="healthImg"
            v-for="(item, index) in tempFilePaths"
            :key="index"
            :src="item"
            mode="aspectFill"
            @click="handleImgOption(index)"
          />
          <view v-if="tempFilePaths.length !== 0" class="addImg" @click="handleImg">
            <img mode="widthFix" src="@/static/tabicon/zengjia.png" />
          </view>
        </view>
      </view>

      <view class="post-item">
        <view class="item-title">性别：</view>
        <radio-group class="sex-box" name="sex">
          <view
            @click="handleChangeSex('male')"
            class="box-item"
            :class="{ active: gender === 'male' }"
          >
            男
            <radio value="男" :checked="gender === 'male'"></radio>
          </view>
          <view
            @click="handleChangeSex('female')"
            class="box-item"
            :class="{ active: gender === 'female' }"
          >
            女
            <radio value="女" :checked="gender === 'female'"></radio>
          </view>
        </radio-group>
      </view>

      <view class="post-item">
        <view class="item-title">年龄：</view>
        <input
          type="number"
          name="age"
          placeholder="请输入您的年龄"
          v-model="valAge"
          @input="checkValue(valAge, 'age')"
          :class="{ warning: !isAgeOk }"
        />
        <!-- 警告信息 -->
        <view class="warning-text" v-show="!isAgeOk">请输入真实年龄</view>
        <!-- 警告信息 -->
      </view>

      <view class="post-item">
        <view class="item-title">手机号：</view>
        <input
          type="number"
          name="phone"
          placeholder="请输入您的手机号"
          v-model="valPhone"
          @blur="checkValue(valPhone, 'phone')"
          :class="{ warning: !isPhoneOk }"
        />
        <!-- 警告信息 -->
        <view class="warning-text" v-show="!isPhoneOk">请输入正确的手机号</view>
        <!-- 警告信息 -->
      </view>

      <!-- 提交按钮 开始 -->
      <button type="primary" form-type="submit">{{isUpdateForm?"提交修改":"提交问题"}}</button>
      <!-- 提交按钮 结束 -->
    </form>
  </view>
</template>

<script>
const db = wx.cloud.database();
import uploadImg from "utils/uploadImg";
import { showModal, getStorage } from "@/api/index";

export default {
  data() {
    return {
      gender: "male",
      isTitleOk: true,
      isDetailOk: true,
      isAgeOk: true,
      isPhoneOk: true,
      tempFilePaths: [],
      // 当是更新操作时，这里为true
      isUpdateForm: false,
      postId: "",
      valTitle: "",
      valDetail: "",
      valAge: null,
      valPhone: null
    };
  },
  async onLoad() {
    const do1 = await getStorage("healthPostDetail").catch(err => {
      return;
    });

    if (!do1) {
      return;
    } else {
      // 能拿到缓存中的数据，是修改操作
      this.isUpdateForm = true;
      const oldForm = do1.data;
      this.postId = oldForm._id;
      this.valTitle = oldForm.title;
      this.valDetail = oldForm.detail;
      this.gender = oldForm.sex === "男" ? "male" : "female";
      this.valAge = oldForm.age;
      this.valPhone = oldForm.phone;
      this.tempFilePaths = oldForm.img;
    }
  },
  onUnload() {
    // 离开页面时清除缓存
    wx.removeStorage({
      key: "healthPostDetail"
    });
    this.isUpdateForm = false;
    this.postId = "";
  },
  methods: {
    // 用户点击了提交按钮
    handleSubmit(e) {
      // 判断表单是否有空值
      if (Object.values(e.detail.value).includes("")) {
        // 有空值
        uni.showToast({
          title: "提交失败，请填写完整的表单",
          icon: "none"
        });
        return;
      }
      // 判断表单是否有非法值
      if (
        !(this.isTitleOk && this.isDetailOk && this.isAgeOk && this.isPhoneOk)
      ) {
        // 有非法值
        uni.showToast({
          title: "提交失败，表单格式不正确",
          icon: "none"
        });
        return;
      }

      // 表单验证通过来到这里
      const form = e.detail.value;

      // 分叉口，当表单为编辑操作时往这里走，不执行下面的函数
      if (this.isUpdateForm) {
        this.updateImg(form);
      } else {
        // 判断用户是否有上传头像
        if (this.tempFilePaths.length !== 0) {
          // 用户有上传头像，先把头像上传到云存储，然后拿到他的fileID并上传数据库
          uni.showLoading({
            title: "上传中"
          });
          // 这个函数被封装到了utils里面，res返回的是fileId数组
          uploadImg(this.tempFilePaths).then(res => {
            // 上传图片完成，执行数据上传操作
            this.uploadData(res, form);
          });
        } else {
          // 用户没有上传头像，直接调用上传数据的函数
          this.uploadData([], form);
        }
      }
    },
    // 提交数据
    async uploadData(imgPath, form) {
      const do1 = await db.collection("healthPost").add({
        data: {
          age: parseInt(form.age),
          detail: form.detail,
          sex: form.sex,
          phone: parseInt(form.phone),
          title: form.title,
          img: imgPath,
          pTime: new Date().getTime(),
          // 添加以下字段是为了偷懒
          comment: "",
          docGood: "",
          docHos: "",
          docJob: "",
          docImg: "",
          docName: "",
          replyed: false
        }
      });
      //判断提交结果
      if (do1.errMsg === "collection.add:ok") {
        // 提交成功
        uni.showToast({
          title: "提交成功",
          icon: "success"
        });
        setTimeout(() => {
          showModal(
            "您的询问信息已提交，医生们会尽快回复您。您可以在“我的”个人页面，点击“我的健康检查”查看信息的最新情况。"
          )
            .then(res => {
              wx.switchTab({
                url: "/pages/profile/index"
              });
            })
            .catch(() => {
              wx.navigateBack({
                delta: 1
              });
            });
        }, 1000);
      } else {
        // 提交失败
        uni.showToast({
          title: "提交失败，请检查网络",
          icon: "none"
        });
      }
    },
    // 修改性别
    handleChangeSex(sex) {
      this.gender = sex;
    },
    // 正则验证
    checkValue(val, name) {
      let regDetail = /^([\u4E00-\u9FA5A-Za-z0-9_ 、“”，,。.?？]){20,1000}$/;

      let regTitle = /^([\u4E00-\u9FA5A-Za-z0-9_ 、“”，,。.?？]){2,15}$/;

      let regAge = /^([1-9][0-9]{0,1}|110)$/;

      let regPhone = /^1((((3[4-9])|(5[0-27-9])|(8[2-478])|(78)|(47))|((3[0-2])|([58][56])|(76)|(45))|(([35]3)|(8[019])|(77))|((170)))\d{8})|(1349[0-9]{7})$/;

      if (name === "title") {
        this.isTitleOk = regTitle.test(val);
      } else if (name === "detail") {
        this.isDetailOk = regDetail.test(val);
      } else if (name === "age") {
        this.isAgeOk = regAge.test(val);
      } else {
        this.isPhoneOk = regPhone.test(val);
      }
    },
    //选择图片
    handleImg() {
      this.chooseImg(9)
        .then(res => {
          this.tempFilePaths = [...this.tempFilePaths, ...res.tempFilePaths];
        })
        .catch(err => {
          return;
        });
    },
    // 删除图片
    handleImgOption(index) {
      // console.log(index);
      let that = this;
      wx.showModal({
        title: "提示",
        content: "您要删除这张图片吗？",
        success(res) {
          if (res.confirm) {
            // 删除云存储中的图片
            if (that.tempFilePaths[index].includes("cloud://tryout")) {
              wx.cloud
                .deleteFile({
                  fileList: [that.tempFilePaths[index]]
                })
                .then(res => {
                  that.tempFilePaths.splice(index, 1);
                })
                .catch(err => {
                  uni.showToast({
                    title: "删除失败，请检查网络",
                    icon: "none"
                  });
                });
            } else {
              that.tempFilePaths.splice(index, 1);
            }
          } else if (res.cancel) {
            return;
          }
        }
      });
    },
    // ------------更新表单的函数-----------
    // 更新图片
    updateImg(form) {
      if (this.tempFilePaths.indexOf("http")) {
        let newImglist = this.tempFilePaths.filter(item => {
          return item.includes("http");
        });
        uploadImg(newImglist)
          .then(res => {
            this.tempFilePaths.splice(-res.length, res.length, ...res);
            this.updateData(form, this.tempFilePaths);
          })
          .catch(err => {});
      } else {
        // 图片数组里没有新增的图片，直接更新
        this.updateData(form, this.tempFilePaths);
      }
    },
    // 更新数据
    updateData(form, imgList) {
      db.collection("healthPost")
        .where({
          _id: this.postId
        })
        .update({
          data: {
            age: parseInt(form.age),
            detail: form.detail,
            sex: form.sex,
            phone: parseInt(form.phone),
            title: form.title,
            img: imgList,
            pTime: new Date().getTime()
          },
          success(res) {
            uni.showToast({
              title: "资料修改成功",
              icon: "success"
            });
            setTimeout(() => {
              wx.switchTab({
                url: "/pages/profile/index"
              });
            }, 1000);
          },
          fail(err) {
            uni.showToast({
              title: "提交失败，请检查网络",
              icon: "none"
            });
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.health-post {
  padding: 30rpx;
  form {
    .post-item {
      display: flex;
      flex-wrap: wrap;
      padding: 20rpx 0;
      border-bottom: 3rpx solid #ccc;
      .special {
        align-items: flex-start !important;
      }
      .item-title {
        width: 20%;
        display: flex;
        justify-content: flex-end;
        font-size: 32rpx;
        color: #000;
        align-items: center;

        img {
          width: 100%;
        }
      }
      .img-right {
        padding: 20rpx;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        width: 80%;
        .healthImg {
          width: 150rpx;
          height: 150rpx;
          margin: 10rpx 10rpx;
        }
        .addImg {
          width: 150rpx;
          height: 150rpx;
          background-color: #aaaaaa;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 50%;
          }
        }
      }

      input {
        padding: 10rpx;
        font-size: 32rpx;
        color: #000;
        width: 80%;
      }

      textarea {
        width: 75%;
        padding: 10rpx;
        font-size: 32rpx;
        color: #000;
      }

      .warning-text {
        margin: 10rpx auto;
        color: red;
        font-size: 30rpx;
      }
      .warning {
        border: 3rpx solid red;
      }
      .sex-box {
        display: inline-block;
        border-radius: 10rpx;
        border: 3rpx solid #63bd3b;
        overflow: hidden;
        .box-item {
          display: inline-block;
          padding: 20rpx 50rpx;
          color: #000;
          font-size: 32rpx;
          radio {
            display: none;
          }
        }
        .active {
          background-color: #63bd3b;
          color: #ffffff;
        }
      }
    }
    button {
      margin-top: 60rpx;
    }
  }
}
</style>
