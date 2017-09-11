# tcy-modules

均支持AMD

[源码链接](./src)

[emojioneTCY](#emojionetcy "Emoji表情和'简称'互转") [bankCardInfo](#bankcardinfo "根据银行卡号返回银行名称和卡类型") [scrollToBottom](#scrolltobottom "判断是否已滑动到底部") [check-img-square](#check-img-square "判断图片是否为正方形，并返回图片的一些信息(实际宽、高)") [UIMediaScanner](#uimediascanner "选取多张图片") [navMap](#navmap "打开高德或百度地图导航。") [appInstalled](#appinstalled "判断是否已安装某个app") [UIActionSelector](#uiactionselector "三级选择器") 

## emojioneTCY

Emoji表情和"简称"互转

依赖模块：`无`

纯JavaScript：`是`

文档最后更新时间：2017-09-11

### toShort(Str) ⇒ return

把Emoji表情转为"简称"

### Str

- 类型：字符串 
- 默认值：无
- 描述：含有Emoji表情的字符串

### return

- 类型：字符串 
- 描述：转化后的文本

## 实例

```javascript
var str_test = '手势👌收到';
console.log(emojioneTCY.toShort(str_test)); // '手势:ok_hand:收到'

```
### shortnameToUnicode(Str) ⇒ return

把"简称"转为Emoji表情

### Str

- 类型：字符串 
- 默认值：无
- 描述：含有"简称"的字符串

### return

- 类型：字符串 
- 描述：转化后的文本

## 实例

```javascript
var str_test = '手势:ok_hand:收到';
console.log(emojioneTCY.shortnameToUnicode(str_test)); // '手势👌收到'

```


## bankCardInfo

根据银行卡号返回银行名称和卡类型

依赖模块：`无`

纯JavaScript：`是`

文档最后更新时间：2017-09-01

bankCardInfo(cardNo, callback(ret, err))

### cardNo

- 类型：字符串 
- 默认值：无
- 描述：银行卡号

### callback(ret, err)

ret：

- 类型：JSON 对象
- 内部字段：
```javascript
{
    status: true,      // 布尔类型，是否识别出
    bankName: '',      // 字符串，银行名称，例如：'工商银行'
    bankCode: '',      // 字符串，银行代号，例如：'ICBC'
    cardType: '',      // 字符串，银行卡类型(DC: "储蓄卡",CC: "信用卡",SCC: "准贷记卡",PC: "预付费卡")
    cardTypeName: '',  // 字符串，银行卡类型名称
    cardNo: '',        // 字符串，银行卡号
}
```

err：

- 类型：JSON 对象
- 内部字段：
```javascript
{
    code: ,      // 数字类型，错误码：
                    // 6 （银行卡位数必须是15到19位）
                    // 9 （银行卡号必须是数字）
                    // 13（银行卡号识别失败）
}
```

## 实例

```javascript
bankCardInfo('6227003320240034988', function(ret, err) {
    console.log(JSON.stringify(ret));
    console.log(JSON.stringify(err));
});

```


## scrollToBottom

判断是否已滑动到底部。可自定义判定距离。实时返回已滑动距离。

注：在ios下，滚动时无法实时触发回调，只有在滚动停止时才会触发回调。如果想实时触发回调，在api.openWin时把WKWebView属性设置为true。

依赖模块：`无`

纯JavaScript：`是`

文档最后更新时间：2017-07-26

scrollToBottom({params}, callback(ret))

### params

selector：

- 类型：字符串 | 元素
- 默认值：无
- 描述：
    - 'body' 
    - '#main'
    - '.main'

distance：

- 类型：数字类型
- 默认值：0
- 描述：（可选项）距离底部的触发距离

### callback(ret)

ret：

- 类型：JSON 对象
- 描述：回调
- 内部字段：
```javascript
{
    status: true,  // 布尔类型，是否已到底部
    scrollTop: '', // 数字类型。已滑动距离
}
```

## 实例

```javascript
scrollToBottom({
    selector: 'body',
    distance: 0
}, function(ret, err) {
    console.log(JSON.stringify(ret));
    if (ret.status) {
        console.log('已到底部');
    }
});
```


## check-img-square

判断图片是否为正方形，并返回图片的一些信息(实际宽、高)。

依赖模块：`无`

纯JavaScript：`是`

文档最后更新时间：2017-07-25

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

纯JavaScript：`否`

文档最后更新时间：2017-07-25

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

注意：iOS9中系统对检测应用是否安装的方法做了限制，若想得到期望的结果，需要在config.xml里面配置可被检测的URL Scheme。（例如：'<preference name="querySchemes" value="weixin,sinaweibo,iosamap,baidumap,mqq" />'）

依赖模块：`无`

纯JavaScript：`否`

文档最后更新时间：2017-07-26

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

注意：iOS9中系统对检测应用是否安装的方法做了限制，若想得到期望的结果，需要在config.xml里面配置可被检测的URL Scheme。（例如：'<preference name="querySchemes" value="weixin,sinaweibo,iosamap,baidumap,mqq" />'）

依赖模块：`无`

纯JavaScript：`否`

文档最后更新时间：2017-07-26

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

## UIActionSelector

三级选择器

依赖模块：`UIActionSelector`

纯JavaScript：`否`

文档最后更新时间：2017-07-25

UIActionSelector({params}, callback(ret))

### params

默认参数

```javascript
{
    datas: [],
    animation: true,
    fixedOn: api.frameName,
    actives: [0, 0, 0],
    layout: {
        row: 7,
        col: 3,
        height: 30,
        size: 12, // ios为：16
        sizeActive: 14, // ios为：18
        rowSpacing: 4,
        colSpacing: 0,
        maskBg: 'rgba(0,0,0,0.2)',
        bg: '#fff',
        color: '#aaa', // ios为：'#222'
        colorSelected: '#3a3a3a' // ios为：'#000'
    },
    cancel: {
        text: '取消',
        size: 14,
        w: 54, // ios为：50
        h: 38, // ios为：42
        bg: 'rgba(0,0,0,0.0)',
        bgActive: 'rgba(0,0,0,0.0)',
        color: 'rgb(8, 148, 236)',
        colorActive: 'rgba(8, 148, 236, 0.5)'
    },
    ok: {
        text: '完成',
        size: 14,
        w: 54, // ios为：50
        h: 38, // ios为：42
        bg: 'rgba(0,0,0,0.0)',
        bgActive: 'rgba(0,0,0,0.0)',
        color: 'rgb(8, 148, 236)',
        colorActive: 'rgba(8, 148, 236, 0.5)'
    },
    title: {
        text: '请选择',
        size: 16,
        h: 38, // ios为：42
        bg: '#eee',
        color: '#666'
    },
}
```

### callback(ret)

参照文档：[http://docs.apicloud.com/Client-API/UI-Layout/UIActionSelector#1](http://docs.apicloud.com/Client-API/UI-Layout/UIActionSelector#1)  

## 实例

```javascript
UIActionSelector({
    datas: 'widget://res/city_data.json',
    title: {
        text: '',
    },
}, function(ret, err) {
    if (ret) {
        alert(JSON.stringify(ret));
    } else {
        alert(JSON.stringify(err));
    }
});

```
