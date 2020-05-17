<template>
  <view class="health-section">
    <!-- ================背景图 开始================ -->
    <img
      class="healthBg"
      src="http://i.serengeseba.com/uploads/i_2_4125141079x526029737_26.jpg"
      alt=""
    />
    <!-- ================背景图 结束================ -->

    <!-- ================搜索栏 开始================ -->
    <view class="search">
      <view class="search-left">
        <img
          src="cloud://tryout-edov9.7472-tryout-edov9-1302058975/globalIcon/icon-test.png"
          alt=""
        />
      </view>
      <view class="search-right">
        <input type="text" placeholder="请输入您想要咨询的内容" />
      </view>
    </view>
    <!-- ================搜索栏 结束================ -->

    <!-- ================中间内容部分 结束================ -->
    <scroll-view scroll-y class="post-content"> </scroll-view>

    <view class="quick-check">
      <view class="check-header">
        热门症状查询
      </view>
      <view class="check-box">
        <view class="box-item" 
              v-for="item in quickCheckItem" 
              :key="item.id"
              @click="handleItemClick(item.title)">
          <view class="item-text">
            {{item.title}}
          </view>
          <img v-if="item.img"
               class="itemBg"
               :src="item.img"
          />
          <view class="item-icon">
            <img
              src="cloud://tryout-edov9.7472-tryout-edov9-1302058975/globalIcon/go-to-link (1).png"
            />
          </view>
        </view>
      </view>
    </view>

    <!-- ================中间内容部分 结束================ -->

    <!-- ==============底部发布按钮 开始============== -->
    <view class="buttom">
      <button @click="handleWritePost">我要询问</button>
    </view>
    <!-- ==============底部发布按钮 结束============== -->
  </view>
</template>

<script>
export default {
  data() {
    return {
      quickCheckItem: [
        {
          title: "头晕",
          id: "1",
          img: "//cdn.120askimages.com/ask/images/index/hot_search_pic_001.jpg",
        },
        {
          title: "打呼噜",
          id: "2",
        },
        {
          title: "发热",
          id: "3",
        },
        {
          title: "发炎",
          id: "4",
        },
        {
          title: "乏力",
          id: "5",
        },
        {
          title: "溃疡",
          id: "6",
        },
        {
          title: "冷汗",
          id: "7",
          img:
            "//cdn.120askimages.com/ask/images/index/hot_search_pic_007.jpg ",
        },
        {
          title: "恶心",
          id: "8",
        },
        {
          title: "牙龈出血",
          id: "9",
        },
        {
          title: "瘙痒",
          id: "10",
        },
      ],
    };
  },
  methods: {
    handleWritePost() {
      wx.navigateTo({
        url: "/pages/writeHealthPost/index",
      });
    },
    handleItemClick(title){
       wx.navigateTo({
        url: `/pages/healthSectionDetail/index?id=${title}`,
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.health-section {
  padding: 0 20rpx;
  .healthBg {
    position: fixed;
    z-index: -1;
    height: 100%;
    top: 0;
    left: 0;
  }
  .search {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    top: 20rpx;
    z-index: 2;
    display: flex;
    width: 90%;
    align-items: center;
    height: 100rpx;
    background-color: #fff;
    border-radius: 50rpx;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 15rpx;

    .search-left {
      img {
        width: 50rpx;
        height: 50rpx;
        margin: 0 20rpx;
      }
    }

    .search-right {
      flex: 1;
      padding-right: 20rpx;
      input {
        font-size: 32rpx;
        color: #000;
        height: 50rpx;
        width: 100%;
      }
    }
  }

  .post-content {
    height: calc(100vh - 100rpx);
  }

  // 热门症状查询
  .quick-check {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 40rpx;
    padding: 30rpx;
    width: 90%;
    .check-header {
      color: #000;
      font-size: 30rpx;
    }

    .check-box {
      margin-top: 20rpx;
      display: flex;
      flex-wrap: wrap;
      .box-item {
        width: 33.33%;
        height: 0;
        border: 4rpx solid #ffffff;
        padding-top: 33.33%;
        height: 0;
        position: relative;
        .itemBg {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: -1;
        }

        .item-text {
          position: absolute;
          top: 20rpx;
          left: 0rpx;
          font-size: 30rpx;
          color: #000;
          padding: 10rpx 25rpx;
          background: rgba(255, 255, 255, 0.5);
        }

        .item-icon {
          position: absolute;
          bottom: 20rpx;
          right: 20rpx;
          width: 40rpx;
          height: 40rpx;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .box-item:nth-child(1) {
        width: 66.66%;
      }
       .box-item:nth-child(2) {
        background-color: #E2F4D8;
      }
      .box-item:nth-child(3) {
        background-color: #D8F1F4;
      }
      .box-item:nth-child(4) {
        background-color: #F4EBD8;
      }
      .box-item:nth-child(5) {
        background-color: #D8F4E7;
      }
      .box-item:nth-child(6) {
        background-color: #F2E9F6;
      }
      .box-item:nth-child(7) {
        width: 66.66%;
      }
      .box-item:nth-child(8) {
        background-color: #E2F4D8;
      }
      .box-item:nth-child(9) {
        background-color: #F9E3E8;
      }
      .box-item:nth-child(10) {
        background-color: #D8F1F4;
      }
    }
  }

  .buttom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100rpx;
    background-image: linear-gradient(#b2dfee, #46bcf9);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      border-radius: 40rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60%;
      height: 70%;
    }
  }
}
</style>
