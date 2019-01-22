<template>
  <!-- 个人资产 -->
  <div id="personalAssets">
    <!-- 注余额=yue -->
    <div v-show="isNomoney">
      <font class="yue">余额：<small>{{balance}}PK币</small></font>
      <div class="personalAssets-btn">
        <button @click="Presented">赠送</button>
      </div>
      <font class="assetsDetail ">资产明细</font>
      <div class="assetsDetailListS">
        <ul>
          <!-- <li v-for="(record,idx) in records" :key="idx">
                        <div class="assetsDetailList">
                            <div class="topUpMoney">
                                <font>{{record.amount}}</font>
                            </div>
                            <div class="topUpTime">
                                <font>{{record.ct | formatDate}}</font>
                            </div>
                        </div>
                    </li> -->
          <!-- 赠送用户信息 -->
          <li
            v-for="(record,idx) in records"
            :key="idx"
          >
            <div class="assetsDetailList">
              <div class="topUpMoney">
                <font class="topUpMoneyPhone">{{record.typeDescription}}</font>
                <font>{{record.amount}}</font>
              </div>
              <div class="topUpTime">
                <font>{{record.ct | formatDate}}</font>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 赠送 -->
      <div class="onePresenter">
        <el-dialog
          :visible.sync="dialogVisibleOnePresenter"
          width="333px"
        >
          <div class="onePresenter-box">
            <span>赠送账号：</span>
            <input
              type="text"
              v-model="phone"
            >
          </div>
          <div class="onePresenter-box">
            <span>赠送PK数量：</span>
            <input
              type="text"
              style="width:120px"
              v-model="amount"
            >
            <span>个</span>
          </div>
          <div
            class="onePresenter-btn"
            @click="giveConfirmation"
          >
            确认赠送
          </div>
        </el-dialog>
      </div>
      <!-- 赠送——二次 -->
      <div class="towPresenter">
        <el-dialog
          :visible.sync="dialogVisibleTwoPresenter"
          width="260px"
        >
          <div>确认赠送？</div>
          <div
            class="towPresenter-btn"
            @click="giveAway"
          >确 定</div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>

import PersonalAssetsTopUp from '@/components/PersonAssets/PersonalAssetsTopUp' //充值弹框
import { formatDate } from '../../common/date.js';
export default {
  name: 'PersonalAssets',
  props: {
    balance: Number,//
    records: Array,//
    moneyMath: Number//
  },
  components: {
    PersonalAssetsTopUp
  },
  data() {
    return {
      isNomoney: true,
      dialogVisibleOnePresenter: false,
      dialogVisibleTwoPresenter: false,
      amount: 0,//赠送数量
      phone: "",//赠送玩家账号
      getUserINformation: '',//获取的个人信息
    }
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  computed: {
    // moneyMath() {
    //     console.log(123)
    //     return this.$store.state.other.moneyMath
    // }
  },
  watch: {
  },
  mounted() {
    this.refresh()
  },
  methods: {
    refresh() {
    },
    dialogVisiblemoney() {
      this.$store.commit('other/tittleName', '充值')
      this.isNomoney = !this.isNomoney
    },
    Presented() {
      this.dialogVisibleOnePresenter = !this.dialogVisibleOnePresenter
    },
    giveConfirmation() {
      this.dialogVisibleTwoPresenter = !this.dialogVisibleTwoPresenter
    },
    // 赠送
    giveAway() {
      const url = `/api/Wallet/Give`
      const data = { phone: this.phone, amount: this.amount }
      this.$post(url, data).then((res) => {
        if (res.code === 0) {
          this.dialogVisibleTwoPresenter = false
          this.dialogVisibleOnePresenter = false
          this.$emit('onGiveSuc')
        } else {
          his.$message({ type: 'warning', message: res.msg })
          this.dialogVisibleTwoPresenter = false
          console.log(res.msg)
        }
      })
    }

  }
}
</script>

<style>
/* 个人资产样式 */
.v-modal {
  display: none;
}
/* 弹框样式 */

#personalAssets .yue {
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 0px;
  color: #fefefe;
}
/* 余额 */
#personalAssets .yue {
  font-size: 18px;
  line-height: 15px;
  letter-spacing: 0px;
  color: #ffffff;
  margin-left: 10px;
}
#personalAssets .yue small {
  font-weight: 600;
  font-size: 18px;
}
.personalAssets-btn {
  display: inline-block;
  float: right;
  margin-right: 10px;
  cursor: pointer;
}
.personalAssets-btn button {
  width: 80px;
  height: 26px;
  background-color: #7800ff;
  font-size: 14px;
  line-height: 26px;
  text-align: center;
  color: #fefefe;
  border: none;
}
#personalAssets .assetsDetail {
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 15px;
  letter-spacing: 0px;
  color: #8d8c8d;
  margin-left: 10px;
  margin-top: 15px;
  display: block;
}
/* 列表整体大小 */
#personalAssets .assetsDetailListS {
  height: 216px;
  width: 336px;
  margin-left: 10px;
  margin-top: 8px;
  overflow-x: hidden;
  overflow-y: auto;
}
.assetsDetailListS::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}
#personalAssets .assetsDetailListS ul {
  list-style: none;
}
/* 列表每项大小 */

