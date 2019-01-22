<template>
  <div class="home-page">
    <div class="wrapper_cont">
      <!--顶部导航-->
      <header class="top_head">
        <div onmousedown='try{win.titleBarMouseDown(event.screenX,event.screenY)}catch(err){}' class="homepageMovediv"></div>
        <div class="top_logo">
          <img src="../assets/images/logo.png" alt="">
        </div>
        <div class="game_nav">
          <ul>
            <li @click="changeGame(0)" class="game-logo">
              <div class="game-logo-img">
                <img src="../assets/images/pubg.png" alt="">
              </div>
              <span>绝地求生</span>
            </li>
            <li @click="changeGame(1)">
              <div>
                <div class="game-logo-img">
                  <img src="../assets/images/920764930606134228.png" alt="">
                </div>
                <span>无限法则</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="right_div">
          <div class="msg_Headimg">
            <div class="msg_Newdiv">
              <img v-if="$store.getters['base/youHaveNewMsg']" @click="openSysMsgs()" src="../assets/images/消息通知.png" alt="">
              <img v-else @click="openSysMsgs()" src="../assets/images/消息.png" alt="">
            </div>
            <div v-if="$store.state.base.loginInfo" class="head_msgdiv">
              <img style="width:32px;height:32px;border-radius: 50%;border: solid 1px #939293" :src="$store.state.base.loginInfo.head32" alt="">
              <div class="head_slecet">
                <div @click="getmyinfoper" class='head_Name'>
                  <!-- <div class="profile_Photo">
                                        <img style="width:100%;height:100%;border-radius:50%" :src="$store.state.base.loginInfo.icon" alt="">
                                    </div> -->
                  <div class="profile_Name">
                    <!-- <el-tooltip effect="dark" placement="top-start"> -->
                    <p v-if="$store.state.base.loginInfo.nickname">
                      {{$store.state.base.loginInfo.nickname.length>12?$store.state.base.loginInfo.nickname.substring(0,10)+'...':$store.state.base.loginInfo.nickname}}
                    </p>
                    <!-- </el-tooltip> -->
                    <!-- <span>Lv.31</span> -->
                  </div>
                </div>
                <div @click="changeMyNav('CompetitionKanban')" class="my_Personmsg">
                  <div class="persoN_Img my_Personmsg1">
                  </div>
                  <span>我的比赛</span>
                </div>
                <div @click="openIAmRich()" class="my_Personmsg">
                  <div class="persoN_Img my_Personmsg2">
                  </div>
                  <span>我的资产</span>
                </div>
                <div @click="openMyFriends()" class="my_Personmsg">
                  <div class="persoN_Img my_Personmsg3">
                  </div>
                  <span>我的订单</span>
                </div>
                <div @click="logout()" class="my_Personmsg">
                  <div class="persoN_Img my_Personmsg4">
                  </div>
                  <span>切换用户</span>
                </div>
              </div>
            </div>
            <div v-else class="head_msgdiv">
              <img @click="Loginin" style="width：32px;height:32px;border-radius: 50%;border: solid 1px #939293" src="../assets/images/96598296840393604.jpg" alt="">
            </div>
          </div>
          <div class="close_Samll">
            <img onclick="try{win.min()}catch(err){}" class="shrinkImg" src="../assets/images/缩小.png" alt="">
            <img onclick="askClose()" class="closeImg" src="../assets/images/关闭.png" alt="">
          </div>
        </div>
      </header>

      <!-- 下面内容 -->
      <div class="Homeage_cont">
        <!--左下侧导航-->
        <div id="nav_headerid" class="nav_header">
          <div v-if="!$store.state.base.token">
            <el-tooltip effect="dark" content="大厅" placement="right" :hide-after=2000 popper-class="darkStyle">
              <div class="nav_div nav_divimg1">
                <div @click="changeNav('Lobby')" :class="{classStyle1:$route.name==='Lobby'}" id="wrapper_conts">
                </div>
              </div>
            </el-tooltip>
          </div>
          <div v-else>
            <el-tooltip v-for="(item,idx) in MyNavigation" effect="dark" :content="item.name" placement="right" :key="idx">
              <div @click="changeNav(idx,item.routeName)" :class="item.className">
                <div :class="$route.name===item.routeName?item.selectedClassName:0">
                </div>
              </div>
            </el-tooltip>
            <!-- <el-tooltip effect="dark" content="赛事" placement="right">
              <div @click="changeNav('CompetitionKanban')" :class="{classStyle3:$route.name==='CompetitionKanban'}" class="nav_div nav_divimg3">
              </div>
            </el-tooltip>
            <el-tooltip effect="dark" content="排行榜" placement="right">
              <div @click="changeNav('Ranking')" :class="{classStyle4:$route.name==='Ranking'}" class="nav_div nav_divimg4">
              </div>
            </el-tooltip>

            <el-tooltip effect="dark" content="商城" placement="right">
              <div @click="changeNav('Shopping')" :class="{classStyles:$route.name==='Shopping'}" class="nav_div nav_divimgs">
              </div>
            </el-tooltip>

            <el-tooltip effect="dark" content="创建赛事" placement="right">
              <div @click="changeNav('CompetitionManagement')" :class="{classStyle6:$route.name==='CompetitionManagement'}" class="nav_div nav_divimg6">
              </div>
            </el-tooltip> -->
          </div>
        </div>

        <!-- 提示信息弹框 -->
        <el-dialog class="expect-dialog" :visible.sync="dialogVisibleexpect" width="380px">
          <div class="expect-dialog-inner">
            <span>敬请期待</span>
            <div class="sureBtndiv" @click="dialogVisibleexpect=false">确认</div>
          </div>
        </el-dialog>

        <!-- 我的资产弹窗 -->
        <div>
          <PersonalupHome @dialogVisibleAssets="receptionBoolen" :dialogVisibleAssets="isopenShow" />
        </div>
        <!-- 退出客服端 -->
        <div>
          <CloseClient v-model="isShowCloseClient" />
        </div>
        <!-- 绑定游戏名称 -->
        <BindingName v-model='isShowBindingName' :gameID="'-game1'" />

        <!-- 系统信息弹框 -->
        <MessageBox @msgboxpopis='getmsgboxpopis' v-model='ismessageBoxpop' />

        <!-- 更改个人信息弹框 personaldetails-->
        <PersonalCenter @getmyinfostate='getmyinfopop' v-model='ispersonaldetails' />

        <!-- 确认切换用户 -->
        <sureLoginout @sureLoginout='getSureLoginout' v-model="sureLoginout" />

        <!-- 我的订单弹框 -->
        <MyIndent v-model="MyIndentShow" />

        <div id="right_conts" class="right_cont">
          <router-view></router-view>
        </div>

        <Login />
      </div>
    </div>
  </div>
