<template>
<div class="notSufficientFunds">
    <el-button type="text" @click="dialogVisibleSufficientFunds = true">点击打开 Dialog</el-button>
    <el-dialog :visible.sync="dialogVisibleSufficientFunds" width="260px">
        <div class="ns_title">余额不足</div>
        <div class="ns_btn" @click="dialogVisibleSufficientFunds = false">确 定</div>
    </el-dialog>
</div>
    
</template>
<script>
export default {
    data() {
      return {
        dialogVisibleSufficientFunds: false
      };
    },
}
</script>
<style>
.el-dialog{
    height: 153px;
    background: #121212;
}
.el-dialog__header{
    padding: 0;
}
.el-dialog__body{
    height: 153px;
    padding: 49px 20px 24px 20px;
    text-align: center;
}
.ns_title{
    height: 16px;
    margin-bottom: 24px;
    line-height: 16px;
    font-size: 16px;
	color: #ffffff;
}
.ns_btn{
    width: 180px;
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