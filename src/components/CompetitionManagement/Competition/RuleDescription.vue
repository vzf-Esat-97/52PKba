<template>
  <div class="RuleDescription">
    <p>
      <!-- 收益预计：<span>{{earnings}} PK币</span> -->
    </p>
    <div class="main-kill">
      <el-checkbox :checked='false' @change='onchange'>击杀奖励：</el-checkbox>
      <div class="on-number">
        <div class="on-number-input">
          <input maxlength="6" type="text" oninput="value=value.replace(/[^\d]/g,'')" :disabled="isdisabled" v-model="rewardSummary">
        </div>
        <p>PK币/人 <span>*如不给予击杀奖励，不选择。</span></p>
      </div>
    </div>
    <div class="main-kill-award">
      <p>排名奖励(默认以100人计算)：</p>
      <p>*不填写统一默认为0.比赛结束后，奖励将会自动发放给报名者。</p>
    </div>
    <div class="main-content">
      <div class="main-content-details">
        <ul>
          <li v-for="(item,idx) in rewardRules" :key="idx">
            <span>{{item.ranking}}#</span>
            <div class="main-li-content">
              <span>奖励</span>
              <div class="main-li-content-input">
                <input v-model="item.rankingrowars" type="text" maxlength="6" oninput="value=value.replace(/[^\d]/g,'')">
              </div>
              <span>PK币</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="agreed1">
      <div class="agreed1checkbox">
        <el-checkbox v-model="RuleDescriptionchecked"></el-checkbox>
      </div>
      <div class="agreedspan">
        <span @click="AgreementPop()">已阅读并接受《我爱PK吧报名声明》</span>
      </div>
    </div>

    <footer>
      <button @click="submitClick">确认提交</button>
      <button @click="goback" class="goback">返回</button>
    </footer>
    <!-- 确认是否发布 -->
    <el-dialog class="closeDiv competition-publish" :visible.sync="publishSure" width="380px">
      <div v-if="CreatdMath" class="expectDiv">
        <span>{{CreatdMath.name}}</span>
        <div class="sureContentDiv">
          <span>报名时间:</span>
          <span>{{CreatdMath.entryStartTime | nossDateTime}} 至 {{CreatdMath.entryEndTime | nossDateTime}}</span>
          <span>报名方式：个/人</span>
          <span>参赛费用：{{CreatdMath.entryCost}}PK</span>
          <span>赛事入场时间：{{CreatdMath.admissionTime | nossDateTime}}</span>
          <span>赛事开始时间：{{CreatdMath.startTime | nossDateTime}}</span>
          <span>报名人数下限：{{CreatdMath.stages[0].minCompetitorLimit}}人</span>
          <span>报名人数上限：{{CreatdMath.stages[0].maxCompetitorLimit}}人</span>
          <span>房间名称：{{CreatdMath.RoomName}}</span>
          <span>房间密码：{{CreatdMath.RoomPassword}}</span>
          <span>创建赛事费用：{{CostCreation}}PK币</span>
          <div class="sureYueDiv">
            <span class="yue">余额：{{balance}}PK</span>
            <button class="Recharge">充值</button>
          </div>
        </div>
        <div class="sureBtndiv" @click="publishSureclick">确认</div>
      </div>
    </el-dialog>
    <RulDescriptionPop v-model="isRulDescriptionPopshow" @LoginBiniphonesuc="OnLoginBiniphonesuc" />
  </div>
</template>

