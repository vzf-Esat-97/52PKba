<template>
    <div class="Tosignupsuc">
        <el-dialog :visible.sync="isTosignupsuc" width="380px" top='28vh' :close-on-click-modal="false">
            <p>恭喜！报名成功</p>
            <span>请随时留意赛事信息，准时参加比赛</span>
            <div class="rr_btn" @click="isTosignupsuc=false">确 定</div>
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
        isTosignupsuc: {
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
.Tosignupsuc .el-dialog {
  height: 190px;
  background: #121212;
  border: solid 1px #4c4c4c;
}
.Tosignupsuc .el-dialog__headerbtn .el-dialog__close {
  position: absolute;
  top: -10px;
  right: -10px;
}
.Tosignupsuc .el-dialog__header {
  padding: 0;
}
.Tosignupsuc .el-dialog__body {
  height: 190px;
  padding: 20px 20px 20px 20px;
  text-align: center;
}
.Tosignupsuc .rr_title {
  height: 14px;
  margin-bottom: 40px;
  line-height: 14px;
  font-size: 14px;
  color: #8d8c8d;
}
.Tosignupsuc .rr_btn {
  width: 320px;
  height: 40px;
  background-color: #7800ff;
  margin: auto;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  color: #fefefe;
  cursor: pointer;
  margin-top: 20px;
}
.Tosignupsuc p {
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  color: #ffffff;
  padding-top: 25px;
}
.Tosignupsuc span {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  color: #8d8c8d;
}
</style>