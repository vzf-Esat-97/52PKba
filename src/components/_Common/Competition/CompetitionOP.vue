<template>
  <div class="competition-ops">
    <template v-if="entryState===1">
      <button :disabled="true">等待报名</button>
    </template>
    <template v-else-if="entryState===2 &&competition.entryUnit===1">
      <button
        v-show="entryState===2"
        @click="entry(competition)"
      >立即报名</button>
      <!-- 报名扣钱提示弹框 -->
      <div>
        <Tosignup
          v-model="isTosignup"
          :teamAndPerson='isteamAndPerson'
        />
      </div>
      <!-- <template v-if="competition.entryUnit===2">
                <button @click="openOrganizationMemberSelector" :disabled="!isAllowOrganizationEntry">战队报名</button>
                {{isShowOrganizationMemberSelector}}
                <OrganizationMemberSelector v-if="myOrganization" :onecompetition='competition' :gameID="competition.gameID" :isShow="isShowOrganizationMemberSelector" :members="myOrganization.members" @onOK="onOrganizationMemberSelected" @onCancel="onOrganizationMemberSelected" />
            </template> -->
    </template>
    <template v-else-if="entryState===5 &&competition.entryUnit===1">
      <!-- 立即进入 -->
      <button
        v-show="entryState===5"
        @click="entryGameRoom(competition)"
      >立即进入</button>
      <div v-if="competition.currentStage&&competition.currentStage.careMatches.length>0">
        <EnterRoompop
          v-model="EnterRoompopShow"
          :competitionName="competition.name"
          :name="competition.currentStage.careMatches[0].name"
          :password="competition.currentStage.careMatches[0].password"
          :enterTime="new Date(competition.currentStage.careMatches[0].enterTime)"
          :startTime="new Date(competition.currentStage.careMatches[0].startTime)"
        />
      </div>
    </template>
    <template v-else-if="entryState===3">
      <button :disabled="true">进行中</button>
    </template>
    <template v-else-if="entryState===4">
      <button :disabled="true">已结束</button>
    </template>
    <template v-else-if="entryState===666">
      <button :disabled="true">等待入场</button>
    </template>
    <template v-else-if="entryState===6">
      <button :disabled="true">已报名</button>
    </template>
    <template v-else-if="entryState===888">
      <span>X</span>
      <!-- <button :disabled="true">未知</button> -->
    </template>
  </div>
