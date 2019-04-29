// const EventEmitter = require('events')
// const util = require('util')
// function Bell() {
    
// }
// let bell = new Bell()
// util.inherits(Bell, EventEmitter);

// bell.on('响',function () {
//     console.log('响~~~')
// })
// bell.emit('响')

function Events(config, task) {
    this.task = task;
    this.listeners = {};
}

Events.prototype.on = function (type, cb) {
    if (!(type in this.listeners)) {
        this.listeners[type] = [];
    }
    this.listeners[type].push(cb)
};

Events.prototype.emit = function (type) {
    var listener = this.listeners[type];
    var args = [].slice.call(arguments, 1)
    if (listener) {
        listener.forEach(function (h) {
            h.apply(void 0,args)
        })
    }
};
let e = new Events();
e.on('click', function (arg) {
    console.log(arg);
});
e.emit('click', 1,2,3);