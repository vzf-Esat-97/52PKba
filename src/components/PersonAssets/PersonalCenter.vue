<template>
  <div id="personal-center">
    <el-dialog
      title="个人中心"
      :visible.sync="isShow"
      width="380px"
      :close-on-click-modal=false
      @close="closegetmyinfo(1)"
    >
      <div class="HeadPortrait">
        <div class="leftImg">
          <img
            style="width:100%;height:100%;"
            :src="head"
            alt=""
            accept="image/*"
          />
        </div>
        <div class="rightTitle">
          <!-- <span>lv.31</span> -->
          <!-- <button>更换头像</button> -->
          <label for="upimg">更换头像</label>
          <input
            @change="changeHead"
            style="display:none"
            id="upimg"
            type="file"
            accept="image/*"
          />
        </div>
      </div>
      <div class="ItSaid">
        <label for="">呢称</label>
        <input
          placeholder="请输入呢称"
          type="text"
          v-model="oneselfItSaid"
          @blur.prevent="oneselfItSaid1"
          maxlength="15"
        />
      </div>
      <div class="Email">
        <label for="">邮箱</label>
        <input
          placeholder="请输入邮箱"
          type="email"
          v-model="oneselfEmail"
          @blur.prevent="oneselfEmail1"
        />
      </div>
      <div class="DateBirth">
        <label for="">出生日期</label>
        <input
          placeholder="请输入出生日期 例:1900-0-0"
          type="text"
          v-model="oneselfDateBirth"
          @blur.prevent="oneselfDateBirth1"
        />
      </div>
      <div class="ContactAddress">
        <label for="">联系地址</label>
        <input
          placeholder="请输入联系地址"
          type="text"
          v-model="oneselfContactAddress"
          @blur.prevent="oneselfContactAddress1"
        />
      </div>
      <div class=" twoDimensionCode">
        <el-tabs v-model="activeName">
          <el-tab-pane
            label="微信打赏码"
            name="t1"
          >
            <div class="dimensionCode">
              <div v-if="!wxpayQRCode">
                <label
                  for="exceptionalCode"
                  class="codeUpload"
                >选择图片文件</label>
                <input
                  style="display:none"
                  id="exceptionalCode"
                  type="file"
                  accept="image/*"
                  @change="selectAndUploadImage($event,'wxpay_qrcode')"
                />
              </div>
              <img
                v-else
                :src="wxpayQRCode"
              />
              <label
                for="changeCode"
                class="codeReplace"
              ></label>
              <input
                style="display:none"
                id="changeCode"
                type="file"
                accept="image/*"
                @change="selectAndUploadImage($event,'wxpay_qrcode')"
              />
            </div>
          </el-tab-pane>
          <el-tab-pane
            label="支付宝打赏码"
            name="t2"
          >
            <div class="dimensionCode">
              <div v-if="!alipayQRCode">
                <label
                  for="exceptionalCode"
                  class="codeUpload"
                >选择图片文件</label>
                <input
                  style="display:none"
                  id="exceptionalCode"
                  type="file"
                  accept="image/*"
                  @change="selectAndUploadImage($event,'alipay_qrcode')"
                />
              </div>
              <img
                v-else
                :src="alipayQRCode"
              />
              <label
                for="replaceCode"
                class="codeReplace"
              ></label>
              <input
                style="display:none"
                id="replaceCode"
                type="file"
                accept="image/*"
                @change="selectAndUploadImage($event,'alipay_qrcode')"
              />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="oneselfBtn">
        <button
          type="submit"
          class="oneselfBtn1"
          @click="closegetmyinfo(2)"
        >保存</button>
      </div>
    </el-dialog>
    <div id="myinfosuc">
      <el-dialog
        :visible.sync="dialogsucimg"
        width="260px"
        margin-top='40vh !important'
        :modal=false
      >
        <div class="myinfosucdiv">
          <p>保存成功</p>
          <div
            @click="myinfosucbtnclick"
            class="myinfosucbtn"
          >确认</div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { formatDate } from '../../common/date.js';
