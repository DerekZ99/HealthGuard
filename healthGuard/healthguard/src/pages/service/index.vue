<template>
  <view class="service">
    <!-- ============tab 开始============ -->
    <tab-control
      ref="tabControl"
      @tabClick="tabClicked"
      :titles="tabItems"
    ></tab-control>
    <!-- ============tab 结束============ -->

    <!-- ============信息内容 开始============ -->
    <scroll-view @scrolltolower="handleToLower" scroll-y class="content">
      <swiper-action @swiperAction="handleSwip">
        <view v-show="curTabIndex === 1">
          <Hire :hireInfos="hireInfo"></Hire>
        </view>
        <view v-show="curTabIndex === 0">
          <Job :jobInfos="jobInfo"></Job>
        </view>
      </swiper-action>
    </scroll-view>
    <!-- ============信息内容 结束============ -->
  </view>
</template>

<script>
import TabControl from "components/TabControl";
import Hire from "./childCpn/hire/index";
import Job from "./childCpn/job/index";
import SwiperAction from "components/swiperAction";

const db = wx.cloud.database();
export default {
  components: {
    TabControl,
    Hire,
    Job,
    SwiperAction,
  },
  data() {
    return {
      // 数据库集合路径
      hireColpath: "",
      JobColpath: "",
      tabItems: ["求职信息", "招聘信息"],
      // 数据容器
      hireInfo: [],
      jobInfo: [],
      curTabIndex: 0,
      // 数据参数
      hireParams: {
        limit: 3,
        skip: 0,
        hasMore: true,
      },
      jobParams: {
        limit: 3,
        skip: 0,
        hasMore: true,
      },
    };
  },

  onLoad(options) {
    wx.setNavigationBarTitle({
      title: `${options.id === "long" ? "长期服务" : "短期服务"}`,
    });
    this.hireColpath = `${
      options.id === "long" ? "longTermJob" : "shortTermJob"
    }`;
    this.JobColpath = `${
      options.id === "long" ? "longTermPost" : "shortTermPost"
    }`;
    // 初次发送请求获取数据
    this.getData("job");
    this.getData("hire");
  },
  methods: {
    tabClicked(index) {
      // 防止用户多次点击出现报错
      if (this.curTabIndex !== index) {
        this.curTabIndex = index;
      } else {
        return;
      }
    },
    // 页面滚动到了底部
    handleToLower() {
      // 判断是加载哪个版块需要加载更多内容
      if (this.curTabIndex === 0) {
        // 判断是否有下一页
        if (this.jobParams.hasMore) {
          this.jobParams.skip += this.jobParams.limit;
          this.getData("job");
        } else {
          // 没有下一页
          uni.showToast({
            title: "没有更多数据了",
            icon: "none",
          });
          return;
        }
      } else {
        if (this.hireParams.hasMore) {
          this.hireParams.skip += this.hireParams.limit;
          this.getData("hire");
        } else {
          uni.showToast({
            title: "没有更多数据了",
            icon: "none",
          });
          return;
        }
      }
    },
    async getData(type) {
      // type的值 hire & job
      uni.showLoading({
        title: "数据加载中",
      });
      // 向数据库请求数据
      const do1 = await wx.cloud
        .callFunction({
          name: "getJobList",
          data: {
            JobColpath: type === "hire" ? this.hireColpath : this.JobColpath,
            limit:
              type === "hire" ? this.hireParams.limit : this.jobParams.limit,
            skip: type === "hire" ? this.hireParams.skip : this.jobParams.skip,
          },
        })
        .then((res) => {
          // 判断是否还有下一页数据
          if (res.result.data.length === 0) {
            // 没有更多数据了
            // that.hireParams.hasMore = false;
            type === "hire"
              ? (this.hireParams.hasMore = false)
              : (this.jobParams.hasMore = false);
            uni.showToast({
              title: "没有更多数据了",
              icon: "none",
            });
            return;
          }
          // 数据请求成功后存入本地变量中
          type === "hire"
            ? this.hireInfo.push(...res.result.data)
            : this.jobInfo.push(...res.result.data);
          uni.hideLoading();
        });
    },
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
.service {
  background-color: #f5f5f5;
}
.content {
  height: calc(100vh - 40px);
}
.test {
  width: 300px;
  height: 300px;
  background-color: red;
}
</style>
