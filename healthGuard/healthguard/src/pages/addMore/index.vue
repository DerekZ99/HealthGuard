<template>
  <view class="addmore">
    <swiper-action @swiperAction="handleSwip">
      <img
        class="appbg"
        src="cloud://tryout-edov9.7472-tryout-edov9-1302058975/appbg/u=2216231013,1490844489&fm=26&gp=0.jpg"
        alt
      />

      <!-- 用户信息展示 开始 -->
      <user-info
        ref="userInfo"
        :isLogin="isUserLogin"
        @login="userLogin"
      ></user-info>
      <!-- 用户信息展示 结束 -->

      <!-- 发布按钮选择 开始 -->

      <view class="post">
        <view class="post-item">
          <view class="text">
            {{
              isUserLogin
                ? "您现在可以发布服务信息。注意：请不要发布虚假信息或不良信息。一经发现将追诉法律责任"
                : "注意：您现在处于未登录状态。授权登录后可发表服务信息"
            }}
          </view>
          <button @click="postClick('long')" class="longTerm">
            发布长期服务
          </button>
          <button @click="postClick('short')" class="shortTerm">
            发布短期服务
          </button>
        </view>
      </view>
      <!-- 发布按钮选择 结束 -->
    </swiper-action>
  </view>
</template>

<script>
import UserInfo from "@/components/UserInfo";
import SwiperAction from "components/swiperAction";

export default {
  components: {
    UserInfo,
    SwiperAction,
  },
  onShow() {
    this.syncData();
  },
  mounted() {
    this.syncData();
  },
  data() {
    return {
      isUserLogin: false,
    };
  },

  methods: {
    postClick(info) {
      if (this.isUserLogin) {
        //用户之前登录过，或者刚刚完成授权登录
        // 进行页面跳转操作
        wx.showActionSheet({
          itemList: ["发布招聘信息", "发布求职信息"],
          success(res) {
            // 进行判断是跳到哪一页面
            if (res.tapIndex === 0) {
              wx.navigateTo({
                url: `/pages/writeHirePost/index?id=${info}`,
              });
            } else {
              wx.navigateTo({
                url: `/pages/writeJobPost/index?id=${info}`,
              });
            }
          },
        });
      } else {
        // 用户之前没有登录，或者缓存被清除
        // 提醒用户点击授权按钮
        uni.showToast({
          title: "您还没有登录，请先授权登录",
          icon: "none",
        });
      }
    },
    userLogin() {
      this.isUserLogin = !this.isUserLogin;
    },
    // 手指滑动跳转tab
    handleSwip(e){
      if(e.direction==="left"){
         wx.switchTab({
          url: "/pages/profile/index",
        });
      }else {
        wx.switchTab({
          url: "/pages/index/index",
        });
      }
    },
    // 同步登录状态
    syncData() {
      let that = this;
      wx.getStorage({
        key: "isLoginBefore",
        success(res) {
          if (res.data === that.isUserLogin) {
            return;
          } else {
            that.isUserLogin = res.data;
          }
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.appbg {
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
}

.post {
  margin-top: 60rpx;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .post-item {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 30rpx;
    border-radius: 30rpx;
    background-color: aqua;
    .text {
      width: 60vw;
      font-size: 32rpx;
      font-weight: bold;
      line-height: 48rpx;
      color: #000;
      margin-bottom: 30rpx;
    }
    .longTerm {
      width: 60vw;
    }

    .shortTerm {
      margin-top: 30rpx;
      width: 60vw;
    }
  }
}
</style>
