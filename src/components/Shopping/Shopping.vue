<template>
  <!-- 未参赛 -->
  <div class="Shopping">
    <div class="shop-main">
      <div class="shopping-cart">
        <ShoppingCar :selectData="selectData" @delOver='delOver' />
      </div>
      <div class="supermarket">
        <header>
          <p>商城</p>
        </header>
        <div class="supermarket-main">
          <div class="drop-down"></div>
          <div class="commodity-main">
            <ul>
              <li v-for="(item,idx) in listData">
                <div v-if="item" class="list-img">
                  <img :src="item.previewImageUrl" alt="">
                </div>
                <div class="list-msg">
                  <div style="height:10px;width:100%;"></div>
                  <p v-if="item.name">{{item.name}}</p>
                  <div class="list-btn-pkb" v-if="item">
                    <span>{{item.price}} PK币</span>
                    <button @click="AddShoppingCar(item)">加入购物车</button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="main-page">
            <el-pagination :page-size="8" @current-change="paging" background layout="prev, pager, next" :total='total' />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getShoppinglist } from '../../http.js'
import ShoppingCar from './ShoppingCar/ShoppingCar'
export default {
  name: 'Shopping',
  components: {
    ShoppingCar
  },
  data () {
    return {
      total: 10,
      listData: [],
      nowpages: 1,
      selectData: [], // 加入购物车
      addDATA: [], // 临时选中
    }
  },
  mounted () {
    // 调用商品列表方法
    getShoppinglist(this.nowpages).then(res => {
        console.log(res)
      if (res.code === 0) {
        res.data.lst.forEach(item => {
          item.qty = 0
          item.selectCheckbox = false
          item.allprice = item.qty * item.price
        })
        this.listData = res.data.lst
        this.total = res.data.pageData.total
      }
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    // 翻页
    paging (page) {
      console.log(this.selectData)
      getShoppinglist(page).then(res => {
        if (res.code === 0) {
          res.data.lst.forEach(item => {
            item.qty = 0
            item.selectCheckbox = false
            item.allprice = item.qty * item.price
          })
          this.listData = res.data.lst
          this.total = res.data.pageData.total
        }
      })
    },
    // 加入购物车
    AddShoppingCar (item) {
      if (this.selectData.length === 0) {
        this.addDATA = []
        item.qty++
        item.selectCheckbox = true
        item.allprice = item.qty * item.price
        this.listData.forEach(items => {
          if (items.qty > 0)
            this.addDATA.push(items)
        })
        this.selectData = this.addDATA
      } else {
        this.addDATA = []
        item.qty++
        item.selectCheckbox = true
        item.allprice = item.qty * item.price
        this.listData.forEach(items => {
          if (items.qty > 0)
            this.addDATA.push(items)
        })
        this.selectData.forEach(olditem => {
          this.addDATA.push(olditem)
        })
        var hash = [];
        for (var i = 0; i < this.addDATA.length; i++) {
          if (hash.indexOf(this.addDATA[i]) == -1) {
            hash.push(this.addDATA[i]);
          }
        }
        console.log()
        this.selectData = hash
        this.addDATA = hash
      }
    },
    // 删除购物车的东西
    delOver (item) {
      const newAddData = []
      this.addDATA.forEach(delitem => {
        if (delitem.id === item.id) {
          delitem.qty = 0
          this.addDATA.forEach(deltime1 => {
            if (deltime1.qty > 0) {
              newAddData.push(deltime1)
            }
          })
        }
      })
      this.selectData = newAddData
    }
  }
}
</script>

<style lang="less" scoped>
.Shopping {
  .shop-main {
    width: 1225px;
    height: 775px;
    background-color: #181818;
    .shopping-cart {
      width: 280px;
      height: 775px;
      background-color: #181818;
      float: left;
    }
    .supermarket {
      width: 945px;
      height: 775px;
      background-color: #1e1e1e;
      float: left;
      header {
        width: 945px;
        height: 55px;
        background-color: #141414;
        p {
          width: 35px;
          height: 55px;
          font-size: 16px;
          line-height: 55px;
          color: #ffffff;
          text-align: center;
          border-bottom: 2px solid #7800ff;
          display: block;
          margin: 0 0 0 49px;
        }
      }
      .supermarket-main {
        width: 945px;
        height: 720px;
        .drop-down {
          width: 855px;
          height: 55px;
          margin: auto;
        }
        .commodity-main {
          width: 855px;
          height: 592px;
          margin: auto;
          ul {
            margin: 0;
            li {
              display: block;
              width: 200px;
              height: 282px;
              float: left;
              margin: 0 15px 24px 0;
              .list-img {
                width: 200px;
                height: 200px;
                background-color: white;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
              .list-msg {
                width: 200px;
                height: 82px;
                p {
                  display: block;
                  width: 200px;
                  height: 38px;
                  margin: 0;
                  font-size: 14px;
                  color: #8d8c8d;
                }
                .list-btn-pkb {
                  width: 200px;
                  height: 22px;
                  margin-top: 12px;
                  display: flex;
                  justify-content: space-between;
                  line-height: 22px;
                  font-size: 14px;
                  span {
                    color: #ffffff;
                  }
                  button {
                    width: 80px;
                    height: 22px;
                    background-color: #7800ff;
                    border: 0;
                    outline: none;
                    color: #ffffff;
                  }
                }
              }
            }
            :nth-child(4) {
              margin: 0 0 24px 0;
            }
            :nth-child(5) {
              margin: 0 15px 0 0;
            }
            :nth-child(6) {
              margin: 0 15px 0 0;
            }
            :nth-child(7) {
              margin: 0 15px 0 0;
            }
            :nth-child(8) {
              margin: 0;
            }
          }
        }
        .main-page {
          width: 855px;
          height: 30px;
          margin: 24px auto 0 auto;
          text-align: center;
        }
      }
    }
  }
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
  max-width: 30px;
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
