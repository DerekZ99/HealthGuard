<template>
  <view class="userInfo">
    <view class="avatarBg">
      <slot></slot>
    </view>

    <view class="userInfo-detail">
      <open-data type="userAvatarUrl" class="user-avatar"></open-data>
      <open-data type="userNickName" class="user-name"></open-data>
      <button
        class="loginBtn"
        open-type="getUserInfo"
        lang="zh_CN"
        type="primary"
        @getuserinfo="appLoginWx"
      >{{ isLogin ? "已登录" : "微信授权登录" }}</button>
    </view>
  </view>
</template>

<script>
const db = wx.cloud.database();
export default {
  props: {
    isLogin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  mounted() {
    let that = this;
    wx.getStorage({
      key: "isLoginBefore",
      success(res) {
        that.$emit("login");
      }
    });
  },
  methods: {
    // // 用户点击了授权按钮
    appLoginWx() {
      if (this.isLogin) {
        // 用户已经是登录状态时不执行后面的操作
        uni.showToast({
          title: "您已是登录状态"
        });
        return;
      }
      // 用户点击了确认授权
      uni.showLoading();
      let that = this;
      wx.getUserInfo({
        success(res) {
          // 检查用户是否存在
          that.getOpenid(res.userInfo);
        },
        fail(err) {
          //用户点击了拒绝授权
          return;
        }
      });
    },
    // 获取用户的openid 检查用户是否存在
    getOpenid(userInfo) {
      let that = this;
      wx.cloud.callFunction({
        name: "getUser",
        success(res) {
          // 先将用户openid存入缓存中（用来查询用户的信息）
          wx.setStorage({
            key: "userOpenId",
            data: res.result.openid
          });
          // 利用openid判断数据库中是否有这个用户
          if (res.result.user.data.length === 0) {
            //数据库中没有这个用户，添加这个用户
            db.collection("userList").add({
              data: {
                name: userInfo.nickName,
                avatar: userInfo.avatarUrl,
                openid: res.result.openid
              },
              success(res) {
                // 用户添加成功，修改登录状态
                wx.setStorage({
                  key: "isLoginBefore",
                  data: true
                });
                uni.showToast({
                  title: "授权登录成功",
                  icon: "success"
                });
                that.$emit("login");
              }
            });
          } else {
            // 数据库中有这个用户，修改登录状态
            wx.setStorage({
              key: "isLoginBefore",
              data: true
            });
            uni.showToast({
              title: "授权登录成功",
              icon: "success"
            });
            that.$emit("login");
          }
        },
        fail(err) {
          console.log(err);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.userInfo {
  position: relative;
  overflow: hidden;
  .avatarBg {
    position: absolute;
    width: 100%;
    z-index: 0;
    width: 100%;
    filter: blur(20rpx);
  }
  .userInfo-detail {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60rpx 0;
    .user-avatar {
      z-index: 2;
      display: inline-block;
      width: 140rpx;
      height: 140rpx;
      border-radius: 50%;
      overflow: hidden;
      border: 3rpx solid #666;
    }

    .user-name {
      z-index: 2;
      font-size: 40rpx;
      margin: 30rpx 0;
      color: #000;
    }
    .loginBtn {
      width: 60vw;
    }
  }
}
</style>
