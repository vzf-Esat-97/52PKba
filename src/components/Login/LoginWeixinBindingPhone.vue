<template>
    <!-- 微信扫码登录绑定手机号 -->
    <div id="loginWeixinBindingPhone">
        <div class="bindingPhone">
            <el-dialog :close-on-click-modal=false title="绑定手机号" :visible.sync="dialogVisible" width="380px" top="16vh" @close="NoSendVerificationCode">
                <div class="phone1">
                    <label for="">手机号</label>
                    <input type=text placeholder="请输入手机号" value="15828412000" v-model="loginWeixinPhone" maxlength="11" @blur.prevent="loginWeixinPhone1" />
                </div>
                <div class="VerificationCode1 clearfix">
                    <div class="VerificationCode clearfix">
                        <label for="">验证码</label>
                        <input placeholder="验证码" type="text" maxlength="6" v-model="yanZhenMa" />
                    </div>
                    <button @click="SendVerificationCode" v-text="VerificationCode" :disabled="disabled" id="SendVerificationCode"></button>
                </div>
                <div class="agreed">
                    <el-checkbox v-model="checked">已阅读并接受《我爱PK吧电竞注册用户协议》</el-checkbox>
                </div>
                <div class="immediatelyBinding">
                    <button type="submit" @click="sureBinding">立即绑定</button>
                </div>
            </el-dialog>
            <LoginSuccessfully @registerandbVisiblesuc="getsucMsg" :registerandbVisiblesuc="sucfullMsg" />
        </div>
    </div>
</template>

<script>
import LoginSuccessfully from '@/components/Login/LoginRegisteredSuccessfully'
export default {
    name: 'loginWeixinBindingPhone',
    props: {
        dialogVisible: Boolean
    },
    components:{
        LoginSuccessfully
    },
    data() {
        return {
            VerificationCode: '获取验证码', //验证码框文字
            wait: "60",  // 时间倒计时
            canClick: true,  //判断是否开始倒计时
            disabled: false, //是否禁用验证码框
            checked: true, //选择阅读用户协议
            loginWeixinPhone: '', //登录页手机号的值
            ErrorMessageText: '', //错误提示文字
            disabled2: true, // 禁用绑定框
            yanZhenMa: '',  //验证码的值
            sucfullMsg:false // 登录成功状态控制
        }
    },
    props: {
        dialogVisible: true,
    },
    methods: {
        //错误消息提示方法
        ErrorMessage() {
            this.$message({
                showClose: true,
                message: this.ErrorMessageText,
                type: 'error',
                duration: 5000,
                center: true,
            });
        },
        //关闭回调
        NoSendVerificationCode() {
            this.$emit('dialogVisible')
            // this.canClick = true
        },

        // 倒计时函数
        theLast() {
            if (!this.canClick) return
            this.canClick = false
            this.VerificationCode = this.wait + 'S'
            document.getElementById("SendVerificationCode").style.background = '#121212'
            document.getElementById("SendVerificationCode").style.border = '1px solid #4c4c4c'
            document.getElementById("SendVerificationCode").style.color = "#8d8c8d"
            let clock = window.setInterval(() => {
                this.wait--
                this.VerificationCode = this.wait + 'S'
                this.disabled = true
                if (this.wait <= 0) { //当倒计时小于0时清除定时器
                    window.clearInterval(clock)
                    this.VerificationCode = '再次获取'
                    document.getElementById("SendVerificationCode").setAttribute('style', 'background-color:#7800ff')
                    document.getElementById("SendVerificationCode").setAttribute('style', 'color:#fff')
                    this.wait = 60
                    this.canClick = true
                    this.disabled = false
                }
            }, 1000)
        },

        //发送验证码
        SendVerificationCode() {
            if (this.loginWeixinPhone != '') {
                this.theLast()
            } else {
                this.ErrorMessageText = "请输入正确的手机号"
                this.ErrorMessage()
            }
        },
        //登录页手机号输入框失去焦点进行正则判断
        loginWeixinPhone1() {
            var phoneTest = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
            if (this.loginWeixinPhone == '') {
                this.ErrorMessageText = "手机号不能为空"
                this.ErrorMessage()
            } else if (!phoneTest.test(this.loginWeixinPhone)) {
                this.ErrorMessageText = "请输入正确的手机号"
                this.ErrorMessage()
                this.loginWeixinPhone = ''
            } else {
                console.log("chengong")
            }
        },
        // 登录提交判断
        submit() {
            if (this.loginWeixinPhone != '' && this.yanZhenMa != '') {
                //关闭绑定提交禁用
                this.disabled3 = false
            } else {
                this.ErrorMessageText = "请按要求填写完成后，再次点击注册"
                this.ErrorMessage()
            };
        },
        // 绑定
        sureBinding() {
            console.log(123)
            this.sucfullMsg=true
            this.$store.commit('other/zhucbangdingmsg','绑定成功')
        },
        // 获取登录成功的状态
        getsucMsg(){
            this.sucfullMsg=false
        }
    }
}
</script>

