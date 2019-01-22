<template>
    <div class="SearchFriends">
        <div class="t-search">
            <input type="text" placeholder="搜索成员（手机号）" v-model="userPhone">
            <img src="../../assets/images/搜索.png" alt="搜索" @click="seachUser()">
        </div>
        <ul>
            <li class="t-li" v-on:contextmenu.prevent="openuserdata()" v-on:mouseleave="leaveuserdata" v-show="seachList">
                <div class="head-portrait">
                    <img :src="userIcon">
                </div>
                <span class="tli-style t-name">{{userName}}</span>
                <div v-show="isuserdata" class="t-case">
                    <div class="t-caseli">查看战绩</div>
                    <div class="t-caseli" @click="inviteTeam()">邀请加入战队</div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'SearchFriends',
    props: {
        organization: Object
    },
    data() {
        return {
            userId: '', //用户ID
            userName: '', //用户昵称
            userIcon: '', //用户头像
            userPhone: '', //用户电话
        };
    },
    methods: {
        seachUser() {
            if (this.userPhone) {
                const url = `/api/User/QueryUser?phone=${this.userPhone}`
                this.$fetch(url).then((res) => {
                    console.log(res)
                    if (res.code === 0) {
                        if (res.data == null) {
                            this.nouser = true
                            this.seachList = false
                        } else {
                            this.userId = res.data.id
                            this.userName = res.data.nickname
                            this.userIcon = res.data.icon
                            this.seachList = true
                            this.nouser = false
                        }
                    }
                })
            }
        },
        //邀请加入战队
        inviteTeam() {
            console.log(this.$store.state.other.selectedGame.organization.id)
            const url = `/api/MOrganizationMember/${this.$store.state.other.selectedGame.organization.id}/InviteUser`
            const data = { userID: this.userId, description: this.description }
            this.$post(url, data).then((res) => {
                if (res.code === 0) {
                    console.log(res)
                } else {
                    alert(res.msg)
                }
            })
        }
    }
}
</script>
<style>
/* .SearchFriends{
    height: 100px;
} */
/*搜索用户*/
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
  font-size: 14px;
  line-height: 16px;
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
.no-member {
  width: 280px;
  height: 36px;
  line-height: 36px;
  font-size: 14px;
  color: #8d8d8d8d;
  text-align: center;
}
.t-li {
  position: relative;
  height: 36px;
  list-style-type: none;
  cursor: pointer;
}
.t-li:hover {
  background-color: #333333;
}
.head-portrait {
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-left: 20px;
  margin-top: 6px;
  background-image: linear-gradient(0deg, #252525 0%, #454545 100%);
}
.head-portrait img {
  width: 18px;
  height: 13px;
  margin-left: 3px;
}
.t-name {
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0px;
  color: #ffffff;
}
.tli-style {
  color: #8d8d8d;
}
</style>
