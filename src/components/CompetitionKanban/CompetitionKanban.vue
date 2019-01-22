<template>
    <div class="competition-kanban" id="competition-kanbanWidth">
        <!-- 左边人员信息栏 -->
        <div class="combisaiNotice">
            <div class="competitionSearch">
                <div style="height:13px;"></div>
                <div class="comSearchdiv">
                    <input placeholder="请输入好友信息" type="text">
                    <img src="../../assets/images/搜索.png" alt="">
                </div>
            </div>
            <div style="height:13px;"></div>
            <!-- 赛事信息 -->
            <div v-show="!selectedCompetition" class="compeionsListdiv">
                <div :class="{compeionsListstyle:iscompeionsList===0}" @click.right.stop="clickShow" v-on:mouseleave="closeDiv" class="compeionsList">
                    <div class="compeionsListimg">
                        <img src="../../assets/images/pubg.png" alt="">
                    </div>
                    <span>bbbb123</span>
                    <!--好友管理-->
                    <div v-show="resonMsgdiv" class="resonMsg">
                        <div v-for="(item,idx) in resonName" :key="idx" class="resonMsglist">
                            <span>{{item.name}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 赛事概况左边搜索及人员列表框-->
            <div v-show="selectedCompetition" class="compeionsListdiv">
                <div v-if="selectedStage" class="overviewList">
                    <div class="over_Name">
                        <p>参赛人员</p>
                    </div>
                    <div v-for="(competitors,idx) in selectedStage.competitors" :key="idx" :class="{compeionsListstyle:iscompeionsList==1}" @click.right.stop="clickShow" v-on:mouseleave="closeDiv" class="compeionsList">
                        <div class="compeionsListimg">
                            <img :src="competitors.icon" alt="">
                        </div>
                        <span>{{competitors.name}}</span>
                        <!--好友管理-->
                        <div v-show="resonMsgdiv" class="resonMsg">
                            <div v-for="(item,idx) in resonName" :key="idx" class="resonMsglist">
                                <span>{{item.name}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="overviewPeoples">
                    <div class="over_Name">
                        <p>本次赛事成员</p>
                    </div>
                    <div v-if="selectedStage" :class="{compeionsListstyle:iscompeionsList==1}" @click.right.stop="overclickShow" v-on:mouseleave="closeDiv" class="compeionsList">
                        <div class="overlist_l" v-for="(competitors,idx) in selectedStage.competitors" :key="idx">
                            <div class="compeionsListimg">
                                <img :src="competitors.icon" alt="">
                            </div>
                            <span :class="{overNameclass:isoverNameclass==0}">{{competitors.name}}</span>
                        </div>
                        <!-- <div @click="delPeoples" class="overlist_r"></div> -->
                        <!--好友管理-->
                        <div v-show="overesonMsgdiv" class="overresonMsg">
                            <div v-for="(item,idx) in voerName" :key="idx" class="resonMsglist">
                                <span>{{item.name}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 右边搜索及内容 -->
        <div class="competition-kanbanrightCont">
            <div id="lob_Headdivs" class="lob_Headdiv">
                <!-- 左边导航切换 -->
                <template v-if="selectedCompetition">
                    <!-- 左边导航切换赛事概况 -->
                    <div class="lob_Headdiv_left_saishi">
                        <div @click="lobNavchiocesai(0)" :class="{textColor:issaishiCloor===0}" class="list_main_nav">
                            <p>赛事概况</p>
                            <div :class="{borderBoottoms:issaishiCloor==0}" class="border_Bottom"></div>
                        </div>
                        <div @click="lobNavchiocesai(idx+1,stage)" :class="{textColor:issaishiCloor===idx+1}" class="list_main_nav" v-for="(stage,idx) in selectedCompetition.stages" :key="idx">
                            <p>{{stage.name}}</p>
                            <div :class="{borderBoottoms:issaishiCloor==idx+1}" class="border_Bottom"></div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="lob_Headdiv_left">
                        <div @click="lobNavchioce(0)" :class="{textColor:isCloor===0}" class="lob_Headdiv_list">
                            <p>赛事</p>
                            <div :class="{borderBoottoms:isCloor==0}" class="border_Bottom"></div>
                        </div>
                        <div @click="lobNavchioce(1)" :class="{textColor:isCloor===1}" class="lob_Headdiv_list">
                            <p>我的赛事</p>
                            <div :class="{borderBoottoms:isCloor==1}" class="border_Bottom"></div>
                        </div>
                    </div>
                    <!--右边搜索-->
                    <div class="lob_Headdiv_search">
                        <div class="headdiv_Search_left">
                            <input placeholder="请输入比赛" type="text">
                        </div>
                        <img src="../../assets/images/搜索.png" alt="">
                    </div>
                </template>
            </div>
            <div v-if="$store.state.other.selectedGame" class="lobbg_cont">
                <template>
                     <!-- 所有赛事列表 -->
                    <CompetitionList v-if="iscompetition===1" @onSelectCompetition="onSelectCompetition" :gameID="$store.state.base.myGames[0].id" />
                    <!-- 我的赛事列表 -->
                    <MyCompetitionList v-else-if="iscompetition===2" @onSelectCompetition="onSelectCompetition" :gameID="$store.state.base.myGames[0].id"/>
                    <Competition v-else-if="iscompetition===3" @goback="onGoback" :competition="selectedCompetition" />
                    <Stage v-else :stage="selectedStage" />
                </template>
            </div>
        </div>
    </div>
</template>
<script>

import CompetitionList from './CompetitionList' // 赛事
import MyCompetitionList from './MyCompetitionList' //我的赛事
import Competition from './Competition/Competition' //赛程详情
import Stage from './Competition/Stage/Stage' //赛程
export default {
    name: 'CompetitionKanban',
    components: {
        CompetitionList,
        MyCompetitionList,
        Competition,
        Stage
    },
    data() {
        return {
            selectedCompetition: undefined,
            selectedStage: undefined,
            iscompetition: 1,
            isCloor: 0,
            issaishiCloor: 0,
            overesonMsgdiv: false,
            iscompeionsList: 0,
            resonMsgdiv: false,
            isoverNameclass: 1,
            resonName: [
                {
                    name: '查看战绩'
                },
                {
                    name: '删除好友'
                },
                {
                    name: '邀请加入战队'
                },
                {
                    name: '邀请加入竞赛'
                }
            ],
            voerName: [
                {
                    name: '查看战绩'
                },
                {
                    name: '删除好友'
                },
                {
                    name: '邀请加入战队'
                },
                {
                    name: '剔出竞赛队伍'
                }
            ],
            myWidth: 0,
            flag: 0,
            paramsnowGameId:''
        }
    },
    computed: {
        homepageHeight() {
            return this.$store.state.other.homepage
        },
        paramsGameid(){
            return this.$route.params.gameID
        }
    },
    watch: {
        paramsGameid(){
            this.refresh()
        },
        paramsnowGameId(newval,oldval){
            if(newval){
                this.selectedCompetition=this.$route.params.nowGameId
                this.selectedCompetition.stages = []
                this.selectedCompetition.stages.push(this.$route.params.nowGameId.currentStage)
                this.iscompetition=3
                console.log(this.selectedCompetition)
                console.log(newval,123456)
                console.log(this.$store.state.other.selectedGame)
            }
        }
    },
    mounted() {
        // this.refresh()
        // console.log(this.$route.params.nowGameId)
        if(this.$route.params.nowGameId){
            this.paramsnowGameId=this.$route.params.nowGameId.id
        }else{
            this.refresh()
        }
    },
    methods: {
        refresh() {
            const gameID = this.$route.params.gameSate
            if (gameID === 1) {
                this.iscompetition = 2
                this.$store.state.base.myGames[0].id = this.$route.params.gameID
                this.isCloor = gameID
            }
        },
        // 获取mycommppetion组件传的id值
        onSelectCompetition(competition) {
            const url = `/api/CompetitionStage/${competition.id}`
            this.$fetch(url).then((res) => {
                if (res.code == 0) {
                    const stages = []
                    res.data.forEach(stage => {
                        stages.push(stage)
                    });
                    competition.stages = stages
                }
                this.selectedCompetition = competition
            })
            this.iscompetition = 3
            this.flag = 0
        },
        lobNavchioce(idx) {
            this.isCloor = idx
            localStorage.setItem('iscompetition',idx)
            if (idx == 0) {
                this.iscompetition = 1
            } else if (idx == 1) {
                this.iscompetition = 2
                
            }
        },
        lobNavchiocesai(idx, stage) {
            this.issaishiCloor = idx
            if (idx == 0) {
                this.iscompetition = 3
            } else {
                this.iscompetition = 4
            }
            this.selectedStage = stage
        },
        // 上面的 右键
        clickShow(parameter) {
            parameter.preventDefault()
            this.resonMsgdiv = true
        },
        // 下面的右键
        overclickShow(parameter) {
            parameter.preventDefault()
            this.overesonMsgdiv = true
        },
        closeDiv() {
            this.resonMsgdiv = false
            this.overesonMsgdiv = false
        },
        // 删除
        delPeoples() {

        },
        // 获取赛事概况返回数据
        onGoback(data) {
            this.selectedCompetition = undefined
            if (localStorage.getItem('iscompetition') == 0) {
                this.iscompetition = 1
            } else {
                this.iscompetition = 2
            }
        },
    }
}
</script>
<style scoped>
.competition-list {
  width: 945px;
  height: 720px;
  background-color: #1e1e1e;
}
.my-competition-list {
  width: 945px;
  height: 720px;
  background-color: #1e1e1e;
}
.competition-kanban {
  width: 1225px;
  height: 775px;
}
.combisaiNotice {
  width: 280px;
  height: 775px;
  float: left;
  background-color: #181818;
  position: relative;
}
.competitionSearch {
  width: 100%;
  height: 55px;
  border-bottom: 1px solid #252525;
}
.comSearchdiv {
  width: 240px;
  height: 30px;
  background-color: #373739;
  border: solid 1px #4c4c4c;
  margin: 0px 20px 0 20px;
}
.comSearchdiv input {
  width: 200px;
  height: 28px;
  border: 0;
  outline: none;
  background-color: #373739;
  color: #ffffff;
  padding: 10px;
  font-size: 14px;
  float: left;
}
.comSearchdiv img {
  width: 16px;
  height: 16px;
  margin: 6px;
}
.compeionsListdiv {
  width: 280px;
  min-height: 700px;
  position: absolute;
  top: 68px;
}
.compeionsList {
  width: 280px;
  height: 36px;
  position: relative;
  color: #ffffff;
}

/* .compeionsList:hover {
  color: #ffffff;
} */
.resonMsg {
  width: 120px;
  height: 146px;
  background-color: #121212;
  border: solid 1px #4c4c4c;
  position: absolute;
  left: 144px;
  top: 36px;
}
.resonMsglist {
  width: 118px;
  height: 36px;
  line-height: 36px;
  color: #8d8c8d;
  font-size: 14px;
  cursor: pointer;
}

.resonMsglist:hover {
  background-color: #333333;
  color: #ffffff;
}

.resonMsglist span {
  padding-left: 16px;
}
.compeionsList span {
  line-height: 36px;
}
.compeionsListstyle {
  background-color: #333333;
  color: #ffffff;
}
.compeionsListimg {
  width: 24px;
  height: 24px;
  background-image: linear-gradient(0deg, #252525 0%, #454545 100%);
  margin: 6px 8px 0 20px;
  float: left;
}
.compeionsListimg img {
  width: 18px;
  height: 13px;
  margin: 3px;
}

.competition-kanbanrightCont {
  width: 945px;
  height: 775px;
  float: left;
}
.lob_Headdiv {
  width: 945px;
  height: 55px;
  background-color: #141414;
}
.lob_Headdiv_left {
  width: 175px;
  height: 55px;
  float: left;
  margin-left: 32px;
  display: flex;
  justify-content: space-between;
}
.lob_Headdiv_left_saishi {
  width: 880px;
  height: 55px;
  float: left;
  margin-left: 32px;
  overflow: -webkit-paged-x;
}
.lob_Headdiv_left_saishi::-webkit-scrollbar {
  display: none;
}
.lob_Headdiv_list {
  width: 64px;
  height: 55px;
  margin: 0;
  cursor: pointer;
  line-height: 55px;
  color: #8d8c8d;
  font-size: 16px;
  position: relative;
  text-align: center;
}
.list_main_nav {
  width: 64px;
  height: 55px;
  margin: 0;
  cursor: pointer;
  line-height: 55px;
  color: #8d8c8d;
  font-size: 16px;
  position: relative;
  text-align: center;
  float: left;
  margin-left: 46px;
}
.list_main_nav:nth-child(1) {
  width: 64px;
  height: 55px;
  margin: 0;
  cursor: pointer;
  line-height: 55px;
  color: #8d8c8d;
  font-size: 16px;
  position: relative;
  text-align: center;
  float: left;
  margin-left: 0px;
}
.border_Bottom {
  width: 30px;
  height: 3px;
  background-color: #7800ff;
  position: absolute;
  top: 52px;
  left: 18px;
  display: none;
}
.lob_Headdiv_list:hover {
  color: #fefeff;
}
.lob_Headdiv_list:hover .border_Bottom {
  display: block;
}
.textColor {
  color: #fefeff;
}
.borderBoottoms {
  display: block;
}
.lob_Headdiv_search {
  width: 260px;
  height: 30px;
  float: right;
  margin: 13px 16px 0 0;
  background-color: #373739;
  border: solid 1px #4c4c4c;
}
.lob_Headdiv_search img {
  float: left;
  margin: 6px 0 0 0;
  cursor: pointer;
}
.headdiv_Search_left {
  width: 220px;
  height: 30px;
  float: left;
}
.headdiv_Search_left input {
  width: 220px;
  height: 28px;
  padding: 5px 17px 5px 17px;
  border: 0;
  outline: none;
  background-color: #373739;
  color: #ffffff;
}
.lobbg_cont {
  width: 945px;
  height: 720px;
}

/* 赛事情况 */
.overviewList {
  width: 280px;
  min-height: 450px;
}
.overviewPeoples {
  width: 280px;
  height: 250px;
}
.overviewPeoples::-webkit-scrollbar {
  display: none;
}
.over_Name {
  width: 280px;
  height: 28px;
  border-bottom: 1px solid #252525;
}
.over_Name p {
  margin: 0;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 16px;
  letter-spacing: 0px;
  color: #8d8c8d;
  padding-left: 19px;
}
.overlist_l {
  width: 254px;
  height: 36px;
  float: left;
}
.overlist_r {
  width: 16px;
  height: 36px;
  background: url("../../assets/images/renyuanguanbi.png") no-repeat;
  background-position: 0px 13px;
  float: left;
  cursor: pointer;
}
.compeionsList:hover .overlist_r {
  background: url("../../assets/images/xuanfuguanbi.png") no-repeat;
  background-position: 0px 13px;
}
.overNameclass {
  color: #8d8c8d;
}
.overresonMsg {
  width: 120px;
  height: 146px;
  background-color: #121212;
  border: solid 1px #4c4c4c;
  position: absolute;
  left: 144px;
  top: -146px;
}
</style>