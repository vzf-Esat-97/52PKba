<template>
    <div class="organization-member-list">
        <!-- <div class="t-member">战队成员</div> -->
        <div class="t-search">
                <input type="text" placeholder="搜索成员" v-model="searchName" maxlength="11">
                <img src="../../assets/images/搜索.png" alt="搜索" >
            </div>
        <div class="member-list">
            <ul class="organization-main-li">
                <li @contextmenu.prevent="openMenu(member)" @mouseleave="closeMenu(member)" v-for="(member,idx) in searchMembersE" :key="idx">
                    <HeadImage :src="member.icon" />
                    <div class="tli-style t-name">{{member.name}}</div>
                    <img v-if="member.type===1" src="../../assets/images/队长.png" class="duty" alt="队长" title="队长">
                    <img v-else-if="member.type===2" src="../../assets/images/副队长.png" class="duty" alt="副队长" title="副队长">
                    <div v-show="member.isShowMenu" class="t-case">
                        <!-- <div class="t-caseli">查看战绩</div> -->
                        <div v-if="organizationManagers&&(member.type===3||member.type===2)" class="t-caseli" @click="$emit('onAskDeleteMember',member)">删除成员</div>
                        <div v-if="currentUserIsOrganizationManager&&member.type===3" class="t-caseli" @click="$emit('onAskDeleteMember',member)">删除成员</div>
                        <!-- <div v-if="organizationManagers&&(member.type===3||member.type===2)" class="t-caseli" @click="$emit('onAskTransferOwner',member)">移交战队队长</div> -->
                        <div v-if="organizationManagers&&(member.type===3)" class="t-caseli" @click="$emit('onAskUpdateMemberPosition',member,false)">升级副队长</div>
                        <div v-if="organizationManagers&&(member.type===2)" class="t-caseli" @click="$emit('onAskUpdateMemberPosition',member,true)">降级成员</div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="invite">
            <div class="inviteNone" @click="judgeOrganization">
                邀请成员
            </div>
        </div>
        <!-- 邀请弹框 -->
        <div class="inviteBox">
            <el-dialog :visible.sync="dialogVisibleInviteBox" width="380px">
                <input class="inviteBox-input" type="text" placeholder="邀请成员（手机号）" v-model="userPhone" maxlength="11">
                <div class="inviteBox-btn" @click="seachUser()">确 定</div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import HeadImage from '@/components/_Common/HeadImage.vue'
export default {
    name: 'OrganizationMemberList',
    components: {
        HeadImage
    },
    props: {
        organization: Object
    },
    data() {
        return {
            members: [],
            currentMember: undefined,
            dialogVisibleInviteBox: false,
            //搜索用户信息
            userId: '', //用户ID
            userPhone: '', //用户电话
            searchName: "",//搜索成员
        }
    },
    computed: {
        //获取队长
        organizationOwner() {
            if (this.organization) {
                for (let i = 0; i < this.members.length; i++) {
                    const member = this.members[i]
                    if (member.type === 1) {
                        return member
                    }
                }
            } else {
                return undefined
            }
        },
        //获取管理员
        organizationManagers() {
            const members = []
            if (this.organization) {
                for (let i = 0; i < this.members.length; i++) {
                    const member = this.members[i]
                    if (member.type === 2) {
                        members.push(member)
                    }
                }
            }
            return members
        },
        //判断当前用户是否为队长
        currentUserIsOrganizationOwner() {
            console.log(this.organizationOwner)
            const organizationOwner = this.organizationOwner
            if (this.$store.state.base.loginInfo && organizationOwner) {
                return organizationOwner.id === this.$store.state.base.loginInfo.id
            }
            else {
                return false
            }
        },
        //判断当前用户是否为管理员
        currentUserIsOrganizationManager() {
            const organizationManagers = this.organizationManagers
            if (this.$store.state.base.loginInfo) {
                for (let i = 0; i < organizationManagers.length; i++) {
                    const organizationManager = organizationManagers[i]
                    if (organizationManager.id === this.$store.state.base.loginInfo.id)
                        return true
                }
            }
            return false
        },
        // 模糊查询
        searchMembersE() {
            const searchMembersE = []
            this.members.forEach((item) => {
                if (item.name.search(this.searchName) != -1) {
                    searchMembersE.push(item)
                }
            })
            return searchMembersE
        }
    },
    watch: {
        organization() {
            this.refresh()
        }
    },
    mounted() {
        this.refresh()
    },
    methods: {
        //消息提示方法
        message() {
            this.$message({
                showClose: true,
                message: this.messageText,
                type: 'error',
                duration: 5000,
                center: true,
            });
        },
        refresh() {
            if (!this.organization || !this.organization.id) {
                this.members = []
                return
            }
            const url = `/api/MOrganizationMember/${this.organization.id}`
            this.$fetch(url).then(res => {
                const members = []
                if (res.code === 0) {
                    res.data.forEach(member => {
                        member.isShowMenu = false
                        members.push(member)
                    })
                }
                this.members = members
            })
        },
        //打开成员菜单
        openMenu(member) {
            console.log(member)
            member.isShowMenu = true
        },
        closeMenu(member) {
            member.isShowMenu = false
        },
        //询问是否删除成员
        askDeleteMember(member) {
            this.currentMember = member
            this.dialogVisibledeleteMember = true
        },
        //删除成员
        deleteMember(member) {
            const url = `/api/MOrganizationMember/OrganizationMember/${this.organization.id}/${this.memberId}`
            this.$delete(url).then((res) => {
                if (res.code === 0) {
                    console.log(res)
                    this.dialogVisibledeleteMember = false
                    this.memberList()
                }
            })
        },
        askSetOwner(member) {
            this.currentMember = member
        },
        setOwner(member) {
            const url = `/api/MOrganizationMember/TransferOwner/${this.organization.id}/${this.memberId}`
            this.$put(url).then((res) => {
                if (res.code === 0) {
                    console.log(res)
                    this.dialogVisiblehandedCaptain = false
                    this.memberList()
                }
            })
        },
        //搜索成员
        judgeOrganization() {
            if(this.organization) {
                this.dialogVisibleInviteBox=true
            }else{
                this.messageText = "你还没有战队"
                this.message()
            }
        },
        seachUser() {
            if (this.userPhone) {
                const url = `/api/User/QueryUser?phone=${this.userPhone}`
                this.$fetch(url).then((res) => {
                    console.log(res)
                    if (res.code === 0) {
                        this.userId = res.data.id
                        this.inviteTeam()
                    } else {
                        alert(res.msg)
                    }
                })
            } else {
                this.messageText = "没有该用户"
                this.message()
            }
        },
        //邀请加入战队
        inviteTeam() {
            if (this.organization.id) {
                const url = `/api/MOrganizationMember/${this.organization.id}/InviteUser`
                const data = { userID: this.userId, description: this.description }
                this.$post(url, data).then((res) => {
                    if (res.code === 0) {
                        this.messageText = "已发送邀请"
                        this.message()
                    } else {
                        alert(res.msg)
                    }
                })
            } else {
                this.messageText = "你还没有战队"
                this.message()
            }
        }
    }
}

