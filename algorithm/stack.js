function Stack() {
  // property
  this.items = []
}
// 1.将元素压入到栈
Stack.prototype.push = function (element) {
  this.items.push(element)
}
  // 2.从栈中栈顶取出元素
Stack.prototype.pop = function () {
  return this.items.pop()
}
  // 3.查看一下栈顶元素
Stack.prototype.peek = function () {
  return this.items[this.items.length - 1]
}
  // 4.判断栈是否为空
Stack.prototype.isEmpty = function () {
  return this.items.length === 0
}
  // 5.获取栈中元素的个数
Stack.prototype.size = function () {
  return this.items.length
}
  // 6.toStirng方法
Stack.prototype.toString = function () {
  var res = ''
  for(var i = 0; i < this.items.length; i++) {
    res += this.items[i] + ''
  }
  return res
}
// const s = new Stack()

// 十进制转二进

function dec2bin(dec) {
  // 1.定义栈对象
  var stack = new Stack()
  // 2.循环操作
  while (dec > 0) {
    // 2.1 获取余数且入到栈中
    stack.push(dec % 2)
    // 2.2 获取整除后的结果，作为下一次运行的数字
    dec = Math.floor(dec / 2)
  }
  // 3.从栈中取出bin
  var binaryStirng = ''
  while (!stack.isEmpty()) {
    binaryStirng += stack.pop()
  }
  return binaryStirng;
}
console.log(dec2bin(101))