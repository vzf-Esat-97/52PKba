<template>
    <div class="saicRecommend">
        <!-- 占位 -->
        <div style="height:24px;"></div>
        <div class="saicRecommend_Cont">
            <!--列表框-->
            <div id="recommendListid" class="recommend_list" @mouseenter="scenterLocation()" @mouseleave="scleaveLocation()">
                <div class="recommend_list1" @click="location()">
                    <div class="saicroomName">
                        <p>WCG吃鸡赛事 </p>
                    </div>
                    <div class="timeDiv">
                        2018.10.12 14:00开始
                    </div>
                    <div class="peoples">
                        <div class="peoples_l">
                            队伍：<span>69</span> /100
                        </div>
                        <div class="peoples_r">
                            奖励：2000元现金
                        </div>
                    </div>
                </div>
                <div class="sicchioceBtn">
                    <button class="baoming">立即报名</button>
                    <!-- <button class="overBtn">已结束</button>
                    <button class="baoming">立即进入</button>
                    <button class="overBtn">请等候</button> -->
                </div>

                <!-- 添加好友框-->
                <div v-show="isteamMsgup" id="teamMsgupId" class="team_Msg_up">
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
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name: 'timeModule',
    data() {
        return {
            isCloor: 0,
            isteamMsgup: false,
            islassStyle: false,
            ishowUp: false,
            navData: [
                {
                    name: '推荐竞赛'
                },
                {
                    name: '战队竞赛'
                }
            ]
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
        scenterLocation(event) {
            this.isteamMsgup = true
            this.islassStyle = false
            this.ishowUp = false
        },
        scleaveLocation() {
            this.isteamMsgup = false
        },
    }
}
</script>
<style>
.saicRecommend {
  width: 945px;
  height: 720px;
  background-color: #1e1e1e;
}
.saicRecommend p {
  margin: 0;
}
.saicRecommend_Cont {
  width: 856px;
  height: 660px;
  margin: auto;
}
.recommend_list {
  width: 856px;
  height: 60px;
  background-color: #181818;
  border: solid 1px #252525;
  position: relative;
  display: flex;
  justify-content: space-between;
}
.recommend_list:hover {
  border: solid 1px #8d8c8d;
}
.saicroomName {
  width: 180px;
  height: 58px;
  float: left;
  margin-left: 20px;
  font-size: 14px;
  color: #ffffff;
}
.saicroomName p {
  line-height: 58px;
  color: #8d8c8d;
}
.saicRecommend .timeDiv {
  width: 226px;
  height: 58px;
  float: left;
  font-size: 14px;
  line-height: 58px;
  text-align: center;
}
.peoples {
  width: 300px;
  height: 58px;
  float: left;
}
.peoples_l {
  width: 100px;
  height: 58px;
  line-height: 58px;
  float: left;
  font-size: 14px;
  color: #8d8c8d;
}
/* .peoples_l span {
  color: #ffffff;
} */
.peoples_r {
  width: 200px;
  height: 58px;
  line-height: 58px;
  float: left;
  font-size: 14px;
  text-align: center;
  color: #8d8c8d;
}
.sicchioceBtn {
  width: 128px;
  height: 58px;
  float: left;
  border-left: 1px solid #333333;
}
.sicchioceBtn button {
  border: 0;
  outline: none;
  width: 80px;
  height: 28px;
  color: #ffffff;
  font-size: 14px;
  margin: 15px 23px;
}
.baoming {
  background-color: #7800ff;
}
.overBtn {
  background-color: #8d8c8d;
}
.team_Msg_up {
  width: 240px;
  min-height: 184px;
  background-color: #121212;
  border: solid 1px #4c4c4c;
  position: absolute;
  top: 59px;
  left: 615px;
  animation: move 0.1s;
  z-index: 999;
}
@keyframes move {
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
  background: none;
  /* background: url("../../assets/images/renyuanguanbi.png") no-repeat center; */
}
.team_Msg_uplist:hover .team_Msg_upr {
  background: none;
  /* background: url("../../assets/images/xuanfuguanbi.png") no-repeat center; */
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
/* hover 效果 */
.recommend_list:hover .saicroomName p{
    color: #fff;
}
.recommend_list:hover .peoples_l span{ 
    color: #fff;
}
.recommend_list:hover .peoples_r{ 
    color: #fff;
}
</style>