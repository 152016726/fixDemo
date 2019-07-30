<template>
  <div class="assignDialog">
    <!-- 签约弹窗公共头部开始 -->

    <!-- 签约弹窗头部横栏开始 -->
    <div class="assignDialogTitle">
      <span>签约详情</span>
      <div class="closeIcon" @click.stop="closeContent">&times;</div>
    </div>
    <!-- 签约弹窗公共横栏结束 -->

    <!-- 签约弹窗签约列表切换开始 -->
    <div class="assignDialogContent">
      <p class="contentTitle">签约列表>签约详情</p>
      <div class="fileList clearfix">
        <div v-for="(item, index) in fileList"
             :key="index"
             class="file fl"
             :class="{active: index=== activeIndex}"
             @click.stop="toggleFile(index)"
        >
          {{item}}
        </div>
      </div>
      <!-- 签约弹窗档案展示内容开始 -->

      <!-- 新建健康档案信息开始 -->
      <div class="createNewFile" v-if="activeIndex === 0">
        <!-- 个人档案开始 -->
        <commonToggle
          v-for="(item, index) in familyInfo.JTCYJKDA"
          :title="index===0 ? '户主信息' : '家庭成员'+(index+1)"
          :isDefaultShow="index===0"
          :key="index"
        >
          <assignBaseInfo :isShowBorder="index !== familyInfo.JTCYJKDA.length-1" :memberInfo="item"
                          :isDisabled="isDisabledHealths"></assignBaseInfo>
        </commonToggle>
        <div class="btns" v-if="APPROVAL_LIST.indexOf(ORDERSTATUS) !== -1 && sign_audit">
        <!--<div class="btns" v-if="sign_audit">-->
          <el-button v-if="healthStatus === 0" type="primary" class="major" @click.prevent.stop="toggleHealthDialog">
            通过
          </el-button>
          <el-button v-if="healthStatus === 0" type="danger" @click.prevent.stop="toggleRejctDialog">拒绝</el-button>
          <span v-if="healthStatus === 1" class="established">已建立健康档案</span>
          <span v-if="healthStatus === 2" class="refused">已拒绝健康档案</span>
        </div>
        <!-- 个人档案结束 -->
      </div>
      <!-- 新建健康档案信息结束 -->

      <!-- 新建家庭档案信息开始 -->
      <div class="createHomeFile" v-if="activeIndex === 1">
        <p class="fileName">基本资料</p>
        <div class="baseInfo">
          <commonTextInput v-model="JDJGMC" :text="'建档单位'" :isDisabled="isDisabledFamily || isHandleFamily"></commonTextInput>
          <commonTextInput v-model="GDJGMC" :text="'存档单位'" :isDisabled="isDisabledFamily || isHandleFamily"></commonTextInput>
          <commonTextInput v-model="JDRMC" :text="'建档人'" :isDisabled="isDisabledFamily || isHandleFamily"></commonTextInput>
          <commonTextInput v-model="ZRYSMC" :text="'责任医生'" :isDisabled="isDisabledFamily || isHandleFamily"></commonTextInput>
        </div>
        <commonAreaSelector
          :text="'现住地址'"
          :province.sync="PROVINCEDID"
          :city.sync="CITYID"
          :area.sync="DISTRICTID"
          :street.sync="STREETID"
          :village.sync="COMMITTEEID"
          :address.sync="XXDZ"
          :isDisabled="isDisabledFamily || isHandleFamily"
        >
        </commonAreaSelector>
        <commonAreaSelector
          :text="'网格地址'"
          :province.sync="PROVINCEDID"
          :city.sync="CITYID"
          :area.sync="DISTRICTID"
          :street.sync="STREETID"
          :village.sync="COMMITTEEID"
          :address.sync="XXDZ"
          :isDisabled="isDisabledFamily || isHandleFamily"
        >
        </commonAreaSelector>
        <p class="fileName memberTitle">家庭成员</p>
        <div class="members">
          <assignMember
            v-for="(item, index) in familyInfo.JTCYJKDA"
            :isClose="index !== 0 && !isDisabledFamily && !isHandleFamily"
            :memberInfo="item"
            :key="index"
          >
          </assignMember>
        </div>
        <div class="btns" v-if="APPROVAL_LIST.indexOf(ORDERSTATUS) !== -1 && sign_audit">
        <!--<div class="btns" v-if="sign_audit">-->
          <el-button v-if="familyStatus === 0" type="primary" class="major" @click.prevent.stop="toggleHomeDialog">通过
          </el-button>
          <el-button v-if="familyStatus === 0" type="danger" @click.prevent.stop="toggleRejctFamilyDialog">拒绝
          </el-button>
          <span v-if="familyStatus === 1" class="established">已建立家庭档案</span>
          <span v-if="familyStatus === 2" class="refused">已拒绝家庭档案</span>
        </div>
      </div>
      <!-- 新建家庭档案信息结束 -->

      <!-- 签约成员信息开始 -->
      <div class="signMembersInfo" v-if="activeIndex === 2">
        <assignSigner
          :isDisabledSign="isDisabledSign"
          :categoryList="familyInfo.RQFLJH"
          v-for="(item, index) in familyInfo.QYCYXQ.QYMXLBList"
          :key="index"
          :signerInfo="item"
          :QYID="QYID"
          :index="index"
          :orderStatus="item.ORDERSTATUS"
          @initData="initData"
          @setSignStatus="setSignStatus"
          :title="index === 0 ? '户主信息' : '签约成员'+(index+1)"
        >
        </assignSigner>
        <assignSignerInfo
          :isShowSign="sign_audit"
          :signerInfo="familyInfo.QYCYXQ"
          :signStatus="signStatus"
          :QYID="QYID"
          @setEvent="toggleSign"
          @setSignStatus="setSignStatus"
          @initData="initData"
        >
        </assignSignerInfo>
      </div>
      <!-- 签约成员信息结束 -->

      <!-- 签约弹窗档案展示内容结束 -->
    </div>
    <!-- 签约弹窗签约列表切换结束 -->

    <!-- 拒绝健康档案弹窗开始 -->
    <assignAlertDialog
      :title="'拒绝'"
      :isShowDialog="isShowReject"
      :toggleContent="toggleRejctDialog"
      :confirmDialog="confirmRefuseHealths"
    >
      <div class="paddingBox nonePaddingBottom">
        <commonSelector :options="rejectList" v-model="rejectReason" :text="'拒绝原因'"></commonSelector>
      </div>
    </assignAlertDialog>
    <!-- 拒绝健康档案弹窗结束 -->

    <!-- 拒绝家庭档案弹窗开始 -->
    <assignAlertDialog
      :title="'拒绝'"
      :isShowDialog="isShowFamilyReject"
      :toggleContent="toggleRejctFamilyDialog"
      :confirmDialog="confirmRefuseFamily"
    >
      <div class="paddingBox nonePaddingBottom">
        <commonSelector :options="rejectList" v-model="rejectFamilyReason" :text="'拒绝原因'"></commonSelector>
      </div>
    </assignAlertDialog>
    <!-- 拒绝家庭档案弹窗结束 -->

    <!-- 建立健康档案弹窗开始 -->
    <assignAlertDialog
      :title="'建立健康档案'"
      :isShowDialog="isShowHealthFile"
      :toggleContent="toggleHealthDialog"
      :confirmDialog="confirmEstablishHealths"
    >
      <div class="paddingBox">是否建立健康档案</div>
    </assignAlertDialog>
    <!-- 建立健康档案弹窗结束 -->

    <!-- 建立家庭档案弹窗开始 -->
    <assignAlertDialog
      :title="'建立家庭档案'"
      :isShowDialog="isShowHomeFile"
      :toggleContent="toggleHomeDialog"
      :confirmDialog="confirmEstablishFamily"
    >
      <div class="paddingBox">是否建立家庭档案</div>
    </assignAlertDialog>
    <!-- 建立家庭档案弹窗结束 -->

    <!-- 签约弹窗公共头部结束 -->
  </div>
