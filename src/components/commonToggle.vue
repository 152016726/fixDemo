<template>
  <div class="servicePackages">
    <div class="assignSignerTitle" :class="{borderActive: isExpandBox, borderTop: isFirst, borderNone: isHideBorder}" @click.prevent.stop="toggleServicePackages">
      <span class="title">
        {{title}}
      </span>
      <i class="icon" :class="{pull: isExpandBox}"></i>
    </div>
    <div class="servicePackagesContent" v-if="isExpandBox">
      <slot/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "commonToggle",
    data() {
      return {
        isExpandBox: false
      }
    },
    props:{
      title: {default: ''},                 // 标题
      isHideBorder: {default: false},       // 是否隐藏边框
      isFirst: {default: false},            // 是否为第一个
      isDefaultShow: {default: false}       // 默认是否展示
    },
    methods: {
      /**
       * 开关服务包的展开
       */
      toggleServicePackages() {
        this.isExpandBox = !this.isExpandBox;
      }
    },
    created(){
      this.isExpandBox = this.isDefaultShow;  // 默认初始化
    }
  }
</script>

<style lang="scss">
  .servicePackages {
    .assignSignerTitle {
      cursor: pointer;
      text-align: left;
      border: 1Px solid #DDDDDD;
      border-top: none;
      display: flex;
      align-items: center;
      height: 54px;
      box-sizing: border-box;
      text-indent: 20px;
      &.borderActive{
        border-bottom: none;
      }
      &.borderTop{
        border-top: 1Px solid #DDDDDD;
      }
      &.borderNone{
        border: none;
      }

      .title {
        font-weight: bold;
        font-size: 18px;
      }

      .icon {
        margin-left: 13px;
        width: 9px;
        height: 6px;
        background: url("../assets/btn_open_gray.png") no-repeat center center;
        background-size: cover;
        transition: all 0.3s;

        &.pull {
          transform: rotateX(180deg);
        }
      }
    }
  }
</style>
