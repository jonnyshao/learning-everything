let o = {
    name: 'ficoding'
}
function fn(age,sex) {
    // console.log(this)
    // console.log(this.name + age + sex)
}
/* 
1.bind 方法可以绑定this指向
2.bind方法返回一个绑定后的函数(高阶函数)
*/
// Function.prototype.bind = function (context) {
//     let that = this;
//     let args = [].slice.call(arguments, 1);
//     return function () {
//         console.log(args.concat([].slice.call(arguments)))
//         return that.apply(context, args.concat([].slice.call(arguments)))
//     }
// }
// let bindFn = fn.bind(o, '9岁');
// bindFn('是只公猫')

// 如果当成类来调用，通过new关键词来调用 当前的函数的this就是当前的实例
// Function.prototype.bind = function (context) {
//     let that = this;
//     let args = [].slice.call(arguments, 1);
//     function Fn() {}
//     function fn() { // this
//         return that.apply(this instanceof fn ? this :context, args.concat([].slice.call(arguments)))
//     }
//     Fn.prototype = this.prototype
//     fn.prototype = new Fn()
//     return fn
// }
fn.property = 'property'
fn.prototype.flag = '哺乳类'
let bindFn = fn.bind(o, '9岁');
let instance = new bindFn('是只公猫')
console.log(instance.property)