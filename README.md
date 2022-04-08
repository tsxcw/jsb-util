# jsbUtil 一个JavaScript综合工具类

#### 包含了日常使用的一些javascript的相关快捷内容处理函数

安装方法 `npm install jsb-util`

使用方式

```javascript
//全部引入
import jsbUtil from "jsb-util"

//单独使用方式
import {isMobile, memory} from "jsb-util"

isMobile("1300000000")

//验证手机号是否符合规范
jsbUtil.isMobile("13000000000")

//验证邮箱是否正确
jsbUtil.isMail("mail@mail.com")

//验证字符串账号属于邮箱还是手机号
jsbUtil.isMobileOrMail("13000000000")

//localStorage管理
jsbUtil.memory.set("ccUtil", {a: 1})//设置ccUtil
jsbUtil.memory.get("ccUtil")//获取ccUtil {a:1} 不支持后面继续链式调用
jsbUtil.memory.del("ccUtil")//删除指定key
jsbUtil.memory.clear()//清空当前站点所有
jsbUtil.memory.set("ccUtil", {a: 1}).del("ccUtil").clear().get("ccUtil")

//cookie基本管理
jsbUtil.cookie.get("ccUtil");//获取key的内容
jsbUtil.cookie.set("ccUtil", '1234', new Date());//第三参数为过期时间，默认会话有效期
jsbUtil.cookie.del("ccUtil");//删除指定key
jsbUtil.cookie.clear();//清空当前站点cookie

//基本的富文本xss过滤 特殊条件请看方法第二第三形参
jsbUtil.formatXss("<p onclick='alert(1)'>text</p>")//<p>text</p>


```

* 小提示：如果不明确使用方式可进入 **node_modules/jsb-util/src/index.js** 查看方法注释