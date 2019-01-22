<template>
  <div id="personalAssets">
    <el-dialog :visible.sync="PersonalInformationShow" width="340px" top="11vh">
      <div v-if="getUserINformation" class="UserInformationContent">
        <div class="UserInformationPortrait">
          <img v-if="getUserINformation" :src="getUserINformation.head32">
        </div>
        <div class="UserInformationName">
          <font v-if="getUserINformation" >{{getUserINformation.nickname || '暂未设置'}}</font>
        </div>
        <div class="UserInformationDetails">
          <font>邮箱：{{getUserINformation.email || '暂未设置'}}</font>
          <font>出生日期：{{getUserINformation.birthday.substr(0,10) || '暂未设置'}}</font>
        </div>
        <div class="UserInformationReceivables">
            <el-tabs v-model="activeName11">
                <el-tab-pane label="微信打赏码" name="first">
                    <div class="UserInformationPaymentCode">
                        <img :src="getUserINformation.alipayQRCode" v-if="getUserINformation.alipayQRCode">
                        <font v-else>没有上传微信二维码</font>
                    </div>  
                </el-tab-pane>
                <el-tab-pane label="支付宝打赏码" name="second">
                    <div class="UserInformationPaymentCode">
                        <img :src="getUserINformation.wxpayQRCode" v-if="getUserINformation.wxpayQRCode" alt="支付宝二维码">
                        <font v-else>没有上传支付宝二维码</font>
                    </div> 
                </el-tab-pane>
            </el-tabs>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    value: Boolean,
    getUserINformation:{
        type:Object,
        default(){
            return
        }
    },
  },
  data() {
    return {
      activeName11:'first',//赠送用户二维码切换默认激活
    };
  },
  computed:{
    PersonalInformationShow:{
        get(){
            return this.value
        },
        set(v){
            this.$emit('input', v)
        }
    },
  },
};
</script>

<style>
/* 赠送用户整体高度 */
#personalAssets .el-dialog{
    height: 600px;
}
/* 赠送用户信息 */
#personalAssets .UserInformationContent{
    width: 280px;
}
/* 赠送用户信息头像 */
#personalAssets .UserInformationPortrait{
    width: 79px;
    height: 79px;
    border: solid 1px #4c4c4c;
    background-color: #373739;
    margin-left: 100px;
}
/* 赠送用户信息名字 */
#personalAssets .UserInformationName{
    text-align: center;
    margin-top: 14px;
    font-family: SourceHanSansCN-Regular;
	font-size: 16px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 18px;
	letter-spacing: 0px;
	color: #ffffff;
}
/* 赠送用户信息地址、生日、邮箱 */
#personalAssets .UserInformationDetails font{
    display: block;
    margin-bottom: 19px;
    font-family: SourceHanSansCN-Regular;
	font-size: 16px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 0px;
	color: #8d8c8d;
    margin-left: 10px;
}
#personalAssets .UserInformationDetails font:first-child{
    margin-top: 40px;
}
#personalAssets .UserInformationReceivables{
    margin-top: 30px;
}
/* 赠送用户的收款二维码-整体样式 */
#personalAssets .UserInformationReceivables .el-tabs {
    width: 260px;
    margin-left: 10px;
}
/* 滑动框的线条长度 */
#personalAssets .el-tabs__nav-wrap.is-top{
    width: 260px;
}
/* 赠送用户的收款二维码-选项文字调整 */
#personalAssets .UserInformationReceivables .el-tabs__nav{
    margin-left: 35px;
}
/* 赠送用户的收款二维码-滚动指示条的高度 */
#personalAssets .UserInformationReceivables .el-tabs__nav-wrap::after{
    height: 1px;
    background-color: #4c4c4c;
}
/* 赠送用户的收款二维码-滚动指示条的宽度和颜色 */
#personalAssets .UserInformationReceivables .el-tabs__active-bar{
    width: 30px !important;
    left: 11%;
    background-color:  #7800ff;
    height: 2px;
}
/* 赠送用户的收款二维码-整体内容的高度 */
#personalAssets .UserInformationReceivables .el-tab-pane{
    height: 185px;
    margin-top: 25px;
}
/* 赠送用户的收款二维码-字体的设置 */
#personalAssets .UserInformationReceivables .el-tabs__item{
    color: #8d8c8d;
    font-family: SourceHanSansCN-Regular;
	font-size: 14px;
}
#personalAssets .UserInformationReceivables .el-tabs__item:hover {
    cursor: pointer;
    font-family: SourceHanSansCN-Regular;
	font-size: 14px;
	color: #ffffff;
}
#personalAssets .UserInformationReceivables .el-tabs__item.is-active {
	color: #ffffff;
}
/* 赠送用户的收款二维码-二维码图片 */
#personalAssets .UserInformationReceivables .UserInformationPaymentCode{
    height: 160px;
    width: 160px;
    margin: auto;
    background-color: rgb(84, 87, 84);
    text-align: center;
    line-height: 160px;
    color: #ffffff;
}
#personalAssets .UserInformationReceivables img{
        height: 160px;
    width: 160px;
}
</style>