</template>
<script>
import PersonalupHome from '@/components/PersonAssets/PersonalupHome' //我的资产弹框
// import PersonalupHome from '@/components/PersonAssets/PersonalupHome' //我的资产弹框
import BindingName from '@/components/Popup/BindingName' //绑定游戏名称弹框
import MessageBox from '@/components/Popup/MessageBox' //系统信息信息弹框
import PersonalCenter from '@/components/PersonAssets/PersonalCenter' // 完善个人信息
import sureLoginout from '@/components/Popup/sureLoginout' // 确认退出
import CloseClient from '@/components/Popup/CloseClient' // 确认退出
import Login from '@/components/Login/Login'
import MyIndent from '@/components/Popup/MyIndent' // 我的订单
import { GetMyNavigation } from '../http.js'
export default {
  name: 'HomePage',
  components: {
    PersonalupHome,
    // lobby,
    BindingName,
    MessageBox,
    PersonalCenter,
    sureLoginout,
    CloseClient,
    Login,
    MyIndent
  },
  data () {
    return {
      selectGameID: '-game1',
      dialogVisibleexpect: false, // 
      dialogVisiblenewmsg: false,
      isShowBindingName: false, // 绑定游戏昵称
      ismessageBoxpop: false,  // 系统信息弹框
      ispersonaldetails: false, // 完善个人信息弹框
      isopenShow: false,
      sureLoginout: false,      // 是否确认切换用户
      PersonalAssetsshow: 6,
      isShowCloseClient: false, //是否退出客户端
      MyIndentShow: false,        // 我的订单弹框
      ruleForm2: {
        newPassword: '',
        oldPassword: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
      },
      myWidths: 0,
      MyNavigation: [],
      isActive: 0
    }
  },
  computed: {
    myGames () {
      return this.$store.state.base.myGames;
    },
    updatingTargetGameID () {
      return this.$store.state.base.updatingTargetGameID;
    }
  },
  watch: {
    myGames (newMyGames, oldMyGames) {
      // 获取个人导航
      GetMyNavigation().then(res => {
        if (res.code === 0) {
          //   console.log(res.data[0].className)
          this.MyNavigation = res.data
        }
        console.log(res)
      })
      if (newMyGames.length != 0) {
        console.log(newMyGames[0].state)
        if (newMyGames[0].state === 1 || newMyGames[0].state === 2) {
          setTimeout(() => {
            this.$store.dispatch('base/updateMyGames')
          }, 1000)
        }
      } else {
        this.isShowBindingName = true
      }
    },
    updatingTargetGameID (nV, oV) {
      if (!nV && oV === this.selectGameID) {
        //更新停止
        for (let i = 0; i < this.myGames.length; i++) {
          const myGame = this.myGames[i];
          if (myGame.id === this.selectGameID) {
            this.$message({ type: 'success', message: '角色绑定成功' })
            return
          } else {
            this.$message({ type: 'warning', message: '角色绑定失败' })
            return
          }
        }
      }
    }
  },
  mounted () {
    askClose = this.openAskClose //关闭，很重要不能删
    // $(window).resize() //引入adminlet 解决首次加载首页需手动刷新问题
    const routerchioce = this.$route.path
    // window.onresize = ()=>{
    //     // 通过捕获系统的onresize事件触发我们需要执行的事件
    //     this.myWidths = (window.innerWidth - 55) + 'px';
    //     document.getElementById('right_conts').style.width=this.myWidths
    //     document.getElementById('wrapper_conts').style.height = window.innerHeight+`px`
    //     document.getElementById('nav_headerid').style.height = window.innerHeight+'px'
    //     // console.log(this.myWidths,window.innerHeight)
    //     const widHeight = {innerHeight:window.innerHeight,width:this.myWidths}
    //     this.$store.commit('homePage',widHeight)
    // }
    const plaayaccont = localStorage.getItem('pkGameAccount')
    if (plaayaccont) {
      console.log("没有名字")
    };
    this.getmyinfouser()
  },
  methods: {
    openAskClose () {
      try { if (win) this.isShowCloseClient = true } catch (error) { }
    },
    //游戏切换
    changeGame (idx) {
      if (idx === 0) {
        this.$store.commit('other/selectedGame', this.myGames[0])
      } else if (idx === 1) {
        this.dialogVisibleexpect = !this.dialogVisibleexpect
      }
    },
    //错误消息提示方法
    ErrorMessage () {
      this.$message({
        showClose: true,
        message: "你已经成功登出系统",
        type: 'success',
        duration: 5000,
        center: true,
      });
    },
    openIAmRich () {
      this.isopenShow = !this.isopenShow
    },
    logout () {
      this.sureLoginout = true
    },
    close () {
      this.isCloseClient = true
    },
    // 我的信息选择
    openMyFriends () {
      this.MyIndentShow = true
      console.log(this.MyIndentShow)
      //   console.log('this.isClassStyle = 5')
      //   this.$router.push({
      //     path: 'MyFriends',
      //     name: 'MyFriends'
      //   })
    },
    receptionBoolen () {
      this.isopenShow = false
    },
    showMenu (parameter) {
      parameter.preventDefault()
    },
    // 左下侧导航栏切换
    changeNav (idx, routeName) {
      console.log(idx, routeName)
      if (this.$store.state.base.loginInfo) {
        this.isActive = idx
        switch (routeName) {
          case 'Lobby':
            this.$router.push({ name: routeName })
            break
          case 'OrganizationManagement':
          case 'CompetitionKanban':
          case 'Ranking':
          case 'MyFriends':
          case 'Shopping':
          case 'CompetitionManagement':
            if (!this.$store.state.other.selectedGame) {
              if (this.myGames.length > 0) {
                this.$store.commit('other/selectedGame', this.myGames[0])
              } else {
                this.$store.dispatch('base/updateMyGames')
                return
              }
            }
            this.$router.push({ name: routeName, params: { gameID: this.$store.state.other.selectedGame.id } })
            break
          default:
            break
        }
      } else {
        this.$store.commit('other/IsLoginShowState', true)
      }
    },
    changeMyNav () {
      // console.log(this.$store.state.other.selectedGame.id)
      this.$store.commit('other/selectedGame', this.myGames[0])
      this.$router.push({ name: 'CompetitionKanban', params: { gameID: "-game1", gameSate: 1 } })
    },

    // 系统信息弹框
    openSysMsgs () {
      this.ismessageBoxpop = true
    },
    // 获取信息弹框状态
    getmsgboxpopis () {
      this.ismessageBoxpop = false
    },
    // 更改个人信息弹框
    getmyinfoper () {
      this.ispersonaldetails = true
    },
    // 获取个人信息弹框状态
    getmyinfopop () {
      this.ispersonaldetails = false
    },
    // 获取个人基本信息
    getmyinfouser () {

    },
    // 获取确认退出弹框信息
    getSureLoginout () {
      this.sureLoginout = false
    },
    // 点击框框登陆
    Loginin () {
      this.$store.commit('other/IsLoginShowState', true)
    }
  }
}
</script>
<style>
/* 敬请期待弹框 */
.home-page .expect-dialog .el-dialog__header {
  padding: 0;
}
.home-page .expect-dialog .el-dialog__headerbtn {
  top: 10px;
  right: 10px;
}
.home-page .expect-dialog .el-dialog__body {
  padding: 0;
}
.home-page .expect-dialog-inner {
  height: 173px;
  background-color: #121212;
  /* border: solid 1px #4c4c4c; */
}
.home-page .expect-dialog-inner span {
  display: inline-block;
  width: 64px;
  margin: 61px 158px 32px 157px;
  color: #8d8c8d;
  font-size: 16px;
}
</style>

