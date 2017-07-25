(function(global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return factory(global);
        });
    } else {
        global.scrollToBottom = factory(global);
    }
}(this, function(window) {
    "use strict";

    var scrollToBottom = function(params, callback) {
        var is_body = false; //是不是body
        var element; //所找到的元素
        var selector_handle; //元素句柄
        var is_executeCallback = true; //是否可以执行回调
        var scroll_main; //主程序
        var selector_height = function(_this) { //选择器的高度
            return is_body ?
                window.innerHeight :
                _this.offsetHeight;
        };

        if (typeof params.selector !== 'string') {
            // return false;
        }

        selector_handle = $(params.selector);
        if (selector_handle.length === 0) {
            console.error('没有找到匹配的元素');
            return false;
        }

        element = selector_handle[0];
        is_body = element.tagName === 'BODY';

        if (is_body === false) { //元素不是body时
            // 检测所捕获的元素是否相关css属性
            if (selector_handle.eq(0).css('overflow-y') !== 'auto') {
                selector_handle.eq(0).css('overflow-y', 'auto');
            }
        }

        element.addEventListener('touchstart', function(event) {
            is_executeCallback = true;
        }, false);
        // element.addEventListener('touchmove', function(event) {

        // }, false);

        params.distance = +params.distance || 0; //到达底部的距离

        scroll_main = function(_this) {
            if (_this.scrollTop + selector_height(_this) + params.distance >= _this.scrollHeight) { //到达'底部'

                if (_this.scrollTop === 0) { //滚动条到'底部'但是无效
                    return false;
                }

                if (is_executeCallback === true) {
                    callback({
                        status: true,
                        scrollTop: _this.scrollTop,
                    });
                    is_executeCallback = false;
                }
            } else {
                callback({
                    status: false,
                    scrollTop: _this.scrollTop,
                });
            }
        }

        if (is_body) {
            window.onscroll = function() {
                var that = document.documentElement.scrollTop === 0 ? document.body : document.documentElement;
                scroll_main(that);
            }
        } else {
            $(params.selector).on('scroll', function() {
                scroll_main(this);
            });
        }
    };
    return scrollToBottom;
}));
