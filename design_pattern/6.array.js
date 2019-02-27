// 数组常用的方法

// 将类数组转化成数组的方式
// 1.Array.from()
// 2.[...arguments] 如果是OBj，需要一个跌代器
//  什么是类数组？有索引 有长度
function fn() {
    let args = Array.from(arguments);
    console.log(args instanceof Array);

}
fn(1, 2, 3)
let obj = {
    name: 'FICoding', 
    age: 28, 
    length:2,
    [Symbol.iterator]: function () { // 函数能被迭代必须返回一个对象，必须返回一个next()方法
        var key=0; //迭代器中的this就是这个对象
        var len=this.length;
        return {
            next(){
                return{
                    value:obj[key], //迭代出的结果
                    done:(len===key++)?true:false   //是否迭代完成true为完成
                }
            }
        }
    }
}
console.log(...obj)