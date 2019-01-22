<template>
<div class="noEntry">
    <el-button type="text" @click="dialogVisibleEntry = true">点击打开 Dialog</el-button>
    <el-dialog :visible.sync="dialogVisibleEntry" width="380px">
        <div class="ne_title">抱歉！您未及时参赛</div>
        <div class="ne_cont">抱歉！您未在规定的时间内进入房间进行比赛</div>
        <div class="ne_btn" @click="dialogVisibleEntry = false">确 定</div>
    </el-dialog>
</div>
    
</template>
<script>
export default {
    data() {
      return {
        dialogVisibleEntry: false
      };
    },
}
</script>
<style>
.el-dialog{
    height: 222px;
    background: #121212;
}
.el-dialog__header{
    padding: 0;
}
.el-dialog__body{
    height: 222px;
    padding: 47px 20px 32px 20px;
    text-align: center;
}
.ne_title{
    height: 18px;
    margin-bottom: 32px;
    line-height: 18px;
    font-size: 18px;
	color: #ffffff;
}
.ne_cont{
    height: 14px;
    margin-bottom: 39px;
    line-height: 14px;
    font-size: 14px;
	color: #8d8c8d;
}
.ne_btn{
    width: 320px;
	height: 40px;
	background-color: #7800ff;
    margin: auto;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
	color: #fefefe;
    cursor: pointer;
}
</style>