<template>
    <div class="RoomMegUp">
        <el-dialog :visible.sync="isTosignupsuc" width="328px" top='10vh' :modal='true' :close-on-click-modal="false">
            <div class="gbs_sheet3">
                <div class="gbs_sheet3_content">
                    <div class="gbs_box1">
                        <div class="gbs_font">房间名称：</div>
                        <input v-model="RoomName" type="text" value="">
                    </div>
                    <div class="gbs_box1">
                        <div class="gbs_font">房间密码：</div>
                        <input v-model="RoomPwd" type="text">
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
            <div class="rr_btn" @click="determine">发布赛事</div>
            <div class="Persons">
                <div class="head-div">
                    <span v-if='stageCompetitors' >本场人员&nbsp;&nbsp;&nbsp;&nbsp;( {{stageCompetitors.length}} / 100 )</span>
                </div>
                <!-- 战队人员 -->
                <div class="main-content">
                    <div class="main-content-list">
                        <ul>
                            <li v-for="(item,idx) in stageCompetitors" :key="idx">
                                <div class="headimg">
                                    <img :src="item.icon">
                                </div>
                                <span>{{item.name}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- 单场个人单排人员 -->
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { formatDate } from '../../common/date.js'
export default {
  props: {
    value: Boolean,
    stageCompetitors:{
        type:Array,
        default(){
            return
        }
    },
    StageId:{
        type:String,
        default(){
            return 0
        }
    }
  },
  data() {
    return {
        datetime:'',
        datetime1:'',
        time:'',
        time1:'',
        RoomName:'一号房间',
        RoomPwd:"123456"
    };
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd');
    },
    datetime(time) {
      var date = new Date(time);
      return formatDate(date, 'hh:mm');
    }
  },
  computed: {
    isTosignupsuc: {
      get() {
        return this.value
      },
      set(v) {
        this.$emit('input', v)
      }
    }
  },
    watch:{
        stageCompetitors(newval,oldval){
            console.log(newval)
        }
    },
    methods: {
        fDateTime(v) { return this.$options.filters['datetime'](v) },
        fFormatDate(v) { return this.$options.filters['formatDate'](v) },
        //确认发布单赛事
        determine() {
            if(this.datetime&&this.datetime1&&this.time&&this.time1&&this.RoomName&&this.RoomPwd){
                this.save()
                if (this.stageCompetitors.length != 0) {
                    const url = `/api/MCompetitionGroup/${this.StageId}/Determine`
                    this.$put(url).then((res) => {
                        if (res.code == 0) {
                            this.isTosignupsuc=false
                            // this.$emit('onStageDetermineGroup')
                            this.$message({
                                message: '发布成功',
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
            }else{
                this.$message({
                    message: '请完善框内信息',
                    type: 'warning'
                });
            }
        },
        // 单赛事 保存及发布
        save() {
            if (this.stageCompetitors.length != 0) {
                const url = `/api/MCompetitionGroup/${this.StageId}`
                const data = []
                    const dataGroup = {
                        name: this.RoomName,
                        cscIDs: [],
                        matches: []
                    }
                    this.stageCompetitors.forEach(competitor => {
                        dataGroup.cscIDs.push(competitor.id)
                    })
                    dataGroup.matches.push({
                        name: this.RoomName,
                        password: this.RoomPwd,
                        enterTime: new Date( `${this.fFormatDate(this.datetime1)} ${this.time1}`),
                        startTime: new Date( `${this.fFormatDate(this.datetime)} ${this.time}`)
                    })
                    data.push(dataGroup)
                this.$put(url, data).then((res) => {
                    if (res.code == 0) {
                        console.log(123123123)
                        // this.$message({
                        //     message: '保存分组成功',
                        //     type: 'success'
                        // });
                        console.log("保存分组成功")
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
    }
}
</script>
<style>
.RoomMegUp .el-dialog {
  height: 341px;
  background: #121212;
  border: solid 1px #4c4c4c;
}
.RoomMegUp .el-dialog__headerbtn .el-dialog__close {
  position: absolute;
  top: -10px;
  right: -10px;
}
.RoomMegUp .el-dialog__header {
  padding: 0;
}
.RoomMegUp .el-dialog__body {
  height: 315px;
  padding: 20px 20px 20px 20px;
  text-align: center;
}
</style>
<style lang='less' scoped>
.RoomMegUp {
  height: 14px;
  margin-bottom: 40px;
  line-height: 14px;
  font-size: 14px;
  color: #8d8c8d;
    .gbs_sheet3 {
        width: 264px;
        height: 216px;
        display: inline-block;
        .gbs_sheet3_content {
            width: 264px;
            height: 215px;
        }
    }
  .rr_btn {
    width: 264px;
    height: 30px;
    background-color: #7800ff;
    margin: auto;
    text-align: center;
    line-height: 30px;
    font-size: 16px;
    color: #fefefe;
    cursor: pointer;
    margin-top: 20px;
  }
  .gbs_box1 {
      width: 264px;
    height: 45px;
    margin-bottom: 24px;
    text-align: left;
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
  margin-top: 7px;
  
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
  text-align: left;
  .gbs_font{
      padding-bottom: 7px;
  }
}
.gbs_box3 {
  margin-left: 22px;
}
    .Persons{
        width: 946px;
        height: 361px;
        background-color: chartreuse;
        position: absolute;
        top: 374px;
        left: -288px;
        background-color: #141414;
        .head-div{
            width: 946px;
            height: 36px;
            background-color: #141414;
            border: solid 1px #333333;
            text-align: left;
            span{
                color: #8d8c8d;
                font-size: 12px;
                line-height: 36px;
                padding-left: 20px;
            }
        }
        .main-content{
            width: 946px;
            height: 324px;
            background-color: #141414;
            border-top: 1px solid #141414;
            .main-content-list{
                width: 100%;
                height: 300px;
                margin: 12px  0;
                overflow: auto;
                ul{
                    margin: 0;
                    li{
                        width: 232px;
                        height: 36px;
                        margin: 0 6px 4px 0;
                        float: left;
                        background-color: #141414;
                        list-style: none;
                        cursor: pointer;
                        .headimg{
                            width: 24px;
                            height: 24px;
                            float: left;
                            background-image: linear-gradient(0deg, #252525 0%, #454545 100%);
                            margin: 6px 8px 6px 20px;
                            img{
                                width: 18px;
                                height: 13px;
                                margin: 6px 0px 5px 1px;
                            }
                        }
                        span{
                            line-height: 36px;
                            float: left;
                        }
                    }
                    li:nth-child(4n){
                        margin-right: 0;
                    }
                    li:hover{
                        background-color: #333333;
                        border: solid 1px #8d8c8d;
                        color: #ffffff;
                    }
                }
            }
        }
        .main-content-list::-webkit-scrollbar{
            display: none;
        }
    }
}
</style>
