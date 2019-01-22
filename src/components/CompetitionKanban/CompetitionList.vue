<template>
  <div class="competition-list">
    <div class="myrecommend_Cont">
      <!-- 下拉选择框 -->
      <div class="myrecommend_head">
        <!-- <div class="gameMode">
                    <el-select placeholder="请选择" v-model="selectedGameMode">
                        <el-option v-for="item in gameModeOptions" :key="item.value" :label="item.label" :value="item.label">
                        </el-option>
                    </el-select>
                </div> -->
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
                </div> -->
      </div>
      <!--列表框-->
      <div class="mycomLatiolist">
        <div class="mycomLation_listone">
          <div v-for="(competition,idx) in competitions" :key="idx" @mouseenter="location(idx)" @mouseleave="scleaveLocation()" class="myrecommend_list">
            <div @click="selectCompetition(competition)">
              <div class="room-name">
                <p>{{competition.name.length>12?competition.name.substring(0,11)+`...`:competition.name}}</p>
                <span>{{competition.gameMode.value}}_{{competition.gameMode.value1}}</span> <span>{{competition.gameMode.value2}}</span>
              </div>
              <div class="entry-time-div">
                <p>报名时间：{{competition.entryStartTime|formatDate}}~{{competition.entryEndTime|formatDate}}</p>
                <p>比赛入场：{{competition.currentStage.allMatches[0].enterTime|formatDate}}~{{competition.currentStage.allMatches[0].startTime|formatDate}}</p>
              </div>
              <div class="peoples">
                <div class="peoples_l">
                  {{competition.entryUnit===1?'人数':'战队'}}：<span>{{competition.currentStage.competitorsCount}}</span>/{{competition.currentStage.maxCompetitorLimit}}
                </div>
                <div class="peoples_r">
                  <!-- 奖励：{{competition.rewardDescription.length>10?competition.rewardDescription.substring(0,10)+`...`:competition.rewardDescription.length}} -->
                  地图：{{competition.gameMode.value3}}
                </div>
              </div>
            </div>
            <!-- 右边操作 -->
            <div class="competition-op">
              <div style="width:80px;hieght:28px;margin:15px auto;">
                <CompetitionOP :competition="competition" :myOrganization="myOrganization" />
              </div>
            </div>
            <div v-show="isteamMsgup==idx" id="teamMsgupId" class="team_Msg_up">
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
        </div>
        <!-- 翻页 -->
        <div class="myPage">
          <el-pagination :page-size="pageRows" @current-change="refresh" background layout="prev, pager, next" :total='total' />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { formatDate } from '../../common/date.js'; // 时间格式化
import CompetitionOP from '@/components/_Common/Competition/CompetitionOP' // 操作
import registrationSuccess from '@/components/Popup/registrationSuccess' // 报名成功
export default {
  name: 'CompetitionList',
  components: {
    CompetitionOP,
    registrationSuccess,
  },
  props: {
    gameID: String
  },
  data () {
    return {
      competitions: [],
      myOrganization: undefined,
      isShowOrganizationMemberSelector: false,
      organizationMemberSelectorData: {
        competition: undefined
      },
      selectedGameMode: undefined,//选中的游戏模式
      total: 0, // 记录总条数
      pageRows: 9, // 每页显示条数
      current: 1, // 当前的页数
      isCloor: 0,
      isteamMsgup: -1,
      islassStyle: false,
      ishowUp: false,
      navData: [
        {
          name: '推荐竞赛'
        },
        {
          name: '战队竞赛'
        }
      ],
      userId: '',
      gameModeOptions: [
        {
          value: '选项1',
          label: 'TPP'
        },
        {
          value: '选项2',
          label: 'TFP'
        }
      ],
    };
  },
  filters: {
    formatDate (time) {
      var date = new Date(time);
      return formatDate(date, 'MM-dd hh:mm');
    }
  },
  computed: {},
  watch: {
    $route (to, from) {
      console.log(to, from)
    }
  },
  mounted () {
    this.refresh()
  },
  created () {
    this.refresh()
  },
  methods: {
    refresh (nowpagepage) {
      if (nowpagepage) {
        this.current = nowpagepage
      } else {
        this.current = 1
      }
      this.refreshMyOrganization()
      // 获取列表信息
      const url = `/api/Competition/${this.gameID}?pageIndex=${this.current}&pageRows=${this.pageRows}`
      this.$fetch(url).then(res => {
        if (res.code == 0) {
          if (res.data.pageData.total === 0 && res.data.lst.length != 0) {
            this.total = res.data.lst.length
          } else {
            this.total = res.data.pageData.total
          }
          const competitions = []
          res.data.lst.forEach(competition => {
            if (competition.gameMode != '?') {
              competition.gameMode = JSON.parse(competition.gameMode);
            }
            const nowdate = new Date();
            competition.entryStartTime = new Date(competition.entryStartTime)
            competition.entryEndTime = new Date(competition.entryEndTime)
            competition.stages = []
            competitions.push(competition)
          });
          this.competitions = competitions;
        }
      });
    },
    refreshMyOrganization () {
      // 获取列表信息
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
    },
    // 鼠标点击位置
    location (item, idx) {
      this.isteamMsgup = idx;
    },
    scleaveLocation () {
      this.isteamMsgup = -1;
    },
    addPPeoples () {
      this.islassStyle = true;
      this.ishowUp = true;
    },
    pagechange () { },
    //选中赛事
    selectCompetition (competition) {
      this.$emit('onSelectCompetition', competition);
      console.log(competition)
    },
    // 翻页
    handleCurrentChange (page) {
      const url = `/api/Competition/${
        this.$store.state.other.selectedGame.id
        }?pageIndex=${page}&pageRows=${9}`;
      this.$fetch(url).then(res => {
        if (res.code == 0) {
          console.log(res.code.data.lst)
          res.data.lst.forEach(competition => {
            if (competition.gameMode != '?') {
              competition.gameMode = JSON.parse(competition.gameMode);
            }
            const nowtime = new Date();
            competition.entryStartTime = new Date(competition.entryStartTime);
            competition.entryEndTime = new Date(competition.entryEndTime);
            if (nowtime - competition.entryEndTime <= 0) {
              competition.btnstate = 1;
            } else {
              competition.btnstate = 0;
            }
            return;
            return;
          });
          this.competitions = res.data.lst;
        }
        console.log(res.data);
      });
    }
  }
};
</script>
<style scoped>
.competition-op {
  width: 128px;
  height: 58px;
  float: left;
  border-left: 1px solid #333333;
  cursor: pointer;
}
.competition-list p {
  margin: 0;
}
.myrecommend_Cont {
  width: 856px;
  height: 720px;
  margin: auto;
}
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

