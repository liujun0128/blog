/**
 * @Time: 2020/12/4 11:24 下午
 * @author: liu.q [916000612@qq.com]
 * @des:  ajax全局配置
 * */
const tokenKey = "wsk" // tokenKey
const usrKey = "userInfo" //用户信息key
const expired = 1000 * 60 * 30//过期时间30分钟
$.ajaxSetup({
    headers: {},
    beforeSend(XMLHttpRequest) {
        XMLHttpRequest.setRequestHeader(tokenKey, getSeesionToken())
    }
});

function getSeesionToken() {
    const obj = localStorage.getItem(tokenKey);
    if (obj == null) {
        return null
    }
    const {token, e, n} = JSON.parse(obj);
    const now = new Date().getTime()
    if (now - n > e) {
        localStorage.removeItem(tokenKey)
        localStorage.removeItem(usrKey)
        return null;
    }
    return token;
}

function setSeesionToken(token) {
    localStorage.setItem(tokenKey, JSON.stringify({
        token: token,
        e: expired,
        n: new Date().getTime()
    }))
}

function getUser() {
    const user = localStorage.getItem(usrKey);
    if (user == null) {
        return {}
    }
    return JSON.parse(user);
}

function setUser(uInfo) {
    return localStorage.setItem(usrKey, JSON.stringify(uInfo))
}

/**
 * @Time: 2020/11/19 4:59 下午
 * @author: liu.q [916000612@qq.com]
 * @des:  去除左右空格
 * */
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
/**
 * @Time: 2020/11/19 4:59 下午
 * @author: liu.q [916000612@qq.com]
 * @des:  去除左空格
 * */
String.prototype.ltrim = function () {
    return this.replace(/(^\s*)/g, "");
}
/**
 * @Time: 2020/11/19 4:59 下午
 * @author: liu.q [916000612@qq.com]
 * @des:  去除右空格
 * */
String.prototype.rtrim = function () {
    return this.replace(/(\s*$)/g, "");
}

/**
 * @Time: 2020/12/6 12:14 上午
 * @author: liu.q [916000612@qq.com]
 * @des:  
 * */
function formatDate(date, fmt) {
    try {
        if (!(date instanceof Date)) {
            try {
                date = date.replace(/-/g, "/")
                date = new Date(date)
            } catch (e) {
                return '-'
            }
        }
        if (fmt === undefined || fmt === '') {
            fmt = 'yyyy-MM-dd hh:mm:ss'
        }
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        const o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        }
        for (const k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                const str = o[k] + ''
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length))
            }
        }
        return fmt
    } catch (e) {
        console.log(e)
        return '-'
    }
}