</template>
<script>
import OrganizationMemberSelector from '@/components/_Common/Organization/OrganizationMemberSelector' // 组织成员选择器
import Tosignup from '@/components/Popup/Tosignup' // 报名扣钱提示弹框
import EnterRoompop from "@/components/Popup/EnterRoompop";
export default {
  name: 'CompetitionOP',
  components: {
    OrganizationMemberSelector,
    Tosignup,
    EnterRoompop
  },
  props: {
    competition: { type: Object, required: true },
    myOrganization: { type: Object, required: false }
  },
  data() {
    return {
      isShowOrganizationMemberSelector: false,
      isTosignup: false,
      isteamAndPerson: {}, // 扣钱弹框参数
      EnterRoompopShow: false
      // entryState:2
      // d : 
    }
  },
  computed: {
    entryState() {
      console.log(this.competition)
      console.log(this.myOrganization)
      const now = new Date()
      const nowAdd40M = new Date()
      nowAdd40M.setMinutes(now.getMinutes() + 40)//40分钟后

      const currentStage = this.competition.currentStage
      if (!currentStage) console.log(this.competition)
      const currentMatch = currentStage.careMatches.length > 0 ? currentStage.careMatches[0] : currentStage.allMatches[0]

      // console.log(`${this.competition.name}-${this.competition.isAlreadyEntry}-${this.competition.entryEndTime}`)
      if (this.competition.state === 2) {
        //赛事状态：进行中(2)
        if (this.competition.isAlreadyEntry) {
          //赛事状态：进行中(2)->当前登录人参了比赛
          if (currentStage.orderNum === 0) {
            //赛事状态：进行中(2)->当前登录人参了比赛->当前阶段为第一阶段
            if (currentStage.state === 2) {
              //赛事状态：进行中(2)->当前登录人参了比赛->当前阶段为第一阶段->当前阶段状态：2
              if (now < this.competition.entryEndTime) {
                //赛事状态：进行中(2)->当前登录人参了比赛->当前阶段为第一阶段->当前阶段状态：2->报名截止前
                if (now < new Date(currentMatch.enterTime)) {
                  //赛事状态：进行中(2)->当前登录人参了比赛->当前阶段为第一阶段->当前阶段状态：2->报名截止前->当前比赛入场时间前
                  return 6
                } else if (now < new Date(currentMatch.startTime)) {
                  //赛事状态：进行中(2)->当前登录人参了比赛->当前阶段为第一阶段->当前阶段状态：2->报名截止前->当前比赛开始时间前
                  return 5
                } else if (nowAdd40M > new Date(currentMatch.startTime)) {
                  //赛事状态：进行中(2)->当前登录人参了比赛->当前阶段为第一阶段->当前阶段状态：2->报名截止前->当前比赛开始40分钟后
                  return 4
                } else {
                  //赛事状态：进行中(2)->当前登录人参了比赛->当前阶段为第一阶段->当前阶段状态：2->报名截止前->当前比赛开始40分钟前
                  return 3
                }
              } else {
                //赛事状态：进行中(2)->当前登录人参了比赛->当前阶段为第一阶段->当前阶段状态：2->报名截止后
                if (now < new Date(currentMatch.enterTime)) {
                  //赛事状态：进行中(2)->当前登录人参了比赛->当前阶段为第一阶段->当前阶段状态：2->报名截止后->当前比赛入场时间前
                  return 666
                } else if (now < new Date(currentMatch.startTime)) {
                  //赛事状态：进行中(2)->当前登录人参了比赛->当前阶段为第一阶段->当前阶段状态：2->报名截止后->当前比赛开始时间前
                  return 5
                } else if (nowAdd40M > new Date(currentMatch.startTime)) {
                  //赛事状态：进行中(2)->当前登录人参了比赛->当前阶段为第一阶段->当前阶段状态：2->报名截止后->当前比赛开始40分钟后
                  return 4
                } else {
                  //赛事状态：进行中(2)->当前登录人参了比赛->当前阶段为第一阶段->当前阶段状态：2->报名截止后->当前比赛开始40分钟前
                  return 3
                }
              }
            } else {
              //赛事状态：进行中(2)->当前登录人参了比赛->当前阶段为第一阶段->当前阶段状态：!2
              return 888
            }
          } else {
            //赛事状态：进行中(2)->当前登录人参了比赛->当前阶段非第一阶段
            return 888
          }
        } else {
          //赛事状态：进行中(2)->当前登录人未参与比赛
          if (now < new Date(this.competition.entryStartTime)) {
            //赛事状态：进行中(2)->当前登录人未参与比赛->报名时间开始前
            return 1
          } else if (now < new Date(this.competition.entryEndTime)) {
            //赛事状态：进行中(2)->当前登录人未参与比赛->报名截止前
            return 2
          } else {
            //赛事状态：进行中(2)->当前登录人未参与比赛->报名截止后
            if (now < new Date(currentMatch.enterTime)) {
              //赛事状态：进行中(2)->当前登录人未参与比赛->报名截止后->当前比赛入场时间前
              return 666
            } else if (now < new Date(currentMatch.startTime)) {
              //赛事状态：进行中(2)->当前登录人未参与比赛->报名截止后->当前比赛开始时间前
              return 3
            } else if (nowAdd40M > new Date(currentMatch.startTime)) {
              //赛事状态：进行中(2)->当前登录人未参与比赛->报名截止后->当前比赛开始40分钟后
              return 4
            } else {
              //赛事状态：进行中(2)->当前登录人未参与比赛->报名截止后->当前比赛开始40分钟前
              return 3
            }
          }
        }
      } else { //赛事状态：非进行中(!2)
        return 4
      }
    },
    isAllowOrganizationEntry() {
      if (this.myOrganization) {
        for (let i = 0; i < this.myOrganization.members.length; i++) {
          const member = this.myOrganization.members[i]
          if (this.$store.state.base.loginInfo.id === member.id) {
            return member.type === 1 || member.type === 2
          }
        }
      }
      return false
    }
  },
  watch: {},
  mounted() {
    // console.log(this.competition)
    // console.log(this.entryUnit)
  },
  methods: {
    // 立即报名
    entry(memberIDs) {
      this.isTosignup = true,
        this.isteamAndPerson = memberIDs  // 个人或者战队报名的参赛者
      // let url = `/api/Competition/${this.competition.id}/Entry/`;
      // const data = { memberIDs: [] }
      // if (this.competition.entryUnit === 1) {
      //     data.id = this.$store.state.base.loginInfo.id;
      // } else {
      //     data.id = this.$store.state.other.selectedGame.organization.id;
      //     data.memberIDs = memberIDs
      // }
      // this.$post(url, data).then(res => {
      //     if (res.code == 0) {
      //         this.$message({ type: 'success', message: '报名成功' })
      //     } else {
      //         this.$message({ type: 'warning', message: res.msg })
      //     }
      // });
    },
    // 立即进入
    entryGameRoom(data) {
      this.EnterRoompopShow = true
      console.log("立即进入")
      console.log(this.EnterRoompopShow)
    },
    openOrganizationMemberSelector() {
      this.isShowOrganizationMemberSelector = true
    },
    //选定参赛者成员时
    onOrganizationMemberSelected(selectedMemberIDs) {
      if (!selectedMemberIDs) {
        this.isShowOrganizationMemberSelector = false
        return
      }
      if (selectedMemberIDs.length === 0) {
        this.$message({
          message: '请选择至少一个成员参加比赛',
          type: 'warning'
        })
        return
      }
      this.isShowOrganizationMemberSelector = false
      this.entry(selectedMemberIDs)
    }
  }
};
</script>
<style scoped>
.competition-ops button {
  border: 0;
  outline: none;
  width: 80px;
  height: 28px;
  background-color: #7800ff;
  color: #ffffff;
  font-size: 14px;
}
.competition-ops button:disabled {
  background-color: #8d8c8d;
}
</style>