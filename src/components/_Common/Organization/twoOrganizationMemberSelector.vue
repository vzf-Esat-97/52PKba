<template>
    <div class="twoOrganization-member-selector">
        <el-dialog :visible.sync="isShowE" width="380px" top="16vh" :close-on-click-modal="false" @close="$emit('onCancel')">
            <p>本场比赛报名费为{{twocompetition.entryCost}}PK币，是否报名参赛？</p>
            <div class="two-organization-main-list">
                <span>参赛人员：</span>
                <ul class="two-organization-main-selector">
                    <div style="height:8px;"></div>
                    <li v-for="(item,idx) in selectnumbers" :key="idx">
                        {{item.name}}
                    </li>
                </ul>
            </div>
            <div class="againbtn" @click="ok">确认</div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'twoOrganizationMemberSelector',
    components: {
    },
    props: {
        value: Boolean,
        selectnumbers:Array,
        twocompetition:Object
    },
    data() {
        return {
            // isShowE: true
        };
    },
    computed: {
        isShowE: {
            get() {
                return this.value
            }, set(value) {
                this.$emit('input', value)
            }
        }
    },
    watch: {
        isShow() {
            this.isShowE = this.isShow
        }
    },
    mounted() {
    },
    methods: {
        ok() {
            console.log(this.selectnumbers)
            console.log(this.twocompetition)
            // let url = `/api/Competition/${this.twocompetition.id}/Entry/`;
            // const data = { memberIDs: [] }
            // if (this.twocompetition.entryUnit === 1) {
            //     data.id = this.$store.state.base.loginInfo.id;
            // } else {
            //     data.id = this.$store.state.other.selectedGame.organization.id;
            //     this.selectnumbers.forEach(element => {
            //         data.memberIDs.push(element.id)
            //     });
            //     // data.memberIDs = memberIDs
            // }
            // this.$post(url, data).then(res => {
            //     if (res.code == 0) {
            //         this.$message({ type: 'success', message: '报名成功' })
            //     } else {
            //         this.$message({ type: 'warning', message: res.msg })
            //     }
            // });
        }
    }
};
</script>
<style>
/*弹框*/
.twoOrganization-member-selector .el-dialog {
  background: #121212;
  height: 298px;
  border: solid 1px #4c4c4c;
}
.twoOrganization-member-selector .el-dialog__headerbtn .el-dialog__close {
  position: absolute;
  top: -10px;
  right: -10px;
}
.twoOrganization-member-selector .el-dialog__header {
  padding: 0;
}
.twoOrganization-member-selector .el-dialog__body {
  height: 296px;
  padding: 30px 30px 32px 30px;
  text-align: center;
}
.twoOrganization-member-selector p {
  font-size: 14px;
  color: #8d8c8d;
  text-align: left;
  width: 299px;
  margin-left: 19px;
}
.twoOrganization-member-selector .tb_title {
  height: 14px;
  margin-bottom: 40px;
  line-height: 14px;
  font-size: 14px;
  color: #8d8c8d;
}
.twoOrganization-member-selector .tb_btn {
  width: 320px;
  height: 40px;
  background-color: #7800ff;
  margin: auto;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  color: #fefefe;
  cursor: pointer;
}
</style>
<style scoped>
.againbtn {
  width: 320px;
  height: 40px;
  background-color: #7800ff;
  margin: auto;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  color: #fefefe;
  cursor: pointer;
  margin-top: 12px;
}
.two-organization-main-list {
  width: 280px;
  height: 170px;
  margin: auto;
}
.two-organization-main-list span {
  text-align: left;
  width: 280px;
  display: inline-block;
  color: #8d8c8d;
}
.two-organization-main-selector ul {
  width: 260px;
  margin: auto;
  height: 170px;
  overflow: auto;
  vertical-align: bottom;
}
.two-organization-main-selector ul::-webkit-scrollbar {
  display: none;
}
.two-organization-main-selector li {
  width: 260px;
  color: #8d8c8d;
  font-size: 16px;
  list-style: none;
  color: #ffffff;
}
</style>