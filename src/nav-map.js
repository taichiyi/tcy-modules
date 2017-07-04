(function(global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return factory(global);
        });
    } else {
        global.navMap = factory(global);
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
    function appInstalled(params, callback) {
        api.appInstalled({
            appBundle: api.systemType === 'ios' ? params.ios : params.android,
        }, function(ret, err) {
            callback(ret, err);
        });
    }

    // 打开APP导航
    var navMap = function(params, callback) {
        if (callback === undefined) callback = params;
        callback = callback || function() {};

        var def_params = {
            appName: '', // 地图名称；'百度地图' || '高德地图'
            destinationLat: 35.79788697849975,
            destinationLon: 114.56164458447934,
        };


        extend(def_params, params);

        console.log(JSON.stringify(def_params));

        function open(params) {
            var iosUrl = '';
            var appParam = {};
            var uri = "";
            if (params.appName === '百度地图') {
                iosUrl = 'baidumap://map/direction';

                appParam.destination = def_params.destinationLat + ',' + def_params.destinationLon;
                appParam.mode = 'driving';

                uri += 'baidumap://map/direction';
                uri += '?destination=' + def_params.destinationLat + ',' + def_params.destinationLon;
                uri += '&mode=driving';
            } else {
                iosUrl = 'iosamap://path';

                appParam.dlat = def_params.destinationLat;
                appParam.dlon = def_params.destinationLon;
                appParam.dev = '0';
                appParam.t = '0';
                appParam.sourceApplication = api.appName;

                uri += 'androidamap://route';
                uri += '?sourceApplication=' + api.appName;
                uri += '&poiname=';
                uri += '&dlat=' + def_params.destinationLat + '&dlon=' + def_params.destinationLon;
                uri += '&dev=0';
                uri += '&t=2';
            }

            console.log(uri);

            api.openApp({
                androidPkg: 'android.intent.action.VIEW',
                appParam: appParam,
                uri: uri,
                iosUrl: iosUrl,
            }, function(ret, err) {
                if (ret) {
                    // alert(JSON.stringify(ret));
                } else {
                    // alert(JSON.stringify(err));
                }
            });
        }

        function run_amap() {
            appInstalled({
                // 高德地图
                ios: 'iosamap://',
                android: 'com.autonavi.minimap'
            }, function(ret) {
                if (ret.installed) {
                    //应用已安装
                    open({
                        appName: '高德地图',
                    });
                    callback({
                        status: true,
                    });
                } else {
                    //应用未安装
                    if (!def_params.appName) {
                        run_bmap();
                    } else {
                        callback({
                            status: false,
                            code: 3, // 打开高德地图
                        });
                    }
                }
            });
        }

        function run_bmap() {
            appInstalled({
                // 百度地图
                ios: 'baidumap://',
                android: 'com.baidu.BaiduMap',
            }, function(ret) {
                if (ret.installed) {
                    //应用已安装
                    open({
                        appName: '百度地图',
                    });

                    callback({
                        status: true,
                    });
                } else {
                    //应用未安装
                    if (!def_params.appName) {
                        callback({
                            status: false,
                            code: 4, // 没有百度地图
                        });
                    } else {
                        callback({
                            status: false,
                            code: 5, // 没有高德和百度地图
                        });
                    }
                    // api.alert({
                    //     title: '没有安装高德地图',
                    //     msg: '导航需要使用高德地图'
                    // });
                }
            });
        }

        switch (def_params.appName) {
            case '高德地图':
                run_amap();
                break;
        
            case '百度地图':
                run_bmap();
                break;
        
            default:
                run_amap();
                break;
        }
    };


    return navMap;
}));
