<template>
  <div class="teamManage">
    <div class="teamSearch">
      <commonTextInput :text="'全国机构'" v-model="orgName"></commonTextInput>
      <commonTextInput :text="'医生团队'" v-model="TDMC"></commonTextInput>
      <commonTextInput :text="'医生姓名'" v-model="YSXM"></commonTextInput>
      <commonSelector :text="'状态'" v-model="ISENABLED" :options="stateList"></commonSelector>
      <el-button type="primary" class="major" @click.stop.prevent="searchTeamInfo">查询</el-button>
    </div>
    <div class="roleManageContent">
      <div class="personTitle">
        <p class="title">团队列表</p>
        <div class="functionBtns">
          <el-button type="success" class="major" v-if="team_upload" @click.stop.prevent="">导入</el-button>
          <el-button type="primary" class="major" v-if="team_add" @click.stop.prevent="openTeamDialog('')">新增
          </el-button>
        </div>
      </div>
      <div class="personContent">
        <div class="personTable">
          <div class="tableHeader">
            <div class="tableCell index">序号</div>
            <div class="tableCell name">团队名称</div>
            <!--<div class="tableCell code">团队编码</div>-->
            <div class="tableCell organization">机构名称</div>
            <div class="tableCell leader">队长</div>
            <div class="tableCell count">团队人数</div>
            <div class="tableCell state">状态</div>
            <div class="tableCell handle">操作</div>
          </div>
          <div class="tableRow" v-for="(item, index) in dataList" :key="index">
            <div class="tableCell">{{index+1}}</div>
            <div class="tableCell">{{item.TDMC}}</div>
            <!--<div class="tableCell"></div>-->
            <div class="tableCell">{{item.ORGNAME}}</div>
            <div class="tableCell">{{item.DZXM}}</div>
            <div class="tableCell">{{item.CYSL}}</div>
            <div class="tableCell">{{item.ISENABLED ? '启动': '禁用'}}</div>
            <div class="tableCell">
              <el-button type="primary" class="major" v-if="team_edit" @click.prevent.stop="openTeamDialog(item.TDID)">
                编辑团队
              </el-button>
              <el-button type="primary" class="major" v-if="team_edit"
                         @click.prevent.stop="openMemberDialog(item.TDID, item.ORGID)">编辑成员
              </el-button>
              <el-button type="primary" class="major" v-if="team_edit"
                         @click.prevent.stop="disabledTeam(item.TDID, !item.ISENABLED)">
                {{item.ISENABLED ? '禁用': '启动'}}
              </el-button>
              <el-button type="danger" class="major" v-if="team_delete" @click.prevent.stop="handleDelete(item.TDID)">
                删除
              </el-button>
              <span v-if="!team_delete && !team_edit">暂无编辑权限</span>
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
      :title="'删除团队'"
      :isShowDialog="isShowTeam"
      :toggleContent="toggleTeamDialog"
      :confirmDialog="confirmDelete"
    >
      <div class="paddingBox">
        <commonTextArea v-model="ZXYY" :text="'删除原因'"></commonTextArea>
      </div>
    </assignAlertDialog>
    <!-- 是否删除角色结束 -->

    <!-- 团队窗口开始 -->
    <commonDialog
      :toggleMainContent='toggleMainContent'
      :show='isShowCommonDialog'
      :isShowText='false'
    >
      <addNewTeam
        :teamId="teamId"
        :toggleContent="toggleMainContent"
        @regetSource="searchTeamInfo"
        @openMember="openMemberDialog"
      >
      </addNewTeam>
    </commonDialog>
    <!-- 团队窗口结束 -->

    <!-- 团队成员窗口开始 -->
    <commonDialog
      :toggleMainContent='toggleMemberContent'
      :show='isShowMemberDialog'
      :isShowText='false'
    >
      <addNewTeamMember
        :teamId="teamId"
        :orgId="orgId"
        :toggleContent="toggleMemberContent"
        @regetSource="searchTeamInfo"
      >
      </addNewTeamMember>
    </commonDialog>
    <!-- 团队成员窗口结束 -->
  </div>
</template>

