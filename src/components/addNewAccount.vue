<template>
  <div class="addNewAccount">

    <!-- 弹窗头部开始 -->
    <div class="assignDialogTitle">
      <span>{{userId ? '编辑账号' : '新建账号'}}</span>
      <div class="closeIcon" @click.stop="closeContent">&times;</div>
    </div>
    <!-- 弹窗头部结束 -->

    <!-- 弹窗内容开始 -->
    <div class="addNewAccountContent">
      <p class="accountTitle">
        <span class="title">账号信息</span>
      </p>
      <div class="avatarUploader">
        <i class="iconText">头像</i>
        <el-upload
          class="avatar-uploader"
          action="string"
          :headers="headers"
          :disabled="!isManager"
          :with-credentials="true"
          :show-file-list="false"
          :accept="'image/*'"
          :http-request="uploadImage"
          :before-upload="beforeAvatarUpload">
          <img v-if="picFileId || isShowDefaultImg" :src="isShowDefaultImg ? defaultAvatar : picFile" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <i class="tips">建议尺寸:640&times;640像素</i>
      </div>
      <commonTextInput
        :text="'姓名'"
        v-model="userName"
        :isDisabled="!isManager"
      >
      </commonTextInput>
      <commonTextInput
        :text="'账号'"
        v-model="account"
        :isDisabled="!isManager"
      >
      </commonTextInput>
      <commonTextInput
        :text="'密码'"
        v-model="password"
        :encrypt="true"
        v-if="!userId"
      >
      </commonTextInput>
      <commonTextInput
        :text="'确认密码'"
        v-model="confirmPwd"
        :encrypt="true"
        :errorTips="'两次密码输入不一致'"
        :errorState="pwdErrorState"
        v-if="!userId"
      >
      </commonTextInput>
      <div class="checkPwd clearfix" v-if="isManager && userId">
        <i class="fl iconText">密码</i>
        <a href="#" class="openPwd fl" @click.prevent.stop="togglePwdDialog">修改密码</a>
      </div>
      <commonSelector
        :text="'角色'"
        v-model="roleId"
        :options="roleList"
      >
      </commonSelector>
      <commonCascader
        :text="'地区'"
        v-model="area"
        :isDisabled="!isManager"
        v-if="isShowArea"
      >
      </commonCascader>
      <commonSelector
        :text="'状态'"
        v-model="isEnabled"
        :options="isEnabledList"
      >
      </commonSelector>
      <!-- 弹窗底部开始 -->
      <div class="accountFooter">
        <el-button type="primary" class="major" @click.stop.prevent="checkDialog">通过</el-button>
        <el-button type="info" class="info" @click.stop.prevent="cutOffDialog">取消</el-button>
      </div>
      <!-- 弹窗底部结束 -->
    </div>
    <!-- 弹窗内容结束 -->

    <!-- 是否删除角色开始 -->
    <assignAlertDialog
      :title="'修改密码'"
      :isShowDialog="isShowPwd"
      :toggleContent="togglePwdDialog"
      :confirmDialog="changePassword"
    >
      <div class="paddingBox">
        <commonTextInput
          :text="'密码'"
          v-model="password"
          :encrypt="true"
        >
        </commonTextInput>
        <commonTextInput
          :text="'确认密码'"
          v-model="confirmPwd"
          :encrypt="true"
          :errorTips="'两次密码输入不一致'"
          :errorState="pwdErrorState"
        >
        </commonTextInput>
      </div>
    </assignAlertDialog>
    <!-- 是否删除角色结束 -->

  </div>
</template>

