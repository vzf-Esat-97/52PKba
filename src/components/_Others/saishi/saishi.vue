<template>
    <div class="saisRecommend">
        <div class="saisiRecomdiv">
            <div v-for="idx in testdata" :key='idx' v-on:mouseenter='location' v-on:mouseleave="closeDiv" id="saisListid" class="saiList">
                <div @click="location" class="saiList1">
                    <div class="saiList_left">
                        <div class="saisgameName">WCG吃鸡赛事</div>
                        <div class="saisgameTime">2018-10-15开始</div>
                        
                        <div class="saisgameype">
                            <div class="saisTeamname">
                                队伍: <span>999</span>/100
                            </div>
                            <div class="saisTeamaward">
                                奖励：200 PK币
                            </div>
                        </div>
                    </div>
                    <div class="saiList_right">
                        <button class="saishiBaom">立即报名</button>
                    </div>
                </div>
                <div v-show="saishiteamMsgup" id="saishiteamMsgups" class="saisMousediv">
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
    </div>
</template>
<script>

export default {
    name: 'saishi',
    data() {
        return {
            isCloor: 0,
            saishiteamMsgup:false,
            islassStyle: false,
            ishowUp: false,
            testdata:[1]
        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {
    },
    methods: {
        // 鼠标点击位置
        location(event) {
            this.saishiteamMsgup = true
            this.islassStyle = false
            this.ishowUp = false
            event = event || window.event;
            const recommendListid = document.getElementById('saisListid')
            const positionX = event.clientX - recommendListid.offsetLeft;
            console.log(positionX)
            if (positionX > 615) {
                document.getElementById('saishiteamMsgups').style.left = 615 + `px`
            } else {
                document.getElementById('saishiteamMsgups').style.left = positionX + `px`
            }
        },
        addPPeoples() {
            this.islassStyle = true
            this.ishowUp = true
        },
        closeDiv(){
            this.saishiteamMsgup=false
        }
    }
}
</script>
<style>
.saisRecommend {
  width: 100%;
  height: 100%;
}
.saisiRecomdiv {
  width: 856px;
  min-height: 544px;
  background-color: #181818;
  border: solid 1px #252525;
}
.saiList {
  width: 855px;
  height: 60px;
  position: relative;
}
.saiList1 {
  width: 855px;
  height: 60px;
  background-color: #181818;
  border: solid 1px #252525;
  display: flex;
  justify-content: space-between;
}
.saiList1:hover {
  border: solid 1px #8d8c8d;
}
.saiList_left {
  width: 727px;
  height: 60px;
  display: flex;
  justify-content: space-between;
}
.saisgameName {
  width: 140px;
  height: 60px;
  text-align: center;
  line-height: 60px;
}
.saisgameTime {
  width: 200px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  color: #ffffff;
}
.saisgameype {
  width: 300px;
  height: 60px;
  display: flex;
  justify-content: space-between;
}
.saisTeamname {
  width: 150px;
  height: 60px;
  text-align: center;
  font-size: 14px;
  color: #8d8c8d;
  line-height: 60px;
}
.saisTeamname span {
  color: #ffffff;
}
.saisTeamaward {
  width: 150px;
  height: 60px;
  text-align: center;
  color: #8d8c8d;
  font-size: 14px;
  line-height: 60px;
}
.saiList_right {
  width: 127px;
  height: 59px;
  border-left: 1px solid #333333;
}
.saishiBaom {
  width: 80px;
  height: 28px;
  background-color: #7800ff;
  border: 0;
  outline: none;
  color: #ffffff;
  font-size: 14px;
  margin: 15px 25px;
}
.saisMousediv {
  width: 240px;
  height: 184px;
  background-color: #121212;
  border: solid 1px #4c4c4c;
  position: absolute;
  top: 60px;
  animation: saismove 0.1s;
  z-index: 999;
}
@keyframes saismove {
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
  cursor: pointer;
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
.overGamediv {
  width: 856px;
  min-height: 60px;
  position: absolute;
  top: 60px;
  left: -1px;
  z-index: 99;
}
.overGamelist {
  width: 856px;
  height: 40px;
  background-color: #181818;
  border: solid 1px #252525;
  display: flex;
  justify-content: space-between;
}
.overGameList_l {
  width: 50%;
  height: 100%;
  font-size: 14px;
}
.overGamelist span {
  line-height: 40px;
  color: #8d8c8d;
}
.overGameList_r {
  width: 50%;
  height: 100%;
}
.overGameList_r span{
    display: inline-block;
    width: 120px;
}
.overGameteam_img {
  width: 24px;
  height: 24px;
  background-image: linear-gradient(0deg, #252525 0%, #454545 100%);
  margin: 8px 16px;
  float: left;
}
.overGameteam_img img {
  width: 18px;
  height: 13px;
  margin: 3px;
}
.overGamelist:hover {
  background-color: #333333;
}
.overGamelist:hover span {
  color: #ffffff;
}
</style>