<template>
  <!-- 手机号注册 -->
  <!-- <div id="loginBindingPhone"> -->
  <div class="bindingPhone1">
    <el-dialog :title="RegisteredORresetTitle" :visible.sync="dialogVisibleRegistered" width="380px" :modal='false' top="16vh" :close-on-click-modal='false' @close="loginBindingPhoneClose">
      <div class="phone2">
        <label for="">手机号</label>
        <input placeholder="填写手机号" type=text maxlength="11" v-model="registerPhonenum" @blur.prevent="registeredPhone1" />
      </div>
      <div class="VerificationCode4 clearfix">
        <div class="VerificationCode3 clearfix">
          <label for="">验证码</label>
          <input placeholder="输入验证码" type="text" maxlength="6" v-model="VerificationCodeNumber" />
        </div>
        <button @click="Sendauthcode" v-text="VerificationCode2" id="SendVerificationCode2"></button>
      </div>
      <div class="passWord">
        <label for="">{{mima}}</label>
        <input placeholder="填写密码" type="password" v-model="registeredpassword" @blur.prevent="registeredpassword1" maxlength="14" />
      </div>
      <div class="againPassWord">
        <label for="">确认密码</label>
        <input placeholder="确认密码" type="password" v-model="registeredpassword2" @blur.prevent="registeredpassword3" maxlength="14" />
      </div>

      <div v-show="isShow" class="passWord">
        <label for="">昵称</label>
        <input placeholder="填写昵称" type=text maxlength="11" v-model="nickname" @blur.prevent="RegisterNickname" />
      </div>

      <div class="agreed1">
        <div class="agreed1checkbox">
          <el-checkbox v-model="checked"></el-checkbox>
        </div>
        <div class="agreedspan">
          <span @click="AgreementPop(1)" v-show="isShow">已阅读并接受《我爱PK吧电竞注册用户协议》</span> <span @click="AgreementPop(2)" v-show="!isShow">已阅读并接受《我爱PK吧电竞修改密码协议》</span>
        </div>
      </div>
      <div class="immediatelyRegistered">
        <button type="submit" class="immediatelyRegistered1" @click="submitPhone" :class="{classA:checked===false}">{{lijizhuce}}</button>
      </div>
      <LoginSuccessfully @registerandbVisiblesuc="getsucMsg" :registerandbVisiblesuc="sucfullMsg" />
    </el-dialog>
    <AgreementUp v-model="AgreementPopshow" @LoginBiniphonesuc="LoginBiniphonesuc" :agreementNmae="agreementNmae" />
  </div>
  <!-- </div> -->
</template>

