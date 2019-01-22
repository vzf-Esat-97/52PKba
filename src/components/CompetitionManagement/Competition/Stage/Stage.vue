<template>
    <div class="gropsStatedelis">
        <div v-if="CompationStage.state===6" class="one_state">
            <div class="g_conts">
                <div class="gb_table">
                    <div class="gb_phase">
                        <span>第一阶段</span>
                        <span>参赛数量：{{stageCompetitors.length}}人</span>
                    </div>
                    <div class="gb_sheet">
                        <div class="gbs_sheet1">
                            <div class="btn_list1">
                                <ul>
                                    <li v-for="(group,idx) in groups" :key="idx">
                                        <button @click="selectedGroup=group">{{group.name}}</button>
                                    </li>
                                </ul>
                            </div>
                            <div class="gbs_add" @click="AutomatiGroup()">点击自动分组</div>
                        </div>
                        <div class="gbs_sheet2">
                            <div class="gbs_sheet2_content">
                                <div class="btn_list2">
                                    <ul v-if="selectedGroup">
                                        <li v-for="(match,idx) in selectedGroup.matches" :key="idx">
                                            <button @click="selectedMatch=match">{{match.name}}</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="gbs_sheet3">
                            <div class="gbs_sheet3_content">
                                <div class="gbs_box1">
                                    <div class="gbs_font">房间名称：</div>
                                    <input v-if="selectedMatch" type="text" v-model="selectedMatch.name">
                                    <input v-else type="text" value="一号放假">
                                </div>
                                <div class="gbs_box1">
                                    <div class="gbs_font">房间密码：</div>
                                    <input v-if="selectedMatch" type="text" v-model="selectedMatch.password">
                                    <input v-else type="text" value="123456">
                                </div>
                                <div class="gbs_box2">
                                    <div class="gbs_font">赛事开始时间：</div>
                                    <el-date-picker v-model="datetime" type="date" placeholder="选择日期">
                                    </el-date-picker>
                                    <el-time-select v-model="time" :picker-options="{start: '00:00',step: '00:15', end: '24:00'}" placeholder="选择时间">
                                    </el-time-select>
                                </div>
                                <div class="gbs_box2 gbs_box3">
                                    <div class="gbs_font">入场时间：</div>
                                    <el-date-picker v-model="datetime1" type="date" placeholder="选择日期">
                                    </el-date-picker>
                                    <el-time-select v-model="time1" :picker-options="{start: '00:00',step: '00:15', end: '24:00'}" placeholder="选择时间">
                                    </el-time-select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="operation_btn">
                    <button @click="determine">发布赛事</button>
                    <button @click="save" class="operation_btn_disable">保存</button>
                </div>
                <el-dialog id="auto-group-setting" class="closeDiv" :visible.sync="isShowAutoGroupSetting" width="380px">
                    <AutoGroupSetting :noGroupCompetitors="noGroupCompetitors" :groups="groups" :competitorLimit="competitorLimit" @onAutoGroupSettingOK="onAutoGroupSettingOK" />
                </el-dialog>
            </div>
            <div class="g_conts_personnel">
                <div class="g_conts_personnel_search">
                    <img src="../../../../assets/images/search.png" alt="">
                    <el-input placeholder="搜索人员">
                    </el-input>
                </div>
                <div class="oneself_group">
                    <div class="oneself_group_title">
                        <span class="oneself_group_title_left">本组成员</span>
                        <span v-if="selectedGroup" class="oneself_group_title_center">( {{selectedGroup.competitors.length}} / {{competitorLimit}} )</span>
                        <span class="oneself_group_title_right">战队积分</span>
                    </div>
                    <div class="oneself-group-list">
                        <ul v-if="selectedGroup">
                            <li v-for="(competitor,idx) in selectedGroup.competitors" :key="idx">
                                <div class="oneself-group-location">
                                    <div class="oneself-group-list-img1">
                                        <img :src="competitor.icon" alt="">
                                        <img src="../../../../assets/images/pubg.png" alt="">
                                    </div>
                                    <span>{{competitor.name}}</span>
                                    <span class="oneself-group-list_integral">10</span>
                                    <div @click="removeCompetitorFromGroup(idx,selectedGroup)" class="oneself-group-list-btn"></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="No_group">
                    <div class="No_group_title">
                        <span class="No_group_title_left">未分组</span>
                        <span class="No_group_title_center">( {{noGroupCompetitors.length}} )</span>
                        <span class="No_group_title_right">战队积分</span>
                    </div>
                    <div class="no-group-list">
                        <ul>
                            <li v-for="(competitor,idx) in noGroupCompetitors" :key="idx">
                                <div class="no-group-list-location">
                                    <div class="no-group-list-img1"><img src="../../../../assets/images/pubg.png" alt=""></div>
                                    <span>{{competitor.name}}</span>
                                    <span class="no-group-list_integral">10</span>
                                    <div @click="addNoGroupCompetitorToGroup(idx,selectedGroup)" class="no-group-list-btn"></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="CompationStage.state===2" class="gropspeoples">
            <StageStage2 :stageID="stage.id" :winnerLimit="winnerLimit" @onDetermineWinnerListSuc="onDetermineWinnerListSuc" />
        </div>
        <div v-else-if="CompationStage.state===3" class="gropspeoples">
            <StageStage3 />
        </div>
        <div v-else-if="CompationStage.state===1" class="gropspeoplesp">
            <p>敬请期待...</p>
        </div>
    </div>
