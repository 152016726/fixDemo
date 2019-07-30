<template>
  <assignAlertDialog
    :title="newsId ? '编辑资讯' : '发布资讯'"
    :isShowDialog="isShow"
    :toggleContent="toggleRoleMemberDialog"
    :confirmDialog="confirmRoleMemberDialog"
  >
    <div class="editWeixinDiggInfo" :class="{toggle: !isShowOrg}">
      <commonSelector
        :text="'板块'"
        v-model="category"
        :options="categoryList"
        :isDisabled="isDisabledCategory"
      >
      </commonSelector>

      <commonAutocomplete
        :text="'医疗机构'"
        v-model="newsId || isDisabledOrg ? orgName : orgId"
        :isDisabled="!!newsId || isDisabledOrg"
        v-if="isShowOrg"
        :filterState="filterOrgs"
      >
      </commonAutocomplete>

      <!-- 输入主题开始 -->
      <div class="plateContent" :class="{active: isFocus}">
        板块：<input type="text" class="plateTitle" placeholder="请输入主题" v-model="title" v-on:focus="textOnFocus"
                  v-on:blur="textOnblur">
      </div>
      <!-- 输入主题结束 -->

      <!-- 添加封面开始 -->
      <div class="addSurface">
        <p class="surfaceText">添加封面图 <i>(只能选一张)</i></p>
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
      </div>
      <!-- 添加封面结束 -->

      <!-- 富文本编辑器开始 -->
      <div class="editor" ref="ue">
        <vue-ueditor-wrap
          ref="ueditor"
          v-model="content"
          :destroy="false"
          :config="myconfig"
          @ready="ready"
        >
        </vue-ueditor-wrap>
      </div>
      <!-- 富文本编辑器结束 -->
      <!--:config="editorConfig"-->
    </div>
  </assignAlertDialog>
</template>

