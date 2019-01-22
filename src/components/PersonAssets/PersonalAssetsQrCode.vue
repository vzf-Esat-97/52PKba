<template>
    <!-- 个人资产充值二维码 -->
    <div >
        <!-- <el-dialog :visible.sync="dialogVisibleMoney" width="380px"> -->
            <div class="topUpTitle">
                <font>充值：<small>{{moneyMath}}元</small></font>
            </div>
            <div class="topUpQrCode">
                <font>我是一个二维码</font>
            </div>
            <div class="topUp_tixing">
                <font v-if="payment==1">请使用微信扫描二维码</font>
                <font v-else>请使用支付宝扫描二维码</font>
            </div>
            <div class="topUpAgain">
                <font>二维码已过期，请<b @click="testClick()">&nbsp;刷新</b></font>
            </div>
        <!-- </el-dialog> -->
    </div>
</template>

<script>
export default {
    name: 'PersonalAssetsQrCode',
    props:{
        // dialogVisibleMoney:Boolean
    },
    data () {
        return {
            moneyMath: this.$store.state.other.moneyMath,
            payment:this.$store.state.other.payment
        }
    },
    computed:{
        
    },
    mounted(){
    },
    methods:{
        testClick(){
            this.$store.commit('other/payment',0)
            this.$store.commit('other/moneyMath', 0)
            if(this.$store.state.other.Rechargesuccessfullyreturned==0){
                this.$store.commit('other/Rechargesuccessfullyreturned',1)
            }else if(this.$store.state.other.Rechargesuccessfullyreturned==1){
                this.$store.commit('other/Rechargesuccessfullyreturned',0)
            }
        }
    }
}
</script>

<style>
#personalAssets .topUpTitle {
  width: 160px;
  margin: 0 auto;
  text-align: center;
  font-family: SourceHanSansCN-Regular;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 15px;
  letter-spacing: 0px;
  color: #ffffff;
}
#personalAssets .topUpQrCode{
    width: 160px;
    height: 160px;
    margin: 0 auto;
    background-color: pink;
    text-align: center;
    line-height: 160px;
    margin-top: 16px;
}
#personalAssets .topUp_tixing{
     text-align: center;
     margin-top: 16px;
}
#personalAssets .topUpAgain{
     text-align: center;
     margin-top: 13px;
}
#personalAssets .topUpAgain b{
     color: #ffffff;
  padding-bottom: 3px;
  border-bottom: 1px solid #ffffff;
  cursor: pointer;
  font-weight: normal;
}
</style>
