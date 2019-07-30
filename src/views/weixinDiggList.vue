<template>
  <div class="weixinDiggList">
    <div class="weixinDiggTitle">
      <commonTextInput :text="'机构名称'" v-model="orgName"></commonTextInput>
      <commonTextInput :text="'公众号名称'" v-model="appName"></commonTextInput>
      <commonSelector :text="'状态'" :options="stateList" v-model="isEnabled"></commonSelector>
      <el-button type="primary" class="major" @click.prevent.stop="searchDiggList">查询</el-button>
    </div>
    <div class="weixinDiggList">
      <div class="weixinDiggTitle">
        <p class="title">公众号列表</p>
        <div class="functionBtns">
          <el-button type="success" class="major" v-if="wx_secret_upload" @click.stop.prevent="">导入</el-button>
          <el-button type="primary" class="major" v-if="wx_secret_add" @click.stop.prevent="openDiggInfo('')">新增</el-button>
        </div>
      </div>
      <div class="weixinDiggTable">
        <div class="tableHeader">
          <div class="tableCell index">序号</div>
          <div class="tableCell organization">机构名称</div>
          <div class="tableCell commonPackage">公众号名称</div>
          <div class="tableCell levelPackage">创建时间</div>
          <div class="tableCell diyPackage">状态</div>
          <div class="tableCell handle">操作</div>
        </div>
        <div class="tableRow" v-for="(item, index) in dataList" :key="index">
          <div class="tableCell index">
            <div>{{index+1}}</div>
          </div>
          <div class="tableCell organization">
            <div>{{item.orgName }}</div>
          </div>
          <div class="tableCell commonPackage">
            <div>{{item.appName}}</div>
          </div>
          <div class="tableCell levelPackage">
            <div>{{item.createTime}}</div>
          </div>
          <div class="tableCell diyPackage">
            <div>{{item.isEnabled ? '启用' : '禁用'}}</div>
          </div>
          <div class="tableCell handle">
            <el-button type="primary" class="major" v-if="wx_secret_edit" @click.prevent.stop="openDiggInfo(item.wxConfigId)">编辑</el-button>
            <el-button type="primary" class="major" v-if="wx_secret_edit" @click.prevent.stop="disabledApp(item.wxConfigId, !item.isEnabled)">
              {{item.isEnabled ? '禁用' : '启用'}}
            </el-button>
            <span v-if="!wx_secret_edit">暂无权限编辑</span>
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
    <editWeixinDiggList
      :isShow="isShowWeixinInfo"
      :toggleMainContent="toggleMainContent"
      :wxConfigId="wxConfigId"
    >

    </editWeixinDiggList>
  </div>
</template>

<script>
  import commonTextInput from '@/components/commonTextInput';
  import editWeixinDiggList from '@/components/editWeixinDiggList';
  import commonSelector from '@/components/commonSelector';

  export default {
    name: "weixinDiggList",
    components: {
      commonTextInput,
      editWeixinDiggList,
      commonSelector
    },
    data() {
      return {
        wxConfigId: '',                   // 公众号Id
        orgName: '',                      // 机构名称
        appName: '',                      // 公众号名称
        isEnabled: '',                    // 公众号状态是否启用
        pageNo: 1,                        // 当前页码
        pageSize: 10,                     // 当前条数
        totalCount: 0,                    // 页面信息数量（留待后面分页器用）
        dataList: [],                     // 公众号List
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
        isShowWeixinInfo: false,
        isShowWeixinDiggDialog: false,
        wx_secret_add: false,             // 添加权限
        wx_secret_edit: false,            // 编辑权限
        wx_secret_upload: false           // 上传权限
      }
    },
    methods: {
      /**
       * 开关查看弹窗
       * @param fag
       */
      toggleMainContent(fag) {
        if (fag === -1) {
          this.isShowWeixinInfo = false;
        } else {
          this.isShowWeixinInfo = !this.isShowWeixinInfo;
        }
        if(!this.isShowWeixinInfo){
          this.searchDiggList()
        }
      },
      /**
       * 添加/编辑微信公众号
       * @param wxConfigId type: string
       */
      openDiggInfo(wxConfigId) {
        this.wxConfigId = wxConfigId;
        this.toggleMainContent();
      },
      /**
       * 开关查看微信公众号编辑窗口
       * @param fag
       */
      toggleInfoDialog(fag) {
        if (fag === -1) {
          this.isShowWeixinDiggDialog = false;
        } else {
          this.isShowWeixinDiggDialog = !this.isShowWeixinDiggDialog;
        }
      },
      /**
       * 禁用公众号
       * @param wxConfigId    type:string
       * @param isEnabled     type:boolean
       */
      disabledApp(wxConfigId, isEnabled) {
        this.$post('wx/secret/info/setEnable', {
          wxConfigId,
          isEnabled
        }).then(rsp => {
          this.searchDiggList();
          // console.log('禁用成功');
        }, rej => {
          if(rej.data.errcode === 460){
            this.$message.error(rej.data.datas[0].message);
          }else{
            this.$message.error(rej.data.errmsg);
          }})
      },
      /**
       * 查询微信公众号List
       */
      searchDiggList() {
        const {orgName, appName, isEnabled, pageNo, pageSize} = this;
        this.$post('wx/secret/info/getPage', {
          orgName, appName, isEnabled, pageNo, pageSize
        }).then(rsp => {
          this.dataList = rsp.datas;
          this.totalCount = rsp.total;
        }, rej => {
          if(rej.data.errcode === 460){
            this.$message.error(rej.data.datas[0].message);
          }else{
            this.$message.error(rej.data.errmsg);
          }});
      },
      /**
       * 改变pageSize
       * @param val
       */
      handleSizeChange(val){
        this.pageSize = val;
        this.searchDiggList();
      },
      /**
       * 改变当前展示页
       */
      handleCurrentChange(val){
        this.pageNo = val;
        this.searchDiggList();
      }
    },
    created() {
      this.searchDiggList();
      let authObj = JSON.parse(this.$localStore.getItem('authority'));
      // 初始化权限
      if(!!authObj){
        this.wx_secret_add = authObj['wx_secret_add'];
        this.wx_secret_edit = authObj['wx_secret_edit'];
        this.wx_secret_upload = authObj['wx_secret_upload'];
      }
    }
  }
</script>

<style lang="scss">
  @import '../style/weixinDiggList.scss';
</style>
