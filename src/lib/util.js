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
/**
 * @description:防抖
 * @param fn 方法名|回调函数
 * @param wait 前后间隔时间间距
 * @returns {(function(): void)|*} 闭包方法
 */
const debounce = (fn, wait) => {
    let timer = null;
    return function () {
        if (timer !== null) {
            clearTimeout(timer);
        }
        timer = setTimeout(fn, wait);
    }
}
/**
 * @description:截流
 * @param fn 方法名｜回调函数
 * @param wait 每次调用间隔
 * @return {(function(): void)|*}
 */
const throttle = (fn, wait) => {
    let timer = true;
    return function () {
        if (!timer) return;
        timer = false;
        setTimeout(function () {
            fn.apply(this, arguments)
            timer = true;
        }, wait)
    }
}
/**
 * @description:复制字符串到粘贴板
 * @param text 复制的字符串
 * @return {void} void
 */
const copyText = async (text) => {
    try {
        await navigator.clipboard.writeText(text)
    } catch (e) {
        let input = document.createElement("textarea");
        document.body.appendChild(input)
        input.value = text
        input.select()
        document.execCommand("COPY");
        input.remove();
    }
    return Promise.resolve(true);
}
module.exports = {
    debounce, isMobileOrMail, isMail, isMobile, throttle, copyText
}