export default {
  name: 'PersonalCenter',
  props: {
    value: Boolean
  },
  data() {
    return {
      oneselfItSaid: '',//呢称
      oneselfEmail: '',//邮箱
      oneselfDateBirth: '',//出生日期
      oneselfContactAddress: '',//联系地址
      head: undefined, // 头像
      dialogsucimg: false,
      activeName: 't1',
      weiXinData: "",//微信二维码文件
      wxpayQRCode: '',//微信二维码url
      zhiFuBaoData: "",//支付宝二维码文件
      alipayQRCode: '',//支付宝二维码url
    }
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd');
    }
  },
  computed: {
    isShow: {
      get() {
        return this.value
      },
      set(v) {
        this.$emit('input', v)
      }
    }
  },
  watch: {
    isShow() {
      this.refresh()
    }
  },
  mounted() {
    this.refresh()
  },
  methods: {
    // 获取个人基本信息
    refresh() {
      const url = '/api/User/MyDetail'
      this.$fetch(url).then((res) => {
        if (res.code === 0) {
          this.head = res.data.head128
          this.wxpayQRCode = res.data.wxpayQRCode
          this.alipayQRCode = res.data.alipayQRCode

          this.oneselfItSaid = res.data.nickname
          this.oneselfEmail = res.data.email
          this.oneselfDateBirth = this.fFormatDate(res.data.birthday)
          this.oneselfContactAddress = res.data.address
        }
      })
    },
    //错误消息提示方法
    ErrorMessage() {
      this.$message({
        showClose: true,
        message: this.ErrorMessageText,
        type: 'error',
        duration: 5000,
        center: true,
      });
    },
    //呢称为空判断
    oneselfItSaid1() {
      if (this.oneselfItSaid == '') {
        this.ErrorMessageText = "呢称不能为空"
        this.ErrorMessage()
      }
    },
    //邮箱判断
    oneselfEmail1() {
      if (this.oneselfEmail == '') {
        this.ErrorMessageText = "邮箱不能为空"
        this.ErrorMessage()
      } else if (!(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(this.oneselfEmail))) {
        this.ErrorMessageText = "请输入正确的邮箱"
        this.ErrorMessage()
        this.oneselfEmail = ''
      }
    },
    //出生日期判断
    oneselfDateBirth1() {
      if (this.oneselfDateBirth == '') {
        this.ErrorMessageText = "出生日期不能为空"
        this.ErrorMessage()
      } else if (!(/^(19|20)\d{2}-(1[0-2]|0?[1-9])-(0?[1-9]|[1-2][0-9]|3[0-1])$/.test(this.oneselfDateBirth))) {
        this.ErrorMessageText = "请输入正确的出生日期"
        this.ErrorMessage()
        this.oneselfDateBirth = ''

      }
    },
    // 联系地址判断
    oneselfContactAddress1() {
      if (this.oneselfContactAddress == '') {
        this.ErrorMessageText = "联系地址不能为空"
        this.ErrorMessage()
      }
    },
    // 保存判断
    closegetmyinfo(i) {
      if (i == 1) {
        this.$emit('getmyinfostate', false)
      } else {
        if (this.oneselfItSaid != '' && this.oneselfEmail != '' && this.oneselfDateBirth != '' && this.oneselfContactAddress != '') {
          const url = `/api/User/ImproveBaseInfo`;
          const data = {
            nickname: this.oneselfItSaid,
            address: this.oneselfContactAddress,
            birthday: this.oneselfDateBirth,
            email: this.oneselfEmail
          };
          this.$post(url, data).then(res => {
            if (res.code === 0) {
              this.dialogsucimg = true
              this.$store.dispatch('base/updateMyInfo')
            } else {
              alert(res.msg)
            }
          });
        } else {
          this.ErrorMessageText = "请正确输入所有数据"
          this.ErrorMessage()
        }
      }
    },
    fFormatDate(v) { return this.$options.filters['formatDate'](v) },
    // 更换头像
    changeHead(event) {
      const file = event.target.files[0]
      if (file.size > 200 * 1024) {
        this.$message({
          showClose: true,
          message: '请上传大小不要超过200KB的图片',
          type: 'warning'
        })
        return
      }
      const windowURL = window.URL || window.webkitURL
      const src = windowURL.createObjectURL(event.target.files[0])//创建图片文件的url
      //this.wxpayQRCode = src????
      //上传
      const formdata = new FormData()
      formdata.append('file', file)
      const type = 'head'
      const url = `/api/File/Upload/${type}`
      this.$upload(url, formdata).then((res) => {
        if (res.code === 0) {
          this.$message({ type: 'success', message: '上传头像成功' })
          this.refresh()
          this.$store.dispatch('base/updateMyInfo')
        } else {
          this.$message({ type: 'error', message: res.msg })
        }
      })
      // var reader = new FileReader()
      // reader.readAsDataURL(file) // 读出 base64
      // reader.onloadend = () => {
      //   // 图片的 base64 格式, 可以直接当成 head 的 src 属性值
      //   this.head = reader.result;
      //   console.log(this.head)
      // }
    },
    //上传二维码（微信）
    selectAndUploadImage(event, type) {
      const file = event.target.files[0]
      const windowURL = window.URL || window.webkitURL
      const src = windowURL.createObjectURL(event.target.files[0])//创建图片文件的url
      this.wxpayQRCode = src
      //上传
      const formdata = new FormData()
      formdata.append('file', file)
      const url = `/api/File/Upload/${type}`
      this.$upload(url, formdata).then((res) => {
        if (res.code === 0) {
          this.$message({ type: 'success', message: '上传成功' })
          this.refresh()
        } else {
          this.$message({ type: 'error', message: res.msg })
        }
      })
    },
    // 保存成功
    myinfosucbtnclick() {
      this.dialogsucimg = false
      this.personaldetails = false
      this.$emit('getmyinfostate', false)
    }
  },
}
</script>

