> 参考链接：[十道题](https://zhuanlan.zhihu.com/p/30797777);[ js事件循环 microtask macrotask](http://blog.csdn.net/sjn0503/article/details/76087631)

## 题目

### 题目一
```js
const promise = new Promise((resolve, reject) => {
  console.log(1)
  resolve()
  console.log(2)
})
promise.then(() => {
  console.log(3)
})
console.log(4)
```
解释：Promise 构造函数是同步执行的，promise.then 中的函数是异步执行的。

### 题目二
    
    const promise1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('success')
      }, 1000)
    })
    const promise2 = promise1.then(() => {
      throw new Error('error!!!')
    })
    
    console.log('promise1', promise1)
    console.log('promise2', promise2)
    
    setTimeout(() => {
      console.log('promise1', promise1)
      console.log('promise2', promise2)
    }, 2000)
    
    运行结果：
    
    promise1 Promise { <pending> }
    promise2 Promise { <pending> }
    (node:50928) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): Error: error!!!
    (node:50928) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
    promise1 Promise { 'success' }
    promise2 Promise {
      <rejected> Error: error!!!
        at promise.then (...)

解释：promise 有 3 种状态：pending、fulfilled 或 rejected。状态改变只能是 pending->fulfilled 或者 pending->rejected，状态一旦改变则不能再变。上面 promise2 并不是 promise1，而是返回的一个新的 Promise 实例。

### 题目三
```
const promise = new Promise((resolve, reject) => {
  resolve('success1')
  reject('error')
  resolve('success2')
})

promise
  .then((res) => {
    console.log('then: ', res)
  })
  .catch((err) => {
    console.log('catch: ', err)
  })
```
运行结果：`then: success1`

解释：构造函数中的 resolve 或 reject 只有第一次执行有效，多次调用没有任何作用，呼应代码二结论：promise 状态一旦改变则不能再变。

### 题目四
```js
Promise.resolve(1)
  .then((res) => {
    console.log(res)
    return 2
  })
  .catch((err) => {
    return 3
  })
  .then((res) => {
    console.log(res)
  })

```
解释：promise 可以链式调用。提起链式调用我们通常会想到通过 return this 实现，不过 Promise 并不是这样实现的。promise 每次调用 .then 或者 .catch 都会返回一个新的 promise，从而实现了链式调用。

### 题目五
```js

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('once')
    resolve('success')
  }, 1000)
})

const start = Date.now()
promise.then((res) => {
  console.log(res, Date.now() - start)
})
promise.then((res) => {
  console.log(res, Date.now() - start)
})

// 运行结果：
once
success 1005
success 1007
```
解释：promise 的 .then 或者 .catch 可以被调用多次，但这里 Promise 构造函数只执行一次。或者说 promise 内部状态一经改变，并且有了一个值，那么后续每次调用 .then 或者 .catch 都会直接拿到该值。

### 题目六
```
Promise.resolve()
  .then(() => {
    return new Error('error!!!')
  })
  .then((res) => {
    console.log('then: ', res)
  })
  .catch((err) => {
    console.log('catch: ', err)
  })
  
// 运行结果：

then: Error: error!!!
    at Promise.resolve.then (...)
    at ...
    
```
解释：.then 或者 .catch 中 return 一个 error 对象并不会抛出错误，所以不会被后续的 .catch 捕获，需要改成其中一种：

return Promise.reject(new Error('error!!!'))
throw new Error('error!!!')
因为返回任意一个非 promise 的值都会被包裹成 promise 对象，即 return new Error('error!!!') 等价于 return Promise.resolve(new Error('error!!!'))。

### 题目七
    
    const promise = Promise.resolve()
      .then(() => {
        return promise
      })
    promise.catch(console.error)
    
    // 运行结果：
    TypeError: Chaining cycle detected for promise #<Promise>
        at <anonymous>
        at process._tickCallback (internal/process/next_tick.js:188:7)
        at Function.Module.runMain (module.js:667:11)
        at startup (bootstrap_node.js:187:16)
        at bootstrap_node.js:607:3
      
解释：.then 或 .catch 返回的值不能是 promise 本身，否则会造成死循环。类似于：

    process.nextTick(function tick () {
      console.log('tick')
      process.nextTick(tick)
    })
### 题目八

    Promise.resolve(1)
      .then(2)
      .then(Promise.resolve(3))
      .then(console.log)
    运行结果：
    
    1
解释：.then 或者 .catch 的参数期望是函数，传入非函数则会发生值穿透。

### 题目九

    Promise.resolve()
      .then(function success (res) {
        throw new Error('error')
      }, function fail1 (e) {
        console.error('fail1: ', e)
      })
      .catch(function fail2 (e) {
        console.error('fail2: ', e)
      })
    运行结果：
    
    fail2: Error: error
        at success (...)
        at ...
解释：.then 可以接收两个参数，第一个是处理成功的函数，第二个是处理错误的函数。.catch 是 .then 第二个参数的简便写法，但是它们用法上有一点需要注意：**.then 的第二个处理错误的函数捕获不了第一个处理成功的函数抛出的错误**，而后续的 .catch 可以捕获之前的错误。当然以下代码也可以：
    
    Promise.resolve()
      .then(function success1 (res) {
        throw new Error('error')
      }, function fail1 (e) {
        console.error('fail1: ', e)
      })
      .then(function success2 (res) {
      }, function fail2 (e) {
        console.error('fail2: ', e)
      })
### 题目十

    process.nextTick(() => {
      console.log('nextTick')
    })
    Promise.resolve()
      .then(() => {
        console.log('then')
      })
    setImmediate(() => {
      console.log('setImmediate')
    })
    console.log('end')
    运行结果：
    
    end
    nextTick
    then
    setImmediate
    
解释：process.nextTick 和 promise.then 都属于 microtask，而 setImmediate 属于 macrotask，在事件循环的 check 阶段执行。事件循环的每个阶段（macrotask）之间都会执行 microtask，事件循环的开始会先执行一次 microtask。

## js事件循环的 microtask 与 macrotask

    console.log('start')
    
    const interval = setInterval(() => {  
     console.log('setInterval')
    }, 0)
    
    setTimeout(() => {  
     console.log('setTimeout 1')
     Promise.resolve()
         .then(() => {
           console.log('promise 3')
         })
         .then(() => {
           console.log('promise 4')
         })
         .then(() => {
           setTimeout(() => {
             console.log('setTimeout 2')
             Promise.resolve()
                 .then(() => {
                   console.log('promise 5')
                 })
                 .then(() => {
                   console.log('promise 6')
                 })
                 .then(() => {
                   clearInterval(interval)
                 })
           }, 0)
         })
    }, 0)
    
    Promise.resolve()
       .then(() => {  
           console.log('promise 1')
       })
       .then(() => {
           console.log('promise 2')
       }) 
       
    
1. 同步任务：

    在主线程上排队执行的任务，前一个任务执行完毕，才能执行后一个任务；

2. 异步任务：

    不进入主线程、而进入”任务队列”（task queue）的任务，只有”任务队列”通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

3. JavaScript的运行机制       
    只要主线程空了，就会去读取”任务队列”
    
### Microtasks Macrotasks

任务队列不止一个，还有 microtasks 和 macrotasks

#### Microtasks
- process.nextTick
- promise
- Object.observe
- MutationObserver

#### Macrotasks
- setTimeout
- setInterval
- setImmediate
- I/O
- UI渲染、

### 执行原理
事件循环的顺序，决定了JavaScript代码的执行顺序。它从script(整体代码)开始第一次循环。之后全局上下文进入函数调用栈。直到调用栈清空(只剩全局)，然后执行所有的micro-task。当所有可执行的micro-task执行完毕之后。循环再次从macro-task开始，找到其中一个任务队列执行完毕，然后再执行所有的micro-task，这样一直循环下去。

本题目中，
1. 先执行同步任务，输出 `start`
2. 执行所有的 micro-tast 依次输出 `promise 1 ； promise 2`
3. 执行 macro-task `setInterval`
4. 这个 macro-task 执行结束后，看看有无 macro-task，如有则执行，没有则进入下一个 macro-task
    - `setTimeout 1`
    - `promise 3`
    - `promise 4`
5. 再进入下一个 macro-task ，按照以上原则
    - `setInterval`  
    - `setTimeout 2`
    - `promise 5`
    - `promise 6`


    