let duck = {
	duckSinging: function () {
		console.log('嘎嘎')
	}
}
let chicken = {
	duckSinging: function () {
		console.log('嘎嘎')
	}
}
let choir = [];
function joinChoir(animal) {
	if (animal && typeof animal.duckSinging === 'function') {
		choir.push(animal)
		console.log('恭喜加入合唱团')
		console.log('合唱团已有成员数量：' + choir.length);
	}
}
joinChoir(duck);
joinChoir(chicken);

/* 
	多态
	思想：谁去做，做什么以及怎么做，把不变的事情和可能发生改变的事情分离出来
*/
function makeSound(animal) {
	if (animal instanceof Duck) {
		console.log('嘎嘎')
	}
	if (animal instanceof Chicken) {
		console.log('咯咯')
	}
}
function Duck() { };
function Chicken() { };
makeSound(new Duck)
makeSound(new Chicken)
/* 
	上面的代码每个动物的叫声是不变的，可以抽离成一个方法
	下面代码每增加一个动物都需要手动修改makeSonud方法，修改代码总是危险的，如果有N个动物，就需要手动修改N次makeSound方法
*/
function makeSound(animal) {
	console.log(animal)
	animal.sound()
}
function Duck() { };
Duck.prototype.sound = function () {
	console.log('嘎嘎嘎')
}
function Chicken() { };
Chicken.prototype.sound = function () {
	console.log('咯咯咯')
}
function Dog() { }
Dog.prototype.sound = function () {
	console.log('汪汪')
}
makeSound(new Duck)
makeSound(new Chicken)
makeSound(new Dog)
//百度地图 google地图示例
let baiduMap = {
	show: function () {
		console.log('渲染百度地图')
	}
}
function renderMap() {
	baiduMap.show()
}
renderMap()
//第一次改良

let baiduMap = {
	show: function () {
		console.log('渲染百度地图')
	}
}
let googleMap = {
	show: function () {
		console.log('渲染googel地图')
	}
}
function renderMap(type) {
	if (type === 'google') {
		googleMap.show()
	}
	if (type === 'baidu') {
		baiduMap.show()
	}
}
renderMap('baidu');
renderMap('google')
// 第二次改良
let baiduMap = {
	show: function () {
		console.log('渲染百度地图')
	}
}
let googleMap = {
	show: function () {
		console.log('渲染googel地图')
	}
}
let sosoMap = {
	show: function () {
		console.log('渲染soso地图')
	}
}
function renderMap(map) {
	if (map.show instanceof Function) {
		map.show()
	}
}
renderMap(googleMap);
renderMap(baiduMap);
renderMap(sosoMap);
