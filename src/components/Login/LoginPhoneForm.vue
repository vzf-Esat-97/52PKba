<template>
  <!-- 手机号登录页 -->
  <div id="LoginPhoneForm" @keyup.13="submit">
    <!-- {{datas | formatDate}} -->
    <div class="phone">
      <label for="">账号</label>
      <input placeholder="请输入手机号" type=text v-model="LoginPhone" maxlength="11" v-on:blur.stop="LoginPhone1" />
    </div>
    <div class="password" @keyup.13="submit">
      <label for="">密码</label>
      <input @keyup.enter="submit" placeholder="请输入密码" type=password v-model="Loginpassword" maxlength="14" />
    </div>
    <div class="rememberPassword">
      <el-checkbox checked>记住密码</el-checkbox>
    </div>

    <div class="rememberPassword2">
      <font @click="registerPhone(1)">忘记密码</font>
    </div>
    <div class="subMit">
      <button id="cashier-cash-btn" type="submit" @click="submit">登录</button>
    </div>
    <div class="Register">
      <font @click="registerPhone(2)">立即注册</font>
    </div>

    <!-- <div class="subMit">
            <button type="submit" @click="submit">登录</button>
        </div>
        <div class="Register">
            <font @click="registerPhone">立即注册</font>
        </div> -->
    <!-- <div class="quickLogin">
            <font>使用快捷登录：</font>
            <img src="../../assets/images/weixin.png" alt="" @click="switchAccount">
        </div> -->
    <LoginBindingPhone @dialogVisibleRegistered="closeOpenpphone" :dialogVisibleRegistered='iShowregister' :RegisteredORreset1="RegisteredORreset" />
  </div>
</template>

