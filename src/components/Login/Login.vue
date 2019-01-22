<template>
  <!-- 登录页右边图及左边组件 -->
  <div
    v-if="IsLoginShow"
    id="login"
  >
    <el-dialog
      :visible.sync="IsLoginShow"
      width="848px"
      top='16vh'
      @close='CloseLogin'
      :close-on-click-modal="false"
    >
      <div class="fatherIDV">
        <!-- <div onmousedown='if(win)win.titleBarMouseDown(event.screenX, event.screenY)' class="moveDiv"></div> -->
        <img
          style="width:586px;height:480px;"
          src="../../assets/images/loginImage.jpg"
        >
        <LoginSwitch />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import LoginSwitch from '@/components/Login/LoginSwitch';
export default {
  name: 'Login',
  data () {
    return {
      IsLoginShow: false
    };
  },
  components: {
    LoginSwitch
  },
  computed: {
    IsLoginShowstate () {
      return this.$store.state.other.loginState
    }
  },
  watch: {
    IsLoginShowstate (newval, oldval) {
      this.IsLoginShow = newval
    }
  },
  mounted () {
    this.styleSize();
  },
  methods: {
    styleSize () {
      // if (win) win.changeSize(800, 480);
      try { win.changeSize(1280, 830) } catch (err) { }
    },
    onTopDivMouseDown (event) {
      // if (win) win.titleBarMouseDown(event.screenX, event.screenY);
    },
    CloseLogin () {
      this.$store.commit('other/IsLoginShowState', false)
    }
  }
};
</script>
<style>
#login .el-dialog {
  height: 482px !important;
}
#login .el-dialog__body {
  padding: 0;
}
#login .el-dialog__headerbtn {
  z-index: 99;
}
</style>

<style scoped>
#login {
  width: 800px;
  height: 480px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -400px;
  margin-top: -240px;
}
#login img {
  width: 540px;
  height: 480px;
}
.fatherIDV {
  position: relative;
}
.moveDiv {
  height: 30px;
  width: 750px;
  z-index: 99;
  position: absolute;
  background-color: transparent;
}
</style>
