// call的特点
// 改变我们当前函数的this指向
// 我们函数立即执行

Function.prototype.call = function (context) {
    context  = Object(context)
    context.fn = this;
    let args = [];
    for (let i = 1; i < arguments.length; i++){
        args.push('arguments['+ i + ']')
    }
    console.log(args)
    // 利用数组的toString的特性
    let r = eval('context.fn(' + args +')');
    // let r = context.fn(args + '');
    delete context.fn;
    return r
}
function fn1() {
    console.log(this, arguments)
}
function fn2(n,n1,n2) {
    console.log(n, n1, n2)
}
fn1.call.call(fn2,1,2,3)
// 如果多个call 会让call方法执行 并且把call中this改变