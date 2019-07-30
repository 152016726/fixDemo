<template>
  <div class="teamMember">
    <label role="checkbox" class="memberSelect">
      <div class="teamMemberItem" :class="{border: msg}">
        <img :src="dataObj.headImgFileId ? downloadUrl + dataObj.headImgFileId : dataObj.XB === '男' ? man : women" :alt="dataObj.doctorName" class="avatar">
        <span class="doctorName">{{dataObj.doctorName}}</span>
        <span class="gender">{{dataObj.sexName}}</span>
        <span class="doctorType">{{dataObj.posTitleName}}</span>
      </div>
      <!--<input type="checkbox" class="checkbox" v-model="msg">-->
      <el-checkbox v-model="msg" class="checkbox"></el-checkbox>
    </label>

  </div>
</template>

<script>

  export default {
    name: "teamMember",
    data() {
      return {
        msg: '',
        women: this.$defaultManImg,
        man: this.defaultWomanImg,
        downloadUrl: this.$downloadUrl,                // 下载路径
      }
    },
    props: {
      type:{default: ''},
      teamId: {default: ''},
      dataObj: {default: ()=>{}}
    },
    watch:{
      msg(){
        const {doctorId, doctorName} = this.dataObj;
        this.$emit('clickItem', {
          doctorId,
          TDID: this.teamId,
          TDJSDM: this.type
        })
      }
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .teamMember {
    text-align: center;
    margin-bottom: 30px;
    .memberSelect{
      .teamMemberItem {
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
        box-sizing: border-box;
        margin-bottom: 10px;
        &.border{
          border: 1px solid #4486FF;
        }

        .avatar {
          width: 60px;
          height: 60px;
          margin-bottom: 6px;
        }
      }
      .checkbox{
        padding: 0 0;
        margin: 0 0;
        .el-checkbox__input {
          width: 20px;
          height: 20px;
          padding: 0 0;
          margin: 0 0;

          .el-checkbox__inner {
            width: 100%;
            height: 100%;

            &::after {
              font-size: 20px;
              line-height: 20px;
              left: 38%;
              top: 23%;
              border: 2px solid #FFF;
              border-left: 0;
              border-top: 0;
              transition: none;
              -webkit-transition:none;
              -webkit-transform-origin: center;
              transform-origin:center;
            }
          }
        }

        .el-checkbox__label {
          margin: 0 0;
          padding: 0 0;
        }
      }
    }
  }
</style>
