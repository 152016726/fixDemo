<template>
  <!-- 导航菜单 -->
  <div class="navs">
    <el-menu
             :default-active="orderPage"
             class="el-menu-vertical-demo"
             :unique-opened="true"
             background-color="#304156"
             text-color="#fff"
             active-text-color="#669cfd"
    >
      <el-submenu :index="index+'-'+0" v-for="(item, index) in asideList" :key="index">
          <template slot="title">
            <i class="tag" :style="{backgroundImage: 'url('+item.iconSrc+')'}"></i>
            <span>{{item.name}}</span>
          </template>
        <el-menu-item-group v-for="(val, k) in item.items" :key="val.name+k" v-if="item.flag">
          <el-menu-item :index="index+'-'+ k" v-if="val.flag" @click="tabClick(val.url)">
              {{val.name}}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import home from '@/assets/ic_home.png';
  import account from '@/assets/ic_account.png';
  import team from '@/assets/ic_team.png';
  import service from '@/assets/ic_service.png';
  import weixinDigg from '@/assets/ic_public.png';
  import settings from '@/assets/ic_system.png';
  import openImg from '@/assets/btn_open.png';
  import tabImg from '@/assets/btn_retract.png';

  export default {
    name: "asside",
    data() {
      return {
        asideList: [
          // {name: '首页', url: './', flag:true, iconSrc: home},
          {name: '签约管理', iconSrc: home,url: '/signManage', flag:true, items: [{name: '签约列表', flag:true, url: '/signManage'}]},
          {name: '账号管理', iconSrc: account,url: '/roleManage', flag:true, items: [{name: '角色列表', flag:true, url: '/roleManage'},{name: '账号列表', flag:true, url: '/accountManage'}]},
          {name: '团队管理', iconSrc: team,url: '/memberManage', flag:true, items: [{name: '医生列表', flag:true, url: '/memberManage'}, {name: '团队列表', flag:true, url: '/teamManage'}]},
          // {name: '服务包管理', iconSrc: service, url: '/servicePackage', flag:true, items: [{name: '服务包管理', url: '/servicePackage'}]},
          // {name: '公众号管理', iconSrc: weixinDigg, url: '/weixinDiggList', flag:true, items: [{name: '公众号列表', flag:true, url: '/weixinDiggList'}, {name: '公众号资讯', flag:true, url: '/weixinDiggInfo'}]},
          // {name: '系统设置', iconSrc: settings}
        ],
        flag: true,        // 开关展开项
        openImg,
        tabImg
      }
    },
    computed: {
      ...mapState('page',[
        'orderPage'
      ])
    },
    methods: {
      /**
       * 左侧点击路由事件
       * @param url  提供跳转路由
       */
      tabClick(url) {
        this.$router.push({
          path: url
        })
      }
    },
    created() {
      let authObj = JSON.parse(this.$localStore.getItem('authority'));
      if(!!authObj){
        let arr = this.asideList;
        // 签约列表
        arr[0].flag = authObj['sign_list'];
        // 账号管理
        arr[1].flag = authObj['role_list'] || authObj['account_list'];
        arr[1].items[0].flag = authObj['role_list'];
        arr[1].items[1].flag = authObj['account_list'];
        // 团队管理
        arr[2].flag = authObj['team_member_list'] || authObj['team_list'];
        arr[2].items[0].flag = authObj['team_member_list'];
        arr[2].items[1].flag = authObj['team_list'];
        this.asideList = arr;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .navs {
    background-color: #304156;
    display: flex;
    height: 100%;
    box-sizing: border-box;
    .el-menu{
      width: 100%;
      padding: 10px 10px;
      border: none;
      .el-submenu{
        line-height: 40px;
        margin-bottom: 10px;
      }
      .el-menu-item{
        font-size: 18px;
        margin: 0 10px;
        margin-top: 10px;
      }
      .is-active{
        background-color: #4486FF!important;
        color: #ffffff!important;
      }
      .el-menu-item:hover{
        background-color: #4486FF!important;
      }
    }
    .tag {
      width: 20px;
      height: 20px;
      vertical-align: middle;
      display: inline-block;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: contain;
    }
  }
</style>
