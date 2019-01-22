<template>
    <div class="Secondstage">
        <div class="Second_stage_main">
            <!-- <div class="head_btn">
                <button>确认晋级</button>
                <button>保存</button>
            </div> -->
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
                    <ul>
                        <li v-for="(competitor,index) in competitors" :key="index" @click="openOrClose(competitor)">
                            <div class="main_content_list_head">
                                <!-- <el-checkbox class="main_content_list_checkbox" @change="change(competitor)" v-model="competitor.inputType"></el-checkbox> -->
                                <div style="width: 5px;margin-left: 20px;height:20px;float: left;"></div>
                                <div class="list_head_content">
                                    <span style="width:30px;text-align:center">{{competitor.stageRanking===null?`--`:competitor.stageRanking}}</span>
                                    <div class="list_head_content_img">
                                        <img :src="competitor.icon" alt="">
                                    </div>
                                    <div class="list_head_content_name" @click.stop="userInformatin(competitor)">
                                        {{competitor.name}}
                                    </div>
                                    <div class="list_head_content_math">
                                        <span style="width:88px;text-align: center;">{{competitor.stageRanking===null?`--`:competitor.stageRanking}}</span>
                                        <span style="width:110px;margin-left: 0px; text-align: center;">--</span>
                                        <span style="width:50px;margin-left: 28px; text-align: center;">--</span>
                                        <span style="width:50px;margin-left: 30px; text-align: right;">{{competitor.score===null?`--`:competitor.score}}</span>
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
            <PersonalInformationDisplay  v-model="PersonalInformationShow" :getUserINformation="getUserINformation"/>
        </div>
    </div>
</template>
<script>
import PersonalInformationDisplay from '@/components/Popup/PersonalInformationDisplay' //用户详细信息
export default {
    name: 'StageRanking',
    components:{
        PersonalInformationDisplay,
    },
    props: {
        stage: Object
    },
    data() {
        return {
            competitors: [],//阶段参赛者集合
            liConHeight: 50,
            isMainsselect: false,
            PersonalInformationShow: false,//是否弹出个人信息弹框,
            getUserINformation:undefined, //获取的个人信息
            senderID:undefined,//查看用户个人信息使用的ID
        }
    },
    computed: {

    },
    watch: {
        stage() {
            this.refresh()
        }
    },
    mounted() {
        this.refresh()
    },
    methods: {
        refresh() {
            if (!this.stage) return
            const url = `/api/CompetitionStage/${this.stage.id}/Competitors`
            this.$fetch(url).then((res) => {
                if (res.code == 0) {
                    res.data.forEach(competitor => {
                        competitor.data = false
                        competitor.singleMatchDatas = []
                        competitor.openFlag = false
                    })
                    this.competitors = res.data
                }
            })
        },
        openOrClose(competitor) {
            this.PersonalInformationShow = false
            competitor.openFlag = !competitor.openFlag
            if (!competitor.data) {
                const url = `/api/MCompetitionStageCompetitor/${competitor.cscID}/MatchResultData`
                this.$fetch(url).then((res) => {
                    if (res.code == 0) {
                        competitor.data = JSON.parse(res.data.data)
                        competitor.singleMatchDatas = []
                        res.data.singleMatchDatas.forEach(singleMatchData => {
                            competitor.singleMatchDatas.push(JSON.parse(singleMatchData))
                        });
                    } else {
                        console.log(competitor)
                        console.log(res)
                    }
                })
            }
            
        },
        change(item) {
            console.log(item)
        },
        //显示个人信息及二维码
        userInformatin(dat){
            // 赠送用户ID
            const url1 = `/api/MCompetitionStageCompetitor/${dat.cscID}/Members`
            this.$fetch(url1).then((res) => {
                if (res.code == 0) {
                    const url = `/api/User/GetUserInfo/${res.data[0].userID}`
                    this.$fetch(url).then((res) => {
                        if (res.code == 0) {
                            this.getUserINformation=res.data
                            //弹窗的切换
                            this.PersonalInformationShow = !this.PersonalInformationShow
                        } else {
                            console.log(res)
                        }
                    })
                } else {
                    console.log(res)
                }
            })
        },
    },
}
</script>
<style scoped>
.Secondstage {
  width: 850px;
  height: 600px;
}
.Second_stage_main {
  width: 850px;
  height: 600px;
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
  height: 600px;
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
.list_head_content_name:hover{
    color: #ffffff;
    cursor: pointer;
    text-decoration: underline;
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