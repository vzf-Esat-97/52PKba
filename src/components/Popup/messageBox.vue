<template>
  <div id="message-box">
    <el-dialog :visible.sync="isShow" width="580px" :close-on-click-modal=false @close="closemsgpop(1)">
      <div class="mb_title">消息中心</div>
      <div class="mb_cont">
        <div class="mbc_left">
          <div @click="chioce(sysMsg,idx)" class="mbc_list" :class="{active:isActive===idx}" v-for="(sysMsg,idx) in $store.state.base.sysMsgs" :key="idx">
            <div class="mbc_head">{{sysMsg.title}}</div>
            <div class="mbc_time">{{sysMsg.time}}</div>
          </div>
        </div>
        <div class="mbc_right">
          <div v-if="selectedSysMsg" class="mbc_box">
            <div class="mbc_text1">{{selectedSysMsg.title}}</div>
            <div class="mbc_text2">{{selectedSysMsg.sendTime | formatDate}}</div>
            <!-- 这个是对方用户姓名 -->
            <div class="mbc_text3" @click="userInformatin(selectedSysMsg.sender)">{{selectedSysMsg.content}}</div>
            <div v-if="selectedSysMsg.type===3 && selectedSysMsg.ops && selectedSysMsg.state===3" class="mbc_text4">
              <!-- <div class="mbc_btn1 mbc_font">拒绝</div> -->
              <div class="mbc_btn1 mbc_font">已处理</div>
            </div>
            <div v-else-if="selectedSysMsg.type===3 && selectedSysMsg.ops" class="mbc_text4">
              <div class="mbc_btn2 mbc_font" v-for="(op,idx) in selectedSysMsg.ops" :key="idx" @click="handle(op)">{{op.title}}</div>
            </div>
          </div>
          <p v-else>暂时没有新消息</p>
        </div>
      </div>
    </el-dialog>
    <PersonalInformationDisplay v-model="PersonalInformationShow" :getUserINformation="getUserINformation" />
  </div>

</template>
<script>
import { formatDate } from '../../common/date.js';
import PersonalInformationDisplay from '@/components/Popup/PersonalInformationDisplay' //用户详细信息
export default {
  name: 'MessageBox',
  components: {
    PersonalInformationDisplay
  },
  props: {
    value: Boolean
  },
  data () {
    return {
      selectedSysMsg: {},
      PersonalInformationShow: false, //弹出赠送等用户信息
      activeName11: 'first',//赠送用户二维码切换默认激活
      senderID: '',//赠送用户ID
      getUserINformation: undefined,//传递的信息
      isActive: 0
    };
  },
  filters: {
    formatDate (time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  computed: {
    isShow: {
      get () {
        return this.value
      },
      set (v) {
        this.$emit('input', v)
      }
    },
    firstSysMsg () {
      if (this.$store.state.base.sysMsgs && this.$store.state.base.sysMsgs.length > 0)
        return this.$store.state.base.sysMsgs[0]
      return undefined
    }
  },
  watch: {
    isShow () {
      this.chioce()
      this.isActive = 0
      console.log(this.isActive)
    }
  },
  mounted () {
    console.log(this.isActive)
  },
  methods: {
    closemsgpop () {
      this.$emit('msgboxpopis', false)
    },
    // 选择信息
    chioce (sysMsg, idx) {
      if (!sysMsg) sysMsg = this.firstSysMsg
      this.selectedSysMsg = sysMsg
      this.isActive = idx
      if (this.selectedSysMsg.state === 1) {
        const url = `/api/Sys/ReadMsg/${sysMsg.id}/`
        this.$put(url).then((res) => {
          if (res.code === 0) {
            console.log(12312323)
          } else {
          }
        })
      }
    },
    handle (op) {
      this.$put(op.url).then((res) => {
        if (res.code === 0) {
          console.log(res)
          const url = `/api/Sys/HandleMsg/${this.selectedSysMsg.id}/`
          this.$put(url).then((res) => {
            if (res.code === 0) {
              this.selectedSysMsg.state = 3
            }
          })
        }
      })
    },
    //这里写点击赠送用户手机号显示的信息
    userInformatin (senderID) {
      // 赠送用户ID
      this.senderID = senderID
      //获取数据并传送
      const url = `/api/User/GetUserInfo/${senderID}`
      this.$fetch(url).then((res) => {
        if (res.code == 0) {
          this.getUserINformation = res.data
          //弹窗的切换
          this.PersonalInformationShow = true
        } else {
          console.log(res)
        }
      })
    },
  }
}
</script>
<style>
#message-box .el-dialog {
  height: 331px;
  background: #121212;
}
#message-box .el-dialog__header {
  padding: 0;
}
#message-box .el-dialog__body {
  height: 153px;
  padding: 25px 30px 24px 30px;
}
#message-box .mb_title {
  height: 13px;
  margin-bottom: 13px;
  font-size: 14px;
  line-height: 16px;
  color: #8d8c8d;
  text-align: left;
}
#message-box .mb_cont {
  height: 256px;
  display: flex;
  justify-content: space-between;
}
#message-box .mbc_left {
  width: 176px;
  height: 256px;
  border-right: solid #373739 1px;
  overflow: auto;
}
.mbc_left::-webkit-scrollbar {
  display: none;
}
#message-box .mbc_list {
  width: 160px;
  height: 32px;
  padding-left: 12px;
  padding-right: 9px;
  background-color: #121212;
  height: 32px;
  font-size: 14px;
  line-height: 32px;
  color: #8d8c8d;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}
#message-box .mbc_list:hover {
  color: #ffffff;
  background-color: #373739;
}
#message-box .active {
  color: #ffffff;
  background-color: #373739;
}
#message-box .mbc_head {
  display: inline-block;
}
#message-box .mbc_time {
  display: inline-block;
}
#message-box .mbc_right {
  width: 343px;
  height: 256px;
  margin-left: 16px;
  padding: 11px 24px 12px 24px;
  background-color: #373739;
  text-align: center;
}
#message-box .mbc_text1 {
  height: 16px;
  margin-bottom: 8px;
  font-size: 16px;
  line-height: 16px;
  color: #ffffff;
}
#message-box .mbc_text2 {
  height: 9px;
  margin-bottom: 12px;
  font-size: 9px;
  line-height: 9px;
  color: #8d8c8d;
}
#message-box .mbc_text3 {
  height: 145px;
  margin-bottom: 11px;
  font-size: 14px;
  color: #ffffff;
  text-align: left;
}
/* 移动到对方姓名时更改状态 */
#message-box .mbc_text3:hover {
  text-decoration: underline;
  cursor: pointer;
}
#message-box .mbc_text4 {
  height: 32px;
  display: flex;
  justify-content: space-between;
}
#message-box .mbc_btn1 {
  width: 120px;
  height: 32px;
  background-color: #8d8c8d;
}
#message-box .mbc_btn2 {
  width: 120px;
  height: 32px;
  background-color: #7800ff;
}
#message-box .mbc_font {
  font-size: 16px;
  line-height: 32px;
  color: #fefefe;
  cursor: pointer;
}
</style>