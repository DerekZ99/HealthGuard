<template>
  <view class="section-detail">
    <view class="detail-head">
      <view v-if="infoDetail.title" class="head-title">
        {{ infoDetail.title }}
      </view>
      <view>来源：有问必答网</view>
      <view class="head-img">
        <img mode="widthFix" :src="infoDetail.img" alt="" />
      </view>
      <view v-if="infoDetail.desc" class="head-desc">
        {{ infoDetail.desc }}
      </view>
    </view>
    <view v-if="infoDetail.pathogeny" class="detail-body">
      <view class="body-title">
        症状概况
      </view>
      <tab-control :titles="infoTitle" @tabClick="tabClicked"></tab-control>
      <view class="body-content">
        <view class="content-text" v-if="curTabIndex === 0">{{
          infoDetail.pathogeny
        }}</view>
        <view class="content-text" v-if="curTabIndex === 1">{{
          infoDetail.inspect
        }}</view>
        <view class="content-text" v-if="curTabIndex === 2">{{
          infoDetail.diagnosis
        }}</view>
        <view class="content-text" v-if="curTabIndex === 3">{{
          infoDetail.prevent
        }}</view>
        <view class="content-text" v-if="curTabIndex === 4">{{
          infoDetail.relieve
        }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import TabControl from "components/TabControl";

const db = wx.cloud.database();
export default {
  components: { TabControl },
  data() {
    return {
      infoDetail: {},
      infoTitle: ["病因", "检查", "诊断", "预防", "缓解"],
      curTabIndex: 0,
    };
  },
  onLoad(options) {
    // 这里写死是为了偷懒  this.getInfo(options.id) 才是原文
    if (options.id === "头晕") {
      this.getInfo(options.id);
    } else if (options.id === "打呼噜") {
      this.getInfo(options.id);
    } else if (options.id === "发热") {
      this.getInfo(options.id);
    } else {
      this.getInfo("头晕");
    }
  },
  methods: {
    getInfo(title) {
      let that = this;
      uni.showLoading({
        title: "正在加载中..",
      });
      db.collection("healthQuickCheck")
        .where({
          title,
        })
        .get({
          success(res) {
            that.infoDetail = res.data[0];
            uni.hideLoading();
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
    tabClicked(index) {
      this.curTabIndex = index;
    },
  },
};
</script>

<style lang="scss" scoped>
.section-detail {
  padding: 30rpx;
  .detail-head {
    .head-title {
      font-size: 40rpx;
      font-weight: bold;
      display: flex;
      justify-content: center;
      color: #000;
    }

    .head-img {
      margin: 20rpx 0;
      img {
        width: 100%;
      }
    }

    .head-desc {
      color: #000;
      font-size: 34rpx;
      text-indent: 2em;
    }
  }

  .detail-body {
    .body-title {
      font-size: 34rpx;
      color: #000;
      margin: 40rpx 0;
      display: flex;
      align-items: center;
      font-weight: bold;
    }

    .body-content {
      background-color: #f3f8f1;
      border: 3rpx solid #e5e5e5;
      padding: 20rpx;
      .content-text {
        text-indent: 2em;
        font-size: 32rpx;
        color: #000;
      }
    }
  }
}
</style>
