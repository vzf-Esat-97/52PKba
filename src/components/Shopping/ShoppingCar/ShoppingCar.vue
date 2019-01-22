<template>
  <!-- 未参赛 -->
  <div>
    <header>
      <div style="width:100%;height:20px;"></div>
      <div class="headmsg">
        <span>购物车</span>
        <div class="all-select" @click="allSelect">
          <div class="all-select-box">
            <img v-show="IsAllSelect" src="../../../assets/images/946e7b22cf9ae4cfb0a5698d68d9b27.png" alt="">
          </div>
          <span>全选</span>
        </div>
      </div>
    </header>
    <div class="shopping-car-main">
      <div class="car-main-sclor">
        <ul>
          <li v-for="(item,idx) in selectData" v-if="item">
            <div @click="selectCheckboxclick(item)" class="list-checkbox margin-right">
              <img v-show="item.selectCheckbox" src="../../../assets/images/946e7b22cf9ae4cfb0a5698d68d9b27.png" alt="">
            </div>
            <div class="list-img margin-right">
              <img :src="item.previewImageUrl" alt="">
            </div>
            <div class="list-reduce-add margin-right">
              <div class="list-reduce" @click="reduceclick(item)"> <button>－</button> </div>
              <p>{{item.qty}}</p>
              <div class="list-reduce" @click="addclick(item)"> <button>+</button> </div>
            </div>
            <p style="width:90px;text-algin:right">{{item.price}}PK币</p>
            <div class="del-btn" @click="delClick(item)"> × </div>
          </li>
        </ul>
      </div>
      <div class="car-selected">
        <span>已选{{sureselect}}件</span>
        <span>{{allparice}}PK币</span>
      </div>
      <div v-if="sureselect" class="submit-btn" @click="SubmitData">结算</div>
      <div v-else class="submit-btn" style="background:#333">结算</div>
    </div>
    <!--确认结算弹框-->
    <sureExchange :sureExchangeData="sureExchangeData" v-model="issureExchange" />
  </div>
</template>

<script>
import sureExchange from '@/components/Popup/sureExchange'
export default {
  name: 'ShoppingCar',
  props: {
    selectData: Array
  },
  components: {
    sureExchange
  },
  data () {
    return {
      total: 10,
      //   isdisabled: "true",
      listData: [1],
      nowpages: 1,
      sureselect: 0, // 总数量
      allparice: 0, // 总价格
      issureExchange: false,
      sureExchangeData: {}, // 确认兑换的商品
      IsAllSelect: false,
      IsAllSelectData: [], // 是否全选的数据
    }
  },
  mounted () {

  },
  computed: {
    selectDataa () {
      return this.selectData
    }
  },

  watch: {
    // 父组件传过来的值
    selectDataa (newval, oldval) {
      this.allparice = 0
      this.sureselect = 0
      this.IsAllSelectData = newval
      newval.forEach(item => {
        if (item.selectCheckbox) {
          this.sureselect += item.qty
          this.allparice += item.allprice
        }
      })
      if (this.IsAllSelectData.length > 0) {
        this.IsAllSelect = true
      }
    },
    selectData (newval, oldval) {
      if (newval.length === 0) {
        this.IsAllSelect = false
      }
    }
  },
  methods: {
    //减少购买数量从新计算购买件数和金额总数
    reduceclick (item) {
      //   console.log(item)
      if (item.qty > 1) {
        this.allparice = 0
        this.sureselect = 0
        item.qty--
        this.selectData.forEach(changeitem => {
          changeitem.allprice = changeitem.price * changeitem.qty
          if (changeitem.selectCheckbox) {
            this.sureselect += changeitem.qty
            this.allparice += changeitem.allprice
          }
        })
      }
    },
    // 增加购买数量
    addclick (item) {
      this.allparice = 0
      this.sureselect = 0
      item.qty++
      this.selectData.forEach(additem => {
        additem.allprice = additem.price * additem.qty
        if (additem.selectCheckbox) {
          this.sureselect += additem.qty
          this.allparice += additem.allprice
        }
      })
    },
    SubmitData () {
      this.sureExchangeData.allparice = this.allparice
      this.sureExchangeData.sureselect = this.sureselect
      const selectData = []
      this.selectData.forEach(item => {
        if (item.selectCheckbox) {
          selectData.push(item)
        }
      })
      this.sureExchangeData.selectData = selectData
      this.issureExchange = true
    },

    // 是否选中
    selectCheckboxclick (item) {
      item.selectCheckbox = !item.selectCheckbox
      if (item.selectCheckbox) {
        this.IsAllSelect = true
        this.sureselect = this.sureselect + item.qty
        this.allparice = this.allparice + item.allprice
      } else {
        this.IsAllSelect = false
        this.sureselect = this.sureselect - item.qty
        this.allparice = this.allparice - item.allprice
      }
    },
    // 删除功能
    delClick (item) {
      this.selectData.forEach(delitem => {
        if (delitem.id === item.id) {
          this.$emit('delOver', item)
        }
      })
    },
    // 全选
    allSelect () {
      this.IsAllSelect = !this.IsAllSelect
      if (this.IsAllSelect) {
        this.selectData.forEach(selectItem => {
          selectItem.selectCheckbox = true
          this.sureselect += selectItem.qty
          this.allparice += selectItem.allprice
        })
      } else {
        this.selectData.forEach(selectItem => {
          selectItem.selectCheckbox = false
        })
        this.sureselect = 0
        this.allparice = 0
      }
    }
  }
}
</script>

