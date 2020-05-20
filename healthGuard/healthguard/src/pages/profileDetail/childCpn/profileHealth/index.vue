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
          <button
            class="question-option delete"
            @click="handleDeleteQuestion(item)"
          >
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
import { showModal, getStorage } from "@/api/index";

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
    async handleDelete() {
      let that = this;
      const do1 = await showModal("您确定要删除健康调查问卷吗？");
      // 通过_id删除数据库中的文件
      const do2 = await wx.cloud.callFunction({
        name: "deletPost",
        data: {
          colPath: "healthSurvey",
          id: this.surveyInfo._id,
        },
      });
      // 根据返回的结果提示用户
      if (do2.errMsg === "cloud.callFunction:ok") {
        uni.showToast({
          title: "删除成功",
          icon: "success",
        });
        this.getQuestion();
      } else {
        uni.showToast({
          title: "删除失败，请检查网络",
          icon: "none",
        });
      }
    },
    // 查询问卷
    async getSurvey() {
      // 从缓存中提取openId
      const do1 = await getStorage("userOpenId");
      // 根据openid 查询用户的问卷
      const do2 = await db
        .collection("healthSurvey")
        .where({ _openid: do1.data })
        .get();
      // 判断查询结果
      if (do2.errMsg === "collection.get:ok") {
        // 数据库access成功
        if (do2.data.length === 0) {
          // 用户没有填过问卷;
          this.hasSurvey = false;
        } else {
          // 用户填写了问卷
          this.hasSurvey = true;
          this.surveyInfo = do2.data[0];
        }
      } else {
        // 数据库access失败
        uni.showToast({
          title: "查询失败，请检查网络",
          icon: "none",
        });
      }
    },
    // 查询用户提问
    async getQuestion() {
      const do1 = await getStorage("userOpenId");
      const do2 = await db
        .collection("healthPost")
        .where({ _openid: do1.data })
        .get();
      if (do2.errMsg === "collection.get:ok") {
        if (do2.data.length === 0) {
          // 用户没有提问过
          this.hasQuestion = false;
        } else {
          // 用户有提问
          this.hasQuestion = true;
          this.questionInfo = do2.data;
        }
      } else {
        uni.showToast({
          title: "查询失败，请检查网络",
          icon: "none",
        });
      }
    },
    // 跳转到问卷填写页面
    jumpToSurvey() {
      wx.redirectTo({
        url: "/pages/healthSurvey/index",
      });
    },
    //删除帖子
    async handleDeleteQuestion(item) {
      // 弹窗提示用户是否确定删除
      const do1 = await showModal("您确定要删除这个提问吗？");
      // 先从云存储中删除图片
      if (item.img.length !== 0) {
        const do2 = await wx.cloud.deleteFile({
          fileList: item.img,
        });
      }
      // 在数据库中删除这条提问
      const do3 = await wx.cloud.callFunction({
        name: "deletPost",
        data: {
          colPath: "healthPost",
          id: item._id,
        },
      });
      // 删除操作完成后给用户提示信息
      if (do3.errMsg === "cloud.callFunction:ok") {
        uni.showToast({
          title: "删除成功",
          icon: "success",
        });
        this.getQuestion();
      } else {
        uni.showToast({
          title: "删除失败，请检查网络",
          icon: "none",
        });
      }
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
  padding: 20rpx;
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
