<template>
    <div class="my-organization">
        <div v-if="organizationE" class="tc_conts">
            <div class="tc_data">
                <div class="td_header">
                    <img :src="organizationE.icon">
                    <div class="td_name">
                        <div class="td_nickname">{{organizationE.name}}</div>
                        <div class="td_team" v-if="teamOwner">战队队长：{{teamOwner.name}}</div>
                        <div class="but">
                            <!-- <input type="file" id="amendloadimg" accept="image/jpeg,image/x-png,image/gif">  -->
                            <input @change="fileImage" type="file" id="amendloadimg" accept="image/jpeg,image/x-png,image/gif">
                            <label for="amendloadimg">修改图片</label>
                        </div>
                    </div>
                    <div class="td_integral">
                        <div style="margin-bottom: 15px;">战队积分：{{organizationE.rankingScore}}</div>
                        <div>战队排名：{{organizationE.ranking}}</div>
                    </div>
                </div>
                <div class="td_conts1">
                    <div class="td_conts-label">战队简介</div>
                    <textarea name="战队简介" v-model="organizationE.description" :disabled="dis"  maxlength="100" onkeyup="this.value=this.value.substring(0, 100)"></textarea>
                </div>
                <div>
                    <button class="td_but" @click="openModification()" v-show="!isfales">修改简介</button>
                    <button class="td_but" @click="modification()" v-show="isfales">完成修改</button>
                </div>
                <div class="td_conts2">
                    <div class="td_conts-label">最近战绩</div>
                    <div class="recentRecord">
                        <div class="recentRecord-header">
                            <div class="eventName">赛事名称</div>
                            <div class="teamIntegral">战队积分</div>
                            <div class="competitionRanking">赛事排名</div>
                            <div class="teamMember">参赛成员</div>
                        </div>
                        <div class="recentRecord-conts">
                            <div class="eventName-name">赛事名称</div>
                            <div class="teamIntegral-integral">战队积分</div>
                            <div class="competitionRanking-ranking">赛事排名</div>
                            <div class="teamMember-member">
                                <div class="teamMember-member-child">1</div>
                                <div class="teamMember-member-child">2</div>
                                <div class="teamMember-member-child">3</div>
                                <div class="teamMember-member-child">4</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tc-header">
                    <button v-if="loginUserIsOwner" @click="dialogVisibledissolutionTeam=true">解散战队</button>
                    <button v-else @click="dialogVisiblequitTeam=true">退出战队</button>
                </div>
            </div>
        </div>
        <!-- 解散弹框 -->
        <div class="dissolutionTeam">
            <el-dialog :visible.sync="dialogVisibledissolutionTeam" width="380px">
                <div class="dt_title">是否解散战队？</div>
                <div class="dt_btn" @click="dissolution">确 定</div>
            </el-dialog>
        </div>
        <!-- 退出战队 -->
        <div class="quitTeam">
            <el-dialog :visible.sync="dialogVisiblequitTeam" width="380px">
                <div class="dt_title">是否退出战队？</div>
                <div class="dt_btn" @click="quit">确 定</div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
