<template>
  <div class="addNewTeam">
    <!-- 弹窗头部开始 -->
    <div class="addNewTeamTitle">
      <span>{{teamId ? '编辑团队' : '新建团队'}}</span>
      <div class="closeIcon" @click.stop.prevent="closeContent">&times;</div>
    </div>
    <!-- 弹窗头部结束 -->

    <!-- 弹窗内容开始 -->
    <div class="addNewTeamContent">
      <commonAutocomplete
        :text="'医疗机构'"
        v-model="teamId ? mechanismName : mechanism"
        :isDisabled="!!teamId"
        v-if="isShowOrg"
        :filterState="filterOrgs"
      >
      </commonAutocomplete>
      <commonTextInput :text="'团队名称'" v-model="teamName"></commonTextInput>
      <commonSelector
        :text="'团队状态'"
        v-model="ISENABLED"
        :options="ISENABLEDList"
        :isDisabled="!teamId"
      >
      </commonSelector>
      <div class="avatarUploader">
        <i class="iconText">团队头像</i>
        <el-upload
          class="avatar-uploader"
          action="string"
          :headers="headers"
          :with-credentials="true"
          :show-file-list="false"
          :http-request="uploadImage"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imgId" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <i class="tips">建议尺寸:640&times;640像素</i>
      </div>
      <div class="teamIntro clearfix">
        <div class="intro fl">团队简介</div>
        <el-input
          class="textArea fl"
          type="textarea"
          placeholder="请输入内容"
          resize="none"
          v-model="teamTextarea"
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
          v-model="teamSkillTextarea"
          maxlength="300"
          show-word-limit
        >
        </el-input>
      </div>

      <!-- 弹窗底部开始 -->
      <div class="assignDialogFooter">
        <el-button type="primary" class="major" @click.stop.prevent="setEstablish">通过</el-button>
        <el-button type="info" class="info" @click.stop.prevent="closeContent">取消</el-button>
      </div>
      <!-- 弹窗底部结束 -->
    </div>
    <!-- 弹窗内容结束 -->

    <!-- 是否删除角色开始 -->
    <assignAlertDialog
      :title="'新建团队成功'"
      :isShowDialog="isShowTeam"
      :toggleContent="toggleTeamDialog"
      :confirmDialog="addNewMember"
    >
      <div class="paddingBox">是否新建团队成员?</div>
    </assignAlertDialog>
    <!-- 是否删除角色结束 -->

  </div>
</template>

