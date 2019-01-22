<template>
  <div v-if="competitionE" class="edit">
    <div v-show="!RuleDescriptionShow">
      <div class="shaishiName">
        <font>赛事名称:</font>
        <input v-model="competitionE.name" maxlength="15" type="text" placeholder="请输入赛事名称">
      </div>
      <div class="game-mode">
        <font>游戏模式:</font>
        <el-select v-model="competitionE.gameMode.value" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label">
          </el-option>
        </el-select>
        <el-select v-model="competitionE.gameMode.value1" placeholder="请选择">
          <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.label">
          </el-option>
        </el-select>
        <el-select v-model="competitionE.gameMode.value2" placeholder="请选择">
          <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.label">
          </el-option>
        </el-select>
        <el-select v-model="competitionE.gameMode.value3" placeholder="请选择">
          <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.label">
          </el-option>
        </el-select>
      </div>
      <div class="ChargingMode">
        <font>参赛者报名费（PK币）:</font>
        <div class="room-pwd">
          <input v-model="competitionE.entryCost" type="number" maxlength="6">
        </div>
        <!-- <el-select v-model="competitionE.entryCost" placeholder="请选择">
                <el-option v-for="entryCostOption in entryCostOptions" :key="entryCostOption.value" :label="entryCostOption.label" :value="entryCostOption.label">
                </el-option>
            </el-select> -->
        <!-- <div class="other">
                <font>其他：</font>
                <input type="text">
                <font>PK币</font>
            </div> -->
      </div>
      <div class="TimeSigningUp">
        <font>报名时间:</font>
        <!-- <el-select v-model="value4" placeholder="请选择">
                <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select> -->
        <div class="shijian">
          <el-date-picker v-model="competitionE.entryStartTime" type="date" placeholder="选择日期">
          </el-date-picker>
          <el-time-select v-model="competitionE.entryStartTimeHHmm" :picker-options="{start: '00:00',step: '00:05', end: '24:00'}" placeholder="选择时间">
          </el-time-select>
          <font>至</font>
          <el-date-picker v-model="competitionE.entryEndTime" type="date" placeholder="选择日期" style="margin-left: 30px;">
          </el-date-picker>
          <el-time-select v-model="competitionE.entryEndTimeHHmm" :picker-options="{start: '00:00',step: '00:05', end: '24:00'}" placeholder="选择时间" style="margin-right: 0px;">
          </el-time-select>
        </div>
      </div>
      <!-- 以下是房间信息 -->
      <div class="TimeSigningUp">
        <font>入场时间:</font>
        <div class="shijian">
          <el-date-picker v-model="RoomMsgData.JoinDate" type="date" placeholder="选择日期">
          </el-date-picker>
          <el-time-select v-model="RoomMsgData.RoomJoinTime" :picker-options="{start: '00:00',step: '00:05', end: '24:00'}" placeholder="选择时间">
          </el-time-select>
        </div>
      </div>

      <div class="TimeSigningUp">
        <font>比赛时间:</font>
        <div class="shijian">
          <el-date-picker v-model="RoomMsgData.GameDate" type="date" placeholder="选择日期">
          </el-date-picker>
          <el-time-select v-model="RoomMsgData.RoomGameTime" :picker-options="{start: '00:00',step: '00:05', end: '24:00'}" placeholder="选择时间">
          </el-time-select>
        </div>
      </div>
      <div class="TimeSigningUp gbs_box1">
        <font>房间名称:</font>
        <div class="shijian">
          <input v-model="RoomMsgData.RoomName" type="text" value="" maxlength="15">
        </div>
        <font>房间密码:</font>
        <div class="shijian">
          <input v-model="RoomMsgData.RoomPwd" type="text" maxlength="6">
        </div>
      </div>

      <div v-show="isonCreatedType!=2" class="ChargingMode">
        <font>下限人数：</font>
        <div class="room-pwd lowernumber">
          <input v-model="minCompetitorLimit" type="number" maxlength="6">
        </div>
        <div class="lowernumber-type lowernumber-text">
          <el-select v-model="entryUnitE">
            <el-option v-for="entryUnitOption in entryUnitOptions" :key="entryUnitOption.value" :value="entryUnitOption.value" :label="entryUnitOption.label">
            </el-option>
          </el-select>
        </div>
        <div class="Registration-instructions">
          <span>*如报名人数未达到下限人数，则赛事不成功，将退回所有参赛人员报名费</span>
        </div>
      </div>

      <div v-if="isonCreatedType===2" class="EventModel">
        <font>赛事模式:</font>
        <el-select v-model="value5" placeholder="请选择">
          <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <!-- <el-select v-model="value1" placeholder="请选择">
                <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select> -->
      </div>
      <div v-show="isonCreatedType===2" class="CompetitionStage">
        <font>赛事阶段:</font>
        <div class="CompetitionStageList">
          <CompetitionBaseInfoStageList v-if="competitionE.stages" :entryUnit="competitionE.entryUnit" :stages="competitionE.stages" @onEntryUnitChanged="onEntryUnitChanged" />
        </div>
      </div>
      <div v-show="isonCreatedType===2" class="RewardDescription">
        <font>奖励描述:</font>
        <textarea v-model="competitionE.rewardSummary" name="" id="" class="RewardDescriptionList"></textarea>
      </div>
      <div v-show="isonCreatedType===2" class="RewardThe">
        <font>奖励摘要:</font>
        <textarea v-model="competitionE.rewardDescription" name="" id="" class="RewardTheList"></textarea>
      </div>
      <div v-show="isonCreatedType===2" class="RuleDescription">
        <font>规则描述:</font>
        <textarea v-model="competitionE.ruleDescription" name="" id="" class="RuleDescriptionList"></textarea>
      </div>
      <div class="GameDescription">
        <font>比赛描述:</font>
        <textarea v-model="CompetitionDescription" name="" id="" class="GameDescriptionList"></textarea>
      </div>
      <button v-if="competitionE.id&&isonCreatedType===2" class="createdGamestyle" @click="revisionGame()">创建赛事</button>
      <button v-else-if="competitionE.id!=1 && isonCreatedType===2" class="createdGamestyle" @click="createGame()">创建赛事</button>
      <button v-else @click="nextStep" class="createdGamestyle">下一步</button>
      <!-- 确认是否发布 -->
      <el-dialog class="closeDiv competition-publish" :visible.sync="publishSure" width="380px">
        <div class="expectDiv">
          <span>{{publishGame}}</span>
          <div class="sureBtndiv" @click="publishSureclick">确认</div>
        </div>
      </el-dialog>
    </div>
    <RuleDescription v-show="RuleDescriptionShow" :RoomMsgData="RoomMsgData" :CreatdMath='isCreatdMath' @ChangeCreatedType="ChangeCreatedType" />
  </div>