<style scoped>
.home-page {
  width: 100%;
  height: 100%;
}
.game_nav {
  width: 312px;
  height: 32px;
  float: left;
  margin-left: 24px;
  margin-top: 12px;
}
.game_nav ul {
  list-style: none; /* 去掉ul前面的符号 */
  margin: 0px; /* 与外界元素的距离为0 */
  padding: 0px; /* 与内部元素的距离为0 */
  width: auto; /* 宽度根据元素内容调整 */
}
.game_nav ul li {
  width: 98px;
  height: 32px;
  float: left;
  cursor: pointer;
}
.game_nav ul li.game-logo {
  background: url("../assets/images/logo旁的框.png") no-repeat;
  margin-right: 16px;
}
.game-logo-img {
  width: 24px;
  height: 17px;
  float: left;
  margin: 5px 6px 4px 4px;
}
.game_nav ul li span {
  font-size: 14px;
  line-height: 16px;
  color: #8d8c8d;
  line-height: 32px;
}
.game_nav_l {
  width: 98px;
  height: 32px;
  float: left;
  cursor: pointer;
}
.game_nav_l span {
  font-size: 14px;
  line-height: 16px;
  color: #8d8c8d;
  line-height: 32px;
}
/* 提示信息样式 */
.el-message--success {
  background-color: #121212;
  border-color: #4c4c4c;
  border-radius: 0;
  color: #8d8c8d;
}
.el-message .el-icon-success {
  color: #ffffff;
}
.el-message--success .el-message__content {
  color: #ffffff;
}
.top_head {
  width: 1280px;
  height: 55px;
  background-color: #121212;
  position: relative;
}
.homepageMovediv {
  width: 795px;
  height: 55px;
  position: absolute;
  background-color: transparent;
  left: 285px;
}
.top_logo {
  width: 55px;
  height: 55px;
  float: left;
}
.top_logo img {
  margin: 13px 12px;
}
.wrapper_cont {
  width: 1280px;
  height: 830px;
  margin: auto;
}

