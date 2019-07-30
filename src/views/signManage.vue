<template>
  <div class="signManage">
    <!-- 头部过滤条件开始 -->
    <div class="topSpecial">
      <commonSelector :options="provinceOptions" v-model="provinceId" :text="'全国地域'"></commonSelector>
      <commonSelector :options="cityOptions" v-model="cityId"></commonSelector>
      <commonSelector :options="areaOptions" v-model="areaId"></commonSelector>
      <commonTextInput v-model="medicalInsVal" :text="'医疗机构'"></commonTextInput>
      <commonTextInput v-model="doctorTeamVal" :text="'医生团队'"></commonTextInput>
    </div>
    <div class="filterCondition clearfix">
      <div class="items col-1 fl">
        <!--<commonSelector :options="signChannelList" v-model="signChannelVal" :text="'签约渠道'"></commonSelector>-->
        <commonTextInput v-model="doctorName" :text="'医生姓名'"></commonTextInput>
        <!--<commonSelector :options="personCategoryList" v-model="personCategoryVal" :text="'人群分类'"></commonSelector>-->
        <commonDatePicker v-model="applyDateVal" :text="'申请开始日期'" :pickerOptions="applyPickerOptions"></commonDatePicker>
      </div>
      <div class="item col-2 fl">
        <commonTextInput v-model="accountVal" :text="'户主姓名'"></commonTextInput>
        <commonDatePicker v-model="applyEndDateVal" :text="'申请结束日期'" :pickerOptions="applyEndPickerOptions"></commonDatePicker>
      </div>
      <div class="item col-3 fl">
        <commonTextInput v-model="identityCardVal" :text="'户主身份证'"></commonTextInput>
        <commonDatePicker v-model="approvalDateVal" :text="'审批开始日期'"
                          :pickerOptions="approvalPickerOptions"></commonDatePicker>

      </div>
      <div class="item col-4 fl">
        <commonTextInput v-model="signNameVal" :text="'签约人姓名'"></commonTextInput>
        <commonDatePicker v-model="approvalEndDateVal" :text="'审批结束日期'"
                          :pickerOptions="approvalEndPickerOptions"></commonDatePicker>
      </div>
      <div class="item col-5 fl">
        <commonTextInput v-model="signIdentityCardVal" :text="'签约人身份证'"></commonTextInput>
        <commonSelector :options="stateList" v-model="signSate" :text="'签约状态'"></commonSelector>
        <div class="btns">
          <el-button type="primary" class="major" @click.stop.prevent="searchSignList">查询</el-button>
          <el-button type="success" @click.prevent.stop="printExcel">导出</el-button>
        </div>
      </div>
    </div>
    <!-- 头部过滤条件结束 -->

    <!-- 签约列表开始 -->
    <div class="signList">
      <div class="signTitle">签约人群占比</div>
      <div class="signTable">
        <div class="tableHeader">
          <div class="tableCell index">序号</div>
          <div class="tableCell homeNum">家庭编号</div>
          <div class="tableCell account">户主</div>
          <div class="tableCell signer">签约人</div>
          <div class="tableCell signMachine">签约机构</div>
          <div class="tableCell signTeam">签约团队</div>
          <!--<div class="tableCell signDoctor">签约医生</div>-->
          <div class="tableCell signDate">申请日期</div>
          <div class="tableCell approvalDate">审批日期</div>
          <!--<div class="tableCell signChanel">签约渠道</div>-->
          <div class="tableCell state">状态</div>
          <div class="tableCell handle">操作</div>
        </div>
        <div class="tableRow" v-for="(item, index) in dataList" :key="index">
          <div class="tableCell index">
            <div>{{index+1}}</div>
          </div>
          <div class="tableCell homeNum">
            <div>{{item.JTIDSTR}}</div>
          </div>
          <div class="tableCell account">
            <div>{{item.HZXM}}</div>
          </div>
          <div class="tableCell signer">
            <div><span v-for="(val, key) in item.JTCYLB" :key="key">{{val.CYXM}}</span></div>
          </div>
          <div class="tableCell signMachine">
            <div>{{item.QYJGMC}}</div>
          </div>
          <div class="tableCell signTeam">
            <div>{{item.TDMC}}</div>
          </div>
          <!--<div class="tableCell signDoctor">-->
            <!--<div>{{item.DOCTORNAME}}</div>-->
          <!--</div>-->
          <div class="tableCell signDate">
            <div>{{item.SQRQ}}</div>
          </div>
          <div class="tableCell approvalDate">
            <div>{{item.AUDITTIME}}</div>
          </div>
          <!--<div class="tableCell signChanel">-->
          <!--<div>{{item.QYLY}}</div>-->
          <!--</div>-->
          <div class="tableCell state">
            <div>{{item.ORDERSTATUSNAME}}</div>
          </div>
          <div class="tableCell handle">
            <div class="tag" v-if="sign_check" @click.stop="handleDetailInfo(item.JTID, item.ORDERSTATUS, item.QYID)">
              <div class="icon" :style="{backgroundImage: 'url('+iconImg +')'}"></div>
              <span>操作</span>
            </div>
            <div class="tag disabled" v-if="!sign_check">
              <span>暂无权限查看</span>
            </div>
          </div>
        </div>
      </div>
      <div class="noneData" v-if="dataList.length === 0">
        暂无数据
      </div>
      <commonDialog
        :isShowText="false"
        :toggleMainContent='toggleMainContent'
        :show='isShowCommonDialog'
      >
        <assignDialog
          :JTID="JTID"
          :QYID="QYID"
          :ORDERSTATUS="ORDERSTATUS"
          :toggleMainContent="toggleMainContent"
        >
        </assignDialog>
      </commonDialog>
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
    <!-- 签约列表结束 -->
    <div @click.prevent.stop="itemClick" style="cursor: pointer">
      点击点击
    </div>
    <iframe class="myIframe" frameborder=0 name="showHere" scrolling=auto src="">
      <pdfPrint
        ref="print"
        :PARTYA="pdfInfo.PARTYA"
        :PARTYB="pdfInfo.PARTYB"
        :SFZJH="pdfInfo.SFZJH"
        :LXDH="pdfInfo.LXDH"
        :JTZZ="pdfInfo.JTZZ"
        :TDMC="pdfInfo.TDMC"
        :TDCYList="pdfInfo.TDCYList"
        :TDZRYS="pdfInfo.TDZRYS"
        :TDLXDH="pdfInfo.TDLXDH"
        :QYFWList="pdfInfo.QYFWList"
        :JTCYList="pdfInfo.JTCYList"
      >
      </pdfPrint>
    </iframe>

  </div>
