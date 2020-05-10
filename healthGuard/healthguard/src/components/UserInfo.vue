<template>
  <view class="userInfo">
    <view class="userInfo-detail">
      <open-data type="userAvatarUrl" class="user-avatar"></open-data>
      <open-data type="userNickName" class="user-name"></open-data>
      <button
        class="loginBtn"
        open-type="getUserInfo"
        lang="zh_CN"
        type="primary"
        @getuserinfo="appLoginWx"
      >
        {{ isLogin ? "已登录" : "微信授权登录" }}
      </button>
    </view>
  </view>
</template>

<script>
const db = wx.cloud.database();
export default {
  data() {
    return {
      isLogin: false,
    };
  },
  watch: {
    isLogin() {
      this.$emit("login");
    },
  },
  methods: {
    // 用户点击了授权按钮
    appLoginWx(res) {
      if (this.isLogin) {
        // 用户已经是登录状态时不执行后面的操作
        return;
      }
      // 把用户信息传入到getOpenid函数中
      this.getOpenid(res.detail.userInfo);
      uni.showLoading();
    },
    // 获取用户的openid
    getOpenid(userInfo) {
      let that = this;
      wx.cloud.callFunction({
        name: "getUser",
        success(res) {
          // 利用openid判断用户是否已经存在
          that.checkUserExist(res.result.openid, userInfo);
        },
        fail(r) {
          console.log(r);
        },
      });
    },
    // 检查用户是否存在
    checkUserExist(openid, userInfo) {
      let that = this;
      db.collection("userList")
        .where({
          openid: openid,
        })
        .get({
          success(res) {
            if (res.data.length === 0) {
              // 数据库中没有这个用户，添加用户
              that.addUser(openid, userInfo);
            } else {
              // 有此用户，修改其登录状态
              wx.setStorage({
                key: "isLogin",
                data: true,
                success() {
                  uni.showToast({
                    title: "您已登录",
                    icon: "success",
                  });
                  that.isLogin = true;
                },
              });
            }
          },
          fail(err) {
            console.log(err);
          },
        });
    },
    // 增加用户
    addUser(openid, userInfo) {
      let that = this;
      db.collection("userList").add({
        data: {
          name: userInfo.nickName,
          avatar: userInfo.avatarUrl,
          openid: openid,
        },
        success(res) {
          wx.setStorage({
            key: "isLogin",
            data: true,
            success() {
              uni.showToast({
                title: "您已登录",
                icon: "success",
              });
              that.isLogin = true;
            },
          });
        },
        fail(err) {
          console.log(err);
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.userInfo {
  position: relative;
  overflow: hidden;
  .userInfo-detail {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60rpx 0;
    .user-avatar {
      display: inline-block;
      width: 140rpx;
      height: 140rpx;

      border-radius: 50%;
      overflow: hidden;
      border: 3rpx solid #666;
    }

    .user-name {
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
