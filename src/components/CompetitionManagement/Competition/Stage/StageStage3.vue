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
                        <li v-for="(item,index) in newslist" :key="index">
                            <div class="main_content_list_head">
                                <el-checkbox class="main_content_list_checkbox" @change="change(item)" v-model="item.inputType"></el-checkbox>
                                <div class="list_head_content">
                                    <span style="width:30px;text-align:center">1</span>
                                    <div class="list_head_content_img"></div>
                                    <div class="list_head_content_name">
                                        你是个逗比战队
                                    </div>
                                    <div class="list_head_content_math">
                                        <span style="width:115px;">组15 — 01</span>
                                        <span style="width:50px;margin-left: 0px; text-align: center;">45</span>
                                        <span style="width:50px;margin-left: 60px; text-align: center;">450</span>
                                        <span style="width:50px;margin-left: 44px; text-align: right;">450</span>
                                    </div>
                                </div>
                                <div class="list_head_triangle"></div>
                            </div>
                            <transition name="fade">
                                <div v-show="item.openFlag" class="main_content_select">
                                    <div class="main_content_select_head">
                                        <div class="main_select_head_nav">

                                        </div>
                                    </div>
                                    <div class="main_select_content">
                                        <div class="main_select_content_li">
                                            <span>场次名次：01</span> <span>击杀人数：60</span> <span>击倒人数：60</span> <span>爆头击杀：60</span>
                                        </div>
                                        <div class="main_select_content_li main_select_content_span">
                                            <span>总伤害：60</span> <span>治疗量：60</span> <span>最大伤害：60</span> <span>存活时间：60</span>
                                        </div>
                                        <div class="main_select_content_li">
                                            <span>奔跑距离：60</span> <span>最远击杀：60</span> <span>助攻：60</span> <span></span>
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
    name: 'StageStage3',
    props: {
        stage: Object
    },
    data() {
        return {
            competitors: [1, 2, 3],//阶段参赛者集合
            liConHeight: 50,
            isMainsselect: false,
            newslist: [{ name: 123, openFlag: false }, { name: 123, openFlag: false }, { name: 123, openFlag: false }, { inputType: false, }]
        }
    },
    watch: {
    },
    mounted() {
    },
    methods: {
        listclick(item) {
            item.openFlag = !item.openFlag
        },
        change(item) {
            console.log(item)
        }
    },
}
</script>
<style scoped>
.Secondstage {
  width: 945px;
  height: 694px;
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
.main_content_list_checkbox .el-checkbox__inner{
    background-color: #141414 !important;
}

</style>