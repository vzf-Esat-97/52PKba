<template>
    <!-- 顶部缩小关闭公共组件 -->
    <div id="LoginSwitch">
        <!-- <div class="dinwei">
            <img onclick="if(win)win.min()" src="../../assets/images/narrow.png" class="narrow">
            <img onclick="askClose()" src="../../assets/images/switch.png" class="switch">
        </div> -->
        <div class="content">
            <!-- 手机登录组件 -->
            <LoginPhoneForm v-on:switchWeixin="seeswitchWeixin" />
            <!-- 微信登录组件 -->
            <!-- <LoginWeixin  v-show="!Show" v-on:switchPhone="seeswitchPhone"/> -->
        </div>
        <!-- 退出系统 -->
        <!-- <div class="logDown">
            <el-dialog :visible.sync="dialogVisibleLogDown" width="380px" top="25vh">
                <div class="ld_title">确认退出系统吗？</div>
                <div class="ld_btn" onclick="if(win)win.close()">确 定</div>
            </el-dialog>
        </div> -->
        <CloseClient v-model="isShowCloseClient" />
    </div>
</template>

<script>
import CloseClient from '@/components/Popup/CloseClient' // 确认退出
import LoginPhoneForm from '@/components/Login/LoginPhoneForm'
import LoginWeixin from '@/components/Login/LoginWeixin'
export default {
    name: 'LoginSwitch',
    components: {
        CloseClient,
        LoginPhoneForm, 
        LoginWeixin
    },
    data() {
        return {
            Show: false,
            isShowCloseClient: false,
        }
    },
    mounted() {
        // askClose = this.openAskClose//关闭，很重要不能删
    },
    methods: {
        openAskClose() {
            this.isShowCloseClient = true
        },
        seeswitchPhone: function (switchPhone) {
            this.Show = switchPhone
        },
        seeswitchWeixin: function (switchWeixin) {
            this.Show = switchWeixin
        }
    },
}
</script>

<style scoped>
#LoginSwitch {
  width: 260px;
  height: 480px;
  background-image: url(../../assets/images/loginBgImage.png);
  float: right;
  position: relative;
}
/* 定位缩小关闭的div */
#LoginSwitch .dinwei {
  position: absolute;
  left: 213px;
  top: 5px;
}
#LoginSwitch .narrow {
  margin-right: 6px;
}
</style>
<style>
/*创建弹框*/
.el-dialog {
  height: 190px;
  background: #121212;
}
.el-dialog__header {
  padding: 0;
}
.el-dialog__body {
  height: 190px;
  padding: 64px 20px 32px 20px;
  text-align: center;
}
.ld_title {
  height: 14px;
  margin-bottom: 40px;
  line-height: 14px;
  font-size: 14px;
  color: #8d8c8d;
}
.ld_btn {
  width: 320px;
  height: 40px;
  background-color: #7800ff;
  margin: auto;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  color: #fefefe;
  cursor: pointer;
}
</style>
