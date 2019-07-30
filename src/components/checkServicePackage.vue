<template>
  <assignAlertDialog
    :title="'服务包详情'"
    :isShowDialog="show"
    :toggleContent="toggleRoleMemberDialog"
    :confirmDialog="confirmRoleMemberDialog"
    :isShowFooter="false"
  >
    <div class="checkServicePackage">
      <!--<p class="freeServiceTitle">免费服务包</p>-->
      <commonToggle :title="'免费服务包'" :isHideBorder="true" :isDefaultShow="true">
        <commonToggle :title="'一般人群收费服务包'" :isFirst="true">
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
              <div class="serviceTableCell borderBottom"></div>
            </div>
          </div>
        </commonToggle>
        <commonToggle :title="'孕妇产免费服务包'">
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
              <div class="serviceTableCell borderBottom"></div>
            </div>
          </div>
        </commonToggle>
        <commonToggle :title="'高血压患者免费服务包'">
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
              <div class="serviceTableCell borderBottom"></div>
            </div>
          </div>
        </commonToggle>
        <commonToggle :title="'个性定制包'">
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
              <div class="serviceTableCell borderBottom"></div>
            </div>
          </div>
        </commonToggle>
      </commonToggle>

    </div>
  </assignAlertDialog>

</template>

<script>
  import assignAlertDialog from './assignAlertDialog';
  import commonToggle from './commonToggle';

  export default {
    name: "checkServicePackage",
    components: {
      assignAlertDialog,
      commonToggle
    },
    props: {
      toggleMainContent: {},
      show: {default: false}        // 是否展示窗口
    },
    data() {
      return {}
    },
    methods: {
      /**
       * 开关角色编辑窗口
       */
      toggleRoleMemberDialog() {
        this.toggleMainContent()
      },
      /**
       * 确认关闭窗口
       */
      confirmRoleMemberDialog() {
        this.toggleMainContent(-1)
      }
    }
  }
</script>

<style lang="scss">
  .checkServicePackage {
    width: 1354px;
    padding: 0 60px;
    padding-bottom: 98px;
    padding-top: 20px;
    box-sizing: border-box;
    background-color: #ffffff;

    .freeServiceTitle {
      text-align: left;
      line-height: 74px;
      font-size: 16px;
      font-weight: bold;
    }

    .serviceTable {
      display: table;
      border-top: 1Px solid #DDDDDD;
      border-left: 1Px solid #DDDDDD;
      background-color: #ffffff;

      .serviceTableCell {
        font-size: 16px;
        text-align: center;
        vertical-align: middle;
        display: table-cell;
        border-right: 1Px solid #DDDDDD;
        border-collapse: collapse;

        &.borderBottom {
          border-bottom: 1Px solid #DDDDDD;
        }

        > div {
          height: 50px;
          line-height: 50px;
          border-bottom: 1Px solid #DDDDDD;
          box-sizing: border-box;
        }

      }

      .serviceThead {
        display: table-header-group;
        background-color: #F3F3F3;

        .serviceTableCell {
          height: 38px;
          line-height: 38px;
          border-bottom: 1Px solid #DDDDDD;
        }

        .index {
          width: 60px;
        }

        .categories {
          width: 90px;
        }

        .serviceInfo {
          width: 207px;
        }

        .serviceTimes {
          width: 90px;
        }

        .serviceExplain {
          width: 690px;
        }

        .serviceRemark {
          width: 90px;
        }
      }

      .serviceColumn {
        display: table-row;

        .col2 {
          height: 100px;
          line-height: 100px;
        }
      }
    }
  }
</style>
