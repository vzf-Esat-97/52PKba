<template>
    <div class="Secondstage">
        <div class="Second_stage_main">
            <div v-if="winnerLimit" class="head_btn">
                <button @click="determineWinnerList">确认晋级</button>
                <button @click="save">保存</button>
            </div>
            <div class="main_content">
                <div class="main_head">
                    <div class="main_dead_right">
                        <span style="margin-right:30px;">晋级</span>
                        <span style="margin-right:47px">名次</span>
                        <span>昵称 &nbsp;&nbsp;(1000)</span>
                    </div>
                    <div class="main_dead_left">
                        <span>小组名次</span>
                        <span>吃鸡积分</span>
                        <span>击杀积分</span>
                        <span>总积分</span>
                    </div>
                </div>
                <div class="main_content_list">
                    <ul v-if="competitors">
                        <li v-for="(competitor,idx) in competitors" :key="idx" @click="openOrClose(competitor)">
                            <div class="main_content_list_head">
                                <el-checkbox class="main_content_list_checkbox" v-model="competitor.isQualified" @change="isQualifiedChange(competitor)"></el-checkbox>
                                <div class="list_head_content">
                                    <span style="width:30px;text-align:center">{{competitor.stageRanking}}</span>
                                    <div class="list_head_content_img">
                                        <img :src="competitor.icon" alt="">
                                    </div>
                                    <div class="list_head_content_name">
                                        {{competitor.name}}
                                    </div>
                                    <div class="list_head_content_math">
                                        <span style="width:115px;">{{competitor.groupRanking}}</span>
                                        <span style="width:50px;margin-left: 0px; text-align: center;"></span>
                                        <span style="width:50px;margin-left: 60px; text-align: center;"></span>
                                        <span style="width:50px;margin-left: 44px; text-align: right;">{{competitor.score}}</span>
                                    </div>
                                </div>
                                <div class="list_head_triangle"></div>
                            </div>
                            <transition name="fade">
                                <div v-if="competitor.data" v-show="competitor.openFlag" class="main_content_select">
                                    <div class="main_content_select_head">
                                        <div class="main_select_head_nav">

                                        </div>
                                    </div>
                                    <div class="main_select_content">
                                        <div class="main_select_content_li">
                                            <span>名次：{{competitor.stageRanking}}</span>
                                            <span>击杀人数：{{competitor.data.kills}}</span>
                                            <span>击倒人数：{{competitor.data.DBNOs}}</span>
                                            <span>爆头击杀：{{competitor.data.headshotKills}}</span>
                                        </div>
                                        <div class="main_select_content_li main_select_content_span">
                                            <span>总伤害：{{competitor.data.damageDealt}}</span>
                                            <span>治疗数：{{competitor.data.heals}}</span>
                                            <span>最大伤害：{{competitor.data.maxMostDamage}}</span>
                                            <span>存活时间：{{competitor.data.maxTimeSurvived}}</span>
                                        </div>
                                        <div class="main_select_content_li">
                                            <span>奔跑距离：{{competitor.data.walkDistance}}</span>
                                            <span>最远击杀：{{competitor.data.maxLongestKill}}</span>
                                            <span>助攻：{{competitor.data.assists}}</span>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'//引入vue