</template>

<script>
import { formatDate } from '../../../common/date.js'
import CompetitionBaseInfoStageList from './CompetitionBaseInfoStageList'
import RuleDescription from './RuleDescription'
export default {
  name: 'Edit',
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
  props: {
    gameID: String,
    competition: Object,
    isonCreatedType: {
      type: Number,
      default () {
        return 2
      }
    }
  },
  components: {
    CompetitionBaseInfoStageList,
    RuleDescription
  },
  data () {
    return {
      RuleDescriptionShow: false,
      competitionE: undefined,
      publishSure: false,
      gameName: '',
      // 游戏模式
      options: [
        {
          value: '选项1',
          label: 'TPP'
        },
        {
          value: '选项2',
          label: 'FPP'
        }
      ],
      options1: [
        {
          value: '选项1',
          label: 'SOLO'
        },
        {
          value: '选项2',
          label: 'DUO'
        },
        {
          value: '选项3',
          label: 'SQUAD'
        }
      ],
      options2: [{
        value: '选项1',
        label: '普通模式'
      }],

      options3: [
        {
          value: '选项1',
          label: '艾伦格'
        },
        {
          value: '选项2',
          label: '米拉玛'
        },
        {
          value: '选项3',
          label: '萨诺'
        },
        {
          value: '选项4',
          label: '维寒迪'
        }
      ],

      // 收费模式
      value4: '',
      entryCostOptions: [
        {
          value: '选项0',
          label: '0'
        },
        {
          value: '选项1',
          label: '2'
        },
        {
          value: '选项2',
          label: '5'
        },
        {
          value: '选项3',
          label: '10'
        },
        {
          value: '选项4',
          label: '50'
        }
      ],
      options5: [
        {
          value: '选项1',
          label: '晋级模式'
        },
        {
          value: '选项2',
          label: '非晋级模式'
        }
      ],
      value5: '',
      publishGame: '确认发布?',
      entryUnitstate: 1,
      entryUnitOptions: [{
        value: 1,
        label: '个/人'
      }],
      entryUnitE: 1,
      minCompetitorLimit: undefined,
      CompetitionDescription: '', // 比赛描述
      isCreatdMath: undefined,
      RoomMsgData: {
        RoomName: '',
        RoomPwd: '',
        JoinDate: new Date(),
        RoomJoinTime: formatDate(new Date(), 'hh:mm'),
        GameDate: new Date(),
        RoomGameTime: formatDate(new Date(new Date().setHours(new Date().getHours() + 1)), 'hh:mm'),
      }
    }
  },
  computed: {
  },
  watch: {
    competition () {
      this.refresh()
    },
    minCompetitorLimit (newval, oldval) {
      if (newval < 32) {
        // console.log(12312332)
      }
    },
    isonCreatedType () {
      this.RuleDescriptionShow = false
    }
  },
  mounted () {
    this.refresh()
  },
  methods: {
    fDateTime (v) { return this.$options.filters['datetime'](v) },
    fFormatDate (v) { return this.$options.filters['formatDate'](v) },
    refresh () {
      if (this.competition) {
        if (this.competition.id) {
          const url = `/api/MCompetition/${this.competition.id}/Detail`
          this.$fetch(url).then((res) => {
            if (res.code == 0) {
              const competitionE = res.data
              competitionE.id = this.competition.id
              competitionE.gameMode = JSON.parse(competitionE.gameMode)
              competitionE.entryStartTime = competitionE.entryStartTime
              competitionE.entryStartTimeHHmm = this.fDateTime(competitionE.entryStartTime)
              competitionE.entryEndTime = competitionE.entryEndTime
              competitionE.entryEndTimeHHmm = this.fDateTime(competitionE.entryEndTime)
              for (let i = 0; i < competitionE.stages.length; i++) {
                const competitionEStage = competitionE.stages[i];
                const stage = {
                  id: competitionEStage.id,
                  state: competitionEStage.state,
                  name: competitionEStage.name,
                  competitorLimit: competitionEStage.competitorLimit
                }
                if (competitionEStage.state === 1) {//阶段未确认分组
                  if (!competitionE.currentStage) competitionE.currentStage = stage
                } else if (competitionEStage.state === 2) {//阶段已确认分组
                  if (!competitionE.currentStage) competitionE.currentStage = stage
                } else if (competitionEStage.state === 3) {//阶段结束
                }
              }
              if (!competitionE.currentStage) competitionE.currentStage = competitionE.stages[competitionE.stages.length - 1]
              this.competitionE = competitionE
            }
          })
        } else {
          this.competitionE = JSON.parse(JSON.stringify(this.competition))
        }
      } else {
        const entryStartTime = new Date()
        const entryEndTime = new Date().setDate(new Date().getDate() + 1)
        this.competitionE = {
          gameID: this.gameID,
          type: 1,
          state: 1,
          entryCost: 0,
          entryUnit: 1,
          name: '',
          gameMode: {
            value: 'TPP',
            value1: 'SOLO',
            value2: '普通模式',
            value3: '艾伦格'
          },
          stages: [{ name: '决赛', competitorLimit: 100, description: this.CompetitionDescription }],
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
    // 多赛事数据
    reqData () {
      const data = {
        gameID: this.competitionE.gameID,
        gameMode: JSON.stringify(this.competitionE.gameMode),
        name: this.competitionE.name,
        type: this.competitionE.type,
        isPublic: true,
        entryUnit: this.competitionE.entryUnit,
        entryStartTime: new Date(this.fFormatDate(this.competitionE.entryStartTime) + ` ` + this.competitionE.entryStartTimeHHmm),
        entryEndTime: new Date(this.fFormatDate(this.competitionE.entryEndTime) + ` ` + this.competitionE.entryEndTimeHHmm),
        entryCost: this.competitionE.entryCost,
        rewardSummary: this.competitionE.rewardSummary,
        rewardDescription: this.competitionE.rewardDescription,
        ruleDescription: this.competitionE.ruleDescription,
        description: this.CompetitionDescription,
        stages: this.competitionE.stages
      }
      return data
      if (data.entryStartTime && data.entryEndTime && data.name && data.gameMode && this.CompetitionDescription && this.competitionE.ruleDescription && this.competitionE.rewardDescription && this.competitionE.rewardSummary) {
        return data
      } else {
        this.$message({
          message: '您的内容没有填写完整',
          type: 'warning'
        });
      }
    },
    // 创建多赛事
    createGame () {
      const data = this.reqData()
      if (data) {
        let isDataValid = true
        for (let i = 0; i < data.stages.length; i++) {
          const stage = data.stages[i]
          if (stage.competitorLimit <= 0) {
            this.$message({
              message: '参赛人数不能小于0',
              type: 'warning'
            })
            isDataValid = false
            break
          }
        }
        if (isDataValid) {
          const url = `/api/MCompetition/`
          this.$post(url, data).then((res) => {
            if (res.code == 0) {
              this.publishSure = true
              this.competitionE.id = res.data.id
              this.$emit('onCreateSuc', this.competitionE)
            }
          })
        }
      }
    },
    // 修改赛事
    revisionGame () {
      const data = this.reqData()
      if (data) {
        const url = `/api/MCompetition/${this.competitionE.id}`
        this.$put(url, data).then((res) => {
          if (res.code == 0) {
            this.publishSure = true
            this.$emit('onUpdateSuc', this.competitionE)
          }
        })
      }
    },
    // 确认发布比赛
    publishSureclick (i) {
      if (i === 1) {
        this.publishSure = false
        this.$store.commit('other/publishsuc', 1)
      } else {
        const url = `/api/MCompetition/${this.competitionE.id}/Publish`
        this.$put(url).then((res) => {
          if (res.code == 0) {
            this.publishSure = false
            this.competitionE.state = 2
            this.$emit('onUpdateSuc', this.competitionE)
            this.$message({
              message: '发布成功',
              type: 'success'
            });
            this.$store.commit('other/publishsuc', 1)
          } else {
            this.$message({
              message: res.msg,
              type: 'success'
            });
          }
        })
      }
    },
    ChangeCreatedType () {
      this.RuleDescriptionShow = false
    },
    // 创建单赛事数据
    AsingleEvent () {
      var singleGame = [   // 单赛事阶段描述
        {
          name: "比赛结果",
          maxCompetitorLimit: 100,
          minCompetitorLimit: this.minCompetitorLimit,
          description: this.CompetitionDescription
        }
      ]
      const data = {
        // gameID: this.competitionE.gameID,
        gameID: '-game1',
        gameMode: JSON.stringify(this.competitionE.gameMode),
        name: this.competitionE.name,
        type: 1,
        isPublic: true,
        entryUnit: this.entryUnitE,
        entryStartTime: new Date(this.fFormatDate(this.competitionE.entryStartTime) + ` ` + this.competitionE.entryStartTimeHHmm),
        entryEndTime: new Date(this.fFormatDate(this.competitionE.entryEndTime) + ` ` + this.competitionE.entryEndTimeHHmm),
        entryCost: this.competitionE.entryCost,
        rewardSummary: this.competitionE.rewardSummary,
        rewardDescription: this.competitionE.rewardDescription,
        ruleDescription: this.competitionE.ruleDescription,
        description: this.CompetitionDescription,
        stages: singleGame,
        admissionTime: new Date(this.fFormatDate(this.RoomMsgData.JoinDate) + ` ` + this.RoomMsgData.RoomJoinTime),
        startTime: new Date(this.fFormatDate(this.RoomMsgData.GameDate) + ` ` + this.RoomMsgData.RoomGameTime),
        RoomName: this.RoomMsgData.RoomName,
        RoomPassword: this.RoomMsgData.RoomPwd,
      }
      return data
      // if (data.entryStartTime && data.entryEndTime && data.name && data.gameMode && this.competitionE.description && this.competitionE.ruleDescription && this.competitionE.rewardDescription && this.competitionE.rewardSummary) {
      //     return data
      // } else {
      //     this.$message({
      //         message: '您的内容没有填写完整',
      //         type: 'warning'
      //     });
      // }
    },
    // 下一步
    nextStep () {
      const data = this.AsingleEvent()
      if (data && this.competitionE.name) {
        this.isCreatdMath = data
        console.log(this.isCreatdMath)
        this.RuleDescriptionShow = !this.RuleDescriptionShow
      } else {
        this.$message({
          message: '您的内容没有填写完整',
          type: 'warning'
        });
      }
    },
  },
}
</script>
<style>
.edit .el-select {
  width: 120px;
  height: 24px;
}
.edit .el-input {
  height: 24px;
  background-color: #181818;
}

.edit .el-input__inner {
  height: 24px;
  line-height: 24px;
  /* text-align: center; */
  border: solid 1px #333333;
  border-radius: 2px;
  background-color: #181818;
}

.edit .shijian .el-date-editor.el-input,
.edit .el-date-editor.el-input__inner {
  width: 120px;
  margin-right: 32px;
}
.edit .shijian .el-input--prefix .el-input__inner {
  padding-left: 0px;
  padding-right: 0px;
}
.edit .shijian .el-input__inner {
  height: 24px;
  line-height: 24px;
  text-align: center;
  border: solid 1px #333333;
  border-radius: 2px;
  background-color: #181818;
}
.edit .shijian .el-input__icon {
  display: none;
}
.edit .game-mode .el-select {
  margin-top: 8px;
  margin-right: 32px;
}
.edit .game-mode .el-input__icon {
  line-height: 24px;
}
.edit .ChargingMode .el-input__icon {
  line-height: 24px;
}
.edit .ChargingMode .el-select {
  width: 120px;
  height: 24px;
  margin-top: 8px;
  margin-right: 32px;
}
.edit .ChargingMode .el-input {
  height: 24px;
  background-color: #181818;
}
.edit .TimeSigningUp .el-select {
  width: 120px;
  height: 24px;
}
.edit .TimeSigningUp .el-input {
  height: 24px;
  background-color: #181818;
}
.edit .TimeSigningUp .el-select {
  margin-top: 8px;
  margin-right: 32px;
}
.edit .TimeSigningUp .el-input__icon {
  line-height: 24px;
}
.edit .EventModel .el-select {
  margin-top: 8px;
  margin-right: 32px;
}
.edit .EventModel .el-input__icon {
  line-height: 24px;
}
.edit .EventModel .el-select {
  width: 120px;
  height: 24px;
}
.edit .EventModel .el-input {
  height: 24px;
  background-color: #181818;
}

/* 列表的背景 */
.edit .el-scrollbar {
  background-color: #181818;
  color: #ffffff;
}
.edit .el-date-table th {
  border-bottom: solid 1px #333333;
}

.edit .competition-publish .el-dialog__header {
  padding: 0;
  height: 0;
}
.edit .competition-publish .el-dialog__headerbtn {
  top: 10px;
  right: 10px;
  width: 0px;
  height: 0px;
  color: #ffffff;
  font-family: SourceHanSansCN-Regular;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  padding: 0px 18px;
  margin-left: 40%;
  margin-bottom: 32px;
  outline: none;
  border: 0;
}
.edit .competition-publish .el-dialog__body {
  padding: 0;
}
.edit .el-select .el-input.is-focus .el-input__inner {
  border-color: #c0c4cc;
}
.edit .el-select .el-input__inner:focus {
  border-color: #c0c4cc;
}
.edit .lowernumber-type .el-select {
  width: 92px !important;
  margin-right: 0;
}
</style>

<style scoped>
/* 赛事名称 */
input::input-placeholder {
  color: #8d8c8d;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}
.edit .shaishiName font {
  margin-top: 32px;
  display: block;
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #8d8c8d;
}
.edit .shaishiName input {
  width: 840px;
  height: 40px;
  margin-top: 5px;
  background-color: #181818;
  border: solid 1px #333333;
  color: #ffffff;
  text-indent: 1em;
  outline: none;
}
.edit .shaishiName input:focus {
  border: solid 1px #8d8c8d;
}
/* 模式选择 */
.edit .game-mode font {
  margin-top: 32px;
  display: block;
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #8d8c8d;
}
.edit .game-mode input::placeholder {
  color: #8d8c8d;
}
.edit .game-mode input {
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
/* 收费模式 */
.edit .ChargingMode font {
  margin-top: 32px;
  display: block;
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #8d8c8d;
}
.edit .ChargingMode input::placeholder {
  color: #8d8c8d;
}
.edit .ChargingMode input {
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
.edit .other {
  display: inline-block;
}
.edit .other font {
  display: inline;
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #8d8c8d;
}
.edit .other input {
  width: 80px;
  text-indent: 0.5rem;
  outline: none;
}
/* 报名时间 */
.edit .TimeSigningUp font {
  margin-top: 32px;
  display: block;
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #8d8c8d;
}
.edit .TimeSigningUp input {
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
/* 赛事模式 */
.edit .EventModel font {
  margin-top: 32px;
  display: block;
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #8d8c8d;
}
.edit .EventModel input::placeholder {
  color: #8d8c8d;
}
.edit .EventModel input {
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
/* 赛事阶段 */
.edit .CompetitionStage font,
.edit .RewardDescription font,
.edit .RewardThe font,
.edit .RuleDescription font,
.edit .GameDescription font {
  margin-top: 32px;
  display: block;
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #8d8c8d;
}
.edit .CompetitionStageList {
  width: 840px;
  height: 198px;
  margin-top: 8px;
  background-color: #181818;
  border: solid 1px #333333;
}
.edit .CompetitionStageList:hover {
  border: solid 1px #8d8c8d;
}
/* 奖励描述 */
.edit .RewardDescriptionList {
  width: 840px;
  height: 136px;
  margin-top: 8px;
  background-color: #181818;
  border: solid 1px #333333;
  outline: none;
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 24px;
  letter-spacing: 0px;
  color: #8d8c8d;
  padding: 8px;
  resize: none;
}
.edit .RewardDescriptionList:hover {
  border: solid 1px #8d8c8d;
  color: #ffffff;
}
.edit .RewardDescriptionList:focus {
  border: solid 1px #8d8c8d;
  color: #ffffff;
}
.RewardDescriptionList::-webkit-scrollbar {
  display: none;
}
/* 奖励摘要 */
.edit .RewardTheList {
  width: 840px;
  height: 40px;
  margin-top: 8px;
  background-color: #181818;
  border: solid 1px #333333;
  outline: none;
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 40px;
  letter-spacing: 0px;
  color: #8d8c8d;
  padding-left: 16px;
}
.edit .RewardTheList:hover {
  border: solid 1px #8d8c8d;
  color: #ffffff;
}
.edit .RewardTheList:focus {
  border: solid 1px #8d8c8d;
  color: #ffffff;
}
.RewardTheList::-webkit-scrollbar {
  display: none;
}
/* 规则描述 */
.edit .RuleDescriptionList {
  width: 840px;
  height: 136px;
  margin-top: 8px;
  background-color: #181818;
  border: solid 1px #333333;
  margin-bottom: 32px;
  outline: none;
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 24px;
  letter-spacing: 0px;
  color: #8d8c8d;
  padding: 8px;
  resize: none;
}
.edit .RuleDescriptionList:hover {
  border: solid 1px #8d8c8d;
  color: #ffffff;
}
.edit .RuleDescriptionList:focus {
  border: solid 1px #8d8c8d;
  color: #ffffff;
}
.RuleDescriptionList::-webkit-scrollbar {
  display: none;
}
/* 比赛描述 */
.edit .GameDescriptionList {
  width: 840px;
  height: 136px;
  margin-top: 8px;
  background-color: #181818;
  border: solid 1px #333333;
  margin-bottom: 32px;
  outline: none;
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 24px;
  letter-spacing: 0px;
  color: #8d8c8d;
  padding: 8px;
  resize: none;
}
.edit .GameDescriptionList:hover {
  border: solid 1px #8d8c8d;
  color: #ffffff;
}
.edit .GameDescriptionList:focus {
  border: solid 1px #8d8c8d;
  color: #ffffff;
}
.GameDescriptionList::-webkit-scrollbar {
  display: none;
}
/* 创建赛事 */
.createdGamestyle {
  width: 150px;
  height: 50px;
  background-color: #7800ff;
  color: #ffffff;
  border: 1px solid #7800ff;
  font-family: SourceHanSansCN-Regular;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  margin-left: 40%;
  margin-bottom: 32px;
  outline: none;
  text-align: center;
}
/* .edit button:active {
  background-color: #9740fa;
  border: 1px solid #9740fa;
} */
/* 修改的el的样式-结束 */
/* 时间选择器*/
.shijian {
  margin-top: 8px;
}

.time-select-item:hover {
  color: #ffffff;
  background-color: #333333;
}
.edit .shijian input::placeholder {
  color: #8d8c8d;
}
.edit .shijian font {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #8d8c8d;
  display: inline;
}

/*确认是否发布弹框*/
.expectDiv {
  height: 173px;
  background-color: #121212;
  border: solid 1px #4c4c4c;
}
.expectDiv span {
  display: inline-block;
  width: 100%;
  margin: 34px 0 32px 0;
  color: #8d8c8d;
  font-size: 16px;
}
.competition-publish .sureBtndiv {
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
.competition-publish .darkStyle {
  background-color: rebeccapurple;
  color: #000;
}
/* #closeDiv button {
  border: 0 !important;
  width: 0px !important;
  height: 0px !important;
  margin: 0 !important;
  padding: 5px !important;
} */
.room-pwd {
  width: 120px;
  height: 24px;
  background-color: #181818;
  border-radius: 2px;
  border: solid 1px #333333;
  margin-top: 8px;
}
.room-pwd input {
  border: 0 !important;
  outline: none;
  width: 118px;
  height: 22px !important;
  padding: 10px;
  font-size: 14px !important;
}
.lowernumber {
  width: 80px;
  float: left;
  margin-right: 8px;
}
.lowernumber input {
  width: 78px;
}
.lowernumber-text {
  float: left;
}
.Registration-instructions {
  min-width: 200px;
  height: 30px;
  float: left;
  margin-left: 12px;
}
.Registration-instructions span {
  font-family: SourceHanSansCN-Regular;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 1px;
  color: #8d8c8d;
  line-height: 48px;
}
.gbs_box1 input {
  width: 276px;
  height: 24px;
  border: solid 1px #333333;
  padding-left: 8px;
  background-color: transparent;
  font-size: 14px;
  line-height: 24px;
  color: #8d8c8d;
  outline: none;
}
.gbs_box1 input:focus {
  color: #ffffff;
  border: solid 1px #8d8c8d;
}
</style>