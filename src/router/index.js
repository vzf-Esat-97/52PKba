import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login/Login' // 登录页面
import HomePage from '@/components/HomePage' //首页
import Lobby from '@/components/Lobby/Lobby' //大厅
// import Recommend from '@/components/Recommend/Recommend' //推荐竞赛
// import teamRecommend from '@/components/teamRecommend/teamRecommend' //推荐竞赛
import CompetitionKanban from '@/components/CompetitionKanban/CompetitionKanban' //推荐竞赛 赛事
import OrganizationManagement from '@/components/OrganizationManagement/OrganizationManagement' //战队信息
import Ranking from '@/components/Ranking/Ranking' //排行榜
import MyFriends from '@/components/ESportsFriends/MyFriends' //我的好友
import CompetitionManagement from '@/components/CompetitionManagement/CompetitionManagement'  // 创建赛事
import CompetitionList from '@/components/CompetitionKanban/CompetitionList'  // 赛事
import Shopping from '@/components/Shopping/Shopping' // 商城
import applyText from '@/components/Finance/applyText' // 支付页面
Vue.use(Router)

export default new Router({
    routes: [
        {
            path:'/Login',
            component: Login
        },
        {
            path: '/',
            name: 'HomePage',
            component: HomePage,
            children: [
                {
                    path: '/HomePage/Lobby',
                    name: 'Lobby',
                    component: Lobby
                },
                {
                    path: '/HomePage/CompetitionKanban/:gameID',
                    name: 'CompetitionKanban',
                    component: CompetitionKanban,
                },
                {
                    path:'/HomePage/MyFriends',
                    name:'MyFriends',
                    component:MyFriends
                },
                {
                    path:'/HomePage/Ranking',
                    name:'Ranking',
                    component:Ranking
                },
                {
                    path:'/HomePage/OrganizationManagement/:gameID',
                    name:'OrganizationManagement',
                    component:OrganizationManagement
                },
                {
                    path:'/HomePage/CompetitionManagement/:gameID',
                    name:'CompetitionManagement',
                    component:CompetitionManagement
                },
                {
                    path:'/HomePage/Shopping',
                    name:'Shopping',
                    component:Shopping
                },
            ],
            redirect:'/HomePage/Lobby'  // 确定首页
        },
        {
            path:'/applyText',
            name:'applyText',
            component:applyText
        }
    ]
})