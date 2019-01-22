<template>
  <div class="organization-management">
    <div class="t-barrier">
      <OrganizationMemberList
        :organization="myOrganization"
        @onAskDeleteMember="onAskDeleteMember"
        @onAskTransferOwner="onAskTransferOwner"
        @onAskUpdateMemberPosition="onAskUpdateMemberPosition"
      />
    </div>
    <div class="teamBezel">
      <!-- 删除成员 -->
      <el-dialog
        :visible.sync="dialogVisibledeleteMember"
        width="380px"
      >
        <div class="tb_title">是否删除该成员？</div>
        <div
          class="tb_btn"
          @click="deleteMember()"
        >确 定</div>
      </el-dialog>
      <!-- 移交战队队长 -->
      <el-dialog
        :visible.sync="dialogVisiblehandedCaptain"
        width="380px"
      >
        <div class="tb_title">是否移交战队队长？</div>
        <div
          class="tb_btn"
          @click="handedCaptain()"
        >确 定</div>
      </el-dialog>
      <!-- 添加副队长 -->
      <el-dialog
        :visible.sync="dialogVisibleaddViceCaptain"
        width="380px"
      >
        <div class="tb_title">是否添加为副队长？</div>
        <div
          class="tb_btn"
          @click="addViceCaptain(true)"
        >确 定</div>
      </el-dialog>
      <!-- 改变为成员 -->
      <el-dialog
        :visible.sync="dialogVisibleaddMember"
        width="380px"
      >
        <div class="tb_title">是否改变为成员？</div>
        <div
          class="tb_btn"
          @click="addViceCaptain(false)"
        >确 定</div>
      </el-dialog>
    </div>
    <div>
      <el-tabs v-model="activeName">
        <el-tab-pane
          v-if="myOrganization"
          label="我的战队"
          name="t1"
        >
          <MyOrganization
            :organization="myOrganization"
            @onUpdateSuc="onUpdateSuc"
            @onDissolutionOrQuit="onDissolutionOrQuit"
          />
        </el-tab-pane>
        <el-tab-pane
          label="战队列表"
          name="t2"
        >
          <OrganizationList
            :gameID="$route.params.gameID"
            :myOrganization="myOrganization"
            @onCreateSuc="onCreateSuc"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import OrganizationMemberList from "./OrganizationMemberList.vue"; // 组织成员列表
