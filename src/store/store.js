import Vue from 'vue' //引入vue
import Vuex from 'vuex' //引入vuex

import base from './modules/base'
import other from './modules/other'

Vue.use(Vuex) //注册vuex

export default new Vuex.Store({
    modules: {
        base,
        other
    }
})
