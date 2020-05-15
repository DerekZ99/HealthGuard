<template>
  <view class="profile-health">
    <!-- =============问卷内容 开始============= -->
    <view class="survey" v-if="hasSurvey">
      <view class="survey-tite">{{ surveyInfo.formType }}</view>
      <view class="survey-info">
        <view class="info-status">状态：已提交</view>
        <view class="info-time"
          >提交日期：{{ timeFormat(surveyInfo.pTime) }}</view
        >
        <view class="info-option">
          <button @click="handleDelete">删除</button>
        </view>
      </view>
    </view>
    <!-- =============问卷内容 结束============= -->

    <!-- =============没有问卷时显示 开始============= -->
    <view class="no-survey" v-if="!hasSurvey">
      您还没有填写健康调查问卷，点击下方按钮填写
      <button @click="jumpToSurvey">填写问卷</button>
    </view>
    <!-- =============没有问卷时显示 结束============= -->
  </view>
</template>

<script>
import moment from "moment";

const db = wx.cloud.database();
export default {
  data() {
    return {
      hasSurvey: false,
      surveyInfo: {},
    };
  },
  mounted() {
    this.getSurvey()
  },
  methods: {
    timeFormat(time) {
      return moment(time).format("YYYY年MM月DD号");
    },
    // 用户点击了删除问卷按钮
    handleDelete() {
      let that = this
      wx.cloud.callFunction({
        name: "deletPost",
        data: {
          colPath: "healthSurvey",
          id: this.surveyInfo._id,
        },
        success(res) {
          uni.showToast({
            title:"删除成功",
            icon:"none"
          })
          that.getSurvey()
        },
      });
    },
    // 查询问卷
    async getSurvey() {
      let that = this;

      // 根据openid查询用户提交的健康问卷(async await 写法)
      let openid = "";
      await wx.getStorage({
        key: "userOpenId",
        success(res) {
          openid = res.data;
        },
      });

      // 查询用户提交的问卷
      await db
        .collection("healthSurvey")
        .where({
          _openid: openid,
        })
        .get({
          success(res) {
            if (res.data.length === 0) {
              // 用户没有填过表格
              that.hasSurvey = false;
            } else {
              // 数据库查到用户填过的表格
              that.hasSurvey = true;
              that.surveyInfo = res.data[0];
              console.log(that.surveyInfo);
            }
          },
          fail(err) {
            uni.showToast({
              title: "查询失败，请检查网路",
              icon: "none",
            });
          },
        });
    },
    // 跳转到问卷填写页面
    jumpToSurvey(){
      wx.navigateTo({
        url:"/pages/healthCheck/index"
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.profile-health {
  background-color: #eee;
  padding: 20rpx;
  height: 100vh;
}
.survey {
  background-color: #fff;
  border-radius: 30rpx;
  padding: 20rpx;
  margin: 20rpx 0;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .survey-tite {
    color: #000;
    font-weight: bold;
    font-size: 30rpx;
    display: flex;
    justify-content: center;
  }

  .survey-info {
    margin-top: 20rpx;
    display: flex;
    justify-content: space-between;
    .info-status {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .info-time {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .info-option {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;

      button {
        color: #fff;
        background-color: red;
        font-size: 28rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60%;
        height: 60%;
      }
    }
  }
}
.no-survey {
  background-color: #fff;
  border-radius: 30rpx;
  padding: 20rpx;
  margin: 20rpx 0;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
  button {
      
        margin-top: 20rpx;
        font-size: 28rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60%;
        height: 60%;
  }
}
</style>
