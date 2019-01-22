<template>
  <div v-if="competitionE" id="base-info">
    <div class="shaishiName">
      <font>赛事名称：<span>{{competitionE.name}}</span></font>
    </div>
    <div class="gameMode">
      <font>游戏模式：<span>{{competitionE.gameMode.value}}</span> <span>{{competitionE.gameMode.value1}}</span> <span>{{competitionE.gameMode.value2}}</span> <span>{{competitionE.gameMode.value3}}</span> </font>
    </div>
    <div class="ChargingMode">
      <font>参赛者报名费：<span>{{competitionE.entryCost}}PK币</span> </font>
    </div>
    <div class="TimeSigningUp time-singin-btn">
      <font>报名时间：<span>{{competitionE.entryStartTime | formatDate}}</span> <span style="padding-right:24px">{{competitionE.entryStartTimeHHmm}}</span> 至 <span>{{competitionE.entryEndTime | formatDate}}</span> <span>{{competitionE.entryEndTimeHHmm}}</span> </font>
      <!-- <button v-if="competitionE.btntype===1" @click="RoomMegUpshowclick">房间信息确认</button>
      <button style="background-color:#333333;color:#8d8c8d" v-else>房间信息确认</button> -->
    </div>
    <div class="TimeSigningUp time-singin-btn">
      <font>入场时间：<span>{{StageGroupDetalis.enterTime | formatDate}}</span> <span style="padding-right:24px">{{StageGroupDetalis.enterTime | datetime}}</span></font>
    </div>

    <div class="TimeSigningUp time-singin-btn">
      <font>比赛时间：<span>{{StageGroupDetalis.startTime | formatDate}}</span> <span style="padding-right:24px">{{StageGroupDetalis.startTime | datetime}}</span></font>
    </div>
    <div class="TimeSigningUp time-singin-btn">
      <font>房间名称：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{StageGroupDetalis.name}}</font>
    </div>
    <div class="TimeSigningUp time-singin-btn">
      <font>房间密码：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{StageGroupDetalis.password}}</font>
    </div>

    <div v-show="competitionE.type==0" @click="isShowrewardselect=!isShowrewardselect" class="CompetitionStage kindstyle">
      <font>赛事描述</font>
      <transition name="fade">
        <div v-show="isShowrewardselect" class="kindsOfdescription">
          <p>{{competitionE.description}}</p>
        </div>
      </transition>
    </div>

    <div v-show="competitionE.type==0" @click="ruleDescription=!ruleDescription" class="CompetitionStage kindstyle">
      <font>规则描述</font>
      <transition name="fade">
        <div v-show="ruleDescription" class="kindsOfdescription">
          <p>{{competitionE.ruleDescription}}</p>
        </div>
      </transition>
    </div>

    <div v-show="competitionE.type==1">
      <div class="TimeSigningUp">
        <font>赛事模式：<span>普通模式</span> </font>
      </div>
      <!-- <div class="TimeSigningUp">
        <font>奖励摘要：<span>{{competitionE.rewardDescription}}</span> </font>
      </div> -->

      <div v-show="competitionE.type==0" @click="isShowstageselect=!isShowstageselect" class="CompetitionStage">
        <font>赛事阶段</font>
        <transition name="fade">
          <div v-show="isShowstageselect" class="CompetitionStageselect">
            <div class="stageSelect_cont">
              <ul>
                <li v-for="(stageslist,idx) in competitionE.stages" :key='idx'>
                  <div class="Select_cont_li">
                    <span>{{stageslist.name}}</span>
                    <p>参赛数量上限 &nbsp; <span>{{stageslist.competitorLimit}}</span>&nbsp; <span>{{competitionE.entryUnit==1?'人':'队'}}</span> </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </transition>
      </div>

      <div v-show="competitionE.type==0" @click="isShowrewardselect=!isShowrewardselect" class="CompetitionStage kindstyle">
        <font>奖励描述</font>
        <transition name="fade">
          <div v-show="isShowrewardselect" class="kindsOfdescription">
            <p>{{competitionE.rewardSummary}}</p>
          </div>
        </transition>
      </div>

      <div v-show="competitionE.type==1" @click="ruleDescription=!ruleDescription" class="CompetitionStage kindstyle">
        <font>奖励描述</font>
        <transition name="fade">
          <div v-show="ruleDescription" class="kindsOfdescription">
            <p v-for="(item,idx) in competitionE.rewardRules[0].description">{{item}}</p>
          </div>
        </transition>
      </div>

      <div v-show="competitionE.type==1" @click="gameDescription=!gameDescription" class="CompetitionStage kindstyle">
        <font>赛事描述</font>
        <transition name="fade">
          <div v-show="gameDescription" class="kindsOfdescription">
            <p>{{competitionE.description}}</p>
          </div>
        </transition>
      </div>
    </div>
    <RoomMegUp v-model="RoomMegUpshow" :StageId="StageId" :stageCompetitors="stageCompetitors" />
  </div>
