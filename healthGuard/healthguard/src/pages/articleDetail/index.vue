<template>
  <view class="article-detail">
    <!-- 背景图 -->
    <img
      class="articleBg"
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589444600493&di=c4993f30f838ffe20d7762374fd7adbb&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Fback_pic%2F04%2F82%2F98%2F1958ce71473fd48.jpg%2521%2Ffwfh%2F804x1429%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue%2Fwatermark%2Ftext%2FOTDorr7orqE%3D%2Ffont%2Fsimkai%2Falign%2Fsoutheast%2Fopacity%2F20%2Fsize%2F50"
      alt
    />
    <!-- 背景图 -->
    <scroll-view scroll-y class="article-content">
      <view class="content-source">
        <view class="source-url">来源：{{article.source}}</view>
        <view class="source-author">编辑：{{article.author}}</view>
      </view>
      <rich-text :nodes="article.content"></rich-text>
      <view class="source-time">发表时间：{{timeFormat(article.pTime)}}</view>
    </scroll-view>
  </view>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      article: {},
      node: [{}]
    };
  },
  onLoad() {
    let that = this;
    // 从缓存中获取文章内容
    wx.getStorage({
      key: "curArticle",
      success(res) {
        that.article = res.data;
      }
    });
  },
  methods: {
    timeFormat(time) {
      return moment(time * 1000).format("YYYY-DD-MM");
    }
  }
};
</script>

<style lang="scss" scoped>
.article-detail {
  .articleBg {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    z-index: -1;
  }
  .article-content {
    margin-top: 30px;
    padding: 0 40rpx;
    height: calc(100vh - 60px);
    .content-source {
      display: flex;
      margin: 20rpx 0;
      .source-url {
        margin-right: 20rpx;
      }
    }
    .source-time {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>