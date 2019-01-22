<template>
    <div class="ExchangSuc">
        <el-dialog :visible.sync="isTosignupsuc" width="380px" top='28vh' :close-on-click-modal="false">
            <p>您的兑换订单已成功提交！请注意查收！</p>
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
.ExchangSuc .el-dialog {
  height: 173px;
  background: #121212;
  border: solid 1px #4c4c4c;
}
.ExchangSuc .el-dialog__headerbtn .el-dialog__close {
  position: absolute;
  top: -10px;
  right: -10px;
}
.ExchangSuc .el-dialog__header {
  padding: 0;
}
.ExchangSuc .el-dialog__body {
  height: 173px;
  padding: 20px 20px 20px 20px;
  text-align: center;
}
.ExchangSuc .rr_title {
  height: 14px;
  margin-bottom: 40px;
  line-height: 14px;
  font-size: 14px;
  color: #8d8c8d;
}
.ExchangSuc .rr_btn {
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
.ExchangSuc p {
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  color: #ffffff;
  padding-top: 25px;
  text-align: center;
}
</style>