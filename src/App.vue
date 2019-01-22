<template>
  <div id="app">
    <!--挂载组件渲染到页面-->
    <router-view></router-view>
  </div>
</template>

<script>
//import 引入文件(顺序必须先引入 在注册 最后挂载渲染)
//import "babel-polyfill"    
//注册组件    
export default {
  name: 'app'
}
//}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
/*
.el-button--primary{
    background-color: #000000;
    border: 0;
}    
*/

#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei Light",
    "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  overflow: hidden;
}
/* 错误提示框样式 */
.el-message--error {
  background-color: #121212;
  border-color: #4c4c4c;
  border-radius: 0;
  color: #8d8c8d;
  text-align: left;
}
.el-message .el-icon-error {
  color: #ffffff;
}
.el-message--error .el-message__content {
  color: #ffffff;
}

.el-message--success {
  background-color: #121212;
  border-color: #4c4c4c;
  border-radius: 0;
  color: #8d8c8d;
  text-align: left;
}
.el-message .el-icon-success {
  color: #ffffff;
}
.el-message--success .el-message__content {
  color: #ffffff;
}
.el-message--warning {
  background-color: #121212;
  border-color: #4c4c4c;
  border-radius: 0;
  color: #8d8c8d;
  text-align: left;
}
.el-message .el-icon-warning {
  color: #ffffff;
}
.el-message--warning .el-message__content {
  color: #ffffff;
}

/* 状态二选择框样式 */
.el-checkbox__inner {
  border-radius: 0;
  background-color: #4c4c4c;
  outline: none;
}
.el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #4c4c4c;
  border: 1px solid #ffffff;
}
.el-checkbox__inner input {
  display: none;
  border: 0;
  outline: none;
}

/* EL 下拉选 */
.el-select-dropdown {
  background-color: #181818;
}

/* 修改的el的样式-开始 */
.el-input__suffix {
  border-left: 1px solid #333333;
}

.el-select-dropdown__item {
  height: 24px;
  line-height: 24px;
  padding-left: 15px;
}
/* 列表项背景颜色 */
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #333333;
  color: #ffffff;
}
/* 列表选中文字颜色 */
.el-select-dropdown__item.selected {
  color: #ffffff;
  font-weight: 500;
}

.el-select-dropdown__wrap.el-scrollbar__wrap {
  margin-bottom: -22px !important;
  margin-right: -22px !important;
}

.el-picker-panel {
  border: solid 1px #333333;
  background-color: #181818;
}
.el-picker-panel__content.el-scrollbar__wrap {
  margin-bottom: -22px !important;
  margin-right: -22px !important;
}

/* 列表的边框和圆角 */
.el-popper {
  border: solid 1px #333333;
  border-radius: 2px;
}
/* 取消弹出框箭头 */
.el-popper .popper__arrow,
.el-popper .popper__arrow::after {
  border-style: none;
}
/* 列表与下拉框的距离 */
.el-popper[x-placement^="bottom"] {
  margin-top: 0px;
}
.el-popper[x-placement^="bottom"] .popper__arrow {
  display: none;
}
.el-popper[x-placement^="bottom"] {
  margin-top: 5px !important;
}

.shijian .el-input__prefix,
.shijian .el-input__suffix {
  height: 0px;
}

.time-select-item.selected:not(.disabled) {
  color: #ffffff;
}
.el-input__inner {
  text-align: left;
}
.el-dialog {
  border: solid 1px #4c4c4c;
}
</style>
