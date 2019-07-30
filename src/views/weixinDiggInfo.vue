<template>
  <div class="weixinDiggInfo">
    <div class="weixinDiggSearch">
      <commonTextInput :text="'机构名称'" v-model="orgName"></commonTextInput>
      <commonTextInput :text="'公众号名称'" v-model="appName"></commonTextInput>
      <commonTextInput :text="'主题'" v-model="title"></commonTextInput>
      <commonSelector :text="'板块'" v-model="category" :options="categoryList"></commonSelector>

    </div>
    <div class="weixinDiggTime clearfix">
     <div class="filterTime fl">
       <commonDatePicker :text="'起始时间'" :placeholderText="'请选择时间'" :pickerOptions="beginPickerOptions" v-model="beginPubTime"></commonDatePicker>
       <commonDatePicker :text="'结束时间'" :placeholderText="'请选择时间'" :pickerOptions="endPickerOptions" v-model="endPubTime"></commonDatePicker>
     </div>
      <el-button type="primary" class="major fr" @click.prevent.stop="searchDiggInfo">查询</el-button>
    </div>
    <div class="weixinDiggContent">
      <div class="personTitle">
        <p class="title">资讯列表</p>
        <div class="functionBtns">
          <!--v-if="wx_news_add"-->
          <el-button type="primary" class="major"  @click.stop.prevent="openDiggInfo('')">新增
          </el-button>
        </div>
      </div>
      <div class="personContent">
        <div class="personTable">
          <div class="tableHeader">
            <div class="tableCell index">序号</div>
            <div class="tableCell name">机构名称</div>
            <div class="tableCell code">公众号名称</div>
            <div class="tableCell organization">主题</div>
            <div class="tableCell leader">板块</div>
            <div class="tableCell count">阅读</div>
            <div class="tableCell state">点赞</div>
            <div class="tableCell provide">发布时间</div>
            <div class="tableCell handle">操作</div>
          </div>
          <div class="filterDate"></div>
          <div class="tableRow" v-for="(item, index) in dataList" :key="index">
            <div class="tableCell">{{index+1}}</div>
            <div class="tableCell">{{item.category === 0 ? '所有版块' : item.orgName}}</div>
            <div class="tableCell">{{item.category === 0 ? '所有公众号' : item.appName}}</div>
            <div class="tableCell">{{item.title}}</div>
            <div class="tableCell">{{item.category}}</div>
            <div class="tableCell">{{item.readingNumber}}</div>
            <div class="tableCell">{{item.approveNumber}}</div>
            <div class="tableCell">{{item.createTime}}</div>
            <div class="tableCell">
              <el-button type="primary" class="major" v-if="wx_news_edit"
                         @click.prevent.stop="setTopState(item.newsId, !item.isSticky)">{{item.isSticky ? '取消置顶' :
                '置顶'}}
              </el-button>
              <el-button type="primary" class="major" v-if="wx_news_edit"
                         @click.prevent.stop="openDiggInfo(item.newsId)">编辑
              </el-button>
              <el-button type="danger" class="major" v-if="wx_news_delete"
                         @click.prevent.stop="deleteDiggInfo(item.newsId)">删除
              </el-button>
              <span v-if="!wx_news_edit && !wx_news_delete">暂无编辑权限</span>
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
    <!-- 是否删除文章开始 -->
    <assignAlertDialog
      :title="'删除公众号资讯'"
      :isShowDialog="isShowRole"
      :toggleContent="toggleRoleDialog"
      :confirmDialog="confirmDelete"
    >
      <div class="paddingBox">是否确定删除该公众号资讯</div>
    </assignAlertDialog>
    <!-- 是否删除文章结束 -->

    <!-- 新增/编辑公众号内容弹窗开始 -->
    <editWeixinDiggInfo
      :isShow="isShowCommonDialog"
      :toggleMainContent="toggleMainContent"
      :newsId="newsId"
    >

    </editWeixinDiggInfo>
    <!-- 新增/编辑公众号内容弹窗结束 -->
  </div>
</template>

