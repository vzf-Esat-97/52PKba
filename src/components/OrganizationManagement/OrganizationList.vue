<template>
  <div class="organization-list">
    <div v-if="isShowCreateTeam">
      <OrganizationEdit
        @onCreateSuc="onCreateSuc"
        @onCancel="onCancel"
      />
    </div>
    <div v-else>
      <div class="tt-header">
        <button
          v-if="!myOrganization"
          @click="createOrganization()"
        >创建战队</button>
        <input
          type="text"
          placeholder="战队搜索"
          v-model="searchOrganizationName"
        >
        <img
          src="../../assets/images/搜索.png"
          alt="搜索"
        >
      </div>
      <div class="tt_conts">
        <div class="tt_data">
          <div
            class="tt_list"
            v-for="(organization,index) in searchMembersE"
            :key="index"
          >
            <div class="tt_left">
              <div class="tt_img">
                <img :src="organization.icon">
                <div class="tt_name">{{organization.name}}</div>
              </div>
              <div class="tt_gameype">
                <div class="tt_member">
                  成员: 100
                </div>
                <div class="tt_integral">
                  战队积分：5888
                </div>
              </div>
            </div>
            <div class="tt_right">
              <!-- <button class="tt_button" v-on:contextmenu.prevent="applyFor(organization.id,index)" >申请加入</button> -->
              <button
                class="tt_button"
                @click="applyJoin(organization)"
                v-show="organization.join===1"
              >申请加入</button>
              <button
                class="tt_button"
                v-show="organization.join===2"
              >已提交</button>
            </div>
          </div>
        </div>
        <div
          v-if="organizations"
          class="tt_Page"
        >
          <el-pagination
            :page-size="display"
            @current-change="refresh"
            background
            layout="prev, pager, next"
            :total='total'
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import OrganizationEdit from './OrganizationEdit.vue';
export default {
  name: 'OrganizationList',
  components: {
    OrganizationEdit
  },
  props: {
    gameID: String,
    myOrganization: Object
  },
  data() {
    return {
      organizations: [],
      isShowCreateTeam: false,
      total: 0, // 记录总条数
      display: 8, // 每页显示条数
      current: 1, // 当前的页数
      applyJoinDescription: '',//申请加入描述
      searchOrganizationName: ""//搜索战队
    }
  },
  computed: {
    // 模糊查询
    searchMembersE() {
      const searchMembersE = []
      this.organizations.forEach((item) => {
        if (item.name.search(this.searchOrganizationName) != -1) {
          searchMembersE.push(item)
        }
      })
      return searchMembersE
    }
  },
  watch: {
  },
  mounted() {
    this.refresh();
  },
  methods: {
    // 渲染戰隊列表
    refresh(pageIndex) {
      if (pageIndex <= 1) {
        pageIndex = this.current
      }
      const url = `/api/Organization/${this.gameID}`
      const data = { pageIndex: pageIndex, pageRows: this.display }
      this.$fetch(url, data).then((res) => {
        if (res.code === 0) {
          this.total = res.data.pageData.total
          res.data.lst.forEach(organizations => {
            organizations.join = 1
          });
          this.organizations = res.data.lst
        }
      })
    },
    createOrganization() {
      this.isShowCreateTeam = true
    },
    onCreateSuc(organization) {
      this.$emit("onCreateSuc", organization)
    },
    onCancel() {
      this.isShowCreateTeam = false
    },
    // 申请加入
    applyJoin(organization) {
      const url = `/api/MOrganizationMember/${organization.id}/ApplyJoin`
      const data = { description: this.applyJoinDescription }
      this.$post(url, data).then((res) => {
        if (res.code === 0) {
          organization.join = 2
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          });
        }
      })
    }
  }
}
</script>
<style scoped>
.tt-header {
  position: relative;
  width: 100%;
  height: 55px;
}
.tt-header button {
  border: none;
  width: 100px;
  height: 30px;
  margin-top: 13px;
  margin-left: 45px;
  margin-right: 490px;
  background-color: #7800ff;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0px;
  color: #ffffff;
}
.tt-header input {
  width: 260px;
  height: 30px;
  margin-top: 13px;
  padding-left: 7px;
  background-color: #373739;
  border: solid 1px #4c4c4c;
  line-height: 16px;
  letter-spacing: 0px;
  color: #ffffff;
  float: right;
  margin-right: 44px;
}
.tt-header img {
  position: absolute;
  top: 20px;
  right: 55px;
}
.tt_conts {
  width: 945px;
  height: 642px;
  margin: 0px;
  padding: 0px;
}
.tt_data {
  width: 861px;
  height: 560px;
  margin-top: 5px;
  margin-left: 45px;
}
.tt_list {
  width: 855px;
  height: 60px;
  margin-bottom: 8px;
  background-color: #181818;
  border: solid 1px #252525;
  display: flex;
  justify-content: space-between;
  color: #8d8c8d;
}
.tt_list:hover {
  border: solid 1px #8d8c8d;
  color: #ffffff;
}
.tt_left {
  width: 727px;
  height: 60px;
  display: flex;
  justify-content: space-between;
}
.tt_img {
  width: 272px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  text-align: center;
  line-height: 60px;
}
.tt_img img {
  width: 40px;
  height: 40px;
  margin-left: 16px;
  margin-top: 10px;
}
.tt_name {
  width: 200px;
  height: 60px;
  text-align: left;
  line-height: 60px;
  /* color: #ffffff; */
}
.tt_gameype {
  width: 300px;
  height: 60px;
  display: flex;
  justify-content: space-between;
}
.tt_member {
  width: 150px;
  height: 60px;
  text-align: center;
  font-size: 14px;
  /* color: #ffffff; */
  line-height: 60px;
}
.tt_integral {
  width: 150px;
  height: 60px;
  text-align: center;
  /* color: #ffffff; */
  font-size: 14px;
  line-height: 60px;
}
.tt_right {
  width: 127px;
  height: 59px;
  border-left: 1px solid #333333;
}
.tt_button {
  width: 80px;
  height: 28px;
  background-color: #7800ff;
  border: 0;
  outline: none;
  color: #ffffff;
  font-size: 14px;
  margin: 15px 25px;
}
.tt_Page {
  width: 856px;
  height: 32px;
  padding-top: 3px;
  margin-top: 45px;
}
</style>
<style>
.el-pagination {
  text-align: center;
}
.el-pagination.is-background .btn-prev {
  background-color: #181818;
}
.el-pagination.is-background .btn-next {
  background-color: #181818;
}
.el-pagination.is-background .el-pager li {
  background-color: #181818;
  font-weight: normal;
  font-size: 12px;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #333;
  border: 1px solid #8d8c8d;
}
.el-pagination.is-background .el-pager li:hover {
  background-color: #333;
  border: 1px solid #8d8c8d;
}
.el-pagination.is-background .el-pager li:not(.disabled):hover {
  color: white;
}
</style>