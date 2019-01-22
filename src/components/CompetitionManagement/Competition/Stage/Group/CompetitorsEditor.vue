<template>
    <div id="Competitiongropspeples">
        <div id="yuliuSearch">
            <img src="../../../../../assets/images/search.png" alt="" @click="searchName">
            <el-input placeholder="搜索人员" @keyup.13="searchEnter">
            </el-input>
        </div>
        <div v-if="!group" class="no-group">
            无
        </div>
        <div v-else class="group">
            <!-- 本组成员 -->
            <div class="group_top">
                <div class="main_member">
                    <p>本组成员 <span>( {{group.competitors.length}} / {{competitorLimit}} )</span> </p>
                </div>
                <div class="main_member_list">
                    <ul>
                        <li v-for="(competitor,idx) in group.competitors" :key="idx">
                            <div class="main_member_li">
                                <div class="main_li_img">
                                    <img :src="competitor.icon" alt="">
                                </div>
                                <p>{{competitor.name}}</p>
                                <div @click="remove(idx)" class="main_li_del">
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 未分组成员 -->
            <div class="mainCntent_down">
                <div class="no_member_head">
                    <p>未分组 <span>( 0 )</span></p>
                </div>
                <div class="main_member_list no_member_list">
                    <ul>
                        <li v-for="(competitor,idx) in noGroupCompetitors" @mouseover="showAddID=competitor.id" @contextmenu.prevent="addMember(competitor)" v-on:mouseleave="mouseLeaveli" :key="idx">
                            <div class="main_member_li">
                                <div class="main_li_img">
                                    <img :src="competitor.icon" alt="">
                                </div>
                                <p>{{competitor.name}}</p>
                                <div v-show="showAddID!==competitor.id" class="main_li_integral">
                                    <!-- 25 -->
                                </div>
                                <div v-show="showAddID===competitor.id" class="main_li_integral">
                                    <!-- <div v-show="ishowAdd===competitor.id" class="main_li_add"> -->
                                    <span @click="add(idx)">+++</span>
                                    <!-- </div> -->
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CompetitorsEditor',
    props: {
        group: Object,
        noGroupCompetitors: Array,
        competitorLimit: Number
    },
    data() {
        return {
            ishowAdd: 0,
            showAddID: undefined
        }
    },
    methods: {
        //  点击图标搜索
        searchName() {
            console.log(this.group)
        },
        searchEnter() {
            //点击键盘Enter
        },
        // 鼠标右键事件
        addMember(competitor) {
            this.ishowAdd = competitor.id
            console.log(competitor.id)
        },
        // 鼠标离开
        mouseLeaveli() {
            this.ishowAdd = 0
        },
        // 加入该组
        add(competitorIdx) {
            const competitor = this.noGroupCompetitors.splice(competitorIdx, 1)[0]
            this.group.competitors.push(competitor)
        },
        // 删除玩家在该组
        remove(competitorIdx) {
            const competitor = this.group.competitors.splice(competitorIdx, 1)[0]
            this.noGroupCompetitors.push(competitor)
        }
    },
}
</script>

<style>
#Competitiongropspeples {
  width: 240px;
  height: 720px;
}
#yuliuSearch {
  width: 240px;
  height: 55px;
  position: relative;
  border-bottom: 1px solid #252525;
}
/* 搜索图标 */
#yuliuSearch img {
  position: absolute;
  top: 37%;
  left: 82%;
  z-index: 100;
}
/* 搜索框的大小及位置样式*/
#yuliuSearch .el-input {
  width: 208px;
  height: 28px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -104px;
  margin-top: -14px;
}
/* 搜索框样式 */
#yuliuSearch .el-input__inner {
  height: 28px;
  border: 1px solid #4c4c4c;
  border-radius: 0px;
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 15px;
  letter-spacing: 0px;
  color: #fff;
  background-color: #333333;
}
/* 搜索框提示文字颜色 */
#yuliuSearch input::-webkit-input-placeholder {
  color: #8d8c8d;
}

/* 没有选择信息 */
.no-group {
  width: 240px;
  height: 665px;
  text-align: center;
  font-size: 14px;
  color: #8d8c8d;
  line-height: 665px;
}
.group {
  width: 240px;
  height: 665px;
}
.group_top {
  width: 240px;
  height: 452px;
}
.main_member {
  width: 240px;
  height: 33px;
  border-bottom: 1px solid #252525;
  color: #8d8c8d;
  font-size: 12px;
  line-height: 33px;
  margin-bottom: 20px;
}
.main_member p {
  width: 200px;
  height: 33px;
  margin: auto;
  display: flex;
  justify-content: space-between;
}
.main_member span {
  margin-right: 0px;
}
.main_member_list {
  width: 240px;
  height: 384px;
  overflow: auto;
}
.main_member_list::-webkit-scrollbar {
  display: none;
}
.main_member_list ul {
  margin: 0;
  min-height: 36px;
}
.main_member_list li {
  display: inline-block;
  width: 240px;
  height: 36px;
  color: #8d8c8d;
  font-size: 14px;
  position: relative;
}
.main_member_list li:hover {
  background-color: #333333;
  color: #ffffff;
}
.main_member_li {
  width: 204px;
  height: 24px;
  margin: 6px auto;
}
.main_member_li p {
  float: left;
  line-height: 22px;
  margin-left: 8px;
  margin-bottom: 0;
}
.main_li_img {
  width: 24px;
  height: 24px;
  background-image: linear-gradient(0deg, #252525 0%, #454545 100%);
  float: left;
}
.main_li_img img {
  width: 18px;
  height: 13px;
  margin-left: 3px;
}
.main_li_del {
  width: 24px;
  height: 24px;
  float: right;
  background: url("../../../../../assets/images/人员添加的关闭（鼠标为悬浮时.png")
    no-repeat;
  background-position: 7px 6px;
  cursor: pointer;
}
.main_member_list li:hover .main_li_del {
  background: url("../../../../../assets/images/人员添加的关闭（鼠标悬浮后的.png")
    no-repeat;
  background-position: 7px 6px;
}

.mainCntent_down {
  width: 240px;
  height: 213px;
}
.no_member_head {
  width: 240px;
  height: 21px;
  border-bottom: 1px solid #252525;
  font-size: 12px;
  color: #8d8c8d;
}
.no_member_head p {
  width: 200px;
  margin: auto;
  display: flex;
  justify-content: space-between;
}
.no_member_list {
  width: 240px;
  height: 173px;
  margin: 10px 0;
  overflow: auto;
}
.no_member_list::-webkit-scrollbar {
  display: none;
}

.main_li_integral {
  width: 24px;
  height: 24px;
  float: right;
}
/* 增加好友 */
.main_li_add {
  width: 118px;
  height: 36px;
  background-color: #333333;
  position: absolute;
  top: 36px;
  left: 110px;
  z-index: 99;
  font-size: 14px;
  color: #ffffff;
  line-height: 36px;
}
.main_li_add span {
  cursor: pointer;
  padding-left: 16px;
}
</style>