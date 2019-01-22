<template>
  <div class="registrationRepetition">
    <el-dialog
      :visible.sync="dialogVisibleRepetition"
      width="380px"
      top='28vh'
      :close-on-click-modal="false"
    >
      <div class="rr_title">确定退出客户端？</div>
      <div
        class="rr_btn"
        onclick="try{win.close()}catch(error){}"
      >确 定</div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    value: Boolean
  },
  data () {
    return {

    };
  },
  computed: {
    dialogVisibleRepetition: {
      get () {
        return this.value
      },
      set (v) {
        this.$emit('input', v)
      }
    }
  },
  methods: {
  }
}
</script>
<style>
.el-dialog {
  height: 190px;
  background: #121212;
}
.el-dialog__header {
  padding: 0;
}
.el-dialog__body {
  height: 190px;
  padding: 64px 20px 32px 20px;
  text-align: center;
}
.rr_title {
  height: 14px;
  margin-bottom: 40px;
  line-height: 14px;
  font-size: 14px;
  color: #8d8c8d;
}
.rr_btn {
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