</template>

<script>
import { formatDate } from '../../../common/date.js'
import RoomMegUp from "@/components/Popup/RoomMegUp"
export default {
  name: 'BaseInfo',
  props: {
    competition: Object,
  },
  components: {
    RoomMegUp
  },
  data () {
    return {
      liConHeight: 50,
      competitionE: undefined,
      isShowstageselect: true, // 赛事阶段下拉
      isShowrewardselect: true, // 奖励摘要下拉
      ruleDescription: true,     // 规则描述
      gameDescription: true,     // 赛事描述
      gameName: '',
      gameOptions: {
        manyPerson: "TPP",
        challenge: "SOLO",
        gameType: "普通模式"
      },
      entryMoney: 50,
      gameTime: {
        entryStartdate: "2018-12-31",
        entryStarttime: '23:23',
        entryEnddate: "2018-12-31",
        entryEndtime: '23:23'
      },
      entryUnitstate: 1,
      RoomMegUpshow: false,
      stageCompetitors: undefined,
      StageId: "",
      StageGroupDetalis: {}
    }
  },
  filters: {
    formatDate (time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd');
    },
    datetime (time) {
      var date = new Date(time);
      return formatDate(date, 'hh:mm');
    }
  },
  computed: {
  },
  watch: {
    competition () {
      this.refresh()
    }
  },
  mounted () {
    this.refresh()
    //  console.log(res)/
  },
  methods: {
    fDateTime (v) { return this.$options.filters['datetime'](v) },
    fFormatDate (v) { return this.$options.filters['formatDate'](v) },
    refresh () {
      if (this.competition.id) {
        const url = `/api/MCompetition/${this.competition.id}/Detail`
        this.$fetch(url).then((res) => {
          if (res.code == 0) {
            console.log(res.data)
            res.data.id = this.competition.id
            res.data.gameMode = JSON.parse(res.data.gameMode)
            res.data.entryStartTime = res.data.entryStartTime
            res.data.entryStartTimeHHmm = this.fDateTime(res.data.entryStartTime)
            res.data.entryEndTime = res.data.entryEndTime
            res.data.entryEndTimeHHmm = this.fDateTime(res.data.entryEndTime)
            res.data.rewardRules[0].description = res.data.rewardRules[0].description.split(',')
            const nowDate = new Date()
            const entryEndDateTimeHHmm = new Date(res.data.entryEndTime).getTime()
            console.log(nowDate.getTime(), entryEndDateTimeHHmm)
            if (nowDate.getTime() >= entryEndDateTimeHHmm) {
              res.data.btntype = 1
            } else {
              res.data.btntype = 0
            }
            res.data.stages.sort((a, b) => {
              return b - a
            })
            this.competitionE = res.data
            console.log(this.competitionE)
            this.getSatgeDetalis(this.competitionE.stages[0].id)
          }
        })
      } else {
        const entryStartTime = new Date()
        const entryEndTime = new Date().setDate(new Date().getDate() + 1)
        this.competitionE = {
          gameID: this.$store.state.other.selectedGame.id,
          state: 1,
          entryCost: 0,
          entryUnit: 1,
          name: '',
          gameMode: {
            value: 'TPP',
            value1: 'SOLO',
            value2: '普通模式'
          },
          stages: [{ name: '决赛', competitorLimit: 100, description: '' }],
          entryStartTime: this.fFormatDate(entryStartTime),
          entryStartTimeHHmm: this.fDateTime(entryStartTime),
          entryEndTime: this.fFormatDate(entryEndTime),
          entryEndTimeHHmm: this.fDateTime(entryEndTime)
        }
      }
    },
    onEntryUnitChanged (entryUnit) {
      this.competitionE.entryUnit = entryUnit
    },
    RoomMegUpshowclick () {
      this.RoomMegUpshow = !this.RoomMegUpshow
      this.refreshs()
    },
    refreshs () {
      this.StageId = this.competitionE.stages[0].id
      const url = `/api/MCompetitionStage/${this.competitionE.stages[0].id}/Competitors`
      this.$fetch(url).then((res) => {
        if (res.code == 0) {
          console.log(res)
          const stageCompetitors = []
          res.data.forEach(stageCompetitor => {
            console.log(stageCompetitor)
            stageCompetitors.push(stageCompetitor)
          });
          this.stageCompetitors = stageCompetitors
        }
      })
    },
    // 获取阶段详细
    getSatgeDetalis (stageId) {
      const url = `/api/MCompetitionStage/${stageId}/Detail`
      this.$fetch(url).then((res) => {
        if (res.code == 0) {
          console.log(res)
          this.getSatgeGroupDetalis(res.data.groups[0].id)
        }
      })
    },
    // 获取小组赛事详情
    getSatgeGroupDetalis (groupID) {
      const url = `/api/MCompetitionGroup/${groupID}/Detail`
      this.$fetch(url).then((res) => {
        if (res.code == 0) {
          console.log(res)
          this.StageGroupDetalis = res.data.matches[0]
        }
      })
    }
  },
}
</script>

