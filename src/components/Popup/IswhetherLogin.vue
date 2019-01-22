<template>
    <div class="IswhetherLogin">
        <el-dialog :visible.sync="isTosignupsuc" width="380px" top='26vh' :close-on-click-modal="false">
            <p>报名声明</p>
            <div class="main-content">
                <span>报名声明：
<br />1、凡以任何方式登陆本平台或直接、间接使用本平台资料者，视为自愿接受本网站声明的约束；
<br />2、PK8电竞平台只作为游戏服务功能支撑平台，提供相应的增值服务内容，平台上所有比赛信息都由第三方提供并负责；
<br />3、第三方举办赛事，如报名人数不足，赛事举办不成功，系统将自动退回予报名者报名费；
<br />4、赛事奖励由第三方举办者提供或负责；
<br />5、平台发现比赛成绩数据异常将拒绝发放该赛事奖励，平台保留最终解释权；</span>
            </div>
            <div class="rr_btn" @click="AgreementUpsuc">确 定</div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    props: {
        value: Boolean,
        agreementNmae:String
    },
    data() {
        return {

        };
    },
    computed: {
        isTosignupsuc: {
            get() {
                return this.value
            },
            set(v) {
                this.$emit('input', v)
            }
        }
    },
    methods: {
        AgreementUpsuc(){
            this.isTosignupsuc=false
            this.$emit('LoginBiniphonesuc',true)
        }
    }
}
</script>
<style>
.IswhetherLogin .el-dialog {
  height: 440px;
  background: #121212;
  border: solid 1px #4c4c4c;
}
.IswhetherLogin .el-dialog__headerbtn .el-dialog__close {
  position: absolute;
  /* top: -10px; */
  right: -5px;
}
.IswhetherLogin .el-dialog__header {
  padding: 0;
}
.IswhetherLogin .el-dialog__body {
  height: 404px;
  padding: 20px 20px 20px 20px;
  text-align: center;
}
.IswhetherLogin .rr_title {
  height: 14px;
  margin-bottom: 40px;
  line-height: 14px;
  font-size: 14px;
  color: #8d8c8d;
}
.IswhetherLogin .rr_btn {
  width: 320px;
  height: 40px;
  background-color: #7800ff;
  margin: auto;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  color: #fefefe;
  cursor: pointer;
  margin-top: 20px;
}
.IswhetherLogin p {
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  color: #ffffff;
}
.IswhetherLogin span {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  color: #8d8c8d;
}
</style>
<style lang='less' scoped>
.IswhetherLogin{
    .main-content{
        width: 320px;
        height: 280px;
        background-color: #373739;
        border: solid 1px #4c4c4c;
        margin: auto;
        span{
            width: 294px;
            height: 264px;
            display: block;
            margin: 8px auto;
            font-family: SourceHanSansCN-Regular;
            text-align: left;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 16px;
            letter-spacing: 0px;
            color: #ffffff;
            overflow: auto;
            text-indent:25px;
            -ms-overflow-style: none
        }
        ::-webkit-scrollbar{
            display: none;
        }
    }
}
</style>
