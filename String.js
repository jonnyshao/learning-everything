String.prototype.queryURLParameter = function queryURLParameter() {
    var reg = /([^?&=]+)=([^?&=]+)/g, obj = {};
    this.replace(reg, function () {
        obj[arguments[1]] = arguments[2];
    });
//        var res = reg.exec(this);
//        while (res) {
//            obj[RegExp.$1] = RegExp.$2;
//            res = reg.exec(this)
//        }
    return obj;
};