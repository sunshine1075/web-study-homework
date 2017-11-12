本节课学习数据交互

作业：
1. 读 http://www.ietf.org/rfc/rfc2016.txt
2. 理解状态码 - 20 个
3. 预习了解ajax2.0
4. 了解 RESTful

---
课程大纲：
1. http协议问题： 原理
2. form
3. Ajax ———— 官方提供，不能跨域
    - 不能跨域原因：有 xss - 跨站脚本攻击
4. JSONP ———— 民间，可跨域 ，不建议（破坏了 http 协议自身的安全性设计
5. websocket ———— html5 新出，好处：双工

--- 

## http
双方规定好的约定。

### 特点
1. 无状态
2. 连接过程：三次握手（发送连接-服务器接受-客户端再发送真正请求）
3. 消息分两块：头，体

### 头
 按行来分
- （1） 方法 版本  url        `GET  1.1   /a.html?xxx`

### http 缓存
1. 野路子： 随机数
2. 官方：三个头里面的参数

### http 与 https 
https：基于非对称加密。别人无法看到你的通信过程。比 http 多一个安全加密。
    - 需要一个证书。  

## 上传数据

### form
1. action —— 提交到什么地方
2. method 
    - GET   把数据放在 url 里传输  目的：取东西
    - POST   数据量大               目的：发送东西
    - DELETE        目的：删除东西
    - HEAD          目的: 让服务器只发送头回来就行（不需要回应）
    
3. name 名字
4. enctype      编码方式、类型
    - application/x-www-form-urlencoded   最常见/默认值，key1=value1&key2=value2；……………………………… 只能发送小数据不能发送大数据。
    - multipart/form-data       分块          上传文件用   ……………………………… 适合大数据
    - text/plain    纯文本   （少用）

### ajax
优点：用户体验好，性能高

#### `readystate` 
- 0 初始状态    ………………………………………… 刚创建完 xhr 对象
- 1 连接       ………………………………………… 连接到服务器 open 结束
- 2 发送请求    ………………………………………… 刚刚 send 完
- 3 接收完成    ………………………………………… 响应头接收完了
- 4 接收完成    ………………………………………… 响应体接收完了

#### `status` 状态码
- 1xx   代表消息
- 2xx   代表成功
- 3xx   重定向
    - 301   永久重定向  moved permanently
    - 302   临时重定向   move temporarily
    - 304   缓存      not modified
- 4xx   请求错误
- 5xx   服务端错误
    - 500   服务器内部错误
    - 503   服务不可用   
- 6xx   自定义    

#### 接收响应数据  
- xhr.response
- xhr.responseText  常用。 以文本方式返回数据
    - 解析方法1：   eval  `eval('(' + xhr.responseText + ')')`  较原始的方式，不常用了。
    - 解析方法2：   最新在用的 `JSON.parse(xhr.responseText)` 
        - JSON.parse()      将 字符串变回 json
        - JSON.stringify()  将 JSON 转化成字符串
- xhr.responseURL   常用。 以 xml 数据返回数据
- xhr.responseXML

```js
// 1. 创建对象
let xhr = new XMLHttpRequest();

// 2. 连接  异步-好，不阻塞(默认为异步：true)
xhr.open('GET', 'data/1.json', true)

// 3. 发送  发送的 body 数据。请求方法为 GET 时，可以不发送
xhr.send();

// 4. 接收
xhr.onreadystatechange = function() {
    if(xhr.readyState === 4) {
        if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
            console.log('success');
            var data;
            try{
                data = JSON.parse(xhr.responseText);  
            } catch(e) {
                data = eval('(' + xhr.responseText + ')');
            }
            console.log(data);
        } else {
            console.log('failed')
        }
    }
}
```
