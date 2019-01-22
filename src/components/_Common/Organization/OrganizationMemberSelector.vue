<template>
    <div v-if="isShow" class="organization-member-selector">
        <el-dialog :visible.sync="isShowE" width="340px" :close-on-click-modal="false" @close="onClose">
            <p>参赛人员（已勾选{{selectedMembers.length}}人）</p>
            <div class="organization-main-list">
                <div class="organization-main-search">
                    <input v-model="searchName" placeholder="请输入队友名称" type="text">
                    <img src="../../../assets/images/搜索.png" alt="">
                </div>
                <ul class="organization-main-selector">
                    <div style="height:8px;"></div>
                    <li v-for="(member,idx) in searchMembersE" :key="idx">
                        <el-checkbox class="main_content_list_checkbox" v-model="member.isSelected" @change="check(member)">
                            <span>{{member.name}}</span>
                        </el-checkbox>
                    </li>
                </ul>
            </div>
            <div class="ok-btn" @click="ok">确认报名</div>
        </el-dialog>
        <twoOrganizationMemberSelector v-model="selectsure" :twocompetition='onecompetition' :selectnumbers='selectedMembers'/>
    </div>
</template>
<script>
import HeadImage from '@/components/_Common/HeadImage.vue'
import twoOrganizationMemberSelector from './twoOrganizationMemberSelector.vue'
export default {
    name: 'OrganizationMemberSelector',
    components: {
        HeadImage,
        twoOrganizationMemberSelector
    },
    props: {
        isShow: Boolean,
        members: Array,
        selectMax: Number,
        selectMin: Number,
        onecompetition:Object
    },
    data() {
        return {
            isShowE: false,
            membersE: [],
            selectedMembers: [],
            searchName: '',
            selectsure:false
        };
    },
    computed: {
        selectMemberIDs() {
            const selectMemberIDs = []
            this.membersE.forEach(member => {
                if (member.isSelected) selectMemberIDs.push(member.id)
            });
            return selectMemberIDs
        },
        // 模糊查询
        searchMembersE() {
            const searchMembersE = []
            this.membersE.forEach((item) => {
                if (item.name.search(this.searchName) != -1) {
                    searchMembersE.push(item)
                }
            })
            return searchMembersE
        }
    },
    watch: {
        isShow() {
            this.isShowE = this.isShow
            this.refresh()
        },
        members() {
            this.refresh()
        }
    },
    mounted() {
        this.refresh()
    },
    methods: {
        refresh() {
            const membersE = this.members ? JSON.parse(JSON.stringify(this.members)) : []
            membersE.forEach(member => {
                member.isSelected = false
            });
            this.membersE = membersE
        },
        check(member) {
            if (member.isSelected) {
                this.selectedMembers.push(member)
                console.log(member, this.selectedMembers)
                if (this.selectMax && this.selectMemberIDs.length > this.selectMax) {
                    member.isSelected = false
                }
            } else {
                this.selectedMembers.splice(member, 1)
                console.log(this.selectedMembers)
            }
        },
        ok() {
            if(this.selectedMembers.length!=0){
                console.log(this.selectedMembers)
                this.selectsure=true
                console.log(this.selectsure)
                console.log(this.onecompetition)
            }else{
                this.$message({
                    message: '请选择至少一个成员参加比赛',
                    type: 'warning'
                })
            }
            // const selectedMemberIDs = []
            // this.membersE.forEach(member => {
            //     if (member.isSelected)
            //         selectedMemberIDs.push(member.id)
            // })
            // this.selectedMembers = selectedMemberIDs
            // this.$emit('onOK', selectedMemberIDs)
        },
        onClose(){
            this.$emit('onCancel')
            this.selectedMembers=[]
        }
    }
};
</script>
<style>
/*弹框*/
.organization-member-selector .el-dialog {
  background: #121212;
  height: 320px;
  border: solid 1px #4c4c4c;
}
.organization-member-selector .el-dialog__headerbtn .el-dialog__close {
  position: absolute;
  top: -10px;
  right: -10px;
}
.organization-member-selector .el-dialog__header {
  padding: 0;
}
.organization-member-selector .el-dialog__body {
  height: 320px;
  padding: 30px 30px 32px 30px;
  text-align: center;
}
.organization-member-selector p {
  font-size: 14px;
  color: #8d8c8d;
  text-align: left;
}
.organization-member-selector .tb_title {
  height: 14px;
  margin-bottom: 40px;
  line-height: 14px;
  font-size: 14px;
  color: #8d8c8d;
}
.organization-member-selector .tb_btn {
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
.ok-btn {
  width: 280px;
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
/* .organization-main-selector .head-image {
  HeadImage
  width: 24px;
  height: 24px;
} */
.organization-main-list {
  width: 280px;
  height: 189px;
  background-color: #373739;
  border: solid 1px #4c4c4c;
  margin: auto;
}
.organization-main-search {
  width: 260px;
  height: 30px;
  background-color: #373739;
  border: solid 1px #4c4c4c;
  margin: 8px 10px;
}
.organization-main-search input {
  width: 220px;
  height: 27px;
  border: 0;
  outline: none;
  margin-top: 1px;
  background-color: #373739;
  color: #ffffff;
  font-size: 12px;
}
.organization-main-search img {
  cursor: pointer;
}

ul {
  width: 260px;
  border-top: 1px solid #4c4c4c;
  margin: auto;
  height: 135px;
  overflow: auto;
  vertical-align: bottom;
}
.organization-main-search ul::-webkit-scrollbar {
  display: none;
}
.organization-main-selector li {
  width: 260px;
  color: #8d8c8d;
  font-size: 16px;
  text-align: left;
}
.main_content_list_checkbox span {
  color: #ffffff;
}
/* .no-member {
  height: 150px;
} */
</style>