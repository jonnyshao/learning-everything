function Dep() {
  this.subscribe = []
}

// 订阅
Dep.prototype.on = function (watcher) {
  this.subscribe.push(watcher)
}
// 发布
Dep.prototype.notify = function () {
  console.log(this.subscribe)
  this.subscribe.forEach(function (h) {
    console.log('h.update()')
    h.update()
  })
}

// 观察者 (发布订阅) 观察者 被观察者
function Watcher(vm, expr, cb) {
  this.vm = vm;
  this.expr = expr;
  this.cb = cb;
  // 默认先存放一个老值，用来跟新值做对比
  this.oldValue = this.getOldValue()

}

Watcher.prototype.getOldValue = function () {
  // vm.$data.person m.$data.name 一取值会调用observer get方法
  // 先把 watcher 实例放在Dep.target上 把这个观察者和数据关联起来
  Dep.target = this
  var value = CompileUtil.getValue(this.vm, this.expr);
  Dep.target = null; // 不取消任何取值的操作 都会添加wather，等于null时只有new Watcher时 才会添加watcher
  return value;
}
Watcher.prototype.update = function () {
  // 更新操作 数据变化后 会调用观察者的update方法
  var newVal = CompileUtil.getValue(this.vm, this.expr);
  if (newVal !== this.oldValue) {
    this.cb(newVal, this.oldValue)
  }
}

function Observer(data) {
  this.observer(data)
}

Observer.prototype.observer = function (data) {
  if (data && typeof data === 'object') {
    for (var key in data) {
      this.defineReactive(data, key, data[key])
    }
  }
}
Observer.prototype.defineReactive = function (data, key, value) {
  var self = this;
  var dep = new Dep() //给每一个属性都加一个具有发布订阅的功能
  this.observer(value)
  Object.defineProperty(data, key, {
    get: function () {
      // 创建watcher时，会取到对应的内容，并且把watcher放到了全局上
      Dep.target && dep.on(Dep.target)
      return value
    },
    set: function (newVal) {
      // 新值与老的值不相等时再赋值
      if (value !== newVal) {
        console.log('defineReactive~~~~', newVal)
        self.observer(newVal)
        value = newVal
        dep.notify()
      }
    }
  })
}

function Compiler(el, vm) {
  // 判断 el属性是不是一个元素 如果不是元素 那就获取他
  this.el = this.isElementNode(el) ? el : document.querySelector(el);
  this.vm = vm;
  // 把当前节点中的元素 获取到 放到内存中

  var frament = this.node2fragment(this.el)
  // 把节点中的内容进行替换
  this.compile(frament)
  // 编译模版 用数据编译

  // 把内容在塞到页面中

  this.el.appendChild(frament)

}

