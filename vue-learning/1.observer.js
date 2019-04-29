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


console.log(obj)
// obj.age = {
//     age: 1
// }
// obj.age.name = 'Carter'
// 如果属性不存在 默认后增加的内容 并不会刷新视图
obj.sex = 'male';

//Object.definePropery 不支持数组的
obj.age = [1,2,3,4]
obj.age.push(5)