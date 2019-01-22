<template>
    <div class="Recommend">
        <div class="recommend_Cont">

            <!-- 导航选择 -->
            <div class="recommend_head">
                <div class="options">
                    <div @click="optionsListfuc(1)" :class="{teamoptios:isTeamoptios==1}" class="optionsList">赛事</div>
                    <div @click="optionsListfuc(2)" :class="{teamoptios:isTeamoptios==2}" class="optionsList">赛程</div>
                </div>
            </div>

            <!--列表框-->
            <div class="recommend_listoptons">
                <!-- <saishi/> -->
                <saishi :is=isRouterpath></saishi>
            </div>
        </div>
    </div>
</template>
<script>

import saishi from '@/components/saishi/saishi' //推荐竞赛 赛事
import saicheng from '@/components/saicheng/saicheng' //推荐竞赛 赛程
export default {
    components:{
        saishi,
        saicheng
    },
    name: 'timeModule',
    data() {
        return {
            isRouterpath:'saishi',
            isTeamoptios: 1,
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
        optionsListfuc(i) {
            this.isTeamoptios = i
            if(i==1){
                this.isRouterpath='saishi'
            }else{
                this.isRouterpath='saicheng'
            }
        }
    }
}
</script>
<style>
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
  height: 720px;
  margin: auto;
}
.recommend_head {
  width: 856px;
  height: 20px;
  background-color: #181818;
  padding: 16px 0 32px 0;
}
.recommend_listoptons {
  width: 856px;
}
.options {
  width: 92px;
  height: 33px;
  margin-left: 20px;
  display: flex;
  justify-content: space-between;
}
.optionsList {
  width: 30px;
  height: 33px;
  font-size: 14px;
  color: #8d8c8d;
  text-align: center;
  cursor: pointer;
}
.optionsList:hover {
  border-bottom: 3px solid #7800ff;
  color: #ffffff;
}
.teamoptios {
  border-bottom: 3px solid #7800ff;
  color: #ffffff;
}
</style>