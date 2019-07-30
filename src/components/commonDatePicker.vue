<template>
  <div class="commonDatePicker clearfix">
    <i class="fl iconText">{{text}}</i>
    <el-date-picker
      class="fl"
      v-model="dateValue"
      :disabled="isDisabled"
      :picker-options="pickerOptions"
      type="date"
      format="yyyy-MM-dd"
      value-format="yyyy-MM-dd"
      :placeholder="placeholderText"
      :class="[toggleFlag ? 'closeIcon' : 'openIcon' ]"
      v-on:focus="toggleState"
      v-on:blur="toggleState"
    >
    </el-date-picker>
  </div>
</template>

<script>
  export default {
    name: "commonDatePicker",
    data() {
      return {
        dateValue: this.value,
        toggleFlag: false
      }
    },
    props: {
      value: {default: ''},                     // 双向绑定value
      text: {default: ''},                      // title
      isDisabled: {default: false},             // 是否可编辑
      placeholderText: {default: '选择日期'},
      pickerOptions: {default:()=>{}}           // 日期筛选方法
    },
    watch:{
      value(val) {
        this.textValue = val;
      },
      dateValue(val){
        // console.log(val, 'date');
        this.$emit('input', val)
      }
    },
    methods: {
      toggleState(){
        this.toggleFlag = !this.toggleFlag;
      }
    }
  }
</script>

<style lang="scss">
  .commonDatePicker {
    line-height: 30px;
    height: 60px;

    i {
      font-size: 16px;
    }

    .el-date-editor {
      margin-left: 10px;
      width: 200px;
      height: 30px;
      line-height: 30px;
      box-sizing: border-box;
    }

    .el-input__inner {
      height: 30px;
      line-height: 30px;
      text-indent: 8px;
      padding: 0 0 ;
      margin: 0 0 ;
    }

    .el-icon-date{
      display: none;
    }
    .el-input__icon{
      &::before{
        display: none !important;
      }
    }

    .openIcon, .closeIcon{
       &::before{
         display: block;
         content: '';
         position: absolute;
         right:12px;
         top: 50%;
         transform: translateY(-50%);
         width: 16px;
         height: 14px;
         background: url("../assets/btn_time.png") no-repeat center center;
         background-size: cover;
       }
    }

  }
</style>
