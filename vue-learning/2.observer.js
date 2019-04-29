let obj = {
    name: 'Jonny',
    age: {
        age:18
    }
}

function observer(obj) {
    if (typeof obj == 'object') {
        for (let key in obj) {
            defineReactive(obj, key, obj[key])
        }
    }
}
observer(obj)

function defineReactive(obj, key, value) {
    observer(value)
    Object.defineProperty(obj, key, {
        get () {
            return value
        },
        set(newVal){
            // newVal也有可能是个对象
            observer(newVal)
            console.log('data be updated')
            value = newVal
        }
    })
}


// vue 把这个数组上的所有方法都重写了

['push', 'slice','shift','unshift'].forEach((method) =>{
    let oldMethod = Array.prototype[method];
    Array.prototype[method] = function (value) {
        console.log('重写的方法数据更新')
        oldMethod.call(this, value)
    }
})


//Object.definePropery 不支持数组的
obj.age = [1,2,3,4]
obj.age.push(5)