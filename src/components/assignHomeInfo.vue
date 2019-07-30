<template>
  <div class="assignHomeInfo">
    <p class="assignHomeInfoTitle">家族病史</p>
    <commonTextInput v-model="faIllnessHistory" :text="'父亲病史'"></commonTextInput>
    <commonTextInput v-model="moIllnessHistory" :text="'母亲病史'"></commonTextInput>
    <commonTextInput v-model="bsIllnessHistory" :text="'兄弟姐妹病史'"></commonTextInput>
    <commonTextInput v-model="chIllnessHistory" :text="'儿女病史'"></commonTextInput>
    <commonTextInput v-model="inIllnessHistory" :text="'遗传病史'"></commonTextInput>
  </div>
</template>

<script>
  import commonTextInput from './commonTextInput';             // 公共输入框
  export default {
    name: "assignHomeInfo",
    components: {
      commonTextInput
    },
    data() {
      return {
        faIllnessHistory: '',             // 父亲病史
        moIllnessHistory: '',             // 母亲病史
        bsIllnessHistory: '',             // 兄弟姐妹病史
        chIllnessHistory: '',             // 儿女病史
        inIllnessHistory: ''              // 遗传病史
      }
    }
  }
</script>

<style lang="scss">
  .assignHomeInfo {
    .assignHomeInfoTitle {
      padding: 8px 0;
      text-align: left;
      font-weight: bold;
      font-size: 18px;
    }
  }
</style>
