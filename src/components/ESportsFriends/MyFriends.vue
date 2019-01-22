<template>
<div  id="friends">
    <div class="f_barrier">
        <div class="f_seach">
            <input type="text" placeholder="好友搜索">
            <img src="../../assets/images/搜索.png" alt="搜索">
        </div>
        <div class="f_list">
            <li @click="openFname" v-on:mouseleave="leaveFname" class="f_li">
                <div class="head_portrait">
                    <img src="../../assets/images/pubg.png" alt="头像">
                </div>
                <span class="f_name">awefadsfadsfdsa</span>
                <div v-show="isFcase" class="f_case">
                    <div class="f_caseli">查看战绩</div>
                    <div class="f_caseli">删除好友</div>
                    <div class="f_caseli">移交战队队长</div>
                    <div class="f_caseli">邀请加入战队</div>
                </div>
            </li>
        </div>
    </div>
    <div >
        <friendconts></friendconts>
    </div>
    <router-view></router-view>
</div>
</template>
<script>
import friendconts from "./friendconts.vue";
export default {
    // name: 'friendconts',
    components: {friendconts},
    data(){
        return{
            isFcase:false
        }
    },
    methods:{
        openFname(){
            console.log(6768767)
            this.isFcase=true
        },
        leaveFname(){
            this.isFcase=false
        }
    }
}
</script>
<style scoped>
#friends{
    width: 1225px;
    height: 775px;
}
/*好友栏*/
.f_barrier{
    float: left;
    width: 280px;
    height: 775px;
    background-color: #181818;
}
/*好友搜索框的位置、颜色、字体、图片*/
.f_seach{
    position: relative;
    height: 55px;
    border-bottom: solid 1px #252525;
    
}
.f_seach input{
    width: 240px;
	height: 30px;
    margin-left: 20px;
    margin-top: 13px;
	background-color: #373739;
	border: solid 1px #4c4c4c;
    font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 16px;
	letter-spacing: 0px;
	color: #ffffff;
    padding-left: 13px;
    padding-right: 34px;
    border: solid 1px #4c4c4c;
}
.f_seach img{
    position: absolute;
    top: 20px;
    right: 32px;
}
/*好友列表*/
.f_list{
    width: 280px;
    height: 680px;
    margin-top: 12px;
}
.f_li{
    position: relative;
    height: 36px;
    list-style-type: none;
    

}
.f_case{
    position: absolute;
    z-index: 999;
    top: 36px;
    right: 16px;
    width: 118px;
    height: 146px;
    border: solid 1px #4c4c4c;
    background-color: #181818;
}
.f_caseli{
    height: 36px;
    padding-left: 16px;
    padding-top: 11px;
    color: #8d8d8d8d;
    background-color: #181818;
}
.f_caseli:hover{
    color: #ffffff;
    background-color: #333333;
}
.f_list :hover{
    background-color: #333333;
}
.head_portrait{
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-left: 20px;
    margin-top: 6px;
    background-image: linear-gradient(0deg, #252525 0%, #454545 100%);
}
.head_portrait img{
    width: 18px;
    height: 13px;
    margin-left: 3px;
}
.f_name{
    font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 16px;
	letter-spacing: 0px;
	color: #ffffff;
}

</style>