</template>
<script>
import AutoGroupSetting from './AutoGroupSetting'
// import CompetitorsEditor from './Group/CompetitorsEditor'
import StageStage2 from './StageStage2'
import StageStage3 from './StageStage3'
export default {
    components: {
        AutoGroupSetting,
        StageStage2,
        StageStage3
        // CompetitorsEditor
    },
    props: {
        stage: Object,
        winnerLimit: Number,
        competition:Object
    },
    data() {
        return {
            stageCompetitors: [],//阶段参赛者集合
            noGroupCompetitors: [],//阶段未分组参赛者集合
            groups: [],
            competitorLimit: 100,//通过赛事单位计算出来的
            selectedGroup: undefined,
            selectedMatch: undefined,
            stageE: undefined,
            value1: '',
            value2: '',
            squad: [],
            datetime: '',
            datetime1: '',
            time: '',
            time1: '',
            contestmath: '',
            contestdata: [],
            isShowAutoGroupSetting: false,
            delGroupgepeoples: undefined,
            newGroups: [],
            CompationStage:{
                state:1
            }
        }
    },
    watch: {
        stage() {
            this.refresh()
            console.log("newval")
            console.log(12312323132123132132321)
        },
        groups() {
            this.selectedGroup = this.groups.length > 0 ? this.groups[0] : undefined
            this.calculationNoGroupCompetitors()
        },
        stageCompetitors() {
            this.calculationNoGroupCompetitors()
        }
    },
    mounted() {
        this.refresh()
    },
    methods: {
        refresh() {
            console.log(this.stage)
            console.log(this.competition)
            if(this.competition.type===0){
                this.competition.stages.forEach((item)=>{
                    if(item.state===1){
                        this.CompationStage.state=4
                        return
                    }else{
                        this.CompationStage.state=item.state
                    }
                })
            }
            if (!this.stage) return
            if (this.stage.state === 1) {
                {
                    const url = `/api/MCompetitionStage/${this.stage.id}/Groups`
                    this.$fetch(url).then((res) => {
                        if (res.code == 0) {
                            const groups = []
                            res.data.forEach(group => {
                                groups.push(group)
                            });
                            this.groups = groups
                        }
                    })
                }
                {
                    const url = `/api/MCompetitionStage/${this.stage.id}/Competitors`
                    this.$fetch(url).then((res) => {
                        if (res.code == 0) {
                            const stageCompetitors = []
                            res.data.forEach(stageCompetitor => {
                                console.log(stageCompetitor)
                                stageCompetitors.push(stageCompetitor)
                            });
                            this.stageCompetitors = stageCompetitors
                        }
                    })
                }
            }
        },
        calculationNoGroupCompetitors() {
            const noGroupCompetitors = []
            for (let i = 0; i < this.stageCompetitors.length; i++) {
                const stageCompetitor = this.stageCompetitors[i]
                let competitorIsNoGroup = true
                for (let j = 0; j < this.groups.length; j++) {
                    const group = this.groups[j]
                    for (let k = 0; k < group.competitors.length; k++) {
                        const groupCompetitor = group.competitors[k];
                        if (groupCompetitor.cscID === stageCompetitor.cscID) {
                            competitorIsNoGroup = false
                            break
                        }
                    }
                }
                if (competitorIsNoGroup) {
                    noGroupCompetitors.push(stageCompetitor)
                }
            }
            this.noGroupCompetitors = noGroupCompetitors
        },
        onAutoGroupSettingOK() {
            this.isShowAutoGroupSetting = false
            if (this.groups.length > 0) {
                this.selectedGroup = this.groups[0]
            }
        },
        save() {
            if (this.stageCompetitors.length != 0) {
                const url = `/api/MCompetitionGroup/${this.stage.id}`
                const data = []
                this.groups.forEach(group => {
                    const dataGroup = {
                        name: group.name,
                        cscIDs: [],
                        matches: []
                    }
                    group.competitors.forEach(competitor => {
                        dataGroup.cscIDs.push(competitor.cscID)
                    })
                    group.matches.forEach(match => {
                        dataGroup.matches.push({
                            name: match.name,
                            password: match.password,
                            enterTime: match.enterTime,
                            startTime: match.startTime
                        })
                    })
                    data.push(dataGroup)
                })
                this.$put(url, data).then((res) => {
                    if (res.code == 0) {
                        // this.$emit('onStageSaveGroup')
                        this.$message({
                            message: '保存分组成功',
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        })
                    }
                })
            }else{
                this.$message({
                    message: '参赛者为零不能保存!',
                    type: 'warning'
                });
            }
        },
        //确认分组
        determine(data) {
            if (this.stageCompetitors.length != 0) {
                const url = `/api/MCompetitionGroup/${this.stage.id}/Determine`
                this.$put(url).then((res) => {
                    if (res.code == 0) {
                        console.log('确认分组成功')
                        this.$emit('onStageDetermineGroup')
                        this.$message({
                            message: '分组成功',
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        })
                    }
                })
            } else {
                this.$message({
                    message: '参赛者为零不能发布!',
                    type: 'warning'
                });
            }
        },
        onDetermineWinnerListSuc() {
            this.$emit('onDetermineWinnerListSuc', this.stage)
        },
        // 加入该组
        addNoGroupCompetitorToGroup(noGroupCompetitorIdx, group) {
            if (group) {
                const competitor = this.noGroupCompetitors.splice(noGroupCompetitorIdx, 1)[0]
                group.competitors.push(competitor)
            }
        },
        // 删除玩家在该组
        removeCompetitorFromGroup(competitorIdx, group) {
            console.log(123123213)
            const competitor = group.competitors.splice(competitorIdx, 1)[0]
            this.noGroupCompetitors.push(competitor)
        },
        // 点击自动分组弹框
        AutomatiGroup() {
            if (this.stageCompetitors.length != 0) {
                this.isShowAutoGroupSetting = true
            } else {
                this.$message({
                    message: '参赛者为零不能分组!',
                    type: 'warning'
                });
            }
        }
    },
}
</script>
<style scoped>
.gropsStatedelis {
  width: 100%;
  height: 715px;
  background-color: #1e1e1e;
}
/* 上面部分内容 */
.g_conts {
  width: 841px;
  height: 360px;
  padding-top: 24px;
  margin: 0 auto;
}
.gb_table {
  width: 100%;
  height: 290px;
}
.gropspeoples {
  width: 240px;
  height: 720px;
  float: left;
}
.gb_phase {
  height: 14px;
  margin-bottom: 7px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  line-height: 14px;
  color: #8d8c8d;
  vertical-align: text-top;
}
.gb_sheet {
  height: 256px;
  background-color: #181818;
  border: solid 1px #333333;
}
/* 第一行 */
.gbs_sheet1 {
  width: 192px;
  height: 216px;
  margin: 21px 24px 0px 24px;
  display: inline-block;
  float: left;
  /* background-color: red; */
}
/* 规定大小，设置滚动条 */
.gbs_sheet1 .btn_list1 {
  width: 192px;
  height: 182px;
  border-bottom: solid 1px #333333;
  padding-bottom: 8px;
  overflow-x: hidden;
  overflow-y: scroll;
}
/* 隐藏滚动条 */
.btn_list1::-webkit-scrollbar {
  display: none;
}
/* 按钮列表 */
.gbs_sheet1 ul > li {
  list-style: none;
}
.gbs_sheet1 ul > li button {
  width: 192px;
  height: 24px;
  border: solid 1px #333333;
  margin-bottom: 2px;
  background-color: transparent;
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 24px;
  letter-spacing: 0px;
  color: #8d8c8d;
}
.gbs_sheet1 ul > li button:focus {
  background-color: #333333;
  outline: none;
  cursor: pointer;
}
.gbs_add {
  width: 192px;
  height: 25px;
  background-color: #333333;
  margin-top: 8px;
  text-align: center;
  color: #8d8c8d;
  cursor: pointer;
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 25px;
  letter-spacing: 0px;
  color: #ffffff;
}