<script>
  import assignAlertDialog from '@/components/assignAlertDialog';
  import commonSelector from '@/components/commonSelector';
  import commonTextInput from '@/components/commonTextInput';
  // 1、引入VueUeditorWrap组件
  import VueUeditorWrap from 'vue-ueditor-wrap' // ES6 Module
  import commonAutocomplete from '@/components/commonAutocomplete';

  const SUPERPOWER = [6, 7];       // 平台管理员和超级管理员的roleType

  export default {
    name: "editWeixinDiggInfo",
    components: {
      assignAlertDialog,
      commonSelector,
      commonTextInput,
      commonAutocomplete,
      VueUeditorWrap
    },
    props: {
      newsId: {default: ''},           // 资讯id
      toggleMainContent: {},
      isShow: {default: false}        // 是否展示窗口
    },
    data() {
      return {
        coverPicFileId: '',                         // 封面图片文件ID
        imageUrl: '',                               // 上传的封面url
        orgId: '',                                  // 机构Id
        orgName: '',                                // 机构Name
        isDisabledOrg: false,                       // 是否禁用机构
        isShowOrg: true,                            // 是否展示机构名称
        organizationList: [],                       // 机构列表
        category: '',                               // 板块
        isDisabledCategory: false,                  // 是否可编辑板块类型
        categoryList: [                             // 板块List
          {
            label: '机构资讯',
            value: 1
          },
        ],
        isFocus: false,                               // 是否聚焦
        title: '',                                    // 标题
        editor: '',                                   // 富文本容器
        content: '',                                  // 富文本内容
        myconfig: {
          // 编辑器不自动被内容撑高
          autoHeightEnabled: false,
          // 初始容器高度
          initialFrameHeight: 446,
          // 初始容器宽度
          initialFrameWidth: '100%',
          // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
          serverUrl: 'http://localhost:8080/api/file/upload',
          // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
          // UEDITOR_HOME_URL: '/static/UEditor/'
          // 配合最新编译的资源文件，你可以实现添加自定义Request Headers,详情https://github.com/HaoChuan9421/ueditor/commits/dev-1.4.3.3
          headers: {
            "Content-Type": 'multipart/form-data'
          },
          // toolbars: [], //工具栏
          elementPathEnabled: false,//关闭elementPath
        },
        isSticky: false,                                // 是否被置顶
        requestUrl: this.$uploadUrl,    // 请求路径
        headers: {                                              // 请求头
          "Content-Type": 'multipart/form-data'
        }
      }
    },
    watch: {
      /**
       *  监测newsId
       */
      newsId(newsId) {
        // 公众号咨询回显
        if (newsId) {
          this.isDisabledCategory = true;
          this.$post('news/getById', {
            newsId
          }).then(rsp => {
            Object.assign(this, rsp.data);
            this.imageUrl = this.$downloadUrl + rsp.data.coverPicFileId;

          }, rej => {
            if(rej.data.errcode === 460){
            this.$message.error(rej.data.datas[0].message);
          }else{
            this.$message.error(rej.data.errmsg);
          }})
        } else {
          this.category = '';
          this.orgId = '';
          this.title = '';
          this.coverPicFileId = '';
          this.content = '';
          this.isSticky = '';
          this.isDisabledCategory = false;
          this.imageUrl = '';
        }
      },
      isShow(val) {
        if (!val && !this.newsId) {
          this.category = '';
          this.orgId = '';
          this.title = '';
          this.coverPicFileId = '';
          this.content = '';
          this.isSticky = '';
          this.isDisabledCategory = false;
          this.imageUrl = '';
        }
      },
      /**
       * 监测资讯类型
       */
      category(val) {
        if (val === '') {
          this.isShowOrg = true;
        } else {
          this.isShowOrg = !!val;
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
        const {category, orgId, title, coverPicFileId, content, isSticky, newsId} = this;
        if (!newsId) {
          // 添加公众号资讯
          this.$post('news/add', {
            category, orgId, title, coverPicFileId, content, isSticky
          }).then(rsp => {
            this.$message.success(rsp.errmsg);
            this.toggleMainContent(-1)
          }, rej => {
            if(rej.data.errcode === 460){
            this.$message.error(rej.data.datas[0].message);
          }else{
            this.$message.error(rej.data.errmsg);
          }})
        } else {
          // 更新公众号资讯
          this.$post('news/update', {
            title, newsId, coverPicFileId, content, isSticky
          }).then(rsp => {
            this.$message.success(rsp.errmsg);
            this.toggleMainContent(-1)
          }, rej => {
            if(rej.data.errcode === 460){
            this.$message.error(rej.data.datas[0].message);
          }else{
            this.$message.error(rej.data.errmsg);
          }})
        }
      },
      /**
       * 主题聚焦时间
       */
      textOnFocus() {
        this.isFocus = true;
      },
      /**
       * 主题失焦事件
       */
      textOnblur() {
        this.isFocus = false;
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
            this.coverPicFileId = rsp.data.id;
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
      // 5、 你可以在ready方法中拿到editorInstance实例,所有API和官方的实例是一样了。http://fex.baidu.com/ueditor/#api-common
      ready (editorInstance) {
        console.log(`实例${editorInstance.key}已经初始化:`, editorInstance)
      },
    },
    created() {
      let roleType = JSON.parse(this.$localStore.getItem('role')).roleType;
      let orgName = JSON.parse(this.$localStore.getItem('info')).orgName;
      // 平台管理员和超级管理员特殊处理
      if (SUPERPOWER.indexOf(roleType) !== -1) {
        this.categoryList = [{
          label: '公共资讯',
          value: 0
        },
          {
            label: '机构资讯',
            value: 1
          }]
      }
      // 机构管理员特殊处理
      if (roleType === 2) {
        this.orgName = orgName;
        this.category = 1;
        this.isDisabledOrg = true;
      }
    },
    mounted() {

    }
  }
</script>

<style lang="scss">
  .editWeixinDiggInfo {
    padding: 25px 60px;

    .iconText {
      width: 75px;
      text-align: right;
    }

    &.toggle {
      .iconText {
        /*width: px;*/
        width: auto;
        text-align: right;
      }
    }

    .plateContent {
      width: 1234px;
      font-size: 16px;
      line-height: 38px;
      border-bottom: 1px solid #DDDDDD;

      &.active {
        border-bottom: 1px solid #4486FF;
      }

      .plateTitle {
        input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
          /* WebKit browsers */
          color: #BABABA;
        }

        input:-moz-placeholder, textarea:-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: #BABABA;
        }

        input::-moz-placeholder, textarea::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: #BABABA;
        }

        input:-ms-input-placeholder, textarea:-ms-input-placeholder {
          /* Internet Explorer 10+ */
          color: #BABABA;
        }
      }
    }

    .addSurface {
      padding-top: 20px;
      margin-bottom: 30px;

      .surfaceText {
        font-size: 16px;
        padding: 9px 0;

        i {
          color: #F65860;
          font-size: 12px;
        }
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
    }
  }

  .assignDialogFooter {
    text-align: left !important;
    text-indent: 60px;
  }

  .ck-reset_all {
    > div:nth-child(1) {
      width: 170px;
    }
  }
</style>
