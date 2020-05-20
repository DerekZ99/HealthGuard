<template>
  <swiper-action @swiperAction="handleSwip">
    <view class="profile">
      <!-- 登录模块 开始 -->
      <user-info :isLogin="isUserLogin" @login="userLogin">
        <open-data mode="widthFix" type="userAvatarUrl"></open-data>
      </user-info>
      <!-- 登录模块 结束 -->

      <!-- 按钮选项模块 开始 -->
      <view class="options">
        <view
          @click="optionClick(item.id)"
          class="option-item"
          v-for="item in optionItem"
          :key="item.id"
        >
          <view class="item-icon">
            <img mode="widthFix" :src="item.icon" alt />
          </view>
          <view class="item-content">
            <view class="content-text">{{ item.title }}</view>
            <view class="content-arrow">1</view>
          </view>
        </view>
      </view>
      <!-- 按钮选项模块 结束 -->
    </view>
  </swiper-action>
</template>

<script>
import UserInfo from "@/components/UserInfo";
import SwiperAction from "components/swiperAction";

export default {
  components: {
    UserInfo,
    SwiperAction
  },
  data() {
    return {
      isUserLogin: false,
      optionItem: [
        {
          title: "我的求职信息",
          icon:
            "cloud://tryout-edov9.7472-tryout-edov9-1302058975/globalIcon/qiuzhi_2.png",
          id: "job"
        },
        {
          title: "我的招聘信息",
          icon:
            "cloud://tryout-edov9.7472-tryout-edov9-1302058975/globalIcon/zhaopin.png",
          id: "hire"
        },
        {
          title: "我的健康检查",
          icon:
            "cloud://tryout-edov9.7472-tryout-edov9-1302058975/globalIcon/jiankang-copy.png",
          id: "health"
        },
        {
          title: "关于",
          icon:
            "cloud://tryout-edov9.7472-tryout-edov9-1302058975/globalIcon/guanyu.png",
          id: "about"
        }
      ]
    };
  },
  onShow() {
    this.syncData();
  },
  mounted() {
    this.syncData();
  },
  methods: {
    userLogin() {
      this.isUserLogin = !this.isUserLogin;
    },
    // 按钮选项被点击
    optionClick(id) {
      // 判断用户是否已登录
      if (this.isUserLogin) {
        // 用户已登录，执行跳转操作
        wx.navigateTo({
          url: `/pages/profileDetail/index?id=${id}`,
        });
      } else {
        // 用户未登录，阻止跳转
        uni.showToast({
          title: "您还没有登录",
          icon: "none"
        });
      }
    },
    // 手指滑动跳转tab
    handleSwip(e) {
      if (e.direction === "right") {
        wx.switchTab({
          url: "/pages/addMore/index"
        });
      } else {
        uni.showToast({
          title: "右边没有页面啦",
          icon: "none"
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
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.profile {
  background-color: #F5F5F5;
  height: 100vh;
  .options {
    .option-item {
      background-color: #ffffff;
      display: flex;
      align-items: center;

      .item-icon {
        width: 50rpx;
        height: 50rpx;
        margin: 0 30rpx;
        img {
          width: 100%;
        }
      }

      .item-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        border-bottom: 3rpx solid #eeeeee;
        height: 100rpx;
        padding-right: 40rpx;
        .content-text {
          color: #000;
          font-size: 36rpx;
        }

        .content-arrow {
          width: 26rpx;
          height: 26rpx;
          color: #ffffff;
          border-top: 4rpx solid #eeeeee;
          border-right: 4rpx solid #eeeeee;
          transform: rotate(45deg);
        }
      }
    }
  }
}
.option-item:last-child {
  margin-top: 30rpx;
}
</style>
