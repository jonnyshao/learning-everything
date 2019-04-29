function Set() {
  this.items = {}
}
Set.prototype.add = function (value) {
  // 判断当前集体中是否已经包含了该元素
  if (this.has(value)) return false;
  this.items[value] = value
  return true
}
Set.prototype.remove = function (value) {
  if (!this.has(vlaue)) return false;
  delete this.items[value]
  return true
}
Set.prototype.has = function (value) {
  return this.items.hasOwnProperty(value)
}
Set.prototype.clear = function () {
  this.items = {}
}
Set.prototype.size = function () {
  return Object.keys(this.items).length
}
Set.prototype.values = function () {
  return Object.keys(this.items)
}

var set = new Set()
set.add('ryan')
set.add('carter')
set.add('jonny')
console.log(set.values())