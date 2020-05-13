<template>
  <view>
    <!-- 背景图 -->
    <img
      class="bgImg"
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589396548008&di=635fc256d1a1219eb6a4b7b06929d56a&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F8788f420ebb781196813faf5e84f4ac6d4b097513c980-O6xX7m_fw658"
      alt
    />
    <!-- ===============文章列表 开始=============== -->
    <view class="article-list">
      <view class="list-item" v-for="item in article" :key="item._id">
        <view class="item-header">
          <img class="header-cover" :src="item.cover" alt />
          <view class="header-info">
            <view class="info-title">{{item.title}}</view>
            <view class="info-desc">{{item.desc}}</view>
          </view>
        </view>
        <view class="item-footer">{{item.pTime}}</view>
      </view>
    </view>
    <!-- ===============文章列表 结束=============== -->
  </view>
</template>

<script>
const db = wx.cloud.database();
export default {
  data() {
    return {
      article: []
    };
  },
  onLoad() {
    this.getArticle();
  },
  methods: {
    getArticle() {
      let that = this;
      db.collection("articles")
        .get()
        .then(res => {
          console.log(res);
          this.article = res.data;
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
  .list-item {
    border-bottom: 3rpx solid #cccccc;
    padding: 30rpx 0;
    .item-header {
      display: flex;
      flex-wrap: wrap;
      .header-cover {
       
        width: 170rpx;
        height: 120rpx;
        margin-right: 20rpx;
      }

      .header-info {
        .info-title {
          font-size: 32rpx;
          color: #000;
        }

        .info-desc {
          margin-top: 20rpx;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
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
