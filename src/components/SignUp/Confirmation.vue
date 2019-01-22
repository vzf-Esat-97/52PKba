<template>
            <!-- 确认报名 -->
    <div id="confirmation">
        <el-dialog :visible.sync="dialogVisible111" width="380px">
            <font class="confirmationTitle ">本场比赛报名费为<small>20PK币</small>，是否报名参赛？</font>
            <div class="confirmation_topUp">
                <button type="submit" @click="dialogVisible=false">充值</button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'Confirmation',
    data () {
        return {

        }
    },
}
</script>

<style>
/* 弹框样式 */
#confirmation .el-dialog__header {
  background-color: #121212;
}
/* 弹框头 */
#confirmation .el-dialog__title {
  color: #8d8c8d;
  font-size: 14px;
  margin-left: 10px;
}
/* 弹框内容 */
#confirmation .el-dialog__body {
  background-color: #121212;
  padding-top: 3px;
}
#confirmation .el-dialog__headerbtn:hover .el-dialog__close{
    color: #909399;
}
#confirmation .confirmationTitle {
  width: 300px;
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 41px;
  letter-spacing: 0px;
  color: #8d8c8d;
  margin: 0 auto;
  display: block;
  text-align: center;
}
#confirmation .confirmationTitle small {
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  letter-spacing: 0px;
  color: #ffffff;
}
#confirmation .confirmation_topUp button {
  width: 320px;
  height: 40px;
  background-color: #7800ff;
  display: block;
  border: none;
  color: #ffffff;
  font-size: 16px;
  margin: 0 auto;
  margin-top: 40px;
  outline: none;
}
</style>