<style>
/* 滑动框的大小 */
.twoDimensionCode .el-tabs__nav-scroll {
  height: 40px;
  width: 320px;
  background-color: #121212;
  margin-left: 10px;
  padding-left: 35px;
}
.twoDimensionCode .el-tabs__nav {
  height: 40px;
}
.twoDimensionCode .el-tabs__item {
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  letter-spacing: 1px;
  color: #4c4c4c;
}
.dimensionCode {
  position: relative;
  height: 160px;
  width: 160px;
  margin-top: 25px;
  margin-left: 81px;
}
.dimensionCode img {
  height: 160px;
  width: 160px;
}
.codeUpload {
  display: inline-block;
  width: 100px;
  height: 28px;
  margin-top: 60px;
  margin-left: 30px;
  background-color: #373739;
  border: solid 1px #4c4c4c;
  font-size: 14px;
  line-height: 28px;
  color: #fefefe;
  text-align: center;
  font-weight: normal;
  cursor: pointer;
}
.codeReplace {
  position: absolute;
  height: 16px;
  width: 16px;
  right: -50px;
  bottom: 0px;
  background: url(../../assets/images/bb20a69cf1e1bd1cebb3abe68b6410a.png)
    no-repeat;
}
.codeReplace:hover {
  background: url(../../assets/images/885dce37e3e3972e3c6c40b304eae09.png)
    no-repeat;
  cursor: pointer;
}
/* 选中时候的样式 */
.twoDimensionCode .el-tabs__item.is-active {
  color: #ffffff;
}
/* 滑动框下方滚动条样式 */
.twoDimensionCode .el-tabs__nav-wrap::after {
  background-color: #141414;
}
.twoDimensionCode .el-tabs__active-bar {
  background-color: #7800ff;
}
/* 滑动条距离内容区的距离 */
.twoDimensionCode .el-tabs__header {
  margin-bottom: 0px;
}
.twoDimensionCode .el-tabs__header {
  display: inline-block;
  width: 320px;
}
/* 弹框样式 */
#personal-center .el-dialog__header {
  background-color: #121212;
}
#personal-center .el-dialog {
  height: 696px;
  margin-top: 5vh !important;
}
/* 弹框头 */
#personal-center .el-dialog__title {
  color: #8d8c8d;
  font-size: 14px;
  margin-left: 10px;
}
/* 弹框内容 */
#personal-center .el-dialog__body {
  background-color: #121212;
  padding-top: 3px;
  height: 670px;
  text-align: left;
}
/* 顶部关闭按钮设置 */
#personal-center .el-dialog__headerbtn:hover .el-dialog__close {
  color: #909399;
}
/* 整体大小 */
#personal-center .HeadPortrait {
  height: 80px;
  width: 320px;
  margin: 0 auto;
}
/* 头像 */
#personal-center .HeadPortrait .leftImg {
  width: 80px;
  height: 80px;
  background-color: #373739;
  border: solid 1px #4c4c4c;
  display: inline-block;
  float: left;
}

