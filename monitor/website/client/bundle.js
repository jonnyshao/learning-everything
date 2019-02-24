(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(function () { 'use strict';

  // 页面性能监控
  var processData = function processData(p) {
    var data = {
      prevPage: p.fetchStart - p.navigationStart,
      // 上一个页面到这个页面的时长
      redirect: p.redirectEnd - p.redirectStart,
      // 重定向的时长
      dns: p.domainLookupEnd - p.domainLookupStart,
      // dns解析时长
      connect: p.connectEnd - p.connectStart,
      // tcp连接的时长
      send: p.responseEnd - p.requestStart,
      // 响应结束到请求对事 
      ttfb: p.responseStart - p.navigationStart,
      // 首字节接收到的时长
      domready: p.domInteractive - p.domLoading,
      // dom准备时长
      whiteScreen: p.domLoading - p.navigationStart,
      // 白屏
      dom: p.domComplete - p.domLoading,
      // dom 解析时间
      load: p.loadEventEnd - p.loadEventStart,
      // dom 执行时间
      total: p.loadEventEnd - p.navigationStart
    };
    return data;
  };

  var load = function load(cb) {
    var timer;

    var check = function check() {
      if (performance.timing.loadEventEnd) {
        clearTimeout(timer);
        cb();
      } else {
        timer = setTimeout(check, 100);
      }
    };

    window.addEventListener('load', check, false);
  };

  var domread = function domread(cb) {
    var timer;

    var check = function check() {
      if (performance.timing.domInteractive) {
        clearTimeout(timer);
        cb();
      } else {
        timer = setTimeout(check, 100);
      }
    };

    window.addEventListener('DOMContentLoaded', check, false);
  };

  var perf = {
    init: function init(cb) {
      domread(function () {
        // dom解析完成后先统计一下，可能用户没加载完就关闭页面
        var perf = performance.timing;
        var data = processData(perf);
        data.type = 'domready';
        cb(data);
      });
      load(function () {
        var perf = performance.timing;
        var data = processData(perf);
        data.type = 'loaded';
        cb(data);
      });
    }
  };

  var processData$1 = function processData(_) {
    var data = {
      name: _.name,
      initiatorType: _.initiatorType,
      duration: _.duration
    };
    return data;
  };

  var resource = {
    init: function init(cb) {
      // 获取资源相关的信息
      if (window.PerformanceObserver) {
        // mutationObserver
        var observer = new PerformanceObserver(function (list) {
          var data = list.getEntries();
          cb(processData$1(data[0]));
        });
        observer.observe({
          entryTypes: ['resource']
        });
      } else {
        window.onload = function () {
          var resourceData = performance.getEntriesByType('resource');
          var data = resourceData.map(function (_) {
            return processData$1(_);
          });
          cb(data);
        };
      }
    }
  };

  var xhr = {
    init: function init(cb) {
      // 发送请求 fetch xhr
      var xhr = window.XMLHttpRequest;
      var oldOpen = xhr.prototype.open;
      var oldSend = xhr.prototype.send;

      xhr.prototype.open = function (memthod, url, async, username, password) {
        this.info = {
          memthod: memthod,
          url: url,
          async: async,
          username: username,
          password: password
        };
        return oldOpen.apply(this, arguments);
      };

      xhr.prototype.send = function (value) {
        var _this = this;

        var start = Date.now();

        var fn = function fn(type) {
          return function () {
            _this.info.time = Date.now() - start;
            _this.info.requestSize = value ? value.length : 0;
            _this.info.responseSize = _this.responseText.length;
            _this.info.type = type;
            cb(_this.info);
          };
        };

        this.addEventListener('load', fn('load'), false);
        this.addEventListener('error', fn('error'), false);
        this.addEventListener('abort', fn('abort'), false);
        return oldSend.apply(this, arguments);
      };
    }
  };

  // 监控页面的性能 - 算时间差 Performance Api

  perf.init(function (data) {// new Image().src = 'p.git?'+ formatObj(data)
    // console.log(data)
  }); // 监控页面静态资源的加载情况

  resource.init(function (data) {// console.log(data)
  }); // 监控ajax 发送情况

  xhr.init(function (data) {
    console.log(data);
  }); // 页面的错误捕获
  // 监控用户的行为

}));
