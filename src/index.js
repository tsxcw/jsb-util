const memory = require('./lib/memory')
const cookie = require("./lib/cookie")
const util = require("./lib/util")
const formatXss = require("./lib/formatXss")
exports.isMobileOrMail = util.isMobileOrMail;
exports.isMobile = util.isMobile;
exports.isMail = util.isMail;
exports.memory = memory;
exports.formatXss = formatXss;
exports.cookie = cookie;
exports.debounce = util.debounce;
exports.throttle = util.throttle
//将整个模块导出
module.exports.jsbUtil = {
    ...util, formatXss, memory, cookie
}
