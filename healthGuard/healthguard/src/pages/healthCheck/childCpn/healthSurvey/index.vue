<template>
  <view class="survey">
    <view class="survey-title">老年人健康状况的调查问卷</view>
    <form class="survey-form" @submit="handleSubmit">
      <view class="form-item">
        28. 您认为以上服务开展的周期大概多长？
        <text class="multi">【多选题】</text>

        <view class="special-table">
          <view class="special-row">
            <view class="row-left"></view>
            <view class="row-right">
              <view class="right-item">每天</view>
              <view class="right-item">一周</view>
              <view class="right-item">一个季度</view>
              <view class="right-item">半年</view>
            </view>
          </view>
        </view>

        <view class="special-table">
          <view class="special-row">
            <view class="row-left">健康讲座</view>
            <check-group name class="row-right">
              <view class="right-item">
                <checkbox></checkbox>
              </view>
              <view class="right-item">
                <checkbox></checkbox>
              </view>
              <view class="right-item">
                <checkbox></checkbox>
              </view>
              <view class="right-item">
                <checkbox></checkbox>
              </view>
            </check-group>
          </view>
        </view>
      </view>

      <!-- ==============复制的内容 开始============== -->
      <!-- <view class="wrapper">
        <view class="form-item">
          1.您的性别？
          <radio-group name="1.您的性别？">
            <radio value="男" checked>男</radio>
            <radio value="女">女</radio>
          </radio-group>
        </view>

        <view class="form-item">
          2.您的年龄?
          <radio-group name="2.您的年龄">
            <radio value="70-75">70-75</radio>
            <radio value="76-80">76-80</radio>
            <radio value="81-85">81-85</radio>
            <radio value="86-90">86-90</radio>
            <radio value="90周岁以上">90周岁以上</radio>
          </radio-group>
        </view>

        <view class="form-item">
          3.您的居住情况？
          <radio-group name="3.您的居住情况？">
            <radio value="独居">独居</radio>
            <radio value="与老伴同住">与老伴同住</radio>
            <radio value="跟子女同住">跟子女同住</radio>
            <radio value="与其他人同住">与其他人同住</radio>
          </radio-group>
        </view>

        <view class="form-item">
          4. 您平时的生活起居照顾情况如何？
          <radio-group name="4. 您平时的生活起居照顾情况如何？">
            <radio value="自理">自理</radio>
            <radio value="保姆">保姆</radio>
            <radio value="子女照顾">子女照顾</radio>
            <radio value="老伴照顾">老伴照顾</radio>
            <radio value="其他">其他</radio>
          </radio-group>
        </view>

        <view class="form-item">
          5. 您的医疗情况是以下哪种?
          <radio-group name="5. 您的医疗情况是以下哪种">
            <radio value="城镇职工基本医疗保险">城镇职工基本医疗保险</radio>
            <radio value="城镇居民基本医疗保险">城镇居民基本医疗保险</radio>
            <radio value="新型农村合作医疗">新型农村合作医疗</radio>
            <radio value="贫困救助">贫困救助</radio>
            <radio value="商业医疗保险">商业医疗保险</radio>
            <radio value="全公费">全公费</radio>
            <radio value="全自费">全自费</radio>
            <radio value="其他">其他</radio>
          </radio-group>
        </view>

        <view class="form-item">
          6. 您会定期去做医疗检查吗？
          <radio-group name="6. 您会定期去做医疗检查吗？">
            <radio value="会定期去">会定期去</radio>
            <radio value="不定期去">不定期去</radio>
            <radio value="不会去">不会去</radio>
          </radio-group>
        </view>

        <view class="form-item">
          7. 是否需要定期到社区/医院取药？
          <radio-group name="7. 是否需要定期到社区/医院取药？">
            <radio value="是">是</radio>
            <radio value="否">否</radio>
          </radio-group>
        </view>

        <view class="form-item">
          8. H、谁到社区/医院取药？
          <radio-group name="8. H、谁到社区/医院取药？">
            <radio value="本人">本人</radio>
            <radio value="老伴">老伴</radio>
            <radio value="陪人">陪人</radio>
            <radio value="家属">家属</radio>
            <radio value="其他">其他</radio>
          </radio-group>
        </view>

        <view class="form-item">
          9. 最近的社区卫生站/医院步行过去需要多长时间？(按老人实际步行速度)
          <radio-group name="9. 最近的社区卫生站/医院步行过去需要多长时间？(按老人实际步行速度)">
            <radio value="5分钟以内">5分钟以内</radio>
            <radio value="6-10分钟">6-10分钟</radio>
            <radio value="10-15分钟">10-15分钟</radio>
            <radio value="16-20分钟">16-20分钟</radio>
            <radio value="0分钟以上">20分钟以上</radio>
          </radio-group>
        </view>

        <view class="form-item">
          10. 您家里有哪些健康检测仪器？(您现在用着哪些特殊的生活用品？)
          <text class="multi">【多选题】</text>
          <checkbox-group name="10. 您家里有哪些健康检测仪器？(您现在用着哪些特殊的生活用品？)">
            <checkbox value="体温计">体温计</checkbox>
            <checkbox value="血糖仪">血糖仪</checkbox>
            <checkbox value="老人床垫">老人床垫</checkbox>
            <checkbox value="按摩器">按摩器</checkbox>
            <checkbox value="轮椅">轮椅</checkbox>
            <checkbox value="血压计">血压计</checkbox>
            <checkbox value="助听器">助听器</checkbox>
            <checkbox value="假牙">假牙</checkbox>
            <checkbox value="老花镜">老花镜</checkbox>
            <checkbox value="拐杖">拐杖</checkbox>
            <checkbox value="其他">其他</checkbox>
          </checkbox-group>
        </view>

        <view class="form-item">
          11. 您的健康状况如何？(自评)
          <radio-group name="11. 您的健康状况如何？(自评)">
            <radio value="很好">很好</radio>
            <radio value="好">好</radio>
            <radio value="一般">一般</radio>
            <radio value="不太好">不太好</radio>
          </radio-group>
        </view>

        <view class="form-item">
          12. 您每天的睡眠状况如何？
          <radio-group name="12. 您每天的睡眠状况如何？">
            <radio value="很快入睡">很快入睡</radio>
            <radio value="少梦入睡快、多梦">少梦入睡快、多梦</radio>
            <radio value="难以入睡">难以入睡</radio>
          </radio-group>
        </view>

        <view class="form-item">
          13. 您每餐的饭量大概多少？
          <radio-group name="13. 您每餐的饭量大概多少？">
            <radio value="两碗">两碗</radio>
            <radio value="一碗">一碗</radio>
            <radio value="半碗">半碗</radio>
            <radio value="几调羹">几调羹</radio>
          </radio-group>
        </view>

        <view class="form-item">
          14. 您是否患有以下慢性病症？
          <text class="multi">【多选题】</text>
          <checkbox-group name="14. 您是否患有以下慢性病症？">
            <checkbox value="高血压">高血压</checkbox>
            <checkbox value="冠心病">冠心病</checkbox>
            <checkbox value="糖尿病">糖尿病</checkbox>
            <checkbox value="高脂血">高脂血</checkbox>
            <checkbox value="症慢性支气管炎">症慢性支气管炎</checkbox>
            <checkbox value="脂肪肝">脂肪肝</checkbox>
            <checkbox value="关节炎">关节炎</checkbox>
            <checkbox value="慢性胃炎">慢性胃炎</checkbox>
            <checkbox value="其他">其他</checkbox>
            <checkbox value="无">无</checkbox>
          </checkbox-group>
        </view>

        <view class="form-item">
          15. 半年内您测量过以上哪几项？
          <text class="multi">【多选题】</text>
          <checkbox-group name="15. 半年内您测量过以上哪几项？">
            <checkbox value="高血压">高血压</checkbox>
            <checkbox value="冠心病">冠心病</checkbox>
            <checkbox value="糖尿病">糖尿病</checkbox>
            <checkbox value="高脂血症">高脂血症</checkbox>
            <checkbox value="慢性支气管炎">慢性支气管炎</checkbox>
            <checkbox value="脂肪肝">脂肪肝</checkbox>
            <checkbox value="关节炎">关节炎</checkbox>
            <checkbox value="慢性胃炎">慢性胃炎</checkbox>
            <checkbox value="其他">其他</checkbox>
            <checkbox value="无">无</checkbox>
          </checkbox-group>
        </view>

        <view class="form-item">
          16. 您的视力情况如何？
          <radio-group name="16. 您的视力情况如何？">
            <radio value="0">0</radio>
            <radio value="1">1</radio>
            <radio value="2">2</radio>
            <radio value="3">3</radio>
            <radio value="4">4</radio>
            <radio value="5">5</radio>
            <radio value="6">6</radio>
            <radio value="8">8</radio>
            <radio value="9">9</radio>
            <radio value="10">10</radio>
          </radio-group>
        </view>

        <view class="form-item">
          17. 您的听力情况如何？
          <radio-group name="17. 您的听力情况如何？">
            <radio value="0">0</radio>
            <radio value="1">1</radio>
            <radio value="2">2</radio>
            <radio value="3">3</radio>
            <radio value="4">4</radio>
            <radio value="5">5</radio>
            <radio value="6">6</radio>
            <radio value="8">8</radio>
            <radio value="9">9</radio>
            <radio value="10">10</radio>
          </radio-group>
        </view>

        <view class="form-item">
          18. 你的行动能力如何？
          <radio-group name="18. 你的行动能力如何？">
            <radio value="0">0</radio>
            <radio value="1">1</radio>
            <radio value="2">2</radio>
            <radio value="3">3</radio>
            <radio value="4">4</radio>
            <radio value="5">5</radio>
            <radio value="6">6</radio>
            <radio value="8">8</radio>
            <radio value="9">9</radio>
            <radio value="10">10</radio>
          </radio-group>
        </view>
        <view class="form-item">
          19. 近一个月内精神状况如何？
          <radio-group name="19. 近一个月内精神状况如何？">
            <radio value="精力充足">精力充足</radio>
            <radio value="精力一般">精力一般</radio>
            <radio value="容易疲倦">容易疲倦</radio>
          </radio-group>
        </view>

        <view class="form-item">
          20. 您平时的饮食习惯如何？
          <text class="multi">【多选题】</text>
          <checkbox-group name="20. 您平时的饮食习惯如何">
            <checkbox value="软食">软食</checkbox>
            <checkbox value="硬食">硬食</checkbox>
            <checkbox value="软硬混合">软硬混合</checkbox>
            <checkbox value="荤食">荤食</checkbox>
            <checkbox value="素食">素食</checkbox>
            <checkbox value="荤素均匀">荤素均匀</checkbox>
            <checkbox value="嗜咸">嗜咸</checkbox>
            <checkbox value="嗜甜">嗜甜</checkbox>
            <checkbox value="嗜油">嗜油</checkbox>
          </checkbox-group>
        </view>
        <view class="form-item">
          21. 您日常是否规律(定时)用餐？
          <radio-group name="21. 您日常是否规律(定时)用餐？">
            <radio value="一日四餐(早/中/晚/夜)">一日四餐(早/中/晚/夜)</radio>
            <radio value="一日三餐(早/中/晚/夜)">一日三餐(早/中/晚/夜)</radio>
            <radio value="一日两餐(早/中/晚/夜)">一日两餐(早/中/晚/夜)</radio>
            <radio value="否">否</radio>
          </radio-group>
        </view>

        <view class="form-item">
          22. 您日常是否规律(定时)服药？
          <radio-group name=" 22. 您日常是否规律(定时)服药？">
            <radio value="准时">准时</radio>
            <radio value="偶尔忘记">偶尔忘记</radio>
            <radio value="经常忘记">经常忘记</radio>
            <radio value="无需服药">无需服药</radio>
          </radio-group>
        </view>

        <view class="form-item">
          23. 您平时参加体育锻炼吗？如果参加选择最常用的锻炼方式
          <text class="multi">【多选题】</text>
          <checkbox-group name="23. 您平时参加体育锻炼吗？如果参加选择最常用的锻炼方式">
            <checkbox value="散步">散步</checkbox>
            <checkbox value="跑步">跑步</checkbox>
            <checkbox value="自行车">自行车</checkbox>
            <checkbox value="舞蹈">舞蹈</checkbox>
            <checkbox value="太极">太极</checkbox>
            <checkbox value="上下楼梯">上下楼梯</checkbox>
            <checkbox value="球类">球类</checkbox>
            <checkbox value="游泳">游泳</checkbox>
            <checkbox value="其他">其他</checkbox>
            <checkbox value="无">无</checkbox>
          </checkbox-group>
        </view>

        <view class="form-item">
          24. 您日常是否嗜烟？
          <radio-group name="24. 您日常是否嗜烟？">
            <radio value="是">是</radio>
            <radio value="否">否</radio>
          </radio-group>
        </view>

        <view class="form-item">
          25. 您日常是否嗜酒？
          <radio-group name="25. 您日常是否嗜酒？">
            <radio value="是">是</radio>
            <radio value="否">否</radio>
          </radio-group>
        </view>

        <view class="form-item">
          26. 您对现在居家养老服务给予老年人的关注程度满意吗？
          <radio-group name="26. 您对现在居家养老服务给予老年人的关注程度满意吗？">
            <radio value="很满意">很满意</radio>
            <radio value="较满意">较满意</radio>
            <radio value="不太满意">不太满意</radio>
            <radio value="不满意">不满意</radio>
          </radio-group>
        </view>

        <view class="form-item">
          27. 在日常服务中您希望得到以下哪些服务？
          <text class="multi">【多选题】</text>
          <checkbox-group name="27. 在日常服务中您希望得到以下哪些服务？">
            <checkbox value="健康讲座">健康讲座</checkbox>
            <checkbox value="义诊服务">义诊服务</checkbox>
            <checkbox value="定期量血压">定期量血压</checkbox>
            <checkbox value="定期测血糖">定期测血糖</checkbox>
            <checkbox value="定期监督服药">定期监督服药</checkbox>
            <checkbox value="协助分药">协助分药</checkbox>
            <checkbox value="陪同就医">陪同就医</checkbox>
            <checkbox value="其他">其他</checkbox>
          </checkbox-group>
        </view>

        <view class="form-item">
          29. 您觉得生活中在健康层次带来最大的不便来自下列那方面？
          <radio-group name="29. 您觉得生活中在健康层次带来最大的不便来自下列那方面？">
            <radio value="经济状况">经济状况</radio>
            <radio value="身体物理状况">身体物理状况</radio>
            <radio value="心理觉得孤独">心理觉得孤独</radio>
            <radio value="社会忽视">社会忽视</radio>
            <radio value="其他">其他</radio>
          </radio-group>
        </view>

        <view class="form-item">
          30. 是否愿意参加健康小组交流会？
          <radio-group name="30. 是否愿意参加健康小组交流会？">
            <radio value="是">是</radio>
            <radio value="否">否</radio>
          </radio-group>
        </view>

        <view class="form-item">
          31. 您是否有意愿改善自身的健康情况？
          <radio-group name="31. 您是否有意愿改善自身的健康情况？">
            <radio value="是">是</radio>
            <radio value="否">否</radio>
          </radio-group>
        </view>
      </view>-->
      <!--============== 复制的内容 结束============== -->

      <!-- 提交按钮 开始 -->
      <button form-type="submit" type="primary">提交</button>
      <!-- 提交按钮 结束 -->
    </form>
  </view>
