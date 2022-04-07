const xss = require("xss");
/**
 * @description:xss过滤
 * @param {string} Html 富文本内容
 * @param {array} format 允许放行的html标签
 * @param {array} attr 允许放行的标签属性标签
 * @return {string} htmlString
 */
export const formatXss = (Html, format = [], attr = []) => {
    //允许通过的标签
    const tag = [
        "p",
        "a",
        "img",
        "font",
        "span",
        "b",
        "blockquote",
        "code",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "hr",
        "br",
        "s",
        "i",
        "u",
        "strike",
        "div",
        "strong",
        "pre"
    ];
    if (format.length > 0) {
        format.forEach(el => {
            tag.push(el);
        })
    }
    //允许使用的属性
    const can = ["color", "size", "style", "href", "src"];
    if (attr.length > 0) {
        attr.map(e => {
            can.push(e)
        })
    }
    let tmp = {};
    console.log(tmp, can)
    for (let index = 0; index < tag.length; index++) {
        const element = tag[index];
        tmp[element] = can;
    }
    return xss(Html, {
        whiteList: tmp,
    });
}

module.exports = formatXss
