<template>
  <view class="health-check">
    <!-- ================背景图 开始================ -->
    <img
      class="healthBg"
      src="http://ku.90sjimg.com/back_pic/04/13/19/85581d8220c581c.jpg%21/fwfh/804x1429/quality/90/unsharp/true/compress/true"
      alt
    />
    <!-- ================背景图 结束================ -->

    <!-- ==============用户登录模块 开始============== -->
    <view>
      <user-info :isLogin="isUserLogin" @login="userLogin"></user-info>
    </view>
    <!-- ==============用户登录模块 结束============== -->

    <!-- ==============问卷填写入口 开始============== -->
    <view class="survey">
      <view v-if="noSurvey" class="no-survey">
        <view class="survey-text">{{
          isUserLogin
            ? "您已登录，但是还没有填写健康调查问卷，点击下方按钮填写健康调查问卷"
            : "您还没有登录，登录后可点击下方按钮填写调查问卷"
        }}</view>
        <view class="surveyBtn">
          <button @click="handleJump('healthSurvey')" :disabled="!isUserLogin">
            填写健康调查问卷
          </button>
        </view>
      </view>
      <view v-else class="has-survey">您已填写过健康调查问卷</view>
    </view>
    <!-- ==============问卷填写入口 结束============== -->

    <!-- 医生问答入口 开始 -->
    <view class="healthcare">
      <view class="text">
        {{ isUserLogin ? "名医解答板块是健康通为用户提供的线上问诊功能，您现在已登录，可前往名医解答版块寻求专业医生解答" : "名医解答板块是健康通为用户提供的线上问诊功能，登录后可前往名医解答版块寻求专业医生解答" }}
      </view>
      <view class="entryBtn">
        <button @click="handleJump('healthSection')" :disabled="!isUserLogin">前往名医解答版块</button>
      </view>
    </view>
    <!-- 医生问答入口 结束 -->
  </view>
</template>

<script>
import UserInfo from "components/UserInfo";

const db = wx.cloud.database();
export default {
  components: {
    UserInfo,
  },
  onShow() {
    this.syncData();
    this.checkForm();
  },
  mounted() {
    this.syncData();
    // this.checkForm();
  },
  data() {
    return {
      isUserLogin: false,
      // 判断用户有没有填过表格,true=没填过，false=填过
      noSurvey: true,
    };
  },
  watch: {
    isUserLogin() {
      this.checkForm();
    },
  },
  methods: {
    userLogin() {
      this.isUserLogin = !this.isUserLogin;
    },
    // 判断用户之前是否有填写过表格(回调地狱写法)
    checkForm() {
      const that = this;
      wx.getStorage({
        key: "userOpenId",
        success(res) {
          // 利用openid查询数据库该用户是否提交过问卷
          db.collection("healthSurvey")
            .where({
              _openid: res.data,
            })
            .get({
              success(res) {
                if (res.data.length === 0) {
                  // 用户没有填写过表单
                  that.noSurvey = true;
                } else {
                  // 用户已经填写过了
                  that.noSurvey = false;
                }
              },
              fail(err) {
                // 查询失败
                uni.showToast({
                  title: "加载失败，请检查网路",
                  icon: "none",
                });
              },
            });
        },
      });
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
    // 填写问卷按钮被点击，跳转到问卷页面
    handleJump(page) {
      wx.navigateTo({
        url: `/pages/${page}/index`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.health-check {
  height: 100vh;
  padding: 0 30rpx;

  .healthBg {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
  }

  .survey {
    background-color: #fff;
    padding: 20rpx 40rpx;
    border-radius: 40rpx;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .no-survey {
      .survey-text {
        color: #000;
        font-size: 32rpx;
      }

      .surveyBtn {
        button {
          margin-top: 20rpx;
          width: 60%;
        }
      }
    }

    .has-survey {
      display: flex;
      justify-content: center;
      color: #000;
      font-size: 32rpx;
    }
  }

  .healthcare {
    margin: 60rpx 0;
    background-color: #fff;
    padding: 20rpx 40rpx;
    border-radius: 40rpx;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .text {
      color: #000;
      font-size: 32rpx;
    }

    .entryBtn {
      button {
        margin-top: 20rpx;
        width: 60%;
      }
    }
  }
}
</style>
