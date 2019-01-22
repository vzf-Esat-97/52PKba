<template>
<div class="confirmation">
    <el-button type="text" @click="dialogVisibleconfirmation = true">点击打开 Dialog</el-button>
    <el-dialog :visible.sync="dialogVisibleconfirmation" width="380px">
        <div class="rr_title">本场比赛报名费为<span>20PX币</span>，是否报名参赛？</div>
        <div class="rr_btn" @click="dialogVisibleconfirmation = false">确 定</div>
    </el-dialog>
</div>
    
</template>
<script>
export default {
    data() {
      return {
        dialogVisibleconfirmation: false
      };
    },
}
</script>
<style>
.el-dialog{
    height: 190px;
    background: #121212;
}
.el-dialog__header{
    padding: 0;
}
.el-dialog__body{
    height: 190px;
    padding: 64px 20px 32px 20px;
    text-align: center;
}
.rr_title{
    height: 14px;
    margin-bottom: 40px;
    line-height: 14px;
    font-size: 14px;
	color: #8d8c8d;
}
.rr_title span{
    color: #ffffff;
}
.rr_btn{
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