<style lang="less" scoped>
/* 赛事名称 */
input::input-placeholder {
  color: #8d8c8d;
}
#base-info .shaishiName font {
  margin-top: 32px;
  display: block;
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  color: #8d8c8d;
}
#base-info .shaishiName span {
  font-size: 14px;
  color: #8d8c8d;
  padding-left: 24px;
}
#base-info .shaishiName input:focus {
  border: solid 1px #8d8c8d;
}
/* 模式选择 */
#base-info .gameMode font {
  margin-top: 2px;
  display: block;
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #8d8c8d;
}
#base-info .gameMode span {
  font-size: 13px;
  letter-spacing: 1px;
  color: #8d8c8d;
  padding-left: 24px;
}

/* 收费模式 */
#base-info .ChargingMode font {
  margin-top: 2px;
  display: block;
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #8d8c8d;
}
#base-info .ChargingMode span {
  color: #8d8c8d;
  font-size: 14px;
  padding-left: 24px;
}
#base-info .TimeSigningUp {
  width: 100%;
  height: 22px;
}
/* 报名时间 */
#base-info .TimeSigningUp font {
  margin-top: 2px;
  display: block;
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #8d8c8d;
  float: left;
}
#base-info .TimeSigningUp span {
  padding-left: 24px;
}
/* 赛事模式 */
#base-info .EventModel font {
  margin-top: 32px;
  display: block;
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #8d8c8d;
}
/* 赛事阶段 */
#base-info .CompetitionStage {
  width: 840px;
  min-height: 40px;
  background-color: #181818;
  border: solid 1px #333333;
  margin-top: 16px !important;
  text-align: center;
}
#base-info .CompetitionStage font {
  line-height: 40px;
  font-size: 14px;
  color: #8d8c8d;
  cursor: pointer;
}
#base-info .CompetitionStageselect {
  width: 838px;
  /* height: 166px; */
  background-color: #181818;
  border-top: solid 1px #333333;
}
.fade-enter-active {
  animation: max-height 0.1s;
}
.fade-leave-active {
  animation: max-height 0.1s reverse;
}
@keyframes max-height {
  0% {
    height: 0px;
  }
  100% {
    height: 166px;
  }
}
.stageSelect_cont {
  width: 808px;
  height: 134px;
  margin: 16px auto;
  overflow: auto;
}
#base-info .stageSelect_cont::-webkit-scrollbar {
  display: none;
}
.stageSelect_cont li {
  display: inline-block;
  width: 808px;
  height: 32px;
  background-color: #333333;
  margin-bottom: 2px;
  color: #8d8c8d;
  font-size: 14px;
}
.Select_cont_li {
  width: 776px;
  height: 16px;
  line-height: 16px;
  margin: 8px auto;
  display: flex;
  justify-content: space-between;
}
.Select_cont_li p {
  margin: 0;
}
.Select_cont_li p span {
  display: inline-block;
  width: 34px;
  height: 16px;
  text-align: right;
}
/* 各类描述 */
.kindstyle {
  margin-top: 8px !important;
}
.kindsOfdescription {
  width: 838px;
  height: 115px;
  background-color: #181818;
  border-top: solid 1px #333333;
  overflow: auto;
}
.kindsOfdescription::-webkit-scrollbar {
  display: none;
}
.fade-enter-active {
  animation: max-height 0.1s;
}
.fade-leave-active {
  animation: max-height 0.1s reverse;
}
@keyframes max-height {
  0% {
    height: 0px;
  }
  100% {
    height: 115px;
  }
}
.kindsOfdescription p {
  width: 808px;
  min-height: 20px;
  margin: 8px auto;
  text-align: left;
  color: #8d8c8d;
  font-size: 14px;
  word-wrap: break-word;
}
.kindsOfdescription p::-webkit-scrollbar {
  display: none;
}
.time-singin-btn {
  button {
    width: 120px;
    height: 30px;
    background-color: #7800ff;
    outline: none;
    border: 0;
    color: #ffffff;
    float: right;
  }
}
</style>