<style>
/* 弹框样式 */
#loginWeixinBindingPhone .bindingPhone .el-dialog__header {
  background-color: #121212;
}
#loginWeixinBindingPhone .bindingPhone .el-dialog__title {
  color: #8d8c8d;
  font-size: 14px;
  margin-left: 10px;
}
#loginWeixinBindingPhone .bindingPhone .el-dialog__body {
  background-color: #121212;
  padding-top: 3px;
}
/* 手机号 */
#loginWeixinBindingPhone .bindingPhone .phone1 {
  width: 320px;
  height: 40px;
  background: #373739;
  line-height: 40px;
  border: solid 1px #4c4c4c;
  margin: 0 auto;
}
#loginWeixinBindingPhone .bindingPhone .phone1 {
  border-bottom: solid 0px #4c4c4c;
}
#loginWeixinBindingPhone .bindingPhone .phone1 label {
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
#loginWeixinBindingPhone .bindingPhone .phone1 input {
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
/* 验证码 */
#loginWeixinBindingPhone .bindingPhone .VerificationCode1 {
  width: 330px;
  height: 40px;
  margin-bottom: 20px;
}
#loginWeixinBindingPhone .bindingPhone .VerificationCode {
  width: 180px;
  height: 40px;
  background: #373739;
  line-height: 40px;
  border: solid 1px #4c4c4c;
  margin-left: 10px;
  margin-top: 16px;
  float: left;
}
#loginWeixinBindingPhone .bindingPhone .phone1 {
  border-bottom: solid 0px #4c4c4c;
}
#loginWeixinBindingPhone .bindingPhone .VerificationCode label {
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
#loginWeixinBindingPhone .bindingPhone .VerificationCode input {
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
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
/* input[type="number"] {    -moz-appearance: textfield;} */

#loginWeixinBindingPhone .bindingPhone .VerificationCode1 button {
  float: right;
  height: 40px;
  width: 130px;
  line-height: 38px;
  margin-top: 16px;
  background-color: #7800ff;
  border: none;
  border-radius: 0;
  color: #ffffff;
  font-size: 15px;
  outline: none;
}
/* 我已阅读相关条例 */
#loginWeixinBindingPhone .bindingPhone .agreed {
  margin-top: 20px;
  margin-left: 10px;
  margin-top: 25px;
}
/* 选择框的大小 */
#loginWeixinBindingPhone .bindingPhone .el-checkbox__input {
  height: 12px;
  width: 12px;
}
/* 选择框的颜色 */
#loginWeixinBindingPhone .bindingPhone .el-checkbox__inner {
  background-color: rgba(0, 0, 0, 0.1);
  border-color: #4c4c4c;
  border-radius: 0px;
}
#loginWeixinBindingPhone
  .bindingPhone
  .el-checkbox__input.is-checked
  .el-checkbox__inner {
  background-color: rgba(0, 0, 0, 0.1);
  border-color: #4c4c4c;
  border-radius: 0px;
}
#loginWeixinBindingPhone
  .bindingPhone
  .el-checkbox__input.is-focus
  .el-checkbox__inner {
  background-color: rgba(0, 0, 0, 0.1);
  border-color: #4c4c4c;
  border-radius: 0px;
}
/* 选择框文字的设置 */
#loginWeixinBindingPhone .bindingPhone .el-checkbox__label {
  vertical-align: middle;
  color: #8d8c8d;
  padding-left: 12px;
}
#loginWeixinBindingPhone
  .bindingPhone
  .el-checkbox__input.is-checked
  + .el-checkbox__label {
  vertical-align: middle;
  color: #8d8c8d;
  padding-left: 12px;
}
#loginWeixinBindingPhone .bindingPhone .immediatelyBinding {
  margin-top: 15px;
  margin-bottom: 11px;
  margin-left: 10px;
}
#loginWeixinBindingPhone .bindingPhone .immediatelyBinding button {
  width: 320px;
  height: 40px;
  background-color: #7800ff;
  display: block;
  border: none;
  color: #ffffff;
  font-size: 16px;
}
</style>
