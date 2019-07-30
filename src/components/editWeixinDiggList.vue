<template>
  <assignAlertDialog
    :title="wxConfigId ? '编辑公众号' : '新建公众号'"
    :isShowDialog="isShow"
    :toggleContent="toggleRoleMemberDialog"
    :confirmDialog="confirmRoleMemberDialog"
  >
    <div class="editWeixinDiggList">
      <!-- 公众号信息标题开始 -->
      <p class="editWeixinDiggListTitle">公众号信息</p>
      <!-- 公众号信息标题结束 -->

      <!-- 公众号信息内容开始 -->
      <div class="editWeixinDiggListContent">
        <commonAutocomplete
          :text="'医疗机构'"
          v-model="wxConfigId ? orgName : orgId"
          :isDisabled="!!wxConfigId"
          :filterState="filterOrgs"
        >
        </commonAutocomplete>
        <commonTextInput :text="'公众号名称'" v-model="appName"></commonTextInput>
        <commonTextInput :text="'APPID'" v-model="appId"></commonTextInput>
        <commonTextInput :text="'APPSECRET'" v-model="appSecret"></commonTextInput>
        <div class="teamIntro clearfix">
          <div class="intro fl center">公众号二维码</div>
          <div class="teamMember fl">
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
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <p class="codeTips">建议尺寸：250&times;250像素</p>
          </div>
        </div>
        <div class="uploadText">
          <div class="iconText">业务域名TXT</div>
          <div class="text">
            <el-upload
              class="upload-demo"
              :with-credentials="true"
              action="string"
              :headers="headers"
              :accept="'txt/*'"
              :show-file-list="false"
              :http-request="uploadTxt"
              :before-upload="beforeTxtUpload"
            >
              <span class="uploadBtn">{{txtUrl ? txtName : '选择文件'}}</span>
            </el-upload>
          </div>
        </div>
        <commonSelector class="stateSelector" :text="'状态'" :options="statusList" v-model="isEnabled"></commonSelector>
      </div>
      <!-- 公众号信息内容结束 -->
    </div>
  </assignAlertDialog>
</template>

