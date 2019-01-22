<template>
    <div class="ExchangeState">
        <el-dialog :visible.sync="isTosignupsuc" width="260px" top='28vh' :close-on-click-modal="false">
            <p>{{callBackMeg}}</p>
            <div class="rr_btn" @click="isTosignupsuc=false">确 定</div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    props: {
        value: Boolean,
        callBackMeg:String
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
.ExchangeState .el-dialog {
  height: 153px;
  background: #121212;
  border: solid 1px #4c4c4c;
}
.ExchangeState .el-dialog__headerbtn .el-dialog__close {
  position: absolute;
  top: -10px;
  right: -10px;
}
.ExchangeState .el-dialog__header {
  padding: 0;
}
.ExchangeState .el-dialog__body {
  height: 153px;
  padding: 20px 20px 20px 20px;
  text-align: center;
}
.ExchangeState .rr_title {
  height: 14px;
  margin-bottom: 40px;
  line-height: 14px;
  font-size: 14px;
  color: #8d8c8d;
}
.ExchangeState .rr_btn {
  width: 180px;
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
.ExchangeState p {
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  color: #ffffff;
  padding-top: 25px;
  text-align: center;
}
</style>