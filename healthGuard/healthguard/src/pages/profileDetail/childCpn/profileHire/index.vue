<template>
  <!-- ===================HIRE=================== -->
  <view class="hire">
    <!-- ================tab栏 开始================ -->
    <tab-control
      ref="tabControl"
      :titles="tabTitle"
      @tabClick="tabClicked"
    ></tab-control>
    <!-- ================tab栏 结束================ -->

    <!-- ==============招聘内容部分 开始============== -->
    <scroll-view @scrolltolower="handleToLower" scroll-y class="hire-content">
      <swiper-action @swiperAction="handleSwip">
        <Hire
          @opitionClicked="optionClick"
          :inProfile="true"
          :hireInfos="curTabIndex === 0 ? longTermInfo : shortTermInfo"
        >
          <view class="empty" slot="empty">列表空空如也，快去发布信息吧</view>
        </Hire>
      </swiper-action>
    </scroll-view>
    <!-- ==============招聘内容部分 结束============== -->
  </view>
</template>

<script>
import TabControl from "components/TabControl";
import SwiperAction from "components/swiperAction";
// 引入求职模板
import Hire from "pages/service/childCpn/hire/index";
import { showModal, getStorage } from "@/api/index";

const db = wx.cloud.database();
export default {
  components: {
    TabControl,
    Hire,
    SwiperAction,
  },
  data() {
    return {
      tabTitle: ["长期招聘信息", "短期招聘信息"],
      curTabIndex: 0,
      longTermParams: {
        skip: 0,
        limit: 3,
        hasMore: true,
      },
      shortTermParams: {
        skip: 0,
        limit: 3,
        hasMore: true,
      },
      // 数据容器，把数据传给渲染模板
      longTermInfo: [],
      shortTermInfo: [],
    };
  },
  mounted() {
    // 初次挂载时请求数据库数据
    this.getList("long");
    this.getList("short");
  },
  methods: {
    tabClicked(index) {
      if (this.curTabIndex !== index) {
        this.curTabIndex = index;
      } else {
        return;
      }
    },
    async getList(period) {
      // period="long" & "short"
      uni.showLoading({
        title: "加载中",
      });
      // 从缓存中获取openid
      const do1 = await getStorage("userOpenId");
      // 根据openid查询用户发的信息
      const do2 = await wx.cloud.callFunction({
        name: "getJobList",
        data: {
          // 根据函数的实参判断请求长期还是短期
          JobColpath: `${period === "long" ? "longTermJob" : "shortTermJob"}`,
          limit:
            period === "long"
              ? this.longTermParams.limit
              : this.shortTermParams.limit,
          skip:
            period === "long"
              ? this.longTermParams.skip
              : this.shortTermParams.skip,
          openid: do1.data,
        },
      });
      if (do2.errMsg === "cloud.callFunction:ok") {
        // 数据库请求成功
        // 把数据存进数据容器中;
        if (do2.result.data.length === 0) {
          // 没有下一页数据了
          period === "long"
            ? (this.longTermParams.hasMore = false)
            : (this.shortTermParams.hasMore = false);
          uni.showToast({
            title: "没有更多数据了",
            icon: "none",
          });
          return;
        }
        period === "long"
          ? this.longTermInfo.push(...do2.result.data)
          : this.shortTermInfo.push(...do2.result.data);
        uni.hideLoading();
      } else {
        // 数据库请求失败
        uni.showToast({
          title: "请求失败，请检查网络",
          icon: "none",
        });
      }
    },
    // 页面滚动到了底部
    handleToLower() {
      // 判断是加载哪个版块需要加载更多内容
      if (this.curTabIndex === 0) {
        // 判断是否有下一页
        if (this.longTermParams.hasMore) {
          this.longTermParams.skip += this.longTermParams.limit;
          this.getList("long");
        } else {
          // 没有下一页
          uni.showToast({
            title: "没有更多数据了",
            icon: "none",
          });
          return;
        }
      } else {
        if (this.shortTermParams.hasMore) {
          this.shortTermParams.skip += this.shortTermParams.limit;
          this.getList("short");
        } else {
          uni.showToast({
            title: "没有更多数据了",
            icon: "none",
          });
          return;
        }
      }
    },
    async optionClick(item) {
      await showModal("您确定要删除这条信息吗？");
      // 进行删除操作
      await uni.showLoading({
        title: "正在删除",
      });
      const do2 = await wx.cloud.callFunction({
        name: "deletPost",
        data: {
          // 判断是删除哪个集合中的数据
          colPath: `${
            this.curTabIndex === 0 ? "longTermJob" : "shortTermJob"
          }`,
          id: item._id,
        },
      });
      // 删除操作完成后给用户提示信息
      if (do2.errMsg === "cloud.callFunction:ok") {
        uni.showToast({
          title: "删除成功",
          icon: "success",
        });
        // 判断刷新哪一个数据
        if (this.curTabIndex === 0) {
          // 刷新长期的参数
          this.longTermInfo = [];
          this.longTermParams = {
            skip: 0,
            limit: 3,
            hasMore: true,
          };
          this.getList("long");
        } else {
          // 刷新短期的参数
          this.shortTermInfo = [];
          this.shortTermParams = {
            skip: 0,
            limit: 3,
            hasMore: true,
          };
          this.getList("short");
        }
      } else {
        uni.showToast({
          title: "删除失败，请检查网络",
          icon: "none",
        });
      }
    },
    // 手指滑动换页
    handleSwip(e) {
      if (e.direction === "right" && this.curTabIndex === 1) {
        // 手指向右滑动，页面向左
        this.curTabIndex = 0;
        this.$refs.tabControl.curIndex = 0;
      } else if (e.direction === "left" && this.curTabIndex === 0) {
        this.curTabIndex = 1;
        this.$refs.tabControl.curIndex = 1;
      } else {
        uni.showToast({
          title: "没有页面啦，不要再滑啦！",
          icon: "none",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.hire {
  background-color: #eeeeee;
  .hire-content {
    height: calc(100vh - 40px);
    .empty {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 30rpx;
    }
  }
}
</style>
