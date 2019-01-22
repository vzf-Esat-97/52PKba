<template>
  <!-- 赛事概况 -->
  <div class="gameCase">
    <!-- 占位 -->
    <div style="height:30px;"></div>
    <!-- 内容 -->
    <div v-if="competitionE" class="gameCase_cont">
      <div class="case_Name">
        <p>{{competitionE.name}}</p>
        <span>创建时间：{{competitionE.ct | formatDate}}</span>
      </div>
      <div class="gameCase_text">
        <!-- 选项卡切换 -->
        <div class="gameC_nav">
          <ul>
            <li @click="selectedTabIndex=0" :class="{textClass:selectedTabIndex===0}">
              赛事描述
              <div :class="{bordeClass:selectedTabIndex===0}" class="listLine"></div>
            </li>
            <!-- <li @click="selectedTabIndex=1" :class="{textClass:selectedTabIndex===1}">
                            规则描述
                            <div :class="{bordeClass:selectedTabIndex===1}" class="listLine"></div>
                        </li> -->
            <li @click="selectedTabIndex=2" :class="{textClass:selectedTabIndex===2}">
              奖励描述
              <div :class="{bordeClass:selectedTabIndex===2}" class="listLine"></div>
            </li>
            <!-- <li @click="selectedTabIndex=3" :class="{textClass:selectedTabIndex===3}">
                            阶段描述
                            <div :class="{bordeClass:selectedTabIndex===3}" class="listLine"></div>
                        </li> -->
          </ul>
        </div>
        <div class="contText">
          <div v-show="selectedTabIndex===0">
            <span>报名模式：{{competitionE.entryUnit===1?'个人':'战队'}}</span>
            <span>报名费用：{{competitionE.entryCost}}PK币</span>
            <span>游戏模式：{{competitionE.gameMode.value}}-{{competitionE.gameMode.value1}} {{competitionE.gameMode.value2}} {{competitionE.gameMode.value3}}</span>
            <span>入场时间：{{competition.currentStage.allMatches[0].enterTime|date}}</span>
            <span>比赛时间：{{competition.currentStage.allMatches[0].startTime|date}}</span>
            <span v-if="competition.currentStage.careMatches[0]">房间名称：{{competition.currentStage.careMatches[0].name}}</span>
            <span v-if="competition.currentStage.careMatches[0]">房间密码：{{competition.currentStage.careMatches[0].password}}</span>
            <div class="main-context" style="padding-top:16px;margin:0">
              {{competitionE.description}}
            </div>
          </div>
          <p v-show="selectedTabIndex===1">{{competitionE.ruleDescription}}</p>
          <p v-show="selectedTabIndex===2" v-for="(item,idx) in competitionE.rewardRules[0].description">{{item}}</p>
          <div v-show="selectedTabIndex===3">
            <p v-for="(stagesitem,idx) in competitionE.stages" :key="idx">
              {{stagesitem.name}}阶段&nbsp;参赛数量上限{{stagesitem.competitorLimit}}人
            </p>
          </div>
        </div>
      </div>
      <div class="footerBtn">
        <div class="gobackclass" @click="goback">返回</div>
        <!-- <button>已报名</button> -->
        <div class="loginBtnState" style="background:none">
          <CompetitionOP :competition='competitionE' />
        </div>
        <span>报名时间：{{competitionE.entryStartTime | formatDate}} ~ {{competitionE.entryEndTime | formatDate}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { formatDate } from '../../../common/date.js'; // 时间格式化
import CompetitionOP from '@/components/_Common/Competition/CompetitionOP'
export default {
  name: 'Competition',
  props: {
    competition: Object
  },
  components: {
    CompetitionOP
  },
  data () {
    return {
      competitionE: undefined,
      selectedTabIndex: 0//选中的导航索引
    }
  },
  filters: {
    formatDate (time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  computed: {

  },
  watch: {
    competition () {
      this.refresh()
      console.log(this.competition)
    }
  },
  mounted () {
    this.refresh()
    console.log(this.competition)
  },
  methods: {
    refresh () {
      console.log(123132)
      if (!this.competition) return
      const url = `/api/Competition/${this.competition.id}/Detail`
      this.$fetch(url).then(res => {
        if (res.code === 0) {
          console.log(res)
          const competitionE = res.data
          // res.data.stages.forEach(element => {
          //     this.GetStage(element.id)
          // });
          if (competitionE.gameMode != '?') {
            competitionE.gameMode = JSON.parse(competitionE.gameMode);
          }
          competitionE.entryStartTime = new Date(competitionE.entryStartTime)
          competitionE.entryEndTime = new Date(competitionE.entryEndTime)
          competitionE.rewardRules[0].description = competitionE.rewardRules[0].description.split(',')
          const nowdate = new Date();
          const startTime = new Date(competitionE.entryStartTime);
          const endTime = new Date(competitionE.entryEndTime);
          this.competitionE = competitionE
          this.competition.currentStage = res.data.currentStage
          console.log(this.competitionE)
        }
      });
    },
    // 获取阶段详情
    GetStage (stagesid) {
      const url = `/api/CompetitionStage/${stagesid}/Groups`
      this.$fetch(url).then((res) => {
        if (res.code === 0) {

        }
      })
    },
    // 返回
    goback () {
      this.$emit('goback')
    }
  }
}
</script>
<style scoped>
.gameCase {
  width: 945px;
  height: 720px;
  background-color: #1e1e1e;
}
.gameCase_cont {
  width: 849px;
  height: 658px;
  margin: auto;
}
.case_Name {
  width: 849px;
  height: 46px;
  color: #8d8c8d;
  margin-bottom: 56px;
}
.case_Name p {
  font-size: 18px;
  margin-bottom: 5px;
}
.case_Name span {
  font-size: 12px;
}
/* 主体内容 */
.gameCase_text {
  width: 849px;
  height: 488px;
}
.gameC_nav {
  width: 100%;
  height: 30px;
  border-bottom: 1px solid #333333;
}
.gameC_nav li {
  display: block;
  list-style: none;
  float: left;
  padding-right: 48px;
  cursor: pointer;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #8d8c8d;
  position: relative;
}
.gameC_nav li:hover {
  color: #ffffff;
}
.listLine {
  width: 20px;
  height: 3px;
  background-color: #7800ff;
  position: absolute;
  top: 26px;
  left: 18px;
  display: none;
}
.gameC_nav li:hover .listLine {
  display: block;
}
.textClass {
  color: #ffffff;
}
.bordeClass {
  display: block;
}
.contText {
  width: 100%;
  height: 457px;
  padding: 20px 0;
  color: #8d8c8d;
  font-size: 14px;
  border-bottom: 1px solid #333333;
}
.contText span {
  display: block;
  padding-bottom: 8px;
}
.main-context {
  width: 100%;
  word-wrap: break-word;
  word-break: break-all;
  /* display: block; */
}
.footerBtn {
  width: 100%;
  height: 30px;
  margin-top: 41px;
}
.footerBtn button {
  float: left;
  width: 80px;
  height: 28px;
  background-color: #7800ff;
  outline: none;
  border: none;
  color: #ffffff;
  margin: 0;
}
.footerBtn span {
  /* float: left; */
  line-height: 44px;
  color: #8d8c8d;
  padding-left: 16px;
}
.footerBtn button {
}
.gobackclass {
  width: 80px;
  height: 28px;
  background-color: #7800ff;
  float: left;
  margin-right: 24px;
  cursor: pointer;
  font-size: 14px;
  color: #ffffff;
  text-indent: 24px;
  line-height: 28px;
  letter-spacing: 6px;
}
.loginBtnState {
  width: 80px;
  height: 28px;
  float: left;
  font-size: 14px;
  color: #ffffff;
}
</style>