<template>
  <!--我的订单-->
  <div class="MyIndent">
    <el-dialog :visible.sync="isMyIndent" width="380px" top='8vh' :close-on-click-modal="false">
      <p>全部商品</p>
      <div class="main-content-box">
        <div class="main-content">
          <ul>
            <li v-for="(item,idx) in MyCommodityOrders" :key="idx">
              <p>订单编号：{{item.num}} <span v-if="item.state===2">未完成</span><span v-else-if="item.state===3">已完成</span> </p>
              <div class="main-list">
                <div class="main-listimg-div">
                  <img v-for="(itemimg,idx) in item.details" :src="itemimg.commodity.previewImageUrl">
                </div>
                <p>{{item.ct | fontDate}}<span>合计：{{item.allprice}}PK币</span> </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 翻页 -->
      <div class="fontpage">
        <el-pagination :page-size="pageRows" @current-change="refresh" background layout="prev, pager, next" :total='total' />
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getMyCommodityOrders } from '../../http.js'
import { formatDate } from '../../common/date.js'
export default {
  name: 'MyIndent',
  props: {
    value: Boolean,
    // sureExchangeData: Object
  },
  components: {
  },
  data () {
    return {
      MyCommodityOrders: [], // 返回信息
      NowPage: 1,
      total: 0,
      pageRows: 10,
    };
  },
  filters: {
    fontDate (time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
    }
  },
  computed: {
    isMyIndent: {
      get () {
        return this.value
      },
      set (v) {
        this.$emit('input', v)
      }
    }
  },
  watch: {
    isMyIndent (newval, oldval) {
      if (newval) {
        // 获取我的订单
        getMyCommodityOrders(this.NowPage).then(res => {
          console.log(res)
          if (res.code === 0) {
            res.data.lst.forEach(element => {
              element.allprice = 0
              element.details.forEach(detailsitem => {
                element.allprice += detailsitem.qty * detailsitem.commodity.price
              })
            })
            this.MyCommodityOrders = res.data.lst
            this.total = res.data.pageData.total
            console.log(this.MyCommodityOrders)
          }
        })
      }
    }
  },
  mounted () {
  },
  methods: {
    // 翻页
    refresh (NowPage) {
      getMyCommodityOrders(NowPage).then(res => {
        if (res.code === 0) {
          res.data.lst.forEach(element => {
            element.ct = new Date(element.ct)
          });
          this.MyCommodityOrders = res.data.lst
          this.total = res.data.pageData.total
          console.log(this.MyCommodityOrders)
        }
      })
    }
  }
}
</script>
<style>
.MyIndent .el-dialog {
  height: 671px;
  background: #121212;
  border: solid 1px #4c4c4c;
}
.MyIndent .el-dialog__headerbtn .el-dialog__close {
  position: absolute;
  top: -10px;
  right: -10px;
}
.MyIndent .el-dialog__header {
  padding: 0;
}
.MyIndent .el-dialog__body {
  height: 671px;
  padding: 10px 20px 20px 20px;
  text-align: center;
}
.MyIndent .rr_title {
  height: 14px;
  margin-bottom: 40px;
  line-height: 14px;
  font-size: 14px;
  color: #8d8c8d;
}
.MyIndent .rr_btn {
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
.MyIndent p {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  color: #8d8c8d;
  text-align: left;
  margin: 0;
}
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
<style lang="less" scoped>
.MyIndent {
  .main-content-box {
    width: 320px;
    height: 580px;
    margin: auto;
    overflow: hidden;
    .main-content {
      width: 337px;
      height: 580px;
      margin: auto;
      overflow: auto;
      ul {
        margin: 0;
        li {
          list-style: none;
          width: 320px;
          min-height: 118px;
          border-bottom: 1px solid #4c4c4c;
          margin: 11px 0 0 0;
          p {
            width: 320px;
            height: 20px;
            display: flex;
            font-size: 14px;
            justify-content: space-between;
            color: #ffffff;
            span {
              margin: 0;
            }
          }
          .main-list {
            width: 320px;
            min-height: 87px;
            // margin-top: 10px;
            .main-listimg-div {
              width: 320px;
              min-height: 66px;
              img {
                width: 56px;
                height: 56px;
                display: block;
                float: left;
                background: #ffffff;
                margin: 10px 10px 0 0;
              }
              :nth-child(5n) {
                margin: 10px 0 0 0;
              }
            }
            p {
              font-size: 12px;
              color: #8d8c8d;
              margin: 6px 0 0 0;
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
  .fontpage {
    margin-top: 10px;
  }
}
</style>
