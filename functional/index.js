var unary = (fn) => fn.length === 1 ? fn : arg => fn(arg)
console.log([1,2,3].map(unary(parseInt)))

var tap = val => fn => typeof fn === 'function' && fn(val)
var t1 = tap('func')
t1(function (t) {
  // console.log(t)
})

var once = fn => {
  let done = false
  return function () {
    return done ? undefined:((done=true),fn.apply(this, arguments))
  }
}
var doOnce = once(() =>{console.log('do once')})
// doOnce()
// doOnce()

var factorial = n => {
  if (n===0) return 1;
  return n * factorial(n - 1)
}
//  memoized 保存上一次的计算结果

var memoized = fn => {
  var lookupTable = {};
  return arg => lookupTable[arg] || (lookupTable[arg] = fn(arg))
}

var map = (array, fn) => {
  var results = []
  for (var value of array) {
    // if (fn(value)) {
    //   return value
    // }
    results.push(fn(value))
  }
  return results;
}
// console.log(map([1,2,3],(item) => {
//   return item === 3
// }))
var filter = (array, fn) => {
  var results = [];
  for (var value of array) {
    (fn(value)) ? results.push(value) : undefined;
  }
  return results;
}

var forEachObject = (obj, fn) => {
  for (var property in obj) {
    if (obj.hasOwnProperty(property)) {
      fn(property, obj[property])
    }
  }
}
var forEach = (array, fn) => {
  for (let i = 0, len = array.length; i < len; i++) {
    fn(array[i])
  }
}
var unless = (predicate,fn) => {
  if (!predicate) {
    fn()
  }
}
forEach([1,2,3,4,5,6,7], number => {
  unless((number % 2), () => {
    // console.log(number)
  })
})

var times = (times, fn) => {
  for (var i = 0; i < times; i++) {
    fn(i)
  }
}

times(100, function (n) {
  unless(n % 2, () => {
    // console.log(n)
  })
})

var every = (arr, fn) => {
  let result = true;
  for (let i = 0, len = arr.length; i < len; i++) {
    result = result && fn(arr[i])
    if (!result) return result
  }
  return result
}

var some = (arr, fn) => {
  let result = false;
  for (let value of arr) {
    result = result || fn(value)
    if (result) return result
  }
  return result
}
var demo = [
  {name: 'beginners', details: 
    [
      {id: 1, title: "c#6"},
      {id: 2, title: "Efficient Learning Machines"}
    ]
  },
  {name: 'pro', details: 
    [
      {id: 1, title: "Pro AngularJs"},
      {id: 2, title: "Adam Freeman"}
    ]
  }
]
var flatten = (arr, fn) => {
  // console.log(arr)
  let results = [];
  for (let i = 0, len = arr.length; i < len; i++) {
    console.log(arr[i])
    results.push.apply(results, arr[i])
  }
  return results
}
// console.log(flatten(map(demo,(book) => book.details)))

var zip = (leftArr, rightArr, fn) => {
  let index, results = [], len = Math.min(leftArr.length, rightArr.length);
  for (index = 0; index < len; i++) {
    results.push(fn(leftArr[i], rightArr[i]))
  }
  return results
}

