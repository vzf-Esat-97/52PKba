<template>
  <!-- 个人资产-充值 -->
  <div>
    <!-- 注余额=yue2 -->
    <font class="yue2">余额：<small>{{balance}}PK币</small></font>
    <font class="TopUpAmount ">充值金额(1元=100PK币)</font>
    <div class="rechargeOption">
      <button :class="{borders:ismoney==1}" @click="changemoeney(1)">5元<img src="../../assets/images/xuanzhong.png" :class='{money:ismoney==1}'></button>
      <button :class="{borders:ismoney==2}" @click="changemoeney(2)">10元<img src="../../assets/images/xuanzhong.png" :class='{money:ismoney==2}'></button>
      <button :class="{borders:ismoney==3}" @click="changemoeney(3)">50元<img src="../../assets/images/xuanzhong.png" :class='{money:ismoney==3}'></button>
      <button :class="{borders:ismoney==4}" class="yibai" @click="changemoeney(4)">100元<img src="../../assets/images/xuanzhong.png" :class='{money:ismoney==4}'></button>
      <font @click="changemoeney(5)">其他：<input @input="inputMoney" placeholder="输入金额" v-model="customMoney" type="text">&nbsp;元</font>
    </div>
    <div class="methodPayment">
      <font class="methodPaymentTitle">支付方式：</font>
      <!-- <button :class="{borders:iswetcat==1}" @click="weicat(1)">微信 <img src="../../assets/images/xuanzhong.png" :class='{moneyType:iswetcat==1}'></button> -->
      <button :class="{borders:iswetcat==1}">支付宝<img src="../../assets/images/xuanzhong.png" :class='{moneyType:iswetcat==1}'></button>
    </div>
    <div class="topUp2">
      <button type="submit" @click="recharge()">充值</button>
    </div>
    <PersonalSuccessful v-model='isdialogVisiblesuc' />
    <QrCodepop :MoenyData='MoenyData' v-model="IsQrCodepopShow" />
  </div>
</template>

<script>
import { recharge, GetOrderNumber } from '../../http.js'
import PersonalSuccessful from '@/components/PersonAssets/PersonalAssetsTopUpSuccessful' //充值成功组件
import QrCodepop from '@/components/PersonAssets/QrCodepop' //二维码弹框
export default {
  name: 'personalAssets',
  components: {
    PersonalSuccessful,
    QrCodepop
  },
  props: {
    balance: Number
  },
  data () {
    return {
      ismoney: 1,
      iswetcat: 1,
      customMoney: '',
      selectMoney: 5,
      htmls: '',
      isdialogVisiblesuc: false,
      IsQrCodepopShow: false,
      MoenyData: {}
    }
  },
  methods: {
    // 充值金额切换
    changemoeney (i) {
      this.ismoney = i
      console.log(this.ismoney)
      switch (i) {
        case 1:
          this.selectMoney = 5
          //   this.$store.commit('other/moneyMath', 5)
          break;
        case 2:
          this.selectMoney = 10
          //   this.$store.commit('other/moneyMath', 10)
          break;
        case 3:
          this.selectMoney = 50
          //   this.$store.commit('other/moneyMath', 50)
          break;
        case 4:
          this.selectMoney = 100
          //   this.$store.commit('other/moneyMath', 100)
          break;
        case 5:
          //   this.$store.commit('other/moneyMath', this.customMoney)
          break;
      }
    },
    // 支付方式切换
    // weicat(i) {
    //     this.iswetcat = i
    //     this.$store.commit('payment',i)
    // },
    // 自由输入金额
    inputMoney () {
      this.selectMoney = this.customMoney
    },

    // 确认充值
    recharge () {
      const returnUrl = 'http://localhost:8080/#/HomePage/Lobby'
      recharge(1, this.selectMoney, returnUrl).then(res => {
        this.MoenyData.acount = this.selectMoney
        if (res.code === 0) {
          this.MoenyData.payQRCodeImgUrl = res.data.payQRCodeImgUrl
          this.MoenyData.num = res.data.num
          this.IsQrCodepopShow = true
          var times = 300
          let settimes = setInterval(() => {
            times--
            GetOrderNumber(this.MoenyData.num).then(res => {
              if (times !== 0) {
                if (res.data.code === 0) {
                  if (res.data.data.state !== 1) {
                    clearInterval(settimes)
                    this.$message({
                      message: '支付成功！',
                      type: 'success'
                    })
                    this.IsQrCodepopShow = false
                  }
                }
              } else {
                clearInterval(settimes)
              }
            })
          }, 1000)
        }
      })
    }
  }
}
</script>

<style>
/* 充值金额选择 */
/* 弹框样式 */
/* 余额 */
#personalAssets .yue2 {
  font-family: SourceHanSansCN-Regular;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 15px;
  letter-spacing: 0px;
  color: #ffffff;
  margin-left: 10px;
  margin-top: 15px;
  display: block;
}
#personalAssets .yue2 small {
  font-size: 18px;
}
#personalAssets .TopUpAmount {
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 15px;
  letter-spacing: 0px;
  color: #8d8c8d;
  margin-left: 10px;
  margin-top: 15px;
  margin-bottom: 12px;
  display: block;
}
/* 充值按钮样式 */
#personalAssets .topUp2 button {
  width: 320px;
  height: 36px;
  background-color: #7800ff;
  display: block;
  border: none;
  color: #ffffff;
  font-size: 16px;
  margin-left: 10px;
  margin-top: 32px;
  outline: none;
}

/* 充值金额选择样式 */
#personalAssets .el-dialog__body .rechargeOption {
  width: 355px;
  margin-left: 10px;
}
/* 充值金额样式按钮 */
#personalAssets .el-dialog__body .rechargeOption button {
  width: 80px;
  height: 36px;
  background-color: #333333;
  border: 1px solid #333333;
  color: #8d8c8d;
  outline: none;
  position: relative;
  margin-right: 35px;
}
#personalAssets .el-dialog__body .rechargeOption button:focus {
  border: 1px solid #ffffff;
}
/* 支付方式样式按钮 */
#personalAssets .el-dialog__body .methodPayment button {
  width: 80px;
  height: 36px;
  background-color: #333333;
  border: 1px solid #333333;
  color: #8d8c8d;
  outline: none;
  position: relative;
  margin-right: 23px;
  margin-top: 13px;
  margin-left: 10px;
}
#personalAssets .el-dialog__body .rechargeOption .yibai {
  margin-top: 24px;
}
#personalAssets .el-dialog__body .rechargeOption input {
  width: 98px;
  height: 34px;
  background-color: #333333;
  border: 1px solid #333333;
  outline: none;
  text-indent: 0.5rem;
  color: #8d8c8d;
}
.rechargeOption img {
  position: absolute;
  top: 22px;
  left: 66px;
  display: none;
}
#personalAssets .methodPaymentTitle {
  padding-left: 10px;
  display: block;
}
#personalAssets .methodPayment {
  padding-top: 32px;
  padding-bottom: 62px;
}
.methodPayment img {
  position: absolute;
  top: 22px;
  right: -1px;
  display: none;
}
/* 充值金额切换样式 */
.money {
  display: block !important;
}
.moneyType {
  display: block !important;
}
.borders {
  border: 1px solid white !important;
}
</style>
