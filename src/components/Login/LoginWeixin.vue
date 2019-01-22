<template>
    <!-- 微信扫码登录组件 -->
    <div id="loginWeixin">
        <div class="weixinTitle">
            <font>微信登录</font>
        </div>
        <div class="qrCode">
            <font>这是一个二维码</font>
        </div>
        <div class="weixinPrompt">
            <font>请使用微信扫描二维码</font>
        </div>
        <div class="qrCodeRefresh">
            <font>二维码已过期，请<b @click="showWxloginclick">&nbsp;刷新</b></font>
        </div>
        <div class="accountLogin">
            <font type="button" @click="switchAccount">切换账号密码登录</font>
        </div>
        <LoginWeixinBindingPhone @dialogVisible='closeDialog' :dialogVisible='showWxlogin' />
    </div>
</template>

<script>
import LoginWeixinBindingPhone from '@/components/Login/LoginWeixinBindingPhone'
export default {
    name: 'loginWeixin',
    components: {
        LoginWeixinBindingPhone
    },
    data() {
        return {
            Show: true,
            showWxlogin: false
        }
    },
    methods: {
        //微信登录向账号密码登录的切换
        switchAccount: function () {
            this.$emit("switchPhone", this.Show)
        },
        // 充值金额切换
        changemoeney(i) {
            this.ismoney = i
            console.log(this.ismoney)
        },
        // 支付方式切换
        weicat(i) {
            this.iswetcat = i
            this.isborder = i
        },
        showWxloginclick() {
            console.log(123)
            this.showWxlogin = true
        },
        closeDialog() {
            this.showWxlogin = false
        }
    }
}
</script>

<style>
/* 清除浮动 */
.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  visibility: hidden;
  clear: both;
}
.clearfix {
  *zoom: 1;
}
#loginWeixin {
  width: 160px;
  margin: 0 auto;
  margin-top: 80px;
  padding: 0 0;
}
#loginWeixin .weixinTitle {
  margin-left: 49px;
  color: #ffffff;
  font-size: 16px;
}
#loginWeixin .qrCode {
  height: 160px;
  width: 160px;
  background-color: #7800ff;
  margin-top: 16px;
  text-align: center;
  line-height: 160px;
}
#loginWeixin .weixinPrompt {
  margin-left: 10px;
  color: #8d8c8d;
  font-size: 14px;
  margin-top: 16px;
}
#loginWeixin .qrCodeRefresh {
  margin-left: 10px;
  color: #8d8c8d;
  font-size: 14px;
  margin-top: 11px;
  margin-bottom: 50px;
}
#loginWeixin .qrCodeRefresh b {
  color: #ffffff;
  padding-bottom: 3px;
  border-bottom: 1px solid #ffffff;
  cursor: pointer;
  font-weight: normal;
}
#loginWeixin .accountLogin {
  width: 112px;
  margin-left: 25px;
  color: #ffffff;
  font-size: 14px;
  font-family: SourceHanSansCN-Regular;
  cursor: pointer;
}
#loginWeixin .accountLogin:hover font {
  text-decoration: underline;
}
</style>
