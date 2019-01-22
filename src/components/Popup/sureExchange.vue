<template>
  <div class="sureExchange">
    <el-dialog :visible.sync="issureExchange" width="380px" top='8vh' :close-on-click-modal="false">
      <p>全部商品</p>
      <div class="main-content-box">
        <div class="main-content">
          <ul>
            <li v-if="sureExchangeData.selectData" v-for="(item,idx) in sureExchangeData.selectData">
              <div class="main-list-img">
                <img :src="item.previewImageUrl" alt="">
              </div>
              <div class="main-list-right">
                <p>{{item.name.length>50?item.name.substring(0,44)+`...`:item.name}}</p>
                <span>{{item.price}}PK币 ×{{item.qty}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="main-allmoney">
        <span>合计{{sureExchangeData.allparice}}PK币</span>
      </div>
      <div class="main-personmsg">
        <p>手机：<span>{{Mydetiles.phone}}</span></p>
        <div class="main-code">
          <div class="main-code-input">
            <span>验证码</span>
            <input v-model="Mycode" type="text">
          </div>
          <button v-if="IsShow" @click="getMycode" v-text="codeName"></button>
          <button v-else style='background-color:#8d8c8d;' v-text="codeName"></button>
        </div>
        <div class="main-code recipients">
          <span>收件人</span>
          <input type="text">
        </div>
        <div class="main-code recipients">
          <span>地址</span>
          <input v-model="Mydetiles.address" type="text">
        </div>
      </div>
      <div class="rr_btn" @click="sureExchangeClick">确 定</div>
    </el-dialog>
    <ExchangeState :callBackMeg="callBackMeg" v-model="isExchangeState" />
    <ExchangSuc v-model="isExchangSuc" />
  </div>
</template>
<script>
import ExchangeState from './ExchangeState'
import ExchangSuc from './ExchangSuc'
import { goShoppping, getMyinfo, getCode } from '../../http.js'
export default {
  props: {
    value: Boolean,
    sureExchangeData: Object
  },
  components: {
    ExchangeState,
    ExchangSuc
  },
  data () {
    return {
      isExchangeState: false,
      callBackMeg: '', // 返回信息
      Mydetiles: {},
      Mycode: '',
      isExchangSuc: false,
      codeName: '发送验证码',
      IsShow: true
    };
  },
  computed: {
    issureExchange: {
      get () {
        return this.value
      },
      set (v) {
        this.$emit('input', v)
      }
    }
  },
  mounted () {
    // 获取个人详细信息
    getMyinfo().then(res => {
      if (res.data.code === 0) {
        this.Mydetiles = res.data.data
      }
    })
  },
  methods: {
    // 获取验证码
    getMycode () {
      this.IsShow = false
      getCode(this.Mydetiles.phone).then(res => {
        if (res.data.code === 0) {
          console.log(res.data)
        }
      })
      var timing = 60
      let times = setInterval(() => {
        if (timing === 0) {
          clearInterval(times) // 清除倒计时函数
          timing = 60
          this.codeName = '发送验证码'
          this.IsShow = true
        } else {
          timing--
          this.codeName = `${timing}(s)发送中...`
        }
      }, 1000)
    },

    // 确认提交
    sureExchangeClick () {
      const data = {
        "verifyCode": this.Mycode,
        "address": this.Mydetiles.address,
        "items": []
      }
      this.sureExchangeData.selectData.forEach(element => {
        console.log(element)
        if (element.selectCheckbox) {
          console.log(element)
          const items = {
            "commodityID": element.id,
            "qty": element.qty,
            "remark": ""
          }
          data.items.push(items)
        }
      });
      goShoppping(data).then((res) => {
        if (res.data.code === 0) {
          this.issureExchange = false
          setTimeout(() => {
            this.isExchangSuc = true
          }, 2000);
        } else {
          this.callBackMeg = res.data.msg
          this.isExchangeState = true
        }
      })
    }
  }
}
</script>
<style>
.sureExchange .el-dialog {
  height: 678px;
  background: #121212;
  border: solid 1px #4c4c4c;
}
.sureExchange .el-dialog__headerbtn .el-dialog__close {
  position: absolute;
  top: -10px;
  right: -10px;
}
.sureExchange .el-dialog__header {
  padding: 0;
}
.sureExchange .el-dialog__body {
  height: 678px;
  padding: 10px 20px 20px 20px;
  text-align: center;
}
.sureExchange .rr_title {
  height: 14px;
  margin-bottom: 40px;
  line-height: 14px;
  font-size: 14px;
  color: #8d8c8d;
}
.sureExchange .rr_btn {
  width: 320px;
  height: 40px;
  background-color: #7800ff;
  margin: auto;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  color: #fefefe;
  cursor: pointer;
  margin-top: 20px;
}
.sureExchange p {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  color: #8d8c8d;
  text-align: left;
}
</style>
<style lang="less" scoped>
.sureExchange {
  .main-content-box {
    width: 320px;
    height: 290px;
    margin: auto;
    overflow: hidden;
    .main-content {
      width: 337px;
      height: 290px;
      margin: auto;
      overflow: auto;
      border-bottom: 1px solid #4c4c4c;
      ul {
        margin: 0;
        li {
          list-style: none;
          width: 315px;
          height: 57px;
          margin: 15px auto 0 auto;
          .main-list-img {
            width: 56px;
            height: 56px;
            float: left;
            background-color: #f1f7f3;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .main-list-right {
            width: 247px;
            height: 57px;
            float: right;
            text-align: left;
            font-size: 14px;
            p {
              margin: 0;
              height: 40px;
              color: #8d8c8d;
            }
            span {
              color: #ffffff;
            }
          }
        }
        :nth-child(1) {
          margin: 0 auto;
        }
      }
    }
  }
  .main-allmoney {
    width: 320px;
    height: 40px;
    margin: auto;
    text-align: left;
    line-height: 40px;
    color: #ffffff;
    font-size: 18px;
  }
  .main-personmsg {
    width: 320px;
    height: 190px;
    margin: auto;
    p {
      margin: 0;
      font-size: 16px;
      color: #8d8c8d;
      span {
        color: #ffffff;
      }
    }
    .main-code {
      width: 320px;
      height: 36px;
      margin-top: 16px;
      .main-code-input {
        width: 169px;
        height: 36px;
        background-color: #373739;
        border: solid 1px #4c4c4c;
        float: left;
        span {
          display: block;
          width: 70px;
          height: 20px;
          margin-top: 8px;
          font-size: 16px;
          text-align: center;
          border-right: 1px solid #8d8c8d;
          float: left;
          color: #8d8c8d;
          line-height: 20px;
        }
        input {
          width: 97px;
          height: 100%;
          outline: none;
          color: #ffffff;
          border: 0;
          padding-left: 14px;
          background-color: #373739;
        }
      }
      button {
        width: 139px;
        height: 36px;
        background-color: #7800ff;
        border: 0;
        outline: none;
        color: #ffffff;
        font-size: 16px;
        float: right;
      }
    }
    // 收件人
    .recipients {
      background-color: #373739;
      border: solid 1px #4c4c4c;
      span {
        display: block;
        width: 70px;
        height: 20px;
        margin-top: 8px;
        font-size: 16px;
        text-align: center;
        border-right: 1px solid #8d8c8d;
        float: left;
        color: #8d8c8d;
        line-height: 20px;
      }
      input {
        width: 248px;
        min-height: 100%;
        float: left;
        padding: 0 15px;
        border: 0;
        outline: none;
        background-color: #373739;
        color: #ffffff;
      }
    }
  }
}
</style>
