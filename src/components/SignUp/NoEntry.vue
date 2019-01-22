<template>
    <!-- 未参赛 -->
    <div id="noEntry">
        <el-dialog :visible.sync="dialogVisible111" width="380px">
            <font class="noEntryWarning ">抱歉！您未及时参赛</font>
            <font class="noEntryTitle ">抱歉！您未在规定的时间内进入房间进行比赛</font>
            <div class="noEntry_topUp">
                <button type="submit">确认</button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'noEntry',
    data () {
        return {

        }
    },
}
</script>

<style>
/* 弹框样式 */
#noEntry .el-dialog__header {
  background-color: #121212;
}
/* 弹框头 */
#noEntry .el-dialog__title {
  color: #8d8c8d;
  font-size: 14px;
  margin-left: 10px;
}
/* 弹框内容 */
#noEntry .el-dialog__body {
  background-color: #121212;
  padding-top: 3px;
}
#noEntry .el-dialog__headerbtn:hover .el-dialog__close{
    color: #909399;
}

#noEntry .noEntryWarning {
  font-family: SourceHanSansCN-Regular;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 15px;
  letter-spacing: 0px;
  color: #ffffff;
  text-align: center;
  display: block;
}
#noEntry .noEntryTitle {
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 41px;
  letter-spacing: 0px;
  color: #8d8c8d;
  text-align: center;
  margin-top: 32px;
   display: block;
}
#noEntry .noEntry_topUp button {
  width: 320px;
  height: 40px;
  background-color: #7800ff;
  display: block;
  border: none;
  color: #ffffff;
  font-size: 16px;
  margin: 0 auto;
  margin-top: 39px;
  outline: none;
}
</style>
