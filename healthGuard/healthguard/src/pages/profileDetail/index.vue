<template>
  <view class="profile-detail">
    <!-- =============详情页内容 开始============= -->
    <view class="detail-item">
      <profile-about v-if="profileId==='about'"></profile-about>
      <profile-health v-if="profileId==='health'"></profile-health>
      <profile-hire v-if="profileId==='hire'"></profile-hire>
      <profile-job v-if="profileId==='job'"></profile-job>
    </view>
    <!-- =============详情页内容 结束 =============-->
  </view>
</template>

<script>
import ProfileAbout from "./childCpn/profileAbout/index";
import ProfileHealth from "./childCpn/profileHealth/index";
import ProfileHire from "./childCpn/profileHire/index";
import ProfileJob from "./childCpn/profileJob/index";

export default {
  components: {
    ProfileAbout,
    ProfileHealth,
    ProfileHire,
    ProfileJob
  },
  onLoad(options) {
    this.profileId = options.id;
    //判断加载哪一些数据

  },
  data() {
    return {
      profileId: "about"
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