<script>
import { formatDate } from '../../../common/date.js'
import RulDescriptionPop from '@/components/Popup/RulDescriptionPop' // 报名是否阅读报名须知
export default {
  components: {
    RulDescriptionPop
  },
  props: {
    isonCreatedType: {
      type: Number,
      default () {
        return 2
      }
    },
    CreatdMath: {
      type: Object,
      default () {
        return
      }
    },
    RoomMsgData: {
      type: Object,
      default () {
        return
      }
    }
  },
  data () {
    return {
      earnings: 0,
      isdisabled: "disabled",
      rewardRules: [],
      rewardSummary: '',
      publishSure: false,
      publishSucId: '',
      isRulDescriptionPopshow: false,
      RuleDescriptionchecked: false,
      publisStageId: '',
      balance: '',
      CostCreation: 2000,
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
    },
    nossDateTime (time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  computed: {
  },
  watch: {
    competition () {
      this.refresh()
    },
    CreatdMath (newval, oldval) {
      console.log(this.RoomMsgData)
      this.rewardRules = []
      if (JSON.parse(newval.gameMode).value1 === "SOLO") {
        for (var i = 1; i <= 100; i++) {
          const rankingperson = { ranking: i, rankingrowars: 0 }
          this.rewardRules.push(rankingperson)
        }
      } else if (JSON.parse(newval.gameMode).value1 === "DUO") {
        for (var i = 1; i <= 50; i++) {
          const rankingperson = { ranking: i, rankingrowars: 0 }
          this.rewardRules.push(rankingperson)
        }
      } else {
        for (var i = 1; i <= 25; i++) {
          const rankingperson = { ranking: i, rankingrowars: 0 }
          this.rewardRules.push(rankingperson)
        }
      }
    },
  },
  mounted () {
  },
  methods: {
    fDateTime (v) { return this.$options.filters['datetime'](v) },
    fFormatDate (v) { return this.$options.filters['formatDate'](v) },
    goback () {
      this.$emit('ChangeCreatedType', false)
    },
    // 控制击杀奖励是否可输入
    onchange (data) {
      if (data === true) {
        this.isdisabled = !this.isdisabled
      } else {
        this.isdisabled = "disabled"
        this.onNumber = ''
      }
    },
    AgreementPop () {
      console.log(223123123123)
      this.isRulDescriptionPopshow = true
    },

    // 是否已经阅读我爱PK吧举办赛事声明
    OnLoginBiniphonesuc (data) {
      this.RuleDescriptionchecked = data
    },

    submitClick () {
      //获取余额
      const urlBalance = '/api/Wallet/Balance'
      this.$fetch(urlBalance).then((res) => {
        if (res.code === 0) {
          this.balance = res.data
        }
      })
      console.log(this.rewardRules)
      if (this.RuleDescriptionchecked) {
        const rewardRules = [] // 传后台数据数组
        const expressionItems = []//string[]
        const expressionDescrition = [] // 奖励描述
        const expressionKills = [] // 
        for (let i = 0; i < this.rewardRules.length; i++) {
          const rewardRule = this.rewardRules[i];
          if (rewardRule.rankingrowars > 0) {
            expressionItems.push(`{team_rank}=${rewardRule.ranking}*${rewardRule.rankingrowars}/{team_member_count}`)
            expressionDescrition.push(`第${rewardRule.ranking}名奖励${rewardRule.rankingrowars}PK币`)
            if (this.rewardSummary > 0) {
              expressionKills.push(`{kills}=${rewardRule.ranking}*${this.rewardSummary}`)
            } else {
              expressionKills.push(`{kills}=0`)
            }
          }
        }
        const expressionRanking = {
          expression: expressionItems.join('+'),
          description: expressionDescrition.join(`,`)
        }
        const expressionKill = {
          expression: expressionKills.join('+'),
          description: expressionDescrition.join(`,`)
        }
        rewardRules.push(expressionRanking)
        rewardRules.push(expressionKill)
        this.CreatdMath.rewardRules = rewardRules
        this.CreatdMath.rewardSummary = this.rewardSummary
        console.log(this.CreatdMath)
        const urlCreateCompetition = `/api/MCompetition/`
        this.$post(urlCreateCompetition, this.CreatdMath).then((res) => {
          if (res.code === 0) {
            this.publishSure = true
            this.publishSucId = res.data.id
            this.publisStageId = res.data.stageIDs[0]
            this.$store.commit('other/publishsuc', 1)
            this.save()
          } else {
            this.$message({ type: 'error', message: res.msg })
          }
        })
      } else {
        this.$message({ type: 'warning', message: '请阅读并接受举办赛事声明' })
      }
    },
    // 确认发布
    publishSureclick () {
      if (this.balance >= this.CostCreation) {
        this.$store.commit('other/publishsuc', 0)
        const url = `/api/MCompetition/${this.publishSucId}/Publish`
        this.$put(url).then((res) => {
          if (res.code === 0) {
            this.publishSure = false
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
      else {
        this.$message({
          message: '余额不足，请充值',
          type: 'error'
        });
      }
    },
    // 单赛事 保存及发布
    save () {
      const url = `/api/MCompetitionGroup/${this.publisStageId}`
      const data = []
      const dataGroup = {
        name: this.RoomName,
        cscIDs: [],
        matches: []
      }
      dataGroup.matches.push({
        name: this.RoomMsgData.RoomName,
        password: this.RoomMsgData.RoomPwd,
        enterTime: new Date(`${this.fFormatDate(this.RoomMsgData.JoinDate)} ${this.RoomMsgData.RoomJoinTime}`),
        startTime: new Date(`${this.fFormatDate(this.RoomMsgData.GameDate)} ${this.RoomMsgData.RoomGameTime}`)
      })
      data.push(dataGroup)
      this.$put(url, data).then((res) => {
        if (res.code == 0) {
          console.log(123123123)
          console.log("保存分组成功")
          console.log(res.data[0])
          this.determine(res.data[0])
        }
      })
    },
    //确认发布单赛事
    determine () {
      console.log(123123123123)
      const url = `/api/MCompetitionGroup/${this.publisStageId}/Determine`
      this.$put(url).then((res) => {
        if (res.code == 0) {
          // this.$emit('onStageDetermineGroup')
          console.log(res)
        }
      })
    },
  },
}
</script>
<style>
.RuleDescription .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #8d8c8d;
}
.RuleDescription .competition-publish .el-dialog__header {
  padding: 0;
  height: 0;
}
.RuleDescription .competition-publish .el-dialog__headerbtn {
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
.RuleDescription .competition-publish .el-dialog__body {
  padding: 0;
  height: 174px;
}
.RuleDescription .el-dialog {
  height: 440px;
}
/* 选择框的大小 */
.RuleDescription .el-checkbox__input {
  height: 12px;
  width: 12px;
}
/* 选择框的颜色 */
.RuleDescription .el-checkbox__inner {
  background-color: rgba(0, 0, 0, 0.1);
  border-color: #4c4c4c;
  border-radius: 0px;
}
.RuleDescription .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: rgba(0, 0, 0, 0.1);
  border-color: #4c4c4c;
  border-radius: 0px;
}
.RuleDescription .el-checkbox__input.is-focus .el-checkbox__inner {
  background-color: rgba(0, 0, 0, 0.1);
  border-color: #4c4c4c;
  border-radius: 0px;
}
/* 选择框文字的设置 */
.RuleDescription .el-checkbox__label {
  vertical-align: middle;
  color: #8d8c8d;
  padding-left: 12px;
}
.RuleDescription .el-checkbox__input.is-checked + .el-checkbox__label {
  vertical-align: middle;
  color: #8d8c8d;
  padding-left: 12px;
}
/* 我已阅读相关条例 */
.RuleDescription .agreed1 {
  width: 270px;
  height: 25px;
  margin-top: 8px;
}
.RuleDescription .agreed1checkbox {
  width: 14px;
  height: 14px;
  float: left;
}
.RuleDescription .agreed1 .agreedspan {
  width: 234px;
  height: 25px;
  line-height: 24px;
  float: left;
  cursor: pointer;
  margin-left: 10px;
}
</style>

<style lang='less' scoped>
.RuleDescription {
  width: 841px;
  height: 586px;
  margin-top: 32px;
  p {
    font-family: SourceHanSansCN-Regular;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #8d8c8d;
  }
  span {
    color: #ffffff;
  }
  .main-kill {
    width: 331px;
    height: 45px;
    margin-bottom: 32px;
    input::input-placeholder {
      color: #8d8c8d;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
    .on-number {
      .on-number-input {
        width: 80px;
        height: 24px;
        float: left;
        border: solid 1px #333333;
        background-color: #181818;
        input[type="text"] {
          width: 78px;
          height: 16px;
          -moz-appearance: textfield;
          background-color: #181818;
          border-radius: 2px;
          border: 0;
          outline: none;
          color: #ffffff;
          font-size: 14px;
          letter-spacing: 1px;
          line-height: 24px;
          padding: 8px;
          margin-top: 3px;
        }
      }
      p {
        float: left;
        color: #8d8c8d;
        font-size: 14px;
        line-height: 24px;
        margin-bottom: 0;
        margin-left: 8px;
        span {
          font-size: 12px;
          color: #8d8c8d;
          padding-left: 5px;
        }
      }
    }
  }
  .main-kill-award {
    width: 100%;
    display: flex;
    justify-content: space-between;
    p {
      margin: 0;
      font-size: 12px;
    }
  }
  .main-content {
    width: 840px;
    height: 443px;
    background-color: #181818;
    border: solid 1px #333333;
    margin-top: 7px;
    margin-bottom: 10px;
    .main-content-details {
      width: 808px;
      height: 409px;
      margin: 16px auto;
      overflow: auto;
      -ms-overflow-style: none;
      ul {
        margin: 0;
        li {
          display: block;
          width: 259px;
          height: 32px;
          background-color: #333333;
          list-style: none;
          float: left;
          margin-bottom: 8px;
          span {
            padding-left: 17px;
            line-height: 32px;
            font-size: 14px;
            letter-spacing: 1px;
            color: #8d8c8d;
          }
          .main-li-content {
            width: 140px;
            height: 24px;
            margin: 4px 16px;
            float: right;
            span {
              padding: 0;
              line-height: 24px;
              display: block;
              float: left;
            }
            .main-li-content-input {
              width: 60px;
              height: 24px;
              background-color: #181818;
              border-radius: 2px;
              border: solid 1px #8d8c8d;
              float: left;
              margin: 0 7px;
              input {
                width: 58px;
                height: 22px;
                border: 0;
                background-color: #181818;
                outline: none;
                color: #ffffff;
                padding-left: 5px;
              }
            }
          }
        }
        li:nth-child(3n + 2) {
          margin: 0 15px;
        }
      }
    }
  }

  footer {
    width: 248px;
    height: 30px;
    margin: 32px auto;
    display: flex;
    justify-content: space-between;
    button {
      width: 100px;
      height: 30px;
      background-color: #7800ff;
      border: 0;
      outline: none;
      display: block;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #ffffff;
      float: left;
    }
    .goback {
      background-color: #333333;
      color: #8d8c8d;
    }
    .goback:hover {
      border: 1px solid #8d8c8d;
      color: white;
    }
  }
  ::-webkit-scrollbar {
    width: 0;
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
  /*确认是否发布弹框*/
  .expectDiv {
    height: 420px;
    background-color: #121212;
  }
  // 确认发布弹框内容
  .expectDiv .sureContentDiv {
    width: 320px;
    height: 300px;
    font-size: 14px;
    line-height: 24px;
    margin: 0 auto;
  }
  .expectDiv .sureContentDiv span {
    color: #8d8c8d;
    margin-top: 0px;
    margin-bottom: 0px;
    text-align: left;
  }
  .expectDiv .sureContentDiv .yue {
    text-align: left;
    display: inline;
  }
  // 确认发布里面充值按钮样式
  .expectDiv .sureContentDiv .Recharge {
    height: 24px;
    width: 64px;
    font-size: 14px;
    line-height: 20px;
    color: #ffffff;
    background-color: #7800ff;
    cursor: pointer;
    text-align: center;
    border: 0px solid;
    float: right;
    display: none;
  }
  .expectDiv .sureContentDiv .sureYueDiv {
    text-align: left;
  }
  .expectDiv span {
    display: inline-block;
    width: 100%;
    margin: 24px 0 15px 0;
    color: #8d8c8d;
    font-size: 16px;
    text-align: center;
  }
}
</style>