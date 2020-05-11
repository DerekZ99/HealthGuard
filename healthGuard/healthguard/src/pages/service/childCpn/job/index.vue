<template>
  <view class="job">
    <view class="job-item" v-for="item in jobInfos" :key="item._id">
      <!-- ============内容头部部分 开始============ -->
      <view class="job-header">
        <view class="header-avatar">
          <img
            mode="widthFix"
            :src="
              item.userImg === ''
                ? 'cloud://tryout-edov9.7472-tryout-edov9-1302058975/imgHolder.jpg'
                : item.userImg
            "
          />
        </view>
        <view class="info-name">{{ item.post.posterName }}</view>
        <view class="info-phone">电话：{{ item.post.phone }}</view>
      </view>
      <!-- ============内容头部部分 结束============ -->

      <!-- -===========内容中间部分 开始-=========== -->
      <view class="job-body">
        <view class="body-title">工作经历：</view>
        <view class="body-experience">{{ item.post.experience }}</view>
        <view class="body-title">可提供的服务:</view>
        <view class="body-service">
          {{ item.post.service }}
        </view>
      </view>
      <!-- -===========内容中间部分 结束-=========== -->

      <!--============ 内容底部部分 开始============ -->
      <view class="job-footer">
        <view class="footer-time">发布于 {{ timeFormat(item.pTime) }}</view>
      </view>
    </view>
    <!-- ============内容底部部分 结束============ -->
    
  </view>
</template>

<script>
import moment from "moment";

export default {
  props: {
    jobInfos: {
      type: Array,
      default: [],
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
.job-item {
  background-color: #ffffff;
  margin: 20rpx 0;
  padding: 30rpx;
  .job-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header-avatar {
      width: 160rpx;
      height: 160rpx;
      border-radius: 50%;
      overflow: hidden;
    }

    .info-name {
      line-height: 60rpx;
      color: #000;
      height: 60rpx;
      font-size: 32rpx;
    }

    .info-phone {
      line-height: 60rpx;
      color: #000;
      height: 60rpx;
    }
  }

  .job-body {
    .body-title {
      font-size: 32rpx;
      font-weight: bold;
      margin-top: 30rpx;
      color: #000;
    }

    .body-experience {
      font-size: 30rpx;
      color: #000;
      line-height: 40rpx;
    }

    .body-service {
      font-size: 30rpx;
      color: #000;
      line-height: 40rpx;
    }
  }

  .job-footer {
    margin-top: 30rpx;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