export default {
    name: 'MyOrganization',
    props: {
        organization: Object
    },
    data() {
        return {
            organizationE: undefined,
            dis: true,
            isfales: false,
            dialogVisibledissolutionTeam: false, //解散战队
            dialogVisiblequitTeam: false //退出战队
        };
    },
    computed: {
        //判断是否为队长
        teamOwner() {
            console.log(this.organizationE)
            console.log(this.organizationE.members)
            if (this.organizationE) {
                for (let i = 0; i < this.organizationE.members.length; i++) {
                    const member = this.organizationE.members[i]
                    if (member.type === 1) {
                        return member
                    }
                }
            } else {
                return undefined
            }
        },
        loginUserIsOwner() {
            if (this.organizationE && this.$store.state.base.loginInfo) {
                const loginUserID = this.$store.state.base.loginInfo.id
                for (let i = 0; i < this.organizationE.members.length; i++) {
                    const member = this.organizationE.members[i];
                    return member.id === loginUserID && member.type === 1;
                }
            }
            return false
        },
        loginUserIsManager() {
            if (this.organizationE && this.$store.state.base.loginInfo) {
                const loginUserID = this.$store.state.base.loginInfo.id
                for (let i = 0; i < this.organizationE.members.length; i++) {
                    const member = this.organizationE.members[i];
                    return member.id === loginUserID && (member.type === 1 || member.type === 2);
                }
            }
            return false
        }
    },
    wacth: {
        organization() {
            this.refresh()
        }
    },
    mounted() {
        this.refresh()
    },
    methods: {
        refresh() {
            this.organizationE = JSON.parse(JSON.stringify(this.organization))
        },
        // 修改信息
        openModification() {
            this.dis = false;
            this.isfales = true;
        },
        update() {
            const url = `/api/MOrganization/${this.organization.id}`
            const data = {
                name: this.organizationE.name,
                icon: this.organizationE.icon,
                description: this.organizationE.description
            }
            this.$put(url, data).then(res => {
                if (res.code === 0) {
                    this.$emit('onUpdateSuc', this.organizationE)
                } else {
                    console.log(res.msg)
                }
            })
        },
        modification() {
            this.dis = true
            this.isfales = false
            this.update()
        },
        // 上传图片
        fileImage(e) {
            console.log('??')
            var that = this
            var file = e.target.files[0]
            var imgSize = file.size / 1024
            if (imgSize > 200) {
                this.$message({
                    showClose: true,
                    message: '请上传大小不要超过200KB的图片',
                    type: 'warning'
                })
            } else {
                var reader = new FileReader()
                reader.readAsDataURL(file) // 读出 base64
                reader.onloadend = () => {
                    this.organizationE.icon = reader.result
                    this.update()
                }
            }
        },
        // 解散战队
        dissolution() {
            const url = `/api/MOrganization/${this.organization.id}`
            this.$delete(url).then(res => {
                if (res.code === 0) {
                    this.dialogVisibledissolutionTeam = false
                    this.$emit("onDissolutionOrQuit")
                } else {
                    console.log(res.msg);
                }
            });
        },
        // 退出战队
        quit() {
            const url = `/api/MOrganizationMember/LeaveOrganization/${this.organization.id}`
            this.$delete(url).then(res => {
                console.log(res)
                if (res.code === 0) {
                    this.dialogVisiblequitTeam = false
                    this.$emit("onDissolutionOrQuit")
                    // this.$store.commit("other/onDeleteSuc")
                } else {
                    console.log(res.msg);
                }
            });
        }
    }
};
</script>
<style scoped>
textarea {
  resize: none;
}
.tc-header {
  position: relative;
  height: 55px;
}
.tc-header button {
  border: none;
  width: 100px;
  height: 30px;
  margin-top: 13px;
  background-color: #7800ff;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0px;
  color: #ffffff;
}
.tc-header input {
  float: right;
  width: 260px;
  height: 30px;
  margin-top: 13px;
  margin-right: 16px;
  padding-left: 16px;
  background-color: #373739;
  border: solid 1px #4c4c4c;
  line-height: 16px;
  letter-spacing: 0px;
  color: #ffffff;
}
.tc-header img {
  position: absolute;
  top: 20px;
  right: 36px;
}
.tc_conts {
  width: 945px;
  height: 689px;
  margin: 0px;
  padding: 0px;
}
.tc_data {
  width: 861px;
  height: 685px;
  margin-top: 31px;
  margin-left: 40px;
}
.td_header {
  width: 861px;
  height: 96px;
  margin-bottom: 63px;
}
.td_header img {
  float: left;
  width: 96px;
  height: 96px;
  margin-right: 25px;
  border: 0px;
}
.td_name {
  float: left;
  width: 500px;
  height: 96px;
}
.td_nickname {
  height: 24px;
  margin-bottom: 11px;
  padding-top: 3px;
  font-size: 24px;
  line-height: 16px;
  letter-spacing: 0px;
  color: #ffffff;
}
.td_team {
  height: 16px;
  margin-bottom: 16px;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0px;
  color: #ffffff;
}
/*上传图片按钮*/
input[type="file"] {
  visibility: hidden;
}
.but {
  position: relative;
}
.but label {
  margin: 0px;
  padding-top: 5px;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100px;
  height: 30px;
  background-color: #373739;
  border: solid 1px #4c4c4c;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  letter-spacing: 0px;
  color: #ffffff;
  cursor: pointer;
  font-weight: normal;
}
.td_integral {
  float: right;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0px;
  color: #ffffff;
}
.td_conts1 {
  width: 861px;
  height: 98px;
  margin-bottom: 20px;
}
.td_conts2 {
  width: 861px;
  height: 282px;
}
.td_conts-label {
  width: 72px;
  height: 18px;
  margin-bottom: 16px;
  font-size: 18px;
  line-height: 16px;
  letter-spacing: 0px;
  color: #8d8c8d;
}
.td_conts1 textarea {
  overflow: hidden;
  width: 861px;
  height: 66px;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0px;
  color: #ffffff;
  border: 0px;
  background-color: #1e1e1e;
  outline: none;
}
/* .td_conts textarea :active{
    border: 0px;
} */
.td_but {
  width: 100px;
  height: 30px;
  margin-bottom: 32px;
  background-color: #373739;
  border: solid 1px #4c4c4c;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0px;
  color: #ffffff;
}
.recentRecord {
  height: 250px;
}
.recentRecord-header {
  width: 861px;
  height: 40px;
  padding-top: 12px;
  text-align: center;
  background-color: #333333;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  line-height: 16px;
  color: #8d8c8d;
}
.recentRecord-conts {
  width: 861px;
  height: 56px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  line-height: 16px;
  color: #8d8c8d;
  background-color: #181818;
  border: solid 1px #181818;
}
.recentRecord-conts:hover {
  color: #ffffff;
  background-color: #333333;
  border: solid 1px #8d8c8d;
}
.eventName {
  width: 260px;
  padding-left: 31px;
  text-align: left;
}
.teamIntegral {
  width: 200px;
}
.competitionRanking {
  width: 98px;
}
.teamMember {
  width: 311px;
}
.eventName-name {
  width: 260px;
  padding-top: 19px;
  padding-left: 31px;
  text-align: left;
}
.teamIntegral-integral {
  width: 200px;
  padding-top: 19px;
}
.competitionRanking-ranking {
  width: 98px;
  padding-top: 19px;
}
.teamMember-member {
  width: 311px;
}
.teamMember-member-child {
  display: inline-block;
  width: 150px;
  height: 28px;
  padding-right: 6px;
  font-size: 14px;
  line-height: 28px;
  text-align: left;
}
</style>
<style>
/*创建弹框*/
.el-dialog {
  height: 190px;
  background: #121212;
}
.el-dialog__header {
  padding: 0;
}
.el-dialog__body {
  height: 190px;
  padding: 64px 20px 32px 20px;
  text-align: center;
}
.dt_title {
  height: 14px;
  margin-bottom: 40px;
  line-height: 14px;
  font-size: 14px;
  color: #8d8c8d;
}
.dt_btn {
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
