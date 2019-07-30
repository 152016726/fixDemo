<template>
  <div class="commonTextInput">
    <div class="commonTextInputContent clearfix">
      <i class="fl iconText">{{text}}</i>
      <input :type="encrypt ? 'password' : 'text'"
             class="inputType fl"
             :class="{active: active}"
             v-model.lazy="textValue"
             :placeholder="isDisabled ? '' : placeholderText"
             :disabled="isDisabled"
             v-on:blur="textOnblur"
             v-on:focus="textOnFocus"
      />
    </div>
    <div class="errorTips" v-if="errorFlag">{{errorTips}}</div>
  </div>
</template>

<script>
  export default {
    name: "commonTextInput",
    data() {
      return {
        textValue: this.value,
        errorFlag: false,
        active: false            // 输入框活跃状态
      }
    },
    props: {
      value: {default: ''},                     // 双向绑定value                  必填
      encrypt: {default: false},                // 是否加密
      isDisabled: {default: false},             // 是否可编辑
      text: {default: ''},                      // title
      placeholderText: {default: '请输入'},
      errorTips: {default: '输入格式错误'},     // 错误提示语
      errorState: {default: false},             // 错误状态
      rexpRule: {default: ''}                   // type:RegExp   描述:正则表达式
    },
    watch: {
      value(val) {
        this.textValue = val;
      },
      textValue(val) {
        if (this.rexpRule) this.errorFlag = !this.rexpRule.test(this.value);
        this.$emit('input', val)
      },
      errorState(val) {
        this.errorFlag = val;
      }
    },
    methods: {
      /**
       * 失焦事件
       */
      textOnblur() {
        this.active = false;
      },
      /**
       * 聚焦事件
       */
      textOnFocus() {
        this.active = true;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .commonTextInput {
    height: 60px;

    .commonTextInputContent {
      line-height: 30px;

      .iconText {
        text-align: right;
      }

      i {
        font-size: 16px;
      }


      input {
        margin-left: 10px;
        width: 200px;
        height: 30px;
        line-height: 30px;
        border: 1px solid #DDDDDD;
        text-indent: 8px;
        box-sizing: border-box;
        -webkit-box-shadow: 0 0 0px 1000px white inset;

        &.active {
          border: 1Px solid #4486FF;
        }

        &:disabled {
          -webkit-box-shadow: none;
          background-color: #f0f5ff;
          color: #BABABA;
        }

        &::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
          /* WebKit browsers */
          color: #BABABA;
        }

        &:-moz-placeholder, textarea:-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: #BABABA;
        }

        &::-moz-placeholder, textarea::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: #BABABA;
        }

        &:-ms-input-placeholder, textarea:-ms-input-placeholder {
          /* Internet Explorer 10+ */
          color: #BABABA;
        }
      }
    }

    .errorTips {
      color: #f10215;
      line-height: 30px;
      text-indent: 80px;
      font-size: 12px;
      text-align: left;
    }
  }
</style>