/* 等级和更换图片 */
#personal-center .HeadPortrait .rightTitle {
  display: inline-block;
  float: left;
}
#personal-center .rightTitle > span {
  display: block;
  margin-top: 28px;
  margin-left: 21px;
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #8d8c8d;
}
#personal-center .rightTitle > label {
  width: 100px;
  height: 28px;
  background-color: #373739;
  border: solid 1px #4c4c4c;
  outline: none;
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #fefefe;
  margin-top: 52px;
  margin-left: 20px;
  text-align: center;
  line-height: 26px;
  cursor: pointer;
}
/* 呢称 */
#personal-center .ItSaid {
  width: 320px;
  height: 40px;
  background: #373739;
  line-height: 40px;
  border: solid 1px #4c4c4c;
  margin: 20px auto 20px auto;
}
#personal-center .ItSaid {
  border-bottom: solid 0px #4c4c4c;
}
#personal-center .ItSaid label {
  display: inline-block;
  width: 80px;
  height: 20px;
  line-height: 20px;
  border-right: solid 1px #8d8c8d;
  color: #8d8c8d;
  font-family: SourceHanSansCN-Regular;
  padding-left: 12px;
  letter-spacing: 0px;
}
#personal-center .ItSaid input {
  height: 37px;
  width: 230px;
  border: solid 0px #4c4c4c;
  background: #373739;
  color: #ffffff;
  outline: none;
  text-indent: 0.6rem;
  letter-spacing: 0px;
  font-size: 16px;
}
/* 邮箱 */
#personal-center .Email {
  width: 320px;
  height: 40px;
  background: #373739;
  line-height: 40px;
  border: solid 1px #4c4c4c;
  margin: 0 auto 20px auto;
}
#personal-center .Email {
  border-bottom: solid 0px #4c4c4c;
}
#personal-center .Email label {
  display: inline-block;
  width: 80px;
  height: 20px;
  line-height: 20px;
  border-right: solid 1px #8d8c8d;
  color: #8d8c8d;
  font-family: SourceHanSansCN-Regular;
  padding-left: 12px;
  letter-spacing: 0px;
}
#personal-center .Email input {
  height: 37px;
  width: 230px;
  border: solid 0px #4c4c4c;
  background: #373739;
  color: #ffffff;
  outline: none;
  text-indent: 0.6rem;
  letter-spacing: 0px;
  font-size: 16px;
}
/* 出生日期 */
#personal-center .DateBirth {
  width: 320px;
  height: 40px;
  background: #373739;
  line-height: 40px;
  border: solid 1px #4c4c4c;
  margin: 0 auto 20px auto;
}
#personal-center .DateBirth {
  border-bottom: solid 0px #4c4c4c;
}
#personal-center .DateBirth label {
  display: inline-block;
  width: 80px;
  height: 20px;
  line-height: 20px;
  border-right: solid 1px #8d8c8d;
  color: #8d8c8d;
  font-family: SourceHanSansCN-Regular;
  padding-left: 10px;
  letter-spacing: 0px;
}
#personal-center .DateBirth input {
  height: 37px;
  width: 230px;
  border: solid 0px #4c4c4c;
  background: #373739;
  color: #ffffff;
  outline: none;
  text-indent: 0.6rem;
  letter-spacing: 0px;
  font-size: 16px;
}
/* 联系地址 */
#personal-center .ContactAddress {
  width: 320px;
  height: 40px;
  background: #373739;
  line-height: 40px;
  border: solid 1px #4c4c4c;
  margin: 0 auto 20px auto;
}
#personal-center .ContactAddress {
  border-bottom: solid 0px #4c4c4c;
}
#personal-center .ContactAddress label {
  display: inline-block;
  width: 80px;
  height: 20px;
  line-height: 20px;
  border-right: solid 1px #8d8c8d;
  color: #8d8c8d;
  font-family: SourceHanSansCN-Regular;
  padding-left: 10px;
  letter-spacing: 0px;
}
#personal-center .ContactAddress input {
  height: 37px;
  width: 230px;
  border: solid 0px #4c4c4c;
  background: #373739;
  color: #ffffff;
  outline: none;
  text-indent: 0.6rem;
  letter-spacing: 0px;
  font-size: 16px;
}
/* 保存按钮 */
#personal-center .oneselfBtn {
  margin-top: 28px;
  margin-bottom: 24px;
  margin-left: 10px;
}
#personal-center .oneselfBtn .oneselfBtn1 {
  width: 320px;
  height: 36px;
  background-color: #7800ff;
  display: block;
  border: none;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  outline: none;
}

/* 保存成功 */
#myinfosuc .el-dialog__header {
  padding: 0;
}
#myinfosuc .el-dialog {
  height: 153px;
  margin-top: 40vh !important;
}
#myinfosuc .el-dialog__title {
  margin: 0;
}
#myinfosuc .el-dialog__body {
  padding: 0;
  height: 153px;
}
#myinfosuc .el-dialog__headerbtn {
  top: 5px;
  right: 8px;
}
#myinfosuc .myinfosucdiv {
  width: 260px;
  height: 153px;
  background-color: #121212;
  border: solid 1px #4c4c4c;
}
#myinfosuc .myinfosucdiv > p {
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  margin: 49px auto 20px auto;
  letter-spacing: 0px;
  color: #fefefe;
  text-align: center;
}
#myinfosuc .myinfosucbtn {
  width: 180px;
  height: 40px;
  background-color: #7800ff;
  cursor: pointer;
  line-height: 40px;
  letter-spacing: 0px;
  color: #fefefe;
  font-size: 16px;
  text-align: center;
  margin: auto;
}
</style>
