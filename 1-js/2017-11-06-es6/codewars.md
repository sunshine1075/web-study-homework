1. 查找最小字符串长度

```js
function findShort(s){
    let arrtemp = s.split(' ');
    let flag = 100;
    arrtemp.forEach(function(e,i){
        let num = e.length;
        flag = num <= flag ? num : flag;
    })
    console.log(flag)
    return flag;
}

```

2. 
