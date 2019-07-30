<template>
  <div class="assignBaseInfo" :class="{borderBottom: isShowBorder}">
    <div class="assignBaseHeader">
      <p class="assignBaseInfoTitle">基本资料</p>
      <!--<el-button type="primary" class="major" v-if="!isDisabled" @click.prevent.stop="changeEditState">{{isEditInfo ?-->
        <!--'编辑' : '保存'}}-->
      <!--</el-button>-->
    </div>
    <!-- 个人信息开始 -->
    <div class="assignBaseInfoInput clearfix">
      <div class="col-1 fl">
        <commonTextInput v-model="JDJGMC" :text="'建档单位'" :isDisabled="isEditInfo || isDisabled"></commonTextInput>
        <commonTextInput v-model="YHZGXMC" :text="'关系'" :isDisabled="isEditInfo || isDisabled"></commonTextInput>
        <commonTextInput v-model="XB" :text="'性别'" :isDisabled="true" :placeholderText="''"></commonTextInput>
        <commonTextInput v-model="HYZKMC" :text="'婚姻状况'" :isDisabled="isEditInfo || isDisabled"></commonTextInput>
      </div>
      <div class="col-2 fl">
        <commonTextInput v-model="GDJGMC" :text="'存档单位'" :isDisabled="isEditInfo || isDisabled"></commonTextInput>
        <commonTextInput v-model="XM" :text="'居民姓名'" :isDisabled="isEditInfo || isDisabled"></commonTextInput>
        <commonTextInput v-model="BRDHHM" :text="'手机号码'" :isDisabled="isEditInfo || isDisabled"></commonTextInput>
        <commonTextInput v-model="ZYMC" :text="'职业'" :isDisabled="isEditInfo || isDisabled"></commonTextInput>
      </div>
      <div class="col-3 fl">
        <commonTextInput v-model="JDRMC" :text="'建档人'" :isDisabled="isEditInfo || isDisabled"></commonTextInput>
        <commonTextInput v-model="SFZJH" :text="'身份证号'" :isDisabled="isEditInfo || isDisabled" :errorTips="'身份证号码格式错误'"
                         :errorState="SFZJHState"></commonTextInput>
        <commonTextInput v-model="MZMC" :text="'名族'" :isDisabled="isEditInfo || isDisabled"></commonTextInput>
        <commonTextInput v-model="signName" :text="'签约人姓名'" :isDisabled="isEditInfo || isDisabled"></commonTextInput>
      </div>
      <div class="col-4 fl">
        <commonTextInput v-model="ZRYSMC" :text="'责任医生'" :isDisabled="isEditInfo || isDisabled"></commonTextInput>
        <commonTextInput v-model="bornDate" :text="'出生日期'" :isDisabled="true" :placeholderText="''"></commonTextInput>
        <commonTextInput v-model="ABOMC" :text="'血型'" :isDisabled="isEditInfo || isDisabled"></commonTextInput>
        <commonTextInput v-model="DAZGZTDMMC" :text="'档案转归状态'" :isDisabled="isEditInfo || isDisabled"></commonTextInput>
      </div>
    </div>
    <!-- 个人信息结束 -->

    <!-- 个人地址开始 -->
    <div class="contentAddress">
      <commonAreaSelector
        :text="'户籍地址'"
        :province.sync="HJDZPROVINCEDID"
        :city.sync="HJDZCITYID"
        :area.sync="HJDZDISTRICTID"
        :street.sync="HJDZSTREETID"
        :village.sync="HJDZCOMMITTEEID"
        :address.sync="HJDZXXDZ"
        :isDisabled="isEditInfo || isDisabled"
      >
      </commonAreaSelector>

      <commonAreaSelector
        :text="'现住地址'"
        :province.sync="XZZPROVINCEDID"
        :city.sync="XZZCITYID"
        :area.sync="XZZDISTRICTID"
        :street.sync="XZZSTREETID"
        :village.sync="XZZCOMMITTEEID"
        :address.sync="XZZXXDZ"
        :isDisabled="isEditInfo || isDisabled"
      >
      </commonAreaSelector>

      <commonAreaSelector
        :text="'现住地址'"
        :province.sync="XZZPROVINCEDID"
        :city.sync="XZZCITYID"
        :area.sync="XZZDISTRICTID"
        :street.sync="XZZSTREETID"
        :village.sync="XZZCOMMITTEEID"
        :address.sync="XZZXXDZ"
        :isDisabled="isEditInfo || isDisabled"
      >
      </commonAreaSelector>

    </div>
    <!-- 个人地址结束 -->

    <!-- 个人病史开始 -->
    <div class="assignPersonInfo">
      <p class="assignPersonInfoTitle">个人病史</p>
      <div class="illnessHistory">
        <commonTextInput v-model="YWGMSMC" :text="'过敏史'" :isDisabled="isEditInfo || isDisabled"></commonTextInput>
        <commonTextInput v-model="BLSLBMC" :text="'暴露史'" :isDisabled="isEditInfo || isDisabled"></commonTextInput>
      </div>
      <commonTextInput v-model="disability" :text="'残疾情况'" :isDisabled="isEditInfo || isDisabled"></commonTextInput>
    </div>
    <!-- 个人病史结束 -->

    <!-- 家族病史开始 -->
    <div class="assignHomeInfo">
      <p class="assignHomeInfoTitle">家族病史</p>
      <div class="assignHomeContent">
        <commonTextInput v-model="JZSFQJBLBMC" :text="'父亲病史'" :isDisabled="isEditInfo || isDisabled"></commonTextInput>
        <commonTextInput v-model="JZSMQJBLBMC" :text="'母亲病史'" :isDisabled="isEditInfo || isDisabled"></commonTextInput>
        <commonTextInput v-model="JZSXDJMJBLBMC" :text="'兄弟姐妹病史'" :isDisabled="isEditInfo || isDisabled"></commonTextInput>
        <commonTextInput v-model="JZSZNJBLBMC" :text="'儿女病史'" :isDisabled="isEditInfo || isDisabled"></commonTextInput>
        <commonTextInput v-model="YCSJBDMMC" :text="'遗传病史'" :isDisabled="isEditInfo || isDisabled"></commonTextInput>
      </div>
    </div>
    <!-- 家族病史结束 -->

  </div>
