<template>
    <div id="yuliuSearch">
        <img src="../../assets/images/search.png" alt="" @click="search">
        <el-input placeholder="搜索成员" @keyup.13="searchEnter" maxlength="16">
        </el-input>
    </div>
</template>

<script>
export default {
    name: 'gameSearch',
    data () {
        return {

        }
    },
    methods: {
        search(){
           //点击图标搜索
        },
        searchEnter(){
            //点击键盘Enter
        },
    },
}
</script>

<style>
#yuliuSearch {
  width: 240px;
  height: 55px;
  position: relative;
  border-bottom: 1px solid #252525;
}
/* 搜索图标 */
#yuliuSearch img {
  position: absolute;
  top: 37%;
  left: 82%;
  z-index: 100;
}
/* 搜索框的大小及位置样式*/
#yuliuSearch .el-input {
  width: 208px;
  height: 28px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -104px;
  margin-top: -14px;
}
/* 搜索框样式 */
#yuliuSearch .el-input__inner {
  height: 28px;
  border: 1px solid #4c4c4c;
  border-radius: 0px;
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 15px;
  letter-spacing: 0px;
  color: #fff;
  background-color: #333333;
}
/* 搜索框提示文字颜色 */
#yuliuSearch input::-webkit-input-placeholder {
  color: #8d8c8d;
}
</style>
