<template>
  <view class="contact">
    <view class="contact-detail" v-for="(item, index) in agent" :key="index">
      <view class="detail-item">{{ item.name }}</view>
      <view class="detail-item">地址​：{{ item.address }}</view>
      <view class="detail-item" @click="dell(item.phone)"
        >电话​：{{ item.phone }}</view
      >
    </view>

    <!-- 关闭按钮 开始 -->
    <button @click="handleClose">关闭</button>
    <!-- 关闭按钮 结束 -->
  </view>
</template>

<script>
export default {
  data() {
    return {
      agent: [
        {
          name: "阳光天使社工机构 ",
          address: "新杨区青云路85号",
          phone: "8458 0156",
        },
        {
          name: "​新杨区居委会 ",
          address: "新杨区林荫路88号",
          phone: "​8587 0908",
        },
        {
          name: "乐养老年护理机构  ",
          address: "黄龙区玉山路75号",
          phone: "8756 7907",
        },
        {
          name: "黄龙区党群服务中心 ",
          address: "黄龙区玉林路70号",
          phone: "8794 5568​",
        },
        {
          name: "临河区卫生站 ",
          address: "临河区羽南路65号",
          phone: "8898 7765​",
        },
        {
          name: "奉乐社工机构 ",
          address: "临河区绍清路77号",
          phone: "8905 7508",
        },
      ],
    };
  },
  methods: {
    handleClose() {
      this.$emit("closeWindow");
    },
    dell(num) {
      uni.makePhoneCall({
        phoneNumber: num.replace(" ", ""),
      });
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
    .detail-item:nth-child(3) {
      color: #3ca8ff;
      text-decoration: underline;
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
