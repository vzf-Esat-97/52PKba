<template>
    <!-- <div class="l_content"> -->
    <div class="lc_conts">
        <div class="lc_nav"></div>
        <!-- 战队 -->
        <div v-show="listcontentidx===3" class="lc_data">
            <div class="lc_list color2">
                <div class="lc_left">
                    <div class="lc_img">
                        <div class="lc_rank">76.</div>
                        <img src="../../assets/images/头像.png" alt="战队头像">
                        <div class="lc_name color3">我要打十个战队</div>
                    </div>
                </div>
                <div class="lc_right">
                    <div style="width:24px;"></div>
                    <div class="lc_integral">战队积分：1658</div>
                </div>
            </div>
            <div class="lc_list color1">
                <div class="lc_left">
                    <div class="lc_img">
                        <div class="lc_Rankstyle">1.</div>
                        <img src="../../assets/images/头像.png" alt="战队头像">
                        <div class="lc_name">伏地魔银河系代表队</div>
                    </div>
                </div>
                <div class="lc_right">
                    <img src="../../assets/images/金.png" alt="pai">
                    <!-- <img src="../../assets/images/银.png" alt="pai">
                    <img src="../../assets/images/铜.png" alt="pai"> -->
                    <div class="lc_integral lc_integralstyle">战队积分：2834</div>
                </div>
            </div>
        </div>
        <!-- 积分榜 -->
        <div v-show="listcontentidx===2" class="lc_data">
            <div class="lc_list color2">
                <div class="lc_left">
                    <div class="lc_img">
                        <div class="lc_rank">76.</div>
                        <img src="../../assets/images/头像.png" alt="战队头像">
                        <div class="lc_name color3">北国的春</div>
                    </div>
                </div>
                <div class="lc_right">
                    <div style="width:24px;"></div>
                    <div class="lc_integral">积分数：1500</div>
                </div>
            </div>
            <div class="lc_list color1">
                <div class="lc_left">
                    <div class="lc_img">
                        <div class="lc_Rankstyle">1</div>
                        <img src="../../assets/images/头像.png" alt="战队头像">
                        <div class="lc_name">南国的雪</div>
                    </div>
                </div>
                <div class="lc_right">
                    <img src="../../assets/images/金.png" alt="pai">
                    <!-- <img src="../../assets/images/银.png" alt="pai">
                    <img src="../../assets/images/铜.png" alt="pai"> -->
                    <div class="lc_integral lc_integralstyle">积分榜：1680</div>
                </div>
            </div>
        </div>
        <!-- 吃鸡榜-->
        <div v-show="listcontentidx===1" class="lc_data">
            <div class="lc_list color2">
                <div class="lc_left">
                    <div class="lc_img">
                        <div class="lc_rank">76.</div>
                        <img src="../../assets/images/头像.png" alt="战队头像">
                        <div class="lc_name color3">很强</div>
                    </div>
                </div>
                <div class="lc_right">
                    <div style="width:24px;"></div>
                    <div class="lc_integral">吃鸡数：0</div>
                </div>
            </div>
            <div class="lc_list color1">
                <div class="lc_left">
                    <div class="lc_img">
                        <div class="lc_Rankstyle">1</div>
                        <img src="../../assets/images/头像.png" alt="战队头像">
                        <div class="lc_name">樱花落</div>
                    </div>
                </div>
                <div class="lc_right">
                    <img src="../../assets/images/金.png" alt="pai">
                    <!-- <img src="../../assets/images/银.png" alt="pai">
                    <img src="../../assets/images/铜.png" alt="pai"> -->
                    <div class="lc_integral lc_integralstyle">吃鸡数：3</div>
                </div>
            </div>
        </div>
        <!-- 击杀榜-->
        <div v-show="listcontentidx===0" class="lc_data">
            <div class="lc_list color2">
                <div class="lc_left">
                    <div class="lc_img">
                        <div class="lc_rank">76.</div>
                        <img src="../../assets/images/头像.png" alt="战队头像">
                        <div class="lc_name color3">本人马飞</div>
                    </div>
                </div>
                <div class="lc_right">
                    <div style="width:24px;"></div>
                    <div class="lc_integral">击杀数：188</div>
                </div>
            </div>
            <div class="lc_list color1">
                <div class="lc_left">
                    <div class="lc_img">
                        <div class="lc_Rankstyle">1</div>
                        <img src="../../assets/images/头像.png" alt="战队头像">
                        <div class="lc_name">本人五五开</div>
                    </div>
                </div>
                <div class="lc_right">
                    <img src="../../assets/images/金.png" alt="pai">
                    <!-- <img src="../../assets/images/银.png" alt="pai">
                    <img src="../../assets/images/铜.png" alt="pai"> -->
                    <div class="lc_integral lc_integralstyle">击杀数：588</div>
                </div>
            </div>
        </div>
    </div>
    <!-- </div> -->
</template>
<script>
export default {
    name: 'teamTable',
    props:{
        listcontentidx:Number
    },
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }],
        value: ''
      }
    }
}
</script>
<style scoped>
.color1 {
  background-color: #181818;
}
.color2 {
  background-color: #333333;
}

/* .l_content{

    width: 945px;
    height: 775px;
    background-color: #1e1e1e;
} */
.lc_conts {
  width: 945px;
  height: 704px;
  margin: 0px;
  padding: 0px;
}
.lc_nav {
  width: 855px;
  height: 20px;
  margin-left: 45px;
  margin-top: 16px;
}
.lc_data {
  width: 861px;
  height: 648px;
  margin-top: 24px;
  margin-left: 45px;
}
.lc_list {
  width: 856px;
  height: 40px;
  border: solid 1px #252525;
  border-top: transparent 1px solid;
  display: flex;
  justify-content: space-between;
}
.lc_list:hover {
  border: solid 1px #8d8c8d;
}
.lc_left {
  width: 727px;
  height: 40px;
  display: flex;
  justify-content: space-between;
}
.lc_img {
  width: 300px;
  height: 40px;
  margin-left: 22px;
  display: flex;
  justify-content: space-between;
  text-align: left;
  line-height: 40px;
}
.lc_rank {
  width: 21px;
  height: 13px;
  color: #ffffff;
}
.lc_Rankstyle {
    width: 22px;
  color: #8d8c8d;
}
.lc_img img {
  width: 24px;
  height: 24px;
  margin-top: 7px;
}
.lc_name {
  width: 200px;
  height: 40px;
  text-align: left;
  line-height: 40px;
  color: #8d8c8d;
}
.lc_right {
  width: 160px;
  height: 40px;
  display: flex;
  justify-content: space-between;
}
.lc_right img {
  width: 24px;
  height: 22px;
  margin-top: 8px;
}
.lc_integral {
  width: 150px;
  height: 40px;
  text-align: center;
  font-size: 14px;
  line-height: 40px;
  color: #ffffff;
}
.lc_integralstyle {
  color: #8d8c8d;
}
.color1:hover .lc_Rankstyle {
  color: #ffffff;
}
.color1:hover .lc_name {
  color: #ffffff;
}
.color1:hover .lc_integralstyle {
  color: #ffffff;
}
.color3 {
  color: #ffffff;
}
</style>

