<template>
  <view class="about">
    <!-- ==============背景图 开始============== -->
    <img
      class="aboutBg"
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589449159738&di=edf921238e02cda475f4cf80c065922f&imgtype=0&src=http%3A%2F%2Fattachments.gfan.com%2Fforum%2F201703%2F06%2F190359l79ol7uz2dk0ndkl.jpg"
      alt
    />
    <!-- ==============背景图 结束============== -->

    <!-- ===============内容介绍部分 开始=============== -->
    <view class="intro">
      <p>惠通养老小程序是为社工群体和年长人士设计的，年长人士或其子女可以通过这个平台发布招聘信息寻求长期或短期服务。</p>
      <p>相对的，社工或社区服务者，也可以通过这个平台发布求职信息为年长人士提供服务。</p>
      <p>通过这个平台，用户无需进行复杂以及繁琐的注册和登录操作，就可以方便快捷的发布信息</p>
      <p>此外惠通还提供了养生之道平台来分享养生经验，年长人士不需要再长途跋涉的去养生馆花冤枉钱</p>
      <p>若您对惠通感到满意，可以将惠通分享给身边的人。若您对惠通不满意或觉得有需要改进的地方，欢迎您点击下方的“意见反馈”按钮告诉我。</p>
      <p>感谢您对惠通的支持，您的健康就是我的动力</p>
      <button @click="feedbackClick">意见反馈</button>
    </view>
    <!-- ===============内容介绍部分 结束=============== -->
  </view>
</template>

<script>
export default {
  methods: {
    feedbackClick() {
      wx.navigateTo({
        url: "/pages/writeFeedback/index"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.aboutBg {
  position: fixed;
  height: 100%;
  z-index: -1;
}
.intro {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20rpx;
  border-radius: 20rpx;
  width: 70vw;
  p {
    text-indent: 2em;
    margin: 10rpx 0;
    color: #000;
  }
  button {
    font-size: 28rpx;
    margin-top: 20rpx;
    margin-bottom: 10rpx;
    width: 200rpx;
    height: 60rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>