/* 第二行 */
.gbs_sheet2 {
  width: 285px;
  height: 216px;
  display: inline-block;
  float: left;
  border-left: solid #333333 1px;
  border-right: solid #333333 1px;
  position: relative;
  margin-top: 21px;
}
/* 第二行的内容，主要设置左右两边的线条 */
.gbs_sheet2_content {
  height: 215px;
  padding: 0px 24px;
  overflow-x: hidden;
  overflow-y: scroll;
}
.gbs_sheet2 .btn_list2 {
  width: 192px;
}
/* 隐藏滚动条 */
.gbs_sheet2_content::-webkit-scrollbar {
  display: none;
}
/* 按钮列表 */
.gbs_sheet2 ul > li {
  list-style: none;
}
.gbs_sheet2 ul > li button {
  width: 238px;
  height: 25px;
  border: solid 1px #333333;
  margin-bottom: 7px;
  background-color: transparent;
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 24px;
  letter-spacing: 0px;
  color: #8d8c8d;
}
.gbs_sheet2 ul > li button:focus {
  background-color: #333333;
  outline: none;
  cursor: pointer;
}
/* 第三行 */
.gbs_sheet3 {
  width: 192px;
  height: 216px;
  display: inline-block;
}
/* 设置第三行的位置 */
.gbs_sheet3 .gbs_sheet3_content {
  width: 264px;
  height: 215px;
  margin: 21px 24px 0px;
}
/* 公共标题样式 */
.gbs_font {
  margin-bottom: 7px;
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #8d8c8d;
}
/* 房间密码的大体样式 */
.gbs_box1 {
  width: 218px;
  height: 45px;
  margin-bottom: 24px;
}
.gbs_box1 input {
  width: 264px;
  height: 24px;
  border: solid 1px #333333;
  padding-left: 8px;
  background-color: transparent;
  font-size: 14px;
  line-height: 24px;
  color: #8d8c8d;
  outline: none;
}
.gbs_box1 input:focus {
  color: #ffffff;
  border: solid 1px #8d8c8d;
}

