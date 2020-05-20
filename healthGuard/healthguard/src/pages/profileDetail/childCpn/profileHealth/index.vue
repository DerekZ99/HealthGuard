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

    <view v-for="item in questionInfo" :key="item._id" class="health-question">
      <view class="question-header">我的咨询</view>
      <!-- 解答组件 -->
      <health-post-detail :questionInfos="item" v-if="hasQuestion">
        <view class="option-wrap" slot="option">
          <button
            class="question-option edit"
            v-if="!item.replyed"
            @click="handleEdit(item)"
          >
            修改
          </button>
          <button class="question-option delete" @click="handleDelete(item)">
            删除
          </button>
        </view>
      </health-post-detail>

      <!-- 解答组件 -->
      <view v-if="!hasQuestion" class="no-question">
        <view class="text"
          >您还没有在名医解答版块咨询问题。若您有健康方面的问题想咨询医生可点击下方按钮进入名医解答版块寻求帮助</view
        >
        <button>前往名医解答版块</button>
      </view>
    </view>
  </view>
</template>

<script>
import moment from "moment";
import HealthPostDetail from "components/healthPostDetail";

const db = wx.cloud.database();
export default {
  components: {
    HealthPostDetail,
  },
  data() {
    return {
      hasSurvey: false,
      hasQuestion: false,
      surveyInfo: {},
      questionInfo: [],
    };
  },
  mounted() {
    this.getSurvey();
    this.getQuestion();
  },
  methods: {
    timeFormat(time) {
      return moment(time).format("YYYY年MM月DD号");
    },
    // 用户点击了删除问卷按钮
    handleDelete() {
      let that = this;
      wx.showModal({
        title: "提示",
        content: "您确定要删除健康调查问卷吗？",
        success(res) {
          if (res.confirm) {
            uni.showLoading({
              title: "删除中",
            });
            wx.cloud.callFunction({
              name: "deletPost",
              data: {
                colPath: "healthSurvey",
                id: that.surveyInfo._id,
              },
              success(res) {
                uni.showToast({
                  title: "删除成功",
                  icon: "success",
                });
                that.getSurvey();
              },
              fail(err) {
                uni.showToast({
                  title: "删除失败，请检查网络",
                  icon: "none",
                });
              },
            });
          } else if (res.cancel) {
            return;
          }
        },
      });
    },
    // 查询问卷
    getSurvey() {
      let that = this;
      // 根据openid查询用户提交的信息(回调地狱写法)
      wx.getStorage({
        key: "userOpenId",
        success(res) {
          db.collection("healthSurvey")
            .where({
              _openid: res.data,
            })
            .get({
              success(res) {
                if (res.data.length === 0) {
                  // 用户没有填过问卷
                  that.hasSurvey = false;
                } else {
                  // 用户填写了问卷
                  that.hasSurvey = true;
                  that.surveyInfo = res.data[0];
                }
              },
              fail(err) {
                uni.showToast({
                  title: "查询失败，请检查网络",
                  icon: "none",
                });
                console.log(err);
              },
            });
        },
      });
    },
    // 查询用户提问
    getQuestion() {
      let that = this;
      wx.getStorage({
        key: "userOpenId",
        success(res) {
          db.collection("healthPost")
            .where({
              _openid: res.data,
            })
            .get({
              success(res) {
                if (res.data.length === 0) {
                  // 用户没有提问过
                  that.hasQuestion = false;
                } else {
                  // 用户填写了问卷
                  that.hasQuestion = true;
                  that.questionInfo = res.data;
                }
              },
              fail(err) {
                uni.showToast({
                  title: "查询失败，请检查网络",
                  icon: "none",
                });
                console.log(err);
              },
            });
        },
      });
    },
    // 跳转到问卷填写页面
    jumpToSurvey() {
      wx.redirectTo({
        url: "/pages/healthSurvey/index",
      });
    },
    //删除帖子
    handleDelete(item) {
      let that = this;
      wx.showModal({
        title: "提示",
        content: "您确定要删除这个提问吗？",
        success(res) {
          if (res.confirm) {
            uni.showLoading({
              title: "删除中",
            });
            wx.cloud.callFunction({
              name: "deletPost",
              data: {
                colPath: "healthPost",
                id: item._id,
              },
              success(res) {
                uni.showToast({
                  title: "删除成功",
                  icon: "success",
                });
                that.getQuestion();
              },
              fail(err) {
                uni.showToast({
                  title: "删除失败，请检查网络",
                  icon: "none",
                });
              },
            });
          } else if (res.cancel) {
            return;
          }
        },
      });
    },
    //编辑帖子
    async handleEdit(item) {
      // 利用微信缓存传值
      const do1 = await wx.setStorage({
        key: "healthPostDetail",
        data: item,
      });

      const do2 = await wx.navigateTo({
        url: "/pages/writeHealthPost/index",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.profile-health {
  background-color: #eee;
  padding: 20rpx;
  height: 100vh;
}
// 有问卷时显示的内容
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
// 没有问卷时显示的内容
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
// 名医解答样式
.health-question {
  background-color: #fff;
  border-radius: 30rpx;
  padding: 20rpx;
  margin: 20rpx 0;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .question-header {
    color: #000;
    font-weight: bold;
    font-size: 30rpx;
    display: flex;
    justify-content: center;
  }
  .option-wrap {
    .question-option {
      margin: 20rpx 0;
      color: #eee;
    }
    .edit {
      background-color: #00b26a;
    }
    .delete {
      background-color: red;
    }
  }

  .no-question {
    .text {
      text-align: center;
      font-size: 30rpx;
      padding: 30rpx 0;
    }
    button {
      width: 60%;
      margin: 0 auto;
      font-size: 30rpx;
    }
  }
}
</style>