</template>

<script>
  import assignBaseInfo from './assignBaseInfo';                                  // 基本资料
  import commonTextInput from './commonTextInput';                                // 公共输入组件
  import commonAreaSelector from './commonAreaSelector';                          // 公共地址组件
  import assignMember from './assignMember';                                      // 家庭成员
  import assignSigner from './assignSigner';                                      // 签约人
  import assignSignerInfo from './assignSignerInfo';                              // 签约信息
  import commonToggle from './commonToggle';                                      // 开关通用组件
  import assignAlertDialog from './assignAlertDialog';                            // 通过/拒绝弹窗组件
  import commonSelector from './commonSelector';                                  // 公共选择器

  const APPROVAL_LIST = [0, 1, 2];                                          // 可以展示审批的字段

  export default {
    name: "assignDialog",
    data() {
      return {
        healthStatus: 0,                                                          // 健康档案状态
        isDisabledHealths: false,                                                 // 是否可编辑健康档案    true代表不可编辑，false代表可编辑
        familyStatus: 0,                                                          // 家庭档案状态
        isDisabledFamily: false,                                                  // 是否可编辑家庭档案    true代表不可编辑，false代表可编辑
        isHandleFamily: true,                                                     // 是否开启手动编辑家庭档案
        signStatus: 0,                                                            // 签约信息状态
        isDisabledSign: false,                                                    // 是否可编辑签约信息    true代表不可编辑，false代表可编辑
        activeIndex: 0,                                                           // 显示哪个档案信息
        fileList: ['新建健康档案信息', '新建家庭档案信息', '签约成员信息'],       // 3个档案信息
        JDJGMC: '',                                                               // 建档单位
        GDJGMC: '',                                                               // 存档单位
        JDRMC: '',                                                                // 建档人
        ZRYSMC: '',                                                               // 责任医生
        isShowReject: false,                                                      // 是否展示拒绝弹窗
        rejectList: [{                                                            // 拒绝理由的List
          value: 1,
          label: '非辖区常驻居民'
        }, {
          value: 1,
          label: '联系不上签约人'
        }, {
          value: '3',
          label: '健康档案资料有误'
        }
        ],
        rejectReason: '',                                                         // 拒绝原因
        isShowFamilyReject: false,                                                // 是否展示家庭档案拒绝弹窗
        rejectFamilyReason: '',                                                   // 拒绝家庭档案原因
        isShowHealthFile: false,                                                  // 是否展示建立健康档案弹窗
        isShowHomeFile: false,                                                    // 是否展示建立家庭档案
        familyInfo: {},                                                            // 家庭档案所有信息
        APPROVAL_LIST,
        sign_audit: false,                                                         //  签约详情审核权限
        PROVINCEDID: '',                                                           // 户主地址省ID
        CITYID: '',                                                                // 户主地址市ID
        DISTRICTID: '',                                                            // 户主地址区ID
        STREETID: '',                                                              // 户主地址街道ID
        COMMITTEEID: '',                                                           // 户主地址村ID
        XXDZ: ''                                                                   // 户主地址详细地址
      }
    },
    components: {
      assignBaseInfo,
      commonTextInput,
      commonAreaSelector,
      assignMember,
      assignSigner,
      assignSignerInfo,
      commonToggle,
      assignAlertDialog,
      commonSelector
    },
    props: {
      ORDERSTATUS: {default: ''},        // 签约单状态
      JTID: {default: ''},          // 家庭id
      QYID: {default: ''},          // 签约id
      toggleMainContent: {}        // 内容的显示隐藏切换函数
    },
    created() {
      // 请求接口获取健康档案状态，家庭档案状态，签约信息状态， 从而重置healthStatus，isDisabledHealths/ familyStatus, isDisabledFamily /
      const {ORDERSTATUS} = this;
      this.signStatus = ORDERSTATUS;
      let authObj = JSON.parse(this.$localStore.getItem('authority'));
      // 初始化查看详情权限
      let flag = authObj['sign_audit'];
      this.sign_audit = flag;
      this.isDisabledHealths = !flag;
      this.isDisabledFamily = !flag;
      this.isDisabledSign = !flag;
      this.initData()
    },
    methods: {
      /**
       * 设定signStatus
       * @param val type:number
       */
      setSignStatus(val){
        this.signStatus = val;
      },
      /**
       * toggle显示档案信息的点击事件
       * @param index
       */
      toggleFile(index) {
        this.activeIndex = index;
      },
      /**
       * 关闭弹窗
       */
      closeContent() {
        this.toggleMainContent(1)
      },
      /**
       * 审核健康档案
       * @param val type:Number 1:通过 2:拒绝
       */
      toggleHealth(val) {
        this.$post('family/sign/order/auditHealths', {
          'QYID': this.QYID,
          'AUDITSTATUS': val,
          'REFUSEREASON': val === 1 ? '' : this.rejectReason
        }).then(rsp => {
          // 重置健康档案状态
          this.healthStatus = val;
          // 阻止健康档案再次修改
          this.isDisabledHealths = true;
          // 拒绝弹窗
          if(val === 2)this.toggleRejctDialog(-1);
          // 通过弹窗
          if(val === 1){
            this.toggleHealthDialog(-1);
            this.activeIndex = 1;
          }
        }, rej => {
          if(rej.data.errcode === 460){
            this.$message.error(rej.data.datas[0].message);
          }else{
            this.$message.error(rej.data.errmsg);
          }})
      },
      /**
       * 开关是否拒绝小弹窗
       * @param fag type:string
       **/
      toggleRejctDialog(fag) {
        if (fag === -1) {
          this.isShowReject = false;
        } else {
          this.isShowReject = !this.isShowReject;
        }
      },
      /**
       * 确定拒绝按钮点击事件
       */
      confirmRefuseHealths() {
        this.toggleHealth(2);
      },
      /**
       * 确定建立健康档案
       */
      confirmEstablishHealths() {
        this.toggleHealth(1)
      },
      /**
       * 审核家庭健康档案
       * @param val type:Number 1:通过 2:拒绝
       */
      toggleFamily(val) {
        this.$post('family/sign/order/auditFamily', {
          'QYID': this.QYID,
          'AUDITSTATUS': val,
          'REFUSEREASON': val === 1 ? '' : this.rejectFamilyReason
        }).then(rsp => {
          // 重置家庭健康档案状态
          this.familyStatus = val;
          // 阻止家庭健康档案修改
          this.isDisabledFamily = true;
          // 拒绝
          if(val === 2)this.toggleRejctFamilyDialog(-1);
          // 通过
          if(val === 1){
            this.toggleHomeDialog(-1);
            this.activeIndex = 2;
          }
        }, rej => {
          if(rej.data.errcode === 460){
            this.$message.error(rej.data.datas[0].message);
          }else{
            this.$message.error(rej.data.errmsg);
          }})
      },
      /**
       * 开关是否拒绝家庭档案小弹窗
       * @param fag type:string
       **/
      toggleRejctFamilyDialog(fag) {
        if (fag === -1) {
          this.isShowFamilyReject = false;
        } else {
          this.isShowFamilyReject = !this.isShowFamilyReject;
        }
      },
      /**
       * 确定拒绝按钮点击事件
       */
      confirmRefuseFamily() {
        this.toggleFamily(2)
      },
      /**
       * 确定建立家庭档案
       */
      confirmEstablishFamily() {
        this.toggleFamily(1)
      },
      /**
       * 审核签约信息
       * @param obj  type: Object {val: 1代表通过，2代表拒绝, res: '拒绝理由', callback: 回调}
       */
      toggleSign(obj) {
        this.$post('family/sign/order/auditOrder', {
          'QYID': this.QYID,
          'AUDITSTATUS': obj.val,
          'REFUSEREASON': obj.val === 1 ? '' : obj.res
        }).then(rsp => {
          // 重置签约信息状态
          this.signStatus = obj.val;
          // 阻止签约信息修改
          this.isDisabledSign = true;
          obj.callback()
        }, rej => {
          if(rej.data.errcode === 460){
            this.$message.error(rej.data.datas[0].message);
          }else{
            this.$message.error(rej.data.errmsg);
          }})
      },
      /**
       * 开关是否建立健康档案小弹窗
       * @param fag type:string
       **/
      toggleHealthDialog(fag) {
        if (fag === -1) {
          this.isShowHealthFile = false;
        } else {
          this.isShowHealthFile = !this.isShowHealthFile;
        }
      },
      /**
       * 开关是否建立家庭档案小弹窗
       * @param fag type:string
       **/
      toggleHomeDialog(fag) {
        if (fag === -1) {
          this.isShowHomeFile = false;
        } else {
          this.isShowHomeFile = !this.isShowHomeFile;
        }
      },
      initData(){
        const {JTID, ORDERSTATUS, QYID} = this;
        this.$post('family/sign/order/getOrderDetails', {
          JTID,QYID
        }).then(rsp => {
          this.familyInfo = rsp.data;
          const {JDJGMC, GDJGMC, JDRMC, ZRYSMC, PROVINCEDID, CITYID, DISTRICTID, STREETID, COMMITTEEID, XXDZ, FAMILYRECORDAUDITED, MEMBERRECORDAUDITED} = rsp.data;
          this.JDJGMC = JDJGMC;
          this.GDJGMC = GDJGMC;
          this.JDRMC = JDRMC;
          this.ZRYSMC = ZRYSMC;
          this.PROVINCEDID = PROVINCEDID;
          this.CITYID = CITYID;
          this.DISTRICTID = DISTRICTID;
          this.STREETID = STREETID;
          this.COMMITTEEID = COMMITTEEID;
          this.XXDZ = XXDZ;
          this.healthStatus = FAMILYRECORDAUDITED;
          this.familyStatus = MEMBERRECORDAUDITED;
          if(FAMILYRECORDAUDITED === 0){
            this.activeIndex = 0;
          }else if(MEMBERRECORDAUDITED === 0){
            this.activeIndex = 1;
          }else if(ORDERSTATUS === 0){
            this.activeIndex = 2;
          }else{
            this.activeIndex = 0;
          }
        }, rej => {
          if(rej.data.errcode === 460){
            this.$message.error(rej.data.datas[0].message);
          }else{
            this.$message.error(rej.data.errmsg);
          }})
      }
    }
  }