<script>
  import commonTextInput from './commonTextInput';
  import commonSelector from './commonSelector';
  import commonCascader from './commonCascader';
  import assignAlertDialog from '@/components/assignAlertDialog';                  // 通过/拒绝弹窗组件

  const SPECIAL_ROLE = [3, 4, 5];     // 省市区的roleType
  const SINGLE_ROLE= [1, 2];          // 机构管理员和医生特殊处理

  export default {
    name: "addNewAccount",
    components: {
      commonTextInput,
      commonSelector,
      commonCascader,
      assignAlertDialog
    },
    data() {
      return {
        userName: '',          // 姓名
        account: '',           // 账号
        password: '',          // 密码
        confirmPwd: '',        // 确认密码
        roleId: '',            // 角色
        roleList: [],         // 角色列表
        area: [],             // 地区
        isEnabled: '',        // 状态
        isEnabledList: [      // 状态List
          {
            value: true,
            label: '激活'
          },
          {
            value: false,
            label: '禁用'
          },
        ],
        picFile: '',          // 头像照片url
        picFileId: '',        // 头像照片Id
        isShowDefaultImg: false, // 是否展示默认图片
        isManager: true,
        isShowArea: false,
        pwdErrorState: false,  // 两次输入密码的状态
        isShowPwd: false,      // 修改密码弹窗
        requestUrl: this.$uploadUrl,    // 请求路径
        headers: {                                              // 请求头
          "Content-Type": 'multipart/form-data'
        },
        defaultAvatar: this.$defaultAvatar,
      }
    },
    props: {
      userId: {default: ''},            // 用户Id
      toggleContent: {},                // 开关弹窗
    },
    watch: {
      roleId(val) {
        this.roleList.some(item => {
          if (item.value === val) {
            if (SPECIAL_ROLE.indexOf(item.roleType) !== -1) {
              this.isShowArea = true;
            } else {
              this.isShowArea = false;
            }
            return true
          }
          return false
        });
      }
    },
    methods: {
      /**
       * 关闭弹窗
       */
      closeContent() {
        this.toggleContent(-1)
      },
      /**
       * 开关修改密码的弹窗
       * @param fag
       */
      togglePwdDialog(fag) {
        if (fag === -1) {
          this.isShowPwd = false;
        } else {
          this.isShowPwd = !this.isShowPwd;
        }
      },
      /**
       * 确定按钮
       */
      checkDialog() {
        const {userId, userName, account, password, confirmPwd, picFileId, isEnabled, roleId, area} = this;
        if (userId) {
          this.$post('user/update', {
            userId,
            userName,
            account,
            picFileId,
            isEnabled,
            roleId,
            provinceId: area[0],
            cityId: area[1],
            districtId: area[2]
          }).then(rsp => {
            this.toggleContent(-1)
          }, rej => {
            if(rej.data.errcode === 460){
            this.$message.error(rej.data.datas[0].message);
          }else{
            this.$message.error(rej.data.errmsg);
          }})
        } else {
          // 新增账号时对两次输入的密码进行验证是否一致
          if (confirmPwd !== password) {
            this.pwdErrorState = true;
            return
          } else {
            this.pwdErrorState = false;
            this.$post('user/add', {
              userId,
              userName,
              account,
              password,
              picFileId,
              isEnabled,
              roleId,
              provinceId: area[0],
              cityId: area[1],
              districtId: area[2]
            }).then(rsp => {
              this.toggleContent(-1)
            }, rej => {
              if(rej.data.errcode === 460){
            this.$message.error(rej.data.datas[0].message);
          }else{
            this.$message.error(rej.data.errmsg);
          }})
          }
        }

      },
      /**
       * 确定修改密码
       */
      changePassword() {
        const {confirmPwd, password, userId} = this;
        // 是管理员可编辑密码的情况下对密码进行验证
        if (confirmPwd !== password) {
          this.pwdErrorState = true;
          return
        } else {
          this.pwdErrorState = false;
          // 修改密码请求
          this.$post('user/setPassword', {
            userId,
            password
          }).then(rsp => {
            this.$Message({
              message: '修改密码' + rsp.errmsg,
              type: 'success',
              duration: 3 * 1000,
              center: true
            });
            this.togglePwdDialog(-1);
          }, rej => {
            if(rej.data.errcode === 460){
            this.$message.error(rej.data.datas[0].message);
          }else{
            this.$message.error(rej.data.errmsg);
          }});

        }
      },
      /**
       * 取消按钮
       */
      cutOffDialog() {
        this.toggleContent(-1);
        this.$emit('cancelDialog')
      },
      /**
       * 头像上传
       */
      uploadImage(param){
        const formData = new FormData();
        formData.append('content', param.file);
        this.$post(this.requestUrl, formData).then(rsp=>{
          if (rsp.errcode !== 0) {
            this.$message.error(rsp.errmsg);
          } else {
            this.$message.success(rsp.errmsg);
            this.picFileId = rsp.data.id;
            this.picFile = this.$downloadUrl + rsp.data.id;
          }
        }, rej=>{
          if(rej.data.errcode === 460){
            this.$message.error(rej.data.datas[0].message);
          }else{
            this.$message.error(rej.data.errmsg);
          }})
      },
      /**
       * 头像上传限制
       * @param file
       * @returns {boolean}
       */
      beforeAvatarUpload(file) {
        const isLt5M = file.size / 1024 / 1024 < 5;

        if (!isLt5M) {
          this.$message.error('上传头像图片大小不能超过 5MB!');
        }
        return isLt5M;
      }
    },
    created() {
      const {userId} = this;
      if (userId) {
        // 数据回显
        this.$post('user/detail', {
          userId
        }).then(rsp => {
          Object.assign(this, rsp.data);
          if (SPECIAL_ROLE.indexOf(rsp.data.roleType) !== -1) {
            this.isShowArea = true;
          } else {
            this.isShowArea = false;
          }
          const {provinceId, cityId, districtId, roleType, picFileId} = rsp.data;
          this.area = [provinceId, cityId, districtId];
          this.picFile = this.$downloadUrl + rsp.data.picFileId;
          if(SINGLE_ROLE.indexOf(roleType) !== -1 && !picFileId ){
              this.isShowDefaultImg = true;
          }
        }, rej => {
          if(rej.data.errcode === 460){
            this.$message.error(rej.data.datas[0].message);
          }else{
            this.$message.error(rej.data.errmsg);
          }});
      }

      // 获取角色列表
      this.$post('user/role/getList', {userId}).then(rsp => {
        this.roleList = rsp.datas.map(item => {
          return {
            value: item.roleId,
            label: item.roleName,
            roleType: item.roleType
          }
        })
      }, rej => {
        if(rej.data.errcode === 460){
            this.$message.error(rej.data.datas[0].message);
          }else{
            this.$message.error(rej.data.errmsg);
          }})
    }
  }