<script>
import LoginSuccessfully from '@/components/Login/LoginRegisteredSuccessfully'
import AgreementUp from '@/components/Popup/AgreementUp'
export default {
  name: 'loginBindingPhone',
  props: {
    dialogVisibleRegistered: Boolean,
    RegisteredORreset1: "",
  },
  components: {
    LoginSuccessfully,
    AgreementUp
  },
  data () {
    return {
      sucfullMsg: false,
      // isShowdialogVisible: false,
      //登录弹框页手机号的值
      registeredPhone: '',
      //错误提示文字
      ErrorMessageText: '',
      //验证码框文字
      VerificationCode2: '发送验证码',
      // 时间倒计时
      wait: "60",
      //判断是否开始倒计时
      canClick: true,
      //是否禁用验证码框
      disabled: false,
      //选择阅读用户协议
      checked: false,
      //密码强度值
      PassWordHigh: 0,
      //登录页密码值
      registeredpassword: '',
      //第二次输入的密码
      registeredpassword2: '',
      //验证码的值
      VerificationCodeNumber: '',
      registerPhonenum: '',
      //判断是否要阅读条件
      isShow: true,
      //注册密码或修改密码
      mima: '密码',
      //立即注册
      lijizhuce: '立即注册',
      //标题
      RegisteredORresetTitle: '注册PK账号',
      // 判断是注册还是修改密码
      url: '',
      // 判断是注册还是修改密码提示传值
      RegisteredORreset2: '',
      // 激活注册修改框
      disabled: true,
      classStates: true,
      AgreementPopshow: false,
      agreementNmae: '',
      promotionCode: '',
      nickname: '', // 昵称
    }
  },
  // computed:{

  // },
  watch: {
    // dialogVisibleRegistered(){
    //     this.isShowdialogVisible=true
    // },
    //修改注册按钮的值
    RegisteredORreset1 (n, o) {
      if (this.RegisteredORreset1 == 1) {
        this.RegisteredORresetTitle = "修改密码"
        this.isShow = false
        this.mima = '新密码'
        this.lijizhuce = '确认修改'
        this.url = '/api/User/ResetPasswords'
      } else {
        this.RegisteredORresetTitle = "注册PK账号"
        this.isShow = true
        this.mima = '密码'
        this.lijizhuce = '立即注册'
        this.url = '/api/User/Register'
      }
    }
  },
  methods: {
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
    //登录弹框页手机号输入框失去焦点进行正则判断
    registeredPhone1 () {
      var phoneTest = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (this.registerPhonenum == '') {
        this.ErrorMessageText = "手机号不能为空"
        this.ErrorMessage()
      } else if (!phoneTest.test(this.registerPhonenum)) {
        this.ErrorMessageText = "请输入正确的手机号"
        this.ErrorMessage()
      } else {
        console.log("zhengque")
      }
    },

    // 昵称失去焦点函数
    RegisterNickname () {
      if (this.nickname === '') {
        console.log("没有名字")
        this.$message({
          message: '请输入昵称',
          type: 'warning'
        });
      }
    },

    //关闭回调
    loginBindingPhoneClose () {
      this.$emit('dialogVisibleRegistered', false)
      // this.canClick = true
    },
    // 倒计时函数
    countdown () {
      if (!this.canClick) return
      this.canClick = false
      this.VerificationCode2 = this.wait + `s`
      document.getElementById("SendVerificationCode2").style.background = '#121212'
      document.getElementById("SendVerificationCode2").style.border = '1px solid #4c4c4c'
      document.getElementById("SendVerificationCode2").style.color = "#8d8c8d"
      let clock = window.setInterval(() => {
        this.wait--
        this.VerificationCode2 = this.wait + `s`
        this.disabled = true
        if (this.wait <= 0) { //当倒计时小于0时清除定时器
          window.clearInterval(clock)
          this.VerificationCode2 = '再次获取'
          document.getElementById("SendVerificationCode2").style.background = "#7800ff"
          // document.getElementById("SendVerificationCode2").setAttribute('style', 'color:#fff')
          this.wait = 60
          this.canClick = true
          this.disabled = false
        }
      }, 1000)
    },

    //发送验证码
    Sendauthcode () {
      console.log(12312331321233)
      const phoneTestnum = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (this.registerPhonenum != "" && phoneTestnum.test(this.registerPhonenum)) {
        this.countdown()
        const url = '/api/Sys/RequestSMSSendVerifyCode?phone=' + this.registerPhonenum
        // const data = JSON.stringify({phone:this.registerPhonenum})
        this.$fetch(url).then((response) => {
          console.log(response)
        })
      } else {
        this.ErrorMessageText = "请输入正确的手机号"
        this.ErrorMessage()
      }
    },
    //登录页密码输入框失去焦点进行正则判断
    registeredpassword1 () {
      if (this.registeredpassword == '') {
        this.ErrorMessageText = "密码不能为空"
        this.ErrorMessage()
      } else if (!(/^[0-9A-Za-z]{8,16}$/.test(this.registeredpassword))) {
        this.ErrorMessageText = "请注意密码由数字、字母或者纯数字、字母组成不能少于8个字符"
        this.ErrorMessage()
        this.registeredpassword = ''
      }
    },
    // 判断2次输入的密码是否一致
    registeredpassword3 () {
      if (this.registeredpassword != this.registeredpassword2) {
        this.ErrorMessageText = "两次输入的密码不一致，请重新输入"
        this.ErrorMessage()
        this.registeredpassword2 = ''
      };
    },
    // 是否同意协议
    LoginBiniphonesuc (data) {
      this.checked = data
      console.log(data)
    },
    // 注册提交判断
    submitPhone () {
      console.log(this.checked)
      console.log(window.location.href)
      var url = window.location.href; //获取url中"?"符后的字串 
      let s1 = url.split('?')
      console.log(s1)
      let query = {}
      if (s1.length === 2) {
        let queryPart = s1[1]
        if (queryPart.substr(queryPart.length - 2, 2) === '#/') {
          queryPart = queryPart.substr(0, queryPart.length - 2)
        }
        let s2 = queryPart.split('&')
        s2.forEach(s2Item => {
          if (s2Item) {
            let s3 = s2Item.split('=')
            query[s3[0]] = s3[1]
          }
        })
      }
      this.promotionCode = query.p
      console.log(query.p)
      if (this.registerPhonenum != '' && this.VerificationCodeNumber != '' && this.registeredpassword != '' && this.registeredpassword2 != "" && this.checked) {
        // const url = '/api/User/Register'
        //激活按钮框
        this.disabled = false
        this.classStates = false
        if (this.url === '/api/User/Register') {
          var data = JSON.stringify({ phone: this.registerPhonenum, smsVerifyCode: this.VerificationCodeNumber, password: this.registeredpassword, promotionCode: this.promotionCode, nickname: this.nickname })
          console.log(data)
        } else {
          var data = JSON.stringify({ phone: this.registerPhonenum, smsVerifyCode: this.VerificationCodeNumber, password: this.registeredpassword })
          console.log(data)
        }
        console.log(data)
        this.$post(this.url, data).then((res) => {
          if (res.code == 0) {
            this.$store.commit('other/zhucbangdingmsg', '注册成功')
            this.sucfullMsg = true
            this.$store.commit('base/token', res.data.token)
          } else {
            this.ErrorMessageText = res.msg
            this.ErrorMessage()
          }
        })
      } else {
        this.ErrorMessageText = "请按要求填写完成后，再次点击注册"
        this.ErrorMessage()
      };
    },
    // 注册成功子组件传值
    getsucMsg () {
      this.sucfullMsg = false
    },
    // pk吧协议弹框
    AgreementPop (i) {
      if (i === 1) {
        this.agreementNmae = "我爱PK吧电竞注册用户协议"
        this.AgreementPopshow = true
        // this.checked=false
      } else {
        this.agreementNmae = "我爱PK吧电竞修改密码协议"
        this.AgreementPopshow = true
      }
    }
  },
}
</script>

