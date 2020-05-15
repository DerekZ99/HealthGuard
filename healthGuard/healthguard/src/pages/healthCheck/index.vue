<template>
  <view class="health-check">
    <!-- ==============用户登录模块 开始============== -->
    <view class="login-section" v-if="!isUserLogin">
      <user-info :isLogin="isUserLogin" @login="userLogin"></user-info>
      <view class="login-text">您现在还没有登录，登录后可填写健康调查问卷</view>
    </view>
    <!-- ==============用户登录模块 结束============== -->

    <!-- ================健康调查问卷 开始================ -->
    <health-survey v-if="isUserLogin && noSurvey"></health-survey>
    <!-- ================健康调查问卷 开始================ -->

    <!-- ==========已填写表单后所展示的信息 开始========== -->
    <view v-if="!noSurvey" class="form-filled">您已填写过问卷，可以去别的地方逛逛哟</view>
    <!-- ==========已填写表单后所展示的信息 解释========== -->
  </view>
</template>

<script>
import HealthSurvey from "./childCpn/healthSurvey/index";
import UserInfo from "components/UserInfo";

const db = wx.cloud.database();
export default {
  components: {
    HealthSurvey,
    UserInfo
  },
  onShow() {
    this.syncData();
  },
  mounted() {
    this.syncData();
    this.checkForm();
  },
  data() {
    return {
      isUserLogin: false,
      // 判断用户有没有填过表格,true=没填过，false=填过
      noSurvey: true
    };
  },
  watch: {
    isUserLogin() {
      this.checkForm();
    }
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
              _openid: res.data
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
                  icon: "none"
                });
              }
            });
        }
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
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.health-check {
  background-color: #f7f7f7;
  height: 100vh;
  .login-section {
    .login-text {
      display: flex;
      justify-content: center;
      font-size: 30rpx;
      color: #000;
      text-align: center;
    }
  }
  .form-filled {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    width: 100%;
    font-size: 30rpx;
    color: #000;
  }
}
</style>