</template>

<script>
  import commonTextInput from './commonTextInput';             // 公共输入框
  import commonAreaSelector from './commonAreaSelector';       // 地址选择
  import commonDatePicker from './commonDatePicker';            // 日期选择
  import {identityCodeValid} from '@/common/js/util';          // 身份证获取生日年龄方法
  export default {
    name: "assignBaseInfo",
    components: {
      commonTextInput,
      commonAreaSelector,
      commonDatePicker
    },
    data() {
      return {
        isEditInfo: true,             // 是否可以编辑信息
        JDJGMC: '',                   // 建档单位
        YHZGXMC: '',                  // 关系
        XB: '',                       // 性别
        HYZKMC: '',                   // 婚姻状况
        GDJGMC: '',                   // 存档单位
        XM: '',                       // 居民姓名
        BRDHHM: '',                   // 手机号码
        ZYMC: '',                     // 职业
        JDRMC: '',                    // 建档人
        SFZJH: '',                    // 身份证号
        MZMC: '',                     // 民族
        signName: '',                 // 签约人姓名
        ZRYSMC: '',                   // 责任医生
        bornDate: '',                 // 出生日期
        ABOMC: '',                    // 血型
        DAZGZTDMMC: '',               // 档案转归状态
        SFZJHState: false,            // 身份证输入状态
        YWGMSMC: '',                  // 过敏史
        BLSLBMC: '',                  // 暴露史
        pastMedicalHistory: '',       // 既往史
        illnessName: '',              // 疾病名称
        approvalDate: '',             // 确诊时间
        clinicHospital: '',           // 就诊医院
        disability: '',               // 残疾情况
        JZSFQJBLBMC: '',              // 父亲病史
        JZSMQJBLBMC: '',              // 母亲病史
        JZSXDJMJBLBMC: '',            // 兄弟姐妹病史
        JZSZNJBLBMC: '',              // 儿女病史
        YCSJBDMMC: '',                // 遗传病史
        XZZPROVINCEDID: '',           // 现住址省ID
        XZZCITYID: '',                // 现住址市ID
        XZZDISTRICTID: '',            // 现住址区ID
        XZZCOMMITTEEID: '',           // 现住址村ID
        XZZSTREETID: '',              // 现住址街道ID
        XZZXXDZ: '',                  // 现住址详细地址
        HJDZPROVINCEDID: '',          // 户籍地址省ID
        HJDZCITYID: '',               // 户籍地址市ID
        HJDZDISTRICTID: '',           // 户籍地址区ID
        HJDZSTREETID: '',             // 户籍地址街道ID
        HJDZCOMMITTEEID: '',          // 户籍地址村ID
        HJDZXXDZ: ''                  // 户籍地址详细地址
      }
    },
    watch: {
      // 检测身份证号码
      SFZJH(val) {
        let pass = identityCodeValid(val);
        this.SFZJHState = !pass.pass;
        if (pass.pass) {
          const {age, sex, birthDate} = pass.more;
          this.XB = sex;
          this.bornDate = birthDate;
        }
      }
    },
    props: {
      isShowBorder: {default: true},
      memberInfo: {
        default: () => {
        }
      },      // 成员信息
      isDisabled: {default: true}
    },
    created() {
      Object.assign(this, this.memberInfo)
    },
    methods: {
      changeEditState() {
        this.isEditInfo = !this.isEditInfo;
      }
    }
  }