<style>
/* 弹框样式 */
.bindingPhone1 .el-dialog__header {
  background-color: #121212;
  padding-top: 20px;
}
.bindingPhone1 .el-dialog {
  height: 370px;
}
/* 弹框头 */
.bindingPhone1 .el-dialog__title {
  color: #8d8c8d;
  font-size: 14px;
  margin-left: 10px;
}
/* 弹框内容 */
.bindingPhone1 .el-dialog__body {
  background-color: #121212;
  /* padding-top: 3px !important; */
  padding: 44px 20px 32px 20px !important;
}
/* 顶部关闭按钮设置 */
.bindingPhone1 .el-dialog__headerbtn {
  position: absolute;
  top: 8px;
  right: 12px;
  padding: 0;
  background: 0 0;
  border: none;
  outline: 0;
  cursor: pointer;
  font-size: 16px;
}
.bindingPhone1 .el-dialog__headerbtn:hover .el-dialog__close {
  color: #909399;
}
/* 手机号 */
.bindingPhone1 .phone2 {
  width: 320px;
  height: 40px;
  background: #373739;
  line-height: 40px;
  border: solid 1px #4c4c4c;
  margin: 0 auto 16px auto;
  border-bottom: solid 0px #4c4c4c;
}
.bindingPhone1 .phone2 label {
  display: inline-block;
  width: 80px;
  height: 20px;
  line-height: 20px;
  border-right: solid 1px #8d8c8d;
  color: #8d8c8d;
  font-family: SourceHanSansCN-Regular;
  padding-left: 18px;
  letter-spacing: 0px;
}
.bindingPhone1 .phone2 input {
  height: 37px;
  width: 230px;
  border: solid 0px #4c4c4c;
  background: #373739;
  color: #ffffff;
  outline: none;
  text-indent: 0.6rem;
  letter-spacing: 0px;
  font-size: 16px;
}
/* 验证码外面大div */
.bindingPhone1 .VerificationCode4 {
  width: 330px;
  height: 40px;
  margin-bottom: 16px;
}
/* 验证码左边div */
.bindingPhone1 .VerificationCode3 {
  width: 180px;
  height: 40px;
  background: #373739;
  line-height: 40px;
  border: solid 1px #4c4c4c;
  margin-left: 10px;
  float: left;
}
.bindingPhone1 .VerificationCode3 label {
  display: inline-block;
  width: 80px;
  height: 20px;
  line-height: 20px;
  border-right: solid 1px #8d8c8d;
  color: #8d8c8d;
  font-family: SourceHanSansCN-Regular;
  padding-left: 18px;
  letter-spacing: 0px;
}
.bindingPhone1 .VerificationCode3 input {
  height: 37px;
  width: 90px;
  border: solid 0px #4c4c4c;
  background: #373739;
  color: #ffffff;
  outline: none;
  text-indent: 0.6rem;
  letter-spacing: 0px;
  font-size: 16px;
}
.bindingPhone1 .VerificationCode4 button {
  width: 120px;
  float: right;
  height: 40px;
  line-height: 38px;
  padding: 0 5px;
  background-color: #7800ff;
  border: none;
  border-radius: 0;
  color: #ffffff;
  font-size: 15px;
  outline: none;
}
/* 密码 */
.bindingPhone1 .passWord {
  width: 320px;
  height: 40px;
  background: #373739;
  line-height: 40px;
  border: solid 1px #4c4c4c;
  margin: 0 auto 16px auto;
}
.bindingPhone1 .passWord {
  border-bottom: solid 0px #4c4c4c;
}
.bindingPhone1 .passWord label {
  display: inline-block;
  width: 80px;
  height: 20px;
  line-height: 20px;
  border-right: solid 1px #8d8c8d;
  color: #8d8c8d;
  font-family: SourceHanSansCN-Regular;
  padding-left: 18px;
  letter-spacing: 0px;
}
.bindingPhone1 .passWord input {
  height: 37px;
  width: 230px;
  border: solid 0px #4c4c4c;
  background: #373739;
  color: #ffffff;
  outline: none;
  text-indent: 0.6rem;
  letter-spacing: 0px;
  font-size: 16px;
}
/* 确认密码 */
.bindingPhone1 .againPassWord {
  width: 320px;
  height: 40px;
  background: #373739;
  line-height: 40px;
  border: solid 1px #4c4c4c;
  margin: 0 auto 16px;
}
.bindingPhone1 .againPassWord {
  border-bottom: solid 0px #4c4c4c;
}
.bindingPhone1 .againPassWord label {
  display: inline-block;
  width: 80px;
  height: 20px;
  line-height: 20px;
  border-right: solid 1px #8d8c8d;
  color: #8d8c8d;
  font-family: SourceHanSansCN-Regular;
  padding-left: 18px;
  letter-spacing: 0px;
}
.bindingPhone1 .againPassWord input {
  height: 37px;
  width: 230px;
  border: solid 0px #4c4c4c;
  background: #373739;
  color: #ffffff;
  outline: none;
  text-indent: 0.6rem;
  letter-spacing: 0px;
  font-size: 16px;
}
/* 我已阅读相关条例 */
.bindingPhone1 .agreed1 {
  width: 330px;
  height: 25px;
  margin-left: 10px;
  margin-top: 8px;
}
.bindingPhone1 .agreed1checkbox {
  width: 14px;
  height: 14px;
  float: left;
}
.bindingPhone1 .agreed1 .agreedspan {
  width: 300px;
  height: 25px;
  line-height: 24px;
  float: left;
  cursor: pointer;
}
/* 选择框的大小 */
.bindingPhone1 .el-checkbox__input {
  height: 12px;
  width: 12px;
}
/* 选择框的颜色 */
.bindingPhone1 .el-checkbox__inner {
  background-color: rgba(0, 0, 0, 0.1);
  border-color: #4c4c4c;
  border-radius: 0px;
}
.bindingPhone1 .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: rgba(0, 0, 0, 0.1);
  border-color: #4c4c4c;
  border-radius: 0px;
}
.bindingPhone1 .el-checkbox__input.is-focus .el-checkbox__inner {
  background-color: rgba(0, 0, 0, 0.1);
  border-color: #4c4c4c;
  border-radius: 0px;
}
/* 选择框文字的设置 */
.bindingPhone1 .el-checkbox__label {
  vertical-align: middle;
  color: #8d8c8d;
  padding-left: 12px;
}
.bindingPhone1 .el-checkbox__input.is-checked + .el-checkbox__label {
  vertical-align: middle;
  color: #8d8c8d;
  padding-left: 12px;
}
.bindingPhone1 .immediatelyRegistered {
  margin-top: 15px;
  margin-bottom: 11px;
  margin-left: 10px;
}
.bindingPhone1 .immediatelyRegistered .immediatelyRegistered1 {
  width: 320px;
  height: 40px;
  display: block;
  border: none;
  font-size: 16px;
  cursor: pointer;
  outline: none;
}
.immediatelyRegistered1 {
  background-color: #7800ff;
  color: #ffffff;
}
.classA {
  background-color: #333333;
  color: #8d8c8d;
}
</style>