<script>
import LoginBindingPhone from '@/components/Login/LoginBindingPhone'
import { formatDate } from '../../common/date.js';
export default {
  name: 'LoginPhoneForm',
  data () {
    return {
      //切换登录方式
      Show: false,
      datas: '2018-9-9 10:12',
      //登录页手机号的值
      LoginPhone: '',
      //登录页密码值
      Loginpassword: '',
      //错误提示文字
      ErrorMessageText: '',
      //密码强度值
      PassWordHigh: 0,
      iShowregister: false,
      // 注册或找回密码判断
      RegisteredORreset: '',
    }
  },
  components: {
    LoginBindingPhone,
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  mounted () {
    // 全局键盘事件
    this.bodyListener = (e) => {
      if (e.keyCode === 13 && e.target === document.body) {
        if (!this.cashierDialog) {
          document.getElementById('cashier-cash-btn').click()
        } else {
          // document.getElementById('cashier-dialog-submit').click()
        }
      }
      if (this.cashierDialog) {
        if (e.keyCode === 27 && e.target === document.body) {
          document.getElementById('cashier-dialog-cancel').click()
        }
      }
    }
    document.body.addEventListener('keyup', this.bodyListener, false)
  },
  methods: {
    // 键盘事件
    // submit() {
    //     document.body.removeEventListener('keyup', this.bodyListener)
    //     console.log(12313212)
    // },

    //错误消息提示方法
    ErrorMessage () {
      this.$message({
        showClose: true,
        message: this.ErrorMessageText,
        type: 'error',
        duration: 5000,
        center: true,
      });
    },
    //账号密码登录向微信登录的切换
    switchAccount () {
      this.$emit("switchWeixin", this.Show)
    },
    //登录页手机号输入框失去焦点进行正则判断
    LoginPhone1 () {
      // if (this.LoginPhone == '') {
      //     this.ErrorMessageText = "手机号不能为空"
      //     this.ErrorMessage()
      // } else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.LoginPhone))) {
      //     this.ErrorMessageText = "请输入正确的手机号"
      //     this.ErrorMessage()
      //     this.LoginPhone = ''
      //     console.log(123)
      // }
    },
    // //登录页密码输入框失去焦点进行正则判断
    // Loginpassword1() {
    //     if (this.Loginpassword == '') {
    //         this.ErrorMessageText = "密码不能为空"
    //         this.ErrorMessage()
    //     } else if (!(/^[0-9A-Za-z]{8,16}$/.test(this.Loginpassword))) {
    //         this.ErrorMessageText = "请输入正确的密码"
    //         this.ErrorMessage()
    //         this.Loginpassword = ''
    //         console.log(456)
    //     }
    // },
    // 登录提交判断
    submit () {
      if (this.LoginPhone != '' && this.Loginpassword != '') {
        const url = '/api/User/Login'
        const data = JSON.stringify({ phone: this.LoginPhone, password: this.Loginpassword, verifyCode: '' })
        this.$post(url, data).then((res) => {
          if (res.code == 0) {
            this.$store.commit('base/token', res.data.token)
            this.$store.commit('other/IsLoginShowState', false)
            // this.$router.push({
            //     path: 'HomePage',
            //     name: 'HomePage'
            // })
            try { win.changeSize(1280, 830) } catch (err) { }
          } else {
            this.ErrorMessageText = res.msg
            this.ErrorMessage()
          }
        })
        console.log('登录咯')
      } else {
        this.ErrorMessageText = "请填写账户名和密码再点击登录"
        this.ErrorMessage()
      };
    },

    // 手机账号注册
    registerPhone (i) {
      this.iShowregister = true
      this.RegisteredORreset = i
    },
    closeOpenpphone () {
      this.iShowregister = false
    }
  },
}
</script>

<style>
/* 错误提示框样式 */
.el-message--error {
  background-color: #121212;
  border-color: #4c4c4c;
  border-radius: 0;
  color: #8d8c8d;
}
.el-message .el-icon-error {
  color: #ffffff;
}
.el-message--error .el-message__content {
  color: #ffffff;
}
#LoginPhoneForm {
  width: 200px;
  margin: 0 auto;
  margin-top: 104px;
  padding: 0 0;
  position: relative;
}
#LoginPhoneForm .phone,
#LoginPhoneForm .password {
  width: 200px;
  height: 40px;
  background: #373739;
  line-height: 40px;
  border: solid 1px #4c4c4c;
}
#LoginPhoneForm .phone {
  border-bottom: solid 0px #4c4c4c;
}
#LoginPhoneForm .phone label,
#LoginPhoneForm .password label {
  display: inline-block;
  width: 46px;
  height: 20px;
  line-height: 20px;
  border-right: solid 1px #8d8c8d;
  color: #8d8c8d;
  font-family: SourceHanSansCN-Regular;
  padding-left: 8px;
  letter-spacing: 0px;
}
#LoginPhoneForm .phone input,
#LoginPhoneForm .password input {
  height: 36px;
  width: 145px;
  border: solid 0px #4c4c4c;
  background: #373739;
  color: #ffffff;
  outline: none;
  text-indent: 0.6rem;
  letter-spacing: 0px;
  font-size: 16px;
}
#LoginPhoneForm .rememberPassword,
#LoginPhoneForm .rememberPassword2 {
  margin-top: 12px;
  display: inline-block;
}
#LoginPhoneForm .rememberPassword2 {
  float: right;
  color: #8d8c8d;
  font-size: 14px;
  cursor: pointer;
  line-height: 24px;
}
#LoginPhoneForm .rememberPassword2:hover,
#LoginPhoneForm .Register font:hover {
  color: #ffffff;
}
/* 选择框的大小 */
#LoginPhoneForm .el-checkbox__input {
  height: 12px;
  width: 12px;
}
/* 选择框的颜色 */
#LoginPhoneForm .el-checkbox__inner {
  background-color: rgba(0, 0, 0, 0.1);
  border-color: #4c4c4c;
  border-radius: 0px;
}
/* 选择框文字的设置 */
#LoginPhoneForm .el-checkbox__label {
  vertical-align: middle;
  color: #8d8c8d;
  padding-left: 12px;
}
/* 登录按钮 */
#LoginPhoneForm .subMit {
  margin-top: 24px;
  margin-bottom: 11px;
}
#LoginPhoneForm .subMit button {
  width: 200px;
  height: 40px;
  background-color: #7800ff;
  display: block;
  border: none;
  color: #ffffff;
  font-size: 14px;
  outline: none;
}
#LoginPhoneForm .Register font {
  /* margin-left: 73px; */
  color: #8d8c8d;
  font-size: 14px;
  cursor: pointer;
}
/* 快捷登录 */
#LoginPhoneForm .quickLogin {
  color: #8d8c8d;
  font-size: 14px;
  margin-top: 63px;
}
#LoginPhoneForm .quickLogin img {
  cursor: pointer;
}
</style>
