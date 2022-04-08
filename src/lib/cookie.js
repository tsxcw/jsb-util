/**
 * @description:cookie基本管理
 */
function cookie() {
}

/**
 * @description:获取对应的key
 * @param {string} key key
 * @param {anys} value 没有找到时返回的预设值，默认false
 * @return {string|Boolean} string / false
 */
cookie.prototype.get = function (key, def = false) {
    let arr = document.cookie.split(";");
    for (let item of arr) {
        const el = item.split("=");
        if (el[0].trim() === key) {
            return el[1];
        }
    }
    return def;
}
/**
 * @description:设置对应的key value
 * @param {string} key key
 * @param {string} value value
 * @param {Date} expires 过期时间 Date对象
 * @return {Boolean} Boolean
 */
cookie.prototype.set = function (key, value, expires = "") {
    if (key.trim() == "") return false;
    document.cookie = `${key}=${value};expires=${expires}`;
}
/**
 * @description:删除对应的key
 * @param {string} key key
 * @return {void} void
 */
cookie.prototype.del = function (key) {
    document.cookie = `${key}=0; path=/; expires=${new Date(0).toUTCString()}`
}
/**
 * @description:清除本地所有cookie
 * @return {void} void
 */
cookie.prototype.clear = function () {
    let list = document.cookie.match(/[^ =;]+(?=\=)/g);
    for (let i = 0; i < list.length; i++) {
        this.del(list[i]);
    }
    document.cookie = `=0; path=/; expires=${new Date(0).toUTCString()}`
}

module.exports = new cookie()