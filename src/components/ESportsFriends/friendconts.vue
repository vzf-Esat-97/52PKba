<template>
    <div class="f_conts">
        <div class="fc_header">
            <button>加为好友</button>
            <input type="text" placeholder="搜索昵称">
            <img src="../../assets/images/搜索.png" alt="搜索">
        </div>
        <div class="fc_conts">
            <div class="fc_data">
                <div class="fd_header">
                    <img :src="teamHeadimg" alt="头像">
                    <div class="fd_name">
                        <div class="fd_nickname">SB中的SB之仙人模式</div>
                        <div class="fd_team">战队：woyaodahshige</div>
                        <label for="changHeadimg">更改头像</label>
                        <input @change="changImg" type="file" id="changHeadimg" accept="image/jpeg,image/x-png,image/gif">
                    </div>
                    <div class="fd_integral">
                        <div style="margin-bottom: 15px;">个人积分：6556</div>
                        <div>个人排名：46</div>
                    </div>
                </div>
                <div class="fd_conts">
                    <div class="fd_contsdiv">个人简介</div>
                    <div :class="{focusBorder:isfocusBorder}" class="addBorder">
                        <textarea @focus='test' @blur="texts" name="个人简介"></textarea>
                    </div>
                </div>
                <div>
                    <button class="fd_but">修改简介</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'friendconts',
    data() {
        return {
            teamHeadimg: require('../../assets/images/头像.png'),
            isfocusBorder: false
        }
    },
    methods: {
        changImg(e) {
            console.log(1232112)
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
                    // // 下面逻辑处理
                    // $.ajax({
                    //     type:"post",
                    //     url:"/v1/userSet",
                    //     async:true,
                    //     data:{
                    //         avatar:dataURL,
                    //         avatar_wx:1,
                    //         token:token,
                    //         uid:uid,
                    //     },
                    //     success:function(e){
                    //         that.avatar=dataURL;
                    //         alert('修改成功');
                    //         $(".tsk").show().delay(1500).hide(0);
                    //     }
                    // });
                });
            }

        },
        test() {
            this.isfocusBorder = true
        },
        texts() {
            this.isfocusBorder = false
        }
    }
}
</script>
<style scoped>
textarea {
  resize: none;
}
.f_conts {
  float: right;
  width: 945px;
  height: 775px;
  background-color: #1e1e1e;
}
.fc_header {
  position: relative;
  width: 945px;
  height: 55px;
  background-color: #141414;
}
.fc_header button {
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
  outline: none;
}
.fc_header input {
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
.fc_header img {
  position: absolute;
  top: 20px;
  right: 36px;
}
.fc_conts {
  width: 945px;
  height: 689px;
  margin: 0px;
  padding: 0px;
}
.fc_data {
  width: 861px;
  height: 641px;
  margin-top: 31px;
  margin-left: 40px;
}
.fd_header {
  width: 861px;
  height: 96px;
  margin-bottom: 63px;
}
.fd_header img {
  float: left;
  width: 96px;
  height: 96px;
  margin-right: 25px;
}
.fd_name {
  float: left;
  width: 500px;
  height: 96px;
}
.fd_nickname {
  height: 24px;
  margin-bottom: 11px;
  padding-top: 3px;
  font-size: 24px;
  line-height: 16px;
  letter-spacing: 0px;
  color: #ffffff;
}
.fd_team {
  height: 16px;
  margin-bottom: 16px;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0px;
  color: #ffffff;
}
.fd_name label {
  margin: 0px;
  padding-top: 5px;
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
.fd_name input {
  display: none;
}
.fd_integral {
  float: right;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0px;
  color: #ffffff;
}
.fd_conts {
  width: 861px;
  height: 430px;
  margin-bottom: 20px;
}
.fd_conts .fd_contsdiv {
  width: 72px;
  height: 18px;
  margin-bottom: 16px;
  font-size: 18px;
  line-height: 16px;
  letter-spacing: 0px;
  color: #8d8c8d;
}
.fd_conts textarea {
  overflow: hidden;
  width: 859px;
  height: 394px;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0px;
  color: #ffffff;
  border: 0px;
  background-color: #1e1e1e;
  outline: none;
  padding: 5px;
}
.fd_conts textarea :active {
  border: 0px;
}
.fd_but {
  width: 100px;
  height: 30px;
  background-color: #373739;
  border: solid 1px #4c4c4c;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0px;
  color: #ffffff;
  outline: none;
}
.addBorder {
  width: 861px;
  height: 396px;
}
.focusBorder {
  border: 1px solid #8d8c8d;
}
</style>