<script>
  import commonTextInput from './commonTextInput';
  import commonSelector from './commonSelector';
  import assignAlertDialog from '@/components/assignAlertDialog';                  // 通过/拒绝弹窗组件
  import commonAutocomplete from '@/components/commonAutocomplete';

  export default {
    name: "addNewTeam",
    data() {
      return {
        mechanism: '',                      // 选择机构
        mechanismName: '',                  // 机构名称
        isShowOrg: true,                    // 是否展示机构名称
        mechanismList: [],                  // 选择机构List
        teamName: '',                       // 团队名称
        ISENABLEDList: [                    // 团队状态Lsit
          {
            label: '启动',
            value: true
          },
          {
            label: '禁用',
            value: false
          }
        ],
        ISENABLED: true,                    // 团队状态
        teamTextarea: '',                   // 团队简介
        teamSkillTextarea: '',              // 团队擅长
        imageUrl: '',                       // 头像路径
        imgId: '',                          // 头像Id
        isShowTeam: false,                  // 是否展示弹窗
        createId: '',                       // 创建后的团队Id
        requestUrl: this.$uploadUrl,
        headers: {                            // 请求头
          "Content-Type": 'multipart/form-data'
        }
      }
    },
    components: {
      commonTextInput,
      commonSelector,
      assignAlertDialog,
      commonAutocomplete
    },
    props: {
      teamId: {default: ''},            // 团队Id
      toggleContent: {},                // 开关弹窗
    },
    methods: {
      /**
       * 关闭弹窗
       **/
      closeContent() {
        this.toggleContent(-1);
      },
      /**
       * 头像上传成功
       * @param res
       * @param file
       */
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      /**
       * 头像上传限制
       * @param file
       * @returns {boolean}
       */
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      /**
       * 开关弹窗
       * @param fag
       */
      toggleTeamDialog(fag) {
        if (fag === -1) {
          this.isShowTeam = false;
        } else {
          this.isShowTeam = !this.isShowTeam;
        }
      },
      /**
       * 确认建立团队或者编辑
       */
      setEstablish() {
        const {mechanism, teamName, teamTextarea, teamSkillTextarea, imgId, ISENABLED} = this;
        if (this.teamId) {
          // 编辑团队数据
          this.$post('family/teamAndMember/updateTeam', {
            TDID: this.teamId,
            ORGID: mechanism,
            TDMC: teamName,
            TDMS: teamTextarea,
            TDSC: teamSkillTextarea,
            IMGFILEID: imgId,
            ISENABLED
          }).then(rsp => {
            // 编辑完毕只有父组件重新获取数据
            this.$emit('regetSource');
            this.toggleContent(-1);
          }, rej => {
            if(rej.data.errcode === 460){
            this.$message.error(rej.data.datas[0].message);
          }else{
            this.$message.error(rej.data.errmsg);
          }});
        } else {
          // 添加团队
          this.$post('family/teamAndMember/addTeam', {
            ORGID: mechanism,
            TDMC: teamName,
            TDMS: teamTextarea,
            TDSC: teamSkillTextarea,
            IMGFILEID: imgId
          }).then(rsp => {
            this.createId = rsp.data.TDID;
            this.$emit('regetSource');
            this.toggleTeamDialog();
            this.toggleContent(-1);
          }, rej => {
            if(rej.data.errcode === 460){
            this.$message.error(rej.data.datas[0].message);
          }else{
            this.$message.error(rej.data.errmsg);
          }})
        }
      },
      /**
       * 确认打开添加成员窗口
       */
      addNewMember() {
        // 新增完毕后打开添加成员窗口
        this.$emit('openMember', this.createId, this.mechanism);
        this.toggleContent();
      },
      /**
       * 远程搜索筛选数组
       * @param str type:string 待筛选字段
       * @param res type:Function promise的成功回调
       * @param rej type:Function promise的失败回调
       */
      filterOrgs(str, res, rej) {
        // 接口调用最后返回一个数组
        this.$post('organ/getPage', {
          orgName: str,
          pageNo: 1,
          pageSize: 10
        }).then(rsp => {
          let result = rsp.datas.map(item => {
            item.id = item.orgId;
            item.value = item.orgName;
            return item
          });
          res(result)
        }, reject => {
          this.$message.error(reject.data.errmsg);
          rej([])
        });
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
            this.imgId = rsp.data.id;
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
    },
    created() {
      // 编辑数据回显
      if (this.teamId) {
        this.$post('family/teamAndMember/getByTDID', {
          TDID: this.teamId
        }).then(rsp => {
          const {ORGID, ORGNAME, TDMC, TDMS, TDSC, IMGFILEID, ISENABLED} = rsp.data;
          this.mechanism = ORGID;
          this.mechanismName = ORGNAME;
          this.teamName = TDMC;
          this.teamTextarea = TDMS;
          this.teamSkillTextarea = TDSC;
          this.imgId = IMGFILEID;
          this.ISENABLED = ISENABLED;
          this.imageUrl = this.$downloadUrl + IMGFILEID;
        }, rej => {
          if(rej.data.errcode === 460){
            this.$message.error(rej.data.datas[0].message);
          }else{
            this.$message.error(rej.data.errmsg);
          }})
      }

      // 机构管理员特殊处理
      let roleType = JSON.parse(this.$localStore.getItem('role')).roleType;
      if (!this.teamId && roleType === 2) {
        this.isShowOrg = false;
      }
    }
  }
</script>

<style lang="scss">
  .addNewTeam {
    font-size: 16px;

    .paddingBox {
      padding: 30px 0;
    }

    .iconText {
      width: 75px;
      text-align: right;
    }

    .addNewTeamTitle {
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

    .addNewTeamContent {
      padding: 40px 60px;

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

    .assignDialogFooter {
      margin: 0 auto;
      padding-top: 30px;

      .el-button {
        margin: 0 10px;
        padding: 0 0;
        width: 86px;
        height: 30px;
        font-size: 16px;
      }
    }

  }
</style>
