<template>
  <div id="gameList">
    <div
      @click="isCreatedGamePop=!isCreatedGamePop"
      :class="{addCreateEvents:selectedIndex==-1}"
      class="CreateEvents"
    >
      <img
        src="../../assets/images/add.png"
        alt=""
      >
      <font>创建赛事</font>
    </div>
    <div class="CreateEventsList">
      <ul v-if="competitions">
        <li
          :class="{gameListaddClass:selectedIndex==idx}"
          v-for="(competition,idx) in competitions"
          :key='idx'
          @click="select(competition,idx)"
        >
          <div class="CreateEventsGame CreateEventsGame-Name">
            <font>{{competition.name}}</font>
          </div>
          <!-- <div class="CreateEventsGame CreateEventsGame-Type" v-if="competition.state===1">（待发布）</div>
                    <div class="CreateEventsGame CreateEventsGame-Type" v-else-if="competition.state===2">（进行中）</div>
                    <div class="CreateEventsGame CreateEventsGame-Type" v-else-if="competition.state===3" >（已结束）</div>
                    <div class="CreateEventsGame CreateEventsGame-Type" v-else-if="competition.state===4" >（奖励已发放）</div>
                    <div class="CreateEventsGame CreateEventsGame-Type" v-else>（已作废）</div> -->
          <div class="CreateEventsGame CreateEventsGame-Type">（{{competition.stateDescription}}）</div>
          <div
            v-if='competition.state===1'
            @click.stop="del(competition)"
            class="delBg"
          ></div>
        </li>
      </ul>
    </div>
    <!-- 选择创建单/多赛事 -->
    <div class="CreatedGamePop">
      <el-dialog
        :visible.sync="isCreatedGamePop"
        width="380px"
        top='28vh'
        :close-on-click-modal="false"
      >
        <span>创建赛事</span>
        <div
          class="rr_btn"
          @click="createCompetition(1)"
        >单场比赛</div>
        <p>*单场单房间赛事创建</p>
        <div
          style="background-color:#333;color:#8d8c8d"
          class="rr_btn"
        >多场比赛</div>
        <p>*晋级赛等多场比赛的赛事</p>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompetitionList',
  props: {
    competitions: Array,
    selectedCompetition: Object
  },
  data() {
    return {
      selectedIndex: 0,
      isCreatedGamePop: false//选择赛事类型弹窗是否显示
    }
  },
  computed: {
  },
  watch: {
    competitions() {
      if (this.competitions.length === 0) {//当赛事列表中没有任何一项时，显示创建赛事类型选择窗口
        this.isCreatedGamePop = true
      } else {
        this.updateSelectedIndex()
      }
    },
    selectedCompetition() {
      this.updateSelectedIndex()
    }
  },
  mounted() {
  },
  methods: {
    updateSelectedIndex() {
      if (this.selectedCompetition) {
        if (this.selectedCompetition.id) {
          //选中赛事有ID，已存在于数据库中
          for (let i = 0; i < this.competitions.length; i++) {
            const competition = this.competitions[i]
            if (competition.id === this.selectedCompetition.id) {
              this.selectedIndex = i
              break
            }
          }
        } else {
          //新创建的赛事
          for (let i = 0; i < this.competitions.length; i++) {
            const competition = this.competitions[i]
            if (!competition.id) {
              this.selectedIndex = i
              break
            }
          }
        }
      } else {
        this.selectedIndex = -1
      }
    },
    // 创建赛事
    createCompetition(type) {
      // this.$emit("onCreatedType", type)
      // this.$emit("onCompetitionSelected", undefined)
      this.$emit("onCreateCompetition", type)
      this.isCreatedGamePop = false//选择赛事类型弹窗设为不显示
    },
    // 选择赛事
    select(competition, idx) {
      this.$emit("onCompetitionSelected", competition)
    },
    // 删除赛事
    del(competition) {
      const url = `/api/MCompetition/${competition.id}`
      this.$delete(url).then((res) => {
        if (res.code == 0) {
          this.$emit('onDeleteSuc', competition)
          this.$message({
            message: '删除成功',
            type: 'success'
          });
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          });
        }
      })
    }
  },
}
</script>
<style scoped>
#gameList {
  width: 280px;
  height: 720px;
  background-color: #181818;
}
/* 添加赛事框大小 */
#gameList .CreateEvents {
  height: 48px;
  width: 280px;
  color: #8d8c8d;
  cursor: pointer;
}
/* 赛事图片和文字样式 */
#gameList .CreateEvents img {
  margin-bottom: 2px;
  margin-left: 20px;
}
#gameList .CreateEvents font {
  line-height: 48px;
  margin-left: 8px;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
}
#gameList .CreateEvents:hover {
  background-color: #333333;
  color: #ffffff;
}
#gameList .addCreateEvents {
  background-color: #333333;
  color: #ffffff !important;
}
/* 赛事列表 */
/* 去除列表样式 */
#gameList .CreateEventsList ul li {
  list-style: none;
  width: 280px;
  height: 48px;
  line-height: 48px;
  font-family: SourceHanSansCN-Regular;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #8d8c8d;
  cursor: pointer;
  position: relative;
}
#gameList .CreateEventsList ul li:hover {
  background-color: #333333;
  color: #ffffff;
}
/* #gameList .CreateEventsList ul li:active {
  background-color: #333333;
  color: #ffffff;
} */
.gameListaddClass {
  background-color: #333333;
  color: #ffffff !important;
}
/* 列表文字样式 */
/* #gameList .CreateEventsList font {
  margin-left: 20px;
} */
.CreateEventsGame {
  height: 24px;
  margin-left: 20px;
  line-height: 24px;
}
.CreateEventsGame-Name {
  font-size: 14px;
}
.CreateEventsGame-Type {
  font-size: 12px;
}
.delBg {
  width: 10px;
  height: 10px;
  position: absolute;
  /* background-color: rebeccapurple; */
  top: 20px;
  left: 250px;
  background: url("../../assets/images/renyuanguanbi.png") no-repeat center;
  z-index: 999;
}
</style>
<style>
.CreatedGamePop .el-dialog {
  height: 214px;
  background: #121212;
  border: solid 1px #4c4c4c;
}
.CreatedGamePop .el-dialog__headerbtn .el-dialog__close {
  position: absolute;
  top: -10px;
  right: -10px;
}
.CreatedGamePop .el-dialog__header {
  padding: 0;
}
.CreatedGamePop .el-dialog__body {
  height: 214px;
  padding: 20px 20px 20px 20px;
  text-align: center;
}
.CreatedGamePop .rr_title {
  height: 14px;
  margin-bottom: 40px;
  line-height: 14px;
  font-size: 14px;
  color: #8d8c8d;
}
.CreatedGamePop .rr_btn {
  width: 320px;
  height: 40px;
  background-color: #7800ff;
  margin: auto;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  color: #fefefe;
  cursor: pointer;
  margin-top: 15px;
}
.CreatedGamePop p {
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  color: #8d8c8d;
  width: 320px;
  text-align: left;
  margin: auto;
  padding-top: 5px;
}
.CreatedGamePop span {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  color: #8d8c8d;
  display: block;
  width: 320px;
  margin: auto;
  text-align: left;
}
</style>

