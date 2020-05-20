<script>
export default {
  onLaunch() {
    if (!wx.cloud) {
      console.error("请使用2.2.3或以上的基础库以使用云能力");
    } else {
      // 初始化云开发环境
      wx.cloud.init({
        env: "tryout-edov9",
        traceUser: true,
      });
    }
  }
};
</script>

<style>
/*每个页面公共css */
@import "./styles/base.wxss";
</style>
