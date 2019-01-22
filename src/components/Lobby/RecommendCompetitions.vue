<template>
  <!-- 推荐竞赛页面 -->
  <div class="recommend-competitions">
    <div class="recommend_Cont">
      <!-- 占位 -->
      <div style="height:24px;"></div>
      <!-- 广告 -->
      <div class="recommend-main-banner">
        <div class="banner-img">
          <el-carousel height="185px">
            <el-carousel-item v-for="(item,idx) in AutoImgData" :key="idx">
              <a :href="item.url" target="view_window"><img :src="item.ImgName" alt=""></a>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="bannner-btn">
          <button @click="GetGame">加入比赛</button>
          <button @click="GetCreatGame">创建比赛</button>
        </div>
      </div>
      <!--列表框-->
      <div class="recommend-main-content">
        <!-- 推荐赛事 -->
        <div class="main-recommend-game">
          <span>推荐赛事</span>
        </div>
        <div v-for="(competition,index) in competitions" :key="index" class="recommend_list" @mouseenter="mouseLocation(competition)" @mouseleave="leaveLocation()">
          <div>
            <div class="roomName">
              <p>{{competition.name.length>14?competition.name.substring(0,12)+`...`:competition.name}}</p>
              <span>{{competition.gameModel.value}}_{{competition.gameModel.value1}}</span> <span>{{competition.gameModel.value2}}</span>
            </div>
            <div class="timeDiv">
              <p style="margin:6px 0;">报名时间：{{competition.entryStartTime | formatDate}}~{{competition.entryEndTime | formatDate}}</p>
              <!-- <p></p> -->
              <p v-if="competition.currentStage&&competition.currentStage.groups.length>0&&competition.currentStage.groups[0].matches.length>0">
                比赛开始：{{competition.currentStage.groups[0].matches[0].enterTime | formatDate}}~{{competition.currentStage.groups[0].matches[0].startTime | formatDate}}
              </p>
            </div>
            <div class="peoples">
              <div class="peoples_left">
                {{competition.entryUnit===1?'人数':'战队'}}：<span>{{competition.currentStage.competitorsCount}}</span>/{{competition.currentStage.maxCompetitorLimit}}
              </div>
              <div class="peoples_right">
                <!-- 奖励：{{competition.rewardDescription.length>10?competition.rewardDescription.substring(0,9)+`...`:competition.rewardDescription}} -->
                地图：{{competition.gameModel.value3}}
              </div>
            </div>
          </div>
          <!-- 右边操作 -->
          <div class="competition-op">
            <button @click=goDetalis(competition)>赛事详情</button>
          </div>
          <!-- <CompetitionOP :competition="competition" :myOrganization="myOrganization" /> -->
          <div v-show="isteamMsgup==index" class="team_Msg_up">
            <div class="team_Msg_listdiv">
              <div class="team_Msg_uplist">
                <div class="team_Msg_upleft">
                  <div class="teamListimg">
                    <img src="../../assets/images/pubg.png" alt="">
                  </div>
                  <span>队友名字</span>
                </div>
                <div class="team_Msg_upr">
                </div>
              </div>
            </div>
            <!-- 增加队友或者人员 -->
            <div @click="addPPeoples" :class="{classStyle:islassStyle}" class="team_addBtn">
              <img src="../../assets/images/人员添加的加号.png" alt="">
              <div v-show="ishowUp" class="next_Levelup">
                <div class="next_Levelist">
                  <div class="next_Levelistimg">
                    <img src="../../assets/images/pubg.png" alt="">
                  </div>
                  <span>ajsdhnjkashfjkdhf</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <registrationSuccess @applySuccess='getapplysuc' :dialogVisibleSuccess="isapplysuccess" />
        <div @click="getmorepublice" class="moreGame">更多推荐赛事</div>
      </div>
    </div>
  </div>
