<template>
  <assignAlertDialog
    :title="'选择团队'"
    :isShowDialog="isShow"
    :toggleContent="toggleContent"
    :isShowFooter="false"
  >
    <div class="homeChooseTeam">
      <div class="signTable">
        <div class="tableHeader">
          <div class="tableCell index">序号</div>
          <div class="tableCell organization">机构名称</div>
          <div class="tableCell teamName">团队名称</div>
          <div class="tableCell code">团队编码</div>
          <div class="tableCell handle">操作</div>
        </div>
        <div class="tableRow">
          <div class="tableCell index">
            <div>1</div>
          </div>
          <div class="tableCell organization">
            <div>aodhadadaads</div>
          </div>
          <div class="tableCell teamName">
            <div>sadawdasdasd</div>
          </div>
          <div class="tableCell code">
            <div>大叔大婶多所</div>
          </div>
          <div class="tableCell handle">
            <el-button type="primary" class="major" @click.stop.prevent="searchBtn">查询</el-button>
          </div>
        </div>
      </div>
    </div>
  </assignAlertDialog>

</template>

<script>
  import assignAlertDialog from './assignAlertDialog';

  export default {
    name: "homeChooseTeam",
    components: {
      assignAlertDialog
    },
    data() {
      return {}
    },
    props: {
      isShow: {default: false},
      toggleContent: {}
    },
    methods: {
      /**
       * 点击查询按钮的操作
       */
      searchBtn(){
        this.toggleContent(-1)
      }
    }

  }
</script>

<style lang="scss">
  .homeChooseTeam {
      width: 1182px;
      padding: 40px;
    .signTable{
      margin: 0 auto;
      display: table;
      width: 100%;
      border:1px solid #DDDDDD;
      border-collapse: collapse;
      table-layout: fixed;

      .tableCell {
        height: 38px;
        text-align: center;
        font-size: 16px;
        vertical-align: middle;
        box-sizing: border-box;
        display: table-cell;
        text-overflow: ellipsis;
        overflow: hidden;
        //word-break: break-all;
        white-space: nowrap;
        >div{
          text-overflow: ellipsis;
          overflow: hidden;
          //word-break: break-all;
          white-space: nowrap;
          width: 100%;
        }
        .el-button{
          width: 86px;
          height: 30px;
          line-height: 30px;
          font-size: 16px;
          padding: 0 0;
        }
      }
      .tableHeader {
        display: table-header-group;
        border-bottom: 1px solid #DDDDDD;
        background-color: #F3F3F3;
        color: #666666;
        box-sizing: border-box;
      }
      .tableRow{
        display: table-row;
        border-bottom: 1px solid #DDDDDD;
        box-sizing: border-box;
      }
      .index {
        width: 5%;
      }
      .organization, .teamName, .code{
        width: 28%;
      }
      .handle{
        width: 11%;
      }
    }
  }
</style>
