<template>
  <div class="assignServiceInfo">
    <!-- 签约弹窗头部横栏开始 -->
    <div class="assignDialogTitle">
      <span>签约详情</span>
      <div class="closeIcon" @click.stop="closeContent">&times;</div>
    </div>
    <!-- 签约弹窗公共横栏结束 -->
    <div class="assignServiceContent">
      <p class="contentTitle">签约人：张三</p>
      <div class="servicePackages">
      <p class="assignSignerTitle">
        <span class="title">一般人群收费服务包</span>
      </p>
      <div class="serviceTable">
        <div class="serviceThead">
          <div class="serviceTableCell index">序号</div>
          <div class="serviceTableCell categories">项目分类</div>
          <div class="serviceTableCell serviceInfo">服务内容</div>
          <div class="serviceTableCell serviceTimes">服务次数</div>
          <div class="serviceTableCell serviceExplain">服务内容解释</div>
          <div class="serviceTableCell serviceRemark">备注</div>
        </div>
        <div class="serviceColumn">
          <div class="serviceTableCell">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
          </div>
          <div class="serviceTableCell borderBottom">
            健康管理
          </div>
          <div class="serviceTableCell">
            <div class="col2">健康档案</div>
            <div>健康教育</div>
            <div>健康评估</div>
          </div>
          <div class="serviceTableCell">
            <div class="col2">终生</div>
            <div>2次</div>
            <div>1次/年</div>
          </div>
          <div class="serviceTableCell">
            <div>二三级医院专家预约挂号</div>
            <div>二三级医院专家预约挂号</div>
            <div>健康教育</div>
            <div>健康评估</div>
          </div>
          <div class="serviceTableCell"></div>
        </div>
        <div class="serviceColumn">
          <div class="serviceTableCell">
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
            <div>10</div>
          </div>
          <div class="serviceTableCell borderBottom">
            协助就医
          </div>
          <div class="serviceTableCell">
            <div>转诊服务</div>
            <div>本机构预约就诊</div>
            <div>二三级医院专家预约挂号</div>
            <div>大型检查预约</div>
            <div>住院预约</div>
            <div>手术预约</div>
          </div>
          <div class="serviceTableCell">
            <div>不限</div>
            <div>不限</div>
            <div>7次/年</div>
            <div>10次/年</div>
            <div>不限</div>
            <div>不限</div>
          </div>
          <div class="serviceTableCell">
            <div>转诊服务</div>
            <div>本机构预约就诊</div>
            <div>二三级医院专家预约挂号</div>
            <div>大型检查预约</div>
            <div>住院预约</div>
            <div>手术预约</div>
          </div>
          <div class="serviceTableCell"></div>
        </div>
      </div>
      <p class="assignSignerTitle">
        <span class="title">高血压患者收费服务包</span>
      </p>
      <div class="serviceTable">
        <div class="serviceThead">
          <div class="serviceTableCell index">序号</div>
          <div class="serviceTableCell categories">项目分类</div>
          <div class="serviceTableCell serviceInfo">服务内容</div>
          <div class="serviceTableCell serviceTimes">服务次数</div>
          <div class="serviceTableCell serviceExplain">服务内容解释</div>
          <div class="serviceTableCell serviceRemark">备注</div>
        </div>
        <div class="serviceColumn">
          <div class="serviceTableCell">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
          </div>
          <div class="serviceTableCell">
            健康管理
          </div>
          <div class="serviceTableCell">
            <div class="col2">健康档案</div>
            <div>健康教育</div>
            <div>健康评估</div>
          </div>
          <div class="serviceTableCell">
            <div class="col2">终生</div>
            <div>2次</div>
            <div>1次/年</div>
          </div>
          <div class="serviceTableCell">
            <div>二三级医院专家预约挂号</div>
            <div>二三级医院专家预约挂号</div>
            <div>健康教育</div>
            <div>健康评估</div>
          </div>
          <div class="serviceTableCell"></div>
        </div>
        <div class="serviceColumn">
          <div class="serviceTableCell">
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
            <div>10</div>
          </div>
          <div class="serviceTableCell">
            协助就医
          </div>
          <div class="serviceTableCell">
            <div>转诊服务</div>
            <div>本机构预约就诊</div>
            <div>二三级医院专家预约挂号</div>
            <div>大型检查预约</div>
            <div>住院预约</div>
            <div>手术预约</div>
          </div>
          <div class="serviceTableCell">
            <div>不限</div>
            <div>不限</div>
            <div>7次/年</div>
            <div>10次/年</div>
            <div>不限</div>
            <div>不限</div>
          </div>
          <div class="serviceTableCell">
            <div>转诊服务</div>
            <div>本机构预约就诊</div>
            <div>二三级医院专家预约挂号</div>
            <div>大型检查预约</div>
            <div>住院预约</div>
            <div>手术预约</div>
          </div>
          <div class="serviceTableCell"></div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "assignServiceInfo",
    data() {
      return {}
    },
    props: {
      toggleMainContent: {},        // 内容的显示隐藏切换函数
    },
    methods: {
      /**
       * 关闭弹窗
       */
      closeContent() {
        this.toggleMainContent(1)
      }
    }
  }
</script>

<style lang="scss">
  .assignServiceInfo {
    width: 1354px;
    border-radius: 4px;
    .assignDialogTitle {
      width: 100%;
      font-size: 18px;
      color: #ffffff;
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
    .assignServiceContent{
      background-color: #ffffff;
      padding: 15px 60px;

      .contentTitle {
        line-height: 44px;
        font-size: 16px;
        border-bottom: 1Px solid #DDDDDD;
        text-align: left;
      }
      .servicePackages{
        .assignSignerTitle{
          text-align: left;
          font-weight: bold;
          font-size: 18px;
          padding-top: 28px;
          padding-bottom: 20px;
        }
        .serviceTable{
          display: table;
          border-top: 1Px solid #DDDDDD;
          border-left: 1Px solid #DDDDDD;
          background-color: #ffffff;
          box-sizing: border-box;
          border-collapse: collapse;
          .serviceTableCell{
            font-size: 16px;
            text-align: center;
            vertical-align: middle;
            display: table-cell;
            border-right: 1Px solid #DDDDDD;
            box-sizing: border-box;
            border-collapse: collapse;
            &.borderBottom{
              border-bottom: 1Px solid #DDDDDD;
            }
            >div{
              height: 50px;
              line-height: 50px;
              border-bottom: 1Px solid #DDDDDD;
              box-sizing: border-box;
            }

          }
          .serviceThead{
            display: table-header-group;
            background-color: #F3F3F3;
            .serviceTableCell{
              height: 38px;
              line-height: 38px;
              border-bottom: 1Px solid #DDDDDD;
            }
            .index{
              width: 60px;
            }
            .categories{
              width: 90px;
            }
            .serviceInfo{
              width: 207px;
            }
            .serviceTimes{
              width: 90px;
            }
            .serviceExplain{
              width: 690px;
            }
            .serviceRemark{
              width: 90px;
            }
          }
          .serviceColumn{
            display: table-row;
            .col2{
              height: 100px;
              line-height: 100px;
            }
          }
        }
      }

    }
  }
</style>
