<template>
  <view class="content">
    <!-- 背景图 -->
    <img
      class="bgImg"
      src="cloud://tryout-edov9.7472-tryout-edov9-1302058975/appbg/indexbg.jpg"
      alt=""
    />
    <!-- 轮播部分 开始 -->
    <swiper class="swiper" autoplay indicator-dots circular>
      <swiper-item v-for="item in banner" :key="item._id">
        <img mode="aspectFill" :src="item.img" alt="" />
      </swiper-item>
    </swiper>
    <!-- 轮播部分 结束 -->
    <swiper-action @swiperAction="handleSwip">
      <!-- 信息部分 开始 -->
      <view class="section-box">
        <navigator url="/pages/service/index?id=short" class="section-item">
          短期服务
        </navigator>
        <navigator url="/pages/service/index?id=long" class="section-item">
          长期服务
        </navigator>
        <navigator url="/pages/healthCheck/index" class="section-item">
          健康检查
        </navigator>
        <navigator url="/pages/healthArticle/index" class="section-item">
          养生之道
        </navigator>
      </view>
      <!-- 信息部分 结束 -->

      <!-- 公告部分 开始 -->
      <view class="news">
        <!-- 公告标题部分 -->
        <view class="news-title">
          <view class="title-top">
            社区公告
            <img
              class="tabIcon"
              src="cloud://tryout-edov9.7472-tryout-edov9-1302058975/globalIcon/louder_flat.png"
              alt=""
            />
          </view>
        </view>
        <!-- 公告内容部分 -->
        <view class="new-content">
          <ul :class="{ anim: animation }">
            <li v-for="item in newList" :key="item.id" class="news-item">
              ● {{ item.text }}
            </li>
          </ul>
        </view>
      </view>
      <!-- 公告部分 结束 -->

      <!-- 二维码部分 开始 -->
      <view class="join">
        <img
          show-menu-by-longpress
          mode="widthFix"
          class="code"
          src="cloud://tryout-edov9.7472-tryout-edov9-1302058975/dcode.jpg"
          alt=""
        />
        <text class="join-text">
          加入我们
        </text>
      </view>
      <!-- 二维码部分 结束 -->

      <!-- 联系社工部分 开始 -->
      <view class="contact" @click="showContact">
        <view class="contact-icon">
          <img
            mode="widthFix"
            src="cloud://tryout-edov9.7472-tryout-edov9-1302058975/globalIcon/phonecall.png"
            alt=""
          />
        </view>
        <view class="contact-text">
          联系居委、社工
        </view>
      </view>
      <contact-info @closeWindow="showContact" v-if="isShowContact"></contact-info>
      <!-- 联系社工部分 结束 -->
    </swiper-action>
  </view>
</template>

<script>
import SwiperAction from "components/swiperAction";
import ContactInfo from "./childCpn/contactInfo/index";
const db = wx.cloud.database();
export default {
  components: {
    SwiperAction,
    ContactInfo,
  },
  data() {
    return {
      banner: [],
      animation: false,
      newList: [
        { text: "社区“中秋晚会”表演报名中", id: 1 },
        { text: "“爱的剪刀手”​社区义剪活动", id: 2 },
        { text: "“满天星”​为儿童捐书活动", id: 3 },
      ],
      timer: "",
      isShowContact: false,
    };
  },
  onLoad() {
    this.getBanner();
    let that = this;
    this.timer = setInterval(() => {
      that.scroll();
    }, 2000);
  },
  methods: {
    // 获取轮播图
    getBanner() {
      const banner = db.collection("banner");
      banner.get().then((res) => {
        this.banner = res.data;
      });
    },
    // 公告滚动
    scroll() {
      this.animation = true;
      setTimeout(() => {
        this.newList.push(this.newList[0]);
        this.newList.shift();
        this.animation = false;
      }, 1000);
    },
    // 手指滑动换页
    handleSwip(e) {
      if (e.direction === "left") {
        wx.switchTab({
          url: "/pages/addMore/index",
        });
      } else {
        uni.showToast({
          title: "左边没页面啦！",
          icon: "none",
        });
      }
    },
    // 显示社工电话
    showContact() {
      this.isShowContact = !this.isShowContact;
    },
  },
  onHide() {
    // 离开页面的时候清除定时器
    this.timer = [];
  },
  onShareAppMessage() {
    return {
      title: "健康通，守护您的健康",
      path: "/pages/index/index",
      imageUrl:
        "https://7472-tryout-edov9-1302058975.tcb.qcloud.la/banner/2girls.jpg?sign=28137c71e41d4de403e1e8e53499a034&t=1589547171",
    };
  },
};
</script>

<style lang="scss" scoped>
.swiper {
  height: 300rpx;
}
.bgImg {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
}
// 信息部分
.section-box {
  display: flex;
  flex-wrap: wrap;
  width: 85vw;
  margin: 0 auto;
  justify-content: space-between;
  .section-item {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20rpx 0;
    font-size: 40rpx;
    color: #fff;
    border-radius: 40rpx;
    margin: 30rpx 0 0;
    width: 40%;
    background-color: pink;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
}
// 公告部分
.news {
  overflow: hidden;
  background-color: #fefefe;
  height: 200rpx;
  margin: 30rpx auto;
  border-radius: 40rpx;
  width: 85vw;
  padding: 15rpx;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  .news-title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32rpx;
    font-weight: bold;
    padding-bottom: 15rpx;
    border-bottom: 3rpx solid;
    .title-top {
      position: relative;
      .tabIcon {
        position: absolute;
        left: -50rpx;
        top: 0;
        width: 40rpx;
        height: 40rpx;
      }
    }
  }

  .new-content {
    overflow: hidden;
    .news-item {
      padding-left: 15rpx;
      height: 50rpx;
      line-height: 50rpx;
      font-size: 32rpx;
      margin: 10rpx 0;
    }
  }
}
// 动画滚动
.anim {
  transition: all 1s;
  margin-top: -30px;
}
// 加入我们
.join {
  display: flex;
  flex-direction: column;
  align-items: center;
  .code {
    width: 240rpx;
  }

  .join-text {
    color: #000;
    font-size: 30rpx;
    margin-top: 28rpx;
  }
}

// 联系社工
.contact {
  position: absolute;
  bottom: 20rpx;
  right: 10rpx;

  .contact-icon {
    margin: 0 auto 20rpx;
    border-radius: 50%;
    width: 100rpx;
    height: 100rpx;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    background-color: #fe902f;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 70%;
    }
  }

  .contact-text {
    padding: 5rpx 15rpx;
    border-radius: 20rpx;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    color: #000;
  }
}
</style>
