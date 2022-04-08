const jsbUtil = require("./src/index.js")
window.jsbUtil = jsbUtil;

function log1() {
    console.log(1)
}


var ac = jsbUtil.debounce(log1, 1000)
console.log(1)