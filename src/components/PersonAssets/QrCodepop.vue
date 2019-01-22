<template>
  <!-- 个人资产充值二维码 -->
  <div id="QrCodepop">
    <el-dialog :visible.sync="dialogVisibleQrCode" :modal=true top="32vh" width="240px">
      <div class="topUpTitle">
        <font>充值：<small>{{MoenyData.acount}}元</small></font>
      </div>
      <div class="topUpQrCode">
        <!-- <font>我是一个二维码</font> -->
        <img :src="MoenyData.payQRCodeImgUrl" alt="">
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'QrCodepop',
  props: {
    Value: Boolean,
    MoenyData: Object
  },
  data () {
    return {
      moneyMath: 0
    }
  },
  computed: {
    dialogVisibleQrCode: {
      get () {
        return this.Value
      }, set (v) {
        this.$emit('input', v)
      }
    }
  },
  mounted () {
  },
  methods: {
    testClick () {
    }
  }
}
</script>

<style>
#QrCodepop .el-dialog {
  height: 240px !important;
}
#QrCodepop .el-dialog__body {
  background-color: #121212;
  padding: 0px;
  height: 200px !important;
}
#QrCodepop .el-dialog__headerbtn {
  top: 5px;
  right: 10px;
}
</style>
<style lang="less" scoped>
#QrCodepop {
  .topUpTitle {
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
  .topUpQrCode {
    width: 160px;
    height: 160px;
    margin: 0 auto;
    background-color: white;
    text-align: center;
    line-height: 160px;
    margin-top: 16px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

