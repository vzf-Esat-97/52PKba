<template>
    <div>
        <div class="tc-conts">
            <div class="tc_data1">
                <div class="td_header1">
                    <img :src="teamHeadimg" alt="头像">
                    <div class="td_name1">
                        <input type="text" class="td_nickname1" placeholder="请输入战队名" maxlength="15" v-model="name">
                        <div class="td_team1">战队队长：<span>{{this.$store.state.other.selectedGame.playerName}}</span> </div>
                        <div class="but">
                            <input @change="fileImage" type="file" id="uploadimg" accept="image/jpeg,image/x-png,image/gif">
                            <label for="uploadimg">选择图片</label>
                            <span>*请上传150*150 小于 200K jpg图片</span>
                        </div>
                        <!-- <button>上传头像</button> -->
                    </div>
                    <div class="td_integral1">
                    </div>
                </div>
                <div class="td_conts1">
                    <div>战队简介</div>
                    <textarea name="战队简介" v-model="briefIntroduction"  maxlength="100" onkeyup="this.value=this.value.substring(0, 100)"></textarea>
                </div>
            </div>
            <div class="tc-header">
                <button @click="dialogVisibleconfirmation=true">确认创建</button>
                <button style="backbackground-color: #373739" @click="$emit('onCancel')">返回</button>
            </div>
            <!-- 创建弹框 -->
            <div class="yesCreateTeam">
                <el-dialog :visible.sync="dialogVisibleconfirmation" width="380px">
                    <div class="yc_title">是否创建战队？</div>
                    <div class="yc_btn" @click="create()">确 定</div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'OrganizationEdit',
    data() {
        return {
            teamHeadimg: require('../../assets/images/头像.png'),
            name: '',
            briefIntroduction: '',
            dialogVisibleconfirmation: false,
        }
    },
    mounted() {
    },
    methods: {
        fileImage(e) {
            var that = this;
            var file = e.target.files[0];
            var imgSize = file.size / 1024;
            if (imgSize > 200) {
                this.$message({
                    showClose: true,
                    message: '请上传大小不要超过200KB的图片',
                    type: 'warning'
                })
            } else {
                console.log(123)
                var reader = new FileReader();
                reader.readAsDataURL(file); // 读出 base64
                reader.onloadend = (() => {
                    // 图片的 base64 格式, 可以直接当成 img 的 src 属性值        
                    var dataURL = reader.result;
                    this.teamHeadimg = dataURL
                });
            }
        },
        // 确认创建战队
        create() {
            if (this.teamHeadimg && this.name && this.briefIntroduction) {
                const url = `/api/MOrganization/`
                const data = {
                    gameID: this.$store.state.other.selectedGame.id,
                    name: this.name,
                    icon: this.teamHeadimg,
                    description: this.briefIntroduction
                }
                this.$post(url, data).then((res) => {
                    if (res.code === 0) {
                        this.$store.state.other.selectedGame.organization = {
                            id: res.data.id,
                            name: this.name,
                            type: 1
                        }
                        this.$emit("onCreateSuc", res.data)
                        this.$emit('onCancel')
                        this.dialogVisibleconfirmation = false
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'warning'
                        })
                    }
                })
            } else {
                this.dialogVisibleconfirmation = false
                this.$message({
                    message: "请完善信息",
                    type: 'warning'
                })
            }
        }
    },
}
</script>
<style scoped>
textarea {
  resize: none;
}
.tc-header {
  width: 945px;
  height: 55px;
}
.tc-header button {
  border: none;
  width: 100px;
  height: 30px;
  margin-top: 13px;
  margin-left: 40px;
  background-color: #7800ff;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0px;
  color: #ffffff;
}
.tc-conts {
  width: 945px;
  height: 744px;
  margin: 0px;
  padding: 0px;
}
.tc_data1 {
  width: 861px;
  height: 610px;
  margin-top: 31px;
  margin-left: 40px;
}
.td_header1 {
  width: 861px;
  height: 96px;
  margin-bottom: 63px;
}
.td_header1 img {
  float: left;
  width: 96px;
  height: 96px;
  margin-right: 25px;
}
.td_name1 {
  float: left;
  width: 600px;
  height: 96px;
}
.td_nickname1 {
  border: solid #ffffff 1px;
  width: 380px;
  height: 35px;
  margin-bottom: 8px;
  padding: 5px;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0px;
  color: #ffffff;
  background-color: #373739;
  border: solid 1px #4c4c4c;
  outline: none;
}
.td_team1 {
  height: 16px;
  margin-bottom: 8px;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0px;
  color: #ffffff;
}

.td_integral1 {
  float: right;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0px;
  color: #ffffff;
}
.td_conts1 {
  width: 861px;
  height: 430px;
  margin-bottom: 20px;
}
.td_conts1 div {
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
  height: 396px;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0px;
  color: #ffffff;
  border: 1px solid #8d8c8d;
  outline: none;
  background-color: #1e1e1e;
  padding: 5px;
}
/* .td_conts textarea :active{
    border: 0px;
} */
.td_but1 {
  width: 100px;
  height: 30px;
  background-color: #373739;
  border: solid 1px #4c4c4c;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0px;
  color: #ffffff;
}
/*上传图片按钮*/
input[type="file"] {
  height: 30px;
  display: inline-block;
  width: 100px;
  visibility: hidden;
}
.but {
  position: relative;
}
.but span {
  width: 219px;
  height: 16px;
  font-size: 14px;
  line-height: 46px;
  color: #8d8c8d;
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
.tc-header button:nth-child(2) {
  background-color: #373739;
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
.yc_title {
  height: 14px;
  margin-bottom: 40px;
  line-height: 14px;
  font-size: 14px;
  color: #8d8c8d;
}
.yc_btn {
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

