# 模块化
原则：高内聚，低耦合

## 模块化写法探索
### 1. 原始写法
将功能实现类函数方法单独文件夹内

缺点： 易发生变量命名冲突，容易污染全局变量，模块成员间无太多必然联系

### 2. 添加命名空间
使用单全局变量模块
```js
var my_module = {
    _index: 0,
    a1: function() {
      
    },
    a2: function() {
      
    }
    ...
}
```
缺点：私有属性还是向外暴露了

### 3. 立即执行函数
```js
var my_module = (function() {
    var index = 0;
    var a1 = function() {
      // 调用 _a2
    };
    var _a2 = function() {
      
    };
    return {
        a: a1;
    }
})()

my_module.index;    // undefined
my_module.a();  // 3   
```

优点：既避免了命名冲突，又能不让私有变量被外部访问

## 模块化规范
### CommonJS
#### 实现代表
实现代表： Node.js

#### 特点
1. 所有模块都有单独作用域，不会污染全局变量
2. 重复加载模块只加载第一次，后面都从缓存读取
3. 模块加载的顺序按照代码中出现的顺序
4. 模块加载是同步的（因此适合服务端而不适合浏览器）

### AMD 与 CMD

1. AMD代表：RequireJS  => RequireJS 库能把 AMD 规范应用到实际浏览器 Web 端的开发中。    
   - 实现 JavaScript 文件的异步加载，避免网页失去响应
   - 管理模块之间的依赖性，便于代码的编写与维护
   - [AMD 规范](https://github.com/amdjs/amdjs-api/wiki/AMD)

2. CMD 
    - 代表： [Seajs](https://github.com/seajs/seajs)
    - [CMD规范](https://github.com/seajs/seajs/issues/242)

#### AMD 与 CMD 的比较
**相同**
目的都是为了 JavaScript 的模块化开发，特别是在浏览器端的。
   目前这些规范的实现都能达成浏览器端模块化开发的目的。

**不同**

[参考](https://www.zhihu.com/question/20351507/answer/14859415)

1. 对于依赖的模块，AMD 是提前执行，CMD 是延迟执行。不过 RequireJS 从 2.0 开始，也改成可以延迟执行（根据写法不同，处理方式不同）。
2. CMD 推崇 as lazy as possible.2. CMD 推崇依赖就近，AMD 推崇依赖前置。看代码：

CMD 推崇依赖就近

```js
define(function(require, exports, module) {   
    var a = require('./a')   
    a.doSomething()   
    // 此处略去 100 行   
    var b = require('./b') // 依赖可以就近书写   
    b.doSomething()   // ... 
})
```


AMD 默认推荐的是依赖前置

```js
define(['./a', './b'], function(a, b) {  
   // 依赖必须一开始就写好    
   a.doSomething()    
   // 此处略去 100 行    
   b.doSomething()   
    ...
}) 
``` 

虽然 AMD 也支持 CMD 的写法，同时还支持将 require 作为依赖项传递，但 RequireJS 的作者默认是最喜欢上面的写法，也是官方文档里默认的模块定义写法。

3. AMD 的 API 默认是一个当多个用，CMD 的 API 严格区分，推崇职责单一。

比如 AMD 里，require 分全局 require 和局部 require，都叫 require。

CMD 里，没有全局 require，而是根据模块系统的完备性，提供 seajs.use 来实现模块系统的加载启动。CMD 里，每个 API 都简单纯粹。

#### RequireJS 和 Sea.js 的比较
**相同**
RequireJS 和 Sea.js 都是模块加载器，倡导模块化开发理念，核心价值是让 JavaScript 的模块化开发变得简单自然。

**不同**
1. 定位有差异。RequireJS 想成为浏览器端的模块加载器，同时也想成为 Rhino / Node 等环境的模块加载器。Sea.js 则专注于 Web 浏览器端，同时通过 Node 扩展的方式可以很方便跑在 Node 环境中。
2. 遵循的规范不同。RequireJS 遵循 AMD（异步模块定义）规范，Sea.js 遵循 CMD （通用模块定义）规范。规范的不同，导致了两者 API 不同。Sea.js 更贴近 CommonJS Modules/1.1 和 Node Modules 规范。
3. 推广理念有差异。RequireJS 在尝试让第三方类库修改自身来支持 RequireJS，目前只有少数社区采纳。Sea.js 不强推，采用自主封装的方式来“海纳百川”，目前已有较成熟的封装策略。
4. 对开发调试的支持有差异。Sea.js 非常关注代码的开发调试，有 nocache、debug 等用于调试的插件。RequireJS 无这方面的明显支持。
5. 插件机制不同。RequireJS 采取的是在源码中预留接口的形式，插件类型比较单一。Sea.js 采取的是通用事件机制，插件类型更丰富。


## ES6 模块支持
ECMAScript 原生模块化支持

优点：
1. 语法较 CommonJS 更简洁
2. 支持编译时加载（静态加载）
3. 更优秀的循环处理

两个命令： reuire 与 export/export default