<script>
  import assignAlertDialog from '@/components/assignAlertDialog';
  import commonTextInput from '@/components/commonTextInput';
  import commonSelector from '@/components/commonSelector';
  import commonCascader from '@/components/commonCascader';
  import commonAutocomplete from '@/components/commonAutocomplete';

  export default {
    name: "editWeixinDiggList",
    components: {
      assignAlertDialog,
      commonTextInput,
      commonSelector,
      commonCascader,
      commonAutocomplete
    },
    data() {
      return {
        imageUrl: '',                                    // 上传的二维码url
        qrcodeFileId: '',                                // 二维码图片文件ID
        txtUrl: '',                                      // 上传的txtUrl
        appTxtFileId: '',                                // 微信公众号的txt文件ID
        txtName: '已上传文件',                         // 上传的txt的名字
        orgId: '',                                       // 机构id
        orgName: '',                                    // 机构名称
        appName: '',                                     // 公众号名称
        appId: '',                                       // appid
        appSecret: '',                                   // appSecret
        isEnabled: true,                                 // 状态
        statusList: [                                    // 状态List
          {label: '启用', value: true},
          {label: '禁用', value: false}
        ],
        requestUrl: this.$uploadUrl,                     // 请求路径
        headers: {                                       // 请求头
          "Content-Type": 'multipart/form-data'
        }
      }
    },
    props: {
      wxConfigId: {default: ''},      // wxConfigId
      toggleMainContent: {},          // 开关弹窗方法
      isShow: {default: false}        // 是否展示窗口
    },
    watch: {
      wxConfigId(val) {
        // 公众号信息回显
        if (val) {
          this.$post('wx/secret/info/getById', {wxConfigId: val}).then(rsp => {
            Object.assign(this, rsp.data);
            if(rsp.data.qrcodeFileId){
              this.imageUrl = this.$downloadUrl + rsp.data.qrcodeFileId;
            }else{
              this.imageUrl = '';
            }
            if(rsp.data.appTxtFileId){
              this.txtUrl = this.$downloadUrl + rsp.data.appTxtFileId;
            }else{
              this.txtUrl = '';
            }
          }, rej => {
            if(rej.data.errcode === 460){
            this.$message.error(rej.data.datas[0].message);
          }else{
            this.$message.error(rej.data.errmsg);
          }})
        } else {
          this.orgId = "";
          this.appId = "";
          this.appSecret = "";
          this.appTxtFileId = "";
          this.appName = "";
          this.qrcodeFileId = "";
          this.imageUrl = '';
          this.txtUrl = '';
        }
      }
    },
    methods: {
      /**
       * 开关角色编辑窗口
       */
      toggleRoleMemberDialog() {
        this.toggleMainContent()
      },
      /**
       * 确认关闭窗口
       */
      confirmRoleMemberDialog() {
        const {orgId, appId, appSecret, appTxtFileId, appName, qrcodeFileId, wxConfigId, isEnabled} = this;
        if (!this.wxConfigId) {
          // 添加公众号
          this.$post('wx/secret/info/add', {
            orgId, appId, appSecret, appTxtFileId, appName, qrcodeFileId
          }).then(rsp => {
            this.$message.success(rsp.errmsg);
            this.toggleMainContent(-1)
          }, rej => {
            if(rej.data.errcode === 460){
            this.$message.error(rej.data.datas[0].message);
          }else{
            this.$message.error(rej.data.errmsg);
          }});
        } else {
          // 更新公众号
          this.$post('wx/secret/info/update', {
            orgId, appId, appSecret, appTxtFileId, appName, qrcodeFileId, wxConfigId, isEnabled
          }).then(rsp => {
            this.$message.success(rsp.errmsg);
            this.toggleMainContent(-1)
          }, rej => {
            if(rej.data.errcode === 460){
            this.$message.error(rej.data.datas[0].message);
          }else{
            this.$message.error(rej.data.errmsg);
          }});
        }

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
            this.qrcodeFileId = rsp.data.id;
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
        return isLt5M && isTp;
      },
      /**
       * 上传txt文件
       * @param param
       */
      uploadTxt(param) {
        const formData = new FormData();
        formData.append('content', param.file);
        this.$post(this.requestUrl, formData).then(rsp => {
          if (rsp.errcode !== 0) {
            this.$message.error(rsp.errmsg);
          } else {
            this.$message.success(rsp.errmsg);
            this.appTxtFileId = rsp.data.id;
            this.txtUrl = this.$downloadUrl + rsp.data.id;
            // this.txtName = rsp.data.originalName;
          }
        }, rej => {
          if(rej.data.errcode === 460){
            this.$message.error(rej.data.datas[0].message);
          }else{
            this.$message.error(rej.data.errmsg);
          }})
      },
      /**
       * 文档上传成功
       * @param file
       */
      beforeTxtUpload(file) {
        const isTp = file.type === 'text/plain';

        if (!isTp) {
          this.$message.error('只能上传txt文档!');
        }
        const isLt5M = file.size / 1024 / 1024 < 5;

        if (!isLt5M) {
          this.$message.error('上传文件大小不能超过 5MB!');
        }
        return isLt5M && isTp;
      },
      /**
       * 远程搜索筛选数组
       * @param str type:string 待筛选字段
       * @param res type:function promise的成功回调
       * @param rej type:function promise的失败回调
       */
      filterOrgs(str, res, rej) {
        // 接口调用最后返回一个数组
        this.$post('organ/getPage', {
          orgName: str,
          pageNo: 1,
          pageSize: 10
        }).then(rsp=>{
          let result = rsp.datas.map(item=>{
            item.id = item.orgId;
            item.value = item.orgName;
            return item
          });
          res(result)
        }, reject=>{
          this.$message.error(reject.data.errmsg);
          rej([])
        });
      }
    }
  }
</script>

<style lang="scss">
  .editWeixinDiggList {
    padding: 0 83px;

    .editWeixinDiggListTitle {
      font-size: 18px;
      font-weight: bold;
      padding: 24px 0;
    }

    .iconText {
      width: 120px;
      text-align: right;
    }

    .teamIntro {

      .intro {
        width: 120px;
        margin-right: 10px;
        text-align: right;
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
        .codeTips {
          color: #F65860;
          font-size: 12px;
          line-height: 30px;
        }

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
          width: 160px;
          height: 160px;
          line-height: 160px;
          text-align: center;
        }

        .avatar {
          width: 160px;
          height: 160px;
          display: block;
        }

        /*.addTeamMember {*/
        /*cursor: pointer;*/
        /*width: 160px;*/
        /*height: 160px;*/
        /*background: url("../assets/btn_add_big.png") no-repeat center center;*/
        /*background-size: cover;*/
        /*}*/
      }
    }

    .uploadText {
      display: flex;
      align-items: center;
      margin-bottom: 30px;

      .iconText {
        margin-right: 10px;
      }
    }

    .uploadBtn {
      cursor: pointer;
      border-radius: 6px;
      padding: 0 10px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #BABABA;
      border: 1Px solid #DDDDDD;
      box-sizing: border-box;
      display: block;
    }

    .txtLoad {
      margin: 0 0 20px 130px;
      padding: 0 0;
      border: none;
      height: 20px;
      line-height: 20px;
      text-indent: 20px;
      text-align: left;
      background: url("../assets/ic_txt.png") no-repeat center left;
      background-size: contain;
    }

    .stateSelector {
      .selection, .el-input__inner {
        width: 100px;
        height: 30px;
      }
    }
  }
</style>
