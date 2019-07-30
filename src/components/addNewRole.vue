<template>
  <div class="addNewRole">
    <!-- 弹窗头部开始 -->
    <div class="addNewRoleTitle">
      <span>{{roleId ? '编辑角色' : '新建角色'}}</span>
      <div class="closeIcon" @click.stop.prevent="closeContent">&times;</div>
    </div>
    <!-- 弹窗头部结束 -->

    <!-- 弹窗内容开始 -->
    <div class="addNewRoleContent">
      <div class="inputContent">
        <commonTextInput :text="'角色名称'" v-model="roleName"></commonTextInput>
        <commonTextInput :text="'角色别名'" v-model="aliasName"></commonTextInput>
        <commonSelector :text="'角色类型'" v-model="roleType" :options="typeList"></commonSelector>
      </div>
      <p class="contentTitle">
        <span class="title">权限管理</span>
      </p>
      <div class="authorityHead">
        <div class="authorityCell showAuthority">列表显示权限</div>
        <div class="authorityCell selectAll">全选</div>
        <div class="authorityCell handleAuthority">操作权限</div>
      </div>
      <div class="authorityTable">
        <!-- 权限栏开始 -->
        <roleCheckBox
          v-for="(item, index) in authList"
          :key="index"
          :authObj="item"
          v-model="permissionIds"
        >
        </roleCheckBox>
        <!-- 权限栏结束 -->

      </div>
      <!-- 弹窗底部开始 -->
      <div class="assignDialogFooter">
        <el-button type="primary" class="major" @click.stop.prevent="checkDialog">通过</el-button>
        <el-button type="info" class="info" @click.stop.prevent="cutOffDialog">取消</el-button>
      </div>
      <!-- 弹窗底部结束 -->
    </div>
    <!-- 弹窗内容结束 -->
  </div>
</template>

<script>
  import commonTextInput from './commonTextInput';
  import commonSelector from './commonSelector';
  import roleCheckBox from './roleCheckBox';

  export default {
    name: "addNewRole",
    data() {
      return {
        roleType: '',           // 角色类型
        typeList: [],           // 角色List
        roleName: '',           // 角色名称
        aliasName: '',           // 角色别名
        authList: [],           // 权限List
        permissionIds: []          // 选中的权限List
      }
    },
    components: {
      commonTextInput,
      commonSelector,
      roleCheckBox
    },
    props: {
      roleId: {default: ''},             // 角色Id
      toggleContent: {},                // 开关弹窗
    },
    methods: {
      /**
       * 关闭弹窗
       **/
      closeContent() {
        this.toggleContent(-1);
      },
      /**
       * 确定按钮
       */
      checkDialog() {
        const {roleName, aliasName, roleType, permissionIds} = this;
        if (this.roleId) {
          // 更新团队成员
          this.$post('user/role/update', {
            id: this.roleId,
            roleName,
            aliasName,
            roleType,
            permissionIds
          }).then(rsp => {
            this.toggleContent(-1);
          }, rej => {
            if(rej.data.errcode === 460){
            this.$message.error(rej.data.datas[0].message);
          }else{
            this.$message.error(rej.data.errmsg);
          }})
        } else {
          // 添加团队成员
          this.$post('user/role/add', {
            roleName, aliasName, roleType, permissionIds
          }).then(rsp => {
            this.toggleContent(-1);
          }, rej => {
            if(rej.data.errcode === 460){
            this.$message.error(rej.data.datas[0].message);
          }else{
            this.$message.error(rej.data.errmsg);
          }})
        }
      },
      /**
       * 取消按钮
       */
      cutOffDialog() {
        this.toggleContent(-1);
        // 取消之后要进行的操作      ----  为后续迭代开发用
        this.$emit('cancelDialog')
      }
    },
    created() {
      const {roleId} = this;
      // 获取当前页面详情
      this.$post('user/role/detail', {roleId}).then(rsp => {
        this.authList = rsp.data.permissionGroupDatas;
        this.roleName = rsp.data.roleName;
        this.aliasName = rsp.data.aliasName;
        this.roleType = rsp.data.roleType;
        let opt = [];
        rsp.data.permissionGroupDatas.forEach(item => {
          item.permissionDatas.forEach(val => {
            if (val.isEnabled) {
              opt.push(val.permissionId)
            }
          })
        });
        // 初始化已选中的valueList
        this.permissionIds = opt;
      }, rej => {
        if(rej.data.errcode === 460){
            this.$message.error(rej.data.datas[0].message);
          }else{
            this.$message.error(rej.data.errmsg);
          }});
      // 获取角色类型列表
      this.$post('dict/get', {catalogKey: 'ROLE_TYPE'}).then(rsp => {
        this.typeList = rsp.datas.map(item => {
          return {
            label: item.dicName,
            value: item.dicCode
          }
        });
      }, rej => {
        if(rej.data.errcode === 460){
            this.$message.error(rej.data.datas[0].message);
          }else{
            this.$message.error(rej.data.errmsg);
          }})
    }
  }
</script>

<style lang="scss" scoped>
  .addNewRole {
    .addNewRoleTitle {
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

    .addNewRoleContent {
      background-color: #ffffff;
      padding: 40px 60px;

      .inputContent {
        display: flex;

        .commonTextInput, .commonSelector {
          margin-right: 45px;
        }
      }

      .contentTitle {
        text-align: left;
        font-weight: bold;
        font-size: 18px;
        padding-bottom: 20px;
      }

      .authorityHead {
        display: flex;
        background-color: #F3F3F3;
        border-top: 1Px solid #DDDDDD;
        border-left: 1Px solid #DDDDDD;

        .authorityCell {
          height: 38px;
          line-height: 38px;
          text-align: center;
          font-size: 16px;
          border-right: 1Px solid #DDDDDD;
          border-bottom: 1Px solid #DDDDDD;
          box-sizing: border-box;
        }
      }

      .authorityTable {
        display: table;
        border-left: 1Px solid #DDDDDD;
        border-collapse: collapse;
      }
    }

    .assignDialogFooter {
      margin: 0 auto;
      padding-top: 30px;
      text-indent: 0;

      .el-button {
        margin: 0 10px;
        padding: 0 0;
        width: 86px;
        height: 30px;
        font-size: 16px;
      }
    }

    .showAuthority {
      width: 350px;
    }

    .el-checkbox-group {
      font-size: 16px;
      height: 50px;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      .el-checkbox {
        padding: 0 0;
        margin: 0 0;
        margin-right: 40px;

        &:nth-child(8) {
          margin: 0;
        }

        > span {
          float: left;
        }

        .el-checkbox__input {
          width: 20px;
          height: 20px;
          padding: 0 0;
          margin: 0 0;

          .el-checkbox__inner {
            width: 100%;
            height: 100%;

            &::after {
              font-size: 20px;
              line-height: 20px;
              left: 38%;
              top: 23%;
              border: 2px solid #FFF;
              border-left: 0;
              border-top: 0;
              transition: none;
              -webkit-transition: none;
              -webkit-transform-origin: center;
              transform-origin: center;
            }
          }
        }

        .el-checkbox__label {
          margin: 0 0;
          padding: 0 0;
          margin-left: 10px;
        }
      }

    }

    .selectAll {
      width: 90px;
    }

    .handleAuthority {
      width: 540px;
    }

    .showPages {
      width: 164px;
    }

    .borderBottom {
      border-bottom: 1Px solid #DDDDDD;
    }
  }
</style>