Compiler.prototype.isElementNode = function (node) {
  // 是不是元素节点
  return node.nodeType === 1
}
Compiler.prototype.node2fragment = function (node) {
  // 创建文档碎片
  var fragment = document.createDocumentFragment();
  var firstChild;
  while (firstChild = node.firstChild) {
    // appendChild 具有移动性
    fragment.appendChild(firstChild)
  }
  return fragment
}
// 编译内存中的dom节点
Compiler.prototype.compile = function (node) {
  var self = this;
  var childNodes = [].slice.call(node.childNodes);
  childNodes.forEach(function (child) {
    if (self.isElementNode(child)) {
      self.compileElement(child)
      if (child.nodeType == 1) {
        self.compile(child)
      }
    } else {
      self.compileText(child)
    }
  })
}
// 编译元素
Compiler.prototype.compileElement = function (node) {
  var attributes = node.attributes;
  var self = this;
  // console.dir(attributes);
  [].slice.call(attributes).forEach(function (attr) {
    var name = attr.name;
    var expr = attr.value;

    if (self.isDirective(name)) {
      var directiveCollect = name.split('-').slice(1).join('');
      var directive = directiveCollect.split(':')
      CompileUtil[directive[0]](node, expr, self.vm, directive[1]);
      // console.log(node)
    }
  })
}
// 编译文本
Compiler.prototype.compileText = function (node) {
  var self = this
  // 判断当前文本节点中内容是否包含{{}}
  var content = node.textContent;
  // 匹配{{}}里面变量
  if (/\{\{(.+?)\}\}/.test(content)) {
    // 文本节点
    CompileUtil['text'](node, content, this.vm)
  }
}
Compiler.prototype.isDirective = function (name) {
  return name.indexOf('v-') > -1
}
var CompileUtil = {
  getValue: function (vm, expr) { //vm.$data 'person.name'
    return expr.split('.').reduce(function (data, current) {
      return data[current]
    }, vm.$data)
  },
  setValue: function (vm, expr, value) { // vm.$data 'person.name' = 'Rayn'
    expr.split('.').reduce(function (data, current, index, ary) {
      if (index === ary.length - 1) {
        return data[current] = value
      }
      return data[current]
    }, vm.$data)
  },
  // 解析v-mode这个指令
  model: function (node, expr, vm) {
    var self = this;
    // node => 节点
    // expr 表达式
    // vm 实例

    var h = self.updater['modelUpdater']
    // 给输入框加一个观察者 如果稍后数据更新了会触发此方法，会拿新值 给输入框赋值
    new Watcher(vm, expr, function (newVal) {
      h(node, newVal)
    })
    node.addEventListener('input', function (e) {
      var value = e.target.value;
      self.setValue(vm, expr, value)
    })
    var value = this.getValue(vm, expr)
    h(node, value)
  },
  html: function (node, expr, vm) {
    var h = this.updater['htmlUpdater']
    new Watcher(vm, expr, function (newVal) {
      console.log('Watcher~~html~~', newVal)
      h(node, newVal)
    })
    var value = this.getValue(vm, expr)
    h(node, value)
  },
  getContentValue: function (vm, expr) {
    // 遍历表达式 将内容 重新替换成一个完整的内容 返还回去
    var _this = this;
    return expr.replace(/\{\{(.+?)\}\}/g, function () {
      for (var len = arguments.length, args = new Array(len), key = 0; key < len; key++) {
        args[key] = arguments[key]
      }
      return _this.getValue(vm, args[1])
    })
  },
  on: function (node, expr, vm, event) {
    node.addEventListener(event, function (e) {
      vm[expr].call(vm, e)
    })
  },
  text: function (node, expr, vm) { // expr => {{a}} {{b}} {{c}}
    var _this = this
    var h = _this.updater['textUpdater']
    var content = expr.replace(/\{\{(.+?)\}\}/g, function () {
      for (var len = arguments.length, args = new Array(len), key = 0; key < len; key++) {
        args[key] = arguments[key]
      }
      // 给表达式中所有的变量{{}}都加个观察者
      new Watcher(vm, args[1], function () {
        h(node, _this.getContentValue(vm, expr)) // 返回了一个全的字符串
      })
      return _this.getValue(vm, args[1])
    })
    h(node, content)
  },
  updater: {
    // 把数据插入到节点中
    modelUpdater: function (node, value) {
      node.value = value
    },
    htmlUpdater: function (node, value) {
      node.innerHTML = value
    },
    textUpdater(node, value) {
      node.textContent = value
    }
  }
}

// 基类
function Vue(options) {
  this.$el = options.el;
  this.$data = options.data;
  var computeds = options.computed;
  var methods = options.methods;
  // 根元素存在 编译模板
  if (this.$el) {
    // 把数据全部转化成用Object.defineProperty来定义
    new Observer(this.$data)

    // 把数据获取 操作 vm上的取值操作 都借到vm.$data
    // {{getNewName}} reduce vm.$data.getNewName
    for (var computed in computeds) {
      Object.defineProperty(this.$data, computed, {
        get: function () {
          return computeds[computed].call(this)
        }
      })
    }
    for (var method in methods) {
      Object.defineProperty(this, method, {
        get: function () {
          return methods[method]
        }
      })
    }
    this.proxy(this.$data)
    new Compiler(this.$el, this)
  }
}

Vue.prototype.proxy = function (data) {
  for (let key in data) {
    Object.defineProperty(this, key, { // 实现可以通过vm取到对应的数据
      get: function () {
        return data[key] // 进行了转化操作
      },
      set: function (newVal) { // 设置代理方法
        if (data[key] !== newVal) {
          data[key] = newVal
        }
      }
    })
  }
}
