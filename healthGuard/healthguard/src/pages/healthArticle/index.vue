<template>
  <view>
    <!-- 背景图 -->
    <img
      class="bgImg"
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589396548008&di=635fc256d1a1219eb6a4b7b06929d56a&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F8788f420ebb781196813faf5e84f4ac6d4b097513c980-O6xX7m_fw658"
      alt
    />
    <!-- ===============文章列表 开始=============== -->
    <scroll-view @scrolltolower="handleToLower" scroll-y class="article-list">
      <view @click="listClick(item)" class="list-item" v-for="item in article" :key="item._id">
        <view class="item-header">
          <img class="header-cover" :src="item.cover" alt />
          <view class="header-info">
            <view class="info-title">{{item.title}}</view>
            <view class="info-desc">{{item.desc}}</view>
          </view>
        </view>
        <view class="item-footer">发布于：{{timeFormat(item.pTime)}}</view>
      </view>
    </scroll-view>
    <!-- ===============文章列表 结束=============== -->
  </view>
</template>

<script>
const db = wx.cloud.database();
import moment from "moment";

export default {
  data() {
    return {
      article: [],
      params: {
        skip: 0,
        limit: 6
      },
      hasMore: true
    };
  },
  onLoad() {
    this.getArticle();
  },
  methods: {
    getArticle() {
      let that = this;
      uni.showLoading({
        title: "加载中"
      });
      db.collection("articles")
        .skip(this.params.skip)
        .limit(this.params.limit)
        .get()
        .then(res => {
          if (res.data.length === 0) {
            // 没有更多数据了
            this.hasMore = false;
            uni.showToast({
              title: "没有更多数据了",
              icon: "none"
            });
            return;
          }
          this.article.push(...res.data);
          uni.hideLoading();
        });
    },
    // 滚动到底部加载更多数据
    handleToLower() {
      if (this.hasMore) {
        this.params.skip += this.params.limit;
        this.getArticle();
      } else {
        // 没有更多数据了
        this.hasMore = false;
        uni.showToast({
          title: "没有更多数据了",
          icon: "none"
        });
        return;
      }
    },
    // 事件格式化
    timeFormat(time) {
      return moment(time * 1000).format("YYYY-MM-DD");
    },
    // 点击列表跳转到文章详情
    listClick(item) {
      // 将文章详情内容放入缓存中
      wx.setStorage({
        key: "curArticle",
        data: item,
        success(res) {
          wx.navigateTo({
            url: "/pages/articleDetail/index",
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.bgImg {
  position: fixed;
  height: 100%;
  z-index: -1;
}
.article-list {
  padding: 0 20rpx;
  height: 100vh;
  .list-item {
    border-bottom: 3rpx solid #000;
    padding: 30rpx 0;
    .item-header {
      display: flex;
      flex-wrap: wrap;

      .header-cover {
        margin-right: 20rpx;
        width: 170rpx;
        height: 120rpx;
      }

      .header-info {
        height: 120rpx;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .info-title {
          font-size: 32rpx;
          font-weight: bold;
          color: #000;
        }

        .info-desc {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          color: #000;
        }
      }
    }

    .item-footer {
      margin-top: 20rpx;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
