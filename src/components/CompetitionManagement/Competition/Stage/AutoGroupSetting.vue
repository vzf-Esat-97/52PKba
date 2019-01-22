y<template>
    <div>
        <div class="expectDiv">
            <div class="expectDivtitle">
                <span>分组</span>
            </div>
            <div class="GroupNumber">
                <label for="">每组人数</label>
                <input type="text" v-model="competitorLimitE" maxlength="16" />
            </div>
            <div class="GroupNumber">
                <label for="">竞赛场次</label>
                <input type="text" v-model="matchCount" maxlength="16" />
            </div>
            <div class="expectDivtitle2">
                <span>第一场开始时间：</span>
            </div>
            <div class="OneDateTime">
                <el-date-picker v-model="firstStartTime" type="date" placeholder="选择日期" size="mini">
                </el-date-picker>
                <el-time-select v-model="firstStartTimeHHmm" :picker-options="{start: '00:00',step: '00:15', end: '24:00'}" placeholder="选择时间" size="mini">
                </el-time-select>
            </div>
            <div class="sureBtndiv2" @click="autoGroup">确认</div>
        </div>
    </div>
</template>
<script>
import { formatDate } from '../../../../common/date.js';
export default {
    props: {
        noGroupCompetitors: Array,
        groups: Array,
        competitorLimit: Number
    },
    data() {
        return {
            competitorLimitE: 80,
            matchCount: 1,
            firstStartTime: '2018-10-12',
            firstStartTimeHHmm: '10:00',
        }
    },
    watch: {
    },
    mounted() {
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
    methods: {
        fDateTime(v) { return this.$options.filters['datetime'](v) },
        fFormatDate(v) { return this.$options.filters['formatDate'](v) },
        autoGroup() {
            //1.先把groups中所有的competitors取出放入noGroupCompetitors
            console.log(this.noGroupCompetitors)
            while (this.groups.length > 0) {
                while (this.groups[0].competitors.length > 0) {
                    this.noGroupCompetitors.push(this.groups[0].competitors.splice(0, 1)[0])
                }
                this.groups.splice(0, 1)
            }
            //2.计算组数
            const gourpCount = Math.ceil(this.noGroupCompetitors.length / this.competitorLimitE)

            const startTime = new Date(this.fFormatDate(this.firstStartTime) + ` ` + this.firstStartTimeHHmm)
            const enterTime = new Date(
                startTime.getFullYear(),
                startTime.getMonth(),
                startTime.getDate(),
                startTime.getHours(),
                startTime.getMinutes() - 20)

            for (let gIdx = 0; gIdx < gourpCount; gIdx++) {
                const groupCompetitors = []
                const matches = []

                for (let mIdx = 0; mIdx < this.matchCount; mIdx++) {
                    matches.push({
                        name: `组${gIdx + 1}-比赛${mIdx + 1}`,
                        password: `suijimima`,
                        enterTime: enterTime,
                        startTime: startTime,
                    })
                    startTime.setHours(startTime.getHours() + 1)
                    enterTime.setHours(enterTime.getHours() + 1)
                }

                this.groups.push({
                    name: `组${gIdx + 1}`,
                    competitors: groupCompetitors,
                    matches: matches
                })
            }

            let groupIdx = 0
            while (this.noGroupCompetitors.length > 0) {
                const randomCompetitor = this.noGroupCompetitors.splice(parseInt(Math.random() * this.noGroupCompetitors.length), 1)[0]
                this.groups[groupIdx].competitors.push(randomCompetitor)
                if (++groupIdx === this.groups.length) groupIdx = 0
            }

            this.$emit('onAutoGroupSettingOK')

            // for (var i = 1; i <= classnum; i++) {
            //     this.squad.push(i)
            //     console.log(i)
            // }

            // var newmath = []
            // for (var i = 1; i <= 100; i++) {
            //     newmath.push(i)
            // }
            // console.log(newmath)
            // var newclassnum = []
            // for (var j = 1; j <= 10; j++) {
            //     const newnum = Math.floor(Math.random() * 100);
            //     newclassnum.push(newnum)
            //     newmath.splice(newnum, 1)
            //     if (newmath.length != 0) {
            //         // for(var i){

            //         // }
            //     }
            // }
            // this.squad.push(newclassnum)
            // // 排序
            // newclassnum.sort((a, b) => {
            //     return b - a;
            // })
            // console.log(newclassnum)
            // console.log(newmath)
            // console.log(this.squad)
        }
    },
}
</script>
<style scoped>
#auto-group-setting .el-dialog__header {
  padding: 0;
  height: 0;
}
#auto-group-setting .el-dialog__headerbtn {
  top: 10px;
  right: 10px;
  width: 0px;
  height: 0px;
  color: #ffffff;
  font-family: SourceHanSansCN-Regular;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  padding: 0px 18px;
  margin-left: 40%;
  margin-bottom: 32px;
  outline: none;
  border: 0;
}
#auto-group-setting .el-dialog__body {
  padding: 0;
}
#auto-group-setting.sureBtndiv {
  width: 320px;
  height: 40px;
  background-color: #7800ff;
  margin: auto;
  text-align: center;
  line-height: 40px;
  color: #fefefe;
  font-size: 16px;
  cursor: pointer;
}
#auto-group-setting.darkStyle {
  background-color: rebeccapurple;
  color: #000;
}
/* 重置样式 */
.expectDiv {
  height: 340px;
  background-color: #121212;
  border: solid 0px #4c4c4c;
}
/* 第一个div的大小 */
.expectDiv .expectDivtitle {
  width: 240px;
  height: 20px;
  margin: 0 auto;
  margin-bottom: 16px;
}
/* 分组样式 */
.expectDiv .expectDivtitle span {
  width: 30px;
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 20px;
  letter-spacing: 0px;
  color: #8d8c8d;
  float: left;
}
/* 报名时间样式 */
.expectDiv .expectDivtitle2 {
  width: 240px;
  margin: 0 auto;
  text-align: left;
}
.expectDiv .expectDivtitle2 span {
  width: 115px;
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 20px;
  letter-spacing: 0px;
  color: #8d8c8d;
}
.expectDiv span {
  display: inline-block;
  margin: 0 0;
}
/* 每组人数 */
.expectDiv .GroupNumber {
  width: 240px;
  height: 40px;
  margin: 16px auto;
  background: #373739;
  line-height: 40px;
  border: solid 1px #4c4c4c;
  margin-top: 16px;
}
.expectDiv .GroupNumber label {
  display: inline-block;
  width: 80px;
  height: 20px;
  line-height: 20px;
  border-right: solid 1px #8d8c8d;
  color: #8d8c8d;
  font-family: SourceHanSansCN-Regular;
  letter-spacing: 0px;
  color: #8d8c8d;
  font-weight: 500;
}
.expectDiv .GroupNumber input {
  height: 38px;
  width: 145px;
  border: solid 0px #4c4c4c;
  background: #373739;
  color: #ffffff;
  outline: none;
  text-indent: 0.6rem;
  letter-spacing: 0px;
  font-size: 16px;
  text-align: right;
  padding: 5px;
}
/* 按钮样式 */
.expectDiv .sureBtndiv2 {
  width: 240px;
  height: 40px;
  background-color: #7800ff;
  margin: auto;
  text-align: center;
  line-height: 40px;
  color: #fefefe;
  font-size: 16px;
  cursor: pointer;
  margin-top: 12px;
}
/* 时间 */
.OneDateTime {
  width: 240px;
  height: 80px;
  margin: 16px auto;
  text-align: left;
}
</style>
<style>
/*日期选择器*/
.expectDiv .el-input__prefix {
  display: none;
}
.expectDiv .el-input__suffix {
  display: none;
}
/* 宽度 */
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 120px;
  height: 24px;
}
.el-input--mini .el-input__inner {
  padding-left: 8px;
  height: 24px;
  line-height: 24px;
  /* text-align: center; */
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #8d8c8d;
}
.el-input--suffix .el-input__inner {
  padding-right: 0px;
}
.expectDiv .el-input__inner {
  background-color: #181818;
  border-radius: 2px;
  border: solid 1px #333333;
}
.OneDateTime .el-date-editor--time-select {
  margin-top: 16px;
}
</style>
<style>
#auto-group-setting .el-dialog{
    height: 380px;
}
</style>

