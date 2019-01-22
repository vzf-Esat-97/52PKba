<template>
    <!-- 报名成功 -->
    <div id="signUpSuccess">
        <el-dialog :visible.sync="dialogVisible111" width="380px">
            <font class="signUpSuccessTitle ">恭喜！报名成功</font>
            <font class="signUpSuccessTime">请您于 2018/05/28 19:00 之前 </font>
            <font class="signUpSuccessplace ">进入房间名 房间名称——124房间名称——124进行比赛</font>
            <div class="signUpSuccess_topUp">
                <button type="submit">确认</button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'signUpSuccess',
    data () {
        return {

        }
    },
}
</script>

<style>
/* 弹框样式 */
#signUpSuccess .el-dialog__header {
  background-color: #121212;
}
/* 弹框头 */
#signUpSuccess .el-dialog__title {
  color: #8d8c8d;
  font-size: 14px;
  margin-left: 10px;
}
/* 弹框内容 */
#signUpSuccess .el-dialog__body {
  background-color: #121212;
  padding-top: 3px;
}
#signUpSuccess .el-dialog__headerbtn:hover .el-dialog__close {
  color: #909399;
}
#signUpSuccess .signUpSuccessTitle {
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
#signUpSuccess .signUpSuccessTime {
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 41px;
  letter-spacing: 0px;
  color: #8d8c8d;
  text-align: center;
  margin-top: 33px;
  display: block;
}
#signUpSuccess .signUpSuccessplace {
  height: 28px;
  width: 244px;
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 14px;
  letter-spacing: 0px;
  color: #8d8c8d;
  display: block;
  margin: 0 auto;
}
#signUpSuccess .signUpSuccess_topUp button {
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