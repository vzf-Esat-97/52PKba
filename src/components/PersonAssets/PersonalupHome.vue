<template>
  <!-- 个人资产 -->
  <div id="personalAssets">
    <el-dialog :title=tittleName :visible.sync="isShowE" @close="closeDiv" width="396px">
      <!-- 注余额=yue -->
      <div v-if="BalanceMoney">
        <div>
          <PersonalAssets :moneyMath="moenystate" :balance="balance" :records="records" @onGiveSuc="refresh" />
          <!-- <PersonalSuccessful @dialogVisiblesuc="dialogSuccolose" :dialogVisiblesuc='isdialogVisiblesuc' /> -->
        </div>
        <div class="topUp">
          <button style="outline:none;" type="submit" @click="BalanceMoney=false" class="topUpButtom">充值</button>
        </div>
      </div>
      <PersonalAssetsTopUp :balance='balance' v-else />
    </el-dialog>
  </div>
</template>

<script>

import PersonalAssets from '@/components/PersonAssets/PersonalAssets' //充值弹框组件
import PersonalAssetsTopUp from '@/components/PersonAssets/PersonalAssetsTopUp' //充值选择金额弹框组件
import PersonalAssetsQrCode from '@/components/PersonAssets/PersonalAssetsQrCode' //充值二维码弹框组件
import PersonalSuccessful from '@/components/PersonAssets/PersonalAssetsTopUpSuccessful' //充值成功组件
export default {
  name: 'PersonalupHome',
  props: {
    dialogVisibleAssets: Boolean
  },
  components: {
    PersonalAssets,
    PersonalAssetsTopUp,
    PersonalAssetsQrCode,
    PersonalSuccessful
  },
  data () {
    return {
      balance: 0,//余额
      records: [],//交易记录
      conunt: 0,
      isShowE: false,
      // dialogVisibleAssets: false,
      isPersonalAssets: 'PersonalAssets',
      tittleName: '个人资产',
      isdialogVisiblesuc: false,
      moenystate: 0, // 做个弊 临时加钱
      BalanceMoney:true
    }
  },
  computed: {
    Rechargesuccessfullyreturned () {
      return this.$store.state.other.Rechargesuccessfullyreturned
    }
  },
  watch: {
    isShowE () {
      this.refresh()
    },
    dialogVisibleAssets () {
      this.isShowE = this.dialogVisibleAssets
    },
    Rechargesuccessfullyreturned (newval, oldval) {
      this.isPersonalAssets = 'PersonalAssetsTopUp'
      //this.isdialogVisiblesuc=true
      if (newval == 0 || 1) {
        this.isdialogVisiblesuc = true
      }
    }
  },
  methods: {
    refresh () {
      const urlBalance = '/api/Wallet/Balance'
      this.$fetch(urlBalance).then((res) => {
        if (res.code === 0) {
          this.balance = res.data
        }
      })
    //   const urlRecord = '/api/Wallet/TransactionRecords'
    //   this.$fetch(urlRecord).then((res) => {
    //     if (res.code === 0) {
    //       let records = []
    //       res.data.forEach(record => {
    //         record.ct = new Date(record.ct)
    //         records.push(record)
    //       });
    //       this.records = records
    //     }
    //   })
    },
    // 接收父组件的值
    closeDiv () {
      this.$emit('dialogVisibleAssets')
      this.isPersonalAssets = 'PersonalAssets'
      this.conunt = 0
      this.tittleName = '个人资产'
    //   this.$store.commit('other/moneyMath', 0)
    //   this.$store.commit('other/payment', 0)
      this.BalanceMoney = true
    },
    //
    dialogSuccolose () {
      this.isdialogVisiblesuc = false
    }
  }
}
</script>

<style>
/* 个人资产样式 */
/* 弹框样式 */
#personalAssets .el-dialog__header {
  background-color: #121212;
}
#personalAssets .el-dialog {
  height: 400px;
}
/* 弹框头 */
#personalAssets .el-dialog__title {
  color: #8d8c8d;
  font-size: 14px;
  margin-left: 10px;
}
/* 弹框内容 */
#personalAssets .el-dialog__body {
  background-color: #121212;
  padding-top: 25px;
  height: 405px;
  text-align: left;
}
#personalAssets .topUp .topUpButtom {
  width: 336px;
  height: 36px;
  background-color: #7800ff;
  display: block;
  border: none;
  color: #ffffff;
  font-size: 16px;
  margin-left: 10px;
  margin-top: 32px;
}
</style>