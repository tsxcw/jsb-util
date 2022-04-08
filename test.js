const jsbUtil = require("./src/index")
jsbUtil.memory.set("1232", "21312")
const {isMobile} = require("./src/index")
console.log(isMobile("13000000000"));

import {isMail} from "./src/index";

console.log(isMail("admin@mcecy.com"));

console.log(jsbUtil.formatXss("<p onclick='alert(1)'>text</p>"));

jsbUtil.cookie.set("1212", "21213123123122")
console.log(jsbUtil.cookie.get("1212"))