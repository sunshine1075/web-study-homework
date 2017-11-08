let {
	a,
	b
} = {
	a: 23,
	b: 15
};

function add(x, y = 0) {
	return x + y;
}

const barValue = add(a, b);

export default barValue;