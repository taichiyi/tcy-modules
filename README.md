# tcy-modules

均支持AMD

源码都在 `src` 文件夹里

[check-img-square](#check-img-square "判断图片是否为正方形，并返回图片的一些信息(实际宽、高)。") [UIMediaScanner](#uimediascanner "选取多张图片。") [navMap](#navmap "打开高德或百度地图导航。") 

## check-img-square

判断图片是否为正方形，并返回图片的一些信息(实际宽、高)。

依赖模块：`无`

checkImgSquare({params}, callback(ret))

### params

url：

- 类型：字符串
- 默认值：无
- 描述：图片地址。例如：
    - '../img/logo.png'
    - 'http://www.apicloud.com/img/mobile/wx_logo.jpg'
    - '/storage/emulated/0/UZMap/...'

side：

- 类型：JSON 对象
- 默认值：无
- 描述：（可选项）如果图片为正方形时，将判断是否符合指定高度。不传则不判断
- 内部字段：
```javascript
{
    min: 100,  // 数字类型。单位：px像素。图片最小高度，不传则不判断
    max: 800   // 数字类型。单位：px像素。图片最大高度，不传则不判断
}
```

### callback(ret)

ret：

- 类型：JSON 对象
- 描述：回调
- 内部字段：
```javascript
{
    status: true,  // 布尔类型
    height: "",    // 数字类型。图片的真实高度
    width: "",     // 数字类型。图片的真实宽度
    code: "",      // 数字类型。如果status为true,则不返回此字段
                     //错误码：
                     // 2(缺少url参数)
                     // 3(图片不是正方形)
                     // 4(小于最小值)
                     // 5(大于最大值)
}
```

## 实例

```javascript
checkImgSquare({
    url: 'http://www.apicloud.com/img/mobile/wx_logo.jpg',
}, function(ret) {
    console.log(JSON.stringify(ret));
});

// 图片为正方形，且大于100，小于800
checkImgSquare({
    url: '../img/149639839823668.jpg',
    side: {
        min: 100,
        max: 800,
    },
}, function(ret) {
    console.log(JSON.stringify(ret));
});


```


## UIMediaScanner

选取多张图片。在原来的基础上，做了处理，如果是ios则会调用transPath方法。

依赖模块：`UIMediaScanner`

UIMediaScanner({params}, callback(ret))

### params

默认参数

```javascript
{
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
}
```

### callback(ret)

参照文档：[http://docs.apicloud.com/Client-API/UI-Layout/UIMediaScanner#open](http://docs.apicloud.com/Client-API/UI-Layout/UIMediaScanner#open)  

## 实例

```javascript
UIMediaScanner({
    max: 6,
}, function(ret) {
    console.log(JSON.stringify(ret));
});

```


## navMap

打开高德或百度地图导航。

依赖模块：`无`

navMap({params}, callback(ret))

### params

appName：

- 类型：字符串
- 默认值：高德地图
- 描述：想要打开的地图。'高德地图' || '百度地图'

destinationLat：

- 类型：JSON 对象
- 默认值：无
- 描述：目的地的纬度


destinationLon

- 类型：JSON 对象
- 默认值：无
- 描述：目的地的经度

### callback(ret)

ret：

- 类型：JSON 对象
- 描述：回调
- 内部字段：
```javascript
{
    status: true,  // 布尔类型
    height: "",    // 数字类型。图片的真实高度
    width: "",     // 数字类型。图片的真实宽度
    code: "",      // 数字类型。如果status为true,则不返回此字段
                     //错误码：
                     // 3(未安装高德地图)
                     // 4(未安装百度地图)
                     // 5(两个地图都没安装)
}
```

## 实例

```javascript
navMap({
    appName: '高德地图',
    destinationLat: 35.79788697849975,
    destinationLon: 114.56164458447934
}, function(ret) {
    console.log(JSON.stringify(ret));
})
```

## appInstalled

判断是否已安装某个app

依赖模块：`无`

注意：iOS9中系统对检测应用是否安装的方法做了限制，若想得到期望的结果，需要在config.xml里面配置可被检测的URL Scheme。（例如：'<preference name="querySchemes" value="weixin,sinaweibo,iosamap,baidumap,mqq" />'）

appInstalled({params}, callback(ret))

### params

ios：

- 类型：字符串
- 默认值：无
- 描述：苹果包名。例如高德地图：'iosamap://'

android：

- 类型：JSON 对象
- 默认值：无
- 描述：安卓包名。例如高德地图：'com.autonavi.minimap'

### callback(ret)

ret：

- 类型：JSON 对象
- 描述：回调
- 内部字段：
```javascript
{
    installed: true,  // 布尔类型。true为安装，false为未安装
}
```

## 实例

```javascript
// 判断是否已安装高德地图
appInstalled({
    ios: 'iosamap://',
    android: 'com.autonavi.minimap'
}, function(ret) {
    if (ret.installed) {
        // 已安装
    } else {
        // 未安装
    }
});
```

