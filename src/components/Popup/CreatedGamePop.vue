<template>
    <div class="CreatedGamePop">
        <el-dialog :visible.sync="isCreatedGamePop" width="380px" top='28vh' :close-on-click-modal="false">
            <span>创建赛事</span>
            <div class="rr_btn" @click="isTosignupsuc=false">单赛事</div>
            <p>*晋级赛等多场比赛的赛事</p>
            <div class="rr_btn" @click="isTosignupsuc=false">多赛事</div>
            <p>*晋级赛等多场比赛的赛事</p>
        </el-dialog>
    </div>
</template>
<script>
export default {
    props: {
        value: Boolean,
    },
    data() {
        return {

        };
    },
    computed: {
        isCreatedGamePop: {
            get() {
                return this.value
            },
            set(v) {
                this.$emit('input', v)
            }
        }
    },
    methods: {
    }
}
</script>
<style>
.CreatedGamePop .el-dialog {
  height: 214px;
  background: #121212;
  border: solid 1px #4c4c4c;
}
.CreatedGamePop .el-dialog__headerbtn .el-dialog__close {
  position: absolute;
  top: -10px;
  right: -10px;
}
.CreatedGamePop .el-dialog__header {
  padding: 0;
}
.CreatedGamePop .el-dialog__body {
  height: 214px;
  padding: 20px 20px 20px 20px;
  text-align: center;
}
.CreatedGamePop .rr_title {
  height: 14px;
  margin-bottom: 40px;
  line-height: 14px;
  font-size: 14px;
  color: #8d8c8d;
}
.CreatedGamePop .rr_btn {
  width: 320px;
  height: 40px;
  background-color: #7800ff;
  margin: auto;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  color: #fefefe;
  cursor: pointer;
  margin-top: 15px;
}
.CreatedGamePop p {
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  color: #8d8c8d;
  width: 320px;
  text-align: left;
  margin: auto;
  padding-top: 5px;
}
.CreatedGamePop span {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  color: #8d8c8d;
  display: block;
  width: 320px;
  margin: auto;
  text-align: left;
}
</style>