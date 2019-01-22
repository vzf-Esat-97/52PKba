<template>
  <div class="EnterRoompop">
    <el-dialog :visible.sync="EnterRoompopShow" custom-class="RoompopDialog" width="380px" top='28vh' :close-on-click-modal="false">
      <p>请复制密码进入游戏比赛！祝君武运昌隆！</p>
      <ul>
        <li>
          比赛名称：<span>{{competitionName}}</span>
        </li>
        <li>
          入场时间：<span>{{enterTime|date}}</span>
        </li>
        <li>
          比赛开始时间：<span>{{startTime|date}}</span>
        </li>
        <li>
          房间名称：
          <span>{{name}}</span>
          <button :data-clipboard-text="name" class="tag-read1" @click="copy(1)">复制名称</button>
        </li>
        <li>
          房间密码：<span>{{password}}</span>
          <button :data-clipboard-text="password" class="tag-read2" @click="copy(2)">复制密码</button>
        </li>
      </ul>
      <div class="rr_btn" @click="EnterRoompopShow=false">确 定</div>
    </el-dialog>
  </div>
</template>
<script>
import Clipboard from 'clipboard';
import { formatDate } from '../../common/date.js'; // 时间格式化
export default {
  props: {
    value: Boolean,
    competitionName: String,
    name: String,
    password: String,
    enterTime: Date,
    startTime: Date
  },
  data () {
    return {
      copyBtn: null,
      RoomName: '房间名称',
      RoomPwd: '123456789'
    };
  },
  filters: {
    formatDate (time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
    }
  },
  computed: {
    EnterRoompopShow: {
      get () {
        return this.value
      },
      set (v) {
        this.$emit('input', v)
      }
    }
  },
  mounted () {
    console.log("已经弹框")
  },
  methods: {
    copy (i) {
      if (i === 1) {
        var clipboard = new Clipboard('.tag-read1')
      } else {
        var clipboard = new Clipboard('.tag-read2')
      }
      clipboard.on("success", e => {
        //success("复制成功");//这里你如果引入了elementui的提示就可以用，没有就注释即可
        this.$message({
          message: '复制成功',
          type: 'success'
        })
        // 释放内存  
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制  
        console.log('该浏览器不支持自动复制')
        // 释放内存  
        clipboard.destroy()
      })
    },
  }
}
</script>
<style>
.EnterRoompop .el-dialog {
  height: 316px !important;
  background: #121212;
  border: solid 1px #4c4c4c;
}
.EnterRoompop .el-dialog__headerbtn .el-dialog__close {
  position: absolute;
  top: -10px;
  right: -10px;
}
.EnterRoompop .el-dialog__header {
  padding: 0;
}
.EnterRoompop .el-dialog__body {
  height: 261px !important;
  padding: 24px 30px !important;
}
.EnterRoompop .rr_title {
  height: 14px;
  margin-bottom: 40px;
  line-height: 14px;
  font-size: 14px;
  color: #8d8c8d;
}
.EnterRoompop .rr_btn {
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
.EnterRoompop p {
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  width: 230px;
  margin: auto;
  color: #ffffff;
  padding-top: 14px;
  line-height: 22px;
}
.EnterRoompop span {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  color: #8d8c8d;
}
.EnterRoompop li {
  list-style: none;
  text-align: left;
  color: #8d8c8d;
  margin-bottom: 7px;
}
.EnterRoompop li span {
  color: #ffffff;
}
.EnterRoompop li button {
  width: 104px;
  height: 20px;
  background-color: #7800ff;
  border: 0;
  outline: none;
  color: #ffffff;
  float: right;
}
/* .Room-name-div{
    width: 100px;
    float: left;
} */
</style>