<template>
  <div class="memberManage">
    <div class="memberSearch">
      <commonTextInput :text="'全国机构'" v-model="orgName"></commonTextInput>
      <commonTextInput :text="'医疗姓名'" v-model="doctorName"></commonTextInput>
      <commonTextInput :text="'医生编码'" v-model="doctorCode"></commonTextInput>
      <commonSelector :text="'职称'" v-model="posTitleName"></commonSelector>
      <el-button type="primary" class="major" @click.stop.prevent="searchMember">查询</el-button>
    </div>
    <div class="roleManageContent">
      <div class="personTitle">
        <p class="title">成员列表</p>
      </div>
      <div class="personContent">
        <div class="personTable">
          <div class="tableHeader">
            <div class="tableCell index">序号</div>
            <div class="tableCell name">姓名</div>
            <div class="tableCell code">医生编码</div>
            <div class="tableCell gender">性别</div>
            <div class="tableCell job">职称</div>
            <div class="tableCell organization">机构</div>
            <div class="tableCell handle">操作</div>
          </div>
          <div class="tableRow" v-for="(item, index) in dataList" :key="index">
            <div class="tableCell">{{index+1}}</div>
            <div class="tableCell">{{item.doctorName}}</div>
            <div class="tableCell">{{item.doctorCode}}</div>
            <div class="tableCell">{{item.sexName}}</div>
            <div class="tableCell">{{item.posTitleName}}</div>
            <div class="tableCell">{{item.orgName}}</div>
            <div class="tableCell">
              <el-button type="primary" v-if="team_member_edit" class="major"
                         @click.prevent.stop="searchOneMember(item.doctorId)">编辑
              </el-button>
              <span v-if="!team_member_edit">暂无权限编辑</span>
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
    <!-- 是否打开编辑角色窗口开始 -->
    <editRoleMember
      :id="memberId"
      :toggleMainContent='toggleMainContent'
      :show='isShowEditDialog'
    >

    </editRoleMember>
    <!-- 是否打开编辑角色窗口结束 -->
  </div>
</template>

<script>
  import commonTextInput from '@/components/commonTextInput';
  import commonSelector from '@/components/commonSelector';
  import editRoleMember from '@/components/editRoleMember';                        // 编辑角色
  export default {
    name: "memberManage",
    components: {
      commonTextInput,
      commonSelector,
      editRoleMember
    },
    data() {
      return {
        isShowEditDialog: false,          // 编辑窗口状态
        memberId: '',                     // 成员id
        orgName: '',                      // 机构名称
        doctorName: '',                   // 医生姓名
        doctorCode: '',                   // 医生唯一编码
        posTitleName: '',                 // 医生职称
        pageNo: 1,                        // 当前页码
        pageSize: 10,                     // 当前条数
        totalCount: 0,                    // 页面信息数量（留待后面分页器用）
        dataList: [],                     // 医生成员列表
        team_member_edit: false           // 成员编辑权限
      }
    },
    methods: {
      /**
       * 开关编辑弹窗
       * @param fag
       */
      toggleMainContent(fag) {
        if (fag === -1) {
          this.isShowEditDialog = false;
        } else {
          this.isShowEditDialog = !this.isShowEditDialog;
        }
      },
      /**
       * 查询某个成员（医生）信息
       * @param id 医生id
       */
      searchOneMember(id) {
        this.memberId = id;
        this.toggleMainContent();
      },
      /**
       * 查询成员列表（医生）
       */
      searchMember() {
        const {orgName, doctorName, doctorCode, posTitleName, pageNo, pageSize} = this;
        this.$post('doctor/getPage', {orgName, doctorName, doctorCode, posTitleName, pageNo, pageSize}).then(rsp => {
          this.totalCount = rsp.total;
          this.dataList = rsp.datas;
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
        this.searchMember();
      },
      /**
       * 改变当前展示页
       */
      handleCurrentChange(val) {
        this.pageNo = val;
        this.searchMember();
      }
    },
    created() {
      this.searchMember();
      let authObj = JSON.parse(this.$localStore.getItem('authority'));
      // 初始化权限
      if(authObj){
        this.team_member_edit = authObj['team_member_edit'];
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../style/memberManage.scss';
</style>
