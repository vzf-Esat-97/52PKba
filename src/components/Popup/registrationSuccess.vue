<template>
    <div id="registrationSuccess">
        <el-dialog :visible.sync="dialogVisibleSuccess" width="380px" :close-on-click-modal=false @close="applysuccess()">
            <div class="rs_title">恭喜！报名成功</div>
            <!-- <div class="rs_cont">
            <p>请您于 <span>2018/05/28 19:00</span> 之前</p>
            <p>进入房间名 <span>房间名称——124</span> 进行比赛</p>
        </div> -->
            <div class="rs_btn" @click="applysuccess()">确 定</div>
        </el-dialog>
    </div>

</template>
<script>
export default {
    props: {
        dialogVisibleSuccess: Boolean
    },
    data() {
        return {

        };
    },
    methods: {
        applysuccess(i) {
            this.dialogVisibleSuccess = false
            this.$emit('applySuccess', false)
        }
    }
}
</script>
<style>
#registrationSuccess .el-dialog__wrapper .el-dialog {
  background-color: #121212;
  height: 180px;
}
#registrationSuccess .el-dialog__header {
  padding: 0;
}
#registrationSuccess .el-dialog__body {
  height: 248px;
  padding: 47px 20px 32px 20px;
  text-align: center;
}
.rs_title {
  height: 18px;
  margin-bottom: 33px;
  line-height: 18px;
  font-size: 18px;
  color: #ffffff;
}
.rs_cont {
  margin-bottom: 39px;
}
.rs_cont p {
  margin: 0px;
  padding: 0px;
  font-size: 14px;
  color: #8d8c8d;
}
.rs_cont span {
  font-size: 14px;
  color: #ffffff;
}
.rs_btn {
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
