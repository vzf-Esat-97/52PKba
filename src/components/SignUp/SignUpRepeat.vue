<template>
    <!-- 报名重复 -->
    <div id="signUpRepeat">
        <el-dialog :visible.sync="dialogVisible111" width="380px">
            <font class="signUpRepeatTitle ">抱歉！您已在此时间段报名参赛！</font>
            <div class="signUpRepeat_topUp">
                <button type="submit">确认</button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'signUpRepeat',
    data () {
        return {

        }
    },
}
</script>

<style>
/* 弹框样式 */
#signUpRepeat .el-dialog__header {
  background-color: #121212;
}
/* 弹框头 */
#signUpRepeat .el-dialog__title {
  color: #8d8c8d;
  font-size: 14px;
  margin-left: 10px;
}
/* 弹框内容 */
#signUpRepeat .el-dialog__body {
  background-color: #121212;
  padding-top: 3px;
}
#signUpRepeat .el-dialog__headerbtn:hover .el-dialog__close {
  color: #909399;
}
#signUpRepeat .signUpRepeatTitle {
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 41px;
  letter-spacing: 0px;
  color: #8d8c8d;
  text-align: center;
  display: block;
}
#signUpRepeat .signUpRepeat_topUp button {
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