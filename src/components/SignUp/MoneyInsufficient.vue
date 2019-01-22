<template>
    <!-- 余额不足 -->
    <div id="moneyInsufficient">
        <el-dialog :visible.sync="dialogVisible111" width="260px">
            <font class="moneyInsufficientTitle ">余额不足</font>
            <div class="moneyInsufficient_topUp">
                <button type="submit" @click="dialogVisible=false">充值</button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'moneyInsufficient',
    data () {
        return {

        }
    },
}
</script>

<style>
/* 弹框样式 */
#moneyInsufficient .el-dialog__header {
  background-color: #121212;
}
/* 弹框头 */
#moneyInsufficient .el-dialog__title {
  color: #8d8c8d;
  font-size: 14px;
  margin-left: 10px;
}
/* 弹框内容 */
#moneyInsufficient .el-dialog__body {
  background-color: #121212;
  padding-top: 3px;
}
#moneyInsufficient .el-dialog__headerbtn:hover .el-dialog__close {
  color: #909399;
}
#moneyInsufficient .moneyInsufficientTitle {
  width: 200px;
  font-family: SourceHanSansCN-Regular;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 15px;
  letter-spacing: 0px;
  color: #fefefe;
  display: block;
  text-align: center;
  margin: 0 auto;
}
#moneyInsufficient .moneyInsufficient_topUp button {
  width: 180px;
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