</template>

<script>
  import * as FileSaver from 'file-saver';
  import Excel from 'exceljs';
  import commonSelector from '@/components/commonSelector';               // 公共选择器
  import commonTextInput from '@/components/commonTextInput';             // 公共输入框
  import commonDatePicker from '@/components/commonDatePicker';           // 公共日期选择
  import commonDialog from '@/components/commonDialog';                   // 公共弹窗
  import assignDialog from '@/components/assignDialog';                  // 签约详情弹窗
  import pdfPrint from '@/components/pdfPrint';                          // pdf打印组件
  import iconImg from '@/assets/btn_see.png';
  import util from '@/common/js/util';

  const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const ONE_DAY = 24*60*60*1000;

  export default {
    name: "signManage",
    components: {
      commonTextInput,
      commonSelector,
      commonDatePicker,
      commonDialog,
      assignDialog,
      pdfPrint
    },
    data() {
      return {
        isShowCommonDialog: false,             // 是否展示公共弹窗
        iconImg,
        provinceId: '',                        // 省份id
        provinceOptions: [],                   // 省份list
        cityId: '',                            // 城市id
        cityOptions: [],                       // 城市list
        areaId: '',                             // 地区id
        areaOptions: [],                       // 地区List
        accountVal: '',                         // 户主姓名
        applyDateVal: '',                      // 申请日期
        applyPickerOptions: {
          disabledDate: (time) => {
            let nowData = new Date();
            if (this.applyEndDateVal) {
              // 只可以选早于审核日期的数据
              let approvalDate = new Date(this.applyEndDateVal);
              return time > nowData || time > approvalDate
            } else {
              // 不能选大于当天的数据
              return time > nowData
            }
          }
        },
        applyEndDateVal: '',                    // 结束申请日期
        applyEndPickerOptions: {
          disabledDate: (time) => {
            let nowData = new Date();
            if (this.applyDateVal) {
              // 只可以选大于申请日期的数据
              let applyDate = new Date(this.applyDateVal);
              return time > nowData || (time < applyDate && !(applyDate.getTime() - time.getTime() > 0 && applyDate.getTime() - time.getTime() < ONE_DAY))
            } else {
              // 不能选大于当天的数据
              return time > nowData
            }
          }
        },
        medicalInsVal: '',                     // 医疗机构
        identityCardVal: '',                   // 户主身份证
        approvalDateVal: '',                   // 审批日期
        approvalPickerOptions: {
          disabledDate: (time) => {
            let nowData = new Date();
            if (this.approvalEndDateVal) {
              // 只可以选早于审核日期的数据
              let approvalDate = new Date(this.approvalEndDateVal);
              return time > nowData || time > approvalDate

            } else {
              // 不能选大于当天的数据
              return time > nowData
            }
          }
        },
        approvalEndDateVal: '',                // 审批结束日期
        approvalEndPickerOptions: {
          disabledDate: (time) => {
            let nowData = new Date();
            if (this.approvalDateVal) {
              // 只可以选大于申请日期的数据
              let applyDate = new Date(this.approvalDateVal);
              return time > nowData || (time < applyDate && !(applyDate.getTime() - time.getTime() > 0 && applyDate.getTime() - time.getTime() < ONE_DAY))
            } else {
              // 不能选大于当天的数据
              return time > nowData
            }
          }
        },
        doctorTeamVal: '',                     // 医生团队
        doctorTeamId: '',                      // 医生团队Id
        signNameVal: '',                       // 签约人姓名
        signSate: '',                          // 签约状态
        doctorName: '',                        // 医生姓名
        signIdentityCardVal: '',               // 签约人身份证
        stateList: [                            // 签约状态List
          {
            value: null,
            label: '全部'
          },
          {
            value: 0,
            label: '待审核'
          },
          {
            value: 1,
            label: '已签约'
          },
          {
            value: 2,
            label: '已拒绝'
          },
          {
            value: 3,
            label: '已取消'
          },
          {
            value: 4,
            label: '已解约'
          },
          {
            value: 5,
            label: '已过期'
          }
        ],
        // signChannelVal: '',                   // 签约渠道
        // signChannelList: [                     // 签约渠道List
        //   {
        //     value: '0',
        //     label: '全部'
        //   },
        //   {
        //     value: '1',
        //     label: '其他'
        //   }
        // ],
        personCategoryVal: '',                 // 人群分类
        personCategoryList: [                   // 人群分类List
        ],
        JTID: '',                              // 家庭Id
        QYID: '',                              // 签约ID
        pageSize: 10,                          // 必填
        pageNo: 1,                            // 页码
        totalCount: 0,                         // 总数
        dataList: [],                          // 签约人群List
        sign_check: false,                    // 详情查看权限
        ORDERSTATUS: '',                            // 被查看单的签约状态
        pdfInfo: {},                           // pdf内容
        isShowPdf: false
      }
    },
    watch:{
      provinceId(val){
        if(val){
          this.getRegion(val, (data)=>{
            this.cityOptions = data.map(item=>{
              return {
                label: item.name,
                value: item.unitId
              }
            });
          })
        }else{
          this.cityId = '';
          this.areaId = '';
          this.cityOptions = [];
          this.areaOptions = [];
        }
      },
      cityId(val){
        if(val){
          this.getRegion(val, (data)=>{
            this.areaOptions = data.map(item=>{
              return {
                label: item.name,
                value: item.unitId
              }
            });
          })
        }
      }
    },
    methods: {
      /**
       * 赛事筛选框的隐藏与显示
       * @param fag
       */
      toggleMainContent(fag) {
        if (fag === -1) {
          this.isShowCommonDialog = false;
          // $('body').css('overflow-y', 'auto');
        } else {
          this.isShowCommonDialog = !this.isShowCommonDialog;
          // 阻止弹框外的页面跟随弹框滚动
          // if (this.isShowCommonDialog) {
          //   $('body').css('overflow-y', 'hidden');
          // } else {
          //   $('body').css('overflow-y', 'auto');
          // }
        }
        if (!this.isShowCommonDialog) {
          this.initData()
        }
      },
      /**
       * 搜索筛选家医签约列表
       */
      searchSignList() {
        this.initData()
      },
      /**
       * 获取下级列表
       * @param parentId
       * @param callback
       */
      getRegion(parentId, callback) {
        this.$post('region/getChild', {parentId}).then(rsp => {
          callback(rsp.datas)
        }, rej => {
          if(rej.data.errcode === 460){
            this.$message.error(rej.data.datas[0].message);
          }else{
            this.$message.error(rej.data.errmsg);
          }})
      },
      /**
       * 导出Excel文件功能
       */
      printExcel() {
        let workbook = new Excel.Workbook();
        // 基本的创建信息
        workbook.creator = "Me";
        workbook.lastModifiedBy = "Her";
        workbook.created = new Date(1985, 8, 30);
        workbook.modified = new Date();
        workbook.lastPrinted = new Date(2016, 9, 27);
        // 视图大小， 打开Excel时，整个框的位置，大小
        workbook.views = [
          {
            x: 0,
            y: 0,
            width: 1000,
            height: 2000,
            firstSheet: 0,
            activeTab: 1,
            visibility: "visible"
          }
        ];

        // 标签创建
        let worksheet = workbook.addWorksheet("签约人群", {
          pageSetup: {paperSize: 9, orientation: 'landscape'}
        });
        worksheet.columns = [
          {header: '序号', key: 'index', width: 8},
          {header: '家庭编号', key: 'JTID', width: 50},
          {header: '户主', key: 'HZXM', width: 20},
          {header: '签约人', key: 'CYXM', width: 20},
          {header: '签约机构', key: 'QYJGMC', width: 20},
          {header: '签约团队', key: 'TDMC', width: 16.63},
          {header: '申请日期', key: 'SQRQ', width: 20},
          {header: '审批日期', key: 'AUDITTIME', width: 20},
          {header: '状态', key: 'ORDERSTATUSNAME', width: 16.63}
        ];
        worksheet.getRow(1).values = ['序号', '家庭编号', '户主', '签约人', '签约机构', '签约团队', '申请日期', '审批日期', '状态'];
        worksheet.getRow(1).alignment = {vertical: 'center', horizontal: 'center'};

        this.dataList.forEach((item, index)=>{
          let rowValues =[];
          let strArr = item.JTCYLB.map(item=>{
            return item.CYXM;
          });
          rowValues[0] = index+1;
          rowValues[1] = item.JTID;
          rowValues[2] = item.HZXM;
          rowValues[3] = strArr.join(",");
          rowValues[4] = item.QYJGMC;
          rowValues[5] = item.TDMC;
          rowValues[6] = item.SQRQ;
          rowValues[7] = item.AUDITTIME;
          rowValues[8] = item.ORDERSTATUSNAME;
          worksheet.getRow(index+2).values = rowValues;
          worksheet.getRow(index+2).alignment = {vertical: 'center', horizontal: 'center'};
        });
        workbook.xlsx.writeBuffer().then((data) => {
          const blob = new Blob([data], {type: EXCEL_TYPE});
          FileSaver.saveAs(blob, 'download.xlsx');
        })
      },
      /**
       * 初始化数据
       */
      initData() {
        const {
          provinceId, cityId, areaId, medicalInsVal, doctorTeamId, doctorName, signNameVal,
          accountVal, identityCardVal, personCategoryVal, signIdentityCardVal, doctorTeamVal,
          pageSize, pageNo, applyDateVal, applyEndDateVal, approvalDateVal, approvalEndDateVal, signSate
        } = this;
        this.$post('family/sign/order/getPage', {
          PROVINCEID: provinceId,
          CITYID: cityId,
          DISTRICTID: areaId,
          ORGNAME: medicalInsVal,
          // TEAMID: doctorTeamId,
          TEAMNAME: doctorTeamVal,
          DOCTORNAME: doctorName,
          HZXM: accountVal,
          HZSFZJH: identityCardVal,
          CYXM: signNameVal,
          CYSFZJH: signIdentityCardVal,
          // RQFLID: personCategoryVal,
          BEGINSQRQ: applyDateVal,
          ENDSQRQ: applyEndDateVal,
          BEGINSPRQ: approvalDateVal,
          ENDSPRQ: approvalEndDateVal,
          ORDERSTATUS: signSate,
          pageSize,
          pageNo
        }).then(rsp => {
          this.totalCount = rsp.total;
          // 家庭编号缩略
          rsp.datas.forEach(item=>{
            item.JTIDSTR = util.secretData(item.JTID, 'num');
          });
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
        this.initData();
      },
      /**
       * 改变当前展示页
       */
      handleCurrentChange(val) {
        this.pageNo = val;
        this.initData();
      },
      /**
       * 打开家庭具体信息
       * @param JTID  家庭Id
       * @param ORDERSTATUS 签约单状态
       */
      handleDetailInfo(JTID, ORDERSTATUS, QYID) {
        this.JTID = JTID;
        this.ORDERSTATUS = ORDERSTATUS;
        this.QYID = QYID;
        this.toggleMainContent()
      },
      itemClick(){
        this.$post('family/sign/order/buildPdf',{
          QYID: 'ecb654c9fe1b411689dfdcbdb1628807'
        }).then(rsp=>{
          // this.isShowPdf = true;
          console.log(this.$refs.print, 'this.$refs.print');
          this.pdfInfo = rsp.data;
          this.$print(this.$refs.print.$el);
          console.log(rsp,'rsp');
        }, rej=>{
          console.log(rej,'rej');
        });
        // axios({
        //   method: 'post',
        //   data: {
        //     // QYID: '123123',
        //     // JTID: '123123'
        //   },
        //   responseType:'blob',
        //   url: 'family/sign/order/buildPdf'
        // }).then(data=>{
        //
        // },rej=>{
        //   let url;
        //   url = window.URL.createObjectURL(new Blob([rej.data],{type:"application/zip"}));
        //   window.open('/static/pdf/web/viewer.html?file=' + encodeURIComponent(url) + '&.pdf')
        // });
      }
    },
    created() {
      this.initData();
      let authObj = JSON.parse(this.$localStore.getItem('authority'));
      // 初始化查看详情权限
      if (!!authObj) {
        this.sign_check = authObj['sign_check'];
      }
      this.getRegion('', (data)=>{
        this.provinceOptions = data.map(item=>{
          return {
            label: item.name,
            value: item.unitId
          }
        });
        this.provinceOptions.unshift({
          label: '不限',
          value: ''
        })
      })
    }
  }
</script>

<style lang="scss">
  @import '../style/signManage.scss';
  .pdf{
    color: skyblue;
    font-size: 24px;
  }
  .myIframe{
    height: 0;
  }
</style>
