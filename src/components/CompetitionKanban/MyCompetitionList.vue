<template>
  <!-- 我的赛事 -->
  <div class="my-competition-list">
    <div class="troopsmy-competition-list_Cont">
      <!-- 下拉模式选择框 -->
      <div class="myrecommend_head">
        <!-- <div class="mycomSlecte">
                    <select name="">
                        <option>TPP_SOLO</option>
                        <option>TPP</option>
                        <option>SOLO</option>
                    </select>
                </div>
                <div class="mycomSlecte">
                    <select name="">
                        <option>TPP_SOLO</option>
                        <option>TPP</option>
                        <option>SOLO</option>
                    </select>
                </div>
                <div class="mycomSlecte">
                    <select name="">
                        <option>TPP_SOLO</option>
                        <option>TPP</option>
                        <option>SOLO</option>
                    </select>
                </div> -->
      </div>
      <!--列表框-->
      <template v-for="(competition,idx) in competitions">
        <div :key="idx" id="recommendListid" class="recommend_list" @mouseenter="location(competition)" @mouseleave="scleaveLocation()">
          <div class="recommend_list1" @click="selectCompetition(competition)">
            <div class="room-name">
              <div style="margin-top:10px">{{competition.name.length>12?competition.name.substring(0,11)+`...`:competition.name}}</div>
              <div>{{competition.gameModel.value}}_{{competition.gameModel.value1}} {{competition.gameModel.value2}}</div>
            </div>
            <div class="time-div">
              <p>比赛报名：{{competition.entryStartTime | formatDatemmdd}}~{{competition.entryEndTime | formatDatemmdd}}</p>
              <p>比赛入场：{{competition.currentStage.allMatches[0].enterTime | formatDatemmdd}}~{{competition.currentStage.allMatches[0].startTime | formatDatemmdd}}</p>
            </div>
            <div class="peoples">
              <div class="peoples_l">
                {{competition.entryUnit===1?'人数':'战队'}}：<span>{{competition.currentStage.competitorsCount}}</span>/{{competition.currentStage.maxCompetitorLimit}}
              </div>
              <div class="reward-summary">
                奖励：{{competition.rewardDescription.length>10?competition.rewardDescription.substring(0,10)+`...`:competition.rewardDescription.length}}
              </div>
            </div>
          </div>
          <div class="My-sicchioceBtn">
            <div style="width:80px;hieght:28px;margin:15px auto;">
              <CompetitionOP :competition="competition" />
            </div>
          </div>
          <!-- 添加好友框-->
          <div v-if="false" v-show="isteamMsgup===competition.id" id="teamMsgupId" class="team_Msg_up">
            <div class="team_Msg_listdiv">
              <div class="team_Msg_uplist">
                <div class="team_Msg_upleft">
                  <div class="teamListimg">
                    <img src="../../assets/images/pubg.png" alt="">
                  </div>
                  <span>队友名字</span>
                </div>
                <div class="peoples_rsaishi">
                  奖励:2000元现金
                </div>
              </div>
            </div>
            <div class="sicchioceBtn">
              <!-- <button class="baoming">立即进入</button> -->
              <!-- <button
                v-if="competition.btnstate===3"
                class="overBtn"
              >已结束</button>
              <button
                v-else-if="competition.btnstate===1"
                class="baoming"
              >已报名</button>
              <button
                v-else-if="competition.btnstate===2"
                class="overBtn"
              >等待中</button> -->
              <!-- <CompetitionOP :competition="competition"/> -->
              <!-- <button class="overBtn">已报名</button> -->
            </div>
            <!-- 添加好友框-->
            <div id="teamMsgupId" class="team_Msg_up">
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

            <!--已结束比赛查看赛事框-->
            <!-- <div class="overGamediv">
                    <div class="overGamelist">
                        <div class="overGameList_l">
                            <div class="overGameteam_img">
                                <img src="../../assets/images/pubg.png" alt="">
                            </div>
                            <span>吃鸡战队</span>
                        </div>
                        <div class="overGameList_r">
                            <span style="margin-left:142px;">击杀积分：999分</span>
                            <span style="margin-left:40px;">总积分：50</span>
                        </div>
                    </div>
                </div> -->
          </div>
        </div>
        <!-- 翻页 -->
        <!-- <div class="myPage">
                    <el-pagination background layout="prev, pager, next" :total="total" @current-change="handleCurrentChange">
                    </el-pagination>
                </div> -->
      </template>
    </div>
  </div>