.gbs_box2 {
  width: 121px;
  height: 77px;
  margin-bottom: 29px;
  float: left;
}
.gbs_box3 {
  margin-left: 22px;
}
/* 正常按钮样式 */
.operation_btn button {
  width: 100px;
  height: 30px;
  margin-right: 32px;
  background-color: #7800ff;
  border: solid 1px transparent;
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 24px;
  letter-spacing: 0px;
  color: #ffffff;
  outline: none;
  cursor: pointer;
}
/* 禁用按钮样式 */
.operation_btn .operation_btn_disable {
  background-color: #333333;
  color: #8d8c8d;
}
/* 下面部分内容 */
.g_conts_personnel {
  height: 355px;
  background-color: #141414;
  border-top: solid 1px #333333;
}
/* 搜索框 */
.g_conts_personnel .g_conts_personnel_search {
  width: 100%;
  height: 36px;
}
.g_conts_personnel_search {
  width: 240px;
  height: 55px;
  position: relative;
  border-bottom: 1px solid #252525;
}
/* 搜索图标 */
.g_conts_personnel_search img {
  position: absolute;
  top: 30%;
  left: 96%;
  z-index: 100;
}
/* 搜索框提示文字颜色 */
.g_conts_personnel_search input::-webkit-input-placeholder {
  color: #8d8c8d;
}
/* 本组成员 */
.g_conts_personnel .oneself_group {
  width: 624px;
  height: 318;
  display: inline-block;
  border-right: solid 1px #333333;
}
.oneself_group .oneself_group_title,
.No_group .No_group_title {
  width: 100%;
  height: 35px;
  border-bottom: solid 1px #333333;
  line-height: 35px;
  font-family: SourceHanSansCN-Regular;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #8d8c8d;
}
/* 本组成员文字样式 */
.oneself_group .oneself_group_title .oneself_group_title_left {
  margin-left: 20px;
}
.oneself_group .oneself_group_title .oneself_group_title_center {
  margin-left: 24px;
}
.oneself_group .oneself_group_title .oneself_group_title_right {
  float: right;
  margin-right: 60px;
}
/* 本组成员列表 */
.oneself-group-list,
.no-group-list {
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #8d8c8d;
}
.oneself-group-list ul > li,
.no-group-list ul > li {
  list-style: none;
}
.oneself-group-list li,
.no-group-list li {
  height: 36px;
  width: 100%;
}
.oneself-group-list li:hover,
.no-group-list li:hover {
  background-color: #333333;
  color: #ffffff;
}
/* 本组成员列表的位置 */
.oneself-group-list .oneself-group-location {
  width: 580px;
  display: inline-block;
  margin-left: 23px;
  margin-top: 6px;
  position: relative;
  background: url("../../../../assets/images/850092599401978020.png") no-repeat;
  background-position: 99% 50%;
  cursor: pointer;
}
.oneself-group-list .oneself-group-location:hover {
  background: url("../../../../assets/images/741989501917019611.png") no-repeat;
  background-position: 99% 50%;
}
/* 本组成员列表内容的样式 */
.oneself-group-list .oneself-group-list-img1 {
  display: inline-block;
  height: 24px;
  width: 24px;
  background-image: linear-gradient(0deg, #252525 0%, #454545 100%);
  position: relative;
  vertical-align: middle;
}
.oneself-group-list .oneself-group-list-img1 img {
  width: 18px;
  height: 13px;
  position: absolute;
  top: 25%;
  left: 15%;
}
.oneself-group-list span {
  vertical-align: middle;
  margin-left: 8px;
}
.oneself-group-list .oneself-group-list_integral {
  position: absolute;
  left: 85%;
  top: 10%;
}
.oneself-group-list .oneself-group-list-btn {
  display: inline-block;
  width: 15px;
  height: 15px;
  vertical-align: middle;
  position: absolute;
  z-index: 99;
  top: 5px;
  right: 3px;
}
/* 规定大小，设置滚动条 */
.oneself-group-list ul {
  height: 280px;
  padding-bottom: 2px;
  overflow-x: hidden;
  overflow-y: scroll;
}
/* 隐藏滚动条 */
.oneself-group-list ul::-webkit-scrollbar {
  display: none;
}
/* 未分组成员 */
.g_conts_personnel .No_group {
  width: 320px;
  height: 318px;
  float: right;
}
/*未分组成员文字样式 */
.No_group .No_group_title .No_group_title_left {
  margin-left: 21px;
}
.No_group .No_group_title .No_group_title_center {
  margin-left: 22px;
}
.No_group .No_group_title .No_group_title_right {
  float: right;
  margin-right: 45px;
}
.no-group-list .no-group-list-location {
  width: 280px;
  display: inline-block;
  margin-left: 23px;
  margin-top: 6px;
  position: relative;
  background: url("../../../../assets/images/537978060962034897.png") no-repeat;
  background-position: 100% 70%;
  cursor: pointer;
}
.no-group-list .no-group-list-location:hover {
  background: url("../../../../assets/images/422222380181275677.png") no-repeat;
  background-position: 100% 70%;
}
.no-group-list .no-group-list-img1 {
  height: 24px;
  width: 24px;
  background-image: linear-gradient(0deg, #252525 0%, #454545 100%);
  display: inline-block;
  position: relative;
  vertical-align: middle;
}
.no-group-list .no-group-list-img1 img {
  width: 18px;
  height: 13px;
  position: absolute;
  top: 25%;
  left: 15%;
}
.no-group-list span {
  vertical-align: middle;
  margin-left: 8px;
}
.no-group-list .no-group-list_integral {
  position: absolute;
  left: 75%;
  top: 5px;
}
.no-group-list .no-group-list-btn {
  display: inline-block;
  width: 15px;
  height: 15px;
  vertical-align: middle;
  position: absolute;
  z-index: 99;
  right: 0px;
  top: 7px;
}
/* 规定大小，设置滚动条 */
.no-group-list ul {
  height: 280px;
  padding-bottom: 2px;
  overflow-x: hidden;
  overflow-y: scroll;
}
/* 隐藏滚动条 */
.no-group-list ul::-webkit-scrollbar {
  display: none;
}
.gropspeoplesp p{
    text-align: center;
    color: #ffffff;
    line-height: 300px;
    font-size: 14px;
}
</style>
<style>
/*日期选择器*/
.gbs_box2 .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  margin-bottom: 8px;
  width: 120px;
}
.gbs_box2 .el-input--prefix .el-input__inner {
  padding-left: 8px;
  padding-right: 0px;
}
.gbs_box2 .el-input__inner {
  height: 24px;
  line-height: 24px;
  color: #8d8c8d;
  border: solid 1px #333333;
  border-radius: 2px;
  background-color: #181818;
}
.gbs_box2 .el-input__icon {
  display: none;
}
.el-popper[x-placement^="bottom"] .popper__arrow {
  display: none;
}
.el-popper[x-placement^="bottom"] {
  margin-top: 5px;
}
.el-popper[x-placement^="top"] .popper__arrow {
  display: none;
}
.el-picker-panel {
  border: solid 1px #333333;
  background-color: #181818;
}
.el-date-table th {
  border-bottom: solid 1px #333333;
}
.time-select-item.selected:not(.disabled) {
  color: #ffffff;
}
.time-select-item:hover {
  color: #ffffff;
  background-color: #333333;
}
.gbs_box2 .el-input__suffix {
  border-left-width: 0px;
}
/* 搜索框饿了么样式 */
/* 搜索框的大小及位置样式*/
.g_conts_personnel_search .el-input {
  width: 240px;
  height: 26px;
  position: absolute;
  left: 85%;
  top: 50%;
  margin-left: -104px;
  margin-top: -14px;
}
/* 搜索框样式 */
.g_conts_personnel_search .el-input__inner {
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
</style>

