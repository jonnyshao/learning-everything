// 展开运算符
Math.min.apply(Math,[1,2,3,4,5])
Math.min(...[1,2,3,4,5])

// 对象也可以展开 深拷贝和浅拷贝
let obj1={name:'FICdoing'};
let obj2={age:18};
let obj3={...obj1,...obj2};

// 深拷贝
let obj={name:{name:'FICoding'}};
let o=JSON.parse(JSON.stringify(obj));// 不支持函数 正则 日期等

// 递归实现深拷贝
// 函数没有引用关系，不需要拷贝
function deepClone(obj){
    if(typeof obj!=='object')return obj;
    // 传递的是null 那就不处理
    if(obj===null)return null;
    // 处理日期和正则
    if(obj instanceof RegExp) return new RegExp(obj);
    if(obj instanceof Date)return new Date(obj)
    //实现深拷贝
    var instance=new obj.constructor();
    for (var key in obj){
        if(Object.prototype.hasOwnProperty(key)){
            instance[key]=typeof obj[key]==='object'?deepClone(obj[key]):obj[key]
        }
    }
    return instance;

}


