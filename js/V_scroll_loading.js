/**
 * 监听容器下拉滚动事件
 * 获取数据的方式请自定义方法，放在init回调或者scrollEnd回调里面触发
 * 小鱼 2017-11-01
 */
;(function(){
  var _global;

  function V_scroll_loading(opts){
    this.elementName = opts.element
    this.element = (opts.element==='body') ? document.documentElement || document.body : document.querySelector(opts.element); //滚动容器
    this.scrollElement = (opts.element === 'body') ? window : this.element;
    this.triggerDistance = opts.triggerDistance || 200; //距离底部的距离
    this.isLoading = false; //请求数据时候避免多次重复请求
    this.isEnd = false; //所有数据请求完毕
    this.listeners = [];
    this.handlers = {};
    this.init()
  }

  V_scroll_loading.prototype = {
    scrollTop: function () {
      if(this.elementName === 'body'){
        return document.body.scrollTop==0?document.documentElement.scrollTop:document.body.scrollTop
      }
      return this.element.scrollTop;
    },
    clientHeight: function () {
      return this.element.clientHeight;
    },
    scrollHeight: function () {
      if(this.elementName === 'body'){
        return document.body.scrollHeight==0?document.documentElement.scrollHeight:document.body.scrollHeight
      }
      return this.element.scrollHeight;
    },
    init: function () {
      setTimeout(function () {
        this.emit({type: 'init', target: this.element})
      }.bind(this), 0)

      //如果容器不是浏览器窗口,容器设置高度
      if(this.elementName != 'body'){
        var windowView = document.documentElement || document.body;
        this.element.style.height = windowView.clientHeight + 'px'
      }

      //监听滚动元素事件
      this.scrollElement.addEventListener('scroll', function(){
        this.scrollEnd();
      }.bind(this));
    },
    scrollEnd: function () {
      //滚动回调事件
      if (!this.isLoading && !this.isEnd && this.scrollTop() + this.clientHeight() >= this.scrollHeight()-this.triggerDistance) {
        this.isLoading = true;
        this.emit({type: 'scrollEnd', target: this.element})
      }
    },
    loadingUnLock: function () {
      this.isLoading = false;
    },
    loadingEnd: function () {
      this.isEnd = true
    },
    on: function (type, handler) {
      // type: init, scrollEnd
      if (typeof this.handlers[type] === 'undefined') {
        this.handlers[type] = [];
      }
      this.listeners.push(type);
      this.handlers[type].push(handler);
      return this;
    },
    emit: function (event) {
      if (!event.target) {
        event.target = this;
      }
      if (this.handlers[event.type] instanceof Array) {
        var handlers = this.handlers[event.type];
        for (var i = 0, len = handlers.length; i < len; i++) {
          handlers[i](event);
          return true;
        }
      }
      return false;
    }
  };

  _global = (function () {
    return this || (0, eval)('this');
  }());
  if (typeof module !== "undefined" && module.exports) {
    module.exports = V_scroll_loading;
  } else if (typeof define === "function" && define.amd) {
    define(function () {
      return V_scroll_loading;
    });
  } else {
    !('V_scroll_loading' in _global) && (_global.V_scroll_loading = V_scroll_loading);
  }

})();