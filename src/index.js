const memory = require('./lib/memory')
const cookie = require("./lib/cookie")
const util = require("./lib/util")
const formatXss = require("./lib/formatXss")
exports.isMobileOrMail = util.isMobileOrMail;
exports.isMobile = util.isMobile;
exports.isMail = util.isMail;
exports.memory = memory;
exports.cookie = cookie;
exports.debounce = util.debounce;
exports.throttle = util.throttle;
exports.copyText = util.copyText;
exports.formatXss = formatXss;
//将整个模块导出
module.exports.jsbUtil = {
    ...util, formatXss, memory, cookie
}
