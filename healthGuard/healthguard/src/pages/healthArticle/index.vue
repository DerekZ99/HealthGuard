<template>
  <view>
    <!-- 背景图 -->
    <img class="bgImg" src="cloud://tryout-edov9.7472-tryout-edov9-1302058975/appbg/timg.jpg" alt />
    养生之道
  </view>
</template>

<script>
export default {
  onLoad() {
    this.getArticle();
  },
  methods: {
    getArticle() {
      // this.request({
      //   url:"https://www.ys137.com/css/js/article_right.js?v=20160419112"
      // }).then((res)=>{
      //     console.log(res);
      // }).catch((err)=>{
      //   console.log(err);
      // })
    }
  }
};
</script>

<style scoped>
.bgImg {
  position: absolute;
  height: 100%;
  z-index: -1;
}
</style>
