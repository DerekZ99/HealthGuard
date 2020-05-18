<template>
  <view class="has-question">
    <!-- 病人信息区域 开始 -->
    <view class="question-title">
      {{ questionInfos.title }}
    </view>
    <view class="poster-info">
      发布于{{ timeFormat(questionInfos.pTime) }} | 年龄：{{
        questionInfos.age
      }}岁 | 性别：{{ questionInfos.sex }}
    </view>
    <view class="poster-desc">
      <view class="desc-title">健康咨询描述：</view>
      <view class="desc-detail">
        {{ questionInfos.detail }}
      </view>
    </view>
    <view class="poster-img" v-if="questionInfos.img.length !== 0">
      <img
        v-for="(items, index) in questionInfos.img"
        :key="index"
        :src="items"
        mode="widthFix"
      />
    </view>
    <!-- 病人信息区域 结束 -->

    <!-- 医生回复区域 开始 -->
    <view class="reply">
      <view class="replay-title">
        医生回复区:
      </view>

      <view v-if="questionInfos.replyed" class="has-replay">
        <!-- 医生信息部分 开始 -->
        <view class="doc-info">
          <view class="info-left">
            <img mode="widthFix" :src="questionInfos.docImg" />
          </view>
          <view class="info-right">
            <view class="right-row">
              <view class="row-name">
                {{ questionInfos.docName }}
              </view>
              <view class="row-docInfo">
                {{ questionInfos.docHos }} {{ questionInfos.docJob }}
              </view>
            </view>
            <view class="right-row"> 擅长：{{ questionInfos.docGood }} </view>
          </view>
        </view>
        <!-- 医生信息部分 结束 -->

        <!-- 医生评论详情 开始 -->
        <view class="doc-comment">
          {{ questionInfos.comment }}
        </view>
        <!-- 医生评论详情 结束 -->
      </view>

      <view v-else class="no-replay">
        暂时还没有收到医生的回复，请耐心等待
      </view>
    </view>
    <!-- 医生回复区域 结束 -->
  </view>
</template>

<script>
import moment from "moment";

export default {
  props: {
    questionInfos: {
      type: Object,
      default: {},
    },
  },
  methods: {
    timeFormat(time) {
      return moment(time).format("YYYY-MM-DD");
    },
  },
};
</script>

<style lang="scss" scoped>
.has-question {
  .question-title {
    font-weight: bold;
    font-size: 32rpx;
    color: #000;
    padding: 10rpx 0;
  }

  .poster-info {
    font-size: 30rpx;
    padding: 10rpx 0;
    border-bottom: 3rpx solid #ccc;
  }

  .poster-desc {
    .desc-title {
      padding: 10rpx 0;
      font-size: 30rpx;
    }

    .desc-detail {
      font-size: 30rpx;
      color: #000;
      padding-bottom: 20rpx;
    }
  }

  .poster-img {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 20rpx;
    img {
      width: 33.33%;
      border: 4rpx solid #fff;
    }
  }
  // 医生回复区域
  .reply {
    border-top: 3rpx dotted #cccccc;

    .replay-title {
      font-size: 30rpx;
      padding: 20rpx 0;
    }

    .has-replay {
      .doc-info {
        display: flex;
        .info-left {
          border-right: 3rpx solid #ffffff;
          width: 20%;
          img {
            width: 100%;
          }
        }

        .info-right {
          border-left: 3rpx solid #ffffff;
          width: 80%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .right-row {
            display: flex;
            align-items: center;
            font-size: 30rpx;

            .row-name {
              font-size: 32rpx;
              color: #1669ac;
              font-weight: bold;
            }

            .row-docInfo {
              margin-left: 20rpx;
            }
          }
        }
      }

      .doc-comment {
        margin-top: 20rpx;
        font-size: 30rpx;
        color: #000;
        background-color: #fdf9c9;
        padding: 20rpx;
        position: relative;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      }
      .doc-comment::after {
        content: "";
        position: absolute;
        top: -35rpx;
        left: 5%;
        width: 0;
        height: 0;
        border: 20rpx solid;
        border-color: transparent transparent #fdf9c9;
      }
    }
    .no-replay {
      padding: 30rpx 0;
      font-size: 30rpx;
      color: #000;
      text-align: center;
    }
  }
}
</style>
