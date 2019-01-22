<template>
    <div id="ranking">
        <div class="r_barrier">
            <div class="r_name">
                <img src="../../assets/images/头像.png" alt="头像">
                <div class="r_id">woyaodashigeqqqqqq</div>
            </div>
            <div class="r_list1">
                <div class="rl_li color1">
                    <div class="rl_name">KD</div>
                    <div class="rl_number">12</div>
                </div>
                <div class="rl_li color2">
                    <div class="rl_name">吃鸡数</div>
                    <div class="rl_number">99</div>
                </div>
                <div class="rl_li color1">
                    <div class="rl_name">前十数</div>
                    <div class="rl_number">199</div>
                </div>
                <div class="rl_li color2">
                    <div class="rl_name">吃鸡排名</div>
                    <div class="rl_number">78</div>
                </div>
                <div class="rl_li color1">
                    <div class="rl_name">击杀排名</div>
                    <div class="rl_number">45</div>
                </div>
                <div class="rl_li color2">
                    <div class="rl_name">总场次数</div>
                    <div class="rl_number">455</div>
                </div>
            </div>
            <div class="r_list2">
                <div class="rl_li color2">
                    <div class="rl_name">吃鸡率</div>
                    <div class="rl_number">13.3%</div>
                </div>
                <div class="rl_li color1">
                    <div class="rl_name">前十率</div>
                    <div class="rl_number">43.5%</div>
                </div>
                <div class="rl_li color2">
                    <div class="rl_name">爆头率</div>
                    <div class="rl_number">67.3%</div>
                </div>
                <div class="rl_li color1">
                    <div class="rl_name">场均击杀</div>
                    <div class="rl_number">4.5</div>
                </div>
                <div class="rl_li color2">
                    <div class="rl_name">场均伤害量</div>
                    <div class="rl_number">315</div>
                </div>
                <div class="rl_li color1">
                    <div class="rl_name">场均存活时间</div>
                    <div class="rl_number">18.8min</div>
                </div>
                <div class="rl_li color2">
                    <div class="rl_name">场均前进距离</div>
                    <div class="rl_number">21km</div>
                </div>
            </div>
        </div>
        <div>
            <listName></listName>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
import listName from './listName.vue';
export default {
    name: 'Ranking',
    components: { listName },
}
</script>
<style scoped>
.color1 {
  background-color: #181818;
}
.color2 {
  background-color: #333333;
}
#ranking {
  width: 1225px;
  height: 775px;
  background-color: #1e1e1e;
}
/*我的数据栏*/
.r_barrier {
  float: left;
  width: 280px;
  height: 775px;
  background-color: #181818;
}
.r_name {
  height: 55px;
  display: flex;
  justify-content: space-between;
  text-align: center;
  border-bottom: solid 1px #252525;
  margin-bottom: 8px;
}
.r_name img {
  width: 32px;
  height: 32px;
  margin-left: 24px;
  margin-top: 12px;
}
.r_id {
  width: 200px;
  height: 30px;
  margin-top: 21px;
  text-align: left;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0px;
  color: #ffffff;
}
.r_list {
  height: 500px;
  margin: 0px;
  padding: 0px;
}
.r_list1 {
  height: 216px;
  margin-bottom: 96px;
}
.rl_li {
  height: 36px;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  line-height: 36px;
  letter-spacing: 0px;
  color: #8d8c8d;
}
.rl_name {
  margin-left: 24px;
  width: 100px;
  font-size: 14px;
}
.rl_number {
  width: 70px;
}
.r_list2 {
  height: 252px;
  background-color: blue;
}
</style>
