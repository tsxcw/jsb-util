/**
 * @description:localStorage储存管理
 * @returns {Memory}
 */
class Memory {
    Local = null;

    constructor() {
        this.Local = localStorage || window.localStorage;
    }

    /**
     * @description: 设置本地localStorage储存
     * @param {*} key 键
     * @param {Object|String} value 值
     * @return {Memory} Memory 可实现链式连续调用
     */
    set(key, value) {
        if (typeof value == "object") {
            value = JSON.stringify(value);
        }
        this.Local.setItem(key, value);
        return this;
    }

    /**
     * @description: 获取键
     * @param {*} key
     * @return {Object|String} value 返回值
     */
    get(key) {
        let info = this.Local.getItem(key);
        if (info === "" || !info) {
            return "";
        }
        return this.isObj(info);
    }

    /**
     * @description: 判断字符串是不是json对象
     * @param {*} str
     * @return {*}
     */
    isObj(str) {
        if (typeof str == "string") {
            try {
                let obj = JSON.parse(str);
                if (typeof obj == "object" && obj) {
                    return obj;
                } else {
                    return str;
                }
            } catch (e) {
                return str;
            }
        }
    }

    /**
     * @description: 删除本地localStorage储存key
     * @param {*} key
     * @return {Memory} boolean
     */
    del(key) {
        this.Local.removeItem(key);
        return this; //返回自身，可以实现链式调用Memory().del(key).del(key).set(key,value);
    }

    /**
     * @description: 清除全部本地localStorage储存
     * @return {Memory} boolean
     */
    clear() {
        this.Local.clear();
        return this;
    }
}

module.exports = new Memory();
