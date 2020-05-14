<template>
  <view class="feedback">
    <form class="feedback-form"  @submit="formSubmit">
      <view class="title">意见反馈：</view>
      <textarea class="textarea" name="feedback" placeholder="请输入您的意见"></textarea>
      <button class="submitBtn" form-type="submit" type="primary">提交</button>
    </form>
  </view>
</template>

<script>
const db = wx.cloud.database()
export default {
  data() {
    return {

    };
  },
  methods:{
    formSubmit(e){
      if(e.detail.value.feedback===""){
        // 表单为空，阻止提交
        uni.showToast({
          title:"请输入内容后再提交",
          icon:"none"
        })
        return
      } else {
        // 表单有值，可以提交
       db.collection("feedback").add({
         data: {
           postTime:new Date().getTime(),
           content: e.detail.value.feedback
         },
         success(res){
           uni.showToast({
             title:"提交成功",
             icon:"none"
           })
           setTimeout(() => {
             wx.navigateBack({
               delta: 2
             })
           }, 1500);
         },
         fail(err){
            uni.showToast({
             title:"提交失败",
             icon:"none"
           })
           return
         }
       })
       
      }
      
    }
  }
};
</script>

<style lang="scss" scoped>
.feedback {
 
  .feedback-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  
    .textarea {
      border: 3rpx solid #ccc;
      height: 500rpx;
      margin: 20rpx 0;
      background: #fff;
    }

    .submitBtn {
      width: 200rpx;
      margin: 0 auto;
    }
  }
}
</style>