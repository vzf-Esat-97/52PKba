<template>
  <div id="eventdetails">
    <div>
      <el-tabs
        v-if="competitionE"
        v-model="activeName"
      >
        <el-tab-pane
          :label="competitionE.state===1?'创建赛事':'赛事信息'"
          name="details"
        >
          <div id="eventDetailsContent">
            <div class="Details">
              <!-- 赛事基本信息 -->
              <div class="shaishi">
                <Edit
                  v-if="competitionE.state===1"
                  :isonCreatedType='isonCreatedType'
                  :gameID="gameID"
                  :competition="competitionE"
                  @onCreateSuc="onCreateSuc"
                  @onUpdateSuc="onUpdateSuc"
                />
                <BaseInfo
                  v-else
                  :competition="competitionE"
                />
              </div>
            </div>
          </div>
        </el-tab-pane>
        <template v-if="competition&&competitionE.state!==1">
          <el-tab-pane
            v-for="(stage,idx) in competitionE.stages"
            :key="idx"
            :label="stage.name"
            :name="stage.id"
          >
            <Stage
              :stage="stage"
              :competition='competitionE'
              :winnerLimit="idx==competitionE.stages.length-1? undefined : competitionE.stages[idx+1].competitorLimit"
              @onDetermineWinnerListSuc="onDetermineWinnerListSuc"
            />
          </el-tab-pane>
        </template>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Edit from './Edit'
import BaseInfo from './BaseInfo'
import Stage from "./Stage/Stage"
export default {
  name: 'Competition',
  components: { Edit, BaseInfo, Stage },
  props: {
    gameID: String,
    competition: Object,
    isonCreatedType: Number
  },
  data() {
    return {
      activeName: 'details',
      competitionE: undefined
    }
  },
  computed: {
    nameChioce() {
      return this.$store.state.other.nameChioce
    }
  },
  watch: {
    competition(newval, oldval) {
      this.refresh()
      if (this.competition) {
        if (this.competition.currentStage && this.competition.currentStage.id) {
          this.activeName = this.competition.state === 1 ? "details" : this.competition.currentStage.id
        }
      } else {
        this.activeName = "details"
      }
    },
    isonCreatedType(newval, oldval) {
      console.log(newval)
    }
  },
  mounted() {
    this.refresh()
  },
  methods: {
    refresh() {
      if (this.competition) {
        if (this.competition.id) {
          // 获取赛事详细数据
          const url = `/api/MCompetition/${this.competition.id}/Detail`
          this.$fetch(url).then((res) => {
            if (res.code === 0) {
              console.log('to be optimized')
              console.log(res.data)
              this.competition.stages = res.data.stages
              this.competitionE = JSON.parse(JSON.stringify(this.competition))
            }
          })
        } else {
          this.competitionE = JSON.parse(JSON.stringify(this.competition))
        }
      } else {
        this.competitionE = undefined
      }
    },
    // 路由改变重置store
    onDetermineWinnerListSuc(stage) {
      stage.state = 3
      for (let i = 0; i < this.competition.stages.length; i++) {
        const stage_ = this.competition.stages[i];
        if (stage_ === stage && this.competition.stages.length - 1 > i) {
          const nextStage_ = this.competition.stages[i + 1]
          this.activeName = nextStage_.id
          break;
        }
      }
    },
    onCreateSuc(competition) {
      this.$emit("onCreateSuc", competition)
    },
    onUpdateSuc(competition) {
      this.$emit("onUpdateSuc", competition)
    }
  },
}
</script>

<style>
#eventDetailsContent {
  height: 715px;
}
#eventdetails .noStyles {
  width: 945px;
  height: 55px;
  background-color: #141414;
}
#eventdetails .noStylebootonm {
  width: 945px;
  height: 720px;
  background-color: #1e1e1e;
}
/* 滑动框的大小 */
#eventdetails .el-tabs__nav-scroll {
  height: 55px;
  width: 913px;
  background-color: #141414;
  padding-left: 32px;
}
#eventdetails .el-tabs__nav {
  height: 55px;
}
#eventdetails .el-tabs__item {
  height: 55px;
  line-height: 55px;
  font-family: SourceHanSansCN-Regular;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #8d8c8d;
}
/* 选中时候的样式 */
#eventdetails .el-tabs__item.is-active {
  color: #ffffff;
}
/* 滑动框下方滚动条样式 */
#eventdetails .el-tabs__nav-wrap::after {
  background-color: #141414;
}
#eventdetails .el-tabs__active-bar {
  background-color: #7800ff;
}
/* 滑动条距离内容区的距离 */
#eventdetails .el-tabs__header {
  margin-bottom: 0px;
}

/* 弹框样式 */
#eventdetails .el-dialog__header {
  background-color: #121212;
}
/* 弹框头 */
#eventdetails .el-dialog__title {
  color: #8d8c8d;
  font-size: 14px;
  margin-left: 10px;
}
/* 弹框内容 */
#eventdetails .el-dialog__body {
  background-color: #121212;
  padding-top: 3px;
}
#eventdetails .el-dialog__headerbtn:hover .el-dialog__close {
  color: #909399;
}
#eventdetails .GroupTitle,
#eventdetails .GroupNumber {
  font-family: SourceHanSansCN-Regular;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 24px;
  letter-spacing: 0px;
  color: #8d8c8d;
  display: block;
  text-align: center;
}
#eventdetails .GroupingBtn button {
  width: 320px;
  height: 40px;
  background-color: #7800ff;
  display: block;
  border: none;
  color: #fefefe;
  font-size: 16px;
  margin: 0 auto;
  margin-top: 16px;
  outline: none;
  font-family: SourceHanSansCN-Regular;
}

/* From EventDetailsContent  */

#eventDetailsContent .Details {
  width: 945px;
  height: 717px;
  background-color: #1e1e1e;
  display: inline-block;
  overflow-y: auto;
  -ms-overflow-style: none;
}
.Details::-webkit-scrollbar {
  display: none;
}
#eventDetailsContent .Details .shaishi {
  width: 840px;
  height: 680px;
  margin: 0 auto;
}
#eventDetailsContent .yuliu {
  width: 240px;
  height: 721px;
  float: right;
}
#eventDetailsContent .yuliu .YuliuSearch {
  height: 55px;
  position: relative;
}
#eventDetailsContent .yuliu .yuliuContent {
  height: 665px;
}
#pane-first {
  height: 721px;
}
</style>