.mycomLatiolist {
  width: 856px;
  height: 654px;
}
.mycomLation_listone {
  width: 856px;
  height: 612px;
  overflow: auto;
}
.mycomLation_listone::-webkit-scrollbar {
  display: none;
}
.myPage {
  width: 856px;
  height: 32px;
  padding-top: 10px;
}

.myrecommend_list {
  width: 856px;
  margin-bottom: 8px;
  height: 60px;
  background-color: #181818;
  border: solid 1px #252525;
  position: relative;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}
.myrecommend_list:hover {
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
.entry-time-div {
  width: 240px;
  height: 58px;
  float: left;
  font-size: 14px;
  line-height: 58px;
  text-align: left;
  color: #8d8c8d;
}
.entry-time-div p {
  height: 24px;
  line-height: 34px;
}
.peoples {
  width: 286px;
  height: 58px;
  float: left;
}
.peoples_l {
  width: 110px;
  height: 58px;
  line-height: 58px;
  float: left;
  font-size: 14px;
  color: #8d8c8d;
  text-align: left;
  margin-left: 30px;
}
/* .peoples_l span {
  color: #ffffff;
} */
.peoples_r {
  width: 122px;
  height: 58px;
  line-height: 58px;
  float: left;
  font-size: 14px;
  color: #8d8c8d;
  text-align: left;
  margin-left: 24px;
}
.chioceBtn button {
  border: 0;
  outline: none;
  width: 80px;
  height: 28px;
  background-color: #7800ff;
  color: #ffffff;
  font-size: 14px;
  margin: 15px 23px;
}
.team_Msg_up {
  width: 240px;
  min-height: 184px;
  background-color: #121212;
  border: solid 1px #4c4c4c;
  position: absolute;
  top: 59px;
  left: 615px;
  animation: move 0.1s;
  z-index: 99;
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
  background-image: none;
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
.myrecommend_list:hover .peoples_r {
  color: #ffffff;
}
.myrecommend_list:hover .peoples_l span {
  color: #ffffff;
}
.myrecommend_list:hover .entry-time-div {
  color: #ffffff;
}
.myrecommend_list:hover .room-name {
  color: #ffffff;
}
.myrecommend_list:hover .room-name p {
  color: #ffffff;
}

/* 模式选择 */
.myrecommend_head .gameMode font {
  margin-top: 32px;
  display: block;
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #8d8c8d;
}
.myrecommend_head .gameMode .el-select {
  width: 120px;
  height: 24px;
}
.myrecommend_head .gameMode .el-input {
  height: 24px;
  background-color: #181818;
}
.myrecommend_head .gameMode input::placeholder {
  color: #8d8c8d;
}
.myrecommend_head .gameMode input {
  height: 24px;
  background-color: #181818;
  border: solid 1px #333333;
  border-radius: 2px;
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #8d8c8d;
}
.myrecommend_head .gameMode .el-select {
  margin-top: 8px;
  margin-right: 32px;
}
.myrecommend_head .gameMode .el-input__icon {
  line-height: 24px;
}
.myrecommend_head .gameMode .el-select .el-input.is-focus .el-input__inner  {
  border-color: #409eff;
}
</style>
<style>
.el-pagination {
  text-align: center;
}
.el-pagination.is-background .btn-prev {
  background-color: #181818;
}
.el-pagination.is-background .btn-next {
  background-color: #181818;
}
.el-pagination.is-background .el-pager li {
  background-color: #181818;
  font-weight: normal;
  font-size: 12px;
  max-width: 30px;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #333;
  border: 1px solid #8d8c8d;
}
.el-pagination.is-background .el-pager li:hover {
  background-color: #333;
  border: 1px solid #8d8c8d;
}
.el-pagination.is-background .el-pager li:not(.disabled):hover {
  color: white;
}
</style>