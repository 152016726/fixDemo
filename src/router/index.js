import Vue from 'vue'
import Router from 'vue-router'
import accountManage from '@/views/accountManage'                // 账号管理
import roleManage from '@/views/roleManage'                      // 角色列表
import index from '@/views/index'                                // 公共页
import home from '@/views/home'                                  // 首页
import notFound from '@/views/notFound'                           // 404
import signManage from '@/views/signManage'                      // 签约管理
import teamManage from '@/views/teamManage'                      // 团队管理
import memberManage from '@/views/memberManage'                  // 成员管理
import weixinDiggList from '@/views/weixinDiggList'              // 公众号列表
import weixinDiggInfo from '@/views/weixinDiggInfo'              // 公众号资讯
import login from '@/views/login'                                // 登陆

Vue.use(Router)

const defRouter = new Router({
  routes: [
    {name: 'login', path: '/login', component: login},
    {
      path: '/',
      name: 'index',
      component: index,
      redirect: '/signManage',
      children: [
        {
          path: '/home',
          name: 'home',
          component: home,
          meta: {
            order: '0'
          },
        },
        {
          path: '/signManage',
          name: 'signManage',
          component: signManage,
          meta: {
            order: '0-0'
          }
        },
        {
          path: '/roleManage',
          name: 'roleManage',
          component: roleManage,
          meta: {
            order: '1-0'
          }
        },
        {
          path: '/accountManage',
          name: 'accountManage',
          component: accountManage,
          meta: {
            order: '1-1'
          }
        },
        {
          path: '/teamManage',
          name: 'teamManage',
          component: teamManage,
          meta: {
            order: '2-1'
          }
        },
        {
          path: '/memberManage',
          name: 'memberManage',
          component: memberManage,
          meta: {
            order: '2-0'
          }
        },
        {
          path: '/weixinDiggList',
          name: 'weixinDiggList',
          component: weixinDiggList,
          meta: {
            order: '3-0'
          }
        },
        {
          path: '/weixinDiggInfo',
          name: 'weixinDiggInfo',
          component: weixinDiggInfo,
          meta: {
            order: '3-1'
          }
        },
        {
          path: '/404',
          name: '404',
          component: notFound,
          meta: {
            order: '404'
          }
        }
      ]
    },
    {path: "*", redirect: '/404'}
  ]
})

export default defRouter
