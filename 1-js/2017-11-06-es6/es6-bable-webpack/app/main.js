import bar from './bar.js'
import foo from './foo.js'

function multi(x, y) {
	return x * y;
}

let oDiv = document.querySelector('#root');
const value = multi(bar, foo);

let strTpl = `${bar} 与 ${foo} 的乘积为 ${value}`

oDiv.innerText = strTpl;