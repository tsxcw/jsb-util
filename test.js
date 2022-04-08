const jsbUtil = require("./src/index.js")
window.jsbUtil = jsbUtil;

function log1() {
    console.log(1)
}


var ac = jsbUtil.throttle(log1, 1000);//因为此处用了闭包，所以先赋值给一个变量；

