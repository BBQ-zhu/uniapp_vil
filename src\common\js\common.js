//深克隆
const clone = (obj) => {
    let newObj = Array.isArray(obj) ? [] : {}
    if (obj && typeof obj === "object") {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                newObj[key] = (obj && typeof obj[key] === 'object') ? clone(obj[key]) : obj[key];
            }
        }
    }
    return newObj
}

//冒泡排序：arr为数组对象，name为对象中需要排序的属性
function bubbleSort (arr, name) {
    var len = arr.length;
    for (var i = 0; i < len - 1; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            if (parseInt(arr[j][name]) > parseInt(arr[j + 1][name])) { // 相邻元素两两对比
                var temp = arr[j + 1]; // 元素交换
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

//下载文件
const download = (src, filName) => {
    let x = new XMLHttpRequest();
    x.open("GET", src, true);
    x.responseType = "blob";
    x.onload = function (e) {
        let url = window.URL.createObjectURL(x.response)
        let a = document.createElement('a')
        a.href = url
        a.download = filName
        a.click()
    }
    x.send()
}

// 千位分隔符
const moneyFormat = (val, none = '') => {
    if (val === undefined || val === null || val === '') {
        return none
    } else {
        val = (val * 1).toFixed(2).toString()
        const reg = /(?=(\B\d{3})+$)/g
        if (val.indexOf('.') > -1) {
            const index = val.indexOf('.')
            const xiaoshu = val.slice(index, val.length)
            const zhengshu = val.slice(0, index)
            return zhengshu.replace(reg, ',') + xiaoshu
        } else {
            return val.replace(reg, ',')
        }
    }
}

//号码中位数隐藏
const phoneNum = (phone) => {
    let arr = phone
    return arr.slice(0, 3) + '****' + arr.slice(-4)
}

const agents = (arr) => {
    //我的代办
    let nowTime = new Date().toLocaleString().split(' ')[0]
    let arrTime = nowTime.split('/') //现在时间
    let agentsList = []
    arr.map(item => {
        let itemTime = item.endtime.split('-') //结束时间
        var now = getDistanceSpecifiedTime(item.endtime + ' 23:59:59')
        if (
            item.optertime == '年提示' &&
            now.data >= 0 &&
            now.data <= parseInt(item.tipstime)
        ) {
            //item.tipstime 15为提前15天提醒年缴费
            item['title'] =
                '您的' + item.type + '服务将于' + item.endtime + '到期，请及时处理!'
            item.data = now.data
            item.downtime = now.downtime
            agentsList.push(item)
        } else if (item.optertime == '月提示' && now.data >= 0) {
            var year = arrTime[0]
            var month = parseInt(arrTime[1])
            let monthData = year + '-' + month + '-' + itemTime[2]
            let mnow = getDistanceSpecifiedTime(monthData + ' 23:59:59')
            if (mnow.data <= parseInt(item.tipstime)) {
                item['title'] =
                    '您的-' +
                    item.type +
                    '-业务下次缴费时间为' +
                    monthData +
                    '前，请及时处理!'
                item.data = mnow.data
                item.downtime = mnow.downtime
                agentsList.push(item)
            }
        } else if (item.optertime == '不提示') { }
    })
    return agentsList
}

//获取某个时间距今的天数
const getDistanceSpecifiedTime = (dateTime) => {
    // 指定日期和时间
    var EndTime = new Date(dateTime)
    // 当前系统时间
    var NowTime = new Date()
    var t = EndTime.getTime() - NowTime.getTime()
    var d = Math.floor(t / 1000 / 60 / 60 / 24)
    return {
        data: d,
        downtime: t / 1000
    }
    // var d = Math.floor(t / 1000 / 60 / 60 / 24);
    // var h = Math.floor(t / 1000 / 60 / 60 % 24);
    // var m = Math.floor(t / 1000 / 60 % 60);
    // var s = Math.floor(t / 1000 % 60);
    // var html = d + " 天" + h + " 时" + m + " 分" + s + " 秒";
}

const gottkefu = () => { //客服系统跳转
    var a = document.createElement('a');
    a.setAttribute('href', 'tel:4001109939');
    document.body.appendChild(a);
    a.click();
    // var a = document.createElement("a");
    // a.setAttribute("href", "https://w101.ttkefu.com/k/linkurl/?t=3B1IJD5");
    // // a.setAttribute("target", "_blank");
    // a.click();
}

module.exports = {
    clone,
    download,
    moneyFormat,
    phoneNum,
    agents,
    gottkefu,
    bubbleSort
}