#personalAssets .assetsDetailListS ul li {
  width: 336px;
  height: 36px;
  line-height: 36px;
  border: 1px solid transparent;
  /* user-select:none; */
}

/* #personalAssets .assetsDetailList {
  width: 320px;
  height: 36px;
  line-height: 36px;
} */
/* 单击其中一条效果 */
#personalAssets .assetsDetailListS li:hover {
  border: solid 1px #8d8c8d;
}
#personalAssets .assetsDetailListS li:hover font {
  color: #ffffff;
}
/* 单击其中一条效果赠送用户添加下划线 */
/* #personalAssets .assetsDetailListS li:hover .topUpMoneyPhone{
    text-decoration: underline;
} */
/* 单击其中一条效果赠送用户变成手 */
/* #personalAssets .assetsDetailList .topUpMoneyPhone{
    cursor: pointer;
} */
/* 列表项充值金额和时间样式 */
#personalAssets .assetsDetailList .topUpMoney {
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 15px;
  letter-spacing: 0px;
  color: #8d8c8d;
  text-align: left;
  display: inline-block;
  width: 210px;
  padding-left: 10px;
}
#personalAssets .assetsDetailList .topUpTime {
  font-family: SourceHanSansCN-Regular;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 15px;
  letter-spacing: 0px;
  color: #8d8c8d;
  text-align: right;
  display: inline-block;
  width: 120px;
  margin-left: -10px;
}
/* 列表单双行样式 */
#personalAssets .assetsDetailListS li:nth-child(odd) {
  background-color: #333333;
}

#personalAssets .assetsDetailListS li:nth-child(even) {
  background-color: #1e1e1e;
}
/* 充值按钮样式 */
#personalAssets .topUp button {
  width: 320px;
  height: 36px;
  background-color: #7800ff;
  display: block;
  border: none;
  color: #ffffff;
  font-size: 16px;
  margin-left: 10px;
  margin-top: 32px;
}
/*赠送一*/
.onePresenter .el-dialog {
  height: 255px !important;
  margin-top: 29vh !important;
  border: solid 1px #4c4c4c;
}
.onePresenter .el-dialog__body {
  height: 223px !important;
}
.onePresenter-box {
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #8d8c8d;
  margin-bottom: 20px;
}
.onePresenter-box input {
  height: 36px;
  width: 180px;
  padding-left: 13px;
  background-color: #373739;
  border: solid 1px #4c4c4c;
  font-size: 16px;
  color: #ffffff;
}
.onePresenter-btn {
  display: inline-block;
  text-align: center;
  height: 40px;
  width: 253px;
  margin-top: 10px;
  margin-left: 22px;
  font-size: 16px;
  background-color: #7800ff;
  line-height: 40px;
  color: #fefefe;
  cursor: pointer;
}
.towPresenter .el-dialog {
  margin-top: 35vh !important;
  height: 153px !important;
  border: solid 1px #4c4c4c;
}
.towPresenter .el-dialog__body {
  height: 127px !important;
  color: #fefefe;
  text-align: center !important;
  font-size: 16px;
}
.towPresenter-btn {
  display: inline-block;
  height: 40px;
  width: 180px;
  background-color: #7800ff;
  margin-top: 18px;
  line-height: 40px;
  cursor: pointer;
}
</style>
