<template>
  <!-- 签约人群表格开始 -->
  <div class="roleManage">
    <div class="roleManageContent">
      <div class="personTitle">
        <p class="title">角色列表</p>
        <el-button type="primary" class="major" v-if="role_add" @click.stop.prevent="openRoleDialog('')">新增角色
        </el-button>
      </div>
      <div class="personContent">
        <div class="personTable">
          <div class="tableHeader">
            <div class="tableCell index">序号</div>
            <div class="tableCell name">角色名称</div>
            <div class="tableCell nickname">角色别名</div>
            <div class="tableCell createTime">创建时间</div>
            <div class="tableCell state">状态</div>
            <div class="tableCell handle">操作</div>
          </div>
          <div class="tableRow" v-for="(item, index) in dataList" :key="index">
            <div class="tableCell">{{index+1}}</div>
            <div class="tableCell">{{item.roleName}}</div>
            <div class="tableCell">{{item.aliasName}}</div>
            <div class="tableCell">{{item.createTime}}</div>
            <div class="tableCell">{{item.isEnabled ? '启用' : '禁用'}}</div>
            <div class="tableCell">
              <el-button type="primary" class="major" v-if="role_edit"
                         @click.prevent.stop="openRoleDialog(item.roleId)">编辑
              </el-button>
              <el-button type="primary" class="major" v-if="role_edit"
                         @click.prevent.stop="disabledRole(item.roleId, !item.isEnabled)">{{item.isEnabled ? '禁用' :
                '启用'}}
              </el-button>
              <el-button type="danger" class="major" v-if="role_delete"
                         @click.prevent.stop="deleteRoleDialog(item.roleId)">删除
              </el-button>
              <span v-if="!role_edit && !role_delete">暂无权限编辑</span>
            </div>
          </div>
        </div>
        <div class="noneData" v-if="dataList.length === 0">
          暂无数据
        </div>
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNo"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            layout=" prev, pager, next,total, sizes, jumper"
            background
            :total="totalCount">
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 是否删除角色开始 -->
    <assignAlertDialog
      :title="'删除角色'"
      :isShowDialog="isShowRole"
      :toggleContent="toggleRoleDialog"
      :confirmDialog="confirmDelete"
    >
      <div class="paddingBox">是否确定删除该角色</div>
    </assignAlertDialog>
    <!-- 是否删除角色结束 -->

    <!-- 是否打开添加角色窗口开始 -->
    <commonDialog
      :toggleMainContent='toggleMainContent'
      :show='isShowCommonDialog'
      :isShowText='false'
    >
      <addNewRole
        :toggleContent="toggleMainContent"
        :roleId="roleId"
      >
      </addNewRole>
    </commonDialog>
    <!-- 是否打开添加角色窗口开始 -->

  </div>

  <!-- 签约人群表格结束 -->
</template>

<script>
  import assignAlertDialog from '@/components/assignAlertDialog';                  // 通过/拒绝弹窗组件
  import commonDialog from '@/components/commonDialog';
  import addNewRole from '@/components/addNewRole';

  export default {
    name: "roleManage",
    components: {
      assignAlertDialog,
      commonDialog,
      addNewRole
    },
    data() {
      return {
        isShowRole: false,
        isShowCommonDialog: false,      // 是否展示新增窗口
        roleId: '',                     // 角色Id
        dataList: [],                   // 角色List
        pageNo: 1,                      // 页码
        pageSize: 10,                   // 页量
        totalCount: 0,                  // 总共条数
        deleteRoleId: '',               // 删除角色id
        role_add: false,                   // 添加权限
        role_edit: false,                  // 编辑权限
        role_delete: false                 // 删除权限
      }
    },
    methods: {
      /**
       * 删除角色选框的隐藏与显示
       * @param fag
       **/
      toggleRoleDialog(fag) {
        if (fag === -1) {
          this.isShowRole = false;
        } else {
          this.isShowRole = !this.isShowRole;
        }
      },
      /**
       * 新建账号选框的隐藏与显示
       * @param fag
       */
      toggleMainContent(fag) {
        if (fag === -1) {
          this.isShowCommonDialog = false;
        } else {
          this.isShowCommonDialog = !this.isShowCommonDialog;
        }
        // 关闭弹窗的时候重新请求数据
        if(!this.isShowCommonDialog){
          this.searchRoleList();
        }
      },
      /**
       * 查询角色列表
       */
      searchRoleList() {
        const {pageNo, pageSize} = this;
        this.$post('user/role/getPage', {
          pageNo,
          pageSize
        }).then(rsp => {
          this.dataList = rsp.datas;
          this.totalCount = rsp.total;
        }, rej => {
          if(rej.data.errcode === 460){
            this.$message.error(rej.data.datas[0].message);
          }else{
            this.$message.error(rej.data.errmsg);
          }})
      },
      /**
       * 删除角色
       * @param roleId type:string
       */
      deleteRoleDialog(roleId) {
        this.deleteRoleId = roleId;
        this.toggleRoleDialog();
      },
      /**
       * 确认删除账号
       */
      confirmDelete() {
        this.$post('user/role/delete', {roleId: this.deleteRoleId}).then(rsp => {
          this.searchRoleList();
          this.toggleRoleDialog(-1);
          // console.log("确认删除角色")
        }, rej => {
          if(rej.data.errcode === 460){
            this.$message.error(rej.data.datas[0].message);
          }else{
            this.$message.error(rej.data.errmsg);
          }});
      },
      /**
       * 禁用角色
       * @param roleId    type:string
       * @param isEnable type:boolean
       */
      disabledRole(roleId, isEnabled) {
        this.$post('user/role/setEnable', {roleId, isEnabled}).then(rsp => {
          this.searchRoleList();
        }, rej => {
          if(rej.data.errcode === 460){
            this.$message.error(rej.data.datas[0].message);
          }else{
            this.$message.error(rej.data.errmsg);
          }})
      },
      /**
       * 添加/编辑角色
       * @param roleId
       */
      openRoleDialog(roleId) {
        this.roleId = roleId;
        this.toggleMainContent();
      },
      /**
       * 改变pageSize
       * @param val
       */
      handleSizeChange(val) {
        this.pageSize = val;
        this.searchRoleList();
      },
      /**
       * 改变当前展示页
       */
      handleCurrentChange(val) {
        this.pageNo = val;
        this.searchRoleList();
      }
    },
    created() {
      this.searchRoleList();
      let authObj = JSON.parse(this.$localStore.getItem('authority'));
      // 初始化权限
      if(!!authObj){
        this.role_add = authObj['role_add'];
        this.role_edit = authObj['role_edit'];
        this.role_delete = authObj['role_delete'];
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../style/roleManage.scss';

</style>