<script>
  import commonTextInput from '@/components/commonTextInput';
  import commonSelector from '@/components/commonSelector';
  import assignAlertDialog from '@/components/assignAlertDialog';                  // 通过/拒绝弹窗组件
  import commonDialog from '@/components/commonDialog';                            // 公共弹窗
  import commonDatePicker from '@/components/commonDatePicker';                    // 日期插件
  import editWeixinDiggInfo from '@/components/editWeixinDiggInfo';                // 编辑公众号内容弹窗
  export default {
    name: "weixinDiggInfo",
    components: {
      commonTextInput,
      commonSelector,
      assignAlertDialog,
      editWeixinDiggInfo,
      commonDialog,
      commonDatePicker
    },
    data() {
      return {
        isShowRole: false,                              // 是否删除角色弹窗
        isShowCommonDialog: false,                      // 是否展示新增弹窗
        deleteId: '',                                   // 删除id
        newsId: '',                                     // 微信公众号Id
        dataList: [],                                   // 微信公众号List
        orgName: '',                                    // 机构名称
        appName: '',                                    // 公众号名称
        title: '',                                      // 资讯标题
        category: '',                                   // 资讯板块
        beginPubTime: '',                               // 发布时间
        beginPickerOptions: {
          disabledDate: (time) => {
            let nowData = new Date();
            if (this.endPubTime) {
              // 只可以选早于审核日期的数据
              let approvalDate = new Date(this.endPubTime);
              return time > nowData || time > approvalDate
            } else {
              // 不能选大于当天的数据
              return time > nowData
            }
          }
        },
        endPubTime: '',                                 // 发布结束时间
        endPickerOptions: {
          disabledDate: (time) => {
            let nowData = new Date();
            if (this.beginPubTime) {
              // 只可以选大于申请日期的数据
              let applyDate = new Date(this.beginPubTime);
              return time > nowData || time < applyDate
            } else {
              // 不能选大于当天的数据
              return time > nowData
            }
          }
        },
        categoryList: [                             // 板块List
          {
            label: '全部资讯',
            value: ''
          },
          {
            label: '公共资讯',
            value: 0
          },
          {
            label: '机构资讯',
            value: 1
          },
        ],
        pageNo: 1,
        pageSize: 10,
        totalCount: 0,                                  // 资讯总数
        wx_news_add: false,                             // 添加权限
        wx_news_edit: false,                            // 编辑权限
        wx_news_delete: false                           // 删除权限
      }
    },
    methods: {
      /**
       * 删除资讯选框的隐藏与显示
       * @param fag
       **/
      toggleRoleDialog(fag) {
        if (fag === -1) {
          this.isShowRole = false;
        } else {
          this.isShowRole = !this.isShowRole;
        }
        if(!this.isShowRole){
          this.searchDiggInfo()
        }
      },
      /**
       * 新增资讯的隐藏与显示
       * @param fag
       **/
      toggleMainContent(fag) {
        if (fag === -1) {
          this.isShowCommonDialog = false;
        } else {
          this.isShowCommonDialog = !this.isShowCommonDialog;
        }
        if(!this.isShowCommonDialog){
          this.searchDiggInfo()
        }
      },
      /**
       * 新闻资讯设置置顶
       * @param newsId      公众号资讯Id
       * @param isSticky    是否置顶
       */
      setTopState(newsId, isSticky) {
        this.$post('news/updateSticky', {
          newsId,
          isSticky
        }).then(rsp => {
          this.searchDiggInfo();
        }, rej => {
          if(rej.data.errcode === 460){
            this.$message.error(rej.data.datas[0].message);
          }else{
            this.$message.error(rej.data.errmsg);
          }});
      },
      /**
       * 添加/编辑公众号新闻资讯
       * @param newsId type: string
       */
      openDiggInfo(newsId) {
        this.newsId = newsId;
        this.toggleMainContent();
      },
      /**
       * 查询微信公众号咨询列表
       */
      searchDiggInfo() {
        const {orgName, appName, title, category, beginPubTime, endPubTime, pageSize, pageNo} = this;
        this.$post('news/getPage', {
          orgName, appName, title, category, beginPubTime, endPubTime, pageSize, pageNo
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
       * 删除资讯
       * @param newsId type:string
       */
      deleteDiggInfo(newsId) {
        this.deleteId = newsId;
        this.toggleRoleDialog();
      },
      /**
       * 确认删除资讯
       */
      confirmDelete() {
        this.$post('news/delete', {
          newsId: this.deleteId
        }).then(rsp => {
          // console.log("确认删除资讯");
          this.toggleRoleDialog(-1)
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
      this.searchDiggInfo();
      let authObj = JSON.parse(this.$localStore.getItem('authority'));
      // 初始化权限
      if (!!authObj) {
        this.wx_news_add = authObj['wx_news_add'];
        this.wx_news_edit = authObj['wx_news_edit'];
        this.wx_news_delete = authObj['wx_news_delete'];
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../style/weixinDiggInfo.scss';
</style>
