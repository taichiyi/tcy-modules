(function(global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return factory(global);
        });
    } else {
        global.appInstalled = factory(global);
    }
}(this, function(window) {
    "use strict";

    // 对象合并, 支持多维对象, 不支持二维数组
    function extend(def_params, params) {
        var i;

        for (i in params) {
            if (params.hasOwnProperty(i)) {
                if (def_params[i] !== undefined && {}.toString.call(params[i]) === '[object Object]') {
                    extend(def_params[i], params[i]);
                } else {
                    def_params[i] = params[i];
                }
            }
        }
    }

    // 判断是否已安装某个app
    var appInstalled = function(params, callback) {
        api.appInstalled({
            appBundle: api.systemType === 'ios' ? params.ios : params.android,
        }, function(ret, err) {
            console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
            callback(ret, err);
        });
    }

    return appInstalled;
}));
