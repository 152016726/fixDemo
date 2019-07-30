<template>
  <div class="servicePakage">
    <div class="serviceTitle">
      <commonTextInput :text="'机构名称'" v-model="organization"></commonTextInput>
      <el-button type="primary" class="major" @click.prevent.stop="toggleMainContent">查询</el-button>
    </div>
    <div class="serviceList">
      <div class="serviceTitle">服务内容管理</div>
      <div class="serviceTable">
        <div class="tableHeader">
          <div class="tableCell index">序号</div>
          <div class="tableCell organization">机构</div>
          <div class="tableCell commonPackage">普通消费包</div>
          <div class="tableCell levelPackage">升级消费包</div>
          <div class="tableCell diyPackage">个性定制包</div>
          <div class="tableCell handle">操作</div>
        </div>
        <div class="tableRow">
          <div class="tableCell index">
            <div>1</div>
          </div>
          <div class="tableCell organization">
            <div>喜喜喜喜喜喜卫生院</div>
          </div>
          <div class="tableCell commonPackage">
            <div>提供一般人群</div>
          </div>
          <div class="tableCell levelPackage">
            <div>提供一般人群</div>
          </div>
          <div class="tableCell diyPackage">
            <div>提供一般人群</div>
          </div>
          <div class="tableCell handle">
            <el-button type="primary" class="major" @click.prevent.stop="toggleMainContent">编辑</el-button>
          </div>
        </div>
      </div>
      <!--<div class="noneData" v-if="dataList.length === 0">-->
      <!--暂无数据-->
      <!--</div>-->
    </div>
    <checkServicePackage
      :show="isShowServicePackage"
      :toggleMainContent="toggleMainContent"
    >

    </checkServicePackage>
  </div>
</template>

<script>
  import commonTextInput from '@/components/commonTextInput';
  import checkServicePackage from '@/components/checkServicePackage';

  export default {
    name: "servicePakage",
    components: {
      commonTextInput,
      checkServicePackage
    },
    data() {
      return {
        organization: '',             // 机构名称
        isShowServicePackage: false
      }
    },
    methods: {
      /**
       * 开关查看弹窗
       * @param fag
       */
      toggleMainContent(fag) {
        if (fag === -1) {
          this.isShowServicePackage = false;
        } else {
          this.isShowServicePackage = !this.isShowServicePackage;
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../style/servicePackgae.scss";
</style>
