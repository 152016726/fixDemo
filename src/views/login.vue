<template>
  <div class="login">
    <div class="loginDialog">
      <h1>家庭医生签约管理系统</h1>
      <div class="loginBox">

        <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
          <el-form-item prop="account" :class="{active: acActive}">
            <div class="svg-container">
              <div class="tag" :style="{backgroundImage: 'url('+(acActive ? accountOn : accountOff) +')'}"></div>
            </div>
            <el-input
              v-model="loginForm.account"
              placeholder="请输入账号"
              type="text"
              name="account"
              v-on:blur="acTextOnblur"
              v-on:focus="acTextOnFocus"
            >
            </el-input>
          </el-form-item>

          <el-form-item prop="password" :class="{active: pwActive}">
            <div class="svg-container">
              <div class="tag" :style="{backgroundImage: 'url('+(pwActive ? unlock : lock) +')'}"></div>
            </div>
            <el-input
              v-model="loginForm.password"
              placeholder="请输入密码"
              :type="passwordType"
              name="password"
              v-on:blur="pwTextOnblur"
              v-on:focus="pwTextOnFocus"
            >
            </el-input>
            <div class="svg-eye" @click.prevent="showPwd">
              <div class="tag" :style="{backgroundImage: 'url('+(passwordType === 'password' ? unlock : lock) +')'}"></div>
            </div>
          </el-form-item>

          <el-form-item prop="verifyCode" class="imgCode">
            <div class="codeCheck" :class="{active: icActive}">
              <div class="svg-container">
                <div class="tag" :style="{backgroundImage: 'url('+(icActive ? codeOn : codeOff) +')'}"></div>
              </div>
              <el-input
                v-model="loginForm.verifyCode"
                placeholder="请输入验证码"
                type="text"
                name="verifyCode"
                v-on:blur="icTextOnblur"
                v-on:focus="icTextOnFocus"
              >
              </el-input>
            </div>
            <img :src="imgCodeSrc" alt="验证码" class="codeImg">
            <a href="#" class="exchangeImg" @click.prevent.stop="reGetCodeImg">换一张</a>
          </el-form-item>

          <div class="choosed">
            <el-checkbox v-model="checked">记住密码</el-checkbox>
          </div>

          <a href="#" class="loginBtn" :class="{active: loginForm.account && loginForm.password && loginForm.verifyCode}"
             @click.prevent.stop="submitData">
            登陆系统
          </a>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import accountOff from '@/assets/accountOff.png';
  import accountOn from '@/assets/accountOn.png';
  import lock from '@/assets/ic_lock_off.png';
  import unlock from '@/assets/ic_lock_on.png';
  import codeOff from '@/assets/ic_testing_off.png';
  import codeOn from '@/assets/ic_testing_on.png';
  import authority from '@/common/js/authOptions';
  import {validUsername, validPassword} from '@/common/js/util';

  export default {
    name: "login",
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!validUsername(value)) {
          callback(new Error('请输入正确格式的用户名'))
        } else {
          callback()
        }
      };

      const validatePassword = (rule, value, callback) => {
        if (!validPassword(value)) {
          callback(new Error('请输入正确格式的密码'))
        } else {
          callback()
        }
      };

      return {
        loginForm: {
          account: '',
          password: '',
          verifyCode: ''
        },
        passwordType: 'password',
        loginRules: {
          account: [{required: true, trigger: 'blur', validator: validateUsername}],
          password: [{required: true, trigger: 'blur', validator: validatePassword}]
        },
        checked: true,         // 是否记住密码
        acActive: false,         // 账号是否被激活
        pwActive: false,         // 密码是否被激活
        icActive: false,         // 验证码是否被激活
        imgCodeSrc: '',         // 验证码图片
        imgVerifyToken: '',     // 验证码token
        accountOff,             // 账号未输入时图标
        accountOn,              // 账号输入时图标
        lock,                   // 密码未输入时图标
        unlock,                 // 密码输入时图标
        codeOff,                // 验证码未输入时图标
        codeOn,                 // 验证码输入时图标
        errorTips: ''
      }
    },
    created() {
      let token = this.$localStore.getItem('auth-token');
      // 有token强制跳转至登陆页则强制跳转回首页
      if (token) this.$router.push({path: './'});
      this.reGetCodeImg()
    },
    methods: {
      /**
       * 提交数据
       **/
      submitData() {
        const {loginForm, imgVerifyToken} = this;
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            // 请求登陆接口
            this.$post('login/user', Object.assign(loginForm, {
              verifyToken:imgVerifyToken,
            })).then(rsp => {
              // 保存本地账号密码/不保存本地账号和密码
              if (this.checked) {
                this.$localStore.setItem('accountInfo', JSON.stringify({account, password}));
              } else {
                this.$localStore.removeItem('accountInfo');
              }
              // 用户基本信息
              this.$localStore.setItem('info', JSON.stringify(rsp.data));
              // 角色信息
              this.$localStore.setItem('role', JSON.stringify(rsp.data.role));
              // 保存token
              this.$localStore.setItem('auth-token', rsp.data.token);
              // 路由跳转
              this.$router.push({path: '/'});
              // 角色权限
              let subList = rsp.data.permissionGroups.map(item => {
                let arr = item.permissions.map(item => {
                  return item.permission;
                });
                return arr
              });
              let authList = [];
              subList.forEach(item => {
                authList = authList.concat(item);
              });
              for (let key in authority) {
                authority[key] = authList.indexOf(key) !== -1;
              }
              this.$localStore.setItem('authority', JSON.stringify(authority));
            }, rej => {
              if (rej.data.errcode === 460) {
                this.$message.error(rej.data.datas[0].message);
              } else {
                this.$message.error(rej.data.errmsg);
              }

              if (rej.data) {
                if (rej.data.errcode === 600403 || rej.data.errcode === 600402) this.reGetCodeImg();
              }
            })
          } else {
            return false
          }
        });
      },
      /**
       * 切换显示密码
       */
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = '';
        } else {
          this.passwordType = 'password';
        }
      },
      /**
       * 账号失焦事件
       */
      acTextOnblur() {
        if (this.loginForm.account === '') {
          this.acActive = false;
        }
      },
      /**
       * 账号聚焦事件
       */
      acTextOnFocus() {
        this.acActive = true;
      },
      /**
       * 密码失焦事件
       */
      pwTextOnblur() {
        if (this.loginForm.password === '') {
          this.pwActive = false;
        }
      },
      /**
       * 密码聚焦事件
       */
      pwTextOnFocus() {
        this.pwActive = true;
      },
      /**
       * 验证码失焦事件
       */
      icTextOnblur() {
        if (this.loginForm.verifyCode === '') {
          this.icActive = false;
        }
      },
      /**
       * 验证码聚焦事件
       */
      icTextOnFocus() {
        this.icActive = true;
      },
      /**
       * 重新获取验证码
       */
      reGetCodeImg() {
        this.$get('login/getCode').then(rsp => {
          this.imgCodeSrc = rsp.data.verifyImage;
          this.imgVerifyToken = rsp.data.verifyToken;
        });
      }
    }
  }
</script>

<style lang="scss">
  @import '../style/login.scss';
</style>
