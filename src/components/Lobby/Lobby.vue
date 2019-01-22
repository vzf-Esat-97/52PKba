<template>
    <div class="lobby" id="lobbyWidth">
        <div id="noticeid" class="notice">
            <p> <span>资讯</span> </p>
            <iframe scrolling='no' src="http://chiji.uuu9.com/cjzs/"></iframe>
        </div>
        <div id="lobbyrightConts" class="lobbyrightCont">
            <div id="lob_Headdivs" class="lob_Headdiv">
                <!-- 左边导航切换 -->
                <div class="lob_Headdiv_left">
                    <div :class="{textColor:isCloor==idx}" class="lob_Headdiv_list" v-for="(item,idx) in navData" :key="idx">
                        <p>{{item.name}}</p>
                        <div :class="{borderBoottoms:isCloor==idx}" class="border_Bottom"></div>
                    </div>
                </div>
                <!--右边搜索-->
                <div v-show="shearchShow==1" class="lob_Headdiv_search">
                    <div class="headdiv_Search_left">
                        <input type="text">
                    </div>
                    <img src="../../assets/images/搜索.png" alt="">
                </div>
            </div>
            <div class="lobbg_cont">
                <!-- <router-view></router-view> -->
                <RecommendCompetitions :is="lobbypage" />
            </div>
        </div>
    </div>
</template>
<script>
import RecommendCompetitions from './RecommendCompetitions' //推荐赛事
import CompetitionStageSchedule from './CompetitionStageSchedule' //赛程
export default {
    name: 'Lobby',
    components: {
        RecommendCompetitions,
        CompetitionStageSchedule
    },
    data() {
        return {
            isCloor: 0,
            shearchShow: 0,
            navData: [
                {
                    name: '大厅'
                }
            ],
            myWidth: 0,
            lobbypage: 'RecommendCompetitions'
        }
    },
    computed: {
        homepageHeight() {
            return this.$store.state.other.homepage
        }
    },
    watch: {

    },
    mounted() {

    },
    methods: {

    }
}
</script>
<style>
.lobby {
  width: 1225px;
  height: 775px;
}
.notice {
  width: 280px;
  height: 775px;
  float: left;
  background-color: #181818;
}
.notice p {
  display: block;
  height: 20px;
  margin: 17px;
  color: #8d8c8d;
  border-left: 2px solid #7800ff;
}
.notice span{
    padding-left: 10px;
}
.notice iframe {
  width: 280px;
  height: 715px;
  border: 0;
}
.lobbyrightCont {
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
</style>