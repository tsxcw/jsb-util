const memory = require('./lib/memory')
const formatXss = require("./lib/formatXss")
const cookie = require("./lib/cookie")
/**
 * @description:验证是否为手机账号
 * @param {string} Mobile 手机账号
 * @return {Boolean} Boolean
 */
const isMobile = (Mobile = "") => {
    return /^1[3456789]\d{9}$/.test(Mobile);
}

/**
 * @description:验证是否为邮箱
 * @param {string} Mail 邮箱账号
 * @return {Boolean} Boolean
 */
const isMail = (Mail = "") => {
    return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(Mail)
}

/**
 * @description:验证一段字符串是邮箱还是手机号码
 * @param {string} account 字符串
 * @return {String|Boolean} mail / mobile / false
 */
const isMobileOrMail = (account) => {
    if (isMail(account)) {
        return "mail"
    }
    if (isMobile(account)) {
        return "mobile"
    }
    return false;
}

const debounce = (fn, wait) => {
    var timer = null;
    return function () {
        if (timer !== null) {
            clearTimeout(timer);
        }
        timer = setTimeout(fn, wait);
    }
}
exports.isMobileOrMail = isMobileOrMail;
exports.isMobile = isMobile;
exports.isMail = isMail;
exports.memory = memory;
exports.formatXss = formatXss;
exports.cookie = cookie;
exports.debounce = debounce;
//将整个模块导出
module.exports.jsbUtil = {
    isMail,
    isMobile,
    isMobileOrMail,
    formatXss,
    memory,
    cookie,
    debounce
}