export default {
    name: 'StageStage2',
    props: {
        stageID: String,
        winnerLimit: Number//undefined 表示最后一个阶段
    },
    data() {
        return {
            competitors: undefined
        }
    },
    watch: {
        stageID() {
            this.refresh()
        }
    },
    computed: {
        currentQualifiedCount() {//当前晋级数量
            let qualifiedCount = 0
            this.competitors.forEach(competitor => {
                if (competitor.isQualified) qualifiedCount++
            })
            return qualifiedCount
        }
    },
    mounted() {
        this.refresh()
    },
    methods: {
        refresh() {
            if (!this.stageID) return
            const url = `/api/MCompetitionStage/${this.stageID}/Competitors`
            this.$fetch(url).then((res) => {
                if (res.code == 0) {
                    let competitors = res.data
                    competitors.forEach((competitor, i) => {
                        competitor.data = undefined
                        competitor.singleMatchDatas = []
                        competitor.openFlag = false
                        if (this.winnerLimit) {
                            competitor.isQualified = i < this.winnerLimit
                        }
                    })
                    this.competitors = competitors
                }
            })
        },
        openOrClose(competitor) {
            competitor.openFlag = !competitor.openFlag
            if (!competitor.data) {
                const url = `/api/MCompetitionStageCompetitor/${competitor.cscID}/MatchResultData`
                this.$fetch(url).then((res) => {
                    if (res.code == 0) {
                        competitor.data = JSON.parse(res.data.data)
                        competitor.singleMatchDatas = []
                        res.data.singleMatchDatas.forEach(singleMatchData => {
                            competitor.singleMatchDatas.push(JSON.parse(singleMatchData))
                        })
                    } else {
                        console.log(res)
                    }
                })
            }
        },
        isQualifiedChange(competitor) {//改变是否晋级
            if (!this.winnerLimit) {
                competitor.isQualified = false
                return
            }
            if (competitor.isQualified) {
                //使competitor晋级
                if (this.currentQualifiedCount > this.winnerLimit) {
                    competitor.isQualified = false
                }
            }
        },
        // 确认晋级名单
        determineWinnerList() {
            const winnerListData = []
            this.competitors.forEach((item) => {
                if (item.isQualified === true) {
                    winnerListData.push(item.cscID)
                }
            })
            const url = `/api/MCompetitionStage/${this.stageID}/DetermineWinnerList`
            this.$post(url, winnerListData).then((res) => {
                if (res.code === 0) {
                    this.$emit('onDetermineWinnerListSuc')
                    this.$message({
                        message: '确认晋级名单成功',
                        type: 'success'
                    });
                }
            })
        },
        save() {

        }
    },
}
</script>
<style scoped>
.Secondstage {
  width: 945px;
  height: 690px;
}
.Second_stage_main {
  width: 850px;
  height: 663px;
  margin: 27px auto;
}
.head_btn {
  width: 850px;
  height: 30px;
  margin-bottom: 24px;
}
.head_btn button {
  width: 100px;
  height: 30px;
  background-color: #333333;
  border: 0;
  outline: none;
  color: #8d8c8d;
  float: right;
}
.head_btn :first-child {
  background-color: #7800ff;
  color: #ffffff;
  margin-left: 32px;
}

.main_content {
  width: 850px;
  height: 640px;
}
.main_head {
  width: 778px;
  height: 15px;
  margin-left: 16px;
  color: #8d8c8d;
  font-size: 12px;
}
.main_dead_right {
  width: 220px;
  height: 15px;
  float: left;
  margin-right: 181px;
}
.main_dead_left {
  width: 360px;
  height: 15px;
  float: left;
}
.main_dead_left span {
  margin-right: 47px;
}
.main_content_list {
  width: 850px;
  height: 600px;
  margin-top: 17px;
  overflow: auto;
}
.main_content_list::-webkit-scrollbar {
  display: none;
}
.main_content_list li {
  width: 849px;
  min-height: 36px;
  background-color: #333333;
  list-style: none;
}
.main_content_list_head {
  width: 849px;
  height: 36px;
}

.main_content_list_checkbox {
  width: 5px;
  height: 20px;
  float: left;
  margin-top: 8px;
  margin-left: 20px;
}

.list_head_triangle {
  width: 20px;
  height: 20px;
  float: left;
  margin-left: 39px;
  margin-top: 6px;
}

.list_head_content {
  width: 698px;
  height: 24px;
  float: left;
  margin-left: 48px;
  margin-top: 6px;
  color: #8d8c8d;
  line-height: 24px;
}
.list_head_content span {
  float: left;
}
.list_head_content_img {
  width: 24px;
  height: 24px;
  background-image: linear-gradient(0deg, #252525 0%, #454545 100%);
  float: left;
  margin-left: 15px;
  margin-right: 7px;
}
.list_head_content_img img {
  width: 18px;
  height: 13px;
  margin-top: -4px;
  margin-left: 3px;
}
.list_head_content_name {
  width: 150px;
  height: 24px;
  float: left;
}
.list_head_content_math {
  width: 369px;
  height: 24px;
  float: right;
}
.main_content_list li:nth-child(2n) {
  width: 849px;
  min-height: 36px;
  background-color: #181818;
}
.main_content_select {
  width: 849px;
  height: 136px;
  background-color: #141414;
}
.fade-enter-active {
  animation: height 0.1s;
}
.fade-leave-active {
  animation: height 0.1s reverse;
}
@keyframes height {
  0% {
    height: 0px;
  }
  100% {
    height: 136px;
  }
}
.main_content_select_head {
  width: 849px;
  height: 31px;
  border-bottom: solid 1px #333333;
}
.main_select_head_nav {
  width: 392px;
  height: 31px;
  margin-left: 23px;
}
/* .main_select_head_nav li{
    list-style: none;
} */
.main_select_content {
  width: 803px;
  height: 73px;
  margin: 17px auto;
}
.main_select_content_li {
  width: 803px;
  height: 20px;
  display: flex;
  justify-content: space-between;
  color: #8d8c8d;
}
.main_select_content_li span {
  display: block;
  width: 200px;
  height: 20px;
}
.main_select_content_span {
  margin: 5px auto;
}
.main_content_list_checkbox .el-checkbox__inner {
  background-color: #141414 !important;
}
</style>