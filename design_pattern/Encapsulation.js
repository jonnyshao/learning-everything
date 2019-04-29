//数据类型的封装
var o = (function () {
    var _name = 'sven';//私有变量private
    return {
        getName: function () {
            return _name;//public 公有
            的变量
        }
    }
})()
// console.log(o.getName());
function Person(name) {
    this.name = name;
}
Person.prototype.showName = function () {
    return this.name;
}

var objFactory = function () {
    // debugger;
    var obj = new Object(),   //从Object.prototype原型上克隆一个对象
        Constructor = [].shift.call(arguments);   //取得外部传入的构造器，此处是Person
    obj.__proto__ = Constructor.prototype; // 指向正确的原型
    var res = Constructor.apply(obj, arguments);   //使用外部传入的构造器给obj设置属性
    return typeof res === 'object' ? res : obj;  //确保构造器总会返回一个对象

}
/* let a = objFactory(Person, 'seven','ryan')
console.log(Object.getPrototypeOf(a)===Person.prototype)
console.log(a.name)
console.log(a.showName()) */

var A = function () { }; 
A.prototype = { name: 'sven' };
var B = function () { }; 
B.prototype = new A();
var b = new B();
console.log(b.__proto__.__proto__===A.prototype)
console.log(b.__proto__.__proto__.name);

document.getElementById=(function(fun){
    return function () {
        return fun.apply(document,arguments);
    }
})(document.getElementById)
