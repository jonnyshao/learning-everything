// for bind function
Function.prototype.bind=Function.prototype.bind||function () {
    var self=this,
        context=[].shift.call(arguments),
        args=[].slice.call(arguments);
    return function(){
        return self.apply(context,[].slice.concat.call(args,[].slice.call(arguments)));
    }
}

    (function () {
        Array.prototype.push.call(arguments, 3); 
        console.log(arguments); // 输出[1,2,3]
    })(1, 2);


var Type = {};
for (var i = 0, type; type = ['String', 'Array', 'Number'][i++];) {
    (function (type) {
        Type['is' + type] = function (obj) {
            return Object.prototype.toString.call(obj) === '[object ' + type + ']';
        }
    })(type)
};
console.log(Type.isArray([])); // 输出:true
console.log(Type.isString("str"));// 输出:true
console.log(Type.isNumber(1));// 输出:true

for(var i=0,type;type=['Object','Array','Function'];i++){
    (function (type) {
        type=function (param) {
           return Object.prototype.toString.call(param)==='[object'+type+']';
       } 
    })(type)
}
console.log(Array([]))