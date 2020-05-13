<template>
<!-- ===================HIRE=================== -->
  <view class="hire">
    <!-- ================tab栏 开始================ -->
    <tab-control :titles="tabTitle" @tabClick="tabClicked"></tab-control>
    <!-- ================tab栏 结束================ -->

    <!-- ==============招聘内容部分 开始============== -->
    <scroll-view @scrolltolower="handleToLower" scroll-y class="hire-content">
      <Hire @opitionClicked="optionClick" :inProfile="true" :hireInfos="curTabIndex===0?longTermInfo:shortTermInfo">
        <view class="empty" slot="empty">列表空空如也，快去发布信息吧</view>
      </Hire>
    </scroll-view>
    <!-- ==============招聘内容部分 结束============== -->
  </view>
</template>

<script>
import TabControl from "components/TabControl";
// 引入求职模板
import Hire from "pages/service/childCpn/hire/index";

const db = wx.cloud.database();
export default {
  components: {
    TabControl,
    Hire,
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
      colPath: "",
    };
  },
  mounted() {
    // 初次挂载时请求数据库数据
    this.getLongTermList();
    this.getShortTermList();
  },
  methods: {
    tabClicked(index) {
      if (this.curTabIndex !== index) {
        this.curTabIndex = index;
      } else {
        return;
      }
    },
    // 根据用户openid获取用户发布的求职信息
    getLongTermList() {
      let that = this;
      uni.showLoading({
        title: "加载中",
      });
      wx.getStorage({
        key: "userOpenId",
        success(res) {
          // 从缓存获取openID成功之后通过openID查询用户发布的信息
          wx.cloud.callFunction({
            name: "getJobList",
            data: {
              JobColpath: "longTermJob",
              limit: that.longTermParams.limit,
              skip: that.longTermParams.skip,
              openid: res.data,
            },
            success(res) {
              // 请求成功之后把数据存进数据容器中
              if (res.result.data.length === 0) {
                // 没有下一页数据了
                that.longTermParams.hasMore = false;
                uni.showToast({
                  title: "没有更多数据了",
                  icon: "none",
                });
                return;
              }
              that.longTermInfo.push(...res.result.data);
              uni.hideLoading();
            },
            fail(err) {
              console.log(err);
            },
          });
        },
      });
    },
    getShortTermList() {
      let that = this;
      uni.showLoading({
        title: "加载中",
      });
      wx.getStorage({
        key: "userOpenId",
        success(res) {
          // 从缓存获取openID成功之后通过openID查询用户发布的信息
          wx.cloud.callFunction({
            name: "getJobList",
            data: {
              JobColpath: "shortTermJob",
              limit: that.shortTermParams.limit,
              skip: that.shortTermParams.skip,
              openid: res.data,
            },
            success(res) {
              // 请求成功之后把数据存进数据容器中
              if (res.result.data.length === 0) {
                // 没有下一页数据了
                that.shortTermParams.hasMore = false;
                uni.showToast({
                  title: "没有更多数据了",
                  icon: "none",
                });
                return;
              }
              that.shortTermInfo.push(...res.result.data);
              uni.hideLoading();
            },
            fail(err) {
              console.log(err);
            },
          });
        },
      });
    },
    // 页面滚动到了底部
    handleToLower() {
      // 判断是加载哪个版块需要加载更多内容
      if (this.curTabIndex === 0) {
        // 判断是否有下一页
        if (this.longTermParams.hasMore) {
          this.longTermParams.skip += this.longTermParams.limit;
          this.getLongTermList();
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
          this.getShortTermList();
        } else {
          uni.showToast({
            title: "没有更多数据了",
            icon: "none",
          });
          return;
        }
      }
    },
    optionClick(item) {
      // 进行删除操作
      uni.showLoading({
        title: "正在删除",
      });
      // 判断是删除哪个集合中的数据
      this.curTabIndex === 0
        ? (this.colPath = "longTermJob")
        : (this.colPath = "shortTermJob");
      let that = this;
      // 调用云函数删除数据
      wx.cloud.callFunction({
        name: "deletPost",
        data: {
          colPath: that.colPath,
          id: item._id,
        },
        success(res) {
          // 删除成功后重新刷新页面
          if (that.curTabIndex === 0) {
            // 判断刷新哪一个页面
            (that.longTermInfo = []),
              (that.longTermParams = {
                skip: 0,
                limit: 3,
                hasMore: true,
              });
            that.getLongTermList();
            uni.showToast({
              title:"删除成功",
              icon:"none"
            })
          } else {
            (that.shortTermInfo = []),
              (that.shortTermParams = {
                skip: 0,
                limit: 3,
                hasMore: true,
              });
            that.getShortTermList();
            uni.showToast({
              title:"删除成功",
              icon:"none"
            })
          }
        },
        fail(err) {
          console.log(err);
          uni.showToast({
            title: "删除失败",
            icon: "none",
          });
        },
      });
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
