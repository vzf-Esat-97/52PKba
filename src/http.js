import axios from 'axios';

export function fetch (url, params = {}) {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('pkToken')
        if (token) {
            axios.get(url, {
                params: params,
                headers: {
                    'Authorization': token
                }
            }).then(response => {
                resolve(response.data);
            }).catch(err => {
                reject(err)
            })
        } else {
            axios.get(url, {
                params: params,
            }).then(response => {
                resolve(response.data);
            }).catch(err => {
                reject(err)
            })
        }
    })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post (url, data = {}) {
    // console.log(url, data)
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('pkToken')
        if (token) {
            axios.post(url, data, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            }).then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
        } else {
            console.log(12313231)
            axios.post(url, data, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
        }
    })
}



/**
 * 封装post上传文件请求
 * @param url
 * @param formdata
 * @returns {Promise}
 */
export function upload (url, formdata = {}) {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token')
        console.log(token)
        if (token) {
            axios.post(url, formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': token
                }
            }).then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
        } else {
            reject('upload need token')
        }
    })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch (url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put (url, data = {}) {
    const token = localStorage.getItem('token')
    return new Promise((resolve, reject) => {
        axios.put(url, data, {
            headers: {
                'Authorization': token
            }
        }).then(response => {
            resolve(response.data);
        }, err => {
            reject(err)
        })
    })
}


/**
 * 封装delete方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function Delete (url, data = {}) {
    const token = localStorage.getItem('pkToken')
    return new Promise((resolve, reject) => {
        axios({
            method: 'delete',
            url: url,
            headers: {
                'Authorization': token,
            }
        }).then(response => {
            resolve(response.data);
        }, err => {
            reject(err)
        })
    })
}

// 获取商品列表
export function getShoppinglist (nowpage) {
    const url = `/api/Commodity?pageIndex=${nowpage}&pageRows=8`
    return new Promise((resolve, reject) => {
        axios.get(url, {}).then(response => {
            resolve(response.data);
            console.log(response)
            console.log(response.data)
        }).catch(err => {
            reject(err)
        })
    })
}
// 商城确认购买商品
export function goShoppping (Data) {
    const url = `/api/CommodityOrder`
    return new Promise((resolve, reject) => {
        axios.post(url, Data, {
            headers: {
                "Authorization": localStorage.getItem('pkToken'),
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json',
            }
        }).then(response => {
            resolve(response)
        }).catch(err => {
            reject(err)
        })
    })
}
// 商城兑换获取验证码
export function getCode (phonenum) {
    const url = `/api/Sys/RequestSMSSendVerifyCode?phone=${phonenum}`
    return new Promise((resolve, reject) => {
        axios.get(url, {}).then(response => {
            resolve(response)
        }).catch(err => {
            reject(err)
        })
    })
}

// 商城获取个人信息
export function getMyinfo () {
    const url = `/api/User/MyDetail`
    return new Promise((resolve, reject) => {
        axios.get(url, {
            headers: {
                "Authorization": localStorage.getItem('pkToken')
            }
        }).then(response => {
            resolve(response)
        }).catch(err => {
            reject(err)
        })
    })
}

// 获取我的订单列表
export function getMyCommodityOrders (nowpage) {
    const url = `/api/CommodityOrder/MyCommodityOrders?pageIndex=${nowpage}&pageRows=10`
    return new Promise((resolve, reject) => {
        axios.get(url, {}).then(response => {
            resolve(response.data);
            console.log(response)
            console.log(response.data)
        }).catch(err => {
            reject(err)
        })
    })
}

// 获取自己的导航菜单
export function GetMyNavigation () {
    const url = `/api/User/Navigations`
    return new Promise((resolve, reject) => {
        axios.get(url, {
            headers: {
                "Authorization": localStorage.getItem('pkToken'),
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json',
            }
        }).then(response => {
            resolve(response.data);
            console.log(response)
            console.log(response.data)
        }).catch(err => {
            reject(err)
        })
    })
}

// 充值接口
export function recharge (type, amount, returnUrl) {
    const url = `/api/RechargeOrder/GetAlipayPayPage?type=${type}&amount=${amount}&returnUrl=${returnUrl}`
    return new Promise((resolve, reject) => {
        axios.get(url, {}).then(response => {
            resolve(response.data);
            console.log(response)
            console.log(response.data)
        }).catch(err => {
            reject(err)
        })
    })
}

// 订单状态查询
export function GetOrderNumber (ordernumber) {
    const url = `/api/RechargeOrder/GetState?num=${ordernumber}`
    return new Promise((resolve,reject) => {
        axios.get(url).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
