import axios from 'axios'

const state = {
  token: undefined,
  loginInfo: undefined,
  myGames: [],
  updatingTargetGameID: undefined,
  sysMsgs: [],
}

let startUpdateSysMsgsID = undefined

const getters = {
  youHaveNewMsg(state) {
    for (let i = 0; i < state.sysMsgs.length; i++) {
      const sysMsg = state.sysMsgs[i];
      if (sysMsg.state === 1) {
        return true
      }
    }
    return false;
  }
}

const url_MyInfo = '/api/User/MyInfo'
const url_MyGames = '/api/User/MyGames'
const url_SysMsgs = '/api/Sys/SysMsgs'

// actions
const actions = {
  initToken({ commit, state }) {
    commit('token', localStorage.getItem('token'))
  },
  updateMyInfo({ state }) {
    axios.get(url_MyInfo).then(res => {
      if (res.data.code === 0) {
        state.loginInfo = res.data.data
      }
    })
  },
  updateMyGames({ state }) {
    axios.get(url_MyGames).then((res) => {
      if (res.data.code === 0) {
        // const myGames = []
        // res.data.data.forEach(resDataMyGame => {
        //     const myGame = {
        //         id: resDataMyGame.id,
        //         playerName: resDataMyGame.playerName,
        //         organizations: []
        //     }
        //     if (myGame.id === state.updatingTargetGameID) {
        //         state.updatingTargetGameID = undefined
        //         clearInterval(startUpdateMyGamesID)
        //     }
        //     resDataMyGame.organizations.forEach(organization => {
        //         if (organization.type === 1) {
        //             myGame.organization = organization
        //         } else {
        //             myGame.organizations.push(organization)
        //         }
        //     })
        //     myGames.push(myGame)
        // })
        state.myGames = res.data.data
      }
    })
  },
  // startUpdateMyGames({ commit, actions, state }, { gameID, time, intervalMS }) {
  //     let curTime = 0
  //     state.updatingTargetGameID = gameID
  //     console.log(`store base : startUpdateMyGames -> gameID:${gameID} (T:${time} I:${intervalMS})`)
  //     const startUpdateMyGamesID = setInterval(() => {
  //         axios.get(url_MyGames).then((res) => {
  //             if (res.data.code === 0) {
  //                 const myGames = []
  //                 res.data.data.forEach(resDataMyGame => {
  //                     const myGame = {
  //                         id: resDataMyGame.id,
  //                         playerName: resDataMyGame.playerName,
  //                         organizations: []
  //                     }
  //                     if (myGame.id === state.updatingTargetGameID) {
  //                         state.updatingTargetGameID = undefined
  //                         clearInterval(startUpdateMyGamesID)
  //                     }
  //                     resDataMyGame.organizations.forEach(organization => {
  //                         if (organization.type === 1) {
  //                             myGame.organization = organization
  //                         } else {
  //                             myGame.organizations.push(organization)
  //                         }
  //                     })
  //                     myGames.push(myGame)
  //                 })
  //                 state.myGames = myGames
  //             }
  //         })
  //         curTime = curTime + 1
  //         if (curTime >= time) {
  //             state.updatingTargetGameID = undefined
  //             clearInterval(startUpdateMyGamesID)
  //         }
  //     }, intervalMS)
  // },
  updateSysMsgs({ state }) {
    axios.get(url_SysMsgs).then(res => {
      if (res.data.code === 0) {
        const sysMsgs = [];
        res.data.data.forEach(sysMsg => {
          if (sysMsg.type === 3) {
            const content = JSON.parse(sysMsg.content)
            sysMsg.ops = content.ops
            sysMsg.content = content.content
          }
          sysMsgs.push(sysMsg)
        })
        state.sysMsgs = sysMsgs
      }
    })
  },
  startUpdateSysMsgs({ state }) {
    if (!startUpdateSysMsgsID) {
      startUpdateSysMsgsID = setInterval(() => {
        axios.get(url_SysMsgs).then(res => {
          if (res.data.code === 0) {
            const sysMsgs = [];
            res.data.data.forEach(sysMsg => {
              if (sysMsg.type === 3) {
                const content = JSON.parse(sysMsg.content)
                sysMsg.ops = content.ops
                sysMsg.content = content.content
              }
              sysMsgs.push(sysMsg)
            })
            state.sysMsgs = sysMsgs
          }
        })
      }, 5000)
    }
  },
  stopUpdateSysMsgs() {
    if (startUpdateSysMsgsID) {
      clearInterval(startUpdateSysMsgsID)
    }
  }
}

// mutations
const mutations = {
  token(state, token) {
    state.token = token
    if (state.token) {
    //   console.log(state.token)
    //   console.log("有token")
      localStorage.setItem('token', state.token)
      actions.updateMyInfo({ state })
      actions.updateMyGames({ state })
      // actions.startUpdateMyGames({ state })
      actions.updateSysMsgs({ state })
      actions.startUpdateSysMsgs({ state })
    } else {
    //   console.log("没有token")
      localStorage.removeItem('token')
      actions.stopUpdateSysMsgs({ state })
    }
  },
  noToken(state, token) {
    state.loginInfo = undefined
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
