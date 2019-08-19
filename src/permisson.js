import router from './router';
import store from './store';
import {getAuth} from './utils/auth';

const whiteList = ['login'];

router.beforeEach(async(to,from ,next)=>{
  if (to.meta.order) store.dispatch('page/setDefaultOrderPage', to.meta.order)
  // if(getAuth()){
  //     if(whiteList.includes(to.name)){
  //         next({path: '/'})
  //     }else{
  //       // 拿一遍个人信息如果有则往下跳转 --- 待写
  //       next()
  //     }
  // }else{
  //   if(whiteList.includes(to.name)){
  //       next()
  //   }else{
  //       next(`/login?redirect=${to.path}`)
  //   }
  // }
  next()
});

router.afterEach(()=>{

});