</template>
<script>
import { formatDate } from '../../common/date.js'; // 时间格式化
import CompetitionOP from '@/components/_Common/Competition/CompetitionOP'
export default {
  name: 'MyCompetitionList',
  props: {
    gameID: String
  },
  components: {
    CompetitionOP
  },
  data () {
    return {
      competitions: [],//赛事列表
      isCloor: 0,
      isteamMsgup: 0,
      islassStyle: false,
      ishowUp: false,
      navData: [
        {
          name: '推荐竞赛'
        },
        {
          name: '战队竞赛'
        }
      ]
    }
  },
  filters: {
    formatDate (time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    },
    formatDatemmdd (time) {
      var date = new Date(time);
      return formatDate(date, 'MM-dd hh:mm');
    }
  },
  computed: {

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
      if (!this.gameID)
        return
      const url = `/api/Competition/-game1/Involved/?pageIndex=${1}&pageRows=${9}`
      this.$fetch(url).then((res) => {
        if (res.code == 0) {
          this.total = res.data.pageData.total
          const competitions = []
          res.data.lst.forEach(lstItem => {
            const competition = lstItem;
            lstItem.gameModel = JSON.parse(lstItem.gameMode)
            lstItem.entryStartTime = new Date(lstItem.entryStartTime)
            lstItem.entryEndTime = new Date(lstItem.entryEndTime)
            if (lstItem.currentStage.careMatches.name === "null" && lstItem.currentStage.careMatches.password === "null") {
              lstItem.currentStage.careMatches = []
            }
            lstItem.isAlreadyEntry = true  // 我的赛事我报了名的的比赛增加一个是否报名字段

            // if (nowdate >= entryStartTime && nowdate < entryEndTime) {
            //   lstItem.btnstate = 1
            // } else if (nowdate < entryStartTime) {
            //   lstItem.btnstate = 2
            // } else if (nowdate > entryEndTime) {
            //   lstItem.btnstate = 3
            // }
            // for (let i = 0; i < competition.stages.length; i++) {
            //     const competitionStagesItem = competition.stages[i]
            //     if (competitionStagesItem.state == 1) {
            //         competition.currentStage = competitionStagesItem
            //         if (competition.entryUnit === 1) {
            //             //个人单位
            //             for (let j = 0; j < competition.currentStage.competitors.length; j++) {
            //                 const competitionCurrentStageCompetitorsItem = competition.currentStage.competitors[j];
            //                 if (competitionCurrentStageCompetitorsItem.id === this.$store.state.base.loginInfo.id)
            //                     console.log(competitionCurrentStageCompetitorsItem)
            //             }
            //         } else {
            //             //组织单位
            //         }
            //         break
            //     }
            // }

            competitions.push(competition)
          });
          this.competitions = competitions
        }
      })
    },
    // 鼠标移入
    location (item) {
      // console.log(item)
      this.isteamMsgup = item.id
      this.islassStyle = false
      this.ishowUp = false
      // event = event || window.event;
      // const recommendListid = document.getElementById('recommendListid')
      // const positionX = event.clientX - recommendListid.offsetLeft;
      // console.log(recommendListid.offsetLeft)
      // if (positionX > 615) {
      //     document.getElementById('teamMsgupId').style.left = 615 + `px`
      // } else {
      //     document.getElementById('teamMsgupId').style.left = positionX + `px`
      // }
    },
    scleaveLocation () {
      this.isteamMsgup = 0
    },
    addPPeoples () {
      this.islassStyle = true
      this.ishowUp = true
    },
    // 页面跳转
    selectCompetition (competition) {
      this.$emit('onSelectCompetition', competition);
      console.log(competition)
    },
    // 翻页
    handleCurrentChange (page) {

    }
  }
}
</script>
<style scoped>
.my-competition-list p {
  margin: 0;
}
.troopsmy-competition-list_Cont {
  width: 856px;
  height: 720px;
  margin: auto;
}
.recommend_listdiv {
  width: 856px;
  height: 604px;
  overflow: auto;
}
.recommend_listdiv::-webkit-scrollbar {
  display: none;
}
.recommend_list {
  width: 856px;
  height: 60px;
  background-color: #181818;
  border: solid 1px #252525;
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  cursor: pointer;
}
.recommend_list1 {
  color: #8d8c8d;
}
/* .recommend_list1:hover {
  color: #ffffff;
} */
.recommend_list:hover {
  border: solid 1px #8d8c8d;
}
.room-name {
  width: 180px;
  height: 58px;
  float: left;
  margin-left: 20px;
  font-size: 14px;
  color: #8d8c8d;
}
.room-name p {
  margin: 10px 0 0 0;
  color: #8d8c8d;
}
.recommend_list :hover .room-name {
  color: #ffffff;
}
.time-div {
  width: 250px;
  height: 58px;
  float: left;
  font-size: 14px;
  line-height: 58px;
  text-align: center;
  color: #8d8c8d;
}
.time-div p {
  height: 24px;
  line-height: 36px;
}
.recommend_list :hover .time-div {
  color: #ffffff;
}
.peoples {
  width: 276px;
  height: 58px;
  float: left;
}
.peoples_l {
  width: 126px;
  height: 58px;
  line-height: 58px;
  float: left;
  font-size: 14px;
  margin-left: 20px;
}
.reward-summary {
  width: 130px;
  height: 58px;
  line-height: 58px;
  float: left;
  font-size: 14px;
}
.recommend_list :hover .reward-summary {
  color: #ffffff;
}
.recommend_list :hover .peoples_l span {
  color: #ffffff;
}
.peoples_rsaishi {
  width: 200px;
  height: 58px;
  line-height: 58px;
  float: left;
  font-size: 14px;
  text-align: center;
}
.My-sicchioceBtn {
  width: 128px;
  height: 58px;
  float: left;
  border-left: 1px solid #333333;
}
.My-sicchioceBtn button {
  outline: none;
  width: 80px;
  color: #ffffff;
  font-size: 14px;
}
.baoming {
  background-color: #7800ff;
}
.overBtn {
  background-color: #8d8c8d;
}
.team_Msg_up {
  width: 240px;
  min-height: 184px;
  background-color: #121212;
  border: solid 1px #4c4c4c;
  position: absolute;
  top: 59px;
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
.overGamediv {
  width: 856px;
  min-height: 60px;
  position: absolute;
  top: 60px;
  left: -1px;
  z-index: 99;
}
.overGamelist {
  width: 856px;
  height: 40px;
  background-color: #181818;
  border: solid 1px #252525;
  display: flex;
  justify-content: space-between;
}
.overGameList_l {
  width: 50%;
  height: 100%;
  font-size: 14px;
}
.overGamelist span {
  line-height: 40px;
  color: #8d8c8d;
}
.overGameList_r {
  width: 50%;
  height: 100%;
}
.overGameList_r span {
  display: inline-block;
  width: 120px;
}
.overGameteam_img {
  width: 24px;
  height: 24px;
  background-image: linear-gradient(0deg, #252525 0%, #454545 100%);
  margin: 8px 16px;
  float: left;
}
.overGameteam_img img {
  width: 18px;
  height: 13px;
  margin: 3px;
}
.overGamelist:hover {
  background-color: #333333;
}
.overGamelist:hover span {
  color: #ffffff;
}

.recommend_listoptons {
  width: 856px;
}
.options {
  width: 92px;
  height: 33px;
  margin-left: 20px;
  display: flex;
  justify-content: space-between;
}

/* 下拉框 */
.myrecommend_head {
  width: 856px;
  height: 20px;
  /* background-color: #181818; */
  padding: 16px 0 32px 0;
}
.mycomSlecte {
  width: 100px;
  height: 20px;
  background-color: #181818;
  border-radius: 2px;
  border: solid 1px #333333;
  float: left;
  margin-left: 24px;
}
.mycomSlecte select {
  background-color: #181818;
  border: 0;
  outline: none;
  width: 98px;
  height: 16px;
  font-size: 12px;
  color: #8d8c8d;
}
</style>