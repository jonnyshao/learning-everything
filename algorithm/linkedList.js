
function linkedList() {
  // 头
  this.head = null
  // 记录链表的长度
  this.length = 0
  // 内部类 节点类
  function Node(data) {
    this.data = data;
    this.next = null
  }
  // 向列表尾部添加一个新的项
  linkedList.prototype.append = function (data) {
    // 1.创建新节点
    var newNode = new Node(data);
    // 2.判断添加的是否是第一个节点
    if (this.length === 0) {
      this.head = newNode;
    } else { // 2.2 不是第一个节点
      var current = this.head;
      // 找到最后一个node,最后一个节点为null
      while (current.next) {
        current = current.next
      }
      //  最后节点的next 指向新的节点
      current.next = newNode
    }
    // 3.length +1
    this.length++;
  }
  // 向列表的特定位置插入一个新的项
  linkedList.prototype.insert = function (position, data) {
    // 1.对position进行越界判断return
    if (position < 0 || position > this.length)  return false
    // 2. 根据data 创建newNode
    var newNode = new Node(data)
    // 3.判断插入的益是否是第一个
    if (position === 0) {
      // 新的node节点等于原先的第一个
      newNode.next = this.head
      this.head = newNode
    } else {
      var index = 0;
      // 获取当前
      var current = this.head
      // 获取上一个
      var previous = null
      while (index++ < position) {
        previous = current;
        current = current.next;
      }
      newNode.next = current
      previous.next = newNode
    }
    // 4.lenght +1
    this.length++
    return true
  }
  // 获取对应的元素
  linkedList.prototype.get = function (position) {
    // 1.越界判断
    if (position < 0 || position >= this.length) return null
    // 2.获取对应的data
    var current = this.head;
    var index = 0;
    while (index++ < position) {
      current = current.next
    }
    return current.data
  }
  // 返回元素在列表中的索引，如果列表中没有该元素则返回 -1
  linkedList.prototype.indexOf = function (data) {
    var current = this.head;
    var index = 0;
    while (current) {
      if (current.data === data) {
        return index
      }
      current = current.next
      index++;
    }
    // 找到最后没有找到返回 -1
    return -1
  }
  // 修改某个位置的元素
  linkedList.prototype.update = function (position, newData) {
    if (position < 0 || position >= this.length) return false;
    // 查找正确的节点
    var current = this.head;
    var index = 0;
    while (index++ < position) {
      current = current.next
    }
    current.data = newData
    return true
  }
  // 从列表的特定位置移除一项
  linkedList.prototype.removeAt = function (position) {
    if (position < 0 || position >= this.length) return null;
    var current = this.head
    if (position === 0) {
      this.head = current.next
    } else {
      var index = 0
      var previous = null;
      while (index++ < position) {
        previous = current;
        current = current.next
      }
      // 前一个节点的next指向，cureent的next
      previous.next = current.next
    }
    this.length --;
    return current;
  }
  // 从列表中移除一项
  linkedList.prototype.remove = function (data) {
    return this.removeAt(this.indexOf(data))
  }
  linkedList.prototype.isEmpty = function () {
    return this.length === 0;
  }
  linkedList.prototype.size = function () {
    return this.length;
  }
  linkedList.prototype.toStirng = function () {
  }
}