import MyOrganization from "./MyOrganization.vue"; // 组织详情
import OrganizationList from "./OrganizationList.vue"; // 组织列表
import SearchFriends from "./SearchFriends.vue"; // 组织列表
export default {
  name: 'OrganizationManagement',
  components: {
    OrganizationMemberList,
    MyOrganization,
    OrganizationList,
    SearchFriends
  },
  data() {
    return {
      activeName: 't1',
      myOrganization: undefined,
      type: "", //个人职位（1：队长，2：副队长，3：成员）
      isFcase: -1,
      nouser: false, //搜索用户显示
      currentMember: undefined,
      isuserdata: false,
      seachList: false,
      description: '发送邀请',
      //搜索用户信息
      userId: '', //用户ID
      userName: '', //用户昵称
      userIcon: '', //用户头像
      userPhone: '', //用户电话
      //弹框
      dialogVisibledeleteMember: false, //删除成员
      dialogVisiblehandedCaptain: false, //移交战队队长
      dialogVisibleaddViceCaptain: false, //添加副队长
      dialogVisibleaddMember: false, //改变为成员
    };
  },
  computed: {
  },
  watch: {
    myOrganization() {
      this.activeName = this.myOrganization ? 't1' : 't2'
    }
  },
  mounted() {
    this.refresh()
  },
  methods: {
    refresh() {
      const url = `/api/MOrganization/${this.$route.params.gameID}`
      this.$fetch(url).then((res) => {
        if (res.code === 0) {
          this.myOrganization = res.data
        }
      })
    },
    onCreateSuc(organization) {
      this.refresh()
    },
    onUpdateSuc(organization) {
      this.refresh()
    },
    onDissolutionOrQuit() {
      this.myOrganization = undefined
    },
    openFname(idx) {
      this.isFcase = idx
    },
    leaveFname() {
      this.isFcase = -1
    },
    openuserdata() {
      this.isuserdata = true
    },
    leaveuserdata() {
      this.isuserdata = false
    },
    //询问是否删除成员
    onAskDeleteMember(member) {
      this.dialogVisibledeleteMember = true
      this.currentMember = member
      console.log(member)
    },
    //询问是否移交拥有者
    onAskTransferOwner(member) {
      this.dialogVisiblehandedCaptain = true
      this.currentMember = member
    },
    //询问是否变更成员权限
    onAskUpdateMemberPosition(member, isCancel) {
      if (isCancel) {
        this.dialogVisibleaddMember = true
      } else {
        this.dialogVisibleaddViceCaptain = true
      }
      this.currentMember = member
    },
    //添加副队长
    openadd(id) {
      this.dialogVisibleaddViceCaptain = true
    },
    // 删除成员
    deleteMember() {
      if (!this.currentMember) return
      // const url = `Expel/${this.currentMember.omID}`
      const url = `/api/MOrganizationMember/Expel/${this.currentMember.omID}`
      this.$delete(url).then((res) => {
        if (res.code === 0) {
          this.$message({
            message: "成员删除成功",
            type: "success"
          })
          this.dialogVisibledeleteMember = false
          this.refresh()
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          })
        }
      })
    },
    // 移交战队长
    handedCaptain() {
      const url = `/api/MOrganizationMember/Transfer/${this.currentMember.omID}`
      this.$put(url).then((res) => {
        if (res.code === 0) {
          this.$message({
            message: "移交成功",
            type: "error"
          })
          this.dialogVisiblehandedCaptain = false
          this.refresh()
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          })
        }
      })
    },
    addViceCaptain(isEnable) {
      if (!this.currentMember) return
      const url = `/api/MOrganizationMember/Manager/${this.currentMember.omID}/${isEnable}`
      this.$put(url).then((res) => {
        if (res.code === 0) {
          if (isEnable === true) {
            this.$message({
              message: "副队长提升成功",
              type: "error"
            })
          } else {
            this.$message({
              message: "降级成员成功",
              type: "error"
            })
          }
          this.dialogVisibleaddViceCaptain = false
          this.dialogVisibleaddMember = false
          this.refresh()
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          })
        }
      })
    }
  }
}

</script>
<style>
/* 滑动框的大小 */
.organization-management .el-tabs__nav-scroll {
  height: 55px;
  width: 945px;
  background-color: #141414;
  padding-left: 32px;
}
.organization-management .el-tabs__nav {
  height: 55px;
}
.organization-management .el-tabs__item {
  height: 55px;
  line-height: 55px;
  font-family: SourceHanSansCN-Regular;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #8d8c8d;
}
/* 选中时候的样式 */
.organization-management .el-tabs__item.is-active {
  color: #ffffff;
}
/* 滑动框下方滚动条样式 */
.organization-management .el-tabs__nav-wrap::after {
  background-color: #141414;
}
.organization-management .el-tabs__active-bar {
  background-color: #7800ff;
}
/* 滑动条距离内容区的距离 */
.organization-management .el-tabs__header {
  margin-bottom: 0px;
}
.el-tabs__header {
  display: inline-block;
  width: 945px;
}
/*弹框*/
.organization-management .el-dialog {
  height: 190px;
  background: #121212;
}
.organization-management .el-dialog__header {
  padding: 0;
}
.organization-management .el-dialog__body {
  height: 190px;
  padding: 64px 20px 32px 20px;
  text-align: center;
}
.organization-management .tb_title {
  height: 14px;
  margin-bottom: 40px;
  line-height: 14px;
  font-size: 14px;
  color: #8d8c8d;
}
.organization-management .tb_btn {
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
.organization-management {
  width: 1225px;
  height: 775px;
  background-color: #1e1e1e;
}

.organization-list {
  float: right;
  width: 945px;
  height: 715px;
  background-color: #1e1e1e;
}

.my-organization {
  float: right;
  width: 945px;
  height: 715px;
  background-color: #1e1e1e;
}

/*好友栏*/
.t-barrier {
  float: left;
  width: 280px;
  height: 775px;
  background-color: #181818;
}
/*好友列表*/
.organization-member-list {
  width: 280px;
  height: 625px;
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
.t-case {
  position: absolute;
  z-index: 999;
  top: 36px;
  right: 16px;
  width: 118px;
  min-height: 36px;
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