<style lang="less" scoped>
header {
  width: 100%;
  height: 54px;
  border-bottom: 1px solid #252525;
  .headmsg {
    width: 248px;
    height: 20px;
    margin-left: 20px;
    border-left: 2px solid #7800ff;
    display: flex;
    justify-content: space-between;
    span {
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      padding-left: 12px;
      line-height: 20px;
      letter-spacing: 1px;
      color: #8d8c8d;
    }
    .all-select {
      width: 52px;
      height: 20px;
      cursor: pointer;
      line-height: 20px;
      //   background-color: cadetblue;
      .all-select-box {
        width: 16px;
        height: 16px;
        margin-top: 2px;
        float: left;
        background-color: #181818;
        border: solid 1px #8d8c8d;
        border-radius: 8px;
        img {
          margin: 0 0 7px 3px;
        }
      }
      span {
        font-size: 14px;
        padding-left: 6px;
      }
    }
  }
}
.shopping-car-main {
  width: 100%;
  height: 720px;
  // 列表
  .car-main-sclor {
    width: 255px;
    height: 658px;
    margin: auto;
    overflow: hidden;
    ul {
      margin: 0;
      display: block;
      width: 272px;
      height: 658px;
      overflow-y: scroll;
      li {
        width: 255px;
        height: 56px;
        margin-top: 16px;
        // display: flex;
        // justify-content: space-between;
        position: relative;
        .list-checkbox {
          width: 16px;
          height: 16px;
          background-color: #181818;
          border: solid 1px #8d8c8d;
          border-radius: 8px;
          margin: 20px 0;
          float: left;
          cursor: pointer;
          img {
            margin: 0px 3px 8px;
          }
        }
        .list-img {
          width: 56px;
          height: 56px;
          background-color: #f1f7f3;
          float: left;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .list-reduce-add {
          width: 62px;
          height: 16px;
          margin: 20px 0;
          float: left;
          display: flex;
          justify-content: space-between;
          .list-reduce {
            width: 16px;
            height: 16px;
            background-color: #181818;
            border: solid 1px #8d8c8d;
            border-radius: 8px;
            cursor: pointer;
            color: white;
            line-height: 12px;
            text-align: center;
            button {
              border: 0;
              outline: none;
              background-color: transparent;
              margin-right: 1px;
            }
          }
          p {
            line-height: 16px;
          }
        }
        p {
          margin: 0;
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 56px;
          letter-spacing: 0px;
          color: #ffffff;
          float: left;
          text-align: right;
        }
        .del-btn {
          width: 16px;
          height: 16px;
          left: 237px;
          top: 0;
          border-radius: 8px;
          cursor: pointer;
          display: none;
          border: 1px solid #8d8c8d;
          position: absolute;
          z-index: 99;
          color: white;
          text-align: center;
          line-height: 14px;
        }
        .del-btn:hover {
          background-color: #8d8c8d;
        }
        .margin-right{
            margin-right: 10px;
        }
      }
      :hover .del-btn {
        display: block;
      }
    }
  }
  // 已选择
  .car-selected {
    width: 240px;
    height: 12px;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 12px;
    letter-spacing: 0px;
    color: #ffffff;
    display: flex;
    justify-content: space-between;
    margin: auto;
  }
  // 结算按钮
  .submit-btn {
    width: 240px;
    height: 30px;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 30px;
    letter-spacing: 0px;
    cursor: pointer;
    text-align: center;
    color: #ffffff;
    background-color: #7800ff;
    margin: 8px auto;
  }
}
</style>
