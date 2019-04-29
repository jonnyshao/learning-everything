function Node (data) {
  this.prev = null;
  this.data = data;
  this.next = null;
}
function DoublyLinkedList() {
  this.head = null;
  this.tail = null;
  this.length = 0;
}
DoublyLinkedList.prototype.append = function (data) {
  var newNode = new Node(data);
  if (this.length === 0) {
    this.head = newNode;
    this.tail = newNode
  } else {
    this.tail.next = newNode
    newNode.prev = this.tail
    this.tail = newNode
  }
  this.length ++;
}
DoublyLinkedList.prototype.insert = function (position, data) {
  if (position < 0 || position > this.length) return false;
  var newNode = new Node(data)

  if (this.length === 0) {
    this.head = newNode;
    this.tail = newNode;
  } else {
    var current = this.head
    if (position === 0) { // 判断position是否为0
      // 原来的第一节点.prev = newNode
      this.head.prev = newNode
      newNode.next = this.head
      this.head = newNode
    } else if (position === this.length) {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    } else {
      var current = this.head;
      var index = 0;
      while (index++ < position) {
        current = current.next
      }
      // 新插入的newNode.next等于current
      newNode.next = current
      // 新插入的newNode.prev 等于原先current.prev
      newNode.prev = current.prev
      // 取到原先current的上一个.next 等于newNode
      current.prev.next = newNode
      // 原先currnet.prev = newNoDE
      current.prev = newNode
    }
  }
  this.length++;
  return true
}
DoublyLinkedList.prototype.get = function (position) {
  if (position < 0 || position >= this.length) return null
  // this.length / 2 > position 从前向后遍历
  // this.length / 2 < position 从后向前遍历
  var current = this.head
  var index = this.length - 1
  while (index++ < position) {
    current = current.next
  }
  if (this.length / 2 > position) {
    var current = this.head
    var index = inex
    while (index++ < position) {
      current = current.next
    }
  }
  if (this.length / 2 < position) {
    var current = this.tail
    var index = this.length - 1
    while (index-- < position) {
      current = current.prev
    }
  }
  return current.data;
}
DoublyLinkedList.prototype.indexOf = function (data) {
  var current = this.head
  var index = 0;
  while (current) {
    if (current.data === data){
      return index
    }
    current = current.next
    index++ 
  }
  return -1
}
DoublyLinkedList.prototype.update = function (position, newData) {
  if(position < 0 || position >= this.length) return false
  var current = this.head;
  var index = 0;
  while(index++ < position) {
    current = current.next
  }
  current.data = newData
  return current.data
}
DoublyLinkedList.prototype.removeAt = function (position) {
  if (position < 0 || position >= this.length) return null;
  var current = this.head;
  if (this.length === 1) {
    this.head = null;
    this.tail = null;
  } else {
    if (position === 0) {
      this.head.next.prev = null
      this.head = this.head.next;
    } else if (position === this.length - 1) { // 最后节点
      current = this.tail
      this.tail.prev.next = null;
      this.tail = this.tail.prev;
    } else {
      var index = 0;
      while (index++ < position) {
        current = current.next
      }
      current.prev.next = current.next
      current.next.prev = current.prev
    }
  }
  this.length --;
  return current.data

}
DoublyLinkedList.prototype.remove = function (data) {
  return this.removeAt(this.indexOf(data))
}
DoublyLinkedList.prototype.size = function () {
  return this.length
}
DoublyLinkedList.prototype.isEmpty = function () {
  return this.length === 0
}
DoublyLinkedList.prototype.toString = function () {
  return this.backwordString()
}
DoublyLinkedList.prototype.forwardStirng = function (data) {
  var current = this.tail
  var resultString = ''
  // 依次向前遍历获取每一个节点
  while (current) {
    resultString += current.data;
    current = current.prev
  }
  return resultString
}
DoublyLinkedList.prototype.backwordString = function () {
  var current = this.head;
  var resultString = ''
  // 依次向后遍历获取每一个节点
  while (current) {
    resultString += current.data + '';
    current = current.next
  }
  return resultString;
}
DoublyLinkedList.prototype.getHead = function () {
  return this.head.data
}
DoublyLinkedList.prototype.getTail = function () {
  return this.tail.data
}