</script>

<style lang="scss">
  .addNewAccount {
    .assignDialogTitle {
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

    .addNewAccountContent {
      padding: 0 80px;
      background-color: #ffffff;
      text-align: center;

      .accountTitle {
        text-align: left;
        font-weight: bold;
        font-size: 18px;
        padding-top: 28px;
        padding-bottom: 20px;
      }

      .iconText {
        font-size: 16px;
        width: 75px;
        text-align: right;
      }

      .checkPwd {
        height: 60px;

        .iconText {
          font-size: 16px;
          width: 75px;
          text-align: right;
        }

        .openPwd {
          margin-left: 10px;
          line-height: 30px;
          color: #4486FF;
          font-size: 16px;
        }
      }

      .avatarUploader {
        display: flex;
        align-items: center;
        margin-bottom: 23px;

        .avatar-uploader .el-upload {
          border: 2Px solid #DDDDDD;
          border-radius: 50%;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .avatar-uploader .el-upload:hover {
          border-color: #409EFF;
        }

        .avatar-uploader {
          margin-left: 10px;
        }

        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 60px;
          height: 60px;
          line-height: 60px;
          text-align: center;
        }

        .avatar {
          width: 60px;
          height: 60px;
          display: block;
        }

        .tips {
          color: #F65860;
          font-size: 12px;
          margin-left: 10px;
        }
      }

      .accountFooter {
        display: inline-block;
        padding-bottom: 40px;

        .el-button {
          margin: 0 10px;
          padding: 0 0;
          width: 86px;
          height: 30px;
          font-size: 16px;
        }
      }
    }

    .paddingBox {
      padding-bottom: 0;

      .iconText {
        width: 75px;
      }
    }
  }
</style>