</script>

<style lang="scss">
  .assignBaseInfo {
    &.borderBottom {
      border-bottom: 1Px solid #DDDDDD;
    }

    .assignBaseHeader {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 15px;
      padding-bottom: 19px;

      .major {
        width: 80px;
        height: 30px;
        padding: 0 0;
        margin: 0 0;

        span {
          line-height: 30px;
        }
      }

      .assignBaseInfoTitle {
        text-align: left;
        font-weight: bold;
        font-size: 18px;
      }
    }


    .assignBaseInfoInput {
      .col-1 {
        margin-right: 15px;

        .iconText {
          width: 75px;
        }
      }

      .col-2 {
        margin-right: 15px;

        .iconText {
          width: 75px;
        }
      }

      .col-3 {
        margin-right: 14px;

        .iconText {
          width: 90px;
        }
      }

      .col-4 {
        .iconText {
          width: 107px;
        }
      }
    }

    .assignPersonInfo {
      .assignPersonInfoTitle {
        padding: 8px 0;
        text-align: left;
        font-weight: bold;
        font-size: 18px;
      }

      .illnessHistory {
        display: flex;

        .commonTextInput {
          margin-right: 46px;
        }

        .iconText {
          width: 65px;
        }
      }

      .assignPersonInfoSubTitle {
        text-indent: 17px;
        text-align: left;
        padding-bottom: 20px;
        font-size: 16px;
      }

      .illnessInfo {
        display: flex;

        .iconText {
          width: 65px;
        }

        > div {
          margin-right: 46px;
        }
      }
    }

    .assignHomeInfo {
      .assignHomeInfoTitle {
        padding: 8px 0;
        text-align: left;
        font-weight: bold;
        font-size: 18px;
      }

      .assignHomeContent {
        display: flex;
        flex-wrap: wrap;

        .commonTextInput {
          margin-right: 30px;

          &:nth-child(2) {
            margin-right: 10px;
          }

          &:nth-child(4n) {
            margin-right: 0;
          }
        }
      }
    }

  }
</style>
