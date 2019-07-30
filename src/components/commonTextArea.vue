<template>
  <div class="commonTextArea">
    <i class="iconText">{{text}}</i>
    <el-input
      class="selection"
      type="textarea"
      :placeholder="placeholderText"
      v-model="textarea"
      maxlength="300"
      resize="none"
      show-word-limit
      :disabled="isDisabled"
    >
    </el-input>
  </div>
</template>

<script>
  export default {
    name: "commonTextArea",
    data() {
      return {
        textarea: this.value
      }
    },
    props: {
      value: {default: ''},                      // 双向绑定value
      text: {default: ''},                      // title
      isDisabled: {default: false},             // 是否可编辑
      placeholderText: {default: '请输入内容'}
    },
    watch: {
      value(val) {
        this.textarea = val;
      },
      textarea(val) {
        this.$emit('input', val)
      }
    }
  }
</script>

<style lang="scss">
  .commonTextArea {
    padding-left: 59px;
    padding-right: 76px;
    display: flex;

    .iconText {
      width: 80px;
      text-align: left;
      font-size: 16px;
    }

    .selection{
      line-height: 30px;
      textarea{
        width: 460px;
        height: 160px;
        padding: 0 0;
        margin: 0 0;
        text-indent: 8px;
        box-sizing: border-box;
      }
      .el-textarea__inner{
        margin: 0 0;
        padding: 0 0;
      }
      .el-input__count{
        right: 20px;
        color:#F65860;
      }
    }
  }
</style>
