function QueueElement(element, priority) {
  this.element = element;
  this.priority = priority;
}
function PriorityQueue() {
  this.queue = []
}
PriorityQueue.prototype.enqueue = function (element, priority) {
  //1. 创建QueueElement对象
  var queueElement = new QueueElement(element, priority);
  // 2. 判断队列是否为空
  if (this.queue.length === 0) {
    this.queue.push(queueElement)
  } else {
    var added = false;
    for (var i = 0; i < this.queue.length; i++) {
      if (queueElement.priority < this.queue[i].priority){
        this.queue.splice(i, 0, queueElement)
        added = true;
        break;
      }
    }
    if (!added) {
      this.queue.push(queueElement)
    }
  }
}
PriorityQueue.prototype.dequeue = function () {
  return this.queue.shift()
}
PriorityQueue.prototype.front = function () {
  return this.queue[0]
}
PriorityQueue.prototype.isEmpty = function () {
  return this.queue.length === 0
}
PriorityQueue.prototype.size = function () {
  return this.queue.length
}
PriorityQueue.prototype.toString = function () {
  var res = ''
  for(var i = 0; i < this.queue.length; i++) {
    res += this.queue[i].element + '-' + this.queue[i].priority + ''
  }
  return res
}

var priority = new PriorityQueue()
priority.enqueue('abc',10)
priority.enqueue('cba',1)
priority.enqueue('bac',100)
console.log(priority)