<template>
  <div id="createGame">
    <div class="gamelist">
      <GameSearch />
      <CompetitionList v-if="competitions" :competitions="competitions" :selectedCompetition="selectedCompetition" @onCompetitionSelected="selectCompetition" @onDeleteSuc="onDeleteSuc" @onCreatedType="onCreatedType" @onCreateCompetition="createCompetition" />
    </div>
    <div class="gameCreat">
      <Competition :gameID="$route.params.gameID" :isonCreatedType='isonCreatedType' :competition="selectedCompetition" @onCreateSuc="onCreateSuc" @onUpdateSuc="onUpdateSuc" />
    </div>
  </div>
</template>

<script>
import { formatDate } from '../../common/date.js'
import GameSearch from './GameSearch' // 创建战队搜索
import CompetitionList from './CompetitionList' // 创建战队列表页
import Competition from './Competition/Competition' // 创建战队及修改战队详情页
export default {
  name: 'CreateCompetition',
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
  components: {
    GameSearch,
    CompetitionList,
    Competition
  },
  data () {
    return {
      competitions: [],
      selectedCompetition: undefined,
      isonCreatedType: 0
    }
  },
  computed: {
    gameCreatstate () {
      return this.$store.state.other.gameCreatstate
    },
    oneGameCreatdsuc () {
      return this.$store.state.other.publishsuc
    }
  },
  watch: {
    gameCreatstate (newval, oldval) {
      if (newval === false) {
        this.gameCreatstate = false
      }
    },
    oneGameCreatdsuc () {
      this.refresh()
    }
  },
  mounted () {
    this.refresh()
  },
  methods: {
    fDateTime (v) { return this.$options.filters['datetime'](v) },
    fFormatDate (v) { return this.$options.filters['formatDate'](v) },
    refresh () {
      const url = `/api/MCompetition/${this.$route.params.gameID}`
      const data = {}
      this.$fetch(url, data).then((res) => {
        if (res.code == 0) {
          const competitions = []
          res.data.lst.forEach(competition => {
            //不加草稿（需求20181214）
            if (competition.state === 1) {
              competition.stateDescription = '未发布'
              competitions.push(competition)
            } else if (competition.state === 2) {
              if (new Date() < new Date(competition.entryEndTime)) {
                competition.stateDescription = '报名中'
                competitions.push(competition)
              } else {
                competition.stateDescription = '成功'
                competitions.push(competition)
              }
            } else if (competition.state === 99) {
              competition.stateDescription = '作废'
              competitions.push(competition)
            } else if (competition.state === 3) {
              competition.stateDescription = '已结束'
              competitions.push(competition)
            }
          });
          this.competitions = competitions
          if (this.competitions.length > 0)
            this.selectedCompetition = this.competitions[0]
        }
      })
    },
    //创建赛事的时候
    createCompetition (type) {
      let competition = undefined
      for (let i = 0; i < this.competitions.length; i++) {
        if (!this.competitions[i].id) {
          competition = this.competitions[i]
        }
      }
      if (!competition) {
        const entryStartTime = new Date()
        const entryEndTime = new Date().setDate(new Date().getDate() + 1)
        competition = {
          // isShowInList: false,
          gameID: this.gameID,
          gameMode: {
            value: 'TPP',
            value1: 'SOLO',
            value2: '普通模式',
            value3: '艾伦格'
          },
          name: '',
          state: 1,
          type: 1,
          entryCost: 100,
          entryUnit: 1,
          stateDescription: '未发布',
          entryStartTime: this.fFormatDate(entryStartTime),
          entryStartTimeHHmm: this.fDateTime(entryStartTime),
          entryEndTime: this.fFormatDate(entryEndTime),
          entryEndTimeHHmm: this.fDateTime(entryEndTime),
          stages: [
            {
              state: 1,
              name: ''
            }
          ]
        }
        this.competitions.push(competition)
      }
      this.selectCompetition(competition)
    },
    selectCompetition (competition) {
      this.selectedCompetition = competition || undefined
    },
    onCreateSuc (competition) {
      this.competitions.splice(0, 0, competition)
      this.selectedCompetition = this.competitions[0]
    },
    onUpdateSuc (competition) {
      this.selectedCompetition = competition
      for (let i = 0; i < this.competitions.length; i++) {
        const competitionsItem = this.competitions[i];
        if (competitionsItem.id === competition.id) {
          this.competitions.splice(i, 1, competition)
          this.selectedCompetition = this.competitions[i]
          break
        }
      }
    },
    onDeleteSuc (competition) {
      for (let i = 0; i < this.competitions.length; i++) {
        const competitionsItem = this.competitions[i];
        if (competitionsItem.id === competition.id) {
          this.competitions.splice(i, 1)
          break
        }
      }
      this.selectedCompetition = this.competitions[0]
    },
    onCreatedType (data) {
      if (data)
        this.isonCreatedType = data
    },
  }
}
</script>
<style scoped>
#createGame .gamelist {
  width: 280px;
  height: 775px;
  display: inline-block;
  position: relative;
}
#createGame .gameCreat {
  width: 945px;
  height: 775px;
  float: right;
  background-color: #181818;
}
</style>