<script>
  import commonTextInput from '@/components/commonTextInput';
  import commonSelector from '@/components/commonSelector';
  import assignAlertDialog from '@/components/assignAlertDialog';                  // 通过/拒绝弹窗组件
  import addNewTeam from '@/components/addNewTeam';                                // 新增团队
  import commonDialog from '@/components/commonDialog';                            // 公共弹窗
  import addNewTeamMember from '@/components/addNewTeamMember';                   // 添加团队成员
  import commonTextArea from '@/components/commonTextArea';                       // 文本输入框

  export default {
    name: "teamManage",
    data() {
      return {
        isShowCommonDialog: false,                      // 是否展示新增弹窗
        isShowMemberDialog: false,                      // 是否成员弹窗
        isShowTeam: false,                              // 是否删除团队弹窗
        teamId: '',                                     // 团队Id用于区分编辑团队还是新增团队
        orgName: '',                                    // 机构名称
        orgId: '',                                      // 机构Id
        TDMC: '',                                       // 团队名称
        YSXM: '',                                       // 医生姓名
        ISENABLED: '',                                  // 是否禁用
        stateList: [
          {label: '全部', value: ''},
          {
            label: '启用',
            value: true
          },
          {
            label: '禁用',
            value: false
          }
        ],
        pageSize: 10,
        pageNo: 1,
        totalCount: 0,
        dataList: [],
        deleteId: '',                                   // 要删除的团队的Id
        team_add: false,                                // 添加团队权限
        team_edit: false,                               // 编辑团队权限
        team_delete: false,                             // 删除团队权限
        team_upload: false,                              // 上传团队权限
        ZXYY: '',                                      // 删除原因
      }
    },
    components: {
      commonTextInput,
      commonSelector,
      assignAlertDialog,
      addNewTeam,
      commonDialog,
      addNewTeamMember,
      commonTextArea
    },
    methods: {
      /**
       * 添加/编辑团队
       * @param val type:string
       */
      openTeamDialog(val) {
        this.teamId = val;
        this.toggleMainContent()
      },
      /**
       * 添加/编辑成员
       * @param val type:string
       * @param val type:string
       */
      openMemberDialog(val, orgId) {
        this.teamId = val;
        this.orgId = orgId;
        this.toggleMemberContent()
      },
      /**
       * 新增团队的隐藏与显示
       * @param fag
       **/
      toggleMainContent(fag) {
        if (fag === -1) {
          this.isShowCommonDialog = false;
        } else {
          this.isShowCommonDialog = !this.isShowCommonDialog;
        }
        if(!this.isShowCommonDialog){
          this.searchTeamInfo();
        }
      },
      /**
       * 新增/编辑成员的隐藏与显示
       * @param fag
       **/
      toggleMemberContent(fag) {
        if (fag === -1) {
          this.isShowMemberDialog = false;
        } else {
          this.isShowMemberDialog = !this.isShowMemberDialog;
        }
        if(!this.isShowMemberDialog){
          this.searchTeamInfo();
        }
      },
      /**
       * 删除团队的隐藏于显示
       * @param fag
       */
      toggleTeamDialog(fag) {
        if (fag === -1) {
          this.isShowTeam = false;
        } else {
          this.isShowTeam = !this.isShowTeam;
        }
        if(!this.isShowTeam){
          this.ZXYY = '';
        }
      },
      /**
       * 按照条件搜索信息
       */
      searchTeamInfo() {
        const {orgName, TDMC, YSXM, ISENABLED, pageSize, pageNo} = this;
        this.$post('family/teamAndMember/getPage', {
          orgName, TDMC, YSXM, ISENABLED, pageSize, pageNo
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
       * 删除团队
       */
      confirmDelete() {
        this.$post('family/teamAndMember/deleteTeam', {
          TDID: this.deleteId,
          ZXYY: this.ZXYY
        }).then(rsp => {
          this.searchTeamInfo();
          this.toggleTeamDialog(-1)
        }, rej => {
          if(rej.data.errcode === 460){
            this.$message.error(rej.data.datas[0].message);
          }else{
            this.$message.error(rej.data.errmsg);
          }})
      },
      /**
       * 调用删除
       * @param id
       */
      handleDelete(id) {
        this.deleteId = id;
        this.toggleTeamDialog()
      },
      /**
       * 禁用团队
       * @param TDID       type: string 团队ID
       * @param ISENABLED  type: boolean 是否禁用
       */
      disabledTeam(TDID, ISENABLED) {
        this.$post('family/teamAndMember/setTeamEnable', {
          TDID, ISENABLED
        }).then(rsp => {
          this.searchTeamInfo()
        }, rej => {
          if(rej.data.errcode === 460){
            this.$message.error(rej.data.datas[0].message);
          }else{
            this.$message.error(rej.data.errmsg);
          }})
      },
      /**
       * 改变pageSize
       * @param val
       */
      handleSizeChange(val) {
        this.pageSize = val;
        this.searchDiggList();
      },
      /**
       * 改变当前展示页
       */
      handleCurrentChange(val) {
        this.pageNo = val;
        this.searchDiggList();
      }
    },
    created() {
      this.searchTeamInfo();
      let authObj = JSON.parse(this.$localStore.getItem('authority'));
      // 初始化权限
      if(!!authObj){
        this.team_add = authObj['team_add'];
        this.team_edit = authObj['team_edit'];
        this.team_delete = authObj['team_delete'];
        this.team_upload = authObj['team_upload'];
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../style/teamManage.scss';
</style>
