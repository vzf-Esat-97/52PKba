<template>
    <div id="competitionstagelist1">
        <ul>
            <li :class="idx===stages.length-1?'jueshai':'jueshai2'" v-for="(stage,idx) in stages" :key="idx">
                <div class="jueshaiFont">
                    <font>{{stage.name}}</font>
                </div>
                <div class="jueshaiNumber">
                    <font>参赛数量上限</font>
                    <input @blur="losefouces(stage.competitorLimit)" v-model="stage.competitorLimit" type="text" maxlength="5">
                    <el-select v-model="entryUnitE">
                        <el-option v-for="entryUnitOption in entryUnitOptions" :key="entryUnitOption.value" :value="entryUnitOption.value" :label="entryUnitOption.label">
                        </el-option>
                    </el-select>
                </div>
            </li>
            <li class="jueshaiAdd" @click="addItem">
                <font>+</font>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'CompetitionBaseInfoStageList',
    props: {
        entryUnit: Number,
        stages: Array
    },
    data() {
        return {
            entryUnitE: 1,
            entryUnitOptions: [{
                value: 1,
                label: '个/人'
            }, {
                value: 2,
                label: '组/队'
            }],
            competitorLimit: 100,
            entryUnittype: 1,
        }
    },
    watch: {
        stages() {
            this.refresh()
        },
        entryUnitE() {
            this.$emit('onEntryUnitChanged', this.entryUnitE)
        }
    },
    mounted() {
        this.refresh()
    },
    methods: {
        refresh() {
        },
        addItem() {
            const stage = { name: '决赛', competitorLimit: 0, description: '' }
            this.stages.forEach((stage, i) => {
                stage.name = `第${i + 1}阶段`
            })
            this.stages.push(stage)
        },
        deletephase(idx) {
            console.log(this.stages)
        },
        losefouces(data) {
            if (data > 0) {

            } else {
                this.$message({
                    message: '参赛人数不能小于0',
                    type: 'warning'
                });
            }
        }
    },
    //删除创建阶段
    deleteList(item) {
        this.list.splice(item, 1)
    },
}
</script>
<style>
#competitionstagelist1 .jueshaiNumber .el-select {
  width: 120px;
  height: 24px;
  margin-top: 0px;
  margin-right: 0px;
}
#competitionstagelist1 .jueshaiNumber .el-input {
  height: 24px;
  background-color: #181818;
}

#competitionstagelist1 .jueshaiNumber .el-select {
  width: 80px;
  margin-top: 0px;
  margin-right: 16px;
}
#competitionstagelist1 .jueshaiNumber .el-input__icon {
  line-height: 24px;
}
#competitionstagelist1 .jueshaiNumber .el-input__inner {
  padding-left: 10px;
}

/* 修改的el的样式-开始 */
/* 取消弹出框箭头 */
#competitionstagelist1 .el-popper .popper__arrow,
#competitionstagelist1 .el-popper .popper__arrow::after {
  border-style: none;
}
/* 列表的背景 */
#competitionstagelist1 .el-scrollbar {
  background-color: #181818;
  color: #ffffff;
}
/* 列表的边框和圆角 */
#competitionstagelist1 .el-popper {
  border: solid 1px #333333;
  border-radius: 2px;
}
/* 列表与下拉框的距离 */
#competitionstagelist1 .el-popper[x-placement^="bottom"] {
  margin-top: 0px;
}
/* 列表项的高度和行高 */
#competitionstagelist1 .el-select-dropdown__item {
  height: 24px;
  line-height: 24px;
  padding-left: 15px;
}
/* 列表项背景颜色 */
#competitionstagelist1 .el-select-dropdown__item.hover,
#competitionstagelist1 .el-select-dropdown__item:hover {
  background-color: #333333;
}
/* 列表选中文字颜色 */
#competitionstagelist1 .el-select-dropdown__item.selected {
  color: #ffffff;
  font-weight: 500;
}
/* 修改的el的样式-结束 */
</style>

