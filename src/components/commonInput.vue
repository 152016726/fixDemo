<template>
  <div class="commonInput clearfix" :class="{active: active}">
    <div class="icon fl">
      <div class="tag" :style="{backgroundImage: 'url('+(active ? inputing : inputImg) +')'}"></div>
    </div>
    <input type="text"
           class="inputType fl"
           v-model="val"
           v-if="!isPwd"
           :placeholder="placeholderText"
           v-on:blur="textOnblur"
           v-on:focus="textOnFocus"
           @keyup.enter="submitData"
    />
    <input
      type="password"
      class="inputType fl"
      v-model="val"
      :placeholder="placeholderText"
      v-if="isPwd"
      v-on:blur="textOnblur"
      v-on:focus="textOnFocus"
      @keyup.enter="submitData"
    />
  </div>
</template>

<script>
  export default {
    name: "commonInput",
    data() {
      return {
        val: this.value,               // value值双向绑定
        active: false            // 输入框活跃状态
      }
    },
    props: {
      value: {default: ''},               // type:string   描叙:props的双向绑定
      inputImg: {default: ''},            // type:string   描叙:左边未激活的小图标
      inputing: {default: ''},            // type:string   描叙:左边激活状态的小图标
      isPwd: {default: false},            // type:boolean  描叙: 是否为密码组件
      placeholderText: {default: ''},     // type:string   描述:placeholder
      maxLength: {default: 20},           // type:number   描述:最大长度
      rexpRule: {default: ''}             // type:RegExp   描述:正则表达式
    },
    watch: {
      val() {
        this.identifyValue()
      }
    },
    methods: {
      /**
       * 失焦事件
       */
      textOnblur(){
          if(this.val === ''){
            this.active = false;
          }
      },
      /**
       * 聚焦事件
       */
      textOnFocus(){
        this.active = true;
      },
      /**
       * 验证value
       */
      identifyValue(){
        let obj = {
          text: this.val
        };
        if(this.rexpRule) obj.flag = this.rexpRule.test(this.val) && !(this.val.length > this.maxLength);
        this.active = true;
        this.$emit('onChangeText', obj)
      },
      /**
       * 回车触发事件
       */
      submitData(){
        this.$emit('submitData');
      }
    }
  }
</script>

<style lang="scss">
  .commonInput {
    width: 100%;
    height: 40px;
    padding: 10px 0;
    box-sizing: border-box;
    border: 1Px solid #DDDDDD;
    border-radius: 4px;
    &.active{
      border: 1Px solid #4486FF;
    }
    .icon {
      width: 11.67%;
      padding: 0 10px;
      height: 100%;
      box-sizing: border-box;

      .tag {
        height: 100%;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;
      }
    }

    .inputType {
      width: 88.33%;
      height: 100%;
      line-height: 20px;
      font-size: 16px;
      color: #3F4457;
      -webkit-box-shadow: 0 0 0px 1000px white inset;
      input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
        /* WebKit browsers */
        color: #BABABA;
      }
      input:-moz-placeholder, textarea:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #BABABA;
      }
      input::-moz-placeholder, textarea::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #BABABA;
      }
      input:-ms-input-placeholder, textarea:-ms-input-placeholder {
        /* Internet Explorer 10+ */
        color: #BABABA;
      }
    }
  }
</style>