</template>

<script>
export default {
  methods: {
    handleSubmit(e) {
      console.log(e);
    }
  }
};
</script>

<style lang="scss" scoped>
.survey {
  padding: 20rpx;
  background-color: #f7f7f7;
  .survey-title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 38rpx;
    margin: 20rpx 0;
    color: #000;
    font-weight: bold;
  }

  .survey-form {
    .form-item {
      font-size: 32rpx;
      font-weight: bold;
      margin-bottom: 40rpx;
      color: #000;

      .multi {
        font-size: 30rpx;
        color: #666;
      }

      .special-table {
        .special-row {
          display: flex;
          .row-left {
            width: 33.333%;
            display: flex;
            align-items: center;
            font-size: 30rpx;
          }

          .row-right {
            flex: 1;
            display: flex;

            .right-item {
              flex: 1;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 28rpx;
              font-weight: normal;
            }
          }
        }
      }

      radio-group {
        radio {
          display: block;
          border: 3rpx solid #eee;
          background-color: #fff;
          padding: 20rpx;
          font-size: 28rpx;
        }
      }
      checkbox-group {
        checkbox {
          display: block;
          border: 3rpx solid #eee;
          background-color: #fff;
          padding: 20rpx;
          font-size: 28rpx;
        }
      }
    }

    button {
    }
  }
  radio:first-child {
    margin-top: 10rpx;
  }

  checkbox:first-child {
    margin-top: 10rpx;
  }
}
</style>