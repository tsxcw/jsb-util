const jsbUtil = require("./src/index.js")

function log1() {
    console.log(1)
}


var ac = jsbUtil.debounce(log1, 1000)