</script>

<style lang="scss">
  $border: 1px solid #DDDDDD;
  .assignDialog {
    width: 1354px;
    border-radius: 4px;

    .established {
      color: #4486FF;
      line-height: 30px;
    }

    .refused {
      color: #F65860;
      line-height: 30px;
    }

    .assignDialogTitle {
      width: 100%;
      font-size: 18px;
      color: #ffffff;
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

    .assignDialogContent {
      background-color: #ffffff;
      padding: 15px 60px;

      .contentTitle {
        line-height: 44px;
        font-size: 16px;
        border-bottom: $border;
        text-align: left;
      }

      .fileList {
        border-bottom: $border;

        .file {
          padding: 17px 25px;
          font-size: 16px;
          font-weight: bold;

          &.active {
            color: #4486FF;
            border-bottom: 1px solid #4486FF;
          }
        }
      }

      .fileName {
        padding-top: 28px;
        padding-bottom: 20px;
        text-align: left;
        font-weight: bold;
        font-size: 18px;
      }

      .createNewFile {
        .btns {
          padding-top: 10px;
          text-align: left;

          .major {
            margin-right: 20px !important;
          }

          .el-button {
            padding: 0 0;
            margin: 0 0;
            width: 86px;
            height: 30px;
            line-height: 30px;
          }
        }
      }

      .assignBaseInfo {
        border-top: 1Px solid #DDDDDD;
      }

      .createHomeFile {
        .fileName {
          &.memberTitle {
            padding-top: 0;
          }
        }
        .baseInfo {
          display: flex;

          > div {
            margin-right: 40px;

            /*&:nth-child(2) {*/
              /*margin-right: 50px;*/
            /*}*/

            &:nth-last-child(1) {
              margin-right: 0;
            }
          }
        }

        .members {
          display: flex;
          flex-wrap: wrap;

          > div {
            margin-right: 40px;
            margin-bottom: 30px;

            &:nth-child(4n) {
              margin-right: 0;
            }
          }
        }

        .btns {
          text-align: left;

          .el-button {
            width: 86px;
            height: 30px;
            line-height: 30px;
            font-size: 16px;
            margin: 0 0;
            padding: 0 0;
          }

          .major {
            margin-right: 20px;
          }
        }
      }
    }
  }
</style>
