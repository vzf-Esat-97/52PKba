<template>
  <!-- 个人资产-充值成功 -->
  <div id="personalAssetsTopUpSuccessful">
    <el-dialog :visible.sync="dialogVisiblesuc" width="340px" top="30vh" @close="sucClose" :close-on-click-modal=false :modal=false>
      <font class="topUpSuccessfully ">充值成功</font>
      <div class="topUpImmediately">
        <button type="submit" @click="sucClose">确定</button>
        <!-- <button @click="giveUp">放弃充值</button> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'personalAssetsTopUpSuccessful',
  props: {
    Value: Boolean
  },
  data () {
    return {

    }
  },
  computed: {
    dialogVisiblesuc: {
      get () {
        return this.Value
      }, set (v) {
        this.$emit('input', v)
      }
    }
  },
  methods: {
    // 我已充值
    sucClose () {

    },
    // 放弃充值
    giveUp(){
        this.dialogVisiblesuc = false
    }
  }
}
</script>

<style>
#personalAssetsTopUpSuccessful .el-dialog {
  height: 153px;
}
#personalAssetsTopUpSuccessful .el-dialog__body {
  height: 150px;
  padding: 0;
}
#personalAssetsTopUpSuccessful .el-dialog__headerbtn {
  top: 6px;
  right: 10px;
}
/* 弹框样式 */
#personalAssetsTopUpSuccessful .el-dialog__header {
  background-color: #121212;
}
/* 弹框头 */
#personalAssetsTopUpSuccessful .el-dialog__title {
  color: #8d8c8d;
  font-size: 14px;
  margin-left: 0px;
}
/* 弹框内容 */
#personalAssetsTopUpSuccessful .el-dialog__body {
  background-color: #121212;
  padding-top: 3px;
}
#personalAssetsTopUpSuccessful .el-dialog__headerbtn:hover .el-dialog__close {
  color: #909399;
}
#personalAssetsTopUpSuccessful .topUpSuccessfully {
  font-family: SourceHanSansCN-Regular;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 15px;
  letter-spacing: 0px;
  color: #fefefe;
  display: block;
  text-align: center;
}
#personalAssetsTopUpSuccessful .topUpImmediately{
    width: 330px;
    margin: auto;
    display: flex;
    justify-content: space-between;
}
#personalAssetsTopUpSuccessful .topUpImmediately button {
  width: 150px;
  height: 40px;
  background-color: #7800ff;
  display: block;
  border: none;
  color: #ffffff;
  font-size: 16px;
  margin: 0 auto;
  margin-top: 24px;
  outline: none;
}
</style>