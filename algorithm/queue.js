function Queue(params) {
  this.queue = []
}
Queue.prototype.enqueue = function (ele) {
  this.queue.push(ele)
}
Queue.prototype.dequeue = function () {
  return this.queue.shift()
}
Queue.prototype.front = function () {
  return this.queue[0]
}
Queue.prototype.isEmpty = function () {
  return this.queue.length === 0
}
Queue.prototype.size = function () {
  return this.queue.length
}
Queue.prototype.toString = function () {
  var res = ''
  for(var i = 0; i < this.queue.length; i++) {
    res += this.items[i] + ''
  }
  return res
}
function passGame(pepole, num) {
  var queue = new Queue()
  // 将所有人加入到队列中
  for (var i =0; i < pepole.length; i++) {
    queue.enqueue(pepole[i])
  }
  // 3.开始数数字， 不是num的时候，重新加入队列末尾，是num这个数字的时候，将其从队列中删除
  while (queue.size() > 1) {
    // 因为数组是从下标零开始,
  // 3.1 num数字之前的人重新放入到队列的末尾
  for (var i = 0; i < num -1; i++) {
    queue.enqueue(queue.dequeue())
  }
  // 3.2 num对应这个人，直接从队列中删除
  queue.dequeue()
  }
  // 4.获取剩下的人
  return queue.front()
}
console.log(passGame(['Lily','Carter','Ryan','Jonny','Steve'], 5))