</template>
<script>
import { formatDate } from '../../common/date.js';
import { GetMyNavigation } from '../../http.js'
import CompetitionOP from '@/components/_Common/Competition/CompetitionOP'; // 报名成功
import registrationSuccess from '@/components/Popup/registrationSuccess'
export default {
  name: 'RecommendCompetitions',
  components: {
    CompetitionOP,
    registrationSuccess
  },
  data () {
    return {
      competitions: [],
      myOrganization: undefined,
      isCloor: 0,
      isteamMsgup: 50,
      islassStyle: false,
      ishowUp: false,
      isapplysuccess: false,
      navData: [
        {
          name: '推荐竞赛'
        },
        {
          name: '战队竞赛'
        }
      ],
      userId: '',
      AutoImgData: [
        {
          url: 'http://chiji.uuu9.com/zs/',
          ImgName: require('../../assets/images/219610958891907970.png')
        },
        {
          url: 'http://chiji.uuu9.com/zs/',
          ImgName: require('../../assets/images/CZSM.jpg')
        },
        {
          url: 'http://chiji.uuu9.com/zs/',
          ImgName: require('../../assets/images/SJLS.jpg')
        }
      ],
    }
  },
  filters: {
    formatDate (time) {
      var date = new Date(time);
      return formatDate(date, 'MM-dd hh:mm');
    }
  },
  computed: {
    gameID () {
      if (this.$store.state.other.selectedGame)
        return this.$store.state.other.selectedGame.id
      return undefined
    }
  },
  watch: {
    gameID () {
      this.refresh()
    }
  },
  mounted () {
    this.refresh()
  },
  methods: {
    refresh () {
      this.refreshMyOrganization()
      // 获取推荐赛事列表
      const url = `/api/Competition/Recommended`
      this.$fetch(url).then((res) => {
        if (res.code == 0) {
          console.log(res.data.lst)
          const competitions = []
          res.data.lst.forEach(competition => {
            competition.gameModel = JSON.parse(competition.gameMode)
            competition.entryStartTime = new Date(competition.entryStartTime)
            competition.entryEndTime = new Date(competition.entryEndTime)
            if (competition.state !== 99) {
              competitions.push(competition)
            }
          });
          this.competitions = competitions.slice(0, 6)
          console.log(this.competitions)
          console.log(competitions)
        }
      })
    },
    refreshMyOrganization () {
      // 获取列表信息
      if (this.gameID) {
        const url = `/api/Organization/${this.gameID}/My`
        this.$fetch(url).then((res) => {
          this.myOrganization = undefined
          if (res.code === 0) {
            const myOrganization = res.data
            if (myOrganization) {
              myOrganization.members.forEach(member => {
                member.isSelected = false
              });
              this.myOrganization = myOrganization
            }
          }
        })
      }
    },
    // 鼠标移入
    mouseLocation (index) {
      // console.log(index)
      this.isteamMsgup = index
      this.islassStyle = false
      this.ishowUp = false
    },
    leaveLocation () {
      this.isteamMsgup = 50
    },
    addPPeoples () {
      this.islassStyle = true
      this.ishowUp = true
    },
    // 去更多页面
    getmorepublice () {
      if (this.$store.state.base.loginInfo) {
        this.$store.commit('other/selectedGame', this.$store.state.base.myGames[0])
        this.$router.push({
          path: '/CompetitionKanban',
          name: 'CompetitionKanban',
          params: { gameID: this.$store.state.base.myGames[0].id }
        })
      } else {
        this.$store.commit('other/IsLoginShowState', true)
      }
    },
    // 获取关闭报名弹框的值
    getapplysuc (data) {
      this.isapplysuccess = false
    },
    // 去比赛界面
    GetGame () {
      if (this.$store.state.base.loginInfo) {
        this.$store.commit('other/selectedGame', this.$store.state.base.myGames[0])
        this.$router.push({
          path: '/HomePage/CompetitionKanban',
          name: 'CompetitionKanban',
          params: { gameID: this.$store.state.base.myGames[0].id }
        })
      } else {
        console.log("('other/IsLoginShowState',true)")
        this.$store.commit('other/IsLoginShowState', true)
      }
    },
    // 去创建比赛页面
    GetCreatGame () {
      if (this.$store.state.base.loginInfo) {
        var navagation = []
        GetMyNavigation().then((res) => {
          if (res.code === 0) {
            res.data.forEach(ResItem => {
              if (ResItem.routeName === 'CompetitionManagement') {
                navagation.push(ResItem)
                return
              }
            })
          }
        })
        console.log(navagation)
        if (navagation) {
          this.$router.push({
            path: '/CompetitionManagement',
            name: 'CompetitionManagement',
            params: { gameID: this.$store.state.base.myGames[0].id, }
          })
        } else {
          this.$message({
            message: '你无权限创建赛事',
            type: 'warning'
          });
        }
      } else {
        this.$store.commit('other/IsLoginShowState', true)
      }
    },
    goDetalis (competition) {
      if (this.$store.state.base.loginInfo) {
        this.$store.commit('other/selectedGame', this.$store.state.base.myGames[0])
        this.$router.push({
          path: '/HomePage/CompetitionKanban',
          name: 'CompetitionKanban',
          params: { gameID: this.$store.state.base.myGames[0].id, nowGameId: competition }
        })
        console.log(competition.id)
      } else {
        this.$store.commit('other/IsLoginShowState', true)
      }
    }
  }
}
</script>
<style scoped>
.recommend-competitions {
  width: 945px;
  height: 720px;
  background-color: #1e1e1e;
}
.competition-op {
  width: 128px;
  height: 57px;
  float: left;
  border-left: 1px solid #333333;
}
.competition-op button {
  width: 80px;
  height: 28px;
  background-color: #7800ff;
  border: 0;
  outline: none;
  color: #ffffff;
  margin: 14px 24px;
}
.recommend-competitions p {
  margin: 0;
}
.recommend_Cont {
  width: 856px;
  height: 720px;
  margin: auto;
}
.recommend-main-content {
  width: 856px;
  height: 500px;
}
.main-recommend-game {
  width: 100%;
  height: 20px;
  border-left: 2px solid #7800ff;
  margin-bottom: 8px;
  line-height: 20px;
}
.main-recommend-game span {
  font-size: 16px;
  color: #ffffff;
  padding-left: 10px;
}
.recommend_list {
  width: 856px;
  height: 59px;
  background-color: #181818;
  border: solid 1px #252525;
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}
.roomName {
  width: 180px;
  height: 58px;
  float: left;
  margin-left: 20px;
  font-size: 14px;
  color: #8d8c8d;
}
.roomName p {
  margin: 10px 0 0 0 !important;
}
.recommend-competitions .timeDiv {
  width: 240px;
  height: 58px;
  float: left;
  color: #8d8c8d;
  font-size: 14px;
  text-align: left;
  /* line-height: 0 ; */
}
.peoples {
  width: 286px;
  height: 58px;
  float: left;
}
.peoples_left {
  width: 110px;
  height: 58px;
  line-height: 58px;
  float: left;
  font-size: 14px;
  color: #8d8c8d;
  margin-left: 30px;
}
.peoples_right {
  width: 122px;
  height: 58px;
  line-height: 58px;
  float: left;
  font-size: 14px;
  color: #8d8c8d;
  text-align: left;
  margin-left: 24px;
}
.team_Msg_up {
  width: 240px;
  min-height: 184px;
  background-color: #121212;
  border: solid 1px #4c4c4c;
  position: absolute;
  top: 59px;
  left: 615px;
  z-index: 99;
  animation: move 0.1s;
}
@keyframes move {
  0% {
    top: 0;
  }
  100% {
    top: 59px;
  }
}
.team_Msg_listdiv {
  width: 200px;
  min-height: 45px;
  margin: 16px 0 8px 23px;
}
.team_Msg_uplist {
  width: 200px;
  height: 32px;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
}
.team_Msg_upleft {
  width: 190px;
  height: 32px;
}
.team_Msg_upr {
  width: 10px;
  height: 32px;
  background: url("../../assets/images/renyuanguanbi.png") no-repeat center;
  cursor: pointer;
}
.team_Msg_uplist:hover .team_Msg_upr {
  background: url("../../assets/images/xuanfuguanbi.png") no-repeat center;
}
.teamListimg {
  width: 32px;
  height: 32px;
  background-image: linear-gradient(0deg, #252525 0%, #454545 100%);
  float: left;
}
.teamListimg img {
  padding: 7px 4px 4px 4px;
}
.team_Msg_upleft span {
  line-height: 32px;
  padding-left: 13px;
  color: #8d8c8d;
  font-size: 16px;
}

.team_addBtn {
  width: 200px;
  height: 32px;
  /* background: url('../../assets/images/人员添加的加号.png') no-repeat center; */
  background-image: linear-gradient(0deg, #252525 0%, #454545 100%);
  margin: auto;
  position: relative;
}
.team_addBtn img {
  margin: 8px 0 0 92px;
}
.classStyle {
  width: 200px;
  height: 32px;
  background-color: #272727;
  border: solid 1px #4c4c4c;
}
.next_Levelup {
  width: 200px;
  height: 182px;
  background-color: #121212;
  border: solid 1px #4c4c4c;
  position: absolute;
  z-index: 99;
  top: 32px;
  left: -1px;
}
.next_Levelist {
  width: 198px;
  height: 36px;
  color: #ffffff;
}
.next_Levelist:hover {
  background-color: #333333;
}
.next_Levelistimg {
  width: 24px;
  height: 24px;
  background-image: linear-gradient(0deg, #252525 0%, #454545 100%);
  float: left;
  margin: 6px 12px;
}
.next_Levelistimg img {
  width: 18px;
  height: 13px;
  margin: 0 0 0 2px;
}
.next_Levelist span {
  line-height: 36px;
}

/* 更多赛事 */
.moreGame {
  width: 856px;
  height: 60px;
  background-color: #181818;
  border: solid 1px #252525;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 60px;
  color: #8d8c8d;
  text-align: center;
  cursor: pointer;
}

.recommend_list:hover {
  border: solid 1px #8d8c8d;
}
.recommend_list:hover .roomName {
  color: white;
}
.recommend_list:hover .roomName p {
  color: white;
}
.recommend_list:hover .timeDiv {
  color: white;
}
.recommend_list:hover .peoples_right {
  color: white;
}
.recommend_list:hover .peoples_left span {
  color: white;
}
.recommend-main-banner {
  width: 856px;
  height: 188px;
  margin-bottom: 8px;
}
.recommend-main-banner .banner-img {
  width: 630px;
  height: 188px;
  border: solid 1px #252525;
  background-color: #181818;
  float: left;
}
.recommend-main-banner .bannner-btn {
  width: 218px;
  height: 188px;
  background-color: #181818;
  border: solid 1px #252525;
  float: right;
}
.bannner-btn button {
  width: 170px;
  height: 48px;
  display: block;
  background-color: #7800ff;
  outline: none;
  border: 0;
  margin: 30px auto;
  color: #ffffff;
  font-size: 16px;
  font-family: SourceHanSansCN-Heavy;
  font-weight: 900;
}
</style>