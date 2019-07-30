<template>
  <commonDialog
    :toggleMainContent='toggleMainContent'
    :show='isShow'
    :isShowText = 'false'
  >
  <div class="assignChargeInfo">
    <!-- 费用明细头部横栏开始 -->
    <div class="assignDialogTitle">
      <span>费用明细</span>
      <div class="closeIcon" @click.stop="closeContent">&times;</div>
    </div>
    <!-- 费用明细头部横栏结束 -->
    <div class="assignChargeContent">
      <div class="chargeInfo">
        <p class="chargeInfoTitle">
          <span class="title">一般人群收费服务包</span>
        </p>
        <div class="chargeTable">
          <div class="chargeColumn">
            <div class="chargeTableCell">服务包费用</div>
            <div class="chargeTableCell">60元</div>
          </div>
          <div class="chargeColumn">
            <div class="chargeTableCell">服务包费用</div>
            <div class="chargeTableCell">60元</div>
          </div>
          <div class="chargeColumn">
            <div class="chargeTableCell">服务包费用</div>
            <div class="chargeTableCell">60元</div>
          </div>
          <div class="chargeColumn">
            <div class="chargeTableCell">服务包费用</div>
            <div class="chargeTableCell">60元</div>
          </div>
        </div>
      </div>
      <div class="chargeInfo">
        <p class="chargeInfoTitle">
          <span class="title">高血压患者收费服务包</span>
        </p>
        <div class="chargeTable">
          <div class="chargeColumn">
            <div class="chargeTableCell">服务包费用</div>
            <div class="chargeTableCell">60元</div>
          </div>
          <div class="chargeColumn">
            <div class="chargeTableCell">服务包费用</div>
            <div class="chargeTableCell">60元</div>
          </div>
          <div class="chargeColumn">
            <div class="chargeTableCell">服务包费用</div>
            <div class="chargeTableCell">60元</div>
          </div>
          <div class="chargeColumn">
            <div class="chargeTableCell">服务包费用</div>
            <div class="chargeTableCell">60元</div>
          </div>
        </div>
      </div>
      <p class="chargeInfoTitle charge">
        <span class="title">个人合付：40元</span>
      </p>
    </div>

  </div>
  </commonDialog>
</template>

<script>
  import commonDialog from './commonDialog';                             // 公共弹窗
  export default {
    name: "assignChargeInfo",
    data() {
      return {}
    },
    components:{
      commonDialog
    },
    props:{
      serviceInfo: {default: ()=>{}}, // 服务包内容
      isShow: {default: false},
      toggleMainContent: {},        // 内容的显示隐藏切换函数
    },
    methods:{
      /**
       * 关闭弹窗
       */
      closeContent() {
        this.toggleMainContent(-1)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .assignChargeInfo {
    .assignDialogTitle {
      width: 100%;
      color: #ffffff;
      font-size: 18px;
      line-height: 40px;
      text-align: center;
      background-color: #4486FF;
      position: relative;

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

    .chargeInfoTitle {
      text-align: left;
      font-weight: bold;
      font-size: 18px;
      padding-top: 28px;
      padding-bottom: 20px;
    }
    .charge{
      color: #4486FF;
    }

    .assignChargeContent {
      padding: 0 60px;

      .chargeInfo {
        .chargeTable {
          display: table;
          border-top: 1Px solid #DDDDDD;
          border-left: 1Px solid #DDDDDD;
          background-color: #ffffff;
          box-sizing: border-box;
          border-collapse: collapse;

          .chargeColumn {
            display: table-row;

            .chargeTableCell {
              height: 50px;
              line-height: 50px;
              width: 120px;
              font-size: 16px;
              text-align: center;
              vertical-align: middle;
              display: table-cell;
              border-right: 1Px solid #DDDDDD;
              border-bottom: 1Px solid #DDDDDD;
              box-sizing: border-box;
            }
          }
        }
      }

    }
  }

</style>
