<template>
  <view class="service">
    <!-- ============tab 开始============ -->
    <tab-control @tabClick="tabClicked" :titles="tabItems"></tab-control>
    <!-- ============tab 结束============ -->

    <!-- ============信息内容 开始============ -->
    <scroll-view @scrolltolower="handleToLower" scroll-y class="content">
      <view v-show="curTabIndex === 1">
        <Hire :hireInfos="hireInfo"></Hire>
      </view>
      <view v-show="curTabIndex === 0">
        <Job :jobInfos="jobInfo"></Job>
      </view>
    </scroll-view>
    <!-- ============信息内容 结束============ -->
  </view>
</template>

<script>
import TabControl from "components/TabControl";
import Hire from "./childCpn/hire/index";
import Job from "./childCpn/job/index";

const db = wx.cloud.database();
export default {
  components: {
    TabControl,
    Hire,
    Job,
  },
  data() {
    return {
      serviceType: "",
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
        limit: 2,
        skip: 0,
        hasMore: true,
      },
      jobParams: {
        limit: 2,
        skip: 0,
        hasMore: true,
      },
    };
  },

  onLoad(options) {
    this.serviceType = options.id;
    if (options.id === "long") {
      wx.setNavigationBarTitle({
        title: "长期服务",
      });
      // 根据option.id给数据库集合名称赋值
      this.hireColpath = "longTermJob";
      this.JobColpath = "longTermPost";
    } else {
      wx.setNavigationBarTitle({
        title: "短期服务",
      });
      this.hireColpath = "shortTermJob";
      this.JobColpath = "shortTermPost";
    }
    // 初次发送请求获取数据
    this.getHire();
    this.getJob();
  },
  methods: {
    tabClicked(index) {
      this.curTabIndex = index;
    },
    // 页面滚动到了底部
    handleToLower() {
      uni.showLoading({
        title:"数据加载中"
      })
      // 判断是加载哪个版块需要加载更多内容
      if (this.curTabIndex === 0) {
        // 判断是否有下一页
        if (this.jobParams.hasMore) {
          this.jobParams.skip += this.jobParams.limit;
          this.getJob();
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
          this.getHire();
        } else {
          uni.showToast({
            title: "没有更多数据了",
            icon: "none",
          });
          return;
        }
      }
    },
    // 请求招聘数据
    getHire() {
      let that = this;
      if (this.hireParams.skip === 0) {
        db.collection(this.hireColpath)
          .limit(this.hireParams.limit)
          .get({
            success(res) {
              // 数据请求成功后存入本地变量中
              that.hireInfo.push(...res.data);
              uni.hideLoading()
            },
            fail(err) {
              console.log(err);
            },
          });
      } else {
        db.collection(this.hireColpath)
          .limit(this.hireParams.limit)
          .skip(this.hireParams.skip)
          .get({
            success(res) {
              // 判断是否还有下一页数据
              if (res.data.length === 0) {
                // 没有更多数据了
                that.hireParams.hasMore = false;
                uni.showToast({
                  title: "没有更多数据了",
                  icon: "none",
                });
                return;
              }
              // 数据请求成功后存入本地变量中
              that.hireInfo.push(...res.data);
              uni.hideLoading()
            },
            fail(err) {
              console.log(err);
            },
          });
      }
    },
    // 请求求职数据
    getJob() {
      let that = this;
      // 小程序的沙雕设定 skip为0的时候不能带上skip
      if (this.jobParams.skip === 0) {
        db.collection(this.JobColpath)
          .limit(this.jobParams.limit)
          .get({
            success(res) {
              // 数据请求成功后存入本地变量中
              that.jobInfo.push(...res.data);
              uni.hideLoading()
            },
            fail(err) {
              console.log(err);
            },
          });
      } else {
        db.collection(this.JobColpath)
          .skip(this.jobParams.skip)
          .limit(this.jobParams.limit)
          .get({
            success(res) {
              // 判断是否还有下一页数据
              if (res.data.length === 0) {
                // 没有更多数据了
                that.jobParams.hasMore = false;
                uni.showToast({
                  title: "没有更多数据了",
                  icon: "none",
                });
                return;
              }
              // 数据请求成功后存入本地变量中
              that.jobInfo.push(...res.data);
              uni.hideLoading()
            },
            fail(err) {
              console.log(err);
            },
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