/* 头部右边部分 */
.right_div {
  width: 200px;
  height: 55px;
  float: right;
}
.msg_Headimg {
  width: 100px;
  height: 32px;
  border-right: 2px solid #333333;
  margin-top: 12px;
  float: left;
  position: relative;
}
.msg_Newdiv {
  width: 24px;
  height: 20px;
  float: left;
  margin-top: 6px;
}
.msg_Newdiv img {
  cursor: pointer;
}
.head_msgdiv {
  width: 35px;
  height: 35px;
  float: left;
  margin-top: 0px;
  margin-left: 23px;
  cursor: pointer;
}
.close_Samll {
  width: 100px;
  height: 32px;
  margin-top: 12px;
  float: left;
}
.close_Samll img {
  cursor: pointer;
}
.shrinkImg {
  padding: 15px 21px;
}
.head_slecet {
  position: absolute;
  width: 120px;
  height: 164px;
  background-color: #262626;
  border-radius: 6px;
  opacity: 0.98;
  top: 33px;
  left: -21px;
  display: none;
  animation: move 0.2s;
  z-index: 99;
}
@keyframes move {
  0% {
    top: 0;
  }
  100% {
    top: 32px;
  }
}
.head_msgdiv:hover .head_slecet {
  display: block;
}
.head_Name {
  width: 120px;
  height: 40px;
  border-bottom: 1px solid #939293;
}
.profile_Photo {
  width: 34px;
  height: 34px;
  background-color: #000000;
  border: solid 1px #939293;
  border-radius: 17px;
  float: left;
  margin: 10px;
}
.profile_Name {
  width: 120px;
  height: 32px;
  float: left;
  margin-top: 7px;
  color: #ffffff;
  font-size: 14px;
}
.profile_Name p {
  margin: 0;
  padding: 2px 20px 0 20px;
}
.my_Personmsg {
  width: 120px;
  height: 30px;
  color: #8d8c8d;
}
.my_Personmsg:hover {
  background-color: #3c3c3c;
  color: #ffffff;
}
.my_Personmsg span {
  line-height: 27px;
}
.persoN_Img {
  width: 12px;
  height: 12px;
  float: left;
  margin: 9px 13px 0 18px;
}
.my_Personmsg1 {
  background: url("../assets/images/我的比赛.png") no-repeat;
}
.my_Personmsg:hover .my_Personmsg1 {
  background: url("../assets/images/我的比赛（鼠标悬浮时.png") no-repeat;
}
.my_Personmsg2 {
  background: url("../assets/images/我的比赛1.png") no-repeat;
}
.my_Personmsg:hover .my_Personmsg2 {
  background: url("../assets/images/我的资产（鼠标悬浮时.png") no-repeat;
}
.my_Personmsg3 {
  background: url("../assets/images/我的比赛2.png") no-repeat;
}
.my_Personmsg:hover .my_Personmsg3 {
  background: url("../assets/images/我的好友（鼠标悬浮时.png") no-repeat;
}
.my_Personmsg4 {
  background: url("../assets/images/我的比赛3.png") no-repeat;
}
.my_Personmsg:hover .my_Personmsg4 {
  background: url("../assets/images/切换用户（鼠标悬浮时.png") no-repeat;
}