<style scoped>
#competitionstagelist1 {
  width: 808px;
  height: 164px;
  margin: 16px auto;
  overflow-y: auto;
}

#competitionstagelist1 .deletedivstyle {
  position: absolute;
  width: 15px;
  height: 15px;
  top: 9px;
  left: 574px;
}

#competitionstagelist1::-webkit-scrollbar {
  display: none;
}
#competitionstagelist1 ul {
  margin: 0;
}
#competitionstagelist1 ul li {
  list-style: none;
  margin-top: 1px;
  border-top: 1px solid #181818;
  border-left: 1px solid #181818;
  border-right: 1px solid #181818;
  box-sizing: initial;
}
#competitionstagelist1 ul li:nth-child(5) {
  /* margin-bottom: 2px; */
}
#competitionstagelist1 .jueshai {
  width: 808px;
  height: 32px;
  background-color: #333333;
  margin-top: 1px;
}
#competitionstagelist1 .jueshai:hover {
  border: 1px solid #8d8c8d;
  color: #ffffff;
}
#competitionstagelist1 .jueshai:hover font {
  color: #ffffff;
}
#competitionstagelist1 .jueshai2 {
  position: relative;
  width: 607px;
  height: 32px;
  background: url("../../../assets/images/人员添加的关闭（鼠标为悬浮时.png")
    no-repeat 96.5% 50%;
  background-color: #333333;
  position: relative;
  background: url("../../../assets/images/人员添加的关闭（鼠标为悬浮时.png")
    no-repeat 96.5% 50%;
  background-color: #333333;
}
#competitionstagelist1 .jueshai2:hover {
  border: 1px solid #8d8c8d;
  background: url("../../../assets/images/人员添加的关闭（鼠标悬浮后的.png")
    no-repeat 96.5% 50%;
  background-color: #333333;
  color: #ffffff;
  background: url("../../../assets/images/人员添加的关闭（鼠标悬浮后的.png")
    no-repeat 96.5% 50%;
  background-color: #333333;
}
#competitionstagelist1 .jueshai2:hover font {
  color: #ffffff;
}
/* 收费模式 */
#competitionstagelist1 .jueshaiFont {
  display: inline-block;
  width: 200px;
  height: 32px;
  line-height: 32px;
  margin-left: 16px;
}
#competitionstagelist1 .jueshaiFont font {
  display: inline;
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #8d8c8d;
}
/* #competitionstagelist1 .jueshai .jueshaiNumber{
  margin-right: 7px;
} */
#competitionstagelist1 .jueshaiNumber {
  float: right;
}
#competitionstagelist1 .jueshaiNumber font {
  height: 32px;
  line-height: 32px;
  display: inline-block;
  margin-top: 0px;
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #8d8c8d;
}
#competitionstagelist1 .jueshaiNumber > input {
  height: 24px;
  width: 80px;
  background-color: #181818;
  border: solid 1px #333333;
  border-radius: 2px;
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #8d8c8d;
  outline: none;
  text-indent: 1rem;
}
#competitionstagelist1 .jueshaiNumber > input:focus {
  border: solid 1px #8d8c8d;
  color: #ffffff;
  outline: none;
}
#competitionstagelist1 .jueshaiNumber input {
  height: 24px;
  background-color: #181818;
  border: solid 1px #333333;
  border-radius: 2px;
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #8d8c8d;
}
/* 添加新的阶段 */
#competitionstagelist1 .jueshaiAdd {
  width: 808px;
  height: 30px;
  background-color: #333333;
  text-align: center;
}
#competitionstagelist1 .jueshaiAdd font {
  margin-top: 1px;
  font-weight: 800;
  font-size: 20px;
  color: #8d8c8d;
  text-align: center;
}
#competitionstagelist1 .jueshaiAdd:hover font{
  color: #ffffff;
}
</style>
