<template>
    <div class="ln_rightCont">
        <div class="ln_Headdiv">
            <!-- 左边导航切换 -->
            <div class="ln_Headdiv_left">
                <div @click="lobNavchioce(idx)" :class="{ln_textColor:isCloor==idx}" class="ln_Headdiv_list" v-for="(item,idx) in navData" :key="idx">
                    <p>{{item.name}}</p>
                    <div :class="{ln_borderBoottoms:isCloor==idx}" class="ln_border_Bottom"></div>
                </div>
            </div>

            <!--右边搜索-->
            <div class="ln_Headdiv_search">
                <div class="ln_Search_left">
                    <input placeholder="请输入游戏昵称" type="text">
                </div>
                <img src="../../assets/images/搜索.png" alt="">
            </div>
        </div>

        <div>
            <listContent :listcontentidx='listcontentidx' />
        </div>
    </div>
</template>
<script>
import listContent from './listContent.vue';
export default {
    // name: 'listName',
    components: { listContent },
    name: 'timeModule',
    data() {
        return {
            isCloor: 0,
            navData: [
                {
                    name: '击杀榜'
                },
                {
                    name: '吃鸡榜'
                },
                {
                    name: '积分榜'
                },
                {
                    name: '战队榜'
                }
            ],
            listcontentidx: 0,
            myWidth: 0,

        }
    },
    computed: {
        homepageHeight() {
            return this.$store.state.other.homepage
        }
    },
    watch: {

    },
    mounted() {

    },
    methods: {
        lobNavchioce(idx) {
            this.isCloor = idx
            this.listcontentidx = idx
        },
    }
}
</script>
<style>
.ln_rightCont {
  width: 945px;
  height: 775px;
  float: left;
}
.ln_Headdiv {
  width: 945px;
  height: 55px;
  background-color: #141414;
}
.ln_Headdiv_left {
  width: 304px;
  height: 55px;
  float: left;
  margin-left: 32px;
  display: flex;
  justify-content: space-between;
}
.ln_Headdiv_list {
  width: 60px;
  height: 55px;
  margin: 0;
  cursor: pointer;
  line-height: 55px;
  color: #8d8c8d;
  font-size: 16px;
  position: relative;
}
.ln_border_Bottom {
  width: 30px;
  height: 3px;
  background-color: #7800ff;
  position: absolute;
  top: 52px;
  left: 10px;
  display: none;
}
.ln_Headdiv_list:hover {
  color: #fefeff;
}
.ln_Headdiv_list:hover .ln_border_Bottom {
  display: block;
}
.ln_textColor {
  color: #fefeff;
}
/* .ln_Headdiv_list{
    border-bottom: solid #7800ff 2px;
} */
.ln_textColor:hover {
  color: #ffffff;
}
.ln_borderBoottoms {
  display: block;
}
.ln_Headdiv_search {
  width: 260px;
  height: 30px;
  float: right;
  margin: 13px 16px 0 0;
  background-color: #373739;
  border: solid 1px #4c4c4c;
}
.ln_Headdiv_search img {
  float: left;
  margin: 6px 0 0 0;
  cursor: pointer;
}
.ln_Search_left {
  width: 220px;
  height: 30px;
  float: left;
}
.ln_Search_left input {
  width: 220px;
  height: 28px;
  padding: 5px 17px 5px 17px;
  border: 0;
  outline: none;
  background-color: #373739;
  color: #ffffff;
}

/* .lobbg_cont {
  width: 945px;
  height: 720px;
} */
</style>