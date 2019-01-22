<template>
    <div id="scheduleList">
        <div id="list">
            <div class="dropdown">
                <li>
                    <div class="listDetails" @click="listlist(1)">
                        <div class="listRoomName">
                            <span>WCG吃鸡赛事</span>
                        </div>
                        <div class="endBtn">
                            <button>已结束</button>
                        </div>
                        <div class="listPeoples">
                            <span>参赛队伍：150</span>
                        </div>
                        <div class="listTime">
                            <span>2018-10-14</span>
                        </div>
                    </div>
                    <ul class="dropdown-content" :class="{ dropdownContent: isActive,}">
                        <li>
                            <div class="record" style="background-color: #252525;">
                                <div class="teamName">
                                    <div class="teamNameImg">
                                        <img src="../../assets/images/pubg.png">
                                    </div>
                                    <span>sb中的sb战队</span>
                                </div>
                                <div class="totalScore">
                                    <span>总积分：50</span>
                                </div>
                                <div class="IndividualPoints">
                                    <span>击杀积分：10分</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="record">
                                <div class="teamName">
                                    <div class="teamNameImg">
                                        <img src="../../assets/images/pubg.png">
                                    </div>
                                    <span>sb中的sb战队</span>
                                </div>
                                <div class="totalScore">
                                    <span>总积分：50</span>
                                </div>
                                <div class="IndividualPoints">
                                    <span>击杀积分：10分</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="record">
                                <div class="teamName">
                                    <div class="teamNameImg">
                                        <img src="../../assets/images/pubg.png">
                                    </div>
                                    <span>sb中的sb战队</span>
                                </div>
                                <div class="totalScore">
                                    <span>总积分：50</span>
                                </div>
                                <div class="IndividualPoints">
                                    <span>击杀积分：10分</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
                <li>
                    <div class="listDetails" @click="listlist(2)">
                        <div class="listRoomName">
                            <span>WCG吃鸡赛事</span>
                        </div>
                        <div class="endBtn">
                            <button>已结束</button>
                        </div>
                        <div class="listPeoples">
                            <span>参赛队伍：150</span>
                        </div>
                        <div class="listTime">
                            <span>2018-10-14</span>
                        </div>
                    </div>
                    <ul class="dropdown-content" :class="{ dropdownContent: isActive}">
                        <li>
                            <div class="record" style="background-color: #252525;">
                                <div class="teamName">
                                    <div class="teamNameImg">
                                        <img src="../../assets/images/pubg.png">
                                    </div>
                                    <span>sb中的sb战队</span>
                                </div>
                                <div class="totalScore">
                                    <span>总积分：50</span>
                                </div>
                                <div class="IndividualPoints">
                                    <span>击杀积分：10分</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="record">
                                <div class="teamName">
                                    <div class="teamNameImg">
                                        <img src="../../assets/images/pubg.png">
                                    </div>
                                    <span>sb中的sb战队</span>
                                </div>
                                <div class="totalScore">
                                    <span>总积分：50</span>
                                </div>
                                <div class="IndividualPoints">
                                    <span>击杀积分：10分</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="record">
                                <div class="teamName">
                                    <div class="teamNameImg">
                                        <img src="../../assets/images/pubg.png">
                                    </div>
                                    <span>sb中的sb战队</span>
                                </div>
                                <div class="totalScore">
                                    <span>总积分：50</span>
                                </div>
                                <div class="IndividualPoints">
                                    <span>击杀积分：10分</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    data () {
        return {
            isActive: false,
        }
    },
    methods: {
        listlist (a) {
            this.isActive = !this.isActive
        },
    },
}
</script>

<style>
#scheduleList {
  width: 945px;
  height: 720px;
  background-color: #1e1e1e;
}
#list {
  padding-top: 24px;
}
/* 列表及滑动样式 */
#scheduleList .listDetails {
  width: 854px;
  height: 58px;
  background-color: #181818;
  border: solid 1px #252525;
  justify-content: space-between;
}
#scheduleList .listDetails:hover {
  border: solid 1px #8d8c8d;
}
#scheduleList .listDetails:hover .listRoomName span,
#scheduleList .listDetails:hover .listTime span,
#scheduleList .listDetails:hover .listPeoples span {
  color: #ffffff;
}
/* 名称 */
#scheduleList .listRoomName {
  width: 180px;
  height: 56px;
  float: left;
  margin-left: 24px;
  font-size: 14px;
  color: #8d8c8d;
}
#scheduleList .listRoomName span {
  line-height: 56px;
}
/* 时间 */
#scheduleList .listTime {
  width: 100px;
  height: 56px;
  font-size: 14px;
  text-align: center;
  color: #8d8c8d;
  float: right;
}
#scheduleList .listTime span {
  line-height: 58px;
}
/* 参赛队伍 */
#scheduleList .listPeoples {
  width: 130px;
  height: 56px;
  float: right;
}
#scheduleList .listPeoples span {
  width: 130px;
  height: 56px;
  line-height: 58px;
  float: left;
  font-size: 14px;
  color: #8d8c8d;
  text-align: center;
}
/* 已结束按钮 */
#scheduleList .endBtn {
  width: 128px;
  height: 56px;
  border-left: 1px solid #333333;
  float: right;
}
#scheduleList .endBtn button {
  border: 0;
  outline: none;
  width: 80px;
  height: 28px;
  background-color: #8d8c8d;
  color: #ffffff;
  font-size: 14px;
  margin: 14px 24px;
}
/* 查看具体比赛记录 */
#scheduleList .dropdown-content .record {
  width: 854px;
  height: 38px;
  background-color: #181818;
  border: solid 1px #252525;
}
#scheduleList .dropdown-content .record:hover {
  background-color: #333333;
  border: solid 1px #ffffff;
}
#scheduleList .dropdown-content .record:hover .teamName span,
#scheduleList .dropdown-content .record:hover .IndividualPoints span,
#scheduleList .dropdown-content .record:hover .totalScore span {
  color: #ffffff;
}
#scheduleList .teamName {
  display: inline-block;
  height: 38px;
  width: 200px;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #8d8c8d;
}
#scheduleList .IndividualPoints,
#scheduleList .totalScore {
  float: right;
  line-height: 38px;
  color: #ffffff;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #8d8c8d;
  margin-right: 32px;
}
#scheduleList .totalScore {
  margin-right: 16px;
}
#scheduleList .teamName .teamNameImg {
  height: 24px;
  width: 24px;
  background-color: #454545;
  display: inline-block;
  margin-top: 7px;
  margin-left: 16px;
}
#scheduleList .teamName span {
  margin-left: 8px;
}
/* 弹出框样式 */
.dropdown > li {
  list-style: none;
}
ul > li {
  list-style: none;
}
ul {
  margin-top: -3px;
  margin-bottom: 0px;
}
.dropdown > li > .listDetails {
  position: relative;
  display: inline-block;
  margin-left: 45px;
  margin-top: 8px;
}
.dropdown-content {
  display: none;
  margin-left: 45px;
}

/* .dropdown .listDetails:hover + .dropdown-content {
  display: block;
} */
.dropdownContent {
  display: block;
}
</style>
