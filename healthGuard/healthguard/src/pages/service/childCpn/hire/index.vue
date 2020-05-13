<template>
  <view class="hire">
    <!-- ============页面为空占位符 开始============ -->
    <slot name="empty" v-if="hireInfos.length === 0"></slot>
    <!-- ============页面为空占位符 结束============ -->

    <!-- ============招聘信息模块 开始============ -->
    <view class="hire-item" v-for="item in hireInfos" :key="item._id">
      <view class="hire-header">
        <view class="header-title">{{ item.post.jobTitle }}</view>
        <view class="header-salary">{{ item.post.salary }}</view>
      </view>

      <view class="hire-body">
        <view class="body-desc">
          <view class="desc-title">职位介绍：</view>
          <view class="desc-content">{{ item.post.jobDesc }}</view>
          <view class="desc-title">职位要求：</view>
          <view class="desc-content">
            {{ item.post.jobReq }}
          </view>
        </view>
        <view class="body-info">
          <view class="info-workplace">
            <view class="info-title">工作地址：</view>
            <view class="info-content">{{ item.post.workplace }}</view>
          </view>

          <view class="info-worktime">
            <view class="info-title">工作时间：</view>
            <view class="info-content"
              >从{{ item.post.workTime[0] }}:00至{{
                item.post.workTime[1]
              }}:00</view
            >
          </view>
        </view>
      </view>

      <view class="hire-footer">
        <view class="footer-name">
          {{ item.post.posterName }}
          <span class="footer-phone">{{ item.post.phone }}</span>
        </view>
        <view class="footer-time">发布于 {{ timeFormat(item.pTime) }}</view>
      </view>

      <!-- ==============删除按钮 开始============== -->
      <view v-if="inProfile" class="delete">
        <button @click="optionClick(item)" class="deleteBtn">
          删除
        </button>
      </view>
      <!-- ==============删除按钮 结束============== -->
    </view>
    <!-- ============招聘信息模块 结束============ -->
  </view>
</template>

<script>
import moment from "moment";

export default {
  props: {
    hireInfos: {
      type: Array,
      default: [],
    },
    inProfile:{
      type:Boolean,
      default:false
    }
  },
  methods: {
    timeFormat(time) {
      return moment(time).format("YYYY-MM-DD");
    },
    optionClick(item) {
      this.$emit("opitionClicked", item);
    },
  },
};
</script>

<style lang="scss" scoped>
.hire-item {
  background-color: #fff;
  padding: 30rpx;
  margin: 20rpx 0;
  .hire-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header-title {
      font-size: 40rpx;
      font-weight: bold;
      color: #000;
    }
    .header-salary {
      font-size: 36rpx;
      color: #46bcf9;
    }
  }

  .hire-body {
    margin: 30rpx 0;
    .body-desc {
      color: #000;

      .desc-title {
        font-weight: bold;
        font-size: 32rpx;
        margin-top: 30rpx;
      }

      .desc-content {
        font-size: 32rpx;
        line-height: 40rpx;
      }
    }

    .body-info {
      display: flex;
      margin-top: 30rpx;
      color: #000;
      font-size: 30rpx;
      .info-workplace {
        flex: 1;

        padding-right: 30rpx;
        .info-title {
          font-weight: bold;
        }
      }

      .info-worktime {
        flex: 1;
        .info-title {
          font-weight: bold;
        }
      }
    }
  }

  .hire-footer {
    display: flex;
    justify-content: space-between;

    .footer-name {
      color: #000;
      font-size: 32rpx;
      .footer-phone {
        margin-left: 30rpx;
      }
    }
  }
  .delete {
    margin-top:30rpx;
    width: 100%;
    display: flex;
    justify-content: center;
    .deleteBtn {
      line-height: 50rpx;
      color: #fff;
      width: 300rpx;
      height: 60rpx;
      background-color: red;
    }
  }
}
</style>
