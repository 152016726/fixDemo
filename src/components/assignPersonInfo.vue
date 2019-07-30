<template>
<div class="assignPersonInfo">
  <p class="assignPersonInfoTitle">个人病史</p>
  <div class="illnessHistory">
    <commonTextInput v-model="allergyHistory" :text="'过敏史'"></commonTextInput>
    <commonTextInput v-model="exposureHistory" :text="'暴露史'"></commonTextInput>
    <commonTextInput v-model="pastMedicalHistory " :text="'既往史'"></commonTextInput>
  </div>
  <p class="assignPersonInfoSubTitle">疾病史</p>
  <div class="illnessInfo">
    <commonTextInput v-model="illnessName" :text="'疾病名称'"></commonTextInput>
    <commonDatePicker v-model="approvalDate" :text="'审批日期'"></commonDatePicker>
    <commonTextInput v-model="clinicHospital" :text="'就诊医院'"></commonTextInput>
  </div>
  <commonTextInput v-model="disability" :text="'残疾情况'"></commonTextInput>
</div>
</template>

<script>
  import commonTextInput from './commonTextInput';
  import commonDatePicker from './commonDatePicker';

  export default {
    name: "assignPersonInfo",
    components: {
      commonTextInput,
      commonDatePicker
    },
    data() {
      return {
        allergyHistory: '',           // 过敏史
        exposureHistory: '',          // 暴露史
        pastMedicalHistory: '',       // 既往史
        illnessName: '',              // 疾病名称
        approvalDate: '',             // 审批日期
        clinicHospital: '',           // 就诊医院
        disability: ''                // 残疾情况
      }
    },
    props: {}
  }
</script>

<style lang="scss">
.assignPersonInfo{
  .assignPersonInfoTitle{
    padding: 8px 0;
    text-align: left;
    font-weight: bold;
    font-size: 18px;
  }
  .illnessHistory{
    .iconText{
      width: 65px;
    }
  }
  .assignPersonInfoSubTitle{
    text-indent: 17px;
    text-align: left;
    padding-bottom: 20px;
  }
  .illnessInfo{
    display: flex;
    >div{
      margin-right: 46px;
    }
  }
}
</style>
