<template>
  <commonDialog
    :toggleMainContent='toggleContent'
    :show='isShowDialog'
    :isShowText = 'false'
  >
    <div class="assignAlertDialog">
      <!-- 弹窗头部开始 -->
      <div class="assignDialogTitle">
        <span>{{title}}</span>
        <div class="closeIcon" @click.stop="closeContent">&times;</div>
      </div>
      <!-- 弹窗头部结束 -->
      <div class="assignDialogContent">
        <slot/>
      </div>

      <!-- 弹窗底部开始 -->
      <div class="assignDialogFooter" v-if="isShowFooter">
        <el-button type="primary" class="major" @click.stop.prevent="checkDialog">确定</el-button>
        <el-button type="info" class="info" @click.stop.prevent="cutOffDialog">取消</el-button>
      </div>
      <!-- 弹窗底部结束 -->
    </div>
  </commonDialog>
</template>

<script>
  import commonDialog from './commonDialog';

  export default {
    name: "assignAlertDialog",
    components: {
      commonDialog
    },
    props: {
      title: {default: '签约详情'},             // 标题
      isShowDialog: {default: false},            // 是否显示弹窗
      toggleContent: {},                         // 开关弹窗
      confirmDialog: {},                        // 确定
      isShowFooter: {default: true}             // 是否展示底部
    },
    methods: {
      /**
       * 关闭弹窗
       */
      closeContent() {
        this.toggleContent(-1)
      },
      /**
       * 确定按钮
       */
      checkDialog(){
        this.confirmDialog();
      },
      /**
       * 取消按钮
       */
      cutOffDialog(){
        this.toggleContent(-1);
        this.$emit('cancelDialog')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .assignAlertDialog {
    min-width: 362px;
    /*min-height: 186px;*/
    border-radius: 4px;
    .assignDialogTitle {
      width: 100%;
      color: #ffffff;
      line-height: 40px;
      text-align: center;
      background-color: #4486FF;
      position: relative;
      font-size: 18px;

      .closeIcon {
        font-size: 24px;
        cursor: pointer;
        color: #ffffff;
        position: absolute;
        right: 14px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .assignDialogContent{
      margin: 0 auto;
      display: flex;
      justify-content: center;
    }
    .assignDialogFooter{
      margin: 0 auto;
      padding-bottom: 24px;
      text-align: center;
      .el-button{
        margin: 0 10px;
        padding: 0 0;
        width: 86px;
        height: 30px;
        font-size: 16px;
      }
    }
  }
</style>