</script>
<style scoped>
/*好友搜索框的位置、颜色、字体、图片*/
.t-search {
  position: relative;
  height: 55px;
  border-bottom: solid 1px #252525;
}
.t-search input {
  width: 240px;
  height: 30px;
  margin-left: 20px;
  margin-top: 13px;
  background-color: #373739;
  border: solid 1px #4c4c4c;
  font-size: 14px;
  font-weight: normal;
  line-height: 16px;
  letter-spacing: 0px;
  color: #ffffff;
  padding-left: 13px;
  padding-right: 34px;
  border: solid 1px #4c4c4c;
}
.t-search img {
  position: absolute;
  top: 20px;
  right: 32px;
  cursor: pointer;
}
.t-member {
  width: 280px;
  height: 30px;
  line-height: 30px;
  padding-left: 21px;
  border-bottom: solid 1px #252525;
  font-size: 12px;
  color: #8d8c8d;
}
.member-list {
  height: 675px;
}
.organization-main-li li {
  position: relative;
  padding: 7px;
  height: 38px;
  list-style-type: none;
  cursor: pointer;
}
.organization-main-li li:hover {
  background-color: #333333;
}

.duty {
  width: 16px;
  height: 12px;
  float: right;
  margin-right: 7px;
  margin-top: 6px;
}
.t-name {
  display: inline-block;
  font-size: 14px;
  vertical-align: middle;
  line-height: 16px;
  letter-spacing: 0px;
  color: #ffffff;
  margin-left: 3px;
}
.t-case {
  position: absolute;
  z-index: 999;
  top: 36px;
  right: 16px;
  width: 118px;
  /* min-height: 36px; */
  border: solid 1px #4c4c4c;
  background-color: #181818;
}
.t-caseli {
  height: 36px;
  padding-left: 16px;
  padding-top: 11px;
  color: #8d8d8d8d;
  background-color: #181818;
  cursor: pointer;
}
.t-caseli:hover {
  color: #ffffff;
  background-color: #333333;
}
.tli-style {
  color: #8d8d8d;
}
/*邀请成员*/
.invite {
  width: 100%;
  height: 29px;
  padding-top: 9px;
  border-top: solid 1px #252525;
}
.inviteNone {
  width: 83px;
  height: 20px;
  padding-left: 27px;
  background: url(../../assets/images/e388cdc18a8194c5579be020fa8f05c.png)
    no-repeat;
  margin: 0 auto;
  font-size: 14px;
  color: #8d8c8d;
}
.inviteNone:hover {
  color: #ffffff;
  background: url(../../assets/images/2aa6f297ca61268ab753c4da2057718.png)
    no-repeat;
  cursor: pointer;
}
</style>
<style>
/*邀请弹框*/
.el-dialog {
  height: 190px;
  background: #121212;
}
.el-dialog__header {
  padding: 0;
}
.organization-management .el-dialog__body {
  height: 190px;
  padding: 54px 20px 32px 20px;
  text-align: center;
}
.inviteBox-input {
  width: 320px;
  height: 40px;
  margin-bottom: 23px;
  background-color: #373739;
  border: solid 1px #4c4c4c;
  font-size: 14px;
  font-weight: normal;
  line-height: 16px;
  letter-spacing: 0px;
  color: #ffffff;
  padding-left: 13px;
  padding-right: 34px;
  border: solid 1px #4c4c4c;
}
.inviteBox-btn {
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