(function(global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return factory(global);
        });
    } else {
        global.UIActionSelector = factory(global);
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

    function UIActionSelector(params, callback) {
        if (callback === undefined) callback = params;
        window.F = window.F || {};
        F.UIActionSelector = F.UIActionSelector || api.require('UIActionSelector');

        var def_params = {
            datas: [],
            animation: true,
            fixedOn: api.frameName,
            actives: [0, 0, 0],
            layout: {
                row: 7,
                col: 3,
                height: 30,
                size: 12,
                sizeActive: 14,
                rowSpacing: 4,
                colSpacing: 0,
                maskBg: 'rgba(0,0,0,0.2)',
                bg: '#fff',
                color: '#aaa',
                colorSelected: '#3a3a3a'
            },
            cancel: {
                text: '取消',
                size: 14,
                w: 54,
                h: 38,
                bg: 'rgba(0,0,0,0.0)',
                bgActive: 'rgba(0,0,0,0.0)',
                color: 'rgb(8, 148, 236)',
                colorActive: 'rgba(8, 148, 236, 0.5)'
            },
            ok: {
                text: '完成',
                size: 14,
                w: 54,
                h: 38,
                bg: 'rgba(0,0,0,0.0)',
                bgActive: 'rgba(0,0,0,0.0)',
                color: 'rgb(8, 148, 236)',
                colorActive: 'rgba(8, 148, 236, 0.5)'
            },
            title: {
                text: '请选择',
                size: 16,
                h: 38,
                bg: '#eee',
                color: '#666'
            },
        };

        var ios_params = {
            layout: {
                color: '#222',
                colorSelected: '#000',
                size: 16,
                sizeActive: 18,
            },
            ok: {
                h: 42,
                w: 50,
            },
            cancel: {
                h: 42,
                w: 50,
            },
            title: {
                h: 42,
                w: 44,
            },
        }

        if (api.systemType === 'ios') extend(def_params, ios_params);

        extend(def_params, params);

        console.log(JSON.stringify(def_params));

        F.UIActionSelector.open(def_params, function(ret, err) {
            callback(ret, err);
        });
    }

    return UIActionSelector;
}));
