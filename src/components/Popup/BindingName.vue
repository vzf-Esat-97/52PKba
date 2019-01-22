<template>
  <div id="bindingname">
    <el-dialog :visible.sync="isShow" width="380px" :close-on-click-modal=false>
      <div class="bindingrr_title">
        <p>请验证绑定正确的绝地求生PUBG游戏角色名称：</p>
        <div class="bindingnamediv">
          <div class="pickname">昵称</div>
          <input maxlength="16" v-model="gameName" type="text" placeholder="请输入游戏昵称(注意大小写)">
        </div>
      </div>
      <div class="bindingrr_btn" @click="bindSubmit">立即绑定</div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'BindingName',
  props: {
    gameID: String,
    value: Boolean
  },
  data () {
    return {
      gameName: '',
    };
  },
  computed: {
    myGames () {
      return this.$store.state.base.myGames;
    },
    isShow: {
      get () { return this.value },
      set (v) { this.$emit('input', v) }
    }
  },
  watch: {
    myGames (newMyGames, oldMyGames) {
      let newMyGame = undefined
      let oldMyGame = undefined
      for (let i = 0; i < newMyGames.length; i++) {
        if (newMyGames[i].id === this.gameID) {
          newMyGame = newMyGames[i];
        }
      }
      for (let i = 0; i < oldMyGames.length; i++) {
        if (oldMyGames[i].id === this.gameID) {
          oldMyGame = oldMyGames[i];
        }
      }
      if (newMyGame) {
        if (oldMyGame) {
          if (newMyGame.state !== oldMyGame.state) {
            // console.log(`旧值非空:${oldMyGame.state}->新值非空:${newMyGame.state}`)
            if (newMyGame.state === 1 || newMyGame.state === 2) {
              this.$message({
                message: '待验证'
              })
            } else {
              this.$message({
                message: '绑定成功',
                type: 'success'
              })
            }
          }
        } else {
          //   console.log(`NULL->新值非空:${newMyGame.state}`)
          //   if (newMyGame.state === 3) {
          //     this.$message({
          //       message: '绑定成功2',
          //       type: 'success'
          //     })
          //   }
        }
      } else {
        //新值为空
        if (oldMyGame) {
          //旧值非空
          //   console.log(`旧值非空:${oldMyGame.state}->NULL`)
          //   console.log(newMyGames)
          //   console.log(oldMyGames)
        }
      }
    }
  },
  methods: {
    bindSubmit () {
      console.log(this.gameID)
      const url = `/api/Game/BindGame/${this.gameID}`
      const data = { playerName: this.gameName, playerID: '', account: '' }
      this.$post(url, data).then((res) => {
        if (res.code == 0) {
          this.$emit('input', false)
          this.$store.dispatch('base/updateMyGames')
          this.$message({
            message: res.msg,
            type: 'suc'
          })
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          });
        }
      })
    }
  }
}
</script>
<style>
#bindingname .el-dialog {
  height: 190px;
  background: #121212;
  border: solid 1px #4c4c4c;
}
#bindingname .el-dialog__header {
  padding: 0;
}
#bindingname .el-dialog__body {
  height: 190px;
  padding: 33px 20px 32px 20px;
  text-align: center;
}
#bindingname .el-dialog__headerbtn {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 0;
  background: 0 0;
  border: none;
  outline: 0;
  cursor: pointer;
  font-size: 16px;
}
.bindingrr_title {
  height: 65px;
  margin-bottom: 18px;
  line-height: 14px;
  font-size: 14px;
  color: #8d8c8d;
}
.bindingrr_title p {
  text-align: left;
  padding-left: 8px;
  margin-bottom: 12px;
}
.bindingnamediv {
  width: 320px;
  height: 40px;
  background-color: #373739;
  border: solid 1px #4c4c4c;
  margin: auto;
}
.pickname {
  width: 55px;
  height: 20px;
  float: left;
  line-height: 20px;
  border-right: 1px solid #8d8c8d;
  margin: 10px 0;
}
.bindingnamediv input {
  width: 263px;
  height: 35px;
  float: left;
  border: 0;
  outline: none;
  background-color: #373739;
  line-height: 38px;
  padding: 5px;
  margin-top: 3px;
  color: white;
}

.bindingrr_btn {
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