import axios from "axios";
import QS from 'qs';

const baseURL = '/api'
// 环境的切换
if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = baseURL
} else if (process.env.NODE_ENV == 'debug') {
    axios.defaults.baseURL = baseURL
} else if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = baseURL
}

//设置请求超时时间
axios.defaults.timeout = 30000;

//给post设置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

//请求拦截器：校验用户token是否有效
axios.interceptors.request.use((config) => {
    if (uni.getStorageSync('vipUserInfo')) {
        let userInfo = uni.getStorageSync('vipUserInfo')
        config.headers['Authorization'] = userInfo.token
    }
    return config
})

//响应拦截器：校验用户token是否有效
axios.interceptors.response.use((success) => {
    if (success.status && success.status == 200) {
        if (success.data.code == 500 || success.data.code == 401 || success.data.code == 403) {
            uni.showToast({
                title: success.data.msg,
                icon: 'none'
            })
            return;
        }
    }
    return success
}, (error) => {
    if (error.response.status == 500 || error.response.status == 504 || error.response.status == 404) {
        uni.showToast({
            title: error.response.data.message,
            icon: 'none'
        })
    } else if (error.response.status == 401) {
        uni.navigateTo({
            url: '/pages/vipLogin/vipLogin'
        })
    } else {
        if (error.response.data) {
            uni.showToast({
                title: error.response.data,
                icon: 'none'
            })
        } else {
            uni.showToast({
                title: '未知错误！',
                icon: 'none'
            })
        }
    }
    return;
})

export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params || {}
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    })
}

export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params || {}))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}
