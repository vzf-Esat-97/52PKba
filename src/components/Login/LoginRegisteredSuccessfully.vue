<template>
  <!-- 注册成功提示 -->
  <div id="loginRegisteredSuccessfully">
    <el-dialog
      :visible.sync="registerandbVisiblesuc"
      width="260px"
      top="30vh"
      :modal=false
      @close="conackFnc"
      :close-on-click-modal=false
    >
      <font class="RegisteredSuccessfully ">{{registerMsg}}</font>
      <div class="LoginImmediately">
        <button
          type="submit"
          @click="getHomepage"
        >立即登录</button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'loginRegisteredSuccessfully',
  props: {
    registerandbVisiblesuc: Boolean
  },
  data () {
    return {
    }
  },
  computed: {
    registerMsg () {
      return this.$store.state.other.zhucbangdingmsg
    }
  },
  methods: {
    conackFnc () {
      this.$emit('registerandbVisiblesuc')
      console.log(123)
    },
    getHomepage () {
      this.$store.commit('other/IsLoginShowState', false)
      this.$router.push({
        path: '/',
        name: 'HomePage'
      })
      try { win.changeSize(1280, 830) } catch (error) { }
    }
  }
}
</script>

<style>
#loginRegisteredSuccessfully .RegisteredSuccessfully {
  font-family: SourceHanSansCN-Regular;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 15px;
  letter-spacing: 0px;
  color: #8d8c8b;
  text-align: center;
  width: 100%;
  display: inline-block;
  margin-bottom: 24px;
}
#loginRegisteredSuccessfully .LoginImmediately button {
  width: 180px;
  height: 40px;
  background-color: #7800ff;
  display: block;
  border: none;
  color: #ffffff;
  font-size: 16px;
  margin: auto;
  outline: none;
}
#loginRegisteredSuccessfully .el-dialog {
  height: 160px !important;
}
#loginRegisteredSuccessfully .el-dialog__body {
  height: 100px;
  padding: 0 !important;
}
</style>