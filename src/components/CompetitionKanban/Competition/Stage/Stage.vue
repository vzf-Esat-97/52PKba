<template>
    <!-- 推荐竞赛页面 -->
    <div class="Recommend">
        <div class="main_nav">
            <div class="main_nav_content">
                <ul>
                    <li :class="{mainnavclass:ismainnavclass===0}" @click="ismainnavclass=0">
                        赛程
                        <div class="main_div_border" :class="{mainborderclass:ismainnavclass===0}"></div>
                    </li>
                    <li :class="{mainnavclass:ismainnavclass===1}" @click="ismainnavclass=1">
                        排名
                        <div class="main_div_border" :class="{mainborderclass:ismainnavclass===1}"></div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="recommend_Cont">
            <StageSchedule :stage='stage' v-show="ismainnavclass===0" />
            <StageRanking :stage='stage' v-show="ismainnavclass===1" />
        </div>
    </div>
</template>
<script>
import StageSchedule from './StageSchedule'
import StageRanking from './StageRanking'
export default {
    name: 'Stage',
    components: {
        StageSchedule,
        StageRanking
    },
    props: {
        stage: Object
    },
    data() {
        return {
            competitors: [],
            ismainnavclass: 0,
            isCloor: 0,
            islassStyle: false,
            ishowUp: false,
            ishow: 0,
            ishowtime: 0,
            testdata: [1]
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
        refresh(){

        },
        // 查看
        check(idx) {
            this.ishow = idx
            this.ishowtime = idx
        }
    }
}
</script>
<style lang="less" scoped>
.stage-schedule {
  width: 856px;
  height: 500px;
  margin: 0px auto 24px auto;
  overflow: auto;
}
.stage-schedule::-webkit-scrollbar {
  display: none;
}

.Recommend {
  width: 945px;
  height: 720px;
  background-color: #1e1e1e;
}
.Recommend p {
  margin: 0;
}
.recommend_Cont {
  width: 856px;
  height: 600px;
  margin: 29px auto 24px auto;
  overflow: auto;
}
.recommend_Cont::-webkit-scrollbar {
  display: none;
}

// 导航切换
.main_nav {
  width: 945px;
  height: 52px;
  border-bottom: 1px solid #333333;
}
.main_nav_content {
  width: 817px;
  height: 33px;
  margin: auto;
  padding-top: 20px;
}
.main_nav_content li {
  list-style: none;
  float: left;
  position: relative;
  margin-right: 31px;
  font-size: 14px;
  color: #8d8c8d;
  cursor: pointer;
}
.main_nav_content li:hover {
  color: #fefeff;
}
.mainnavclass {
  color: #fefeff !important;
}
.main_div_border {
  width: 24px;
  height: 3px;
  position: absolute;
  top: 30px;
  left: 1px;
}
.main_nav_content li:hover .main_div_border {
  background-color: #7800ff;
}
.mainborderclass {
  background-color: #7800ff !important;
}
</style>