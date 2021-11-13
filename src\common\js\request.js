import {
    Promise
} from "core-js";
// const baseUrl = "http://localhost:3030/api/" // 本地地址

const baseUrl="http://zlc.zhulif.com/api" // 线上地址

const axios = (url, method, data) => {
    let meth = method.toUpperCase() //请求头大写
    if (!data) {
        data = {}
    }



    let reqOpts = {
        url: baseUrl + url,
        data,
        method: meth,
        header: {
            'X-Requested-With': 'XMLHttpRequest',
            'content-type': meth == 'POST' ? 'application/x-www-form-urlencoded' : 'application/json',
        },
        dataType: 'json'
    }
    reqOpts.header['Authorization'] = (uni.getStorageSync('vipUserInfo') || {}).token || ''


    return new Promise((resolve, reject) => {
        uni.request(reqOpts).then(res => {
            console.log(res)
            if (res[1].data.code == 200) {
                resolve(res[1].data)
            } else {
                console.log(res)
                uni.showToast({
                    title: res[1].data.msg,
                    icon: 'none'
                })
            }
        }).catch(error => {
            console.log(error.code)
            uni.showToast({
                title: error,
                icon: 'error'
            })
            reject(error)
        })
    })
}

export default {
    baseUrl,
    axios
}
