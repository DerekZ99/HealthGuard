<template>
  <view>
    <!-- 背景图 -->
    <img
      class="bgImg"
      src="cloud://tryout-edov9.7472-tryout-edov9-1302058975/appbg/timg.jpg"
      alt
    />

    <!-- ===============文章列表 开始=============== -->
    <view v-for="item in article" :key="item._id">
      <view v-html="item.content"></view>
    </view>
    <!-- ===============文章列表 结束=============== -->
  </view>
</template>

<script>
const db = wx.cloud.database();
export default {
  data() {
    return {
      article: [],
    };
  },
  onLoad() {
    this.getArticle();
  },
  methods: {
    getArticle() {
      // let that = this;
      // db.collection("articles")
      //   .get()
      //   .then((res) => {
      //     console.log(res);
      //     this.article = res.data;
      //   });
    },
  },
};
</script>

<style lang="scss" scoped>
.bgImg {
  position: absolute;
  height: 100%;
  z-index: -1;
}
</style>