/* 左下侧导航 */
.nav_header {
  width: 55px;
  height: 775px;
  background-color: #121212;
  float: left;
}
.right_cont {
  width: 1225px;
  height: 775px;
  float: left;
}
.nav_div {
  width: 54px;
  height: 55px;
  cursor: pointer;
  border: 2px solid transparent;
  box-sizing: border-box;
  margin-bottom: 2px;
  position: relative;
}
.nav_divimg1:hover {
  border-right: 2px solid #7800ff;
  background: url("../assets/images/大厅.png") no-repeat 14px 14px;
  background-color: #1e1e1e;
}
.nav_divimg1 {
  background: url("../assets/images/大厅未.png") no-repeat 14px 14px;
}
.classStyle1 {
  width: 52px;
  height: 54px;
  background: url("../assets/images/大厅.png") no-repeat 14px 14px;
  background-color: #1e1e1e;
  border-right: 2px solid #7800ff;
  position: absolute;
  top: -2px;
  left: 0;
  z-index: 99;
}

.nav_divimg2:hover {
  border-right: 2px solid #7800ff;
  background: url("../assets/images/战队.png") no-repeat 14px 14px;
  background-color: #1e1e1e;
}
.nav_divimg2 {
  background: url("../assets/images/战队未.png") no-repeat 14px 14px;
}
.classStyle2 {
  width: 52px;
  height: 54px;
  position: absolute;
  top: -2px;
  left: 0;
  z-index: 99;
  background: url("../assets/images/战队.png") no-repeat 14px 14px;
  background-color: #1e1e1e;
  border-right: 2px solid #7800ff;
}

