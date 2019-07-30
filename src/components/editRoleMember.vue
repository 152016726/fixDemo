<template>
  <assignAlertDialog
    :title="'医生详情'"
    :isShowDialog="show"
    :toggleContent="toggleRoleMemberDialog"
    :confirmDialog="confirmRoleMemberDialog"
  >
    <div class="editRoleMember">
      <div class="baseInfo">
        <div class="editRoleLeft">
          <commonTextInput :text="'姓名'" v-model="doctorName" :isDisabled="true"></commonTextInput>
          <commonTextInput :text="'编码'" v-model="doctorCode" :isDisabled="true"></commonTextInput>
          <commonTextInput :text="'职称'" v-model="posTitleName" :isDisabled="true" :placeholderText="''"></commonTextInput>
          <commonTextInput :text="'性别'" v-model="sexName" :isDisabled="true"></commonTextInput>
          <commonTextInput :text="'机构'" v-model="orgName" :isDisabled="true"></commonTextInput>
        </div>
        <div class="editRoleRight">
          <el-upload
            class="avatar-uploader"
            action="string"
            :headers="headers"
            :with-credentials="true"
            :accept="'image/*'"
            :show-file-list="false"
            :http-request="uploadImage"
            :before-upload="beforeAvatarUpload"
          >
            <img :src="imageUrl" v-if="headImgFileId" class="avatar" alt="个人头像">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

        </div>
      </div>
      <div class="description">
        <div class="teamIntro clearfix">
          <div class="intro fl">团队简介</div>
          <el-input
            class="textArea fl"
            type="textarea"
            placeholder="请输入内容"
            resize="none"
            v-model="description"
            maxlength="300"
            show-word-limit
          >
          </el-input>
        </div>
        <div class="teamIntro clearfix">
          <div class="intro fl">团队擅长</div>
          <el-input
            class="textArea fl"
            type="textarea"
            placeholder="请输入内容"
            resize="none"
            v-model="goodAt"
            maxlength="300"
            show-word-limit
          >
          </el-input>
        </div>
      </div>
    </div>
  </assignAlertDialog>
</template>

<script>
  import assignAlertDialog from './assignAlertDialog';
  import commonTextInput from './commonTextInput';

  export default {
    name: "editRoleMember",
    components: {
      assignAlertDialog,
      commonTextInput
    },
    data() {
      return {
        doctorName: '',                       // 姓名
        doctorCode: '',                       // 编码
        jobName: '',                          // 职称
        sexName: '',                           // 性别
        orgName: '',                          // 组织名称
        orgId: '',                            // 组织id
        description: '',                      // 团队简介
        goodAt: '',                           // 团队擅长
        posTitleName: '',                    // 医生职称
        headImgFileId: '',                    // 头像图片文件ID
        imageUrl: '',                          // 头像路径
        requestUrl: this.$uploadUrl,
        headers: {                            // 请求头
          "Content-Type": 'multipart/form-data'
        }
      }
    },
    props: {
      id: {default: ''},             // 成员id
      toggleMainContent: {},
      show: {default: false}        // 是否展示医生详情
    },
    watch: {
      id(val) {
        this.$post('doctor/getById', {
          doctorId: val
        }).then(rsp => {
          Object.assign(this, rsp.data);
          const {goodAt, description, posTitleName, headImgFileId} = rsp.data;
          this.goodAt = goodAt;
          this.description = description;
          this.posTitleName = posTitleName;
          this.headImgFileId = headImgFileId;
          this.imageUrl = this.$downloadUrl + headImgFileId;
        })
      }
    },
    methods: {
      /**
       * 开关角色编辑窗口
       */
      toggleRoleMemberDialog(flag) {
        this.toggleMainContent(flag)
      },
      /**
       * 确认关闭窗口
       */
      confirmRoleMemberDialog() {
        const {doctorId, goodAt, description, headImgFileId} = this;
        this.$post('doctor/update', {
          doctorId, goodAt, description, headImgFileId
        }).then(rsp => {
          this.toggleRoleMemberDialog(-1)
        }, rej => {
          if(rej.data.errcode === 460){
            this.$message.error(rej.data.datas[0].message);
          }else{
            this.$message.error(rej.data.errmsg);
          }});
      },
      /**
       * 图像上传
       */
      uploadImage(param) {
        const formData = new FormData();
        formData.append('content', param.file);
        this.$post(this.requestUrl, formData).then(rsp => {
          if (rsp.errcode !== 0) {
            this.$message.error(rsp.errmsg);
          } else {
            this.$message.success(rsp.errmsg);
            this.headImgFileId = rsp.data.id;
            this.imageUrl = this.$downloadUrl + rsp.data.id;
          }
        }, rej => {
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
        const isTp = file.type.indexOf('image') !== -1;

        if (!isTp) {
          this.$message.error('只能上传图片格式文件!');
        }

        const isLt5M = file.size / 1024 / 1024 < 5;

        if (!isLt5M) {
          this.$message.error('上传头像图片大小不能超过 5MB!');
        }
        return isLt5M && isTp
      },
    }
  }
</script>

<style lang="scss">
  .editRoleMember {
    padding: 0 60px;
    padding-top: 40px;
    width: 960px;
    box-sizing: border-box;
    background-color: #ffffff;

    .iconText {
      width: 70px;
    }

    .assignDialogFooter {
      margin-left: 70px;
      text-align: left;
    }

    .baseInfo {
      display: flex;
      justify-content: space-between;

      .editRoleLeft {
        display: flex;
        flex-wrap: wrap;
      }

      .commonTextInput {
        margin-right: 55px;
      }

      .editRoleRight {
        .avatar-uploader .el-upload {
          border: 1px solid #DDDDDD;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 90px;
          height: 90px;
          line-height: 90px;
          text-align: center;
        }

        .avatar {
          width: 90px;
          height: 90px;
          border-radius: 50%;
        }
      }
    }

    .description {
      .teamIntro {
        margin-bottom: 30px;
        width: 840px;

        .intro {
          width: 75px;
          margin-right: 10px;
          text-align: center;
          vertical-align: middle;

          &.center {
            margin-top: 72px;
          }
        }

        .el-textarea__inner, .textArea {
          width: 740px;
          height: 160px;

          .el-input__count {
            color: #F65860;
          }
        }

        .teamMember {
          display: flex;
          flex-wrap: wrap;

          > div {
            margin-right: 42px;

            &:nth-child(4n) {
              margin-right: 0;
            }
          }

          .member {
            width: 160px;
            height: 160px;
            border: 1px solid #DDDDDD;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            line-height: 23px;
            font-size: 16px;
            position: relative;

            .icon {
              cursor: pointer;
              position: absolute;
              top: -14px;
              right: -14px;
              width: 28px;
              height: 28px;
              border-radius: 50%;
              background: url("../assets/btn_delete.png") no-repeat center center;
              background-size: cover;
              vertical-align: middle;
              text-align: center;
              color: #ffffff;
              font-size: 28px;
            }

            .avatar {
              width: 60px;
              height: 60px;
              margin-bottom: 6px;
            }
          }

          .addTeamMember {
            cursor: pointer;
            width: 160px;
            height: 160px;
            background: url("../assets/btn_add_big.png") no-repeat center center;
            background-size: cover;
          }
        }
      }
    }
  }
</style>
