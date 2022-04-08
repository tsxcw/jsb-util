# jsbUtil 一个JavaScript综合工具类

#### 包含了日常使用的一些javascript的相关快捷内容处理函数

安装方法 `npm install jsbUtil`

使用方式

```javascript
//全部引入
import jsbUtil from "jsb-util"

//单独使用方式
import {isMobile,memory} from "jsb-util"
isMobile("1300000000")

//验证手机号是否符合规范
jsbUtil.isMobile("13000000000")

//验证邮箱是否正确
jsbUtil.isMail("mail@mail.com")

//验证字符串账号属于邮箱还是手机号
jsbUtil.isMobileOrMail("13000000000")

//localStorage管理
jsbUtil.memory.set("ccUtil", {a: 1})//获取ccUtil
jsbUtil.memory.get("ccUtil")//获取ccUtil {a:1} 不支持后面继续链式调用
jsbUtil.memory.del("ccUtil")//删除
jsbUtil.memory.clear()//清空所有
jsbUtil.memory.set("ccUtil", {a: 1}).del("ccUtil").clear().get("ccUtil")

//基本的富文本xss过滤 特殊条件请看方法第二第三形参
jsbUtil.formatXss("<p onclick='alert(1)'>text</p>")//<p>text</p>


```
