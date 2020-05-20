<template>
  <view class="contact">
    <view class="contact-detail">
      <view class="detail-item">阳光天使社工机构</view>
      <view class="detail-item">地址​：新杨区青云路85号</view>
      <view class="detail-item">电话​：8458 0156</view>
    </view>

    <view class="contact-detail">
      <view class="detail-item">​新杨区居委会</view>
      <view class="detail-item">地址​：新杨区林荫路88号</view>
      <view class="detail-item">电话​：8458 0156</view>
    </view>

    <view class="contact-detail">
      <view class="detail-item">乐养老年护理机构</view>
      <view class="detail-item">地址​：黄龙区玉山路75号</view>
      <view class="detail-item">电话​：8756 7907</view>
    </view>

    <view class="contact-detail">
      <view class="detail-item">黄龙区党群服务中心</view>
      <view class="detail-item">地址​：黄龙区玉林路70号</view>
      <view class="detail-item">电话​：8794 5568​</view>
    </view>

    <view class="contact-detail">
      <view class="detail-item">临河区卫生站</view>
      <view class="detail-item">地址​：临河区羽南路65号</view>
      <view class="detail-item">电话​：8898 7765​</view>
    </view>

    <view class="contact-detail">
      <view class="detail-item">奉乐社工机构</view>
      <view class="detail-item">地址​：临河区绍清路77号</view>
      <view class="detail-item">电话​：8905 7508</view>
    </view>

    <!-- 关闭按钮 开始 -->
    <button @click="handleClose">关闭</button>
    <!-- 关闭按钮 结束 -->
  </view>
</template>

<script>
export default {
  methods: {
    handleClose() {
      this.$emit("closeWindow");
    },
  },
};
</script>

<style lang="scss" scoped>
.contact {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 20rpx;
  border-radius: 30rpx;
  font-size: 32rpx;
  color: #000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  .contact-detail {
    margin: 20rpx 0;
    color: #000;
    
  .detail-item:nth-child(1) {
    font-weight: bold;
  }
}
  button {
    width: 50%;
    margin: 20rpx auto 0;
    background-color: red;
    font-size: 30rpx;

    color: #fff;
  }
}
</style>
