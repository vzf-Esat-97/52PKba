import axios from 'axios'

const state = {
    author: "",
    url: '',
    moneyMath: 0, // 个人中心选择支付金额
    payment: 0,    // 个人中心支付方式
    Rechargesuccessfullyreturned: 0, // 个人中心充值成功 返回状态
    zhucbangdingmsg: '',     // 注册绑定状态值
    createdGameid: 0,   // 修改创建赛事Id
    nameChioce: 0, // 创建修改名称
    createdGamedels: 0, //创建战队详情想展示
    publishsuc: 0,  // 发布成功状态
    gameCreatstate: true, // 创建赛事页面状态控制
    selectedGame: undefined, // 当前游戏
    loginInfo: undefined,
    loginState:false
}

const getters = {
}

// actions
const actions = {
    initToken({ commit, state }, products) {
        commit('token', localStorage.getItem('token'))
    }
}

// mutations
const mutations = {
    newAuther(state, msg) {
        state.auther = msg
    },
    GetUrls(state, msg) {
        state.url = msg
    },
    // 个人中心选择支付金额
    moneyMath(state, data) {
        state.moneyMath = data
    },
    // 个人中心选择支付方式
    payment(state, data) {
        state.payment = data
    },
    // 个人中心充值成功状态返回
    Rechargesuccessfullyreturned(state, data) {
        state.Rechargesuccessfullyreturned = data
    },
    // 注册绑定成功号码信息
    zhucbangdingmsg(state, data) {
        state.zhucbangdingmsg = data
    },
    createdGame(state, data) {
        state.createdGame = data
    },
    createdGameid(state, data) {
        state.createdGameid = data
    },
    // 创建修改名称
    nameChioce(state, data) {
        state.nameChioce = data
    },
    // 創建戰隊
    createdGamedels(state, data) {
        state.createdGamedels = data
    },
    // 发布成功
    publishsuc(state, data) {
        state.publishsuc = data
        console.log(state.publishsuc)
    },
    // 创建赛事页面状态控制
    gameCreatstate(state, data) {
        state.gameCreatstate = data
    },
    // 游戏类型ID
    selectedGame(state, data) {
        state.selectedGame = data
        console.log(state.selectedGame)
    },
    // 游戏类型ID
    loginInfo(state, data) {
        state.loginInfo = data
    },
    // 登陆弹框状态控制
    IsLoginShowState(state,data){
        state.loginState = data
        console.log(state.loginState)
    }
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
