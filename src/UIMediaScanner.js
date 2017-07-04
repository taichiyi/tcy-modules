(function(global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return factory(global);
        });
    } else {
        global.UIMediaScanner = factory(global);
    }
}(this, function(window) {
    "use strict";

    // 转换UIMediaScanner返回的图片数组(因为ios返回的图片前端不能直接使用)
    function edit_path_ios(data, callback) {
        var index = 0;
        var result = [];

        function push_url() {
            var item = data[index];

            if (index >= data.length) {
                callback(result);
                return false;
            }

            F.UIMediaScanner.transPath({
                path: data[index].path
            }, function(ret, err) {
                if (ret) {
                    item.path = ret.path;
                    result.push(item);

                    index += 1;
                    push_url();
                    console.log(JSON.stringify(ret));
                } else {
                    console.log(JSON.stringify(err));
                }
            });
        }

        push_url();
    }

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

    var UIMediaScanner = function(params, callback) {
        if (callback === undefined) callback = params;
        window.F = window.F || {};
        F.UIMediaScanner = F.UIMediaScanner || api.require('UIMediaScanner');
        var def_params = {
            type: 'picture',
            column: 4,
            classify: true,
            max: 8,
            sort: {
                key: 'time',
                order: 'desc'
            },
            texts: {
                stateText: '已选择*项',
                cancelText: '取消',
                finishText: '完成'
            },
            styles: {
                bg: '#fff',
                mark: {
                    icon: '',
                    position: 'bottom_right',
                    size: 26
                },
                nav: {
                    bg: '#f7f8f9',
                    stateColor: '#333',
                    stateSize: 17,
                    cancelBg: 'rgba(0,0,0,0)',
                    cancelColor: '#007aff',
                    cancelSize: 16,
                    finishBg: 'rgba(0,0,0,0)',
                    finishColor: '#007aff',
                    finishSize: 16
                }
            },
            scrollToBottom: {
                intervalTime: -1,
                anim: true
            },
            exchange: true,
        };

        extend(def_params, params);

        console.log(JSON.stringify(def_params));

        F.UIMediaScanner.open(def_params, function(ret) {
            if (ret.eventType === 'confirm' && api.systemType === 'ios') {
                edit_path_ios(ret.list, function(result) {
                    ret.list = result;
                    callback(ret);
                });
            } else {
                callback(ret);
                return false;
            }
        });
    };

    return UIMediaScanner;
}));
