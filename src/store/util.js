import axios from "axios"
import qs from "qs"

const global="http://192.168.4.250:8082/admin/"
const myPlugin = {
   install(Vue,option){
      Vue.prototype.$http = ( obj ) =>{
           if(obj.methods == "post"){
              axios.post(global + obj.url,qs.stringify(obj.data  || null),{
                headers:obj.headers || null,
              }).then((RES)=>{
                 obj.success(RES)
              }).catch((err)=>{
                 obj.error(err)
              })
           }else{
               axios.get(global + obj.url,{
                 headers:obj.headers || null,
                 params:qs.stringify(obj.data  || null)
               }).then((RES)=>{
                  obj.success(RES)
               }).catch(()=>{
                  obj.error(RES)
               })
           }
      },
      // 面向对象
      Vue.directive("focus",{
           inserted(el,binding){
               el.focus()
           }
      });
   }
}

export default myPlugin