.nav_divimg3:hover {
  border-right: 2px solid #7800ff;
  background: url("../assets/images/比赛.png") no-repeat 14px 14px;
  background-color: #1e1e1e;
}
.nav_divimg3 {
  background: url("../assets/images/比赛未.png") no-repeat 14px 14px;
}
.classStyle3 {
  width: 52px;
  height: 54px;
  position: absolute;
  top: -2px;
  left: 0;
  z-index: 99;
  background: url("../assets/images/比赛.png") no-repeat 14px 14px;
  background-color: #1e1e1e;
  border-right: 2px solid #7800ff;
}

.nav_divimg4:hover {
  border-right: 2px solid #7800ff;
  background: url("../assets/images/排行榜.png") no-repeat 14px 14px;
  background-color: #1e1e1e;
}
.nav_divimg4 {
  background: url("../assets/images/排行榜未.png") no-repeat 14px 14px;
}
.classStyle4 {
  width: 52px;
  height: 54px;
  position: absolute;
  top: -2px;
  left: 0;
  z-index: 99;
  background: url("../assets/images/排行榜.png") no-repeat 14px 14px;
  background-color: #1e1e1e;
  border-right: 2px solid #7800ff;
}

.nav_divimg5:hover {
  border-right: 2px solid #7800ff;
  background: url("../assets/images/好友.png") no-repeat 14px 14px;
  background-color: #1e1e1e;
}
.nav_divimg5 {
  background: url("../assets/images/好友未.png") no-repeat 14px 14px;
}
.classStyle5 {
  width: 52px;
  height: 54px;
  position: absolute;
  top: -2px;
  left: 0;
  z-index: 99;
  background: url("../assets/images/好友.png") no-repeat 14px 14px;
  background-color: #1e1e1e;
  border-right: 2px solid #7800ff;
}

.nav_divimg6:hover {
  border-right: 2px solid #7800ff;
  background: url("../assets/images/cjbs1.png") no-repeat 14px 14px;
  background-color: #1e1e1e;
}
.nav_divimg6 {
  background: url("../assets/images/cjbs.png") no-repeat 14px 14px;
}
.classStyle6 {
  width: 52px;
  height: 54px;
  position: absolute;
  top: -2px;
  left: 0;
  z-index: 99;
  background: url("../assets/images/cjbs1.png") no-repeat 14px 14px;
  background-color: #1e1e1e;
  border-right: 2px solid #7800ff;
}

/* 商品导航 */
.nav_divimgs:hover {
  border-right: 2px solid #7800ff;
  background: url("../assets/images/c26608bd1b89053787e1bb876088aac.png")
    no-repeat 14px 14px;
  background-color: #1e1e1e;
}
.nav_divimgs {
  background: url("../assets/images/94b1692cee5c75f1b43d6091d6f5c75.png")
    no-repeat 14px 14px;
}
.classStyles {
  width: 52px;
  height: 54px;
  position: absolute;
  top: -2px;
  left: 0;
  z-index: 99;
  background: url("../assets/images/c26608bd1b89053787e1bb876088aac.png")
    no-repeat 14px 14px;
  background-color: #1e1e1e;
  border-right: 2px solid #7800ff;
}

.sureBtndiv {
  width: 320px;
  height: 40px;
  background-color: #7800ff;
  margin: auto;
  text-align: center;
  line-height: 40px;
  color: #fefefe;
  font-size: 16px;
  cursor: pointer;
}
.darkStyle {
  background-color: rebeccapurple;
  color: #000;
}
</style>