<template>
  <!-- 整个盒子开始 tips:因为element-ui特性必须写个行业样式它自己视为属性，写css会报错 ╮(╯▽╰)╭ -->
  <el-container>

    <!-- 公用头部开始 tips:好讨厌饿了么自动给我加的行内样式 -->
    <el-header style="height: auto">
      <commonHeader></commonHeader>
    </el-header>
    <!-- 公用头部结束 -->

    <el-container class="clearfix">

      <!-- 公共左侧栏开始 -->
      <div class="asside fl">
        <asside></asside>
      </div>
      <!-- 公共左侧栏结束 -->

      <!-- 内容部分开始 -->
      <div class="content fr">
        <router-view/>
      </div>
      <!-- 内容部分结束 -->

    </el-container>

  </el-container>
  <!-- 整个盒子结束 -->
</template>

<script>
  // 公共头部组件
  import commonHeader from '../components/commonHeader';
  // 公共侧边栏
  import asside from '../components/asside'

  export default {
    name: "index",
    components: {
      commonHeader,
      asside
    }
  }
</script>

<style lang="scss">
  #app {
    min-height: 100vh;
    .el-container {
      height: 100%;
      .el-main {
        margin: 0 0;
        padding: 0 0;
      }
      .asside{
        width: 10.65%;
        /*min-width: 160Px;*/
        background-color: #304156;
      }
      .content{
        width: 89.35%;
        background-color: #F0F2F5;
      }
    }
  }
</style>
