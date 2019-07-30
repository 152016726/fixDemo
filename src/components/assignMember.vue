<template>
  <div class="assignMember">
    <div class="assignMemberInfo clearfix">
      <img class="memberAvatar fl" :src="memberInfo.GRTXWJID ? downloadUrl+memberInfo.GRTXWJID : memberInfo.XB === '男' ? man : woman"/>
      <div class="memberInfo fl">
        <p class="info"><span class="name">{{memberInfo.XM}}</span> <i class="gender">{{memberInfo.XB}}</i></p>
        <div class="idCardNum">{{memberInfo.SFZJH}}</div>
      </div>
    </div>
    <div class="memberType">{{memberInfo.YHZGXMC}}</div>
    <!--<div class="closeMemberDialog" v-if="isClose" @click="closeDialog">&times;</div>-->
  </div>
</template>

<script>
  export default {
    name: "assignMember",
    data() {
      return {
        downloadUrl: this.$downloadUrl,                // 下载路径
        man: this.$defaultManImg,                     //  默认男士头像
        woman: this.defaultWomanImg                   // 默认女士头像
      }
    },
    props: {
      isClose: {default: true},
      memberInfo: {
        default: () => {
        }
      }
    },
    methods: {
      closeDialog() {

      }
    }
  }
</script>

<style lang="scss">
  .assignMember {
    padding: 18px 18px;
    border: 1px solid #DDDDDD;
    border-radius: 4px;
    box-sizing: border-box;
    position: relative;

    .assignMemberInfo {
      .memberAvatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        /*background-color: #4486FF;*/
        background-size: contain;
      }

      .memberInfo {
        margin-left: 10px;

        .info {
          line-height: 30px;
          text-align: left;

          .gender {
            margin-left: 57px;
          }
        }
      }
    }

    .memberType {
      position: absolute;
      font-size: 10px;
      top: 0;
      left: 0;
      padding: 0 10px;
      height: 18px;
      line-height: 18px;
      border-radius: 4px 0 0 0;
      background-color: #4486FF;
      color: #ffffff;
    }

    .closeMemberDialog {
      cursor: pointer;
      position: absolute;
      top: 0;
      right: 0;
      width: 28px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      font-size: 20px;
      border-radius: 50%;
      transform: translate(50%, -50%);
      -ms-transform: translate(50%, -50%);
      -webkit-transform: translate(50%, -50%);
      -o-transform: translate(50%, -50%);
      -moz-transform: translate(50%, -50%);
      background-color: #F65860;
      color: #ffffff;
    }
  }
</style>
